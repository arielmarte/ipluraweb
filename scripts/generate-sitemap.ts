import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const SITE_URL = 'https://iplura.org';
const sitemapPath = resolve(process.cwd(), 'public', 'sitemap.xml');

const now = new Date();
const lastmod = now.toISOString().slice(0, 10);

type SitemapEntry = {
  path: string;
  changefreq: 'weekly' | 'monthly';
  priority: string;
};

const sitemapEntries: SitemapEntry[] = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  { path: '/termos-de-uso', changefreq: 'monthly', priority: '0.4' },
  { path: '/politica-de-privacidade', changefreq: 'monthly', priority: '0.4' },
];

const sitemapUrls = sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${SITE_URL}${entry.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n');

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`;

await mkdir(dirname(sitemapPath), { recursive: true });
await writeFile(sitemapPath, sitemapContent, 'utf8');
