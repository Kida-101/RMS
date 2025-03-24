import React, { useState } from 'react';
import './pageStyls/Kitchen_manager.css';
import Kitchen_menu_bar from '../components/Kitchen_manager/Kitchen_menu_bar/Kitchen_menu_bar';
import Kitchen_header from '../components/Kitchen_manager/Kitchen_header/Kitchen_header';
import Kitchen_request from '../components/Kitchen_manager/Kitchen_request/Kitchen_request';
import Stoke_respond from '../components/Kitchen_manager/Stoke_respond/Stoke_respond';
import Kitchen_Assign_Order from '../components/Kitchen_manager/Kitchen_Assign_Order/Kitchen_Assign_Order';
import Kitchen_Served_order from '../components/Kitchen_manager/Kitchen_Served_order/Kitchen_Served_order';
import Kitchen_Available_Menu from '../components/Kitchen_manager/Kitchen_Available_Menu/Kitchen_Available_Menu';

function Kitchen_manager() {
  const [activeContent, setActiveContent] = useState('stockResponse'); // Default to 'stockResponse'

  const handleMenuClick = (content) => {
    setActiveContent(content);
  };

  return (
    <div className="Kitchen_manager_continer">
      <div className="Kitchen_menu_bar">
        <Kitchen_menu_bar onMenuClick={handleMenuClick} />
      </div>
      <div className="main">
        {activeContent === 'Stock Response' && <Stoke_respond />}
        {activeContent === 'Request Stock' && <Kitchen_request />}
        {activeContent === 'Assign Order' && <Kitchen_Assign_Order/>}
        {activeContent === 'Served Orders' && <Kitchen_Served_order/>}
        {activeContent === 'Available Menu' && <Kitchen_Available_Menu/>}
        {/* You can add more components here as you add more buttons */}
      </div>
    </div>
  );
}

export default Kitchen_manager;
