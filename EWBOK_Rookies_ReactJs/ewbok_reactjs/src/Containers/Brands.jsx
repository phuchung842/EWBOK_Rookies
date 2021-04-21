import BrandTable from '../Components/Table/BrandTable';
import { useEffect, useState } from 'react';
import callApi from '../utils/apiCaller.js';

const Brands = () => {
	const [brands, setbrands] = useState([]);
	useEffect(() => {
		callApi('brands', 'GET', null).then((res) => {
			setbrands(res.data);
		});
	}, []);
	console.log(brands);
	return <BrandTable brands={brands} />;
};
export default Brands;
