import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  const popularSearches = [
    '알리익스프레스 쿠폰',
    '아이허브 프로모션',
    '테무 신규가입',
    '마켓컬리 할인',
    '오늘의집 쿠폰',
  ];

  const categories = [
    {
      name: '쇼핑',
      subcategories: [
        { name: '직구', href: '/shopping/global' },
        { name: '국내', href: '/shopping/domestic' },
      ],
    },
    {
      name: '여행',
      subcategories: [
        { name: '호텔', href: '/travel/hotels' },
        { name: '항공', href: '/travel/flights' },
        { name: '패키지', href: '/travel/packages' },
      ],
    },
    {
      name: '정보',
      subcategories: [
        { name: '리뷰', href: '/info/reviews' },
        { name: '유튜브', href: '/info/youtube' },
        { name: '겜스고', href: '/info/gamesgo' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* 메인 배너 */}
      <section className="relative h-[400px] rounded-lg overflow-hidden">
        <Image
          src="/images/main-banner.jpg"
          alt="메인 배너"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">최신 쿠폰과 할인 정보</h1>
            <p className="text-xl">최적의 가격으로 스마트하게 쇼핑하세요</p>
          </div>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">카테고리</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-4">{category.name}</h3>
              <ul className="space-y-2">
                {category.subcategories.map((sub) => (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 인기 검색어 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">인기 검색어</h2>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search) => (
            <Link
              key={search}
              href={`/search?q=${encodeURIComponent(search)}`}
              className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {search}
            </Link>
          ))}
        </div>
      </section>

      {/* 최신 쿠폰 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">최신 쿠폰</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 쿠폰 카드 예시 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">알리익스프레스</span>
              <span className="text-sm text-red-500">신규</span>
            </div>
            <h3 className="text-lg font-bold mb-2">
              신규가입 5만원 할인 쿠폰
            </h3>
            <p className="text-gray-600 mb-4">
              알리익스프레스 신규가입 시 5만원 할인 쿠폰 발급
            </p>
            <Link
              href="/coupons/aliexpress-new-user"
              className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              쿠폰 받기
            </Link>
          </div>
          {/* 추가 쿠폰 카드들... */}
        </div>
      </section>
    </div>
  );
}
