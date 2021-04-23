import ProductTable from '../Components/Table/ProductTable';
import { useEffect, useState } from 'react';
import callApi from '../utils/apiCaller.js';

const Products = () => {
	const [products, setproduct] = useState([]);
	useEffect(() => {
		callApi('products', 'GET', null).then((res) => {
			setproduct(res.data);
		});
	}, []);
	const removeViewItem = (products, itemid) => {
		return products.filter((item) => item.id !== itemid);
	};
	const onDelete = (id) => {
		callApi(`products/${id}`, 'DELETE', null).then((res) => {
			console.log(res);
			if (res.status >= 200 && res.status < 300) {
				setproduct(removeViewItem(products, id));
			}
		});
	};
	return <ProductTable products={products} onDelete={onDelete} />;
};
export default Products;
