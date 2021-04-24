import UserTable from '../Components/Table/UserTable';
import { useEffect, useState } from 'react';
import callApi from '../utils/apiCaller.js';

const Users = () => {
	const [users, setusers] = useState([]);
	useEffect(() => {
		callApi('users', 'GET', null).then((res) => {
			setusers(res.data);
		});
	}, []);
	console.log(users);
	return <UserTable users={users} />;
};
export default Users;
