 import React, { useState } from 'react';
import './Kitchen_menu_bar.css';
import logo from '../../../assets/logo.png';

function Kitchen_menu_bar({ onMenuClick }) {
    const [toggle, setToggle] = useState(false);

    return toggle ? (
        <div className="Kitchen_menu_bar_contener_mini">
            <div className="minimized_menu">
                <div className="menu_logo">
                    <div className="img"><img src={logo} alt="logo" /></div>
                </div>
                <div className="menu_button">
                    <button onClick={() => setToggle(!toggle)}>
                        <i className="fa-sharp fa-solid fa-bars"></i>
                    </button>
                </div>  
                <div className="menu_button"><button onClick={() => onMenuClick('Dashboard')}><i className="fa-solid fa-house"></i></button></div>
                <div className="menu_button"><button onClick={() => onMenuClick('Assign Order')}><i className="fa-solid fa-clipboard-user"></i></button></div>
                <div className="menu_button"><button onClick={() => onMenuClick('Served Orders')}><i className="fa-solid fa-plate-wheat"></i></button></div>
                <div className="menu_button"><button onClick={() => onMenuClick('Available Menu')}><i className="fa-solid fa-list-check"></i></button></div>
                <div className="menu_button"><button onClick={() => onMenuClick('Request Stock')}><i className="fa-solid fa-cart-plus"></i></button></div>
                <div className="menu_button"><button onClick={() => onMenuClick('Stock Response')}><i className="fa-solid fa-reply"></i></button></div>
                <div className="menu_button"><button onClick={() => onMenuClick('Report')}><i className="fa-solid fa-chart-pie"></i></button></div>
            </div>
            <div className="mini_logout">
                <div className="menu_button">
                    <button><i className="fa-solid fa-right-from-bracket"></i></button>
                </div>
            </div>
        </div>
    ) : (
        <div className="Kitchen_menu_bar_contener_max">
            <div className="maximize_menu">
                <div className="menu_logo">
                    <div className="img"><img src={logo} alt="logo" /></div> 
                    &nbsp; <p>Company</p> 
                    <button onClick={() => setToggle(!toggle)}>
                        <i className="fa-sharp fa-solid fa-bars"></i>
                    </button>  
                </div>
                <div className="menu_button"><button onClick={() => onMenuClick('Dashboard')}><i className="fa-solid fa-house"></i>&nbsp;&nbsp; Dashboard</button></div>
                <div className="menu_button"><button onClick={() => onMenuClick('Assign Order')}><i className="fa-solid fa-clipboard-user"></i>&nbsp;&nbsp; Assign Order</button></div>
                <div className="menu_button"><button onClick={() => onMenuClick('Served Orders')}><i className="fa-solid fa-plate-wheat"></i>&nbsp;&nbsp; Served Orders</button></div>
                <div className="menu_button"><button onClick={() => onMenuClick('Available Menu')}><i className="fa-solid fa-list-check"></i>&nbsp;&nbsp; Available Menu</button></div>
                <div className="menu_button"><button onClick={() => onMenuClick('Request Stock')}><i className="fa-solid fa-cart-plus"></i>&nbsp;&nbsp; Request Stock</button></div>
                <div className="menu_button"><button onClick={() => onMenuClick('Stock Response')}><i className="fa-solid fa-reply"></i>&nbsp;&nbsp; Stock Response</button></div>
                <div className="menu_button"><button onClick={() => onMenuClick('Report')}><i className="fa-solid fa-chart-pie"></i>&nbsp;&nbsp; Report</button></div>
            </div>
            <div className="max_logout">
                <div className="menu_button">
                    <button><i className="fa-solid fa-right-from-bracket"></i>&nbsp;&nbsp; Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Kitchen_menu_bar;