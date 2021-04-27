import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SlidebarMennu from './Components/SlidebarMenu/SlidebarMenu';
import Header from './Components/Header/Header';
import Content from './Containers/Content';
import Footer from './Components/Footer/Footer';
import { Provider } from 'react-redux';
import store from './store';
import userManager, { loadUserFromStorage } from './services/userService';
import AuthProvider from './utils/authProvider';
import PrivateRoute from './utils/protectedRoute';

const App = () => {
	useEffect(() => {
		// fetch current user from cookies
		loadUserFromStorage(store);
	}, []);
	return (
		<Provider store={store}>
			<AuthProvider userManager={userManager} store={store}>
				<BrowserRouter>
					<section>
						<SlidebarMennu />
						<Header />
						<Content />
						<Footer />
					</section>
				</BrowserRouter>
			</AuthProvider>
		</Provider>
	);
};

export default App;
