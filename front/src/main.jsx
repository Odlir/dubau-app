// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./assets/css/app.css";

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App />);


import React from 'react'
import ReactDOM from 'react-dom/client'
//import './index.css'
 import "./assets/css/app.css";

import App from './App.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

