
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    const seen_callbacks = new Set();
    function flush() {
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.18.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /* src/Components/BannerView.svelte generated by Svelte v3.18.1 */

    const file = "src/Components/BannerView.svelte";

    function create_fragment(ctx) {
    	let div2;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div1;
    	let h1;
    	let t2;
    	let p;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "GEEKTREE0101";
    			t2 = space();
    			p = element("p");
    			p.textContent = "iOS Developer @Daangn Market(Karrot)";
    			if (img.src !== (img_src_value = "https://avatars1.githubusercontent.com/u/19504988?s=460&v=4")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "profile_image");
    			attr_dev(img, "class", "svelte-1nla25l");
    			add_location(img, file, 4, 8, 85);
    			attr_dev(div0, "id", "banner-profile");
    			attr_dev(div0, "class", "svelte-1nla25l");
    			add_location(div0, file, 3, 4, 51);
    			attr_dev(h1, "class", "svelte-1nla25l");
    			add_location(h1, file, 9, 8, 251);
    			attr_dev(p, "class", "svelte-1nla25l");
    			add_location(p, file, 10, 8, 281);
    			attr_dev(div1, "id", "banner-content");
    			attr_dev(div1, "class", "svelte-1nla25l");
    			add_location(div1, file, 8, 4, 217);
    			attr_dev(div2, "id", "banner-container");
    			attr_dev(div2, "class", "svelte-1nla25l");
    			add_location(div2, file, 2, 0, 19);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, img);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(div1, t2);
    			append_dev(div1, p);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class BannerView extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BannerView",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src/Components/InterestSectionView.svelte generated by Svelte v3.18.1 */

    const file$1 = "src/Components/InterestSectionView.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (46:8) {#each interests as interest}
    function create_each_block(ctx) {
    	let p;
    	let t_value = /*interest*/ ctx[3].name + "";
    	let t;
    	let dispose;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[2](/*interest*/ ctx[3], ...args);
    	}

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "id", "interest-tag");
    			attr_dev(p, "class", "svelte-164inq");
    			add_location(p, file$1, 46, 12, 1341);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    			dispose = listen_dev(p, "click", click_handler, false, false, false);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*interests*/ 2 && t_value !== (t_value = /*interest*/ ctx[3].name + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(46:8) {#each interests as interest}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div1;
    	let p;
    	let t0;
    	let t1;
    	let div0;
    	let each_value = /*interests*/ ctx[1];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			p = element("p");
    			t0 = text(/*bio*/ ctx[0]);
    			t1 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(p, "id", "bio");
    			attr_dev(p, "class", "svelte-164inq");
    			add_location(p, file$1, 43, 4, 1192);
    			attr_dev(div0, "id", "interest-container");
    			attr_dev(div0, "data-aos", "zoom-in");
    			attr_dev(div0, "data-aos-duration", "500");
    			attr_dev(div0, "class", "svelte-164inq");
    			add_location(div0, file$1, 44, 4, 1218);
    			attr_dev(div1, "id", "interest-section");
    			attr_dev(div1, "data-aos", "zoom-in");
    			attr_dev(div1, "data-aos-duration", "500");
    			attr_dev(div1, "class", "svelte-164inq");
    			add_location(div1, file$1, 42, 0, 1117);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, p);
    			append_dev(p, t0);
    			append_dev(div1, t1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*bio*/ 1) set_data_dev(t0, /*bio*/ ctx[0]);

    			if (dirty & /*didTapInterestTag, interests*/ 2) {
    				each_value = /*interests*/ ctx[1];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function didTapInterestTag(urlString) {
    	window.open(urlString);
    }

    function instance($$self, $$props, $$invalidate) {
    	let { bio = "I luv to work with code. and I luv to create everythings which attract people’" + "s interest." } = $$props;

    	let { interests = [
    		{
    			name: "#Texture(AsyncDisplayKit)",
    			url: "http://texturegroup.org/"
    		},
    		{
    			name: "#RxSwift",
    			url: "https://community.rxswift.org/"
    		},
    		{
    			name: "#iOS",
    			url: "https://www.apple.com/"
    		},
    		{
    			name: "#Vue.js",
    			url: "https://vuejs.org/"
    		},
    		{
    			name: "#Flask",
    			url: "http://flask.pocoo.org/"
    		},
    		{
    			name: "#PlatformIO",
    			url: "https://platformio.org/"
    		},
    		{ name: "#IoT", url: null },
    		{
    			name: "#Vingle",
    			url: "https://www.vingle.net/"
    		},
    		{
    			name: "#당근마켓",
    			url: "https://www.daangn.com/"
    		},
    		{
    			name: "#Svelte",
    			url: "https://svelte.dev/"
    		}
    	] } = $$props;

    	const writable_props = ["bio", "interests"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<InterestSectionView> was created with unknown prop '${key}'`);
    	});

    	const click_handler = interest => didTapInterestTag(interest.url);

    	$$self.$set = $$props => {
    		if ("bio" in $$props) $$invalidate(0, bio = $$props.bio);
    		if ("interests" in $$props) $$invalidate(1, interests = $$props.interests);
    	};

    	$$self.$capture_state = () => {
    		return { bio, interests };
    	};

    	$$self.$inject_state = $$props => {
    		if ("bio" in $$props) $$invalidate(0, bio = $$props.bio);
    		if ("interests" in $$props) $$invalidate(1, interests = $$props.interests);
    	};

    	return [bio, interests, click_handler];
    }

    class InterestSectionView extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment$1, safe_not_equal, { bio: 0, interests: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "InterestSectionView",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get bio() {
    		throw new Error("<InterestSectionView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bio(value) {
    		throw new Error("<InterestSectionView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get interests() {
    		throw new Error("<InterestSectionView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set interests(value) {
    		throw new Error("<InterestSectionView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/ArticleView.svelte generated by Svelte v3.18.1 */

    const file$2 = "src/Components/ArticleView.svelte";

    function create_fragment$2(ctx) {
    	let div1;
    	let img;
    	let img_src_value;
    	let t0;
    	let div0;
    	let h1;
    	let t1_value = /*viewModel*/ ctx[0].title + "";
    	let t1;
    	let t2;
    	let p;
    	let t3_value = /*viewModel*/ ctx[0].desc + "";
    	let t3;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			img = element("img");
    			t0 = space();
    			div0 = element("div");
    			h1 = element("h1");
    			t1 = text(t1_value);
    			t2 = space();
    			p = element("p");
    			t3 = text(t3_value);
    			if (img.src !== (img_src_value = /*viewModel*/ ctx[0].preview)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-tybs96");
    			add_location(img, file$2, 19, 4, 364);
    			attr_dev(h1, "class", "svelte-tybs96");
    			add_location(h1, file$2, 21, 6, 445);
    			attr_dev(p, "class", "svelte-tybs96");
    			add_location(p, file$2, 22, 6, 478);
    			attr_dev(div0, "id", "article-node-content");
    			attr_dev(div0, "class", "svelte-tybs96");
    			add_location(div0, file$2, 20, 4, 407);
    			attr_dev(div1, "id", "article-node");
    			attr_dev(div1, "data-aos", "fade-up");
    			attr_dev(div1, "data-aos-duration", "500");
    			attr_dev(div1, "class", "svelte-tybs96");
    			add_location(div1, file$2, 14, 0, 228);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, img);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(h1, t1);
    			append_dev(div0, t2);
    			append_dev(div0, p);
    			append_dev(p, t3);
    			dispose = listen_dev(div1, "click", /*click_handler*/ ctx[1], false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*viewModel*/ 1 && img.src !== (img_src_value = /*viewModel*/ ctx[0].preview)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*viewModel*/ 1 && t1_value !== (t1_value = /*viewModel*/ ctx[0].title + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*viewModel*/ 1 && t3_value !== (t3_value = /*viewModel*/ ctx[0].desc + "")) set_data_dev(t3, t3_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function didTapArticle(sourceURLString) {
    	window.open(sourceURLString);
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { viewModel = {
    		title: "-",
    		desc: "-",
    		preview: "-",
    		source: "-"
    	} } = $$props;

    	const writable_props = ["viewModel"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ArticleView> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => didTapArticle(viewModel.source);

    	$$self.$set = $$props => {
    		if ("viewModel" in $$props) $$invalidate(0, viewModel = $$props.viewModel);
    	};

    	$$self.$capture_state = () => {
    		return { viewModel };
    	};

    	$$self.$inject_state = $$props => {
    		if ("viewModel" in $$props) $$invalidate(0, viewModel = $$props.viewModel);
    	};

    	return [viewModel, click_handler];
    }

    class ArticleView extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$2, safe_not_equal, { viewModel: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ArticleView",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get viewModel() {
    		throw new Error("<ArticleView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set viewModel(value) {
    		throw new Error("<ArticleView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/ArticleGroupView.svelte generated by Svelte v3.18.1 */
    const file$3 = "src/Components/ArticleGroupView.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (8:4) {#each itemViewModels as itemViewModel}
    function create_each_block$1(ctx) {
    	let current;

    	const articleview = new ArticleView({
    			props: { viewModel: /*itemViewModel*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(articleview.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(articleview, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const articleview_changes = {};
    			if (dirty & /*itemViewModels*/ 1) articleview_changes.viewModel = /*itemViewModel*/ ctx[1];
    			articleview.$set(articleview_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(articleview.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(articleview.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(articleview, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(8:4) {#each itemViewModels as itemViewModel}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let current;
    	let each_value = /*itemViewModels*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "id", "article-container");
    			attr_dev(div, "class", "svelte-1k01457");
    			add_location(div, file$3, 6, 0, 103);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*itemViewModels*/ 1) {
    				each_value = /*itemViewModels*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	var { itemViewModels } = $$props;
    	const writable_props = ["itemViewModels"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ArticleGroupView> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("itemViewModels" in $$props) $$invalidate(0, itemViewModels = $$props.itemViewModels);
    	};

    	$$self.$capture_state = () => {
    		return { itemViewModels };
    	};

    	$$self.$inject_state = $$props => {
    		if ("itemViewModels" in $$props) $$invalidate(0, itemViewModels = $$props.itemViewModels);
    	};

    	return [itemViewModels];
    }

    class ArticleGroupView extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$3, safe_not_equal, { itemViewModels: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ArticleGroupView",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*itemViewModels*/ ctx[0] === undefined && !("itemViewModels" in props)) {
    			console.warn("<ArticleGroupView> was created without expected prop 'itemViewModels'");
    		}
    	}

    	get itemViewModels() {
    		throw new Error("<ArticleGroupView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set itemViewModels(value) {
    		throw new Error("<ArticleGroupView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/SectionHeaderView.svelte generated by Svelte v3.18.1 */

    const file$4 = "src/Components/SectionHeaderView.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let p;
    	let t0;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t0 = text("- ");
    			t1 = text(/*title*/ ctx[0]);
    			t2 = text(" -");
    			add_location(p, file$4, 5, 4, 72);
    			attr_dev(div, "id", "section-header");
    			attr_dev(div, "class", "svelte-snasc2");
    			add_location(div, file$4, 4, 0, 42);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t1, /*title*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { title } = $$props;
    	const writable_props = ["title"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SectionHeaderView> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    	};

    	$$self.$capture_state = () => {
    		return { title };
    	};

    	$$self.$inject_state = $$props => {
    		if ("title" in $$props) $$invalidate(0, title = $$props.title);
    	};

    	return [title];
    }

    class SectionHeaderView extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$4, safe_not_equal, { title: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SectionHeaderView",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !("title" in props)) {
    			console.warn("<SectionHeaderView> was created without expected prop 'title'");
    		}
    	}

    	get title() {
    		throw new Error("<SectionHeaderView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<SectionHeaderView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/ContactView.svelte generated by Svelte v3.18.1 */

    const file$5 = "src/Components/ContactView.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (24:4) {#each snsItems as sns}
    function create_each_block$2(ctx) {
    	let p;
    	let t_value = /*sns*/ ctx[2].name + "";
    	let t;
    	let dispose;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[1](/*sns*/ ctx[2], ...args);
    	}

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "id", "sns-tag");
    			attr_dev(p, "class", "svelte-ezhk2b");
    			add_location(p, file$5, 24, 8, 632);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    			dispose = listen_dev(p, "click", click_handler, false, false, false);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(24:4) {#each snsItems as sns}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div;
    	let each_value = /*snsItems*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "id", "contact-node");
    			attr_dev(div, "data-aos", "zoom-in");
    			attr_dev(div, "data-aos-duration", "500");
    			attr_dev(div, "class", "svelte-ezhk2b");
    			add_location(div, file$5, 22, 0, 529);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*openURL, snsItems*/ 1) {
    				each_value = /*snsItems*/ ctx[0];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function openURL(urlString) {
    	window.open(urlString);
    }

    function instance$4($$self) {
    	const snsItems = [
    		{
    			name: "@Facebook",
    			url: "https://www.facebook.com/profile.php?id=100009249402427"
    		},
    		{
    			name: "@Medium",
    			url: "https://medium.com/@h2s1880"
    		},
    		{
    			name: "@Gmail",
    			url: "mailto:hyeonsu.ha@vingle.net"
    		},
    		{
    			name: "@Texture-Slack",
    			url: "https://asyncdisplaykit.slack.com/"
    		}
    	];

    	const click_handler = sns => openURL(sns.url);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		
    	};

    	return [snsItems, click_handler];
    }

    class ContactView extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContactView",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.18.1 */
    const file$6 = "src/App.svelte";

    function create_fragment$6(ctx) {
    	let main;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let t5;
    	let t6;
    	let t7;
    	let t8;
    	let current;
    	const bannerview = new BannerView({ $$inline: true });

    	const sectionheaderview0 = new SectionHeaderView({
    			props: { title: /*sectionConst*/ ctx[0].about },
    			$$inline: true
    		});

    	const interestsectionview = new InterestSectionView({ $$inline: true });

    	const sectionheaderview1 = new SectionHeaderView({
    			props: {
    				title: /*sectionConst*/ ctx[0].personalProject
    			},
    			$$inline: true
    		});

    	const articlegroupview0 = new ArticleGroupView({
    			props: {
    				itemViewModels: /*articles*/ ctx[1].personalProjects
    			},
    			$$inline: true
    		});

    	const sectionheaderview2 = new SectionHeaderView({
    			props: {
    				title: /*sectionConst*/ ctx[0].businessProject
    			},
    			$$inline: true
    		});

    	const articlegroupview1 = new ArticleGroupView({
    			props: {
    				itemViewModels: /*articles*/ ctx[1].businessProjects
    			},
    			$$inline: true
    		});

    	const sectionheaderview3 = new SectionHeaderView({
    			props: {
    				title: /*sectionConst*/ ctx[0].internationalActivity
    			},
    			$$inline: true
    		});

    	const articlegroupview2 = new ArticleGroupView({
    			props: {
    				itemViewModels: /*articles*/ ctx[1].internationalActivities
    			},
    			$$inline: true
    		});

    	const contactview = new ContactView({
    			props: { title: /*sectionConst*/ ctx[0].contact },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(bannerview.$$.fragment);
    			t0 = space();
    			create_component(sectionheaderview0.$$.fragment);
    			t1 = space();
    			create_component(interestsectionview.$$.fragment);
    			t2 = space();
    			create_component(sectionheaderview1.$$.fragment);
    			t3 = space();
    			create_component(articlegroupview0.$$.fragment);
    			t4 = space();
    			create_component(sectionheaderview2.$$.fragment);
    			t5 = space();
    			create_component(articlegroupview1.$$.fragment);
    			t6 = space();
    			create_component(sectionheaderview3.$$.fragment);
    			t7 = space();
    			create_component(articlegroupview2.$$.fragment);
    			t8 = space();
    			create_component(contactview.$$.fragment);
    			attr_dev(main, "class", "svelte-1577dks");
    			add_location(main, file$6, 173, 0, 10561);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(bannerview, main, null);
    			append_dev(main, t0);
    			mount_component(sectionheaderview0, main, null);
    			append_dev(main, t1);
    			mount_component(interestsectionview, main, null);
    			append_dev(main, t2);
    			mount_component(sectionheaderview1, main, null);
    			append_dev(main, t3);
    			mount_component(articlegroupview0, main, null);
    			append_dev(main, t4);
    			mount_component(sectionheaderview2, main, null);
    			append_dev(main, t5);
    			mount_component(articlegroupview1, main, null);
    			append_dev(main, t6);
    			mount_component(sectionheaderview3, main, null);
    			append_dev(main, t7);
    			mount_component(articlegroupview2, main, null);
    			append_dev(main, t8);
    			mount_component(contactview, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bannerview.$$.fragment, local);
    			transition_in(sectionheaderview0.$$.fragment, local);
    			transition_in(interestsectionview.$$.fragment, local);
    			transition_in(sectionheaderview1.$$.fragment, local);
    			transition_in(articlegroupview0.$$.fragment, local);
    			transition_in(sectionheaderview2.$$.fragment, local);
    			transition_in(articlegroupview1.$$.fragment, local);
    			transition_in(sectionheaderview3.$$.fragment, local);
    			transition_in(articlegroupview2.$$.fragment, local);
    			transition_in(contactview.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bannerview.$$.fragment, local);
    			transition_out(sectionheaderview0.$$.fragment, local);
    			transition_out(interestsectionview.$$.fragment, local);
    			transition_out(sectionheaderview1.$$.fragment, local);
    			transition_out(articlegroupview0.$$.fragment, local);
    			transition_out(sectionheaderview2.$$.fragment, local);
    			transition_out(articlegroupview1.$$.fragment, local);
    			transition_out(sectionheaderview3.$$.fragment, local);
    			transition_out(articlegroupview2.$$.fragment, local);
    			transition_out(contactview.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(bannerview);
    			destroy_component(sectionheaderview0);
    			destroy_component(interestsectionview);
    			destroy_component(sectionheaderview1);
    			destroy_component(articlegroupview0);
    			destroy_component(sectionheaderview2);
    			destroy_component(articlegroupview1);
    			destroy_component(sectionheaderview3);
    			destroy_component(articlegroupview2);
    			destroy_component(contactview);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self) {
    	const sectionConst = {
    		about: "About Geektree0101",
    		personalProject: "Personal Project",
    		businessProject: "Business Project",
    		internationalActivity: "International Activity",
    		contact: "Contact me"
    	};

    	const articles = {
    		personalProjects: [
    			{
    				title: "Hello Bazel!",
    				desc: "SDL Cube Example x Bazel",
    				preview: "https://cdn-images-1.medium.com/max/1600/1*09HtddPsqzV-CfUKBxMIVw.png",
    				source: "https://medium.com/@h2s1880/hello-bazel-db5d237e204c"
    			},
    			{
    				title: "Buck으로 iOS앱 빌드해보자!",
    				desc: "Buck is a build system developed and used by Facebook.",
    				preview: "https://cdn-images-1.medium.com/max/1600/0*gYLTNTOEKBH0J_at",
    				source: "https://medium.com/@h2s1880/buck%EC%9C%BC%EB%A1%9C-ios%EC%95%B1-%EB%B9%8C%EB%9" + "3%9C%ED%95%B4%EB%B3%B4%EC%9E%90-d811ad541416?fbclid=IwAR2w31ca8OvnerlUdhy57fO2" + "onPngyjSvxCv2B2sJWVSBcPJRBpnhejomE4"
    			},
    			{
    				title: "Vetty (Reactive Model Provider)",
    				desc: "Very easy commit & read & mutation mechanism about all of model, Reactive Mode" + "l Provider built on RxSwift",
    				preview: "https://cdn-images-1.medium.com/max/1600/1*HQzYhDJwiqyvTSymv5fTrg.gif",
    				source: "https://medium.com/@h2s1880/oh-vetty-vam-da-lam-reactive-model-provider-9c622e" + "499d2a"
    			},
    			{
    				title: "RxMVVM-Texture",
    				desc: "iOS MVVM archtecture pattern built on Texture(AsyncDisplayKit)",
    				preview: "https://github.com/GeekTree0101/RxMVVM-Texture/raw/master/resource/resource1.p" + "ng",
    				source: "https://github.com/GeekTree0101/RxMVVM-Texture"
    			},
    			{
    				title: "RxCocoa-Texture",
    				desc: "Texture(AsyncDisplayKit) Reactive Wrapper built on RxCocoa",
    				preview: "https://github.com/GeekTree0101/RxCocoa-Texture/raw/master/resources/logo.png",
    				source: "https://github.com/GeekTree0101/RxCocoa-Texture"
    			},
    			{
    				title: "Texture Best Practice",
    				desc: "Texture(AsyncDisplayKit) Reactive Wrapper built on RxCocoa",
    				preview: "https://cdn-images-1.medium.com/max/1600/1*IJLH2VMJTa298r1TiITSMA.png",
    				source: "https://medium.com/vingle-tech-blog/texture-best-practice-1f0ba1a9d903"
    			},
    			{
    				title: "Pull to refresh with Texture",
    				desc: "Let’s make an iOS Google Chrome Pull to refresh with Texture",
    				preview: "https://cdn-images-1.medium.com/max/1600/1*1DHz4zfJlbRSjyObGciImA.gif",
    				source: "https://medium.com/@h2s1880/lets-make-an-ios-google-chrome-pull-to-refresh-wit" + "h-texture-6770b620a6b6"
    			},
    			{
    				title: "Floating UISearchBar with Texture",
    				desc: "Floating UISearchBar best practice with Texture(AsyncDisplayKit)",
    				preview: "https://cdn-images-1.medium.com/max/1200/1*KkINKRDy9dDqDQw2TUyN0g.gif",
    				source: "https://medium.com/@h2s1880/floating-uisearchbar-best-practice-with-texture-as" + "yncdisplaykit-9978a662982d"
    			},
    			{
    				title: "Tracking Visible Cell with Texture",
    				desc: "Let’s Tracking Visible Cell on ScrollView",
    				preview: "https://cdn-images-1.medium.com/max/1600/1*8tPd5AAWctiPm9P07Mn6Wg.gif",
    				source: "https://medium.com/@h2s1880/ios-lets-tracking-visible-cell-on-scrollview-7f409" + "22f1165"
    			},
    			{
    				title: "Bouncing Table HeaderView with Texture",
    				desc: "How to make Bouncing Table HeaderView with Texture?",
    				preview: "https://cdn-images-1.medium.com/max/1200/1*COQcKhtNUWZpsrajD88mtA.gif",
    				source: "https://medium.com/@h2s1880/how-to-make-bouncing-table-headerview-with-texture" + "-94a95c216666"
    			},
    			{
    				title: "Chat Application with Texture",
    				desc: "How to pre-append ASCellNode like a Chat Application",
    				preview: "https://cdn-images-1.medium.com/max/1200/1*qAfL9DqKdLSzUVTTyhdXcg.gif",
    				source: "https://medium.com/@h2s1880/how-to-pre-append-ascellnode-like-a-chat-applicati" + "on-23b35d39b6cb"
    			},
    			{
    				title: "Tic Toc! ASTimeStampNode",
    				desc: "How to make time stamp text UI with Texture",
    				preview: "https://cdn-images-1.medium.com/max/2000/1*8Mji-ra60rD0mbmbyjA4-g.gif",
    				source: "https://medium.com/@h2s1880/tic-toc-tic-toc-astimestampnode-e29d8ae66371"
    			},
    			{
    				title: "ASCollectionNode #1",
    				desc: "How to use an AScollectionNode?",
    				preview: "https://miro.medium.com/max/5056/1*2Y6Efz4kXNRvznzrl6s4nQ.png",
    				source: "https://medium.com/@h2s1880/ascollectionnode-%EB%8B%A4%EB%A3%A8%EA%B8%B0-1-f4f55151102b"
    			}
    		],
    		businessProjects: [
    			{
    				title: "Vingle Texture Style guide",
    				desc: "We hope anybody who loves iOS and Texture find this guide helpful!",
    				preview: "https://cdn-images-1.medium.com/max/1600/1*bLxgJzoG5ktMJ5ZLSNgu5A.png",
    				source: "https://medium.com/vingle-tech-blog/vingle-texture-style-guide-2caf8c13322f"
    			},
    			{
    				title: "VEditorKit",
    				desc: "Lightweight and Powerful Editor Kit",
    				preview: "https://cdn-images-1.medium.com/max/400/1*9ytvYQ-cRnh7P7FJYxKoYQ.gif",
    				source: "https://github.com/GeekTree0101/VEditorKit"
    			},
    			{
    				title: "Texture of business practice",
    				desc: "Texture를 실제 현업에서 잘 사용하는 법!",
    				preview: "https://cdn-images-1.medium.com/max/1200/1*r_CdNRroBn5NKiJoCUQqZw.gif",
    				source: "https://medium.com/vingle-tech-blog/texture-%ED%98%84%EC%97%85-%EC%82%AC%EC%9A" + "%A9%EA%B0%80%EC%9D%B4%EB%93%9C-98865bd6a38"
    			},
    			{
    				title: "Vingle Talk (Chat)",
    				desc: "Texture(AsyncDisplayKit), AFNetworking, RxSwift, Lottie",
    				preview: "https://cdn-images-1.medium.com/max/1200/1*qAfL9DqKdLSzUVTTyhdXcg.gif",
    				source: "https://medium.com/@h2s1880/how-to-pre-append-ascellnode-like-a-chat-applicati" + "on-23b35d39b6cb"
    			},
    			{
    				title: "Re-architecting Vingle Feed (NewsFeed)",
    				desc: "Texture(AsyncDisplayKit), AFNetworking, RxSwift",
    				preview: "https://cdn-images-1.medium.com/max/1600/1*Z59rWsx0vBeGC_yUx-wIEg.png",
    				source: "https://medium.com/vingle-tech-blog/improvement-feed-performance-with-texture-" + "asyncdisplaykit-2ef2ee11f06e"
    			}
    		],
    		internationalActivities: [
    			{
    				title: "Vingle Tech-Talk 4th",
    				desc: "Improvement feed performance with Texture(AsyncDisplayKit)",
    				preview: "https://camo.githubusercontent.com/ff9216f73198087aef6ff2c4e92e0a764115764b/68" + "747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6669742f632f3132" + "302f3132302f312a70546857746e6e4a47643576626e794e497a5f2d45772e6a706567",
    				source: "https://medium.com/vingle-tech-blog"
    			},
    			{
    				title: "Let us: GO Conferrence",
    				desc: "How to make Texture Reactive Wrapper",
    				preview: "https://camo.githubusercontent.com/6dc9e5049a7df5cd089701909a9f82d44f2df8ad/68" + "747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f31363030" + "2f312a4e6f4a49796f766a315f595f6f6c4e677176303675672e706e67",
    				source: "https://youtu.be/cnW2B019_2w"
    			},
    			{
    				title: "MIRO (KNU Robot science group)",
    				desc: "MIRO Tech Leader",
    				preview: "https://avatars3.githubusercontent.com/u/23741283?s=200&v=4",
    				source: "https://github.com/KNU-MIRO"
    			},
    			{
    				title: "2016 GIF Internet of Things Challenge",
    				desc: "Busking Cloud",
    				preview: "http://see.knu.ac.kr/UPDIR/gt_board/20170105092709873.jpg",
    				source: "http://see.knu.ac.kr/content/board/news.html?pg=vv&fidx=91962&gtid=bodo&opt=f_" + "subject&sword=%EB%AF%B8%EB%A1%9C&page=1"
    			},
    			{
    				title: "2016 MAKERS",
    				desc: "Gyeongsang-buk-do Univ Robot Union Club",
    				preview: "https://camo.githubusercontent.com/48f13cdb292637662d9e3a2adf2940ed4edf8f00/68" + "747470733a2f2f73636f6e74656e742d69636e312d312e78782e666263646e2e6e65742f762f74" + "312e302d312f6333392e302e3438302e3438302f70343830783438302f31323239353233365f36" + "37313930353537363238343830325f3135393735303230383838313139343939335f6e2e706e67" + "3f5f6e635f6361743d313037266f683d3065366261646636643238383730346666386464653831" + "316361623532396237266f653d3543353539363841",
    				source: "https://www.facebook.com/youaremakers/?eid=ARC4rV25RXcQifwRDvSBjNUJCE8tAp_msyj" + "Y1yPBOTOCkGplIoKoyM1KOXALRyx1u3yyIgCZuK1kSeqO"
    			},
    			{
    				title: "2015 SKT NDSN Conference",
    				desc: "2015 SKT National Disaster Safety Network Conference",
    				preview: "http://see.knu.ac.kr/UPDIR/gt_board/middle/20151007111826517.jpg",
    				source: "http://see.knu.ac.kr/content/board/news.html?pg=vv&fidx=80290&gtid=bodo&opt=f_" + "subject&sword=%EB%AF%B8%EB%A1%9C&page=1"
    			}
    		]
    	};

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		
    	};

    	return [sectionConst, articles];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    const app = new App({
    	target: document.body
    });

    // 3rd-party
    AOS.init();

    return app;

}());
//# sourceMappingURL=bundle.js.map
