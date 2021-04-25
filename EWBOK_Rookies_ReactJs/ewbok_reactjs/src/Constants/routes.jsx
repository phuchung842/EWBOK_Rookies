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

const routes = [
	{
		path: '/',
		exact: true,
		main: () => <Dashboard />,
	},
	{
		path: '/users',
		exact: true,
		main: () => <Users />,
	},
	{
		path: '/productcategories',
		exact: true,
		main: () => <ProductCategories />,
	},
	{
		path: '/productcategories/add',
		exact: true,
		main: () => <ProductCategoryForm />,
	},
	{
		path: '/productcategories/edit/:id',
		exact: true,
		main: ({ match }) => <ProductCategoryForm match={match} />,
	},
	{
		path: '/brands',
		exact: true,
		main: () => <Brands />,
	},
	{
		path: '/brands/add',
		exact: true,
		main: () => <BrandForm />,
	},
	{
		path: '/brands/edit/:id',
		exact: true,
		main: ({ match }) => <BrandForm match={match} />,
	},
	{
		path: '/materials',
		exact: true,
		main: () => <Materials />,
	},
	{
		path: '/materials/add',
		exact: true,
		main: () => <MaterialForm />,
	},
	{
		path: '/materials/edit/:id',
		exact: true,
		main: ({ match }) => <MaterialForm match={match} />,
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
	{
		path: '/products/edit/:id',
		exact: true,
		main: ({ match }) => <ProductForm match={match} />,
	},
];
export default routes;
