<template>
  <div>
    <input placeholder="종목코드" v-model="code" />
    <button @click="sendQuery">제출</button>
    <div>
      {{ contents }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { queryCurrentMarketPrice } from "./query";

@Component
export default class extends Vue {
  contents = "Not Loaded";
  code = "";

  async sendQuery() {
    try {
      const response = await queryCurrentMarketPrice(this.code);
      this.contents = response.data;
    } catch (e) {
      this.contents = e;
    }
  }
}
</script>

<style lang="scss"></style>
