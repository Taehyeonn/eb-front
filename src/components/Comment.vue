<template>
<p>댓글: {{ comments.length }}개</p>

<!-- 댓글 조회 -->
<div v-for="comment in comments" :key="comment.id">
<p>{{ comment.registrationDate.substring(0, 10) }}</p>
<span>{{ comment.content }}</span>
<hr>
</div>

<!-- 댓글 작성 -->
<div>
    <form @submit.prevent="postComment">
        <label>
        <textarea v-model="form.content" rows="3" cols="65"></textarea>
        </label>
        <button @click="submitForm">등록</button>
    </form>
</div>
</template>

<script setup>
import apiComment from '@/api/Comment';
import {ref, onMounted} from 'vue';
import { useRoute } from 'vue-router'; 

const route = useRoute(); 
const comments = ref([]);
const boardId = ref(null);

const form = ref({
    boardId,
    content: null,
})

onMounted(() => {
    boardId.value = route.params.id; // 수정
    // getComments();
    getComments(boardId.value);
})

/**
 * 파라미터(게시글번호)에 해당하는 댓글을 불러온다
 */
async function getComments(boardId) {
    try {
        const { data } = await apiComment.getArticles(boardId);
        comments.value = data.dataList;
        console.log('getComments', comments.value);
    } catch (error) {
        console.error(error);
    }
}

/**
 * 댓글 작성
 * ref(form)을 얕은 복사하여 apiComment.postArticle()에 넘긴다
 */
async function postComment() {
    try {
        const data = await {...form.value};
        const { response } = await apiComment.postArticle(data);
        console.log('response=', response);
    } catch (error) {
        console.error(error);
    }
}
</script>