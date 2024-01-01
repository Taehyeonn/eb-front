<template>
    <div>
        <div>
            <h1>자유게시판 - 글쓰기</h1>
        </div>
        <BoardWrite/>
    </div>
  </template>

<script setup>
import BoardWrite from '../components/write/BoardWrite.vue';

const components = {
  BoardWrite,
};
</script>