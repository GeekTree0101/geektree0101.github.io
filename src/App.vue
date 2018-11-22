<template>
  <div id="app">
    <Banner></Banner>
    <SectionHeader title="About Geektree0101"></SectionHeader>
    
    <InterestSection></InterestSection>

    <SectionHeader title="Personal Project"></SectionHeader>
    <Article :streams="personalProjects"></Article>

    <SectionHeader title="Business Project"></SectionHeader>
    <Article :streams="businessProjects"></Article>

    <SectionHeader title="International Activity"></SectionHeader>
    <Article :streams="internationalActivities"></Article>

    <SectionHeader title="Contact Me"></SectionHeader>
    <ContactNode></ContactNode>
  </div>
</template>

<script>
import Article from "@/Components/Article/ArticleContainer";
import Banner from "@/Components/Banner/BannerContainer";
import SectionHeader from "@/Components/Common/SectionHeader";
import InterestSection from "@/Components/Interest/InterestSection";
import ContactNode from "@/Components/Contact/ContactNode";
export default {
  name: "App",
  components: {
    Banner,
    Article,
    SectionHeader,
    InterestSection,
    ContactNode
  },
  data: function() {
    return {
      internationalActivities: [
        {
          title: "Vingle Tech-Talk 4th",
          desc: "Improvement feed performance with Texture(AsyncDisplayKit)",
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
          preview: "http://see.knu.ac.kr/UPDIR/gt_board/20170105092709873.jpg",
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
          title: "RxMVVM-Texture",
          desc:
            "iOS MVVM archtecture pattern built on Texture(AsyncDisplayKit)",
          preview:
            "https://github.com/GeekTree0101/RxMVVM-Texture/raw/master/resource/resource1.png",
          source: "https://github.com/GeekTree0101/RxMVVM-Texture"
        },
        {
          title: "RxCocoa-Texture",
          desc: "Texture(AsyncDisplayKit) Reactive Wrapper built on RxCocoa",
          preview:
            "https://github.com/GeekTree0101/RxCocoa-Texture/raw/master/resources/logo.png",
          source: "https://github.com/GeekTree0101/RxCocoa-Texture"
        },
        {
          title: "Texture Best Practice",
          desc: "Texture(AsyncDisplayKit) Reactive Wrapper built on RxCocoa",
          preview:
            "https://cdn-images-1.medium.com/max/1600/1*IJLH2VMJTa298r1TiITSMA.png",
          source:
            "https://medium.com/vingle-tech-blog/texture-best-practice-1f0ba1a9d903"
        },
        {
          title: "Pull to refresh with Texture",
          desc: "Let’s make an iOS Google Chrome Pull to refresh with Texture",
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
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  background: white;
}
body,
body * {
  font-family: system-ui !important;
}
p,
h1,
h2,
h3,
h4,
h5 {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently */
}
#background_anime {
  position: fixed;
  display: inline-block;
}
#app {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
</style>
