import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const customAssetsDirectory = join(process.cwd(), "public", "brand");

function findCustomAsset(baseName: string) {
  if (!existsSync(customAssetsDirectory)) return;

  const fileName = readdirSync(customAssetsDirectory).find((candidate) =>
    new RegExp(`^${baseName}\\.[^.]+$`).test(candidate)
  );

  return fileName && `/brand/${fileName}`;
}

export const brandDefaultIconUrl = "/icon.png";
export const brandIconUrl = findCustomAsset("icon") || brandDefaultIconUrl;
export const brandAppleIconUrl = findCustomAsset("apple-icon") || "/apple-icon.png";
export const brandOpenGraphImageUrl = findCustomAsset("opengraph-image") || brandIconUrl;
export const brandTwitterImageUrl = findCustomAsset("twitter-image") || brandOpenGraphImageUrl;
export const brandPwaIcon192Url = findCustomAsset("icon-192");
export const brandPwaIcon512Url = findCustomAsset("icon-512");
