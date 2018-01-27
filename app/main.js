import Vue from 'vue';
const BannerView = require("./components/Banner");
//const IntroView = require("./components/Introduction");
//const HistoryView = require("./components/History");
const ContactView = require("./components/Contact");

let MainView = Vue.component("main-view", {
    template: `
    <div>
        <banner-view/>
        <contact-view/>
    </div>
    `
})

new Vue({
    el: '#application',
    template: `<main-view></main-view>`
})
