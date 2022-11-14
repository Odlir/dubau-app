// import ScrollToTop from "@/base-components/scroll-to-top/Main";
// import { BrowserRouter } from "react-router-dom";
// import { RecoilRoot } from "recoil";
// import Router from "./router";

// function App() {
//   return (
//     <RecoilRoot>
//       <BrowserRouter>
//         <Router />
//         <ScrollToTop />
//       </BrowserRouter>
//     </RecoilRoot>
//   );
// }

// export default App;


import ScrollToTop from "@/base-components/scroll-to-top/Main";
import Api from "./services/post/Api.jsx";
import LayoutMain from "./componentes/LayoutMain.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from "recoil";
import Route from "./router";
//import './index.css'
function App() {
    return (
        <div className="App">
            <RecoilRoot>
                    <BrowserRouter>
                        <Routes>
                            {/* <Route path='/' element={ <Api/> } />
                            <Route path='/layoutmain' element={ <LayoutMain/> } /> */}

                             <Route />
                             {/* <ScrollToTop /> */}
                        </Routes>
                    </BrowserRouter>
            </RecoilRoot>

        </div>
    )
}
export default App;
