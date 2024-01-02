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
          <li v-for="file in files" :key="file.id">
            <a @click.prevent="downloadFile(file.id, file.originName)">{{ file.originName }}</a>
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

/**
 * 파일 다운로드 함수
 * @param {} fileId 파일 번호
 * @param {*} originName 파일 원본 이름
 */
const downloadFile = async (fileId, originName) => {
  try {

    // API로 파일 데이터 요청
    const response = await apiFile.getArticle(fileId);

    // 블롭(Blob) 객체 생성을 통해 파일 데이터를 담은 URL 생성
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // <a> 요소 생성 및 설정
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', originName); 

    // <a> 요소를 문서(body)에 추가
    document.body.appendChild(link);

    // <a> 요소를 가상으로 클릭하여 파일 다운로드 시작
    link.click();

    // <a> 요소를 문서에서 제거하여 정리
    document.body.removeChild(link);
  } catch (error) {
    console.error('파일 다운로드 중 오류 발생:', error);
  }
};
</script>