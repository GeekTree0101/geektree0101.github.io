<template>
  <div id="article-container">
    <div v-bind:key="item" v-for="item in items">
      <ArticleNode 
      :title="item.title" 
      :desc="item.desc" 
      :preview="item.preview"
      :source="item.source"></ArticleNode>
    </div>
  </div>
</template>

<script>
import ArticleNode from "./ArticleNode";
export default {
  name: "ArticleContainer",
  components: {
    ArticleNode
  },
  props: {
    streams: {
      title: String,
      desc: String,
      preview: String,
      source: String
    }
  },
  data: function() {
    return {
      items: this.streams
    };
  }
};
</script>

<style>
#article-container {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 30px;
  background: clear;
}
</style>
