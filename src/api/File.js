import axios from 'axios';

export default {
    /**
     * 파일 목록 조회
     * get /api/comments
     * 
     * @param {*} boardId 게시글 번호
     * @returns 값 있으면 List<File>, 값 없으면 null 반환
     */
    getArticles (boardId) {
        return axios.get(`/api/files/${boardId}`);
    },
}
