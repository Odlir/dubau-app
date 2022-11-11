import React from "react"
import Footer from "./Footer/Footer"
import Siderbar_Mobile from "./sidebar_mobile/sidebar_mobile"
import Nav from "./nav/nav"
import Siderbar from "./sidebar/sidebar"


import Dashboard from "../dashboard/dashboard"

class Layout extends React.Component {
  render(){
    return (
      <>
        <Siderbar_Mobile />
            <Nav />
            <div className="flex overflow-hidden">
                <Siderbar />
                <Dashboard />
            </div>
        <Footer />
      </>
    )
  }
}
export default Layout;