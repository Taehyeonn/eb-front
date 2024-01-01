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
        return axios.get(`/api/boards/${boardId}`);
    },

    /**
     * 게시글 등록
     * @param {*} data 작성할 게시글 정보
     * @param {*} files 첨부파일
     * @returns HttpStatus.CREATED
     */
    postArticle (data, files) {
        console.log(files.value);
        return axios.post(`/api/boards`, {
            ...data,
            files: files.value,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
}
