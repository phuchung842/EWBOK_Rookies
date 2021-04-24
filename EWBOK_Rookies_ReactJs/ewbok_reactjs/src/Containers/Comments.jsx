import CommentTable from '../Components/Table/CommentTable';
import { useEffect, useState } from 'react';
import callApi from '../utils/apiCaller.js';

const Comments = () => {
	const [comments, setcomments] = useState([]);
	useEffect(() => {
		callApi('comments', 'GET', null).then((res) => {
			setcomments(res.data);
		});
	}, []);
	console.log(comments);
	const removeViewItem = (comments, itemid) => {
		return comments.filter((item) => item.id !== itemid);
	};
	const onDelete = (id) => {
		callApi(`comments/${id}`, 'DELETE', null).then((res) => {
			console.log(res);
			if (res.status >= 200 && res.status < 300) {
				setcomments(removeViewItem(comments, id));
			}
		});
	};
	return <CommentTable comments={comments} onDelete={onDelete} />;
};
export default Comments;
