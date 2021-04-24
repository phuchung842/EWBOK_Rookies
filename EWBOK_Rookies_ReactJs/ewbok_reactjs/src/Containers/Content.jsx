import { Route, Switch } from 'react-router-dom';

import routes from '../Constants/routes';

const Content = () => {
	const showContent = (routes) => {
		var result = null;
		console.log(routes.length);
		if (routes.length > 0) {
			result = routes.map((route, index) => {
				return <Route key={index} path={route.path} exact={route.exact} component={route.main} />;
			});
		}
		console.log(result);
		return <Switch>{result}</Switch>;
	};
	console.log(routes);
	return (
		// <Switch>
		// 	<Route exact path="/" component={Dashboard} />
		// 	<Route exact path="/products" component={Products} />
		// 	<Route exact path="/productcategories" component={ProductCategories} />
		// 	<Route exact path="/brands" component={Brands} />
		// 	<Route exact path="/materials" component={Materials} />
		// 	<Route exact path="/comments" component={Comments} />
		// 	<Route exact path="/ratings" component={Ratings} />
		// 	<Route exact path="/products/add" component={ProductForm} />
		// 	<Route exact path="/products/edit/:id">
		// 		<ProductForm />
		// 	</Route>
		// </Switch>
		<>{showContent(routes)}</>
	);
};
export default Content;
