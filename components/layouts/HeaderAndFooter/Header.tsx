'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoIosArrowDown } from 'react-icons/io';
import { FaBars, FaTimes } from 'react-icons/fa';

import { Button, Image } from '@/libs/Index'; // Adjust if needed
import MobileMenu from './MobileMenu';
import { fetchHeaderdata, fetchNavbardata } from '@/components/api/ContentAPI';
import ShimmerCartPage from '@/components/layouts/Shimmar/ShimmerHomePage';

interface DropdownItem {
  ImageUrl?: string;
  name: string;
  description?: string;
  link: string;
}

export const parseDropdownItems = (items: any[]): DropdownItem[] =>
  items.map((item) => ({
    name: item.DropDownTitle,
    description: item.DropDownDescription,
    link: item.DropDownURL ?? '/product',
    ImageUrl: item.DropDownImage?.url,
  }));

const renderDropdown = (
  items: DropdownItem[],
  type: 'product' | 'company',
  pathname: string
) => {
  return (
    <div
      className={`dropdown-container absolute top-full pt-[24%] ${
        type === 'product'
          ? 'dropdown-product-container'
          : 'md:w-fit lg:w-[363px] md:-left-20 lg:left-0'
      } hidden`}>
      <div
        className={`dropdown lg:w-auto ${
          type === 'product' ? 'md:w-[600px]' : 'md:w-[360px]'
        }`}>
        <div
          className={`${
            type === 'product'
              ? 'grid md:grid-cols-2 lg:grid-cols-4 gap-6'
              : ''
          }`}>
          {items.map((item, index) => {
            const isActive = pathname === item.link;
            const dropdownItemClasses = `dropdown-item ${
              isActive ? 'bg-[#F5F8FE]' : ''
            }`;

            return (
              <Link key={index} href={item.link} className={dropdownItemClasses}>
                <div
                  className={`items-start ${
                    type === 'product'
                      ? 'space-y-4'
                      : 'flex items-center gap-[10px]'
                  }`}>
                  {item.ImageUrl && (
                    <Image
                      src={item.ImageUrl}
                      alt={item.name}
                      width={30}
                      height={30}
                      className={`${
                        type === 'product' ? 'w-full' : 'w-[30px] h-[30px]'
                      }`}
                    />
                  )}
                  <div className="space-y-1">
                    <span
                      className={`${
                        type === 'product'
                          ? 'Heading-20'
                          : 'text-[14px] font-primary font-semibold'
                      }`}>
                      {item.name}
                    </span>
                    <p
                      className={`${
                        type === 'product'
                          ? 'Description'
                          : 'font-medium font-secondary text-[12px]'
                      }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [HeaderDatas, setHeaderDatas] = useState<any>({});
  const [NavbarDatas, setNavbarDatas] = useState<any>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [navbardata, headerdata] = await Promise.all([
          fetchNavbardata(),
          fetchHeaderdata(),
        ]);
        setNavbarDatas(navbardata.data);
        setHeaderDatas(headerdata.data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (loading) return <ShimmerCartPage />;
  if (error) return <div>{error}</div>;

  return (
    <header className="bg-white sticky top-0 z-50 border-none shadow-md">
      <div className="container mx-auto py-4 px-6 lg:px-0">
        <div className="flex items-center justify-between">
          {HeaderDatas?.Logo?.url && (
            <div className="Logo">
              <Link href="/">
                <Image
                  src={HeaderDatas.Logo.url}
                  alt="Tapect-logo"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
          )}

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-secondary hover:text-secondary focus:outline-none focus:text-secondary">
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="NavBar md:flex items-center space-x-4 hidden">
            <nav className="md:flex md:space-x-3 lg:space-x-6">
              {NavbarDatas.Navbar?.map((navItem: any) => {
                const hasDropdown =
                  navItem.DropDown && navItem.DropDown.length > 0;
                const parsedItems = parseDropdownItems(navItem.DropDown || []);
                const isProduct = ['products', 'produkte'].includes(
                  navItem.NavbarTitle.toLowerCase()
                );
                const isActive = pathname === navItem.NavbarURL;

                return (
                  <div key={navItem.id} className="relative flex items-center">
                    <Link
                      href={navItem.NavbarURL || '#'}
                      className={`${
                        isActive ? 'Nav-active' : ''
                      } flex items-center navlinks`}
                      onClick={closeMobileMenu}>
                      {navItem.NavbarTitle}
                      {hasDropdown && (
                        <IoIosArrowDown className="ml-0.5 lg:ml-1 pt-0.5" />
                      )}
                    </Link>
                    {hasDropdown &&
                      renderDropdown(
                        parsedItems,
                        isProduct ? 'product' : 'company',
                        pathname
                      )}
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="md:flex hidden items-center space-x-4">
            {HeaderDatas?.HeaderButtonURL && (
              <Link
                href={HeaderDatas.HeaderButtonURL}
                target="_blank"
                className="btn-primary px-3 py-2 hidden md:block">
                <Button type="button">{HeaderDatas.HeaderButtonTitle}</Button>
              </Link>
            )}
            {HeaderDatas?.HeaderCartURL && HeaderDatas?.HeaderCartIcon?.url && (
              <Link href={HeaderDatas.HeaderCartURL}>
                <Image
                  src={HeaderDatas.HeaderCartIcon.url}
                  alt="Cart Icon"
                  width={39}
                  height={39}
                />
              </Link>
            )}
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  );
};

export default Header;
