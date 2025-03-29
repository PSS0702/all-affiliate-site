'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GenerateReview() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [platform, setPlatform] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    '쇼핑',
    '여행',
    '정보',
  ];

  const platforms = [
    '알리익스프레스',
    '아이허브',
    '테무',
    '파페치',
    '마이테레사',
    '마켓컬리',
    '오늘의집',
    '크림',
    '무신사',
    '미트리',
    '여신티켓',
    '트립닷컴',
    '아고다',
    '호텔스닷컴',
    '마이리얼트립',
    '클룩',
    '익스피디아',
    '야놀자',
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/products/generate-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          category,
          platform,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || '리뷰 생성 중 오류가 발생했습니다.');
      }

      const data = await response.json();
      router.push(`/products/${data.product.id}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : '리뷰 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">자동 리뷰 생성</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            제품 URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="https://example.com/product"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            카테고리
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">카테고리 선택</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
            플랫폼
          </label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">플랫폼 선택</option>
            {platforms.map((plat) => (
              <option key={plat} value={plat}>
                {plat}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? '리뷰 생성 중...' : '리뷰 생성하기'}
        </button>
      </form>
    </div>
  );
} 