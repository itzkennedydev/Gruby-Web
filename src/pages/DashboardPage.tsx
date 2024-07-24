import React, { useState } from 'react';
import Sidebar from "~/components/Sidebar";

const DashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <div className="flex h-screen bg-white">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        </div>
    );
};

export default DashboardPage;