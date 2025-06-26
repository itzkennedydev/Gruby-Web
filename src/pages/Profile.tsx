import React, { useState, useEffect } from 'react';
import { UserProfile } from '@clerk/nextjs';
import Layout from '../components/Layout';
import OrderList from '../components/OrderList';
import { FavoritesList } from '../components/FavoritesList';
import type { Product } from '../types/Product';
import type { FavoriteItem } from '../types/FavoriteItem';

type TabType = 'profile' | 'orders' | 'favorites';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isHomeCook, setIsHomeCook] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favorites');
        const data = await response.json() as Product[];
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    void fetchFavorites();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="mt-6 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
            <OrderList />
          </div>
        );
      case 'favorites':
        return (
          <div className="mt-6 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Your Favorites</h2>
            <FavoritesList 
              favorites={favorites.map(({ id, ...rest }): FavoriteItem => ({ 
                ...rest, 
                id: typeof id === 'string' ? parseInt(id, 10) : id,
                homeCook: 'Home Cook' // Placeholder since Product doesn't have homeCook property
              }))} 
            />
          </div>
        );
      case 'profile':
      default:
        return (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <UserProfile routing="hash" />
          </div>
        );
    }
  };

  const TabButton: React.FC<{ tab: TabType; label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex-1 py-2 px-4 rounded-md transition-colors duration-300 ${
        activeTab === tab ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <Layout>
      <div className="profile-page max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex mb-4 space-x-2">
                <TabButton tab="profile" label="Profile" />
                <TabButton tab="orders" label="Orders" />
                <TabButton tab="favorites" label="Favorites" />
              </div>
              {renderContent()}
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <button
                onClick={() => setIsHomeCook(!isHomeCook)}
                className="flex items-center justify-center w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300 mt-4"
              >
                {isHomeCook ? 'Switch to Buyer Account' : 'Switch to Home Cook Account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
