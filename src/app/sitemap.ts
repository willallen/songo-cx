import type { MetadataRoute } from 'next';
import { workItems } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.songocx.com';
  const staticRoutes = ['', '/services', '/about', '/work', '/contact'];

  const staticPages = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const workPages = workItems.map((item) => ({
    url: `${base}/work/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...workPages];
}
