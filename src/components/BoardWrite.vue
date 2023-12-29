<template>
    <div>
      <h1>자유게시판 - 글쓰기</h1>
    </div>
    <form @submit.prevent="postBoard" >
        <label>카테고리: </label>
        <select v-model="board.categoryId">
            <option value="" disabled selected>카테고리 선택</option>
            <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
        </select>
        <br>
        <label for="writer">작성자:</label>
        <input type="text" id="writer" v-model="board.writer" required />
        <br>
        <label for="password">비밀번호:</label>
        <input type="password" id="password" v-model="board.password" required />
        <br>
        <label for="confirmPassword">비밀번호확인:</label>
        <input type="password" id="confirmPassword" v-model="board.confirmPassword" required />
        <br>
        <label for="title">제목:</label>
        <input type="text" id="title" v-model="board.title" required />
        <br>
        <label for="content">내용:</label>
        <textarea id="content" v-model="board.content" required></textarea>
        <br>
        <router-link to="/list"><button>취소</button></router-link>
        <button type="submit">제출</button>
    </form>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted} from 'vue';

const categories = ref([]);

const board = ref({
    categoryId: '',
    writer: '',
    password: '',
    title: '',
    content: '',
    confirmPassword: '',
})

onMounted(() => {
    getCategories();
})

async function getCategories() {
    try {
        const { data } = await axios.get(`/api/categories`); 
        categories.value = data.dataList;
        console.log('getCategories', categories.value);
        console.dir(categories.value);
    } catch (error) {
        console.error(error);
    }
}

async function postBoard() {
  const data = {
    ...board.value,
  };

  try {
    const response = await axios.post('/api/boards', {
      confirmPassword: data.confirmPassword,
      categoryId: data.categoryId,
      writer: data.writer,
      password: data.password,
      title: data.title,
      content: data.content,
    });
    console.log('게시물 등록.', response.data);
  } catch (error) {
    console.error('게시물 등록 중 오류 발생:', error);
  }
}

</script>