import { Route, Link } from 'react-router-dom';

const SlideLink = ({ label, to, activeOnlyWhenExact, icon }) => {
	return (
		<Route
			path={to}
			exact={activeOnlyWhenExact}
			children={({ match }) => {
				var active = match ? 'active' : '';
				return (
					<li className={`nav-item ${active} `}>
						<Link className="nav-link" to={to}>
							<i className="material-icons">{icon}</i>
							<p>{label}</p>
						</Link>
					</li>
				);
			}}
		/>
	);
};

const Slide = (props) => {
	return props.slidebar.map((slide) => (
		<SlideLink label={slide.name} to={slide.link} activeOnlyWhenExact={slide.value} icon={slide.icon} />
		// <li className={`nav-item ${slide.value} `}>
		// 	<Link onClick={() => props.changestatusslide(slide.name)} className="nav-link" to={slide.link}>
		// 		<i className="material-icons">{slide.icon}</i>
		// 		<p>{slide.name}</p>
		// 	</Link>
		// </li>
	));
};
export default Slide;
