import fs from "node:fs";
import postcss from "postcss";

const file = new URL("../app/globals.css", import.meta.url);
const source = fs.readFileSync(file, "utf8");
const root = postcss.parse(source, { from: file.pathname });
const seen = new Map();
let removed = 0;

function contextFor(rule) {
  const context = [];
  let parent = rule.parent;

  while (parent && parent.type !== "root") {
    if (parent.type === "atrule") {
      context.push(`@${parent.name} ${parent.params}`);
    }
    parent = parent.parent;
  }

  return context.reverse().join("|");
}

const rules = [];
root.walkRules((rule) => rules.push(rule));

for (let index = rules.length - 1; index >= 0; index -= 1) {
  const rule = rules[index];
  const key = `${contextFor(rule)}::${rule.selector}`;
  const properties = seen.get(key) ?? new Set();
  const currentProperties = new Set();

  for (let childIndex = rule.nodes.length - 1; childIndex >= 0; childIndex -= 1) {
    const node = rule.nodes[childIndex];
    if (node.type !== "decl") continue;

    const declarationKey = `${node.prop}:${node.important ? "important" : "normal"}`;
    if (properties.has(declarationKey)) {
      node.remove();
      removed += 1;
    }
    currentProperties.add(declarationKey);
  }

  currentProperties.forEach((property) => properties.add(property));
  seen.set(key, properties);
}

root.walkRules((rule) => {
  if (rule.nodes.length === 0) rule.remove();
});

root.walkAtRules((atRule) => {
  if (atRule.nodes?.length === 0) atRule.remove();
});

fs.writeFileSync(file, root.toString());
console.log(`Removed ${removed} overridden declarations.`);
