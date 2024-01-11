<template>
    <form @submit.prevent="deletePost">
        <label for="password">비밀번호:</label>
        <input type="password" id="password" v-model="password" required />
        <button type="submit">삭제</button>
        <button @click="goToPreviousPage">취소</button>
    </form>
</template>

<script setup>
import apiBoard from '@/api/Board';
import {ref, onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router'; 

const router = useRouter();
const route = useRoute(); 
const password = ref('');
const boardId = ref('');

onMounted(() => {
    boardId.value = route.params.id;
})

/**
 * 이전페이지(view)로 이동하는 메서드
 */
const goToPreviousPage = () => router.push(`/list/view/${boardId.value}`);

/**
 * 게시글 삭제 후 목록 이동
 */
const deletePost = async () => {
  try {
    const { response } = await apiBoard.deleteArticle(boardId.value, password.value);
    await router.push('/');
  } catch (error) {
    console.error('Error deleting post:', error.message);
  }
};
</script>