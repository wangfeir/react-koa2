/*
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-21 15:22:45
 */
import {axios} from '../util/axios';
export function searchAll(parameter) {
	return axios({
		url: `/list/search`,
		method: 'get',
		params: parameter
	});
}
export function deleteServer(parameter) {
	return axios({
		url: `/list/delete`,
		method: 'delete',
		params: parameter
	});
}