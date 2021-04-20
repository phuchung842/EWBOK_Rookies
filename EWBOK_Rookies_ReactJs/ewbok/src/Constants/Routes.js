import Dashboard from '../Containers/Dashboard';
import ProductCategories from '../Containers/ProductCategories';
import Brands from '../Containers/Brands';
import Materials from '../Containers/Materials';
import Comments from '../Containers/Comments';
import Ratings from '../Containers/Ratings';
import Products from '../Containers/Products';

const Routes = [
	{
		path: '/',
		main: '<Dashboard />',
	},
	{
		path: '/products',
		main: () => <Products />,
	},
	{
		path: '/productcategories',
		main: () => <ProductCategories />,
	},
	{
		path: '/brands',
		main: () => <Brands />,
	},
	{
		path: '/materials',
		main: () => <Materials />,
	},
	{
		path: '/comments',
		main: () => <Comments />,
	},
	{
		path: '/ratings',
		main: () => <Ratings />,
	},
];
export default Routes;
