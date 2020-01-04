import App from './App.svelte';

const app = new App({
	target: document.body
});

// 3rd-party
AOS.init();

export default app;