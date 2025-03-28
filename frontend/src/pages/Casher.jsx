import React from 'react'
import Casher_menu_bar from '../components/Casher/Casher_menu_bar'

function Casher() {
  return (
   <div className="flex flex-row h-screen">
      {/* Sidebar (Kitchen Menu Bar) */}
      <div className="relative top-0 z-10">
        <Casher_menu_bar onMenuClick={handleMenuClick} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow overflow-y-auto h-full w-auto box-border">
        {/* {activeContent === 'Dashboard' && <Kitchen_Dashboard/>}
        {activeContent === 'Report' && <Kitchen_Report/>} */}
        fhgfg
        
      </div>
    </div>
  )
}

export default Casher