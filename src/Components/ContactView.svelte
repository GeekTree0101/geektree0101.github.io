<script>
    const snsItems = [
        {
            name: "@Facebook",
            url: "https://www.facebook.com/profile.php?id=100009249402427"
        }, {
            name: "@Medium",
            url: "https://medium.com/@h2s1880"
        }, {
            name: "@Gmail",
            url: "mailto:hyeonsu.ha@vingle.net"
        }, {
            name: "@Texture-Slack",
            url: "https://asyncdisplaykit.slack.com/"
        }
    ];

    function openURL(urlString) {
        window.open(urlString)
    }
</script>

<div id="contact-node" data-aos="zoom-in" data-aos-duration="500">
    {#each snsItems as sns}
        <p id="sns-tag" on:click={() => openURL(sns.url)}>{sns.name}</p>
    {/each}
</div>

<style>
    #contact-node {
        background: clear;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        margin: 0 10vw 20vw;
        font-size: 140%;
        font-weight: 500;
    }
    #contact-node #sns-tag {
        margin: 2vw;
        color: rgba(68, 68, 68, 0.8);
        -webkit-transition: font-size 1.5s;
        /* Safari */
        transition: font-size 1.5s;
        -webkit-transition: color 0.5s;
        /* Safari */
        transition: color 0.5s;
    }
    #contact-node #sns-tag:hover {
        margin: 2vw;
        color: rgba(120, 188, 128, 1);
        font-size: 145%;
    }
</style>