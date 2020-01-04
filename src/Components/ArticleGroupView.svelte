<script>
    import ArticleView from "./ArticleView.svelte"

    export var itemViewModels;
</script>

<div id="article-container">
    {#each itemViewModels as itemViewModel}
        <ArticleView viewModel={itemViewModel}></ArticleView>
    {/each}
</div>

<style>

    #article-container {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        background: clear;
    }
</style>