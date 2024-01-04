<template>
    <div>
      <input v-model="searchFilter.startDate" type="date" placeholder="Start Date">
        -
      <input v-model="searchFilter.endDate" type="date" placeholder="End Date">
      <select v-model="searchFilter.category">
        <option value="0" selected>전체 카테고리</option>
        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
      </select>
      <input v-model="searchFilter.searchText" type="text" placeholder="검색어를 입력해주세요. (제목+작성자+내용)">
      <button @click="sendQueryToServer">조회</button>
    </div>
</template>

<script setup>
import apiCategory from '@/api/Category';
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter();

const categories = ref([]);

const today = new Date();
const oneYearAgo = new Date();
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

const searchFilter = ref({
  startDate: oneYearAgo.toISOString().split('T')[0],
  endDate: today.toISOString().split('T')[0],
  category: '0',
  searchText: '',
});

onMounted(() => {
    getCategories();
});

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
};

/**
 * 검색 필터의 값이 변경되면 쿼리스트링을 업데이트 해주는 함수 실행
 */
watch(searchFilter, () => {
  updateQueryString();
}, { deep: true });

/**
 * searchFilter의 값들을 쿼리스트링에 반영
 */
const updateQueryString = () => {
  const queryParams = { ...searchFilter.value };
  console.log("queryParams=", queryParams);
  router.push({ query: queryParams });
};

/**
 * 조회 버튼을 눌렀을때 부모 컴포넌트에 전달
 */
const emit = defineEmits();
const sendQueryToServer = () => {
  
  emit('sendQueryToServer');
};
</script>