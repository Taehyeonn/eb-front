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
     * 게시글 전체 조회 
     * @param {*} query 검색 조건, 페이지 번호
     * @returns BoardListResponse(List<Board> boards, Pagination pagination)
     */
    getArticles (query) {
        console.log("쿼리에 들어가는 query==", query);
        return axios.get(`/api/boards`, {
            params: {
                pageNum: query.pageNum,
                searchText: query.searchText,
                startDate: query.startDate,
                endDate: query.endDate,
                category: query.category,
            },
        });
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
