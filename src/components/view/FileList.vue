<template>
    <!-- fileList 비어있을 때 -->
    <div v-if="files.length === 0">
        <p>첨부파일이 없습니다.</p>
      </div>

      <!-- fileList 비어있지 않을 때 -->
      <div v-else>
        <!-- fileList 있는 파일들을 출력 -->
        <p>첨부파일</p>
        <ul>
          <!-- 링크 클릭시 id.html 그대로 다운로드 되는 이슈 수정해야 함 -->
          <li v-for="file in files" :key="file.id">
            <a :href="downloadUrl(file.id)" download>{{ file.originName }}</a>
          </li>
        </ul>
      </div>
    </template>
    
    <script setup>
    import apiFile from '@/api/File';
    import {ref, onMounted} from 'vue';
    import { useRoute } from 'vue-router'; 
    
    const route = useRoute(); 
    const files = ref([]);
    const boardId = ref(null);
    
    onMounted(() => {
        boardId.value = route.params.id; 
        getFiles(boardId.value);
    })

    /**
     * 다운로드 URL을 생성하는 함수
     * @param {*} fileId 파일 번호
     */
    const downloadUrl = (fileId) => `/download/${fileId}`;
    
    /**
     * 파라미터(게시글번호)에 해당하는 댓글을 불러온다
     */
    async function getFiles(boardId) {
        try {
            const { data } = await apiFile.getArticles(boardId);
            files.value = data;
            console.log('files===', files.value);
        } catch (error) {
            console.error(error);
        }
    }
    </script>