import react from 'react';
import Dashboard from '../Containers/Dashboard';
import ProductCategories from '../Containers/ProductCategories';
import Brands from '../Containers/Brands';
import Materials from '../Containers/Materials';
import Comments from '../Containers/Comments';
import Ratings from '../Containers/Ratings';
import Products from '../Containers/Products';
import ProductForm from '../Components/Forms/ProductForm';

const routes = [
	{
		path: '/',
		exact: true,
		main: () => <Dashboard />,
	},
	{
		path: '/productcategories',
		exact: true,
		main: () => <ProductCategories />,
	},
	{
		path: '/brands',
		exact: true,
		main: () => <Brands />,
	},
	{
		path: '/materials',
		exact: true,
		main: () => <Materials />,
	},
	{
		path: '/comments',
		exact: true,
		main: () => <Comments />,
	},
	{
		path: '/ratings',
		exact: true,
		main: () => <Ratings />,
	},
	{
		path: '/products',
		exact: true,
		main: () => <Products />,
	},
	{
		path: '/products/add',
		exact: true,
		main: () => <ProductForm />,
	},
];
export default routes;
