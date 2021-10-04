---
title: Improvement feed performance with Texture(AsyncDisplayKit)
description: >-
  아직도 발열을 못잡네. 게임 돌리는것 보다 발열이 심합니다. 앱 최적화가 그만큼 안된다는 소리겠죠? 예전 앱이 더 안정적이었는데 최신앱이
  이모양이라니… + 와. 15분 만지고 배터리 20% 광탈…
date: '2018-02-25T08:33:26.462Z'
categories: []
keywords: []
slug: >-
  /@h2s1880/improvement-feed-performance-with-texture-asyncdisplaykit-2ef2ee11f06e
---

> 아직도 발열을 못잡네. 게임 돌리는것 보다 발열이 심합니다. 앱 최적화가 그만큼 안된다는 소리겠죠? 예전 앱이 더 안정적이었는데 최신앱이 이모양이라니… + 와. 15분 만지고 배터리 20% 광탈…

> 아이폰 7 발열이 미친듯합니다 휴대폰 터질거 같아요 다른 어플들은 전혀 발열 없는데 빙글만 이렇네요ㅠ

…

### 서론

지난 2017년 8월, 약 일년이 넘는 긴 시간동안 진행 해왔던 리뉴얼 작업이 끝이 나고 4.0.0 버젼을 업데이트 하고 난 이후 몇 달간 유저로 부터 받은 피드백입니다.

유저들이 경험한 발열과 피드 퍼포먼스 저하 현상의 원인은 다음과 같습니다.

1.  **과도한 CPU 리소스 사용**
2.  **복잡한 UI 그리고 bitmap증가에 따른 과도한 Memory footprint**

위와 같은 문제 해결과 동시에 앞으로 해야할 일도 많고 시간은 부족한 상황에서도 저희는 큰 결심을 하고 Texture를 도입하게 되었습니다.

사실 2017년 상반기에 피드를 리뉴얼하고 내부적으로 테스트를 했을 때 당시, 피드 퍼포먼스에 대한 문제점을 인지는 하고 있었고 동시에 Texture 도입에 대해서 생각은 했었으나 도입을 하더라도 팀원들이 새롭게 학습을 해야한다는 점과 시간제한 때문에 도입을 하지 않았습니다.

지금 생각하면 왜 망설였는지, 왜 진작에 Texture를 도입하지 않았는지 후회는 되지만, 유저들의 쓴소리가 빙글 iOS 팀의 앱개발에 있어서 중요한 터닝포인트가 되었기 때문에 오히려 매우 감사 할 따름입니다.

제가 이번 포스팅에서 소개 하고자 하는 건 피드 성능 개선에 있어서 Texture 라이브러리가 우리 제품에 어떠한 기여를 했으며, 개선 과정과 도입하면서 습득한 노하우를 공유하고자 합니다.

### Texture(AsyncDisplayKit)?

Texture에 대해서 간단히 소개 먼저 하자면

Texture는 UIKit위에 구축된 iOS프레임워크 라이브러리이며 아무리 복잡한 UI라도 유저의 반응성에 대한 응답이 매우 뛰어며, 내부적으로 재설계된 Runloop와 효율적인 Layer 사전 조합 기능 덕분에 Thread의 안정성과 UI 랜더링에 있어서 매우 뛰어난 퍼포먼스를 보여줍니다.

