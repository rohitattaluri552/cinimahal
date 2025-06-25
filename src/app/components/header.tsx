import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex justify-between items-center">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-gray-700 hover:text-black">
                Cinimahal
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-gray-700 hover:text-black">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="text-gray-700 hover:text-black">
                Check out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
