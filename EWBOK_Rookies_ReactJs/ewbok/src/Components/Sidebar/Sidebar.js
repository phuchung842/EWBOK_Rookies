import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slide from './Slide';

const Sidebar = () => {
	const [slidebar, setsidebar] = useState([]);
	useEffect(() => {
		fetch('/dataSlide.json')
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				setsidebar(response);
			});
	}, []);
	const changeStatusSlidebar = (name) => {
		setsidebar([
			...slidebar.map((slide) => {
				slide.value = '';
				return slide;
			}),
		]);
		setsidebar([
			...slidebar.map((slide) => {
				if (slide.name === name) slide.value = 'active';
				return slide;
			}),
		]);
	};

	return (
		<div
			className="sidebar"
			data-color="purple"
			data-background-color="white"
			data-image="../assets/img/sidebar-1.jpg"
		>
			<div className="logo">
				<a href="http://www.creative-tim.com" className="simple-text logo-normal">
					Creative Tim
				</a>
			</div>
			<div className="sidebar-wrapper">
				<ul className="nav">
					<Slide slidebar={slidebar} changestatusslide={changeStatusSlidebar} />
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
