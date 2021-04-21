import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import ProductCategories from './ProductCategories';
import Brands from './Brands';
import Materials from './Materials';
import Comments from './Comments';
import Ratings from './Ratings';
import Products from './Products';

const Contain = () => {
	return (
		<Switch>
			<Route exact path="/" component={Dashboard} />
			<Route exact path="/" component={Products} />
			<Route exact path="/" component={ProductCategories} />
			<Route exact path="/" component={Brands} />
			<Route exact path="/" component={Materials} />
			<Route exact path="/" component={Comments} />
			<Route exact path="/" component={Ratings} />
		</Switch>
	);
};
export default Contain;
