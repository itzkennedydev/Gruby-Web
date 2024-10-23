import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-12 mt-auto border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* First Column */}
          <div>
            <div className="mb-4">
              <Image
                src="https://di8mcd92ly4ww.cloudfront.net/GrubyLogo.png"
                alt="Gruby Logo"
                width={120}
                height={23}
              />
            </div>
            <p className="text-sm mb-4">
              Connecting food lovers with talented chefs.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-800 hover:text-black">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-800 hover:text-black">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-800 hover:text-black">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
          {/* Second Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-800 hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-800 hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-800 hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/chefs" className="text-gray-800 hover:underline">
                  Find a Chef
                </Link>
              </li>
            </ul>
          </div>
          {/* Third Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-800 hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-800 hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-800 hover:underline">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          {/* Fourth Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Stay updated with our latest offers and chef stories.
            </p>
            <form noValidate>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="w-full p-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 py-4 mt-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Gruby. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
