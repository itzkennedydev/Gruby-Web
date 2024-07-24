import React from 'react';

const Header: React.FC = () => (
  <header className="bg-[#f8f9fb] border-b border-[#eff1f4] p-4">
    <div className="flex justify-between items-center">
      <h2 className="text-[13px] font-normal text-[#212b36]">Home</h2>
      <div className="bg-[#212b36] text-white text-xs py-1 px-2 rounded">
        You have 6 days left of your trial |
        {' '}
        <a href="#" className="underline">Select a plan</a>
      </div>
    </div>
  </header>
);

export default Header;
