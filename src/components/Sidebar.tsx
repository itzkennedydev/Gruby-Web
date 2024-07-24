import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserButton, useUser } from '@clerk/nextjs';
import {
  Home,
  Users,
  Bell,
  MessageSquare,
  File,
  FileText,
  CreditCard,
  HelpCircle,
  Settings,
  Grid,
  Sliders,
  Menu,
  LucideIcon,
} from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}

interface DividerItem {
  label: string;
  isDivider: true;
}

type MenuItem = MenuItemProps | DividerItem;

const MenuItem: React.FC<MenuItemProps> = ({
                                             icon: Icon, label, href, isActive, onClick,
                                           }) => (
    <Link
        href={href}
        className={`flex items-center px-4 py-2 text-[13px] ${isActive ? 'bg-[#eff1f4]' : 'hover:bg-[#eff1f4]'}`}
        onClick={onClick}
    >
      <Icon className="mr-3 text-[#212b36]" size={16} />
      <span className="text-[#212b36]">{label}</span>
    </Link>
);

interface SidebarProps {
  onPortalClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onPortalClick }) => {
  const router = useRouter();
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemClick = (href: string): void => {
    router.push(href);
    if (isMobile) setIsMenuOpen(false);
  };

  const menuItems: MenuItem[] = [
    { icon: Home, label: 'Home', href: '/', isActive: router.pathname === '/', onClick: () => handleItemClick('/') },
    { icon: Users, label: 'Clients', href: '/clients', isActive: router.pathname === '/clients', onClick: () => handleItemClick('/clients') },
    { icon: Bell, label: 'Notifications', href: '/notifications', isActive: router.pathname === '/notifications', onClick: () => handleItemClick('/notifications') },
    { label: 'Apps', isDivider: true },
    { icon: MessageSquare, label: 'Messages', href: '/messages', isActive: router.pathname === '/messages', onClick: () => handleItemClick('/messages') },
    { icon: File, label: 'Files', href: '/FilesPage', isActive: router.pathname === '/FilesPage', onClick: () => handleItemClick('/FilesPage') },
    { icon: FileText, label: 'Contracts', href: '/contracts', isActive: router.pathname === '/contracts', onClick: () => handleItemClick('/contracts') },
    { icon: Grid, label: 'Forms', href: '/forms', isActive: router.pathname === '/forms', onClick: () => handleItemClick('/forms') },
    { icon: CreditCard, label: 'Billing', href: '/billing', isActive: router.pathname === '/billing', onClick: () => handleItemClick('/billing') },
    { icon: HelpCircle, label: 'Helpdesk', href: '/helpdesk', isActive: router.pathname === '/helpdesk', onClick: () => handleItemClick('/helpdesk') },
    { label: 'Preferences', isDivider: true },
    { icon: Settings, label: 'App Setup', href: '/app-setup', isActive: router.pathname === '/app-setup', onClick: () => handleItemClick('/app-setup') },
    { icon: Sliders, label: 'Customization', href: '/customization', isActive: router.pathname === '/customization', onClick: () => handleItemClick('/customization') },
  ];

  return (
      <>
        {isMobile && (
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
            >
              <Menu size={24} />
            </button>
        )}
        <div
            className={`
          fixed top-0 left-0 z-40
          w-[200px] h-screen
          bg-[#f8f9fb]
          border-r border-[#eff1f4]
          flex flex-col
          overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${isMobile ? (isMenuOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        `}
        >
          <div className="p-4 mb-2 flex items-center">
            <UserButton />
            <div className="ml-3">
              <h1 className="text-[13px] font-semibold text-gray-600">
                {user?.firstName} {user?.lastName}
              </h1>
            </div>
          </div>
          <nav className="flex-grow">
            {menuItems.map((item, index) => (
                'isDivider' in item ? (
                    <div key={index} className="px-4 py-2 text-xs font-semibold text-gray-500 border-t border-[#eff1f4] mt-2">{item.label}</div>
                ) : (
                    <MenuItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        isActive={item.isActive}
                        onClick={item.onClick}
                    />
                )
            ))}
          </nav>
          <div className="mt-auto mb-4">
            <MenuItem
                icon={HelpCircle}
                label="Help Center"
                href="/help"
                isActive={router.pathname === '/help'}
                onClick={() => handleItemClick('/help')}
            />
            <MenuItem
                icon={Settings}
                label="Settings"
                href="/settings"
                isActive={router.pathname === '/settings'}
                onClick={() => handleItemClick('/settings')}
            />
            <div className="border-t border-[#eff1f4] mt-2 pt-2">
              <button
                  onClick={onPortalClick}
                  className="flex items-center px-4 py-2 w-full text-left text-[13px] hover:bg-[#eff1f4]"
              >
                <div className="w-3 h-3 rounded-full bg-green-500 mr-3" />
                <span className="text-[#212b36]">Portal</span>
              </button>
            </div>
          </div>
        </div>
      </>
  );
};

export default Sidebar;