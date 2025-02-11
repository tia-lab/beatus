/* eslint-disable  */

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.yourdomain.com", // Replace with your domain
  generateRobotsTxt: true, // (optional) Enable or disable robots.txt generation
  sitemapSize: 5000, // Limit sitemap file size (optional)
  changefreq: "daily", // How often URLs are likely to change (optional)
  priority: 0.7, // Default priority for URLs
  exclude: ["/admin/*"], // (optional) Exclude specific routes
  // Custom transform function (optional), helps modifying entries
  transform: async (config, path) => {
    return {
      loc: path, // The final URL
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date().toISOString()
    }
  }
  // (optional) If you want to manually include additional routes
  /* additionalPaths: async (config) => [
    await config.transform(config, "/additional-page")
  ] */
}
