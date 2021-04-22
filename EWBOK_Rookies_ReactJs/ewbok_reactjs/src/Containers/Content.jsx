import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import ProductCategories from './ProductCategories';
import Brands from './Brands';
import Materials from './Materials';
import Comments from './Comments';
import Ratings from './Ratings';
import Products from './Products';
import ProductForm from '../Components/Forms/ProductForm';

const Content = () => {
	return (
		<Switch>
			<Route exact path="/" component={Dashboard} />
			<Route exact path="/products" component={Products} />
			<Route exact path="/productcategories" component={ProductCategories} />
			<Route exact path="/brands" component={Brands} />
			<Route exact path="/materials" component={Materials} />
			<Route exact path="/comments" component={Comments} />
			<Route exact path="/ratings" component={Ratings} />
			<Route exact path="/products/add" component={ProductForm} />
		</Switch>
	);
};
export default Content;
