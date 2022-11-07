
import reactLogo from './assets/react.svg'
import Api from "./services/Api.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css'

import Counter from './components/Counter'
function App() {
    return (
/*        <div>
            <Counter />
        </div>*/
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
