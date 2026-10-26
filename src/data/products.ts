import rawStoreData from './storeData.json';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'Sneakers' | 'Loafers' | 'Formal' | 'Heels' | 'Boots' | 'Sandals' | 'Casual' | string;
  gender: 'Men' | 'Women' | 'Unisex' | string;
  price: number; // In PKR
  originalPrice?: number; // In PKR for discounts
  rating: number;
  reviewsCount: number;
  tag?: 'NEW ARRIVAL' | 'BEST SELLER' | 'LIMITED EDITION' | 'HERITAGE' | string;
  description: string;
  longDescription: string;
  materials: string[];
  features: string[];
  image: string;
  gallery: string[];
  productUrl: string;
  sizes: (string | number)[];
  colors: ProductColor[];
  inStock: boolean;
  stockCount: number;
  sku: string;
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  filterCategory: string;
  path: string;
}

export interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  primaryCta: {
    text: string;
    path: string;
  };
  secondaryCta?: {
    text: string;
    path: string;
  } | null;
}

export interface BrandBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface BrandConfig {
  name: string;
  displayName: string;
  wordmarkPrefix: string;
  wordmarkAccent: string;
  wordmarkSuffix: string;
  tagline: string;
  subtagline: string;
  logoUrl: string;
  logoLightUrl: string;
  logoAlt: string;
  faviconUrl: string;
  announcement: string;
  announcementLink: string;
}

export interface ContactConfig {
  brandName: string;
  atelierAddress: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  mobile: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  whatsappPrefilledMessage: string;
  whatsappUrl: string;
  email: string;
  businessHoursWeekdays: string;
  businessHoursSunday: string;
  responseTime: string;
}

export interface StoreSettings {
  currency: {
    symbol: string;
    code: string;
    label: string;
  };
  shipping: {
    freeShippingThreshold: number;
    standardShippingFee: number;
    shippingNotice: string;
  };
  paymentMethods: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

export interface PromotionalBannerConfig {
  badge: string;
  title: string;
  description: string;
  image: string;
  imageTag: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  primaryCta: {
    text: string;
    path: string;
  };
  secondaryCta: {
    text: string;
    path: string;
  };
}

export interface NewsletterConfig {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  disclaimer: string;
  successMessage: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface NavigationConfig {
  mainMenu: NavItem[];
  footerCollections: NavItem[];
  footerClientCare: NavItem[];
  footerAbout: NavItem[];
}

export interface FooterConfig {
  aboutText: string;
  copyright: string;
}

export interface StoreData {
  brand: BrandConfig;
  contact: ContactConfig;
  socialLinks: Record<string, string>;
  storeSettings: StoreSettings;
  navigation: NavigationConfig;
  footer: FooterConfig;
  heroSlides: HeroSlide[];
  categories: Category[];
  benefits: BrandBenefit[];
  promotionalBanner: PromotionalBannerConfig;
  newsletter: NewsletterConfig;
  products: Product[];
}

// Cast raw imported JSON to typed StoreData
export const STORE_DATA = rawStoreData as unknown as StoreData;

// Individual exported entities for clean consumption across components
export const BRAND: BrandConfig = STORE_DATA.brand;
export const CONTACT: ContactConfig = STORE_DATA.contact;
export const STORE_SETTINGS: StoreSettings = STORE_DATA.storeSettings;
export const SOCIAL_LINKS = STORE_DATA.socialLinks;
export const NAVIGATION: NavigationConfig = STORE_DATA.navigation;
export const FOOTER_DATA: FooterConfig = STORE_DATA.footer;
export const HERO_SLIDES: HeroSlide[] = STORE_DATA.heroSlides;
export const CATEGORIES: Category[] = STORE_DATA.categories;
export const BRAND_BENEFITS: BrandBenefit[] = STORE_DATA.benefits;
export const PROMOTIONAL_BANNER: PromotionalBannerConfig = STORE_DATA.promotionalBanner;
export const NEWSLETTER: NewsletterConfig = STORE_DATA.newsletter;
export const PRODUCTS: Product[] = STORE_DATA.products;

// Helper query functions
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug || p.id === slug);
}

export function getProductsByCategory(category: string): Product[] {
  const cat = category.toLowerCase();
  return PRODUCTS.filter((p) => {
    if (cat === 'men') return p.gender === 'Men' || p.gender === 'Unisex';
    if (cat === 'women') return p.gender === 'Women' || p.gender === 'Unisex';
    return p.category.toLowerCase() === cat;
  });
}

export function getFeaturedProducts(limit = 10): Product[] {
  return PRODUCTS.slice(0, limit);
}

export function getNewArrivals(limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.tag === 'NEW ARRIVAL' || p.tag === 'LIMITED EDITION'
  ).slice(0, limit);
}
