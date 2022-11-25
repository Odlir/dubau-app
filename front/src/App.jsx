import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Router from "./router";
import './index.css'

function App() {
    return (
        <RecoilRoot>
        <div className="App">
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </div>
        </RecoilRoot>
    )
}
export default App;
