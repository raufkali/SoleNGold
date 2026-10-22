import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Truck,
  RefreshCw,
  ShoppingBag,
  Heart,
  Share2,
  Check,
  Star,
  ArrowRight,
  ArrowLeft,
  Ruler,
} from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { formatPricePKR } from '../utils/cartLogic';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
  openCheckout: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  navigate,
  openCheckout,
}) => {
  const { addItem } = useCart();
  const product: Product | undefined = PRODUCTS.find((p) => p.slug === slug || p.id === slug);

  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string | number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'shipping'>('details');

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedColor(product.colors[0]?.name || 'Standard');
      setSelectedSize(null);
      setQuantity(1);
      setSizeError(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product, slug]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-[#FFFFFF]">
        <div className="max-w-md border border-[#E7E3DA] p-8 bg-[#F8F7F3]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B89550] font-semibold block mb-2">
            CATALOGUE NOTICE
          </span>
          <h1 className="font-serif text-3xl text-[#171717] mb-3">Model Not Found</h1>
          <p className="text-xs text-[#686868] mb-6">
            The footwear reference you requested does not exist in our current collection or has been archived.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-[#171717] hover:bg-[#B89550] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
          >
            RETURN TO SHOP
          </button>
        </div>
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError('Please select a shoe size before adding to bag.');
      return;
    }
    setSizeError(null);

    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      unitPrice: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      maxStock: product.stockCount,
    });

    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2500);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError('Please select a shoe size to proceed.');
      return;
    }
    setSizeError(null);

    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      unitPrice: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      maxStock: product.stockCount,
    });

    openCheckout();
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)
  ).slice(0, 4);

  return (
    <div className="bg-[#FFFFFF] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link / Breadcrumb */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#686868] mb-8 pb-4 border-b border-[#E7E3DA]">
          <button
            onClick={() => navigate('/shop')}
            className="hover:text-[#171717] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Shop</span>
          </button>
          <span>/</span>
          <button
            onClick={() => navigate(`/category/${product.category.toLowerCase()}`)}
            className="hover:text-[#171717] transition-colors cursor-pointer"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-[#171717] font-medium truncate">{product.name}</span>
        </div>

        {/* 2-Column Split Layout: Gallery Left, Purchase Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* LEFT: Product Gallery (7 Columns) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square w-full bg-[#F8F7F3] border border-[#E7E3DA] overflow-hidden">
              <img
                src={activeImage || product.image}
                alt={`${product.name} editorial angle`}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              {product.tag && (
                <div className="absolute top-4 left-4">
                  <span className="bg-[#171717] text-white text-[11px] tracking-[0.2em] uppercase px-3 py-1 font-medium">
                    {product.tag}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square border bg-[#F8F7F3] overflow-hidden cursor-pointer transition-all ${
                      activeImage === img
                        ? 'border-[#B89550] ring-1 ring-[#B89550]'
                        : 'border-[#E7E3DA] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Contiguous Purchase Module (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="border border-[#E7E3DA] bg-[#FFFFFF] p-6 sm:p-8 space-y-6">
              {/* Category, Rating & SKU */}
              <div>
                <div className="flex items-center justify-between text-xs text-[#686868] uppercase tracking-wider mb-2">
                  <span>
                    {product.category} · {product.gender}
                  </span>
                  <span className="font-mono text-[10px]">SKU: {product.sku}</span>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#171717] tracking-tight leading-tight mb-3">
                  {product.name}
                </h1>

                {/* Rating review row */}
                <div className="flex items-center gap-2 text-xs text-[#171717]">
                  <div className="flex items-center text-[#B89550]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#B89550]" />
                    ))}
                  </div>
                  <span className="font-medium tabular-nums">{product.rating}</span>
                  <span className="text-[#686868]">({product.reviewsCount} customer reviews)</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="py-4 border-y border-[#E7E3DA] flex items-baseline gap-3">
                <span className="font-serif text-2xl sm:text-3xl font-medium text-[#171717] tabular-nums">
                  {formatPricePKR(product.price)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-sm text-[#686868] line-through tabular-nums">
                      {formatPricePKR(product.originalPrice!)}
                    </span>
                    <span className="bg-[#B89550] text-white text-[10px] uppercase tracking-widest px-2 py-0.5 font-semibold">
                      SAVE {discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Editorial Short Description */}
              <p className="text-xs sm:text-sm text-[#686868] font-light leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#686868] mb-2 font-medium">
                    <span>Selected Leather Color:</span>
                    <span className="text-[#171717] font-semibold">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`px-3 py-2 text-xs uppercase tracking-wider border flex items-center gap-2 transition-colors cursor-pointer ${
                          selectedColor === c.name
                            ? 'border-[#B89550] bg-[#F8F7F3] text-[#171717] font-semibold'
                            : 'border-[#E7E3DA] text-[#686868] hover:border-black'
                        }`}
                      >
                        <span
                          className="w-3 h-3 border border-black/20"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector (Mandatory for Footwear) */}
              <div>
                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#686868] mb-2 font-medium">
                  <span className="flex items-center gap-1">
                    <span>Select EU Size</span>
                    <span className="text-red-500">*</span>
                  </span>
                  <span className="text-[#B89550] cursor-pointer hover:underline text-[11px] flex items-center gap-1">
                    <Ruler className="w-3 h-3" />
                    <span>True to Size Guide</span>
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => {
                        setSelectedSize(sz);
                        setSizeError(null);
                      }}
                      className={`py-3 text-xs font-medium border text-center transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'border-[#B89550] bg-[#B89550] text-white shadow-xs'
                          : 'border-[#E7E3DA] bg-white text-[#171717] hover:border-black'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {sizeError && (
                  <p className="text-xs text-red-600 mt-2 font-medium" role="alert">
                    {sizeError}
                  </p>
                )}
              </div>

              {/* Quantity Stepper & Stock State */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-wider text-[#686868] font-medium">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[#E7E3DA]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-[#171717] hover:bg-[#F8F7F3] cursor-pointer"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-xs font-semibold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="w-8 h-8 flex items-center justify-center text-[#171717] hover:bg-[#F8F7F3] cursor-pointer"
                      disabled={quantity >= product.stockCount}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Stock Indicator */}
                <div className="text-xs text-right">
                  {product.inStock ? (
                    <span className="text-emerald-700 font-medium">
                      ✓ In Stock ({product.stockCount} pairs available)
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">Archived / Made to Order</span>
                  )}
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-[#171717] hover:bg-[#B89550] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {isAddedFeedback ? (
                    <>
                      <Check className="w-4 h-4 text-[#B89550]" />
                      <span>ADDED TO YOUR BAG!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 bg-[#B89550] hover:bg-[#96753B] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>BUY NOW · INSTANT CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Service Commitments */}
              <div className="pt-4 border-t border-[#E7E3DA] space-y-2 text-xs text-[#686868]">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#B89550] shrink-0" />
                  <span>Complimentary express courier shipping across Pakistan.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 text-[#B89550] shrink-0" />
                  <span>Complimentary 30-day doorstep size exchange.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#B89550] shrink-0" />
                  <span>Guaranteed authentic full-grain Italian leather certificate.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Specifications & Craft Story Section */}
        <div className="mt-16 sm:mt-24 border border-[#E7E3DA] bg-[#FFFFFF]">
          <div className="flex border-b border-[#E7E3DA] bg-[#F8F7F3]">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 px-6 text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer ${
                activeTab === 'details'
                  ? 'bg-white text-[#171717] border-b-2 border-[#B89550]'
                  : 'text-[#686868] hover:text-black'
              }`}
            >
              Atelier Craft &amp; Story
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`py-4 px-6 text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer ${
                activeTab === 'materials'
                  ? 'bg-white text-[#171717] border-b-2 border-[#B89550]'
                  : 'text-[#686868] hover:text-black'
              }`}
            >
              Materials &amp; Composition
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`py-4 px-6 text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer ${
                activeTab === 'shipping'
                  ? 'bg-white text-[#171717] border-b-2 border-[#B89550]'
                  : 'text-[#686868] hover:text-black'
              }`}
            >
              Delivery &amp; Exchanges
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'details' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="font-serif text-2xl text-[#171717] font-normal">
                  The {product.name} Heritage
                </h3>
                <p className="text-sm text-[#686868] leading-relaxed">
                  {product.longDescription}
                </p>
                <div className="pt-4">
                  <h4 className="text-xs uppercase tracking-wider text-[#171717] font-semibold mb-3">
                    Key Features:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#686868]">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#B89550]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="font-serif text-2xl text-[#171717] font-normal">
                  Sourced Materials &amp; Tannery Traceability
                </h3>
                <p className="text-sm text-[#686868] leading-relaxed">
                  We maintain direct partnerships with gold-rated Leather Working Group (LWG) tanneries in Veneto and Tuscany. Every hide undergoes natural vegetable tanning without toxic chromium finishes.
                </p>
                <div className="border border-[#E7E3DA] divide-y divide-[#E7E3DA] mt-4">
                  {product.materials.map((mat, i) => (
                    <div key={i} className="p-3 text-xs flex justify-between">
                      <span className="text-[#686868]">Component {i + 1}</span>
                      <span className="text-[#171717] font-medium">{mat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-3xl space-y-4 text-xs text-[#686868] leading-relaxed">
                <h3 className="font-serif text-2xl text-[#171717] font-normal">
                  Nationwide Dispatch &amp; Doorstep Sizing
                </h3>
                <p>
                  Orders within Lahore, Karachi, and Islamabad are dispatched via express courier and arrive in 24 to 48 hours. Other cities typically take 2-4 business days.
                </p>
                <p>
                  Need a different size? We offer a 100% complimentary courier pickup from your home or office within 30 days of unboxing. Simply contact our WhatsApp concierge or client support.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Grid */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#E7E3DA]">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89550] font-semibold block mb-1">
                COMPLETE YOUR WARDROBE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal tracking-tight">
                Related Silhouettes
              </h2>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="text-xs font-semibold tracking-wider uppercase text-[#171717] hover:text-[#B89550] transition-colors"
            >
              View All Shoes
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} navigate={navigate} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
