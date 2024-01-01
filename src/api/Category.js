import axios from 'axios';

export default {
    /**
     * 카테고리 목록 조회
     * get /api/categories
     * 
     * @returns List<Category>
     */
    getArticles () {
        return axios.get(`/api/categories`);
    },
}