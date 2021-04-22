import ProductCategoryTable from '../Components/Table/ProductCategoryTable';
import { useEffect, useState } from 'react';
import callApi from '../utils/apiCaller.js';

const ProductCategories = () => {
	const [productcategories, setproductcategories] = useState([]);
	useEffect(() => {
		callApi('productcategories', 'GET', null).then((res) => {
			setproductcategories(res.data);
		});
	}, []);
	console.log(productcategories);
	return <ProductCategoryTable productcategories={productcategories} />;
};
export default ProductCategories;
