import React, { useState } from "react";

class Sidebar_mobile extends React.Component {
  render() {
    return(
  
      <div className="mobile-menu md:hidden">
          <div className="mobile-menu-bar">
              <a href="" className="flex mr-auto">
                  <img alt="Midone - HTML Admin Template" className="w-6" 
                                      src="http://www.dubaumetalindustria.com/dubau/assets/media/logos/logo-light.png?1"
                                      />
              </a>
              <a href="javascript" className="mobile-menu-toggler"> <i data-lucide="bar-chart-2" className="w-8 h-8 text-white transform -rotate-90"></i> </a>
          </div>
          <div className="scrollable">
              <a href="javascript" className="mobile-menu-toggler"> <i data-lucide="x-circle" className="w-8 h-8 text-white transform -rotate-90"></i> </a>
              <ul className="scrollable__content py-2">
                  <li>
                      <a href="javascript" className="menu menu--active">
                          <div className="menu__icon"> <i data-lucide="home"></i> </div>
                          <div className="menu__title"> Tablero <i data-lucide="chevron-down" className="menu__sub-icon transform rotate-180"></i> </div>
                      </a>
                      <ul className="menu__sub-open">
                          <li>
                              <a href="side-menu-light-dashboard-overview-1.html" className="menu menu--active">
                                  <div className="menu__icon"> <i data-lucide="activity"></i> </div>
                                  <div className="menu__title"> Visión general </div>
                              </a>
                          </li>
                        
                      </ul>
                  </li>
             
                  <li>
                      <a href="javascript" className="menu">
                          <div className="menu__icon"> <i data-lucide="shopping-bag"></i> </div>
                          <div className="menu__title"> Módulos <i data-lucide="chevron-down" className="menu__sub-icon "></i> </div>
                      </a>
                      <ul className="">
                          <li>
                              <a href="side-menu-light-categories.html" className="menu">
                                  <div className="menu__icon"> <i data-lucide="activity"></i> </div>
                                  <div className="menu__title"> Categories </div>
                              </a>
                          </li>                
                      </ul>
                  </li>
              </ul>
          </div>
      </div>

    );
  }
}
export default Sidebar_mobile;