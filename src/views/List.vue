<template>
    <div>
        <div>
            <h1>자유게시판 - 상세 조회</h1>
        </div>
        <div>
        <!-- 검색 컴포넌트 -->
        <Search @sendQueryToServer="getBoards"/>
    
        <!-- 게시글 리스트 출력 컴포넌트 -->
        <PostList :boards='boards' :totalCount="pagination.totalCount"/>

        <!-- 페이지네이션 컴포넌트 -->
        <Pagination :pagination='pagination' @handlePageNum="getBoards"/>
        </div>
        <div>
            <router-link to="/list/write"><button>작성</button></router-link>
        </div>
    </div>
</template>

<script setup>
import Search from "@/components/list/Search.vue";
import PostList from "@/components/list/PostList.vue";
import Pagination from "@/components/list/Pagination.vue";

import apiBoard from '@/api/Board';
import {ref, onMounted} from 'vue';
import { useRoute } from 'vue-router';

const components = {
    Search,
    PostList,
    Pagination,
};

const route = useRoute();

const boards = ref([]);
const pagination = ref({});

onMounted(() => {
    getBoards();
})

/**
 * 게시글 전체 조회
 */
async function getBoards() {

    try {
        const inputQuery = {...route.query}; 
        console.log("inputQuery",inputQuery);

        const { data } = await apiBoard.getArticles(inputQuery);
        boards.value = data.boards;
        pagination.value = data.pagination;
        console.log('getBoard', boards.value);
        console.log('pagination', pagination.value);
    } catch (error) {
        console.error(error);
    }
}
</script>