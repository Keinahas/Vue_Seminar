<template>
  <div>
    <!-- <HelloCompo v-bind:name="myName" value="Hello World"></HelloCompo> -->
    <!-- <HelloCompo :name="myName" value="Hello World"></HelloCompo> -->
    <!-- v-model은 v-bind:value v-on:input -->
    <HelloCompo :name="myName" v-model="msg" @on-btn="onBtn"></HelloCompo>
    <v-text-field label="v-model 테스트" v-model="msg"></v-text-field>
    <div v-if="show" v-html="html"></div>
    <div v-show="show" v-text="html"></div>
    <v-checkbox label="show test" v-model="show"></v-checkbox>
  </div>
</template>

<script>
/*
  v-bind: VM과 view를 연동시켜주는것 (= :)
  v-model:는 v-bind:value v-on:input와 같음
  v-on: 이벤트를 핸들링 하는 것
  v-show: css display: none을 적용하는 것 (자주 쓰면)
  v-if: DOM 삭제
  v-html: html tag로 받는것
  v-text: string으로 받는것
*/
import HelloCompo from "../components/HelloCompo";
export default {
  components: { HelloCompo },
  data: () => ({
    show: true,
    html: "<h1>test</h1>",
    myName: "박수원",
    msg: "Hello World",
  }),
  methods: {
    onBtn() {
      this.msg += "clicked";
      console.log("event from component");
    },
  },
};
</script>

<style></style>
