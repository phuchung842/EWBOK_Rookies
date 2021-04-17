import Dashboard from './Dashboard';
import Product from './Product';
import React from './Dashboard';
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
			<Route exact path="/product">
				<Product />
			</Route>
		</Switch>
	);
};

export default Content;
