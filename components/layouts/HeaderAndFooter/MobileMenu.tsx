'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { FaAngleRight } from 'react-icons/fa';
import { Button } from '@/libs/Index';
import {
  fetchHeaderdata,
  fetchNavbardata,
  fetchSocailMediadata,
} from '@/components/api/ContentAPI';
import ShimmerCartPage from '@/components/layouts/Shimmar/ShimmerHomePage';

export interface DropdownItem {
  ImageUrl?: string;
  name: string;
  description?: string;
  link: string;
}

const parseDropdownItems = (items: any[]): DropdownItem[] =>
  items.map((item) => ({
    name: item.DropDownTitle,
    description: item.DropDownDescription,
    link: item.DropDownURL ?? '/product',
    ImageUrl: item.DropDownImage?.url,
  }));

interface NavbarItem {
  id: number;
  NavbarTitle: string;
  NavbarURL?: string;
  DropDown?: any[];
}

interface HeaderData {
  Logo?: { url: string };
  HeaderButtonURL?: string;
  HeaderButtonTitle?: string;
  HeaderCartURL?: string;
  HeaderCartIcon?: { url: string };
}

interface NavbarData {
  Navbar?: NavbarItem[];
}

const PRODUCT_TITLES_LOWER = ['products', 'produkte'];
const COMPANY_TITLES_LOWER = ['company', 'unternehmen'];

const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [activeSubMenu, setActiveSubMenu] = useState<
    'products' | 'company' | 'produkte' | 'unternehmen' | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState<HeaderData>({});
  const [navbarData, setNavbarData] = useState<NavbarData>({});
  const [productItems, setProductItems] = useState<DropdownItem[]>([]);
  const [companyItems, setCompanyItems] = useState<DropdownItem[]>([]);
  const [socialMediaData, setSocialMediaData] = useState<any>({
    SocailMedia: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [navbarResponse, headerResponse, SocialMediaResponse] =
          await Promise.all([
            fetchNavbardata(),
            fetchHeaderdata(),
            fetchSocailMediadata(),
          ]);

        const navData = navbarResponse.data;
        const headData = headerResponse.data;

        setNavbarData(navData);
        setHeaderData(headData);
        setSocialMediaData(SocialMediaResponse.data);

        if (navData.Navbar && Array.isArray(navData.Navbar)) {
          const productNavItem = navData.Navbar.find((item) =>
            PRODUCT_TITLES_LOWER.includes(item.NavbarTitle.toLowerCase())
          );
          const companyNavItem = navData.Navbar.find((item) =>
            COMPANY_TITLES_LOWER.includes(item.NavbarTitle.toLowerCase())
          );

          if (productNavItem?.DropDown) {
            setProductItems(parseDropdownItems(productNavItem.DropDown));
          }
          if (companyNavItem?.DropDown) {
            setCompanyItems(parseDropdownItems(companyNavItem.DropDown));
          }
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubMenu = (
    menu: 'products' | 'company' | 'produkte' | 'unternehmen'
  ) => {
    setActiveSubMenu(menu);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setActiveSubMenu(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (loading) return <ShimmerCartPage />;
  if (error) return <div>{error}</div>;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-opacity-75 z-50 transition-transform duration-300 ${
        isOpen ? 'translate-y-[9%]' : 'translate-y-full'
      }`}
    >
      <div className="bg-white w-full h-[91%] overflow-y-auto flex flex-col justify-between">
        <div>
          {activeSubMenu && (
            <div className="p-4">
              <div
                className="flex items-center gap-2 mb-4 cursor-pointer"
                onClick={() => setActiveSubMenu(null)}
              >
                <IoIosArrowBack className="text-secondary" />
                <span className="text-secondary text-sm font-medium capitalize">
                  {activeSubMenu}
                </span>
              </div>

              {(activeSubMenu === 'products' || activeSubMenu === 'produkte') ? (
                <div className="grid grid-cols-2 gap-6">
                  {productItems.map((item, index) => (
                    <Link key={index} href={item.link} onClick={onClose}>
                      <div className="bg-[#F5F8FE] p-4 text-center rounded-16">
                        <div className="items-start space-y-4">
                          {item.ImageUrl && (
                            <Image
                              src={item.ImageUrl}
                              alt={item.name}
                              width={30}
                              height={30}
                              className="w-full"
                            />
                          )}
                          <div className="space-y-1">
                            <span className="text-[14px] font-primary font-semibold">
                              {item.name}
                            </span>
                            <p className="text-[12px] font-secondary">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div>
                  {companyItems.map((item, index) => (
                    <Link key={index} href={item.link} onClick={onClose}>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-16 mb-2 hover:bg-[#F5F8FE]">
                        {item.ImageUrl && (
                          <Image
                            src={item.ImageUrl}
                            alt={item.name}
                            width={30}
                            height={30}
                          />
                        )}
                        <div>
                          <span className="text-sm leading-24 font-semibold font-primary">
                            {item.name}
                          </span>
                          {item.description && (
                            <p className="text-[14px] text-secondary font-semibold font-secondary">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {!activeSubMenu && (
            <nav className="p-4 pt-6 space-y-4">
              {navbarData.Navbar &&
                navbarData.Navbar.map((navItem) => {
                  const lowerTitle = navItem.NavbarTitle.toLowerCase();
                  const isProduct = PRODUCT_TITLES_LOWER.includes(lowerTitle);
                  const isCompany = COMPANY_TITLES_LOWER.includes(lowerTitle);

                  if (isProduct || isCompany) {
                    return (
                      <div
                        key={navItem.id}
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() =>
                          handleSubMenu(isProduct ? 'products' : 'company')
                        }
                      >
                        <span className="font-medium text-lg">
                          {navItem.NavbarTitle}
                        </span>
                        <FaAngleRight className="text-secondary" />
                      </div>
                    );
                  } else {
                    return (
                      <Link
                        key={navItem.id}
                        href={navItem.NavbarURL || '#'}
                        onClick={onClose}
                        className="block font-medium text-lg"
                      >
                        {navItem.NavbarTitle}
                      </Link>
                    );
                  }
                })}
            </nav>
          )}
        </div>

        <div className="flex flex-col items-left gap-4 justify-between shadow-mobile_menu p-4">
          <div>
            <Link href={headerData.HeaderButtonURL || 'https://my.tapect.com/'}>
              <Button type="button" onClick={onClose}>
                {headerData.HeaderButtonTitle || 'Log In'}
              </Button>
            </Link>
          </div>

          <div className="flex space-x-4">
            {socialMediaData.SocailMedia.map((social: any, index: number) => (
              <a
                key={index}
                href={social.SocailMediaURL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary rounded-[8px]"
              >
                <Image
                  src={social.SocailMediaIcons?.url || ''}
                  alt={social.SocailMediaIcons?.name ?? `Social Media ${index + 1}`}
                  width={40}
                  height={40}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
