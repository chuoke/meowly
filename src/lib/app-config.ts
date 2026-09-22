export const appName = process.env.NEXT_PUBLIC_APP_NAME || "Meowly";
export const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://meowly.qzz.io").replace(/\/+$/, "");
export const adScriptUrls = (process.env.NEXT_PUBLIC_AD_SCRIPT_URLS || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);
