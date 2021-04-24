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
	const removeViewItem = (productcategories, itemid) => {
		return productcategories.filter((item) => item.id !== itemid);
	};
	const onDelete = (id) => {
		callApi(`productcategories/${id}`, 'DELETE', null).then((res) => {
			console.log(res);
			if (res.status >= 200 && res.status < 300) {
				setproductcategories(removeViewItem(productcategories, id));
			}
		});
	};
	return <ProductCategoryTable productcategories={productcategories} onDelete={onDelete} />;
};
export default ProductCategories;
