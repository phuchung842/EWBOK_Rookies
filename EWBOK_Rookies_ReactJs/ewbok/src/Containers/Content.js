import Dashboard from './Dashboard';
import ProductCategories from './ProductCategories';
import Brands from './Brands';
import Materials from './Materials';
import Comments from './Comments';
import Ratings from './Ratings';
import Products from './Products';
import ProductForm from '../Components/Forms/ProductForm';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Routes from '../Constants/Routes';

const Content = () => {
	return (
		<Switch>
			{/* {showContentMenus(Routes)} */}
			<Route exact path="/">
				<Dashboard />
			</Route>
			<Route exact path="/dashboard">
				<Dashboard />
			</Route>
			<Route exact path="/products">
				<Products />
			</Route>
			<Route exact path="/productcategories">
				<ProductCategories />
			</Route>
			<Route exact path="/brands">
				<Brands />
			</Route>
			<Route exact path="/materials">
				<Materials />
			</Route>
			<Route exact path="/comments">
				<Comments />
			</Route>
			<Route exact path="/ratings">
				<Ratings />
			</Route>
			<Route path="/products/add">
				<ProductForm />
			</Route>
		</Switch>
	);
};
// const showContentMenus = (routes) => {
// 	var result = null;
// 	if (routes.lenght > 0) {
// 		result = routes.map((route, index) => {
// 			return (
// 				<Route key={index} exact path={route.path}>
// 					{route.main}
// 					{console.log(route.main)}
// 				</Route>
// 			);
// 		});
// 	}
// 	return result;
// };
export default Content;
