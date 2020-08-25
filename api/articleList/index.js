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
		url: `/search/all`,
		method: 'get',
		params: parameter
	});
}
export function searchAll1(parameter) {
	return axios({
		url: `/search/all1`,
		method: 'get',
		data: parameter
	});
}