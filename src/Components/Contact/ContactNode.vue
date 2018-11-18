<template>
  <div id="contact-node" 
       data-aos="zoom-in"
       data-aos-duration="500">
    <div data-aos="zoom-in"
       data-aos-duration="500" v-bind:key="sns" v-for="sns in snss">
        <p id="sns-tag" v-on:click="openURL(sns.url)">{{sns.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactNode",
  data: function() {
    return {
      snss: [
        {
          name: "@Facebook",
          url: "https://www.facebook.com/profile.php?id=100009249402427"
        },
        { name: "@Medium", url: "https://medium.com/@h2s1880" },
        { name: "@Gmail", url: "mailto:hyeonsu.ha@vingle.net" },
        { name: "@Texture-Slack", url: "https://asyncdisplaykit.slack.com/" }
      ]
    };
  },
  methods: {
    openURL: function(url) {
      if (url == null) return;
      window.open(url);
    }
  }
};
</script>

<style>
#contact-node {
  background: clear;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 0;
  margin-left: 10vw;
  margin-right: 10vw;
  margin-bottom: 20vw;

  font-size: 140%;
  font-weight: 500;
}

#contact-node #sns-tag {
  margin: 2vw;
  color: rgba(68, 68, 68, 0.8);

  -webkit-transition: font-size 1.5s; /* Safari */
  transition: font-size 1.5s;
  -webkit-transition: color 0.5s; /* Safari */
  transition: color 0.5s;
}

#contact-node #sns-tag:hover {
  margin: 2vw;
  color: rgba(120, 188, 128, 1);
  font-size: 145%;
}
</style>
