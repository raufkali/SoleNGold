import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  initialCategory?: string;
  navigate: (path: string) => void;
  title?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'all',
  navigate,
  title = 'All Footwear Collection',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSelectedCategory(initialCategory);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialCategory]);

  const categories = [
    { label: 'All Silhouettes', value: 'all' },
    { label: 'Sneakers', value: 'sneakers' },
    { label: 'Loafers', value: 'loafers' },
    { label: 'Formal Shoes', value: 'formal' },
    { label: 'Heels', value: 'heels' },
    { label: 'Chelsea Boots', value: 'boots' },
    { label: 'Sandals', value: 'sandals' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const catNormalized = product.category.toLowerCase();
        const target = selectedCategory.toLowerCase();
        if (target === 'men') {
          if (product.gender !== 'Men' && product.gender !== 'Unisex') return false;
        } else if (target === 'women') {
          if (product.gender !== 'Women' && product.gender !== 'Unisex') return false;
        } else if (catNormalized !== target) {
          return false;
        }
      }

      // Gender filter
      if (selectedGender !== 'all') {
        if (product.gender !== selectedGender && product.gender !== 'Unisex') {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchCat = product.category.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default order
    });
  }, [selectedCategory, selectedGender, searchQuery, sortBy]);

  return (
    <div className="bg-[#FFFFFF] min-h-[70vh] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="border-b border-[#E7E3DA] pb-8 mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89550] font-semibold block mb-2">
            ATELIER CATALOGUE
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] tracking-tight">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-[#686868] mt-2">
                Showing {filteredProducts.length} handcrafted footwear reference
                {filteredProducts.length === 1 ? '' : 's'}
              </p>
            </div>

            {/* Search Box */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-[#686868] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models, leather, type..."
                className="w-full bg-[#F8F7F3] border border-[#E7E3DA] py-2.5 pl-9 pr-3 text-xs text-[#171717] focus:border-[#B89550] focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E7E3DA]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`py-2 px-3 text-xs font-medium uppercase tracking-wider border transition-colors cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'border-[#B89550] bg-[#171717] text-white'
                    : 'border-[#E7E3DA] bg-white text-[#686868] hover:text-[#171717] hover:border-black'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort & Gender Controls */}
          <div className="flex items-center gap-3">
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="border border-[#E7E3DA] bg-white text-xs py-2 px-3 focus:outline-hidden focus:border-[#B89550] cursor-pointer text-[#171717]"
              aria-label="Filter by gender"
            >
              <option value="all">All Genders</option>
              <option value="Men">Men's Fit</option>
              <option value="Women">Women's Fit</option>
              <option value="Unisex">Unisex Silhouettes</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-[#E7E3DA] bg-white text-xs py-2 px-3 focus:outline-hidden focus:border-[#B89550] cursor-pointer text-[#171717]"
              aria-label="Sort products"
            >
              <option value="featured">Sort: Curated Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-[#E7E3DA] bg-[#F8F7F3] p-8">
            <p className="font-serif text-xl text-[#171717] mb-2">No Footwear Matches Your Filter</p>
            <p className="text-xs text-[#686868] mb-6">
              Try adjusting your category selection or resetting your search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedGender('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-[#171717] hover:bg-[#B89550] text-white text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
