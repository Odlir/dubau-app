import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import './index.css';

function App() {
    return (
        <RecoilRoot>
            <div className="App">
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </div>
        </RecoilRoot>
    );
}

export default App;
