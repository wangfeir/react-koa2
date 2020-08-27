/*
 * @description: 
 * @param: 
 * @author: Fei
 * @return: 
 * @Date: 2020-08-26 14:42:28
 */
import {axios} from '../util/axios';
export function createData(parameter) {
	return axios({
		url: `/global/createData`,
		method: 'post',
		data: parameter
	});
}

export function updateData(parameter) {
	return axios({
		url: `/global/updateData`,
		method: 'post',
		data: parameter
	});
}