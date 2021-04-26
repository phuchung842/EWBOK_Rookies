import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SlidebarMennu from './Components/SlidebarMenu/SlidebarMenu';
import Header from './Components/Header/Header';
import Content from './Containers/Content';
import Footer from './Components/Footer/Footer';

const App = () => {
	return (
		<BrowserRouter>
			<section>
				<SlidebarMennu />
				<Header />
				<Content />
				<Footer />
			</section>
		</BrowserRouter>
	);
};

export default App;
