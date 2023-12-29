<template>
<p>댓글: {{ comments.length }}개</p>

<div v-for="comment in comments" :key="comment.id">
<p>{{ comment.registrationDate.substring(0, 10) }}</p>
<span>{{ comment.content }}</span>
<hr>
</div>
<!-- 댓글작성 -->
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
import axios from 'axios';
import {ref, onMounted} from 'vue';
import { useRoute } from 'vue-router'; // 추가

const route = useRoute(); // 추가
const comments = ref([]);
const boardId = ref(null);

const form = ref({
    boardId,
    content: null,
})

onMounted(() => {
    boardId.value = route.params.id; // 수정
    getComments();
})

async function getComments() {
    try {
        const { data } = await axios.get(`/api/comment/${route.params.id}`); // 수정
        comments.value = data.dataList; // 추가
        console.log('getComments', comments.value);
        console.dir(comments.value);
    } catch (error) {
        console.error(error);
    }
}


const postComment = () => {

    const data = {
        ...form.value
    }

    axios.post(`/api/comment/${route.params.id}`, {data})
  .then(function (response) {
    console.log(response);
    console.log('data=',{data});
    // route.push({ name: 'BoardList' }); 이동하는 메서드
  })
  .catch(function (error) {
    console.log(error);
  });


}

</script>