import { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';

const SlideLink = ({ label, to, activeOnlyWhenExact, icon }) => {
	return (
		<Route
			path={to}
			exact={activeOnlyWhenExact}
			children={({ match }) => {
				var active = match ? 'active' : '';
				return (
					<li className={`${active}`}>
						<Link to={to}>
							<i className={`${icon}`}></i>
							<span> {label}</span>
						</Link>
					</li>
				);
			}}
		/>
	);
};
const SlidebarMennu = () => {
	const [slidebar, setsidebar] = useState([]);
	useEffect(() => {
		fetch('/dataSlidebar.json')
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				setsidebar(response);
			});
	}, []);
	console.log(slidebar);
	return (
		<div className="sidebar-menu sticky-sidebar-menu">
			<div className="logo">
				<h1>
					<a href="index.html">Collective</a>
				</h1>
			</div>

			<div className="logo">
				<a href="index.html">
					<img
						src="image-path"
						alt="Your logo"
						title="Your logo"
						className="img-fluid"
						style={{ height: '35px' }}
					/>
				</a>
			</div>

			<div className="logo-icon text-center">
				<a href="index.html" title="logo">
					<img src="../assets/images/logo.png" alt="logo-icon" />{' '}
				</a>
			</div>

			<div className="sidebar-menu-inner">
				<ul className="nav nav-pills nav-stacked custom-nav">
					{slidebar.map((slideitem) => {
						return (
							<SlideLink
								label={slideitem.name}
								to={slideitem.link}
								activeOnlyWhenExact={slideitem.value}
								icon={slideitem.icon}
							/>
						);
					})}
				</ul>

				<a className="toggle-btn">
					<i className="fa fa-angle-double-left menu-collapsed__left">
						<span>Collapse Sidebar</span>
					</i>
					<i className="fa fa-angle-double-right menu-collapsed__right"></i>
				</a>
			</div>
		</div>
	);
};
export default SlidebarMennu;
