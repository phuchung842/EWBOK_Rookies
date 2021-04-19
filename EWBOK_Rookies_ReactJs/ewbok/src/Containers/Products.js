import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import ProductTable from '../Components/Table/ProductTable';
import callApi from '../utils/apiCaller.js';

const Products = () => {
	const [products, setproduct] = useState([]);
	useEffect(() => {
		callApi('products', 'GET', null).then((res) => {
			setproduct(res.data);
		});
	}, []);
	console.log(products);
	return <ProductTable products={products} />;
};
export default Products;
