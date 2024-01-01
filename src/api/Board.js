import axios from 'axios';

export default {
    /**
     * 게시글 단일 조회
     * get /api/board/{boardId}
     * 
     * @param {*} boardId 게시글 번호
     * @returns Board
     */
    getArticle (boardId) {
        return axios.get(`/api/board/${boardId}`);
    },
}
