<template>
  <div>{{ contents }}</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "axios";

@Component
export default class extends Vue {
  contents = "Not Loaded";
  code = "005930";

  mounted() {
    // Axios.get(`http://asp1.krx.co.kr/servlet/krx.asp.XMLSise?code=${this.code}`)
    //   .then((res) => (this.contents = res.data))
    //   .catch((err) => (this.contents = err));
  }
}
</script>

<style lang="scss"></style>
