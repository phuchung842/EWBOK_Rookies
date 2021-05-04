import ProductTable from '../Components/Table/ProductTable';
import { useEffect, useState } from 'react';
import callApi from '../utils/apiCaller.js';

const Products = () => {
	const [products, setproduct] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (products.length <= 0) {
			callApi('products', 'GET', null).then((res) => {
				setproduct(res.data);
				setLoading(false);
			});
		}
	}, [callApi]);
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
	if (loading) return null;
	return <ProductTable products={products} onDelete={onDelete} />;
};
export default Products;
