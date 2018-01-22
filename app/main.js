import Vue from 'vue';

const placeholderView = { 
    template : "<h1> Coming soon.... </h1>"
};

//#start Vue application
new Vue({
    el: '#app',
    data : {
        currentRoute : window.location.pathname
    },
    computed : {
        ViewComponent (){
            return placeholderView;
        }
    },
    render (h) { return h(this.ViewComponent) }
});