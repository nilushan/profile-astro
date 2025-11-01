import type { ImageMetadata } from 'astro';

/**
 * Create a static image map at build-time using import.meta.glob()
 * All images loaded eagerly - zero runtime overhead
 * This is the recommended approach for CMS-ready content
 *
 * @returns Record<string, ImageMetadata> - Map of paths to images
 */
function createImageMap() {
  // This runs at build time - creates a static map of ALL images in assets
  const imageModules = import.meta.glob<{ default: ImageMetadata }>(
    '/src/assets/**/*.{png,jpg,jpeg,gif,webp}',
    { eager: true }
  );

  const imageMap: Record<string, ImageMetadata> = {};

  for (const [filePath, module] of Object.entries(imageModules)) {
    // Extract the relative path from /src/assets/...
    const relativePath = filePath.replace('/src/assets/', '');

    // Map both formats: 'blog/example.png' and '/images/blog/example.png'
    imageMap[relativePath] = module.default;
    imageMap[`/images/${relativePath}`] = module.default;
  }

  return imageMap;
}

/**
 * Global image map - created once at build time
 */
const IMAGE_MAP = createImageMap();

/**
 * Resolve image from CMS or content paths
 * Handles multiple path formats: '/images/...', 'blog/...', etc.
 * No runtime cost - lookup is O(1) hash table access
 *
 * @param imagePath - Path from content (e.g., '/images/blog/example.png')
 * @returns ImageMetadata or null if not found
 *
 * @example
 * const image = resolveImage('/images/projects/iotdashboard.png');
 * const image = resolveImage('blog/copilotwebsite/manufood-hero.png');
 */
export function resolveImage(imagePath: string | undefined): ImageMetadata | null {
  if (!imagePath) return null;

  // Try exact match first
  if (IMAGE_MAP[imagePath]) {
    return IMAGE_MAP[imagePath];
  }

  // Try normalized path (remove leading slash and /images/ prefix)
  let normalizedPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  normalizedPath = normalizedPath.replace(/^images\//, '');

  if (IMAGE_MAP[normalizedPath]) {
    return IMAGE_MAP[normalizedPath];
  }

  // Log available images on first request to help debug
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      `Image not found: "${imagePath}". Available images:\n`,
      Object.keys(IMAGE_MAP)
        .filter(k => !k.startsWith('/images/')) // Show only base paths to reduce noise
        .sort()
        .join('\n')
    );
  }

  return null;
}

/**
 * Batch resolve multiple images
 * @param imagePaths - Array of image paths
 * @returns Array of resolved images (nulls filtered out)
 */
export function resolveImages(imagePaths: (string | undefined)[]): ImageMetadata[] {
  return imagePaths
    .map(path => resolveImage(path))
    .filter((img): img is ImageMetadata => img !== null);
}

/**
 * Dynamically imports an image from the assets directory
 * Works with both old paths (/images/...) and new paths (relative)
 *
 * @deprecated Use resolveImage() instead - it's more efficient
 * @param imagePath - Path to image (e.g., '/images/blog/example.png' or 'blog/example.png')
 * @returns Promise<ImageMetadata> - The imported image
 */
export async function getImage(imagePath: string | undefined): Promise<ImageMetadata | null> {
  if (!imagePath) return null;

  // Normalize path: remove leading slash and /images/ prefix if present
  let normalizedPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  normalizedPath = normalizedPath.replace(/^images\//, '');

  try {
    // Try to import from src/assets
    const imageModule = await import(`../assets/${normalizedPath}`);
    return imageModule.default;
  } catch (error) {
    console.warn(`Failed to load image: ${imagePath}`, error);
    return null;
  }
}

/**
 * Cache for dynamically imported images to avoid repeated imports
 */
const imageCache = new Map<string, Promise<ImageMetadata | null>>();

/**
 * Get image with caching to improve performance
 * @deprecated Use resolveImage() instead - it's synchronous and more efficient
 * @param imagePath - Path to image
 * @returns Promise<ImageMetadata | null> - The imported image
 */
export function getImageCached(imagePath: string | undefined): Promise<ImageMetadata | null> {
  if (!imagePath) return Promise.resolve(null);

  if (!imageCache.has(imagePath)) {
    imageCache.set(imagePath, getImage(imagePath));
  }

  return imageCache.get(imagePath)!;
}

/**
 * Batch import all images from a directory pattern
 * Useful for galleries or collections
 *
 * @deprecated Use resolveImages() instead
 * @param pattern - Glob pattern (e.g., '../assets/projects/*.png')
 * @returns Promise<Record<string, ImageMetadata>> - Map of filename to image
 */
export async function getImagesFromPattern(pattern: string): Promise<Record<string, ImageMetadata>> {
  try {
    const modules = import.meta.glob<{ default: ImageMetadata }>('../assets/**/*.(png|jpg|jpeg|gif|webp|svg)', {
      eager: true,
    });

    const images: Record<string, ImageMetadata> = {};
    for (const [path, module] of Object.entries(modules)) {
      const filename = path.split('/').pop() || '';
      images[filename] = module.default;
    }
    return images;
  } catch (error) {
    console.warn(`Failed to load images from pattern: ${pattern}`, error);
    return {};
  }
}
