<template>
    <table>
      <thead>총 {{ totalCount }}개
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
</template>

<script setup>
const props = defineProps(["boards", "totalCount"]);

</script>