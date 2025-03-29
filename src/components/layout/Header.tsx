'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainCategories = [
    { name: '쇼핑', href: '/shopping' },
    { name: '여행', href: '/travel' },
    { name: '정보', href: '/info' },
  ];

  const shoppingSubCategories = [
    { name: '직구', href: '/shopping/global' },
    { name: '국내', href: '/shopping/domestic' },
  ];

  const travelSubCategories = [
    { name: '호텔', href: '/travel/hotels' },
    { name: '항공', href: '/travel/flights' },
    { name: '패키지', href: '/travel/packages' },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">AffiliateHub</span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden md:flex space-x-8">
            {mainCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* 검색바 */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="쿠폰이나 상품을 검색하세요"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FiSearch className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="space-y-4">
              {mainCategories.map((category) => (
                <div key={category.name}>
                  <Link
                    href={category.href}
                    className="block text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 