import './App.css';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import MainPanel from './Components/MainPanel/MainPanel';

const App = () => {
	return (
		<BrowserRouter>
			<div class="wrapper">
				<Sidebar />
				<MainPanel />
			</div>
		</BrowserRouter>
	);
};

export default App;
