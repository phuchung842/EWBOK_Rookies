import { Link } from 'react-router-dom';

const Slide = (props) => {
	return props.slidebar.map((slide) => (
		<li className={`nav-item ${slide.value} `}>
			<Link onClick={() => props.changestatusslide(slide.name)} className="nav-link" to={slide.link}>
				<i className="material-icons">{slide.icon}</i>
				<p>{slide.name}</p>
			</Link>
		</li>
	));
};
export default Slide;
