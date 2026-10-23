import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Galina Chumak — Senior Product Designer<\/title>/i);
  assert.match(html, /Senior Product/);
  assert.match(html, /MrShrimp/);
  assert.match(html, /Punto Pago/);
  assert.match(html, /EKF Connect Industry/);
  assert.doesNotMatch(html, /codex-preview|Building your site/i);
});

test("server-renders every public route", async () => {
  const routes = [
    "/about/",
    "/privacy/",
    "/projects/mrshrimp/",
    "/projects/punto/",
    "/projects/industry/",
  ];

  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    assert.match(
      response.headers.get("content-type") ?? "",
      /^text\/html\b/i,
      route,
    );
  }
});

test("GitHub Pages build uses the repository prefix", async () => {
  if (process.env.GITHUB_ACTIONS !== "true") return;

  const html = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /href="\/galina-portfolio-web\/assets\/[^\"]+\.css/);
  assert.match(html, /src="\/galina-portfolio-web\/assets\//);
  assert.match(html, /href="\/galina-portfolio-web\/about/);
  assert.doesNotMatch(html, /(?:href|src)="\/(?:assets|videos)\//);
});
