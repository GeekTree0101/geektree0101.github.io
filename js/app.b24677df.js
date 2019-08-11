(function(e) {
  function t(t) {
    for (
      var r, a, c = t[0], s = t[1], u = t[2], d = 0, m = [];
      d < c.length;
      d++
    )
      (a = c[d]), n[a] && m.push(n[a][0]), (n[a] = 0);
    for (r in s) Object.prototype.hasOwnProperty.call(s, r) && (e[r] = s[r]);
    l && l(t);
    while (m.length) m.shift()();
    return o.push.apply(o, u || []), i();
  }
  function i() {
    for (var e, t = 0; t < o.length; t++) {
      for (var i = o[t], r = !0, c = 1; c < i.length; c++) {
        var s = i[c];
        0 !== n[s] && (r = !1);
      }
      r && (o.splice(t--, 1), (e = a((a.s = i[0]))));
    }
    return e;
  }
  var r = {},
    n = { app: 0 },
    o = [];
  function a(t) {
    if (r[t]) return r[t].exports;
    var i = (r[t] = { i: t, l: !1, exports: {} });
    return e[t].call(i.exports, i, i.exports, a), (i.l = !0), i.exports;
  }
  (a.m = e),
    (a.c = r),
    (a.d = function(e, t, i) {
      a.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (a.r = function(e) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (a.t = function(e, t) {
      if ((1 & t && (e = a(e)), 8 & t)) return e;
      if (4 & t && "object" === typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (a.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          a.d(
            i,
            r,
            function(t) {
              return e[t];
            }.bind(null, r)
          );
      return i;
    }),
    (a.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e["default"];
            }
          : function() {
              return e;
            };
      return a.d(t, "a", t), t;
    }),
    (a.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (a.p = "/");
  var c = (window["webpackJsonp"] = window["webpackJsonp"] || []),
    s = c.push.bind(c);
  (c.push = t), (c = c.slice());
  for (var u = 0; u < c.length; u++) t(c[u]);
  var l = s;
  o.push([0, "chunk-vendors"]), i();
})({
  0: function(e, t, i) {
    e.exports = i("56d7");
  },
  "01d2": function(e, t, i) {},
  "034f": function(e, t, i) {
    "use strict";
    var r = i("64a9"),
      n = i.n(r);
    n.a;
  },
  2326: function(e, t, i) {
    "use strict";
    var r = i("7ead"),
      n = i.n(r);
    n.a;
  },
  4724: function(e, t, i) {},
  "56d7": function(e, t, i) {
    "use strict";
    i.r(t);
    i("cadf"), i("551c"), i("f751"), i("097d");
    var r = i("2b0e"),
      n = function() {
        var e = this,
          t = e.$createElement,
          i = e._self._c || t;
        return i(
          "div",
          { attrs: { id: "app" } },
          [
            i("Banner"),
            i("SectionHeader", { attrs: { title: "About Geektree0101" } }),
            i("InterestSection"),
            i("SectionHeader", { attrs: { title: "Personal Project" } }),
            i("Article", { attrs: { streams: e.personalProjects } }),
            i("SectionHeader", { attrs: { title: "Business Project" } }),
            i("Article", { attrs: { streams: e.businessProjects } }),
            i("SectionHeader", { attrs: { title: "International Activity" } }),
            i("Article", { attrs: { streams: e.internationalActivities } }),
            i("SectionHeader", { attrs: { title: "Contact Me" } }),
            i("ContactNode")
          ],
          1
        );
      },
      o = [],
      a = function() {
        var e = this,
          t = e.$createElement,
          i = e._self._c || t;
        return i(
          "div",
          { attrs: { id: "article-container" } },
          e._l(e.items, function(e) {
            return i(
              "div",
              { key: e },
              [
                i("ArticleNode", {
                  attrs: {
                    title: e.title,
                    desc: e.desc,
                    preview: e.preview,
                    source: e.source
                  }
                })
              ],
              1
            );
          }),
          0
        );
      },
      c = [],
      s = function() {
        var e = this,
          t = e.$createElement,
          i = e._self._c || t;
        return i(
          "div",
          {
            attrs: {
              id: "article-node",
              "data-aos": "fade-up",
              "data-aos-duration": "500"
            },
            on: {
              click: function(t) {
                return e.openURL(e.source);
              }
            }
          },
          [
            i("img", { attrs: { src: e.preview } }),
            i("h1", [e._v(e._s(e.title))]),
            i("p", [e._v(e._s(e.desc))])
          ]
        );
      },
      u = [],
      l = {
        name: "ArticleNode",
        props: ["title", "desc", "preview", "source"],
        methods: {
          openURL: function(e) {
            window.open(e);
          }
        }
      },
      d = l,
      m = (i("2326"), i("2877")),
      p = Object(m["a"])(d, s, u, !1, null, null, null),
      f = p.exports,
      h = {
        name: "ArticleContainer",
        components: { ArticleNode: f },
        props: {
          streams: {
            title: String,
            desc: String,
            preview: String,
            source: String
          }
        },
        data: function() {
          return { items: this.streams };
        }
      },
      g = h,
      v = (i("5ea0"), Object(m["a"])(g, a, c, !1, null, null, null)),
      w = v.exports,
      b = function() {
        var e = this,
          t = e.$createElement;
        e._self._c;
        return e._m(0);
      },
      x = [
        function() {
          var e = this,
            t = e.$createElement,
            i = e._self._c || t;
          return i("div", { attrs: { id: "banner-container" } }, [
            i("div", { attrs: { id: "banner-profile" } }, [
              i("img", {
                attrs: {
                  src:
                    "https://avatars1.githubusercontent.com/u/19504988?s=460&v=4"
                }
              })
            ]),
            i("div", { attrs: { id: "banner-content" } }, [
              i("h1", [e._v(" GEEKTREE0101 ")]),
              i("p", [e._v(" iOS Developer @당근마켓 ")])
            ])
          ]);
        }
      ],
      y = { name: "BannerContainer", components: {} },
      T = y,
      k = (i("8de4"), Object(m["a"])(T, b, x, !1, null, null, null)),
      S = k.exports,
      A = function() {
        var e = this,
          t = e.$createElement,
          i = e._self._c || t;
        return i("div", { attrs: { id: "section-header" } }, [
          i("p", [e._v("- " + e._s(e.title) + " -")])
        ]);
      },
      C = [],
      _ = { name: "SectionHeader", props: ["title"] },
      B = _,
      R = (i("6569"), Object(m["a"])(B, A, C, !1, null, null, null)),
      E = R.exports,
      O = function() {
        var e = this,
          t = e.$createElement,
          i = e._self._c || t;
        return i(
          "div",
          {
            attrs: {
              id: "interest-section",
              "data-aos": "zoom-in",
              "data-aos-duration": "500"
            }
          },
          [
            i("p", { attrs: { id: "bio" } }, [e._v(e._s(e.bio))]),
            i(
              "div",
              { attrs: { id: "interest-container" } },
              e._l(e.interests, function(t) {
                return i(
                  "div",
                  {
                    key: t,
                    attrs: { "data-aos": "zoom-in", "data-aos-duration": "500" }
                  },
                  [
                    i(
                      "p",
                      {
                        attrs: { id: "interest-tag" },
                        on: {
                          click: function(i) {
                            return e.openURL(t.url);
                          }
                        }
                      },
                      [e._v(e._s(t.name))]
                    )
                  ]
                );
              }),
              0
            )
          ]
        );
      },
      j = [],
      P = {
        name: "InterestSection",
        data: function() {
          return {
            bio:
              "I luv to work with code. and I luv to create everythings which attract people’s interest.",
            interests: [
              {
                name: "#Texture(AsyncDisplayKit)",
                url: "http://texturegroup.org/"
              },
              { name: "#RxSwift", url: "https://community.rxswift.org/" },
              { name: "#iOS", url: "https://www.apple.com/" },
              { name: "#Vue.js", url: "https://vuejs.org/" },
              { name: "#Flask", url: "http://flask.pocoo.org/" },
              { name: "#PlatformIO", url: "https://platformio.org/" },
              { name: "#IoT", url: null },
              { name: "#Vingle", url: "https://www.vingle.net/" }
            ]
          };
        },
        methods: {
          openURL: function(e) {
            null != e && window.open(e);
          }
        }
      },
      V = P,
      K = (i("da16"), Object(m["a"])(V, O, j, !1, null, null, null)),
      I = K.exports,
      D = function() {
        var e = this,
          t = e.$createElement,
          i = e._self._c || t;
        return i(
          "div",
          {
            attrs: {
              id: "contact-node",
              "data-aos": "zoom-in",
              "data-aos-duration": "500"
            }
          },
          e._l(e.snss, function(t) {
            return i(
              "div",
              {
                key: t,
                attrs: { "data-aos": "zoom-in", "data-aos-duration": "500" }
              },
              [
                i(
                  "p",
                  {
                    attrs: { id: "sns-tag" },
                    on: {
                      click: function(i) {
                        return e.openURL(t.url);
                      }
                    }
                  },
                  [e._v(e._s(t.name))]
                )
              ]
            );
          }),
          0
        );
      },
      M = [],
      N = {
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
              {
                name: "@Texture-Slack",
                url: "https://asyncdisplaykit.slack.com/"
              }
            ]
          };
        },
        methods: {
          openURL: function(e) {
            null != e && window.open(e);
          }
        }
      },
      U = N,
      L = (i("6127"), Object(m["a"])(U, D, M, !1, null, null, null)),
      H = L.exports,
      G = {
        name: "App",
        components: {
          Banner: S,
          Article: w,
          SectionHeader: E,
          InterestSection: I,
          ContactNode: H
        },
        data: function() {
          return {
            internationalActivities: [
              {
                title: "Vingle Tech-Talk 4th",
                desc:
                  "Improvement feed performance with Texture(AsyncDisplayKit)",
                preview:
                  "https://camo.githubusercontent.com/ff9216f73198087aef6ff2c4e92e0a764115764b/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6669742f632f3132302f3132302f312a70546857746e6e4a47643576626e794e497a5f2d45772e6a706567",
                source: "https://medium.com/vingle-tech-blog"
              },
              {
                title: "Let us: GO Conferrence",
                desc: "How to make Texture Reactive Wrapper",
                preview:
                  "https://camo.githubusercontent.com/6dc9e5049a7df5cd089701909a9f82d44f2df8ad/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a4e6f4a49796f766a315f595f6f6c4e677176303675672e706e67",
                source: "https://youtu.be/cnW2B019_2w"
              },
              {
                title: "MIRO (KNU Robot science group)",
                desc: "MIRO Tech Leader",
                preview:
                  "https://avatars3.githubusercontent.com/u/23741283?s=200&v=4",
                source: "https://github.com/KNU-MIRO"
              },
              {
                title: "2016 GIF Internet of Things Challenge",
                desc: "Busking Cloud",
                preview:
                  "http://see.knu.ac.kr/UPDIR/gt_board/20170105092709873.jpg",
                source:
                  "http://see.knu.ac.kr/content/board/news.html?pg=vv&fidx=91962&gtid=bodo&opt=f_subject&sword=%EB%AF%B8%EB%A1%9C&page=1"
              },
              {
                title: "2016 MAKERS",
                desc: "Gyeongsang-buk-do Univ Robot Union Club",
                preview:
                  "https://camo.githubusercontent.com/48f13cdb292637662d9e3a2adf2940ed4edf8f00/68747470733a2f2f73636f6e74656e742d69636e312d312e78782e666263646e2e6e65742f762f74312e302d312f6333392e302e3438302e3438302f70343830783438302f31323239353233365f3637313930353537363238343830325f3135393735303230383838313139343939335f6e2e706e673f5f6e635f6361743d313037266f683d3065366261646636643238383730346666386464653831316361623532396237266f653d3543353539363841",
                source:
                  "https://www.facebook.com/youaremakers/?eid=ARC4rV25RXcQifwRDvSBjNUJCE8tAp_msyjY1yPBOTOCkGplIoKoyM1KOXALRyx1u3yyIgCZuK1kSeqO"
              },
              {
                title: "2015 SKT NDSN Conference",
                desc: "2015 SKT National Disaster Safety Network Conference",
                preview:
                  "http://see.knu.ac.kr/UPDIR/gt_board/middle/20151007111826517.jpg",
                source:
                  "http://see.knu.ac.kr/content/board/news.html?pg=vv&fidx=80290&gtid=bodo&opt=f_subject&sword=%EB%AF%B8%EB%A1%9C&page=1"
              }
            ],
            personalProjects: [
              {
                title: "Hello Bazel!",
                desc: "SDL Cube Example x Bazel",
                preview:
                  "https://cdn-images-1.medium.com/max/1600/1*09HtddPsqzV-CfUKBxMIVw.png",
                source: "https://medium.com/@h2s1880/hello-bazel-db5d237e204c"
              },
              {
                title: "Buck으로 iOS앱 빌드해보자!",
                desc: "Buck is a build system developed and used by Facebook.",
                preview:
                  "https://cdn-images-1.medium.com/max/1600/0*gYLTNTOEKBH0J_at",
                source:
                  "https://medium.com/@h2s1880/buck%EC%9C%BC%EB%A1%9C-ios%EC%95%B1-%EB%B9%8C%EB%93%9C%ED%95%B4%EB%B3%B4%EC%9E%90-d811ad541416?fbclid=IwAR2w31ca8OvnerlUdhy57fO2onPngyjSvxCv2B2sJWVSBcPJRBpnhejomE4"
              },
              {
                title: "Vetty (Reactive Model Provider)",
                desc:
                  "Very easy commit & read & mutation mechanism about all of model, Reactive Model Provider built on RxSwift",
                preview:
                  "https://cdn-images-1.medium.com/max/1600/1*HQzYhDJwiqyvTSymv5fTrg.gif",
                source:
                  "https://medium.com/@h2s1880/oh-vetty-vam-da-lam-reactive-model-provider-9c622e499d2a"
              },
              {
                title: "RxMVVM-Texture",
                desc:
                  "iOS MVVM archtecture pattern built on Texture(AsyncDisplayKit)",
                preview:
                  "https://github.com/GeekTree0101/RxMVVM-Texture/raw/master/resource/resource1.png",
                source: "https://github.com/GeekTree0101/RxMVVM-Texture"
              },
              {
                title: "RxCocoa-Texture",
                desc:
                  "Texture(AsyncDisplayKit) Reactive Wrapper built on RxCocoa",
                preview:
                  "https://github.com/GeekTree0101/RxCocoa-Texture/raw/master/resources/logo.png",
                source: "https://github.com/GeekTree0101/RxCocoa-Texture"
              },
              {
                title: "Texture Best Practice",
                desc:
                  "Texture(AsyncDisplayKit) Reactive Wrapper built on RxCocoa",
                preview:
                  "https://cdn-images-1.medium.com/max/1600/1*IJLH2VMJTa298r1TiITSMA.png",
                source:
                  "https://medium.com/vingle-tech-blog/texture-best-practice-1f0ba1a9d903"
              },
              {
                title: "Pull to refresh with Texture",
                desc:
                  "Let’s make an iOS Google Chrome Pull to refresh with Texture",
                preview:
                  "https://cdn-images-1.medium.com/max/1600/1*1DHz4zfJlbRSjyObGciImA.gif",
                source:
                  "https://medium.com/@h2s1880/lets-make-an-ios-google-chrome-pull-to-refresh-with-texture-6770b620a6b6"
              },
              {
                title: "Floating UISearchBar with Texture",
                desc:
                  "Floating UISearchBar best practice with Texture(AsyncDisplayKit)",
                preview:
                  "https://cdn-images-1.medium.com/max/1200/1*KkINKRDy9dDqDQw2TUyN0g.gif",
                source:
                  "https://medium.com/@h2s1880/floating-uisearchbar-best-practice-with-texture-asyncdisplaykit-9978a662982d"
              },
              {
                title: "Tracking Visible Cell with Texture",
                desc: "Let’s Tracking Visible Cell on ScrollView",
                preview:
                  "https://cdn-images-1.medium.com/max/1600/1*8tPd5AAWctiPm9P07Mn6Wg.gif",
                source:
                  "https://medium.com/@h2s1880/ios-lets-tracking-visible-cell-on-scrollview-7f40922f1165"
              },
              {
                title: "Bouncing Table HeaderView with Texture",
                desc: "How to make Bouncing Table HeaderView with Texture?",
                preview:
                  "https://cdn-images-1.medium.com/max/1200/1*COQcKhtNUWZpsrajD88mtA.gif",
                source:
                  "https://medium.com/@h2s1880/how-to-make-bouncing-table-headerview-with-texture-94a95c216666"
              },
              {
                title: "Chat Application with Texture",
                desc: "How to pre-append ASCellNode like a Chat Application",
                preview:
                  "https://cdn-images-1.medium.com/max/1200/1*qAfL9DqKdLSzUVTTyhdXcg.gif",
                source:
                  "https://medium.com/@h2s1880/how-to-pre-append-ascellnode-like-a-chat-application-23b35d39b6cb"
              },
              {
                title: "Tic Toc! ASTimeStampNode",
                desc: "How to make time stamp text UI with Texture",
                preview:
                  "https://cdn-images-1.medium.com/max/2000/1*8Mji-ra60rD0mbmbyjA4-g.gif",
                source:
                  "https://medium.com/@h2s1880/tic-toc-tic-toc-astimestampnode-e29d8ae66371"
              }
            ],
            businessProjects: [
              {
                title: "Vingle Texture Style guide",
                desc:
                  "We hope anybody who loves iOS and Texture find this guide helpful!",
                preview:
                  "https://cdn-images-1.medium.com/max/1600/1*bLxgJzoG5ktMJ5ZLSNgu5A.png",
                source:
                  "https://medium.com/vingle-tech-blog/vingle-texture-style-guide-2caf8c13322f"
              },
              {
                title: "VEditorKit",
                desc: "Lightweight and Powerful Editor Kit",
                preview:
                  "https://cdn-images-1.medium.com/max/400/1*9ytvYQ-cRnh7P7FJYxKoYQ.gif",
                source: "https://github.com/GeekTree0101/VEditorKit"
              },
              {
                title: "Texture of business practice",
                desc: "Texture를 실제 현업에서 잘 사용하는 법!",
                preview:
                  "https://cdn-images-1.medium.com/max/1200/1*r_CdNRroBn5NKiJoCUQqZw.gif",
                source:
                  "https://medium.com/vingle-tech-blog/texture-%ED%98%84%EC%97%85-%EC%82%AC%EC%9A%A9%EA%B0%80%EC%9D%B4%EB%93%9C-98865bd6a38"
              },
              {
                title: "Vingle Talk (Chat)",
                desc: "Texture(AsyncDisplayKit), AFNetworking, RxSwift, Lottie",
                preview:
                  "https://cdn-images-1.medium.com/max/1200/1*qAfL9DqKdLSzUVTTyhdXcg.gif",
                source:
                  "https://medium.com/@h2s1880/how-to-pre-append-ascellnode-like-a-chat-application-23b35d39b6cb"
              },
              {
                title: "Re-architecting Vingle Feed (NewsFeed)",
                desc: "Texture(AsyncDisplayKit), AFNetworking, RxSwift",
                preview:
                  "https://cdn-images-1.medium.com/max/1600/1*Z59rWsx0vBeGC_yUx-wIEg.png",
                source:
                  "https://medium.com/vingle-tech-blog/improvement-feed-performance-with-texture-asyncdisplaykit-2ef2ee11f06e"
              }
            ]
          };
        }
      },
      z = G,
      J = (i("034f"), Object(m["a"])(z, n, o, !1, null, null, null)),
      F = J.exports;
    new r["a"]({
      mounted: function() {
        AOS.init();
      },
      render: function(e) {
        return e(F);
      }
    }).$mount("#app");
  },
  "5a75": function(e, t, i) {},
  "5ea0": function(e, t, i) {
    "use strict";
    var r = i("4724"),
      n = i.n(r);
    n.a;
  },
  6127: function(e, t, i) {
    "use strict";
    var r = i("5a75"),
      n = i.n(r);
    n.a;
  },
  "64a9": function(e, t, i) {},
  6569: function(e, t, i) {
    "use strict";
    var r = i("b058"),
      n = i.n(r);
    n.a;
  },
  "7ead": function(e, t, i) {},
  "8de4": function(e, t, i) {
    "use strict";
    var r = i("d52d"),
      n = i.n(r);
    n.a;
  },
  b058: function(e, t, i) {},
  d52d: function(e, t, i) {},
  da16: function(e, t, i) {
    "use strict";
    var r = i("01d2"),
      n = i.n(r);
    n.a;
  }
});
//# sourceMappingURL=app.b24677df.js.map
