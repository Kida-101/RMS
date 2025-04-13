import React, { useState } from 'react';
import Casher_menu_bar from '../components/Casher/Casher_menu_bar';
import Casher_payment_receive from '../components/Casher/Casher_payment_receive';
import Casher_paid_bill from '../components/Casher/Casher_paid_bill';
import Casher_Dashboard from '../components/Casher/Casher_Dashboard';
import Casher_report from '../components/Casher/Casher_report';

function Casher() {
    const [activeContent, setActiveContent] = useState('Dashboard');

    const handleMenuClick = (content) => {
        setActiveContent(content);
    };

    return (
        <div className="flex flex-row h-screen">
            {/* Sidebar (Casher Menu Bar) */}
            <div className="relative top-0 z-10">
                <Casher_menu_bar onMenuClick={handleMenuClick} />
            </div>

            {/* Main Content */}
            <div className="bg-gray-100 flex flex-col flex-grow overflow-y-auto h-full w-auto box-border">
                {activeContent === 'Dashboard' && <Casher_Dashboard/>}
                {activeContent === 'Pending payment' && <Casher_payment_receive/>}
                {activeContent === 'Paid Bills' && <Casher_paid_bill/>}
                {activeContent === 'Report' && <Casher_report/>}
            </div>
        </div>
    );
}

export default Casher;