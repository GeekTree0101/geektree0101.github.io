---
title: 'Texture Best Practice #3'
description: 'Texture Best Practice #3 iOS개발자가 FlexBox 를?'
date: '2018-05-01T15:55:38.304Z'
tags: ["ios", "texture"]
image: images/blog/1__kjYPsEwvGVu4md0CbTxPew.png
---

![](/images/blog/1__kjYPsEwvGVu4md0CbTxPew.png)

이전 Texture Best Practice #3에서 다뤘던 내용은 기초적인 LayoutSpec을 잡는 과정과 각종 노하우를 보여주었으면 오늘은 실질적으로 코드 작성을 통해서 위와 같이 복잡한 Layout을 설계를 해보도록 하겠습니다.

이 글을 먼저 보신분은 아래의 포스팅된 글을 우선 참고하시면 도움이 되실 것이라 생각합니다.

[**Texture Best Practice #2**  
_Texture Best Practice #2 LayoutSpec 기초 및 노하우_medium.com](https://medium.com/@h2s1880/texture-best-practice-2-7259bde869ee "https://medium.com/@h2s1880/texture-best-practice-2-7259bde869ee")[](https://medium.com/@h2s1880/texture-best-practice-2-7259bde869ee)

> 참고로 FlexBox개념에 대해서 이해하신 분들께서는 이번 포스팅이 지루 할 수도 있습니다.

Texture는 FlexBox 개념을 토대로 UI 레이아웃을 설계하게 됩니다.

라이브러리 내부를 보면 Facebook YogaKit를 기반으로 만들어진것을 확인 할 수가 있습니다. Texture는 실제 프로덕트에서 사용되는데 필수적이고 가장 사용이 많이되는 레이아웃을 기본적으로 제공해줍니다. 그래서 YogaKit로 바닥부터 설계할 필요없이 편리하게 사용할 수가 있습니다.

예를 들어 3개의 View를 Row direction으로 균등한 크기로 화면 가운데에 채운다면 아래와 같습니다.

YogaKit를 사용한 예

이렇게 할 바에 차라리 SnapKit나 그냥 xib(storyboard)상에서 선을 긋는게 훨씬 빠를 것이다. 하지만 Texture는 이러한 번거로움을 간단히 아래의 코드와 같이 해결해준다.

하지만 실제 FlexBox 동작에 대해서 익히기 위해선 필자의 입장에서는 YogaKit를 우선 경험해보는게 좋다고 생각합니다.

그렇다고 프로젝트 하나 만들어서 YogaKit를 Pod으로 받아서 코드 작성을 할 필요는 없습니다.

필자가 처음 접했을 당시에는 없었지만 최근에는 FlexBox를 익힐 수 있게 Facebook에서 Yoga FlexBox Playground를 웹으로 제공해주기 때문입니다.

![](/images/blog/1__v__mwEcyDtPtyu7J1nyPC7w.png)

제가 설명한건 이게 끝입니다. 사실 FlexBox라는게 크게 대단한 건 아닙니다.

딱 한문장으로 표현하자면

#### 편리하게 레이아웃을 설계하자

이게 다입니다.

그래도 이해가 안가신다면

[**Yoga Tutorial: Using a Cross-Platform Layout Engine**  
_Learn about Yoga, Facebook's cross-platform layout engine that helps developers write more layout code in style akin to…_www.raywenderlich.com](https://www.raywenderlich.com/161413/yoga-tutorial-using-cross-platform-layout-engine "https://www.raywenderlich.com/161413/yoga-tutorial-using-cross-platform-layout-engine")[](https://www.raywenderlich.com/161413/yoga-tutorial-using-cross-platform-layout-engine)

갓 raywenderlich에서 YogaKit 사용 튜토리얼을 상세하게 설명 해놨으니 이거까지 참고하시면 도움되실꺼라 생각합니다.

자 그럼 FlexBox 개념을 숙지하셨으면 제가 처음 보여드렸던 톡 메세지 레이아웃을 직접 코딩을 해보겠습니다.

![](/images/blog/1__kjYPsEwvGVu4md0CbTxPew.png)

우선 위에 필요한 모든 UI구성요소들에 대한 Property를 만들어 줍니다.

> 참고로 XImageNode, TalkBalloonLikeNode이런 것들은 다른 곳에서 재사용 할 수 있도록 Node를 만든 것입니다.

![](/images/blog/1__4XbR1NGtLHeP9__Ca6ArXaQ.png)

그리고 contentAreaNode에 layoutSpecBlock을 사용하였는데 이건 좌측 이미자와 같이 노란 색 영역 의 회색 말풍선에 해당하는 Node입니다. layoutSpecBlock안에 노란색 레이아웃을 구성 할 것입니다.

이제 각 녹색, 노란색, 파란색 영역 순으로 LayoutSpec를 설계 해보겠습니다.

우선 프로필같은 경우 Relative하게 좌측 상단에 위치하면 되기 때문에 아래의 코드와 같이 ASRelativeLayoutSpec를 사용합니다.

그리고 우측 하트버튼의 경우도 마찬가지로 위와 같이 RelativeLayoutSpec으로 잡아주되 당연히 우측 하단에 위치하기 때문에 VerticalPosition을 end로 잡아줍니다.

사실 이미지를 보면 Like가 살짝 위로 올라간 것을 볼 수있는데 이건 메세지가 두 줄까지는 말풍선 가운데에 맞추겠끔 디자인 되어서 ASAbsoluteLayoutSpec으로 조절 했으나 구독자 편의에 맞춰서 대충 RelativeLayoutSpec으로 코드를 작성했습니다.

그리고 가운데 말풍선 Content영역은 이전 포스팅 글에서 언급한 바와같이 StackLayout으로 만듭니다.

위의 코드같은 경우 복잡한 편인데 아래와 같이 요약할 수가 있습니다.

*   이미지가 있다/없다
*   메세지 글이 있다/없다
*   자기가 쓴 메세지/ 다른사람이 쓴 메시지의 경우 내용물을 reversed

물론 이미지도 메세지 글도 없는 경우는 없겠지만 말이죠.

여기서 특이한 점은 Tail (말풍선 꼬리 부분)인데 이 부분의 position은 처음 talkTailNode Property를 만들때 다음과 같이 설정 하였습니다.

![](/images/blog/1__0pdPLYqOSeJdXFcwVZy9Kg.png)

따라서 말풍선 꼬리는 Node의 style.layoutPosition 에 의해서 좌측 이미지와 같이 조절 되게 됩니다.

> 여기까지 이해하셨다면 더 이상 코드를 보여주면서 설명하는건 반복과정이므로 생략하겠습니다.

사실 이번 포스팅의 핵심은 FlexBox를 스스로 학습할 수 있는 방법과 Texture로 응용하는 법에 대해서가 가장 컸던것 같습니다.

LayoutSpec이랑 FlexBox에 대한 소개와 기초적인 부분은 여기까지 정리하고

다음 #4에선 실제 현업에서 Texture사용하면서 LayoutSpec 설계하면서 개발자들이 **실수하는 부분**과 **노하우**에 집중적으로 다루고자 합니다.

읽어주셔서 감사합니다.

_Layout설계와 FlexBox관련 포스팅 마무리하며.._

필자 개인적으로는, 실제로 개발하다보면 어쩌면 Constraints잡고 Priority 설정하는게 게임 앱을 제외한 서비스 앱의 UI에 대해서 좀 과분하면이 있다고 생각합니다.

![](/images/blog/1__Xf5tFn0pZA8hUMfDnjJgqw.png)
![](/images/blog/1__7__xrOFfiMzg8yTC0__huxtw.png)
![](/images/blog/1__GDbZS4qfPcBcSy7DWHfPow.png)

게다가 FlexBox는 웹에서만 사용하는 레이아웃 설계 방법론이라는 인식이 강하다 보니 기존 네이티브 앱 개발자들에게는 이질적인 느낌이 없잖아 있기도 합니다.

> 그래도 이런거좀 알아두고 배워두면 도움이 되지 않을까 싶습니다.

> YogaKit는 크로스 플랫폼이니까!

사례:

Android flexBox 사용예시

[**GeekTree0101/GithubRepoList-Litho**  
_GithubRepoList-Litho — Github Repository List built on Litho Framework (iOS version…_github.com](https://github.com/GeekTree0101/GithubRepoList-Litho "https://github.com/GeekTree0101/GithubRepoList-Litho")[](https://github.com/GeekTree0101/GithubRepoList-Litho)

iOS flexBox사용예시

[**GeekTree0101/RxMVVM-Texture**  
_RxMVVM-Texture - RxSwift MVVM pattern best practice built on Texture(AsyncDisplayKit) and written in Swift_github.com](https://github.com/GeekTree0101/RxMVVM-Texture "https://github.com/GeekTree0101/RxMVVM-Texture")[](https://github.com/GeekTree0101/RxMVVM-Texture)