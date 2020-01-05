<script>
    export let bio = "I luv to work with code. and I luv to create everythings which attract people’" +
            "s interest.";
    export let interests = [
        {
            name: "#Texture(AsyncDisplayKit)",
            url: "http://texturegroup.org/"
        }, {
            name: "#RxSwift",
            url: "https://community.rxswift.org/"
        }, {
            name: "#iOS",
            url: "https://www.apple.com/"
        }, {
            name: "#Vue.js",
            url: "https://vuejs.org/"
        }, {
            name: "#Flask",
            url: "http://flask.pocoo.org/"
        }, {
            name: "#PlatformIO",
            url: "https://platformio.org/"
        }, {
            name: "#IoT",
            url: null
        }, {
            name: "#Vingle",
            url: "https://www.vingle.net/"
        }, {
            name: "#당근마켓",
            url: "https://www.daangn.com/"
        }, {
            name: "#Svelte",
            url: "https://svelte.dev/"
        }
    ];

    function didTapInterestTag(urlString) {
        window.open(urlString)
    }
</script>

<div id="interest-section" data-aos="zoom-in" data-aos-duration="500">
    <p id="bio">{bio}</p>
    <div id="interest-container" data-aos="zoom-in" data-aos-duration="500">
        {#each interests as interest}
            <p id="interest-tag" on:click={() => didTapInterestTag(interest.url)}>{interest.name}</p>
        {/each}
    </div>
</div>

<style>
    #interest-section {
        background: clear;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-wrap: nowrap;
        margin: 10vw;
        font-size: 140%;
        font-weight: 500;
    }
    #interest-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
    #interest-section #bio {
        font-size: 120%;
        font-style: italic;
        text-align: center;
        font-weight: 300;
        color: rgba(34, 41, 66, 1);
    }
    #interest-section #interest-tag {
        margin: 2vw;
        color: rgba(88, 88, 88, 0.5);
        -webkit-transition: font-size 1.5s;
        /* Safari */
        transition: font-size 1.5s;
        -webkit-transition: color 0.5s;
        /* Safari */
        transition: color 0.5s;
    }
    #interest-section #interest-tag:hover {
        margin: 2vw;
        color: rgba(120, 188, 128, 1);
        font-size: 145%;
    }
</style>