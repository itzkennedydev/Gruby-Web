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

interface DividerProps {
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
                                             icon: Icon,
                                             label,
                                             href,
                                             isActive,
                                             onClick,
                                           }) => (
    <Link
        href={href}
        className={`
      flex items-center px-2 py-2 text-[13px]
      ${isActive ? 'bg-[#eff1f4]' : 'hover:bg-[#eff1f4]'}
      rounded-[5px]
    `}
        onClick={onClick}
    >
      <Icon className="mr-3 text-[#212b36]" size={16} />
      <span className="text-[#212b36]">{label}</span>
    </Link>
);

const Divider: React.FC<DividerProps> = ({ label }) => (
    <div className="px-2 py-2 text-xs font-semibold text-gray-500 border-t border-[#eff1f4] mt-2">
      {label}
    </div>
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

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Users, label: 'Clients', href: '/Clients' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
    { type: 'divider', label: 'Apps' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: File, label: 'Files', href: '/FilesPage' },
    { icon: FileText, label: 'Contracts', href: '/contracts' },
    { icon: Grid, label: 'Forms', href: '/forms' },
    { icon: CreditCard, label: 'Billing', href: '/billing' },
    { icon: HelpCircle, label: 'Helpdesk', href: '/helpdesk' },
    { type: 'divider', label: 'Preferences' },
    { icon: Settings, label: 'App Setup', href: '/app-setup' },
    { icon: Sliders, label: 'Customization', href: '/customization' },
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
          <nav className="flex-grow px-2">
            {menuItems.map((item, index) => (
                'type' in item ? (
                    <Divider key={index} label={item.label} />
                ) : (
                    <MenuItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        isActive={router.pathname === item.href}
                        onClick={() => handleItemClick(item.href)}
                    />
                )
            ))}
          </nav>
          <div className="mt-auto mb-4 px-2">
            <div className="border-t border-[#eff1f4] mt-2 pt-2">
              <button
                  onClick={onPortalClick}
                  className="flex items-center px-2 py-2 w-full text-left text-[13px] hover:bg-[#eff1f4] rounded-[5px]"
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