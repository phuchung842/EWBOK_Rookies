import RatingTable from '../Components/Table/RatingTable';
import { useEffect, useState } from 'react';
import callApi from '../utils/apiCaller.js';

const Ratings = () => {
	const [ratings, setratings] = useState([]);
	useEffect(() => {
		callApi('ratings', 'GET', null).then((res) => {
			setratings(res.data);
		});
	}, []);
	console.log(ratings);
	const removeViewItem = (ratings, itemid) => {
		return ratings.filter((item) => item.id !== itemid);
	};
	const onDelete = (id) => {
		callApi(`ratings/${id}`, 'DELETE', null).then((res) => {
			console.log(res);
			if (res.status >= 200 && res.status < 300) {
				setratings(removeViewItem(ratings, id));
			}
		});
	};
	return <RatingTable ratings={ratings} onDelete={onDelete} />;
};
export default Ratings;
