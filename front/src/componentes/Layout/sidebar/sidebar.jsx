import React, { useState } from "react";



class Sidebar extends React.Component {
  render() {
    return(
  
        <nav className="side-nav">
            <ul>
                <li>
                    <a href="javascript" className="side-menu side-menu--active">
                        <div className="side-menu__icon"> <i data-lucide="home"></i> </div>
                        <div className="side-menu__title">
                            Tablero 
                            <div className="side-menu__sub-icon transform rotate-180"> <i data-lucide="chevron-down"></i> </div>
                        </div>
                    </a>
                    <ul className="side-menu__sub-open">
                        <li>
                            <a href="side-menu-light-dashboard-overview-1.html" className="side-menu side-menu--active">
                                <div className="side-menu__icon"> <i data-lucide="activity"></i> </div>
                                <div className="side-menu__title"> Visión general </div>
                            </a>
                        </li>
                     
                    </ul>
                </li>
           
                <li>
                    <a href="javascript" className="side-menu">
                        <div className="side-menu__icon"> <i data-lucide="shopping-bag"></i> </div>
                        <div className="side-menu__title">
                            Módulos
                            <div className="side-menu__sub-icon "> <i data-lucide="chevron-down"></i> </div>
                        </div>
                    </a>
                    <ul className="">
                        <li>
                            <a href="side-menu-light-categories.html" className="side-menu">
                                <div className="side-menu__icon"> <i data-lucide="activity"></i> </div>
                                <div className="side-menu__title"> Proveedor </div>
                            </a>
                        </li>
                        
                    </ul>
                </li>
              
            </ul>
        </nav>

    );
  }
}
export default Sidebar;