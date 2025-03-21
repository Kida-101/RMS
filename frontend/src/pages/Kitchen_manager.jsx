import React from 'react'
import './styles/Kitchen_manager.css'
import Kitchen_menu_bar from '../components/Kitchen_menu_bar/Kitchen_menu_bar'

function Kitchen_manager() {
  return (
    <div className='Kitchen_manager_continer'>
        <div className='Kitchen_menu_bar'><Kitchen_menu_bar/></div>
        <div className='main'>
          <h1>Kitchen Manager other components</h1>
        </div>
    </div>
  )
}

export default Kitchen_manager