import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE = 'https://inbites-api.wmlit.com/api/tenants/crion/tags/';

const accessToken = Cookies.get('token');
console.log(accessToken,'token');


// Create an authenticated Axios instance
const axiosInstance = axios.create({
	baseURL: API_BASE,
	headers: {
		Authorization: `Token ${accessToken}`,
		'Content-Type': 'application/json',
	},
});
// Define the tag type structure
export type Tag = {
	id: number;
	name: string;
};
interface GetTagsResponse {
	tags: Tag[];
	total?: number;
	page?: number;
	pageSize?: number;
}

export const getTags = async (
	searchQuery = '',
	page = 1,
	pageSize = 25,
): Promise<GetTagsResponse> => {
	console.log('🔍 Search:', searchQuery, '| Page:', 1, '| PageSize:', 25);
	try {
		const response = await axiosInstance.get('/', {
			params: {
				search: searchQuery,
			},
		});

		const res = response.data;
		console.log('📦 Full API response:', res);

		const possibleArrays = [res.tags, res.results, res.data, res];
		const foundArray = possibleArrays.find((item) => Array.isArray(item));

		return {
			tags: foundArray || [],
			total: res.count,
			page: res.page || page,
			pageSize: res.pageSize || pageSize,
		};
	} catch (error) {
		console.error('❌ GET tags failed:', error);
		return { tags: [], page, pageSize, total: 0 };
	}
};
//✅ POST a new tag
export const addTag = async (tagName: string): Promise<void> => {
	try {
		await axiosInstance.post('/', { name: tagName });
	} catch (error) {
		console.error('POST tag failed:', error);
		throw error;
	}
};

// ✅ PUT (edit) a tag by ID
export const editTag = async (id: number, newTagName: string): Promise<void> => {
	try {
		await axiosInstance.put(`/${id}/`, { name: newTagName });
	} catch (error) {
		console.error(`PUT tag ${id} failed:`, error);
		throw error;
	}
};

// ✅ DELETE a tag by ID
export const deleteTag = async (id: number): Promise<void> => {
	try {
		await axiosInstance.delete(`/${id}/`);
		console.log(`Tag with ID ${id} deleted successfully`);
	} catch (error) {
		console.error(`DELETE tag ${id} failed:`, error);
		throw error;
	}
};
