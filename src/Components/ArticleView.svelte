<script>

    export let viewModel = {
        title: "-",
        desc: "-",
        preview: "-",
        source: "-",
    }

    function didTapArticle() {
        window.open(source)
    }
</script>

<div
    id="article-node"
    data-aos="fade-up"
    data-aos-duration="500"
    on:click={didTapArticle}>
    <img src={viewModel.preview} />
    <h1>{viewModel.title}</h1>
    <p>{viewModel.desc}</p>
</div>

<style>

    #article-node {
        position: relative;
        background-color: rgb(245, 245, 245);
        width: 300px;
        flex-grow: 0;
        flex-shrink: 1;
        margin: 0 10px 20px;
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
        margin: 5px 15px 40px;
        color: gray;
    }

    #article-node:hover {
        opacity: 0.2;
    }
</style>