import React, { useState } from 'react';
import Kitchen_menu_bar from '../components/Kitchen_manager/Kitchen_menu_bar/Kitchen_menu_bar';
import Kitchen_request from '../components/Kitchen_manager/Kitchen_request/Kitchen_request';
import Stoke_respond from '../components/Kitchen_manager/Stoke_respond/Stoke_respond';
import Kitchen_Assign_Order from '../components/Kitchen_manager/Kitchen_Assign_Order/Kitchen_Assign_Order';
import Kitchen_Served_order from '../components/Kitchen_manager/Kitchen_Served_order/Kitchen_Served_order';
import Kitchen_Available_Menu from '../components/Kitchen_manager/Kitchen_Available_Menu/Kitchen_Available_Menu';
import Kitchen_delivered_orders from '../components/Kitchen_manager/Kitchen_delivered_orders/Kitchen_delivered_orders';
import Kitchen_Dashboard from '../components/Kitchen_manager/Kitchen_Dashboard/Kitchen_Dashboard';
import Kitchen_Report from '../components/Kitchen_manager/Kitchen_Report/Kitchen_Report';

function Kitchen_manager() {
  const [activeContent, setActiveContent] = useState('Dashboard'); 

  const handleMenuClick = (content) => {
    setActiveContent(content);
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Sidebar (Kitchen Menu Bar) */}
      <div className="relative top-0 z-10">
        <Kitchen_menu_bar onMenuClick={handleMenuClick} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow overflow-y-auto h-full w-auto box-border">
        {activeContent === 'Stock Response' && <Stoke_respond />}
        {activeContent === 'Request Stock' && <Kitchen_request />}
        {activeContent === 'Assign Order' && <Kitchen_Assign_Order />}
        {activeContent === 'Served Orders' && <Kitchen_Served_order />}
        {activeContent === 'Available Menu' && <Kitchen_Available_Menu />}
        {activeContent === 'Delivered orders' && <Kitchen_delivered_orders />}
        {activeContent === 'Dashboard' && <Kitchen_Dashboard/>}
        {activeContent === 'Report' && <Kitchen_Report/>}
        
      </div>
    </div>
  );
}

export default Kitchen_manager;
