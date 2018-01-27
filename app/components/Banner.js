import Vue from 'vue';

var NavigationBar = Vue.component('navbar-view', {
    template: `
        <header id="header">
            <div class="header-content clearfix"> <a class="logo" href="#">{{logo}}</a>
                <nav class="navigation" v-bind:class="{ 'open': didTapToggleState }" role="navigation">
                    <ul class="primary-nav">
                        <li><a href="#introduction">INTRO</a></li>
                        <li><a href="#works">HISTORY</a></li>
                        <li><a href="#contact">CONTACT</a></li>
                    </ul>
                </nav>
                <a v-on:click="didTapToggle" href="#" class="nav-toggle" v-bind:class="{ 'close-nav': didTapToggleState }" >Menu<span></span></a>
            </div>
        </header>
    `,
    data: function () {
        return {
            logo: "Geektree0101",
            didTapToggleState: false
        }
    },
    methods: {
        didTapToggle(event) {
            this.didTapToggleState = !this.didTapToggleState
        }
    }
});

var BannerView = Vue.component('banner-view', {
    template: `
        <section class="banner" role="banner"> 
            <navbar-view></navbar-view>
            <div class="container">
                <div class="col-md-7 banner-inner-wrapper">
                    <div class="banner-text">
                        <h1>{{headline}}</h1>
                        <p>{{subline}}</p>
                        <a v-on:click='onClick' class="btn">{{githubButtonText}}</a>
                    </div>
                    </div>
                </div>
        </section>
    `,
    data: function () {
        return {
            headline: "Be a Swift Jedi",
            subline: "I'm Hyeonsoo Ha, iOS Developer in Republic of Korea",
            githubURL: "https://github.com/GeekTree0101",
            githubButtonText: "More see"
        }
    },
    methods: {
        onClick: function(event) {
            window.open(this.githubURL)
        }
    }
});