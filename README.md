# 종합 어필리에이트 사이트

최신 쿠폰과 제품 리뷰를 제공하는 종합 어필리에이트 사이트입니다.

## 기술 스택

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Vercel (배포)

## 주요 기능

- 자동 리뷰 생성
- 쿠폰 정보 제공
- 제품 정보 표시
- SEO 최적화

## 시작하기

1. 저장소 클론
```bash
git clone https://github.com/your-username/affiliate-site.git
cd affiliate-site
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
```bash
cp .env.example .env
# .env 파일을 수정하여 필요한 환경 변수를 설정합니다.
```

4. 데이터베이스 마이그레이션
```bash
npx prisma migrate dev
```

5. 개발 서버 실행
```bash
npm run dev
```

## 배포

이 프로젝트는 Vercel을 통해 배포됩니다.

1. [Vercel](https://vercel.com)에 가입
2. GitHub 저장소 연결
3. 환경 변수 설정
4. 배포

## 라이선스

MIT
