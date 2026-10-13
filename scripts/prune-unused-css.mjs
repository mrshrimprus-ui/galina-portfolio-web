import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";

const projectRoot = path.resolve(import.meta.dirname, "..");
const cssFile = path.join(projectRoot, "app/globals.css");
const dryRun = process.argv.includes("--dry-run");
const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx"]);

function collectFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const location = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectFiles(location);
    return sourceExtensions.has(path.extname(entry.name)) ? [location] : [];
  });
}

const applicationSource = collectFiles(path.join(projectRoot, "app"))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");
const root = postcss.parse(fs.readFileSync(cssFile, "utf8"), { from: cssFile });
const removedSelectors = [];

function isKnownClass(className) {
  if (applicationSource.includes(className)) return true;

  const modifier = className.lastIndexOf("--");
  if (modifier > 0) {
    const dynamicPrefix = className.slice(0, modifier + 2);
    if (applicationSource.includes(dynamicPrefix)) return true;
  }

  return false;
}

root.walkRules((rule) => {
  if (rule.parent?.type === "atrule" && rule.parent.name.endsWith("keyframes")) {
    return;
  }

  const kept = rule.selectors.filter((selector) => {
    const withoutAttributes = selector.replace(/\[[^\]]*\]/g, "");
    const classes = [...withoutAttributes.matchAll(/\.(-?[_a-zA-Z]+[\w-]*)/g)]
      .map((match) => match[1]);
    const unknown = classes.filter((className) => !isKnownClass(className));

    if (unknown.length > 0) {
      removedSelectors.push({ selector, unknown });
      return false;
    }
    return true;
  });

  if (kept.length === 0) rule.remove();
  else if (kept.length !== rule.selectors.length) rule.selectors = kept;
});

root.walkAtRules((atRule) => {
  if (atRule.nodes?.length === 0) atRule.remove();
});

const unknownClasses = new Set(
  removedSelectors.flatMap(({ unknown }) => unknown),
);

console.log(
  `${dryRun ? "Would remove" : "Removed"} ${removedSelectors.length} selector branches ` +
    `using ${unknownClasses.size} unused classes.`,
);

if (dryRun) {
  console.log([...unknownClasses].sort().join("\n"));
} else {
  fs.writeFileSync(cssFile, root.toString());
}
