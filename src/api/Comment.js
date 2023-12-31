import axios from 'axios';

// const API_URL = "http://localhost:8080/";

export default {
    /**
     * 댓글 목록 조회
     * get /api/comments
     * 
     * @param {*} boardId 게시글 번호
     * @returns 
     */
    getArticles (boardId) {
        return axios.get(`/api/comments/${boardId}`);
    },

    /**
     * 댓글 작성
     * get /api/comments
     * 
     * @param {*} data 게시글 번호, 댓글 내용
     * @returns 
     */
    postArticle (data) {
        return axios.post(`/api/comments/${data.boardId}`, {
            ...data
        });
    },
}
