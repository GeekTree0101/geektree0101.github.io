<script>
    import BannerView from "./Components/BannerView.svelte"
    import InterestSectionView from "./Components/InterestSectionView.svelte"
    import ArticleGroupView from "./Components/ArticleGroupView.svelte"
    import SectionHeaderView from "./Components/SectionHeaderView.svelte"
	import ContactView from "./Components/ContactView.svelte"

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
            }, {
                title: "Buck으로 iOS앱 빌드해보자!",
                desc: "Buck is a build system developed and used by Facebook.",
                preview: "https://cdn-images-1.medium.com/max/1600/0*gYLTNTOEKBH0J_at",
                source: "https://medium.com/@h2s1880/buck%EC%9C%BC%EB%A1%9C-ios%EC%95%B1-%EB%B9%8C%EB%9" +
                        "3%9C%ED%95%B4%EB%B3%B4%EC%9E%90-d811ad541416?fbclid=IwAR2w31ca8OvnerlUdhy57fO2" +
                        "onPngyjSvxCv2B2sJWVSBcPJRBpnhejomE4"
            }, {
                title: "Vetty (Reactive Model Provider)",
                desc: "Very easy commit & read & mutation mechanism about all of model, Reactive Mode" +
                        "l Provider built on RxSwift",
                preview: "https://cdn-images-1.medium.com/max/1600/1*HQzYhDJwiqyvTSymv5fTrg.gif",
                source: "https://medium.com/@h2s1880/oh-vetty-vam-da-lam-reactive-model-provider-9c622e" +
                        "499d2a"
            }, {
                title: "RxMVVM-Texture",
                desc: "iOS MVVM archtecture pattern built on Texture(AsyncDisplayKit)",
                preview: "https://github.com/GeekTree0101/RxMVVM-Texture/raw/master/resource/resource1.p" +
                        "ng",
                source: "https://github.com/GeekTree0101/RxMVVM-Texture"
            }, {
                title: "RxCocoa-Texture",
                desc: "Texture(AsyncDisplayKit) Reactive Wrapper built on RxCocoa",
                preview: "https://github.com/GeekTree0101/RxCocoa-Texture/raw/master/resources/logo.png",
                source: "https://github.com/GeekTree0101/RxCocoa-Texture"
            }, {
                title: "Texture Best Practice",
                desc: "Texture(AsyncDisplayKit) Reactive Wrapper built on RxCocoa",
                preview: "https://cdn-images-1.medium.com/max/1600/1*IJLH2VMJTa298r1TiITSMA.png",
                source: "https://medium.com/vingle-tech-blog/texture-best-practice-1f0ba1a9d903"
            }, {
                title: "Pull to refresh with Texture",
                desc: "Let’s make an iOS Google Chrome Pull to refresh with Texture",
                preview: "https://cdn-images-1.medium.com/max/1600/1*1DHz4zfJlbRSjyObGciImA.gif",
                source: "https://medium.com/@h2s1880/lets-make-an-ios-google-chrome-pull-to-refresh-wit" +
                        "h-texture-6770b620a6b6"
            }, {
                title: "Floating UISearchBar with Texture",
                desc: "Floating UISearchBar best practice with Texture(AsyncDisplayKit)",
                preview: "https://cdn-images-1.medium.com/max/1200/1*KkINKRDy9dDqDQw2TUyN0g.gif",
                source: "https://medium.com/@h2s1880/floating-uisearchbar-best-practice-with-texture-as" +
                        "yncdisplaykit-9978a662982d"
            }, {
                title: "Tracking Visible Cell with Texture",
                desc: "Let’s Tracking Visible Cell on ScrollView",
                preview: "https://cdn-images-1.medium.com/max/1600/1*8tPd5AAWctiPm9P07Mn6Wg.gif",
                source: "https://medium.com/@h2s1880/ios-lets-tracking-visible-cell-on-scrollview-7f409" +
                        "22f1165"
            }, {
                title: "Bouncing Table HeaderView with Texture",
                desc: "How to make Bouncing Table HeaderView with Texture?",
                preview: "https://cdn-images-1.medium.com/max/1200/1*COQcKhtNUWZpsrajD88mtA.gif",
                source: "https://medium.com/@h2s1880/how-to-make-bouncing-table-headerview-with-texture" +
                        "-94a95c216666"
            }, {
                title: "Chat Application with Texture",
                desc: "How to pre-append ASCellNode like a Chat Application",
                preview: "https://cdn-images-1.medium.com/max/1200/1*qAfL9DqKdLSzUVTTyhdXcg.gif",
                source: "https://medium.com/@h2s1880/how-to-pre-append-ascellnode-like-a-chat-applicati" +
                        "on-23b35d39b6cb"
            }, {
                title: "Tic Toc! ASTimeStampNode",
                desc: "How to make time stamp text UI with Texture",
                preview: "https://cdn-images-1.medium.com/max/2000/1*8Mji-ra60rD0mbmbyjA4-g.gif",
                source: "https://medium.com/@h2s1880/tic-toc-tic-toc-astimestampnode-e29d8ae66371"
            }
        ],
        businessProjects: [
            {
                title: "Vingle Texture Style guide",
                desc: "We hope anybody who loves iOS and Texture find this guide helpful!",
                preview: "https://cdn-images-1.medium.com/max/1600/1*bLxgJzoG5ktMJ5ZLSNgu5A.png",
                source: "https://medium.com/vingle-tech-blog/vingle-texture-style-guide-2caf8c13322f"
            }, {
                title: "VEditorKit",
                desc: "Lightweight and Powerful Editor Kit",
                preview: "https://cdn-images-1.medium.com/max/400/1*9ytvYQ-cRnh7P7FJYxKoYQ.gif",
                source: "https://github.com/GeekTree0101/VEditorKit"
            }, {
                title: "Texture of business practice",
                desc: "Texture를 실제 현업에서 잘 사용하는 법!",
                preview: "https://cdn-images-1.medium.com/max/1200/1*r_CdNRroBn5NKiJoCUQqZw.gif",
                source: "https://medium.com/vingle-tech-blog/texture-%ED%98%84%EC%97%85-%EC%82%AC%EC%9A" +
                        "%A9%EA%B0%80%EC%9D%B4%EB%93%9C-98865bd6a38"
            }, {
                title: "Vingle Talk (Chat)",
                desc: "Texture(AsyncDisplayKit), AFNetworking, RxSwift, Lottie",
                preview: "https://cdn-images-1.medium.com/max/1200/1*qAfL9DqKdLSzUVTTyhdXcg.gif",
                source: "https://medium.com/@h2s1880/how-to-pre-append-ascellnode-like-a-chat-applicati" +
                        "on-23b35d39b6cb"
            }, {
                title: "Re-architecting Vingle Feed (NewsFeed)",
                desc: "Texture(AsyncDisplayKit), AFNetworking, RxSwift",
                preview: "https://cdn-images-1.medium.com/max/1600/1*Z59rWsx0vBeGC_yUx-wIEg.png",
                source: "https://medium.com/vingle-tech-blog/improvement-feed-performance-with-texture-" +
                        "asyncdisplaykit-2ef2ee11f06e"
            }
        ],
        internationalActivities: [
            {
                title: "Vingle Tech-Talk 4th",
                desc: "Improvement feed performance with Texture(AsyncDisplayKit)",
                preview: "https://camo.githubusercontent.com/ff9216f73198087aef6ff2c4e92e0a764115764b/68" +
                        "747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6669742f632f3132" +
                        "302f3132302f312a70546857746e6e4a47643576626e794e497a5f2d45772e6a706567",
                source: "https://medium.com/vingle-tech-blog"
            }, {
                title: "Let us: GO Conferrence",
                desc: "How to make Texture Reactive Wrapper",
                preview: "https://camo.githubusercontent.com/6dc9e5049a7df5cd089701909a9f82d44f2df8ad/68" +
                        "747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f31363030" +
                        "2f312a4e6f4a49796f766a315f595f6f6c4e677176303675672e706e67",
                source: "https://youtu.be/cnW2B019_2w"
            }, {
                title: "MIRO (KNU Robot science group)",
                desc: "MIRO Tech Leader",
                preview: "https://avatars3.githubusercontent.com/u/23741283?s=200&v=4",
                source: "https://github.com/KNU-MIRO"
            }, {
                title: "2016 GIF Internet of Things Challenge",
                desc: "Busking Cloud",
                preview: "http://see.knu.ac.kr/UPDIR/gt_board/20170105092709873.jpg",
                source: "http://see.knu.ac.kr/content/board/news.html?pg=vv&fidx=91962&gtid=bodo&opt=f_" +
                        "subject&sword=%EB%AF%B8%EB%A1%9C&page=1"
            }, {
                title: "2016 MAKERS",
                desc: "Gyeongsang-buk-do Univ Robot Union Club",
                preview: "https://camo.githubusercontent.com/48f13cdb292637662d9e3a2adf2940ed4edf8f00/68" +
                        "747470733a2f2f73636f6e74656e742d69636e312d312e78782e666263646e2e6e65742f762f74" +
                        "312e302d312f6333392e302e3438302e3438302f70343830783438302f31323239353233365f36" +
                        "37313930353537363238343830325f3135393735303230383838313139343939335f6e2e706e67" +
                        "3f5f6e635f6361743d313037266f683d3065366261646636643238383730346666386464653831" +
                        "316361623532396237266f653d3543353539363841",
                source: "https://www.facebook.com/youaremakers/?eid=ARC4rV25RXcQifwRDvSBjNUJCE8tAp_msyj" +
                        "Y1yPBOTOCkGplIoKoyM1KOXALRyx1u3yyIgCZuK1kSeqO"
            }, {
                title: "2015 SKT NDSN Conference",
                desc: "2015 SKT National Disaster Safety Network Conference",
                preview: "http://see.knu.ac.kr/UPDIR/gt_board/middle/20151007111826517.jpg",
                source: "http://see.knu.ac.kr/content/board/news.html?pg=vv&fidx=80290&gtid=bodo&opt=f_" +
                        "subject&sword=%EB%AF%B8%EB%A1%9C&page=1"
            }
        ]
    };
</script>

<main>
    <BannerView></BannerView>
    <SectionHeaderView title={sectionConst.about}></SectionHeaderView>
    <InterestSectionView></InterestSectionView>
    <SectionHeaderView title={sectionConst.personalProject}></SectionHeaderView>
    <ArticleGroupView itemViewModels={articles.personalProjects}></ArticleGroupView>
    <SectionHeaderView title={sectionConst.businessProject}></SectionHeaderView>
    <ArticleGroupView itemViewModels={articles.businessProjects}></ArticleGroupView>
    <SectionHeaderView title={sectionConst.internationalActivity}></SectionHeaderView>
    <ArticleGroupView itemViewModels={articles.internationalActivities}></ArticleGroupView>
    <SectionHeaderView title={sectionConst.internationalActivity}></SectionHeaderView>
	<ContactView title={sectionConst.contact}></ContactView>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>