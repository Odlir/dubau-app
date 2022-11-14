
import Siderbar_Mobile from "./sidebar_mobile/sidebar_mobile"



import { Transition } from "react-transition-group";
import React,{ useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { helper as $h } from "@/utils";
import { sideMenu as useSideMenuStore } from "@/stores/side-menu";
import { useRecoilValue } from "recoil";
import { linkTo, nestedMenu, enter, leave } from "./index";
import { Lucide } from "@/base-components";
import classnames from "classnames";
import TopBar from "@/componentes/Layout/nav/Main";
// import MobileMenu from "@/components/mobile-menu/Main";
import Menu_Colores from "@/componentes/Layout/Footer/main-color-switcher/Main";
import Cambio_Color from "@/componentes/Layout/Footer/dark-mode-switcher/Main";
import SideMenuTooltip from "@/componentes/Layout/Sidebar/side-menu-tooltip/Main";

import logoUrl from "../../assets/images/logo.svg";


// class Layout extends React.Component {
  function Layout() {

    const navigate = useNavigate();
    const location = useLocation();
    const [formattedMenu, setFormattedMenu] = useState([]);
    const sideMenuStore = useRecoilValue(useSideMenuStore);
    const sideMenu = () => nestedMenu($h.toRaw(sideMenuStore.menu), location);
  
    useEffect(() => {
      dom("body").removeClass("error-page").removeClass("login").addClass("main");
      setFormattedMenu(sideMenu());
    }, [sideMenuStore, location.pathname]);

   
  
    return (
      <>
        <Siderbar_Mobile />
            
            <TopBar />


            <div className="flex overflow-hidden">
                
            
                    {/* BEGIN: Side Menu */}
                      <nav className="side-nav">
                        <ul>
                          {/* BEGIN: First Child */}
                          {formattedMenu.map((menu, menuKey) =>
                            menu == "devider" ? (
                              <li
                                className="side-nav__devider my-6"
                                key={menu + menuKey}
                              ></li>
                            ) : (
                              <li key={menu + menuKey}>
                                <SideMenuTooltip
                                  tag="a"
                                  content={menu.title}
                                  href={menu.subMenu ? "#" : menu.pathname}
                                  className={classnames({
                                    "side-menu": true,
                                    "side-menu--active": menu.active,
                                    "side-menu--open": menu.activeDropdown,
                                  })}
                                  onClick={(event) => {
                                    event.preventDefault();
                                    linkTo(menu, navigate);
                                    setFormattedMenu($h.toRaw(formattedMenu));
                                  }}
                                >
                                  <div className="side-menu__icon">
                                    <Lucide icon={menu.icon} />
                                  </div>
                                  <div className="side-menu__title">
                                    {menu.title}
                                    {menu.subMenu && (
                                      <div
                                        className={classnames({
                                          "side-menu__sub-icon": true,
                                          "transform rotate-180": menu.activeDropdown,
                                        })}
                                      >
                                        <Lucide icon="ChevronDown" />
                                      </div>
                                    )}
                                  </div>
                                </SideMenuTooltip>
                                {/* BEGIN: Second Child */}
                                {menu.subMenu && (
                                  <Transition
                                    in={menu.activeDropdown}
                                    onEnter={enter}
                                    onExit={leave}
                                    timeout={300}
                                  >
                                    <ul
                                      className={classnames({
                                        "side-menu__sub-open": menu.activeDropdown,
                                      })}
                                    >
                                      {menu.subMenu.map((subMenu, subMenuKey) => (
                                        <li key={subMenuKey}>
                                          <SideMenuTooltip
                                            tag="a"
                                            content={subMenu.title}
                                            href={subMenu.subMenu ? "#" : subMenu.pathname}
                                            className={classnames({
                                              "side-menu": true,
                                              "side-menu--active": subMenu.active,
                                            })}
                                            onClick={(event) => {
                                              event.preventDefault();
                                              linkTo(subMenu, navigate);
                                              setFormattedMenu($h.toRaw(formattedMenu));
                                            }}
                                          >
                                            <div className="side-menu__icon">
                                              <Lucide icon="Activity" />
                                            </div>
                                            <div className="side-menu__title">
                                              {subMenu.title}
                                              {subMenu.subMenu && (
                                                <div
                                                  className={classnames({
                                                    "side-menu__sub-icon": true,
                                                    "transform rotate-180":
                                                      subMenu.activeDropdown,
                                                  })}
                                                >
                                                  <Lucide icon="ChevronDown" />
                                                </div>
                                              )}
                                            </div>
                                          </SideMenuTooltip>
                                          {/* BEGIN: Third Child */}
                                          {subMenu.subMenu && (
                                            <Transition
                                              in={subMenu.activeDropdown}
                                              onEnter={enter}
                                              onExit={leave}
                                              timeout={300}
                                            >
                                              <ul
                                                className={classnames({
                                                  "side-menu__sub-open":
                                                    subMenu.activeDropdown,
                                                })}
                                              >
                                                {subMenu.subMenu.map(
                                                  (lastSubMenu, lastSubMenuKey) => (
                                                    <li key={lastSubMenuKey}>
                                                      <SideMenuTooltip
                                                        tag="a"
                                                        content={lastSubMenu.title}
                                                        href={
                                                          lastSubMenu.subMenu
                                                            ? "#"
                                                            : lastSubMenu.pathname
                                                        }
                                                        className={classnames({
                                                          "side-menu": true,
                                                          "side-menu--active":
                                                            lastSubMenu.active,
                                                        })}
                                                        onClick={(event) => {
                                                          event.preventDefault();
                                                          linkTo(lastSubMenu, navigate);
                                                        }}
                                                      >
                                                        <div className="side-menu__icon">
                                                          <Lucide icon="Zap" />
                                                        </div>
                                                        <div className="side-menu__title">
                                                          {lastSubMenu.title}
                                                        </div>
                                                      </SideMenuTooltip>
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            </Transition>
                                          )}
                                          {/* END: Third Child */}
                                        </li>
                                      ))}
                                    </ul>
                                  </Transition>
                                )}
                                {/* END: Second Child */}
                              </li>
                            )
                          )}
                          {/* END: First Child */}
                        </ul>
                      </nav>
                    {/* END: Side Menu */}
          

                {/* BEGIN: Content */}
                <div className="content">
                  <Outlet />
                </div>
                {/* END: Content */}
            </div>

            <Menu_Colores />
            <Cambio_Color />

      </>
    )
  
}
export default Layout;