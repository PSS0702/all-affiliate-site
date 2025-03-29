import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const prisma = new PrismaClient();

interface Coupon {
  id: string;
  code: string;
  discount: number;
  description: string;
}

interface Review {
  id: string;
  title: string;
  content: string;
  rating: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  url: string;
  category: string;
  platform: string;
  reviews: Review[];
  coupons: Coupon[];
}

async function getProduct(id: string): Promise<Product> {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      reviews: true,
      coupons: {
        where: {
          isActive: true,
          endDate: {
            gt: new Date(),
          },
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  return product as Product;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id);
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-600 mb-4">
            {product.price.toLocaleString()}원
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          {product.coupons.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">사용 가능한 쿠폰</h2>
              <div className="space-y-2">
                {product.coupons.map((coupon) => (
                  <div key={coupon.id} className="bg-yellow-50 p-3 rounded">
                    <p className="font-semibold">코드: {coupon.code}</p>
                    <p>할인: {coupon.discount}%</p>
                    <p className="text-sm text-gray-600">{coupon.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Link
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            구매하기
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">제품 리뷰</h2>
        <div className="space-y-6">
          {product.reviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{review.title}</h3>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 whitespace-pre-line">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 