<template>
    <div>
        <!-- 첫페이지로 이동 -->
        <span @click="handlePageNum(pagination.beginPage)">&laquo;</span>

        <!-- 이전 페이지로 이동 -->
        <span v-if="pagination.prev" @click="handlePageNum(pagination.pageNum - 1)">prev</span>

        <!-- 페이지 출력 -->
        <span v-for="i in pageRange" :key="i" @click="handlePageNum(i)">
            {{ i }}
        </span>

        <!-- 다음 페이지로 이동 -->
        <span v-if="pagination.next" @click="handlePageNum(pagination.pageNum + 1)">Next</span>

        <!-- 마지막 페이지로 이동 -->
        <span @click="handlePageNum(pagination.lastPage)">&raquo;</span>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed} from "vue"
 
const props = defineProps(['pagination']);

const router = useRouter();
const route = useRoute();

const emit = defineEmits();

/**
 * 페이지 네비게이션의 범위 계산 
 */
const pageRange = computed(() => {

  const range = [];
  for (let i = props.pagination.beginPage; i <= props.pagination.endPage; i++) {
    range.push(i);
  }
  return range;
});

/**
 * 클릭한 페이지에 해당하는 쿼리스트링을 업데이트하고 부모 컴포넌트에 전달
 * @param {*} pageNumber pageNum
 */
const handlePageNum = (pageNumber) => {
    const pageNum = pageNumber;

    const queryParams = {...route.query, pageNum}; 
    router.push({ query: queryParams });

    emit('handlePageNum');
};
</script>