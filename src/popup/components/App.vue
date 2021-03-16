<template>
  <div>
    <b-container class="my-2">
      <p v-if="debug">{{ debugContents }}</p>
      <p v-if="IsDone">불러오기 완료</p>
      <p v-else>불러오는 중 {{ contents.length }}</p>
      <b-row>
        <b-col>
          <b-list-group>
            <b-list-group-item v-for="content in contents" :key="content.code">
              <p>조회 시간: {{ CurrentDate }}</p>
              <p>종목 코드: {{ content.stockInfo.code }}</p>
              <p>종목 이름: {{ content.stockInfo.name }}</p>
              <p>현재 가격: {{ content.stockInfo.price | commas }}</p>
              <p>등락: {{ content.stockInfo.dungrak }}</p>
              <p>대비: {{ content.stockInfo.debi | commas }}</p>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { queryCurrentMarketPrice } from "./query";
import { parseXMLToModel, numberWithCommas, Stock } from "./parser";
import { Register } from "./data";

@Component({
  filters: {
    commas(num: number) {
      return numberWithCommas(num);
    },
  },
})
export default class extends Vue {
  debug = false;
  debugContents = "";
  contents: Stock[] = [];
  loading = false;
  register: Register[] = [
    {
      code: "035720",
      name: "카카오보통주",
      type: "gukmun",
    },
    {
      code: "005930",
      name: "삼성전자보통주",
      type: "yeongmun",
    },
  ];

  get CurrentDate() {
    return new Date();
  }

  get IsDone() {
    return this.contents.length == this.register.length;
  }

  mounted() {
    this.register.forEach((reg) => {
      queryCurrentMarketPrice(reg.code, reg.type)
        .then((res) => {
          this.contents.push(parseXMLToModel(reg.code, res.data));
        })
        .catch((e) => {
          this.debug = true;
          this.debugContents = e;
        });
    });
  }
}
</script>

<style lang="scss">
$popup-size: 300px;
body {
  min-width: $popup-size;
}
</style>
