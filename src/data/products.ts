export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'Sneakers' | 'Loafers' | 'Formal' | 'Heels' | 'Boots' | 'Sandals' | 'Casual';
  gender: 'Men' | 'Women' | 'Unisex';
  price: number; // In PKR
  originalPrice?: number; // In PKR for discounts
  rating: number;
  reviewsCount: number;
  tag?: 'NEW ARRIVAL' | 'BEST SELLER' | 'LIMITED EDITION' | 'HERITAGE';
  description: string;
  longDescription: string;
  materials: string[];
  features: string[];
  image: string;
  gallery: string[];
  sizes: (string | number)[];
  colors: ProductColor[];
  inStock: boolean;
  stockCount: number;
  sku: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'aurelio-classic-sneakers',
    name: 'Aurelio Classic Sneakers',
    category: 'Sneakers',
    gender: 'Unisex',
    price: 8500,
    originalPrice: 10500,
    rating: 4.9,
    reviewsCount: 142,
    tag: 'BEST SELLER',
    description: 'Minimalist luxury calfskin sneakers with hand-buffed finish and cushioned leather insole.',
    longDescription:
      'Engineered in Florence from full-grain calf leather, the Aurelio balances understated elegance with all-day architectural comfort. Featuring gold foil hot-stamped heel branding, waxed organic cotton laces, and a custom vulcanized rubber cupsole stitched for lifelong durability.',
    materials: ['100% Full-Grain Italian Calfskin Upper', 'Vegetable-Tanned Calf Lining', 'Stitched Margom-Style Rubber Sole', 'Waxed Organic Cotton Laces'],
    features: ['Anatomical memory foam footbed', 'Reinforced heel counter', 'Hand-stitched perimeter cupsole', 'Includes cotton dust bag and spare laces'],
    image: '/src/assets/images/hero_sneakers_editorial_1792682101623.jpg',
    gallery: [
      '/src/assets/images/hero_sneakers_editorial_1792682101623.jpg',
      '/src/assets/images/product_solstice_sneakers_1792682203991.jpg',
      '/src/assets/images/promo_craftsmanship_1792682103600.jpg',
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: 'Pure White & Gold', hex: '#FAF9F6' },
      { name: 'Sand & Bone', hex: '#E3DC handle D1' },
      { name: 'Onyx Midnight', hex: '#1C1B1A' },
    ],
    inStock: true,
    stockCount: 18,
    sku: 'SG-AUR-01',
  },
  {
    id: 'prod-002',
    slug: 'verona-leather-loafers',
    name: 'Verona Leather Loafers',
    category: 'Loafers',
    gender: 'Men',
    price: 9900,
    originalPrice: 12000,
    rating: 5.0,
    reviewsCount: 89,
    tag: 'BEST SELLER',
    description: 'Hand-burnished penny loafers crafted from vegetable-tanned Tuscan leather.',
    longDescription:
      'The Verona exemplifies relaxed sartorial elegance. Hand-burnished by master artisans to achieve rich depth of patina, with a flexible Blake-stitched construction and stacked leather heel inset with rubber traction grips.',
    materials: ['Hand-Patinated Tuscan Leather', 'Full Leather Lining', 'Blake-Stitched Leather Sole', 'Brass Shank Support'],
    features: ['Hand-sewn apron detail', 'Soft glove leather interior', 'Breathable natural cork filling', 'Ideal for business or weekend tailoring'],
    image: '/src/assets/images/hero_loafers_editorial_1792682103010.jpg',
    gallery: [
      '/src/assets/images/hero_loafers_editorial_1792682103010.jpg',
      '/src/assets/images/promo_craftsmanship_1792682103600.jpg',
      '/src/assets/images/product_formal_oxford_1792682184081.jpg',
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    colors: [
      { name: 'Chestnut Patina', hex: '#633B1E' },
      { name: 'Espresso Black', hex: '#231F20' },
      { name: 'Oxblood Cordovan', hex: '#4A1521' },
    ],
    inStock: true,
    stockCount: 12,
    sku: 'SG-VER-02',
  },
  {
    id: 'prod-003',
    slug: 'atlas-urban-runners',
    name: 'Atlas Urban Runners',
    category: 'Sneakers',
    gender: 'Men',
    price: 7200,
    rating: 4.8,
    reviewsCount: 64,
    tag: 'NEW ARRIVAL',
    description: 'Contemporary technical runner blending fine suede overlays and responsive air-cushion foam.',
    longDescription:
      'A masterclass in modern athletic proportion. The Atlas features multi-layered Italian suede, breathable mesh panelling, and a sculptured high-rebound midsole designed for metropolitan commute and effortless style.',
    materials: ['Technical Performance Mesh', 'Supple Suede Overlays', 'EVA High-Rebound Midsole', 'Treaded Gum Outsole'],
    features: ['Lightweight aerodynamic chassis', 'Reflective micro-piping', 'Anti-odor bamboo charcoal sockliner', 'Reinforced toe bumper'],
    image: '/src/assets/images/product_urban_runner_1792682185390.jpg',
    gallery: [
      '/src/assets/images/product_urban_runner_1792682185390.jpg',
      '/src/assets/images/hero_sneakers_editorial_1792682101623.jpg',
    ],
    sizes: [40, 41, 42, 43, 44],
    colors: [
      { name: 'Stone Grey & Dune', hex: '#B8B1A4' },
      { name: 'Obsidian & Slate', hex: '#2A2E33' },
    ],
    inStock: true,
    stockCount: 15,
    sku: 'SG-ATL-03',
  },
  {
    id: 'prod-004',
    slug: 'siena-formal-oxfords',
    name: 'Siena Formal Oxfords',
    category: 'Formal',
    gender: 'Men',
    price: 11500,
    originalPrice: 14000,
    rating: 4.9,
    reviewsCount: 77,
    tag: 'HERITAGE',
    description: 'Impeccable closed-lacing cap-toe Oxfords with mirror-shine toe and hand-stained leather sole.',
    longDescription:
      'The quintessence of black-tie and executive formality. Cut from single-cut European calfskin with delicate twin-needle stitching and an ultra-refined chisel toe. Finished with Goodyear-welted channelled leather soles.',
    materials: ['Boxcalf Full-Grain Leather', 'Full Calf Interior', 'Goodyear Welted Oak-Bark Leather Sole', 'Hand-Forged Brass Eyelets'],
    features: ['Closed lacing with 5 eyelets', 'Beveled waist sole profile', 'Mirror-burnished toe cap', 'Re-soleable construction'],
    image: '/src/assets/images/product_formal_oxford_1792682184081.jpg',
    gallery: [
      '/src/assets/images/product_formal_oxford_1792682184081.jpg',
      '/src/assets/images/promo_craftsmanship_1792682103600.jpg',
      '/src/assets/images/product_regent_derby_1792682204065.jpg',
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: 'Dark Cognac Patina', hex: '#58311B' },
      { name: 'Raven Black', hex: '#111111' },
    ],
    inStock: true,
    stockCount: 10,
    sku: 'SG-SIE-04',
  },
  {
    id: 'prod-005',
    slug: 'luna-minimal-heels',
    name: 'Luna Minimal Heels',
    category: 'Heels',
    gender: 'Women',
    price: 8900,
    originalPrice: 11000,
    rating: 4.9,
    reviewsCount: 112,
    tag: 'BEST SELLER',
    description: 'Architectural strappy block heel with geometric silhouette and all-evening stability.',
    longDescription:
      'Designed for confident movement from gala to dinner. The Luna pairs sculptural block heel architecture with supple asymmetrical straps that frame the foot with striking modern minimalism.',
    materials: ['Buttery Soft Nappa Leather', 'Padded Kidskin Leather Insole', 'Polished Lacquered Wooden Heel Core', 'Slip-Resistant Forefoot Island'],
    features: ['65mm balanced architectural block heel', 'Elasticized discreet ankle fastening', 'Triple-layer ball-of-foot cushioning', 'Gold-plated buckle'],
    image: '/src/assets/images/hero_heels_editorial_1792682103171.jpg',
    gallery: [
      '/src/assets/images/hero_heels_editorial_1792682103171.jpg',
      '/src/assets/images/product_strappy_sandal_1792682185411.jpg',
    ],
    sizes: [36, 37, 38, 39, 40, 41],
    colors: [
      { name: 'Noir Satin & Leather', hex: '#1A1A1A' },
      { name: 'Champagne Ivory', hex: '#F0E8D9' },
    ],
    inStock: true,
    stockCount: 14,
    sku: 'SG-LUN-05',
  },
  {
    id: 'prod-006',
    slug: 'nova-everyday-trainers',
    name: 'Nova Everyday Trainers',
    category: 'Sneakers',
    gender: 'Unisex',
    price: 6500,
    rating: 4.7,
    reviewsCount: 95,
    tag: 'NEW ARRIVAL',
    description: 'Effortless low-profile court shoes with natural honey gum sole and raw-cut collar.',
    longDescription:
      'The foundational daily silhouette. Clean lines, deconstructed collar for zero heel friction, and a supple cream leather upper that ages beautifully with each wear.',
    materials: ['Supple Milled Calf Leather', 'Natural Crepe Honey Gum Sole', 'Organic Linen Tongue Trim', 'Anti-Bacterial Leather Footbed'],
    features: ['Ultra-flexible Strobel construction', 'Featherlight profile (320g per shoe)', 'Zero break-in period guarantee', 'Embossed heel tab'],
    image: '/src/assets/images/product_nova_trainers_1792682202921.jpg',
    gallery: [
      '/src/assets/images/product_nova_trainers_1792682202921.jpg',
      '/src/assets/images/hero_sneakers_editorial_1792682101623.jpg',
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: [
      { name: 'Ivory & Honey Gum', hex: '#F4EFE6' },
      { name: 'Midnight Charcoal', hex: '#26282B' },
    ],
    inStock: true,
    stockCount: 20,
    sku: 'SG-NOV-06',
  },
  {
    id: 'prod-007',
    slug: 'milano-chelsea-boots',
    name: 'Milano Chelsea Boots',
    category: 'Boots',
    gender: 'Men',
    price: 12900,
    originalPrice: 15500,
    rating: 5.0,
    reviewsCount: 84,
    tag: 'LIMITED EDITION',
    description: 'Iconic wholecut Chelsea boots with deep elastic gusset and refined storm welt.',
    longDescription:
      'Cut from a single flawless hide of French calf leather to eliminate unnecessary seams. The Milano hugs the ankle with clean precision, fitted with woven rear pull tabs and water-resistant rubber-inlaid leather soles.',
    materials: ['French Boxcalf Wholecut Leather', 'Heavyweight Twin-Weave Elastic Gusset', 'Goodyear Storm-Welted Sole', 'Branded Gold-Weave Pull Loops'],
    features: ['Seamless wholecut quarter construction', 'Double-tanned water-resistant upper', 'Shock-absorbing cork filler bed', 'Includes cedar shoe horn'],
    image: '/src/assets/images/product_chelsea_boot_1792682183965.jpg',
    gallery: [
      '/src/assets/images/product_chelsea_boot_1792682183965.jpg',
      '/src/assets/images/hero_loafers_editorial_1792682103010.jpg',
      '/src/assets/images/promo_craftsmanship_1792682103600.jpg',
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    colors: [
      { name: 'Polished Onyx', hex: '#141414' },
      { name: 'Vintage Cigar', hex: '#4E3324' },
    ],
    inStock: true,
    stockCount: 8,
    sku: 'SG-MIL-07',
  },
  {
    id: 'prod-008',
    slug: 'elara-elegant-sandals',
    name: 'Elara Elegant Sandals',
    category: 'Sandals',
    gender: 'Women',
    price: 4900,
    rating: 4.8,
    reviewsCount: 52,
    tag: 'NEW ARRIVAL',
    description: 'Featherlight strappy flat sandals in hand-oiled saddle leather with miniature gold hardware.',
    longDescription:
      'The soul of Mediterranean summer. Featuring whisper-thin yet supportive leather straps, hand-painted beveled edges, and an ultra-thin leather sole that folds effortlessly into travel luggage.',
    materials: ['Full-Grain Saddle Leather Straps', 'Smooth Cuoio Leather Insole', 'Polished Gold-Toned Brass Buckle', 'Non-Slip Heel Tap'],
    features: ['Adjustable ankle collar strap', 'Anatomically shaped toe post', 'Lightweight 180g build', 'Hand-stitched sole border'],
    image: '/src/assets/images/product_strappy_sandal_1792682185411.jpg',
    gallery: [
      '/src/assets/images/product_strappy_sandal_1792682185411.jpg',
      '/src/assets/images/hero_heels_editorial_1792682103171.jpg',
    ],
    sizes: [36, 37, 38, 39, 40],
    colors: [
      { name: 'Tuscan Tan', hex: '#BD7B44' },
      { name: 'Ivory Bone', hex: '#EDE8DF' },
      { name: 'Ebony Black', hex: '#181818' },
    ],
    inStock: true,
    stockCount: 16,
    sku: 'SG-ELA-08',
  },
  {
    id: 'prod-009',
    slug: 'urban-edge-high-tops',
    name: 'Urban Edge High-Tops',
    category: 'Sneakers',
    gender: 'Unisex',
    price: 9200,
    rating: 4.7,
    reviewsCount: 48,
    tag: 'BEST SELLER',
    description: 'High-top silhouette in tactile anthracite suede with padded collar and textured cupsole.',
    longDescription:
      'Streetwear luxury refined. Sourced from Italian calf suede treated with water-repellent conditioning. Features tonal waxed lacing, padded ankle support, and an embossed SOLE & GOLD tongue insignia.',
    materials: ['Water-Repellent Italian Calf Suede', 'Smooth Nappa Interior Trim', 'Custom Tread Rubber Outsole', 'Metal Hex Eyelets'],
    features: ['Plush padded collar for ankle lockdown', 'Ergonomic high-arch support insole', 'Reinforced heel pull loop', 'Hand-stitched cupsole sidewalls'],
    image: '/src/assets/images/product_high_tops_1792682203314.jpg',
    gallery: [
      '/src/assets/images/product_high_tops_1792682203314.jpg',
      '/src/assets/images/product_urban_runner_1792682185390.jpg',
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    colors: [
      { name: 'Anthracite Suede', hex: '#3B3C3E' },
      { name: 'Warm Taupe Suede', hex: '#877B70' },
    ],
    inStock: true,
    stockCount: 11,
    sku: 'SG-URB-09',
  },
  {
    id: 'prod-010',
    slug: 'regent-premium-derby-shoes',
    name: 'Regent Premium Derby Shoes',
    category: 'Formal',
    gender: 'Men',
    price: 10800,
    originalPrice: 13500,
    rating: 4.9,
    reviewsCount: 68,
    tag: 'HERITAGE',
    description: 'Substantial Goodyear welted Derby shoes with blind eyelets and double-thickness sole.',
    longDescription:
      'Engineered for distinguished presence. The Regent features open lacing for accommodating higher insteps, high-sheen polished binder leather, and storm welt sealing for foul-weather durability.',
    materials: ['Polished Binder Calf Leather', 'Goodyear Double Welt Construction', 'Full Grain Leather Counter', 'Dainite-Style Commando Grip Inset'],
    features: ['Open-lacing Derby facing', 'Triple-layer storm welt', 'Reinforced toe puff', 'Antiqued hand-stained edge trim'],
    image: '/src/assets/images/product_regent_derby_1792682204065.jpg',
    gallery: [
      '/src/assets/images/product_regent_derby_1792682204065.jpg',
      '/src/assets/images/product_formal_oxford_1792682184081.jpg',
      '/src/assets/images/promo_craftsmanship_1792682103600.jpg',
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    colors: [
      { name: 'High-Gloss Obsidian', hex: '#0F0F10' },
      { name: 'Burnished Mahogany', hex: '#442218' },
    ],
    inStock: true,
    stockCount: 9,
    sku: 'SG-REG-10',
  },
  {
    id: 'prod-011',
    slug: 'solstice-lifestyle-sneakers',
    name: 'Solstice Lifestyle Sneakers',
    category: 'Sneakers',
    gender: 'Unisex',
    price: 7800,
    rating: 4.8,
    reviewsCount: 83,
    tag: 'NEW ARRIVAL',
    description: 'Heritage retro tennis court shoe in warm cream leather with sand suede chevron accents.',
    longDescription:
      'Inspired by vintage court classics from the late 70s. Crafted with micro-perforated toe boxes for airflow, brushed sand suede paneling, and an authentic heritage off-white cupsole.',
    materials: ['Perforated Nappa Leather Upper', 'Velvety Suede Overlays', 'Recycled Rubber Blend Cupsole', 'Woven Retro Label on Tongue'],
    features: ['Perforated vamp for temperature control', 'Shock-dampening heel insert', 'Abrasion-resistant toe cap', 'Vintage gold foil stamping'],
    image: '/src/assets/images/product_solstice_sneakers_1792682203991.jpg',
    gallery: [
      '/src/assets/images/product_solstice_sneakers_1792682203991.jpg',
      '/src/assets/images/hero_sneakers_editorial_1792682101623.jpg',
    ],
    sizes: [39, 40, 41, 42, 43, 44],
    colors: [
      { name: 'Chalk & Sand Suede', hex: '#DDD4C4' },
      { name: 'Cream & Forest Green', hex: '#264027' },
    ],
    inStock: true,
    stockCount: 22,
    sku: 'SG-SOL-11',
  },
  {
    id: 'prod-012',
    slug: 'celeste-block-heels',
    name: 'Celeste Block Heels',
    category: 'Heels',
    gender: 'Women',
    price: 9400,
    originalPrice: 11900,
    rating: 4.9,
    reviewsCount: 74,
    tag: 'BEST SELLER',
    description: 'Sculpted evening block heels with multi-tier cage strap silhouette in satin nappa leather.',
    longDescription:
      'A commanding statement piece. The Celeste features interlocking geometric straps with clean tailored edges that hug the foot securely, elevated by a sturdy 75mm squared architectural heel.',
    materials: ['Italian Satin-Finish Nappa Leather', 'Cuoio Wrapped Heel Block', 'Padded Arch Cushion Insert', 'Buffed Leather Sole'],
    features: ['75mm squared block heel for confident stride', 'Dual micro-buckle adjustments', 'Full calfskin lining', 'Includes travel dust bag'],
    image: '/src/assets/images/hero_heels_editorial_1792682103171.jpg',
    gallery: [
      '/src/assets/images/hero_heels_editorial_1792682103171.jpg',
      '/src/assets/images/product_strappy_sandal_1792682185411.jpg',
    ],
    sizes: [36, 37, 38, 39, 40, 41],
    colors: [
      { name: 'Midnight Onyx', hex: '#161616' },
      { name: 'Soft Alabaster', hex: '#F5F3ED' },
    ],
    inStock: true,
    stockCount: 13,
    sku: 'SG-CEL-12',
  },
];

export const CATEGORIES = [
  {
    id: 'men',
    title: "Men's Footwear",
    subtitle: 'Oxfords, Loafers & Boots',
    image: '/src/assets/images/hero_loafers_editorial_1792682103010.jpg',
    filterCategory: 'Men',
  },
  {
    id: 'women',
    title: "Women's Footwear",
    subtitle: 'Heels, Flats & Sandals',
    image: '/src/assets/images/hero_heels_editorial_1792682103171.jpg',
    filterCategory: 'Women',
  },
  {
    id: 'sneakers',
    title: 'Luxury Sneakers',
    subtitle: 'Court, Runners & High-Tops',
    image: '/src/assets/images/hero_sneakers_editorial_1792682101623.jpg',
    filterCategory: 'Sneakers',
  },
  {
    id: 'formal',
    title: 'Formal Collection',
    subtitle: 'Bespoke Derbies & Oxfords',
    image: '/src/assets/images/product_formal_oxford_1792682184081.jpg',
    filterCategory: 'Formal',
  },
];
