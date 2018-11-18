<template>
  <div id="section-header">
    <p>- {{title}} -</p>
  </div>
</template>

<script>
export default {
  name: "SectionHeader",
  props: ["title"]
};
</script>

<style>
#section-header {
  background: clear;
  color: gray;
  height: 20vw;
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  font-style: italic;
  font-weight: 200;
  font-size: 120%;
}
</style>
