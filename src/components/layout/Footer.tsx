import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 사이트 소개 */}
          <div>
            <h3 className="text-xl font-bold mb-4">AffiliateHub</h3>
            <p className="text-gray-400">
              최신 쿠폰과 할인 정보를 한눈에 확인하세요.
              쇼핑, 여행, 정보 등 다양한 카테고리의
              최적의 가격을 찾아드립니다.
            </p>
          </div>

          {/* 고객 지원 */}
          <div>
            <h3 className="text-xl font-bold mb-4">고객 지원</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>

          {/* 카테고리 */}
          <div>
            <h3 className="text-xl font-bold mb-4">카테고리</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shopping" className="text-gray-400 hover:text-white">
                  쇼핑
                </Link>
              </li>
              <li>
                <Link href="/travel" className="text-gray-400 hover:text-white">
                  여행
                </Link>
              </li>
              <li>
                <Link href="/info" className="text-gray-400 hover:text-white">
                  정보
                </Link>
              </li>
            </ul>
          </div>

          {/* 소셜 미디어 */}
          <div>
            <h3 className="text-xl font-bold mb-4">소셜 미디어</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} AffiliateHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 