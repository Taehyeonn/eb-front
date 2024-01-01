<template>
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
        <input type="file" @change="onInputImage" multiple>
        <br>
        <router-link to="/list"><button>취소</button></router-link>
        <button type="submit">제출</button>
    </form>
</template>

<script setup>
import apiBoard from '@/api/Board';
import apiCategory from '@/api/Category';
import {ref, onMounted} from 'vue';
import { useRouter } from 'vue-router'; 

const router = useRouter(); 

const categories = ref([]);

const board = ref({
    categoryId: '',
    writer: '',
    password: '',
    title: '',
    content: '',
    confirmPassword: '',
    // files: [],
})
const files = ref([]);

onMounted(() => {
    getCategories();
})

/**
 * get /api/categories
 * 카테고리 리스트를 받아와 categories.value에 저장한다
 */
async function getCategories() {
    try {
        const { data } = await apiCategory.getArticles();
        categories.value = data;
        console.log('getCategories', categories.value);
    } catch (error) {
        console.error(error);
    }
}

/**
 * post /api/boards
 * 입력받은 데이터들을 서버에 보내 게시글 작성한다
 */
 async function postBoard() {
    try {
        const data = await {...board.value};
        const { response } = await apiBoard.postArticle(data, files);
        console.log('response=', response);
        router.push('/list'); // 목록으로 이동
    } catch (error) {
      console.error('게시물 등록 중 오류 발생:', error);
    }
}

/**
 * 파일 선택시 배열에 저장
 * @param {*} event 
 */
const onInputImage = (event) => {
  // 이벤트 객체가 유효한지 확인
  if (event && event.target) {
    console.log(event.target.files);
    // 선택된 파일들을 files 배열에 저장
    files.value = event.target.files;
  }
};
</script>