import axios from 'axios';
import * as Config from '../Constants/Config';

export default function callApi(endpoint, method = 'GET', body, header = null) {
	return axios({
		method: method,
		url: `${Config.API_URL}/api/${endpoint}`,
		data: body,
		header: header,
	});
}
