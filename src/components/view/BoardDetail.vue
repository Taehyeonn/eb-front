<template>
    <!-- 비동기 관리 -->
    <div v-if="loading">Loading...</div>
    <div v-else>
      <span>{{ board.writer }}</span>
      <span>{{ board.registrationDate.substring(0, 10) }}</span>
      <span>{{ board.modificationDate == null ? "-" : board.modificationDate.substring(0, 10) }}</span>
      <br>
      <span>{{ board.categoryName }}</span>
      <span>{{ board.title }}</span>
      <span>{{ board.viewCount }}</span>
      <hr>
      <p>{{ board.content }}</p>
    </div>
</template>
    
<script setup>
import apiBoard from '@/api/Board';
import {ref, onMounted} from 'vue';
import { useRoute } from 'vue-router'; 

const route = useRoute(); 
const board = ref({});
const boardId = ref(null);
const loading = ref(true);

onMounted(() => {
    boardId.value = route.params.id; // 수정
    getBoard(boardId.value);
})

/**
 * 게시글 상세 조회
 */
async function getBoard(boardId) {
    try {
        const { data } = await apiBoard.getArticle(boardId);
        board.value = data;
        console.log('getBoard', board.value);
        
        loading.value = false;
    } catch (error) {
        console.error(error);
    }
}
</script>