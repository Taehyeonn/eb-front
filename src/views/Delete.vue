<template>
    <div>
        <div>
            <h1>자유게시판 - 글 삭제</h1>
        </div>
        <BoardDelete/>
    </div>
  </template>

<script setup>
import BoardDelete from '../components/delete/BoardDelete.vue';

const components = {
    BoardDelete,
};
</script>