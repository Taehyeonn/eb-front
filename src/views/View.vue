<template>
    <div>
        <div>
            <h1>자유게시판 - 상세 조회</h1>
        </div>
        <BoardDetail/>
        <FileList/>
        <Comment/>
        <div>
            <router-link to="/"><button>목록</button></router-link>
            <router-link to="/"><button>수정</button></router-link>
            <router-link to="/"><button>삭제</button></router-link>
        </div>
    </div>
  </template>

<script setup>
import BoardDetail from '../components/view/BoardDetail.vue';
import Comment from '../components/view/Comment.vue';
import FileList from '../components/view/FileList.vue';

const components = {
  BoardDetail,
  Comment,
  FileList
};
</script>