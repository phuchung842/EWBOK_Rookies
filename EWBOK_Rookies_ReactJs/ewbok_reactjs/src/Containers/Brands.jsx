import BrandTable from '../Components/Table/BrandTable';
import { useEffect, useState } from 'react';
import callApi from '../utils/apiCaller.js';

const Brands = (props) => {
	const [brands, setbrands] = useState([]);
	useEffect(() => {
		callApi('brands', 'GET', null).then((res) => {
			setbrands(res.data);
		});
	}, []);
	console.log(brands);
	const removeViewItem = (brands, itemid) => {
		return brands.filter((item) => item.id !== itemid);
	};
	const onDelete = (id) => {
		callApi(`brands/${id}`, 'DELETE', null).then((res) => {
			console.log(res);
			if (res.status >= 200 && res.status < 300) {
				setbrands(removeViewItem(brands, id));
			}
		});
	};
	return <BrandTable brands={brands} onDelete={onDelete} />;
};
export default Brands;
