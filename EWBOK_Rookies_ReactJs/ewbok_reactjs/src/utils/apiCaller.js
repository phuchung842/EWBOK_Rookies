import axios, { AxiosResponse } from 'axios';
import * as Config from '../Constants/Config';

export default function callApi(endpoint, method = 'GET', body, header = null) {
	return axios({
		method: method,
		url: `${Config.API_URL}/${endpoint}`,
		data: body,
		header: header,
	});
}
