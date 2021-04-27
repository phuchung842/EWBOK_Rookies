import Dashboard from '../Containers/Dashboard';
import ProductCategories from '../Containers/ProductCategories';
import ProductCategoryForm from '../Components/Forms/ProductCategoryForm';
import Brands from '../Containers/Brands';
import BrandForm from '../Components/Forms/BrandForm';
import Materials from '../Containers/Materials';
import MaterialForm from '../Components/Forms/MaterialForm';
import Comments from '../Containers/Comments';
import Ratings from '../Containers/Ratings';
import Products from '../Containers/Products';
import ProductForm from '../Components/Forms/ProductForm';
import Users from '../Containers/Users';
import SigninOidc from '../Containers/signin-oidc';
import SignoutOidc from '../Containers/signout-oidc';
import Login from '../Containers/login';

const routes = [
	{
		path: '/',
		exact: true,
		main: () => <Dashboard />,
		route: 'privateroute',
	},
	{
		path: '/users',
		exact: true,
		main: () => <Users />,
		route: 'privateroute',
	},
	{
		path: '/signin-oidc',
		exact: true,
		main: () => <SigninOidc />,
		route: 'route',
	},
	{
		path: '/signout-oidc',
		exact: true,
		main: () => <SignoutOidc />,
		route: 'route',
	},
	{
		path: '/login',
		exact: true,
		main: () => <Login />,
		route: 'route',
	},
	{
		path: '/productcategories',
		exact: true,
		main: () => <ProductCategories />,
		route: 'privateroute',
	},
	{
		path: '/productcategories/add',
		exact: true,
		main: () => <ProductCategoryForm />,
		route: 'privateroute',
	},
	{
		path: '/productcategories/edit/:id',
		exact: true,
		main: ({ match }) => <ProductCategoryForm match={match} />,
		route: 'privateroute',
	},
	{
		path: '/brands',
		exact: true,
		main: () => <Brands />,
		route: 'privateroute',
	},
	{
		path: '/brands/add',
		exact: true,
		main: () => <BrandForm />,
		route: 'privateroute',
	},
	{
		path: '/brands/edit/:id',
		exact: true,
		main: ({ match }) => <BrandForm match={match} />,
		route: 'privateroute',
	},
	{
		path: '/materials',
		exact: true,
		main: () => <Materials />,
		route: 'privateroute',
	},
	{
		path: '/materials/add',
		exact: true,
		main: () => <MaterialForm />,
		route: 'privateroute',
	},
	{
		path: '/materials/edit/:id',
		exact: true,
		main: ({ match }) => <MaterialForm match={match} />,
		route: 'privateroute',
	},
	{
		path: '/comments',
		exact: true,
		main: () => <Comments />,
		route: 'privateroute',
	},
	{
		path: '/ratings',
		exact: true,
		main: () => <Ratings />,
		route: 'privateroute',
	},
	{
		path: '/products',
		exact: true,
		main: () => <Products />,
		route: 'privateroute',
	},
	{
		path: '/products/add',
		exact: true,
		main: () => <ProductForm />,
		route: 'privateroute',
	},
	{
		path: '/products/edit/:id',
		exact: true,
		main: ({ match }) => <ProductForm match={match} />,
		route: 'privateroute',
	},
];
export default routes;
