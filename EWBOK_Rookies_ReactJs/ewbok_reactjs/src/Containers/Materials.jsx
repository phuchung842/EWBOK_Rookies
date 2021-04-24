import MaterialTable from '../Components/Table/MaterialTable';
import callApi from '../utils/apiCaller.js';
import { useEffect, useState } from 'react';

const Material = () => {
	const [materials, setmaterials] = useState([]);
	useEffect(() => {
		callApi('materials', 'GET', null).then((res) => {
			setmaterials(res.data);
		});
	}, []);
	console.log(materials);
	const removeViewItem = (materials, itemid) => {
		return materials.filter((item) => item.id !== itemid);
	};
	const onDelete = (id) => {
		callApi(`materials/${id}`, 'DELETE', null).then((res) => {
			console.log(res);
			if (res.status >= 200 && res.status < 300) {
				setmaterials(removeViewItem(materials, id));
			}
		});
	};
	return <MaterialTable materials={materials} onDelete={onDelete} />;
};
export default Material;
