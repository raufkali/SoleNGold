import React, { useState } from 'react';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../data/products';
import { formatPricePKR } from '../utils/cartLogic';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  navigate: (path: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, navigate }) => {
  const { addItem } = useCart();
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | number>(product.sizes[0]);
  const [addedRecently, setAddedRecently] = useState(false);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleQuickAdd = (sizeToUse: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      unitPrice: product.price,
      size: sizeToUse,
      color: product.colors[0]?.name || 'Standard',
      quantity: 1,
      maxStock: product.stockCount,
    });
    setAddedRecently(true);
    setShowQuickSizes(false);
    setTimeout(() => setAddedRecently(false), 2000);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.slug}`)}
      className="group relative bg-[#FFFFFF] border border-[#E7E3DA] p-3 flex flex-col justify-between transition-all duration-300 hover:border-[#B89550] cursor-pointer"
    >
      {/* Top Meta & Badges */}
      <div className="relative w-full aspect-square bg-[#F8F7F3] overflow-hidden mb-3">
        {/* Main Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Minimal Square Badge (Tags) */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.tag && (
            <span className="bg-[#171717] text-white text-[10px] tracking-[0.18em] uppercase px-2 py-0.5 font-medium">
              {product.tag}
            </span>
          )}
          {hasDiscount && (
            <span className="bg-[#B89550] text-white text-[10px] tracking-[0.18em] uppercase px-2 py-0.5 font-medium">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quick Actions Hover Overlay on Desktop */}
        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowQuickSizes(!showQuickSizes);
            }}
            className="flex-1 py-2 bg-[#FFFFFF] hover:bg-[#B89550] hover:text-white text-[#171717] text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            aria-label={`Quick add ${product.name}`}
          >
            {addedRecently ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.slug}`);
            }}
            className="w-8 h-8 bg-white/90 hover:bg-white text-[#171717] flex items-center justify-center cursor-pointer transition-colors"
            aria-label="View product details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Size Flyout Drawer if activated */}
        {showQuickSizes && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 bg-white/95 p-4 z-20 flex flex-col justify-between animate-in fade-in duration-150"
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#E7E3DA] mb-3">
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#171717]">
                  Select EU Size
                </span>
                <button
                  onClick={() => setShowQuickSizes(false)}
                  className="text-xs text-[#686868] hover:text-black font-medium"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-1.5 text-xs font-medium border text-center transition-colors cursor-pointer ${
                      selectedSize === s
                        ? 'border-[#B89550] bg-[#B89550] text-white'
                        : 'border-[#E7E3DA] text-[#171717] hover:border-black'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={(e) => handleQuickAdd(selectedSize, e)}
              className="w-full py-2.5 bg-[#171717] hover:bg-[#B89550] text-white text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors"
            >
              Add EU {selectedSize} to Bag
            </button>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-col pt-1">
        <div className="flex items-center justify-between text-[11px] text-[#686868] tracking-widest uppercase mb-1">
          <span>{product.category}</span>
          <span>·</span>
          <span>{product.gender}</span>
        </div>

        <h3 className="font-serif text-base sm:text-lg text-[#171717] font-normal leading-snug group-hover:text-[#B89550] transition-colors line-clamp-1 mb-1.5">
          {product.name}
        </h3>

        {/* Pricing Display */}
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="font-medium text-sm sm:text-base text-[#171717] tabular-nums">
            {formatPricePKR(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-[#686868] line-through tabular-nums">
              {formatPricePKR(product.originalPrice!)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
