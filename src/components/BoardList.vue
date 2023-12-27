<template>
  <div>
    <table>
      <thead>총 {{ pagination.totalCount }}개
        <tr>
            <td>카테고리</td>
            <td>제목</td>
            <td>작성자</td>
            <td>조회수</td>
            <td>등록일시</td>
            <td>수정일시</td>
          </tr>
      </thead>
      <tbody>
        <tr v-for="b in boards" :key="b.id">
          <td>{{ b.categoryName }}</td>
          <router-link :to="'/list/view/' + b.id"><td>{{ b.title }}</td></router-link>
          <td>{{ b.writer }}</td>
          <td>{{ b.viewCount }}</td>
          <td>{{ b.registrationDate.substring(0, 10) }}</td>
          <td>{{ b.modificationDate == null ? "-" : b.modificationDate.substring(0, 10) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <hr>
  <div>
    <!-- 첫페이지로 이동 -->
    <RouterLink :to="getLink(pagination.beginPage)">&laquo;</RouterLink>

    <!-- 이전 페이지로 이동 -->
    <RouterLink v-if="pagination.prev" :to="getLink(pagination.pageNum - 1)">prev</RouterLink>

    <!-- 페이지 출력 -->
    <RouterLink v-for="i in pageRange" :key="i" :to="getLink(i)">
        {{ i }}
    </RouterLink>

    <!-- 다음 페이지로 이동 -->
    <RouterLink v-if="pagination.next" :to="getLink(pagination.pageNum + 1)">Next</RouterLink>

    <!-- 마지막 페이지로 이동 -->
    <RouterLink :to="getLink(pagination.lastPage)">&raquo;</RouterLink>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      boards: [],
      pagination: [],
    };
  },
  methods: {
    // API 호출 또는 다른 방법으로 데이터를 불러오는 로직
    loadData() {
      // Axios를 사용하여 서버에 GET 요청을 보냄
      axios.get('/api/list', {
        params: {
          pageNum: this.pagination.pageNum || 1, 
        },
      })
      .then(response => {
        // 성공적으로 받은 응답을 데이터에 할당
        this.boards = response.data.data.boards;
        this.pagination = response.data.data.pagination;
      })
      .catch(error => {
        // 에러가 발생한 경우 콘솔에 로그 출력
        console.error('Error fetching data:', error);
      });
    },
    // 페이지 이동을 위한 링크를 동적으로 생성하는 메서드
    getLink(pageNum) {
        return {
          path: '/list',
          query: { pageNum },
        };
    },
  },
  computed: {
    // pagination.beginPage부터 pagination.endPage까지의 범위를 생성
    pageRange() {
      const range = [];
      for (let i = this.pagination.beginPage; i <= this.pagination.endPage; i++) {
        range.push(i);
      }
      return range;
    }
  },
  watch: {
    '$route.query.pageNum'(newPageNum) {
      console.log('Watch: $route.query.pageNum changed to', newPageNum);
      // 쿼리스트링의 pageNum이 변경될 때마다 데이터를 다시 불러오기
      this.pagination.pageNum = parseInt(newPageNum) || 1;
      this.loadData();
    },
    'pagination.pageNum': 'loadData', // pagination이 변경될 때마다 데이터를 다시 불러오기
  },
  created() {
    // 초기 페이지 로딩 시 데이터를 불러옴
    this.loadData();
  },
  mounted() {
    // 페이지가 로딩된 후에 초기 데이터를 불러올 때 사용할 수 있는 훅
    // 이 부분에서 초기 데이터를 불러올 로직을 추가할 수 있음
  },
};
</script>