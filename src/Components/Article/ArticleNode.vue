<template>
  <div id="article-node"
   data-aos="fade-up"
   data-aos-duration="500"
   v-on:click="openURL(source)">
    <img :src="preview" />
    <h1>{{title}}</h1>
    <p>{{desc}}</p>
  </div>
</template>

<script>
export default {
  name: "ArticleNode",
  props: ["title", "desc", "preview", "source"],
  methods: {
    openURL: function(sourceUrl) {
      window.open(sourceUrl);
    }
  }
};
</script>

<style>
#article-node {
  position: relative;
  background-color: rgb(245, 245, 245);
  width: 300px;
  flex-grow: 1;
  flex-shrink: 1;
  margin-top: 0px;
  margin-bottom: 20px;
  margin-right: 10px;
  margin-left: 10px;
  padding: 1px;
  border-width: 2px;
  border-color: white;
  border-radius: 20px;
  text-align: center;
  box-shadow: 1.5px 1.5px 1.5px 1.5px rgba(233, 233, 233, 0.8);
}

#article-node img {
  position: relative;
  background-color: rgb(148, 147, 147);
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

#article-node h1 {
  position: relative;
  margin-bottom: 25px;
  margin-left: 15px;
  margin-right: 15px;
  color: dark-gray;
}

#article-node p {
  position: relative;
  margin-top: 5px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 40px;
  color: gray;
}

#article-node:hover {
  opacity: 0.2;
}
</style>
