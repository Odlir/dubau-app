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



import Api from "./services/post/Api.jsx";
import Dashboard from "./componentes/Dashboard.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import './index.css'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Api/> } />
                    <Route path='/dashboard' element={ <Dashboard/> } />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App;
