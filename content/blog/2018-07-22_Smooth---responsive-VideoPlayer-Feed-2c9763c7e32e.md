---
title: Smooth & responsive VideoPlayer Feed
description: 이번 주제는 ASVideoNode로 간단한 Feed를 만들겁니다.
date: '2018-07-22T17:05:04.150Z'
tags: ["ios", "feed", "video"]
categories: ["iOS", "Feed Service"]
image: images/blog/0__OlEJjlPWXUDhjxQ6.jpeg
---

![](/images/blog/0__OlEJjlPWXUDhjxQ6.jpeg)

[**ASVideoNode**  
_Texture_texturegroup.org](http://texturegroup.org/docs/video-node.html "http://texturegroup.org/docs/video-node.html")[](http://texturegroup.org/docs/video-node.html)

이번 주제는 ASVideoNode로 간단한 Feed를 만들겁니다.

ASVideoNode에는 shouldAutoPlay라는 Property를 제공해줍니다.

이걸 Yes(True)로 해주면 didEnterVisibleState 에서 자동으로 play시켜주고 didExitVisibleState에서 pause해줍니다.

\[State에 대해서는 [여기](http://texturegroup.org/docs/intelligent-preloading.html) 참고\]

여기까진 문제 없어보입니다. 그리고 asset or assetURL을 set value할 때는 반드시 Main-Thread에서 적용되어야 합니다.

내부적으로 Main Thread Assertion이 걸려있기 때문입니다.

그렇다면 다음과 같이 코드가 완성됩니다.

편의상 didLoad에서 setAsset을 해주도록 하겠습니다.

이렇게 만든 VideoCell을 100개를 reload했을 때 피드를 빠른속도로 스크롤하면 퍼포먼스가 과연 나올까요?

사실 그렇지 않습니다. 애초에 Texture에서 ASVideoNode를 만들때 비디오 리스트처럼 쓰라고 만들지 않았습니다. 뭐든 주는데로 그대로 받아 먹어서는 안됩니다. 코드도 마찬가지 입니다.

의외로 ASVideoPlayerNode는 pendingAsset이라는 property를 이용해서 Asset을 Pending시켜서 didEnterPreloadState 에서 asset을 안정적으로 setting 해줍니다만 역시나 큰 차이가 없습니다.

콩심은데 콩난다고 했던 선조의 지혜에 다시한번 감탄하고 갑니다.

[**ASDKTubeExample**  
_Texture - Smooth asynchronous user interfaces for iOS apps._github.com](https://github.com/TextureGroup/Texture/tree/master/examples/ASDKTube "https://github.com/TextureGroup/Texture/tree/master/examples/ASDKTube")[](https://github.com/TextureGroup/Texture/tree/master/examples/ASDKTube)

#### 결국 Frame Drop이 심하다 싶을 정도로 일어나서 피드의 퍼포먼스와 오버헤드가 증가와 함께 제 스트레스도 같이 증가했다고 보시면 되겠습니다.

한 동안 고민하다가 문득 이 노래가 생각나서 링크를 했습니다. 저는 개인적으로 노래들으면 노래랑 어울리는 코드가 절로 나옵니다.

저는 어떤 문제가 생기면 God 플랫폼들을 만져보면서 생각을 해보는 편입니다. 대표적으로 얼굴책(Facebook), 너의뱃살(Youtube) 등등이 있죠. 플랫폼 영어이름을 순 우리말로 표현한 것은 저의 애국심이라 보시면 되겠습니다. 그리고 Tube는 순우리말이 없어 그나마 가장 비슷한 제 뱃살이 생각나서 뱃살이라 적었습니다.

두 플랫폼에 대해서 테스트는 다음과 같이 하였습니다. 별거 없습니다

1.  개발자모드에서 Network 상태를 강제로 매우 열악한 환경으로 셋팅해서 어떻게 동작하는지 추론합니다.

2\. 스크롤에 따라서 비디오에 어떤 영향을 주는지 시각적인 변화를 통해서 추론합니다.

우선 Facebook은 Visible State에서 비디오를 로드하고 로드되면 자동 재생되는 것을 확인했습니다.

로드하는 단계라고 확정지은 이유는 System ActivityIndicator가 돌았기 때문입니다. (주관적인 견해)

그리고 스크롤에 따라 비디오 음량이 조절 되는 것을 확인할 수가 있었고 Exit시 pause를 동작시킵니다.

일단 Visible에서만 Video를 Load해주는 걸 알수가 있습니다.

두번째로는 Youtube인데 이건 피드에서 자동재생되는 기능을 사용자들 잘 모를꺼 같습니다. 왜냐하면 **scrollViewDidEndDecelerating(\_ scrollView: UIScrollView)** 이 호출되면 그제서야 자동재생을 합니다. 아마 비디오 asset은 background까진 아니고 utility정도에서 비디오를 처리하는거 같습니다.

저도 사용자로서 이번 비디오 테스트하면서 처음 알았습니다. (저만 몰랐나요?)

일단 근본적인 Frame Drop원인은 두 플랫폼 덕분에 찾은 거 같습니다.

근본적인 이유는 100개의 VideoCell들이 Video Asset을 받아오고 Play를 내부 메커니즘에 따라서 잘 동작하지만 문제는 이들의 행위를 총 책임하는 책임자가 없기 때문에 100개의 VideoCell들은 무질서하게 동작하게 됩니다. 결국 재수없게 Visible State에 있는 비디오들이 동시에 여러개가 play되는 현상을

기술적으로는 ASVideoNode가 문제는 없습니다. 기능적인 동작에는 문제없지만, 각각 100개의 VideoCell들에게 알아서 동작하게 책임을 위임하는 행위가 사용자 경험성에 안좋다고 보면 되겠습니다.

저는 질서있는 걸 좋아합니다. 무질서하거나 시끌벅적한걸 싫어하기 때문에 Operation형님을 모셔왔습니다.

저는 간단히 BlockOperation정도 쓸꺼고 약간은 GCD도 같이 쓸껍니다.

[**Choosing Between NSOperation and Grand Central Dispatch**  
_While NSOperation and NSOperationQueue have been available since iOS 2, Grand Central Dispatch, GCD for short, was…_cocoacasts.com](https://cocoacasts.com/choosing-between-nsoperation-and-grand-central-dispatch "https://cocoacasts.com/choosing-between-nsoperation-and-grand-central-dispatch")[](https://cocoacasts.com/choosing-between-nsoperation-and-grand-central-dispatch)

[**\[번역\]스위프트에서 동시성에대한 모든것-Part1 : 현재편**  
_제목: All about Concurrency in Swift - Part 1: The Present 현재 배포된 스위프트 언어에서는 Go나 Rust가 한것 처럼 아직 네이티브 동시성 기능을 가지지 않는다…_blog.canapio.com](http://blog.canapio.com/128 "http://blog.canapio.com/128")[](http://blog.canapio.com/128)

위의 Article을 참고하시면 도움이 되실껍니다.

우선 VideoProcessing 이라는 struct을 만들어서 사용하고

두개의 Concurrent한 OperationQueue를 만들 껍니다. Video를 Load하는 Queue와 Play를 담당하는 Queue로 말이죠.

video load operation queue는 utility QoS가 적당하겠습니다. (베터리 부족시 Background로 해놓은 queue는 꺼진다는 말이 있다고 하는데 이건 좀 더 확인해보겠습니다.)

그리고 play는 userInitiated 또는 상위 Qos정도로 처리하면 좋겠습니다.

옛날에 군대에서 배식하는데 배식할때 최소 5~10사람씩 끊어서 입장해야 수월하게 배식을 할 수 있었습니다. 하지만 한번은 특식이 나오는 날이 였는데 동기나 선임들이 이러한 규칙을 어기고 40~50명이 개때처럼 몰려와서 배식이 엉망이 된 경험이 있어서 저는 OperationQueue의maxConcurrentOperationCount를 적절히 셋팅해줄 겁니다. 많이 안줄꺼에요.

load는 최대 3개의 Operation, play는 1개 정도 줄 껍니다.

어차피 사람은 두 눈으로 동영상 하나에 집중하기 때문에 우선 하나 Play Operaion Block이 수행되는 동안 다른 Video는 적절히 Concurrent하게 돌아가면 되겠습니다.

나중에 인류가 진화해서 눈이 4개가 된다면 play operation queue의 maxConcurrentOperationCount는 2개정도 주시면 되겠습니다.

![](/images/blog/0__sXVmRmLd0aa__dpd4.jpg)

참고로 빨간 잠자리는 한쪽당 4억 7천개의 눈을 가지고 있다고 합니다.

그리고 Play는 당장 Operation을 Visible State에서 동작 시키지 않고 GCD를 이용해 약 2.0sec 이후에 동작 시키도록 하겠습니다.

약간의 딜레이를 준건 페이스북과 유튜브 둘 다 그렇게 적용하였고, 이를 통해서 리소스낭비와 프레임 드랍을 방지하기 위함입니다.

만약 기획자가 “전부 다 바로바로 재생시켜주세요" 라고 한다면 NSRunLoop에 같이 넣어서 돌려버리십시오.

그리고 exit visible시에는 가차없이 해당 Cell의 Play, Load Operation을 가차없이 Cancel 시킵니다.

그리고 다시 enter visible 시에는 다시 Block Operation을 만들어서 PlayOperationQueue에 넣어줍니다.

> 지나간 것은 지나간대로~

그래도 이 정도면 퍼포먼스가 상당히 좋아진 것을 확인 할 수가 있겠습니다.

그럼 여러분 안녕~