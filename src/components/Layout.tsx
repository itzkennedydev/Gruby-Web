import React, { useState } from 'react';
import Sidebar from './Sidebar';
import PortalStatusModal from './PortalStatusModal';
import Header from "./Header";


interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);

  const openPortalModal = () => setIsPortalModalOpen(true);
  const closePortalModal = () => setIsPortalModalOpen(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fb]">
      <Sidebar onPortalClick={openPortalModal} />
      <div className="flex flex-col flex-1 overflow-hidden ml-[200px]">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
          {children}
        </main>
      </div>
      <PortalStatusModal isOpen={isPortalModalOpen} onClose={closePortalModal} />
    </div>
  );
};

export default Layout;
