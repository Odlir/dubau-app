
import Api from "./services/post/Api.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css'

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
