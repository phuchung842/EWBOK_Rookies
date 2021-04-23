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
	return <ProductTable products={products} />;
};
export default Products;
