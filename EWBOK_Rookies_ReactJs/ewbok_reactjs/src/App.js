import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SlidebarMennu from './Components/SlidebarMenu';
import Header from './Components/Header';
import Contain from './Containers/Contain';
import Footer from './Components/Footer';

const App = () => {
	return (
		<BrowserRouter>
			<section>
				<SlidebarMennu />
				<Header />
				<Contain />
				<Footer />
			</section>
		</BrowserRouter>
	);
};

export default App;
