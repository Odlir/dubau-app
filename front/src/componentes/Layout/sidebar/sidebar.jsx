// import React, { useState } from "react";

import { Transition } from "react-transition-group";
import React,{ useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { helper as $h } from "@/utils";
// import { sideMenu as useSideMenuStore } from "@/stores/side-menu";
import { useRecoilValue } from "recoil";
import { linkTo, nestedMenu, enter, leave } from "../index";
import { Lucide } from "@/base-components";
// import classnames from "classnames";
// import TopBar from "@/components/top-bar/Main";
// import MobileMenu from "@/components/mobile-menu/Main";
// import MainColorSwitcher from "@/components/main-color-switcher/Main";
// import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
// import SideMenuTooltip from "@/components/side-menu-tooltip/Main";



import { Transition } from "react-transition-group";
import React,{ useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { helper as $h } from "@/utils";
import { sideMenu as useSideMenuStore } from "@/stores/side-menu";
import { useRecoilValue } from "recoil";
import { linkTo, nestedMenu, enter, leave } from "../index";
import { Lucide } from "@/base-components";
import classnames from "classnames";
import TopBar from "@/components/top-bar/Main";
import MobileMenu from "@/components/mobile-menu/Main";
import MainColorSwitcher from "@/components/main-color-switcher/Main";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import SideMenuTooltip from "@/components/side-menu-tooltip/Main";




class Sidebar extends React.Component {
// function Sidebar() {

  render() {
    return(
  
        <nav className="side-nav">
            <ul>
                <li>
                    <a href="javascript" className="side-menu side-menu--active">
                        <div className="side-menu__icon">       
                            <Lucide icon="Home" />
                        </div>
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