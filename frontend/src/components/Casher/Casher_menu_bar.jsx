import React, { useState } from 'react'
import logo from '../../assets/logo.png';

function Casher_menu_bar() {
                            const [toggle, setToggle] = useState(false);
    const [activeItem, setActiveItem] = useState('Dashboard'); // Default active item

    const handleMenuClick = (menuItem) => {
        setActiveItem(menuItem);
        onMenuClick(menuItem);
    };

    return toggle ? (
        <div className="flex flex-col justify-between w-20 h-[97vh] border-r border-gray-300">
            {/* Minimized Menu */}
            <div className="flex flex-col bg-white">
                <div className="flex items-center justify-between p-4 border-b border-gray-300">
                    <div className="min-w-[41px] min-h-[41px]">
                        <img src={logo} alt="logo" className="w-10 h-10 rounded-full object-cover" />
                    </div>
                    <button onClick={() => setToggle(!toggle)} className="text-xl text-black hover:text-blue-700">
                        <i className="fa-sharp fa-solid fa-bars"></i>
                    </button>
                </div>

                <div className="flex flex-col space-y-2">
                    {[
                        { name: 'Dashboard', icon: 'fa-house' },
                        { name: 'Receive payment', icon:''},
                        { name: 'Paid Bills', icon: ''},
                        { name: 'Report', icon: 'fa-chart-pie' }
                    ].map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleMenuClick(item.name)}
                            className={`flex justify-center items-center p-4 text-xl transition-all ${
                                activeItem === item.name ? 'text-blue-500' : 'text-gray-700'
                            } hover:bg-gray-300`}
                        >
                            <i className={`fa-solid ${item.icon}`}></i>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <button className="flex justify-center items-center p-4 text-xl hover:bg-gray-300">
                    <i className="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
        </div>
    ) : (
        <div className="flex flex-col justify-between w-60 h-[97vh] border-r border-gray-300">
            {/* Maximized Menu */}
            <div className="flex flex-col bg-white">
                <div className="flex items-center justify-between p-4 border-b border-gray-300">
                    <div className="min-w-[41px] min-h-[41px]">
                        <img src={logo} alt="logo" className="w-10 h-10 rounded-full object-cover" />
                    </div>
                    <p className="ml-3 text-xl font-semibold">Company</p>
                    <button onClick={() => setToggle(!toggle)} className="text-xl text-black hover:text-blue-700">
                        <i className="fa-sharp fa-solid fa-bars"></i>
                    </button>
                </div>

                <div className="flex flex-col space-y-2">
                    {[
                        { name: 'Dashboard', icon: 'fa-house' },
                        { name: 'Receive  payment', icon:''},
                        { name: 'Paid Bills', icon: ''},
                        { name: 'Report', icon: 'fa-chart-pie' }
                    ].map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleMenuClick(item.name)}
                            className={`flex items-center p-4 text-lg transition-all ${
                                activeItem === item.name ? 'text-blue-500' : 'text-gray-700'
                            } hover:bg-gray-300`}
                        y>
                            <i className={`fa-solid ${item.icon} mr-3`}></i> {item.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <button className="flex items-center w-full p-4 text-lg hover:bg-gray-300">
                    <i className="fa-solid fa-right-from-bracket mr-3"></i> Logout
                </button>
            </div>
        </div>
    );
}

export default Casher_menu_bar