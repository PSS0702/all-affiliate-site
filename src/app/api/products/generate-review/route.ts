import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

async function scrapeProductInfo(url: string) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    
    // 제품 정보 추출 (플랫폼별 선택자 최적화)
    const title = $('h1').first().text().trim();
    const price = parseFloat($('[data-price]').attr('data-price') || '0');
    const description = $('.product-description').text().trim();
    const image = $('.product-image img').attr('src') || '';

    return { title, price, description, image };
  } catch (error) {
    console.error('Error scraping product:', error);
    throw new Error('Failed to scrape product information');
  }
}

export async function POST(request: Request) {
  try {
    const { url, category, platform } = await request.json();

    // 제품 정보 스크래핑
    const productInfo = await scrapeProductInfo(url);

    // 제품 생성
    const product = await prisma.product.create({
      data: {
        name: productInfo.title,
        description: productInfo.description,
        price: productInfo.price,
        image: productInfo.image,
        url,
        category,
        platform,
      },
    });

    // 리뷰 생성 (더 자연스러운 리뷰 템플릿)
    const reviewTemplates = [
      {
        title: `${productInfo.title} 구매 후기`,
        content: `안녕하세요! 오늘은 ${productInfo.title}에 대해 리뷰해드리겠습니다.\n\n` +
                `제품 가격: ${productInfo.price.toLocaleString()}원\n\n` +
                `제품 특징:\n${productInfo.description}\n\n` +
                `구매 시 참고사항:\n` +
                `1. 제품 품질이 매우 만족스럽습니다.\n` +
                `2. 배송이 빠르고 안전합니다.\n` +
                `3. 가격 대비 성능이 우수합니다.\n\n` +
                `전반적으로 매우 만족스러운 제품이었습니다. 추천드립니다!`,
        rating: 5
      },
      {
        title: `${productInfo.title} 상세 리뷰`,
        content: `안녕하세요! ${productInfo.title}에 대한 상세 리뷰를 작성해드리겠습니다.\n\n` +
                `제품 정보:\n` +
                `- 가격: ${productInfo.price.toLocaleString()}원\n` +
                `- 카테고리: ${category}\n` +
                `- 구매 플랫폼: ${platform}\n\n` +
                `제품 설명:\n${productInfo.description}\n\n` +
                `구매 시 고려사항:\n` +
                `1. 제품의 품질이 매우 우수합니다.\n` +
                `2. 배송이 신속하고 안전합니다.\n` +
                `3. 가격 대비 성능이 매우 만족스럽습니다.\n\n` +
                `결론적으로, 매우 추천드리는 제품입니다!`,
        rating: 5
      }
    ];

    // 랜덤하게 템플릿 선택
    const template = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];

    const review = await prisma.review.create({
      data: {
        ...template,
        productId: product.id,
      },
    });

    return NextResponse.json({ product, review });
  } catch (error) {
    console.error('Error generating review:', error);
    return NextResponse.json(
      { error: 'Failed to generate review' },
      { status: 500 }
    );
  }
} 