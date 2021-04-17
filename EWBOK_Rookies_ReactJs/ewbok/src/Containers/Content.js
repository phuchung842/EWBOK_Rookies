import Dashboard from './Dashboard';
import ProductCategories from './ProductCategories';
import Brands from './Brands';
import Materials from './Materials';
import Comments from './Comments';
import Ratings from './Ratings';
import Products from './Products';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Content = () => {
	return (
		<Switch>
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
		</Switch>
	);
};

export default Content;
