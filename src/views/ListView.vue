<template>
    <div>
      <h1>자유게시판 - 목록</h1>
    </div>
    <main>
    <BoardList />
    </main>

  </template>

<script>
import BoardList from '../components/BoardList.vue';

export default {
  components: {
    BoardList,
  },
  props: {
  pageNum: Number,  // 예를 들어, 숫자 형식으로 선언
  // 다른 props 정의...
},
};
</script>