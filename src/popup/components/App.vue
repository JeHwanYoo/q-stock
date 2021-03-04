<template>
  <div>
    <input placeholder="종목코드" v-model="code" />
    <button @click="sendQuery">제출</button>
    <div>
      <b-list-group>
        <b-list-group-item v-for="content in contents" :key="content.date">
          <p>날짜: {{ content.date }}</p>
          <p>종가: {{ content.dayEndPrice | commas }}</p>
          <p>등락: {{ content.dungrak }}</p>
          <p>대비: {{ content.debi | commas }}</p>
          <p>시가: {{ content.start | commas }}</p>
          <p>고가: {{ content.high | commas }}</p>
          <p>저가: {{ content.low | commas }}</p>
          <p>거레량: {{ content.volume | commas }}</p>
          <p>거래대금: {{ content.amount | commas }}</p>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { queryCurrentMarketPrice } from "./query";
import { parseXMLToModel, numberWithCommas } from "./parser";

@Component({
  filters: {
    commas(num: number) {
      return numberWithCommas(num);
    },
  },
})
export default class extends Vue {
  contents = [];
  code = "";

  async sendQuery() {
    try {
      const response = await queryCurrentMarketPrice(this.code);
      this.contents = parseXMLToModel(response.data);
    } catch (e) {
      this.contents = e;
    }
  }
}
</script>

<style lang="scss"></style>
