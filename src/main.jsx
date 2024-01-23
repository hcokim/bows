import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import StatesProvider from './lib/statesProvider.jsx'
import "./style/reset.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
	<StatesProvider>
		<App />
	</StatesProvider>
  </React.StrictMode>,
)
