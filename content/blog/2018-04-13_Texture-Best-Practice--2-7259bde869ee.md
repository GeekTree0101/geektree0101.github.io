---
title: 'Texture Best Practice #2'
description: 'Texture Best Practice #2 LayoutSpec 기초 및 노하우'
date: '2018-04-13T09:50:46.154Z'
tags: ["ios", "texture"]
image: images/blog/1__Euj2A7uCu4__XSCuYBsjCvA.png
categories: ["iOS"]
---

Texture Best Practice #2 LayoutSpec 기초 및 노하우

[**Texture Best Practice #1**  
_Texture Best practice #1 기초편_medium.com](https://medium.com/@h2s1880/texture-best-practice-1-4d830a7ff11b "https://medium.com/@h2s1880/texture-best-practice-1-4d830a7ff11b")[](https://medium.com/@h2s1880/texture-best-practice-1-4d830a7ff11b)

이전 Texture Best Practice #1 에서 주로 다뤘던 내용은 실제 필요한 UI Components를 어떤식으로 만들고 전반적인 구성요소에 대해서 다뤘다면

이번엔 Texture의 꽃인 layoutSpecThatFits override method를 이용한 Layout구성 방법에 대해서 다루고자한다.

기본적으로 Texture에서 여러가지 LayoutSpec을 제공하는데 아래의 링크를 참고하자.

[**Layout Specs**  
_The following ASLayoutSpec subclasses can be used to compose simple or very complex layouts. You may also subclass…_texturegroup.org](http://texturegroup.org/docs/layout2-layoutspec-types.html "http://texturegroup.org/docs/layout2-layoutspec-types.html")[](http://texturegroup.org/docs/layout2-layoutspec-types.html)

간단히 요약하자면

*   `[AS**Wrapper**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#aswrapperlayoutspec)`
*   `[AS**Stack**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#asstacklayoutspec-flexbox-container)`
*   `[AS**Inset**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#asinsetlayoutspec)`
*   `[AS**Overlay**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#asoverlaylayoutspec)`
*   `[AS**Background**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#asbackgroundlayoutspec)`
*   `[AS**Center**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#ascenterlayoutspec)`
*   `[AS**Ratio**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#asratiolayoutspec)`
*   `[AS**Relative**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#asrelativelayoutspec)`
*   `[AS**Absolute**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#asabsolutelayoutspec)`

총 9가지 LayoutSpec을 제공한다. 각각 LayoutSpec에 대해서 사용법을 Texture에서 example과 같이 잘 정리해두었기 때문에 각각에 대해서 설명하지는 않겠습니다. 필자는 여러종류의 LayoutSpec은 어떠한 상황에서 효율적으로 사용할 수 있는지에서 실무 경험을 바탕으로 설명하고자합니다.

우선 LayoutSpec을 잡기전에 앞서서 해야하는 것이 있다.

### UI를 보고

### 어떤식으로

### LayoutSpec을 잡을지

### 설계부터하자

우선 현재 앱스토어에 올라간 Vingle의 실시간 톡의 일부 UI를 아래의 사진과 같이 가져왔습니다.

![](/images/blog/1__Euj2A7uCu4__XSCuYBsjCvA.png)

> Vingle 내부에 보면 여러가지 UI들이 있는데 굳이 Talk UI를 가져온 이유는 일단 Texture Layout Spec만 제대로 이해한다면 위와 같이 복잡하고 이쁜 UI도 생각보다 쉽고 빠르게 개발할 수 있다는 걸 보여주기위해서다.

_보다 쉬운 예시는_ [_여기_](https://medium.com/vingle-tech-blog/improvement-feed-performance-with-texture-asyncdisplaykit-2ef2ee11f06e)_를 참고하자!_

이런 UI 시안 받았을 때 구독하시는 분들은 어떤 기분일지는 모르겠지만, 주니어 개발자들 시각에서는 다소 난감한 부분들도 있고 이걸 xib상에서 constraints로 설계하지니 상당히 복잡해 보일 수 밖에 없다.

그렇다면 Texture Layout Spec Guide를 바탕으로 한 필자의 시각으로 Layout을 설계 해보겠다.

#### 1\. `[AS**Stack**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#asstacklayoutspec-flexbox-container)` 을 기반으로 위의 UI를 조합가능한 여러 sub-layout으로 나눈다.

_참고: 일단 나누어진 sub-layout들은 색상을 이용했습니다._

![](/images/blog/1__kjYPsEwvGVu4md0CbTxPew.png)
![](/images/blog/1__nBf7SSwFCo2Vk2ojkAElbw.png)

`[AS**Stack**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#asstacklayoutspec-flexbox-container)` 은 Vertical과 Horizontal 두 종류로 나눠진다.

우선 좌측 이미자와같이 각각 의미를 가진 UI를 3등분했다.

*   profile Image layout: Talk Message를 작성한 사람의 프로필 사진
*   content layout: Talk Message의 실질적인 내용물을 담당하는 Layout
*   engage layout : Talk Message의 Like를 담당하는 Layout

> 위와 **의미있는 Layout 설계**가 중요하다. 이렇게 하면 해당 Layout을 만드는 method naming과 동시에 해당 Layout에 필요한 Node들의 Property naming도 작명하기가 수월해지고 가독성이 좋아진다.

다음은 우측사진 Content Layout을 크게 2등분 했다

*   content meta layout: 유저 이름과 작성 시간
*   message balloon layout: 말풍선과 사진 또는 메세지 내용

![](/images/blog/1__gHHdYQe7rWM__mDPG3Tz9AA.png)

_물론 좌측 사진과 같이 content meta layout도 두개의 Stack Elements로 나눌 수 있다._

![](/images/blog/1__4XbR1NGtLHeP9__Ca6ArXaQ.png)
![](/images/blog/1__UWI0xWhFG2aIxLj__hqRing.png)

message balloon layout(말풍선과 사진 또는 메세지 내용) 을 좌측이미지와 같이 나눌 수가 있고

*   message balloon tail: 말풍선 꼬리
*   message balloon content: 말풍선 내용물

message balloon content 를 우측사진과 같이 나눌 수 있다.

*   media area: 미디어 영역
*   message text area: 메세지 텍스트 영역

여기까지가 StackLayoutSpec으로 Layout 기본 틀 설계가 끝이 난다.

#### 2\. `[AS**Stack**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#asstacklayoutspec-flexbox-container)` 을 기반으로 설계한 레이아웃 각각 sub-layout들에 대한 Layout을 잡는다.

이건 또 무슨말이냐? 우선, 각 sub-layout의 항목들에 대해서 정리를 먼저하자면 다음과 같다.

*   media layout은 ratio값에 따라서 비율이 변해야한다.
*   프로필은 항상 좌측 상단에 위치해야한다.
*   말풍선 꼬리는 말풍선의 상단기준으로 15.0 pt 하향해야한다.
*   Engage(하트 버튼)은 우측하단에 위치하되 우측과 하단의 마진은 5.0pt정도 가진다.

이렇게 눈으로 봤을 때 위의 목록이 정리가 될 것이다.

그럼 각 항목별로 어떤 LayoutSpec과 수치를 정할지만 생각하고 정리하면 끝이다. 각 항목별로 하나씩 풀어보자면

*   media layout은 ratio값에 따라서 비율이 변해야한다.

: ratio값을 이용해야하니깐 `[AS**Ratio**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#asratiolayoutspec)`을 이용하면 된다.

*   프로필은 항상 좌측 상단에 위치해야한다.

: 좌측상단이니 `[AS**Relative**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#asrelativelayoutspec)`을 이용하는 방법도 있고, `[AS**Absolute**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#asabsolutelayoutspec)`을 이용해서 layoutPosition을 잘잡아주는 방법도 있다. 물론 둘다 신경쓰고싶진 않고 아직 익숙하지 않으신 분들은 `[AS**Inset**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#asinsetlayoutspec)`을 이용하는 대신 insets bottom값을 .infinity로 주면 된다.

하지만 주의사항은 .infinity로 잡았는데 **부모 노드 레이아웃을 벗어나게 되면 크래시**를 일으킵니다.

*   말풍선 꼬리는 말풍선의 상단기준으로 15.0 pt 하향해야한다.

:이것도 `[AS**Inset**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#asinsetlayoutspec)`을 이용해서 Layout을 잡을 수도 있지만 하단에 .infinity를 주는 위험성이 있기때문에 차라리 나중에 재사용이라도 할 수 있게 `[AS**Absolute**LayoutSpec](http://texturegroup.org/docs/layout2-layoutspec-types.html#asabsolutelayoutspec)`을 이용해서 layoutPosition만 15.0pt하향시키면 됩니다. _(참고: layoutPosition 타입은 CGPoint입니다.)_

*   Engage(하트 버튼)은 우측하단에 위치하되 우측과 하단의 마진은 5.0pt정도 가진다.

: 앞서 말한 것들을 이해하셨으면 이거 또한 문제는 없을 겁니다.

이렇게 하면 전반적인 Layout 설계는 끝이난다.

익숙해지다보면 오히려 아래와같은 것들을 탈피하고 생산성을 올릴 수가 있다.

*   Xib상에서 Constraints 를 이용해서 파스타 만들기
*   아예 Programatics UI를 기본으로 SnapKit로 Constraints 설계
*   에니메이션이나 변화요소가 필요해서 위에 언급한 내용 둘 다 섞는 경우(제일 끔찍하다.)

Texture Best Practice #2는 여기까지 정리를 마치도록 하겠습니다.

다음 편에서는 위와 같은 UI를 토대로 해서 FlexBox개념과 노하우에 대해서 다뤄보도록 하겠습니다.

읽어주셔서 감사합니다.