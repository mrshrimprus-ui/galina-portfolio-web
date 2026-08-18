import { rm } from "node:fs/promises";
import { resolve } from "node:path";

const obsoleteAssets = [
  "assets/punto/home/screen-hero-m.png",
  "assets/punto/context/01-normalized.png",
  "assets/punto/context/02-normalized.png",
  "assets/punto/hero/main.png",
  "assets/punto/process/01-mvp.png",
  "assets/mrshrimp/home/screen-hero-m.png",
  "assets/mrshrimp/context/02.png",
  "assets/mrshrimp/context/02-normalized.png",
  "assets/mrshrimp/process/development-b.png",
  "assets/mrshrimp/process/mrshrimp-main.webp",
  "assets/mrshrimp/process/mrshrimp-progress_01.png",
  "assets/mrshrimp/process/release-device.png",
  "assets/mrshrimp/result/completion.png",
  "assets/mrshrimp/result/result-m.png",
  "assets/mrshrimp/result/results.webp",
  "assets/mrshrimp/solution/mrshrimp-solution-02-pic.png",
  "assets/mrshrimp/solution/mrshrimp-solution-05-pic.webp",
  "assets/smarthome/home/screen-hero-m.png",
  "assets/smarthome/context/02-normalized.png",
  "assets/smarthome/context/03.png",
  "assets/smarthome/hero/main.png",
  "assets/smarthome/result/result.png",
  "assets/smarthome/solution/smarthome-solution-02-pic.png",
  "assets/smarthome/solution/smarthome-solution-03-pic.png",
  "assets/smarthome/solution/smarthome-solution-04-pic.png",
];

const clientDirectory = resolve("dist", "client");

await Promise.all(
  obsoleteAssets.map((asset) =>
    rm(resolve(clientDirectory, asset), { force: true }),
  ),
);
