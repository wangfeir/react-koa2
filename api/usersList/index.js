/*
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-30 13:51:06
 */
import {axios} from '../util/axios';
export function getData(parameter) {
	return axios({
		url: `/user/getList`,
		method: 'post',
		data: parameter
	});
}
export function editPassword(parameter) {
	return axios({
		url: `/user/changePassword`,
		method: 'post',
		data: parameter
	});
}
