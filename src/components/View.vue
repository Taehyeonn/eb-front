<template>
  <div>
    <div>
      <h1>자유게시판 - 상세 조회</h1>
    </div>

    <!-- 비동기 관리 -->
    <div v-if="loading">Loading...</div>
    <div v-else>
      <!-- View 정보 표시 -->
      <span>{{ board.writer }}</span>
      <span>{{ board.registrationDate.substring(0, 10) }}</span>
      <span>{{ board.modificationDate == null ? "-" : board.modificationDate.substring(0, 10) }}</span>
      <br>
      <span>{{ board.categoryName }}</span>
      <span>{{ board.title }}</span>
      <span>{{ board.viewCount }}</span>
      <hr>
      <p>{{ board.content }}</p>

      <!-- fileList 비어있을 때 -->
      <div v-if="fileList.length === 0">
        <p>첨부파일이 없습니다.</p>
      </div>

      <!-- fileList 비어있지 않을 때 -->
      <div v-else>
        <!-- fileList 있는 파일들을 출력 -->
        <ul>
          <!-- 링크 클릭시 id.html 그대로 다운로드 되는 이슈 수정해야 함 -->
          <li v-for="file in fileList" :key="file.id">
            <a :href="downloadUrl(file.id)" download>{{ file.originName }}</a>
          </li>
        </ul>
      </div>

      <!-- commentList 비어있을 때 -->
      <div v-if="commentList.length === 0">
        <p>댓글이 없습니다.</p>
      </div>

      <!-- commentList 비어있지 않을 때 -->
      <div v-else v-for="comment in commentList" :key="comment.id">
        <p>{{ comment.registrationDate.substring(0, 10) }}</p>
        <span>{{ comment.content }}</span>
        <hr>
      </div>
      <div>
        <!-- 댓글 -->
        <label>
          <textarea v-model="content" rows="3" cols="65" name="content"></textarea>
        </label>
        <button @click="submitForm">등록</button>
      </div>
        <button @click="">목록</button>
        <button @click="">수정</button>
        <button @click="">삭제</button>
      <div>
        <!-- 버튼 -->
      </div>
    </div> 
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: true,
      content: '',
      board: {},
      commentList: [],
      fileList: [],
      // 다른 필드들도 있을 수 있음
    };
  },
  mounted() {
    // 페이지 로딩 시, ViewInfoResponse를 받아오는 함수 호출
    console.log('Route ID:', this.$route.params.id);
    this.fetchViewInfo();
  },
  methods: {
    async fetchViewInfo() {
      try {
        // Axios를 사용하여 서버에 GET 요청을 보냄
        const response = await axios.get(`/api/view/${this.$route.params.id}`);
        console.log('Server Response:', response.data);

        // 데이터를 받아왔으면 false로 변경 후 출력
        this.loading = false;

        // 서버 응답에서 필요한 데이터 추출
        this.board = response.data.data.board;
        this.commentList = response.data.data.commentList;
        this.fileList = response.data.data.fileList;

      } catch (error) {
        console.error('Error fetching view info:', error);
      }
    },
    downloadUrl(fileId) {
      // 다운로드 URL을 생성하는 로직
      return `/download/${fileId}`;
    },
    async submitForm() {
      // 여기서 서버로 데이터를 전송합니다.
      try {
        const response = await axios.post(`/api/view/${this.$route.params.id}`, {
          content: this.content,
        });

        this.content = '';

        // 댓글 작성후 데이터 새로고침
        // 나중에 데이터 분리하기 or commentList에 바로 추가해서 연동하기
        this.fetchViewInfo();

      } catch (error) {
        console.error('Error submitting form:', error);
        console.log('Axios Request:', {
          url: `/api/view/${this.$route.params.id}`,
          method: 'post',
          data: { content: this.content },
        });
      }
    },
  }
};
</script>