import React from "react";

class Footer extends React.Component {
  render() {
    return(
      <div data-url="side-menu-dark-dashboard-overview-1.html" className="dark-mode-switcher cursor-pointer shadow-md fixed bottom-0 right-0 box dark:bg-dark-2 border rounded-full w-40 h-12 flex items-center justify-center z-50 mb-10 mr-10">
      <div className="mr-4 text-gray-700 dark:text-gray-300">Modo Oscuro</div>
      <div className="dark-mode-switcher__toggle border"></div>
  </div>
    );
  }
}
export default Footer;