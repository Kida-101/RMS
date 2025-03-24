import React, { useState } from 'react'
import './Kitchen_menu_bar.css'
import logo from '../../assets/logo.png'
function Kitchen_menu_bar() {
    const [toogle,setToggle]= useState(0);
    
    

    if (toogle % 2 == 0) {
    return (
    <div className='Kitchen_menu_bar_contener_max'>
       <div className='maximize_menu'>
        <div className='menu_logo'>
          <div className='img'><img src={logo} alt='logo' /></div> &nbsp; <p>Company</p> <button onClick={()=>setToggle(toogle+1)}><i class="fa-sharp fa-solid fa-bars"></i></button>  
        </div>
         <div className='menu_button'>
            <button><i class="fa-solid fa-house"></i>&nbsp;&nbsp; Dashbord</button>
        </div>
        <div className='menu_button'>
            <button><i class="fa-solid fa-clipboard-user"></i>&nbsp;&nbsp; Assigen Order</button>
        </div>
        <div className='menu_button'>
            <button><i class="fa-solid fa-plate-wheat"></i>&nbsp;&nbsp; Served Orders</button>
        </div>
        <div className='menu_button'>
            <button><i class="fa-solid fa-list-check"></i>&nbsp;&nbsp; available  menu</button>
        </div>
        <div className='menu_button'>
            <button> <i class="fa-solid fa-cart-plus"></i>&nbsp;&nbsp; Requst Stoke</button>
        </div>
        <div className='menu_button'>
            <button><i class="fa-solid fa-chart-pie"></i>&nbsp;&nbsp; Report</button>
        </div>
       </div>
       <div className='max_logout'>
         <div className='menu_button'>
            <button><i class="fa-solid fa-right-from-bracket"></i>&nbsp;&nbsp; Logout</button>
        </div>
       </div>
       </div> 
     )
    }else{
        return (
        <div className='Kitchen_menu_bar_contener_mini'>
        <div className='minimized_menu'>
         <div className='menu_logo'>
           <div className='img'><img src={logo} alt='logo' /></div>
        </div>
        <div className='menu_button'>
            <button onClick={()=>setToggle(toogle+1)}><i class="fa-sharp fa-solid fa-bars"></i></button>
        </div>
         <div className='menu_button'>
            <button><i class="fa-solid fa-house"></i></button>
        </div>
        <div className='menu_button'>
            <button><i class="fa-solid fa-clipboard-user"></i></button>
        </div>
        <div className='menu_button'>
            <button><i class="fa-solid fa-plate-wheat"></i></button>
        </div>
        <div className='menu_button'>
            <button><i class="fa-solid fa-list-check"></i></button>
        </div>
         <div className='menu_button'>
            <button> <i class="fa-solid fa-cart-plus"></i></button>
        </div>
        <div className='menu_button'>
            <button><i class="fa-solid fa-chart-pie"></i></button>
        </div> 
       </div>
       <div className='mini_logout'>
         <div className='menu_button'>
            <button><i class="fa-solid fa-right-from-bracket"></i></button>
        </div>
       </div>
       </div>
    )}

  
}

export default Kitchen_menu_bar