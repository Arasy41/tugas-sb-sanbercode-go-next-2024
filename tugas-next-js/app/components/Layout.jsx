import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className='min-h-screen'>
      <nav className="bg-white py-4 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto flex flex-row md:flex-row justify-between items-center">
          <div className="text-2xl font-bold mb-4 md:mb-0">LOGO</div>
          <div className="space-y-4 space-x-6 md:space-y-0 md:space-x-6 flex-row md:flex-row">
            <Link href="/" className="text-gray-800 hover:text-gray-600">Home</Link>
            <Link href="/product" className="text-gray-800 hover:text-gray-600">Product</Link>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