_더 자세한건_ [_여기 클릭_](http://texturegroup.org/) _해 주세요._

서론에서 말했듯이, 우리가 해당 라이브러리를 사용하는데 망설였던 이유에 대해서 다시 짚어 보자면 우선 새롭게 학습을 해야한다는 점과 시간 부족이라는 것이다. 이건 읽는 프로젝트에 새로운 라이브러리를 도입하려고 하는 독자 여러분들도 공감하실꺼라 생각합니다.

하지만, 직접 사용해보고 해당 라이브러리의 내부 코드를 분석하면서 생각이 달라졌으며, 다음 도입과정에 대해서 이에 대한 경험을 더 자세하게 설명하겠습니다.

### 도입과정

따라서 우리는 해당라이브러리를 도입하게 되었고, 도입전에 앞서 우리는 3가지 사항에 대해서 점검을 했습니다.

1.  **UI에 대한 코드리뷰 및 생산성**
2.  **RxSwift(+ Rxcocoa) 사용가능성**
3.  **기존 UI 재사용성(Xib 또는 Programatic UI)**

**\[1\] UI에 대한 코드리뷰 및 생산성**

우선 (1) UI에 대한 코드리뷰 및 생산성에 대해서 설명하자면, 우리가 어떤 UI를 개발하고 PR을 올렸을 때, 해당 내역에 대해서 코드리뷰를 진행 한다. 하지만 읽고 있는 독자 여러분들도 아시다 싶이 Xib로 된 코드를 리뷰한다는 것은 사실 쉽지 않았습니다.

![](/images/blog/1____MTdAna8__d4__DzsV6gfFww.png)

위에 사진과 같이 솔직히 xib script는 수 많은 컴포넌트와 Constraints 들을 봤을 때 가독성이 그렇게 뛰어나지 않을 뿐더러, 굳이 해당 xib를 리뷰하기 위해선 PR의 해당 branch를 pull받아서 xcode를 통해서 보는 방법 밖에 없었습니다.

![](/images/blog/1__gbGZ3lt10RBCBh6rLo8TEQ.png)

심지어 열어본 xib도 시간대비 리뷰하기가 비효율적이라고 생각합니다. (각종 attributes에 대해서도 체크해야 하니깐 말입니다.)

반대로 Programatic UI(코드로만 설계된 UI)의 경우는 어떨까? iOS 분야에 좀 계신 분들은 아실껍니다. [SnapKit](https://github.com/SnapKit/SnapKit)(objc: [Masonry](https://github.com/SnapKit/Masonry))라는 Constraint를 쉽게 다루는 라이브러리 있습니다.

그나마 코드로 Constraint 잡는 것과 가독성에 대한 문제들에 대한 부담은 덜여주지만, 저는 이것 또한 효율적이고 생산성에 좋은 가에 대해서 다시한번 생각을 해보았습니다.

![](/images/blog/1__f__Oh3DoqtQxyqk8nMPxxaQ.png)

간단해 보여도 Constraint는 Constraint일 뿐 xib상에서 잡은 Constraint나 코드로 잡은 Constraint는 UI가 복잡해지면 복잡해질수록 오히려 가독성도 떨어지고 버그를 만들기 쉬우며, 자칫 잘못하면 퍼포먼스 저하로 이어지기가 쉬웠습니다.

하지만 Texutre의 경우 [CSS FlexBox를 이용한 Layout 설계](https://facebook.github.io/yoga/)와 이를 응용한 LayoutSpec 기능을 제공함으로써, 가독성이 뛰어나고 디자이너의 요구 사항에 대해서 완벽히 맞출 수 있는 UI개발방법을 제공합니다.

LayoutSpec에 대한 자세한 설명은 [여기](http://texturegroup.org/docs/layout2-layoutspec-types.html)를 클릭해주세요.

위의 스펙에 따라서 UI를 설계함으로써 우리는 다음과 같은 가독성이 뛰어나고 정확한 UI를 개발할 수가 있었습니다.

![](/images/blog/1__pf__1pJEntclhuW1SmuiruA.png)

위의 사진과 같이 LayoutSpec을 이용하여 글처럼 읽기 좋은 UI를 설계 할 수가 있습니다. 위의 코드를 분석하자면

1.  ASRatioLayoutSpec : Video의 ratio를 설정한다.
2.  ASCenterLayoutSpec: Video Play Icon의 Position을 Center로 잡는다.
3.  ASOverlayLayoutSpec: Video Icon을 Video위에 Overlay시킨다.
4.  ASStackLayoutSpec: video — title — description 순으로 vertical stack을 구성합니다. [그 외 ASStackLayoutSpec의 attributes(spacing, justifyContent etc)](http://texturegroup.org/appledocs.html)
5.  ASInsetLayoutSpec: 구성된 Stack의 상하좌우 inset을 잡아서 최종적으로 LayoutSpec을 반환합니다.

따라서, 개발자입장에서는 **가독성**이나 UI개발하는데 있어서 **시간이 절약**되며, 디자이너입장에선 요구사항을 바꾸더라도 숫자나 특정 값만 바꾸면 되니 **유지보수 측면에도 효율적**이라고 할 수 있습니다.

이렇게 LayoutSpec과 FlexBox덕분에 **Constraints지옥**으로 부터 탈출 할 수가 있었습니다.

[flexBox연습하기 좋은 사이트](http://huytnguyen.me/froggy-asdk-layout/)

![](/images/blog/1__Vf__Dzw81JiAxz98psFgSuQ.png)

예제: [https://github.com/GeekTree0101/TextureAVAssetVideoFeed](https://github.com/GeekTree0101/TextureAVAssetVideoFeed)

**\[2\] RxSwift(RxCocoa) 사용가능성**

우리는 2017년 초부터 Objective-c에서 Swift로 넘어감과 동시에 RxSwift를 도입하기 시작했다. 짧지않은 긴시간 동안 RxSwift를 사용해왔기 때문에 이에 대한 편의성을 버릴 수는 없었습니다. 하지만 Texture의 경우 [Node들](http://texturegroup.org/docs/node-overview.html)에 대해서 RxCocoa가 제공해주는 인터페이스를 직접적으로 제공해주지는 않지만 View Property를 통해서 사용이 가능합니다.

![](/images/blog/1__ESoyHA3XvyVEjqfLaTtsHQ.png)

주의할 점은 view property를 접근 하는데 있어서 MainThread상에서 접근하는지 체크하는 것이 중요합니다.

왜냐하면 Texture내부코드를 보면 view를 접근할 때 Thread에 대해서 매우 엄격하기 때문입니다.

![](/images/blog/1__MirNRKdeGc2pJEPF6uvLTQ.png)

우리는 이러한 실수로 인한 크래시를 미연에 방지하고자 ASControlNode에 대해서 RxCocoa를 이용한 Wrapper를 만들었습니다.

![](/images/blog/1____311PgzHWFF__JjqzirtCuQ.png)
![](/images/blog/1__u9kXKDFHR6m7OdPY6TwHXQ.png)

왜 ASControlNode냐 하면 [ASControlNode](http://texturegroup.org/docs/control-node.html)의 Subclass들에서 알 수가 있습니다.

![](/images/blog/1__fEEl__G51__clMGvnFC2NMDw.png)

ASTextNode, ASImageNode, ASVideoNode, ASMapNode 들이 ASControlNode의 subclass 이기 때문에 우리는 아래와 같이 터치이벤트를 subscribe할 수가 있었습니다.

![](/images/blog/1__FqJC83I66XXxlCsBz34f__w.png)
![](/images/blog/1__ETcd__qdTkN__jKx98tbkLRQ.png)

예제: [https://github.com/GeekTree0101/RxASControlEvent](https://github.com/GeekTree0101/RxASControlEvent)

굳이 저걸 쓸 필요가 없다면, Texture에서 기본으로 제공해주는 didLoad override method 또는 onDidLoad Block 내에서 처리해주는 것도 방법입니다.

**\[3\] 기존 UI 재사용성(Xib 또는 Programatic UI)**

![](/images/blog/1__Z59rWsx0vBeGC__yUx__wIEg.png)

위에 사진은 현재 피드에 필요한 UI들이다. 현재 빨간 사각형 영역에 있는 UI는 모두 Texture로 개발된 상태이지만, 일부 UI에 대해서는 재사용이 필요한 경우가 있었습니다. 대표적으로

![](/images/blog/1__nath8____1mJuA0hcHKOTnXw.jpeg)

페이스북 Audience에서 제공해주는 전용 UI 컴포넌트 들이다. 이들은 UIKit로 만든 순수한 UI인데, 이것을 어떻게 Texture로 만든 피드상에 보여줄 것인지가 가장 큰 문제였습니다.

저는 이것을 해결함과 동시에 Texture의 우수성에 다시 한번 더 놀라게 되는데 그 것은 바로 [ASDisplayNode에서 viewBlock](http://texturegroup.org/appledocs.html)을 제공한다는 점 입니다.

![](/images/blog/1__bLYdtKlbxnKeBmzMP563lQ.png)

위의 API Spec을 용용하면 다음 코드와 같이 쓸 수가 있습니다.

![](/images/blog/1__Buc33NyNafK0pfppR__LKBQ.png)

뿐만 아니라 UIKit에 새로 추가된 UI나 현재 Texture에서 제공하지 않는 UI들도 viewBlock을 이용해서 적용할 수 있다는 것입니다.

_주의 사항은 퍼포먼스 보장은 확실치 않지만, 기존 UI보다 나쁜영향을 주지는 않았습니다._

> 따라서 우리는 도입 후 제한시간(2주)보다 더 빠른 1주만에 UI를 만들고 적용할 수가 있었습니다.

### 그 외

그 외 여러 좋은 정보들을 공유드리자 하면, 우선 가장 강력하게 추천드리고 싶은 것 Texture Slack를 말하고 싶습니다.

> (우선 Pinterest 개발자분들과 Texture 커뮤니티활동 중이신 개발자 여러분들께 감사의 말씀을 드립니다.)

다른 라이브러리에 비해 활동하는 사람들은 많지는 않으나 대부분 활동하시는 분들이 서로 공유를 많이 하고 도와주는 편이라. _마치 한국에 있는 두레마을의 정과 같은것을 느끼실 수가 있습니다._

현재 저도 활동하는 편이고 도움 많이 받고 있습니다.

![](/images/blog/1__BfSEJTAoGXX6r6eDbw__qZw.png)

그리고 Texture기반으로 한 RxSwift MVVM Best practices 를 설계해서 아래 사진과 같이 간단한 앱을 만들었으며,

![](/images/blog/1__g3EK2q3O9RvhU__IzSdTL__A.png)

![](/images/blog/1__NbbZjnHggYR7Gtn__PN2Zew.png)
![](/images/blog/1____XR4fdWJSJ5xMXw4rFX1Ng.png)

Instrument로 time profiling 해본결과는 위의 사진과 같이 우수한 퍼포먼스를 볼 수가 있었습니다.

예제: [https://github.com/GeekTree0101/RxMVVM-Texture](https://github.com/GeekTree0101/RxMVVM-Texture)

마지막으로, 2018년 2월 7일 Vingle Tech-talk 4차에서 해당 내용에 대해서 발표를 하였고 아래의 링크를 통해서 보다 더 구체적인 내용을 시청 하실 수 있습니다.

**준비중입니다. ㅠㅠ**

#### 읽어 주셔서 감사합니다.

그리고

#### 저희 Vingle iOS팀과 함께 하고 싶은 분들은

#### [**언제나 누구든 환영**](https://careers.vingle.net/#/engineering/ios)합니다!