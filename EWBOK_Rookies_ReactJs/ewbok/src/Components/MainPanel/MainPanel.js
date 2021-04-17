import React from 'react';
import Navbar from '../Navbar/Navbar';
import Content from '../../Containers/Content';
import Footer from '../Footer/Footer';

const MainPanel = () => {
	return (
		<div className="main-panel">
			<Navbar />
			<Content />
			<Footer />
		</div>
	);
};

export default MainPanel;
