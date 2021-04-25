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
	const removeViewItem = (ratings, userid, productid) => {
		return ratings.filter((item) => item.userID !== userid && item.productID !== productid);
	};
	const onDelete = (userid, productid) => {
		callApi(`ratings/${userid}/${productid}`, 'DELETE', null).then((res) => {
			console.log(res);
			if (res.status >= 200 && res.status < 300) {
				setratings(removeViewItem(ratings, userid, productid));
			}
		});
	};
	return <RatingTable ratings={ratings} onDelete={onDelete} />;
};
export default Ratings;
