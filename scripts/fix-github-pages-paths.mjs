import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outputDirectory = fileURLToPath(new URL("../dist/client/", import.meta.url));
const pagesBase = "/galina-portfolio-web";
const textExtensions = new Set([".css", ".html", ".js"]);

if (
  process.env.GITHUB_ACTIONS !== "true" ||
  process.env.GITHUB_PAGES_CUSTOM_DOMAIN
) process.exit(0);

async function* files(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else yield path;
  }
}

for await (const path of files(outputDirectory)) {
  if (!textExtensions.has(extname(path))) continue;

  const original = await readFile(path, "utf8");
  let updated = original.replace(
    /(?<!\/galina-portfolio-web)\/(assets|videos)\//g,
    `${pagesBase}/$1/`,
  );

  if (extname(path) === ".html") {
    updated = updated.replace(
      /href="\/(?!galina-portfolio-web(?:\/|"|#)|\/|#)(about|privacy|projects)(?=[/#"])/g,
      `href="${pagesBase}/$1`,
    );
    updated = updated.replace(/href="\/(#|\")/g, `href="${pagesBase}/$1`);
  }

  if (updated !== original) await writeFile(path, updated);
}
