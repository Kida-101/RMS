import React from 'react'
import './styles/Kitchen_manager.css'
import Kitchen_menu_bar from '../components/Kitchen_menu_bar/Kitchen_menu_bar'
import Kitchen_header from '../components/Kitchen_header/Kitchen_header'
import Kitchen_request from './Kitchen_request/Kitchen_request'

function Kitchen_manager() {
  return (
    <div className='Kitchen_manager_continer'>
        <div className='Kitchen_menu_bar'><Kitchen_menu_bar/></div>
        <div className='main'>
          <Kitchen_request/>
        </div>
    </div>
  )
}

export default Kitchen_manager