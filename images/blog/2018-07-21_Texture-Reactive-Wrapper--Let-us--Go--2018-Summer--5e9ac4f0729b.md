---
title: 'Texture Reactive Wrapper [Let us: Go! 2018 Summer]'
description: '본 게시물은 Let us: Go! 2018 summer 발표내용을 정리한 게시물 입니다.'
date: '2018-07-21T11:31:54.736Z'
categories: []
keywords: []
slug: /@h2s1880/texture-reactive-wrapper-let-us-go-2018-summer-5e9ac4f0729b
---

> 본 게시물은 Let us: Go! 2018 summer 발표내용을 정리한 게시물 입니다.

![](/images/blog/1__NoJIyovj1__Y__olNgqv06ug.png)

세션은 크게 3가지를 목표로 합니다.

1.  Texture를 처음 접하시는 분들을 위한 기초적인 내용
2.  Texture 실제 프로덕트 적용사례
3.  Texture x RxSwift 콜라보레이션

![](/images/blog/1____SRQnGUMLKORQhqSCaiLsA.png)

Texture는 UIKit를 Base로한 iOS UI Framework로써

Texture 고유의 특수한 메커니즘을 통해서 부드럽고 반응성 좋은 UI결과물을 보여줍니다. 또한, UIKIT에서 부족하거나 필요한 부분까지 다루고 있는 [라이브러리](http://texturegroup.org/docs/getting-started.html)입니다.

ex) [Text뒤에 붙는 more 같은 터치가능한 Text](http://texturegroup.org/docs/getting-started.html), [Progressive Image loading,](http://texturegroup.org/docs/network-image-node.html) [Placeholder](http://texturegroup.org/docs/placeholder-fade-duration.html) 등등.

![](/images/blog/1__mvzQF4NNTLxfnyLN7sc4xg.png)

Texture는 UIKit위에 Node라는 객체를 올려놓은 구조로써 Node에서 view property접근 하시면 UIView 및 해당 subclass 를 접근할 수가 있습니다.

![](/images/blog/1__W91jhdMbnwsVuLcQ__f__rmA.png)

서브 클래스는 ASDisplayNode를 기점으로 위의 사진과 같이 구성되어 있습니다. 자세한건 [여기](http://texturegroup.org/docs/subclassing.html)

간단히 ASDisplayNode를 이용해서 subclass를 만들면 다음과 같이 기본적으로 구성해서 코드를 작성합니다.

![](/images/blog/1__DxrxUhcdbxckZ8S9ftfYaw.png)

1.  서브클래스를 정의합니다.
2.  해당 Node에 필요한 자식 Node들을 정의 합니다.
3.  init을 합니다. 특히 automaticallyManagesSubnodes를 true한 것은 addSubView와 같은 addSubnode를 일일이 작성하는 것에 대한 번거로움을 피하기 위함입니다.
4.  didLoad는 실제로 객체가 Load된 시점에 호출이 되는데 여기선 Main-Thread를 통해 접근하므로 GestureRecognizer나 다른 MainThread에서 수행하야하는 기능을 수행하면 됩니다.
5.  layoutSpecThatFits은 Layout 설계를 담당하는 메서드로 Texture는 Constraints를 쓰지않고 제공해주는 우수한 기본적인 LayoutSpec을 이용해서 UI레이아웃을 설계합니다. 여기서는 MainThread에서 다뤄지는 기능들을 동작 시켜서는 안됩니다.

Texture의 장점들을 정리해보았습니다.

#### 1\. Thread Safe

: Texture는 Thread 사용에 대해서 엄격하기 때문에 잘못된 Thread사용을 사전에 막아줍니다.

![](/images/blog/1__7T3V5lRh0FQUX__bsj__03OA.png)

#### 2\. Expensive UI operations off the main thread

이미지 디코딩, 텍스트 사이징 등등과 같은 작업들을 최대한 MainThread에서 동작하지 않도록 설계되어 있습니다

또한 내부적으로 UI객체에 대한 [조합 또는 파괴 메커니즘](http://texturegroup.org/docs/asrunloopqueue.html)이 있기때문게 어떠한 무거운 UI라도 60fps안에 표현해낼 수가 있습니다. 뿐 만아니라 UI가 그려지는 단계를 [3가지로 나눠서 각각 상태에 따라 역할을 효율적으로 수행](http://texturegroup.org/docs/intelligent-preloading.html)합니다.

![](/images/blog/1__R6hKCRoD5KcZl__D5aKe3cw.png)

> 비교영상은 발표 동영상 참고해주시기 바랍니다.

#### 3\. Constraints 지옥 탈출

![](/images/blog/1__e__8JV3h__7TXEJhplQs6M0A.png)
![](/images/blog/1__kdatY5vulrUU8PUvo5v83w.png)

Xib의 단점을 우선 정리하자면

1.  코드리뷰가 힘듦
2.  새로운 UI추가시 다른 UI들의 의존 관계를 파악해야되서 쉽지가 않음
3.  UI가 깨지기 쉬움(실수하기가 쉬움)
4.  마우스를 많이 써야되서 손목?이 아픔
5.  완전 단순한 UI가 아닌이상 유지보수하기도 힘들고 생산성이 떨어짐

제일 핵심적인건 생산성와 협업(코드리뷰)라고 보시면 되겠습니다.

그렇다면 Texture를 이용했을 때는 생산성이 정말 뛰어난지 보도록 하겠습니다.

![](/images/blog/1__ellu3yFHEbKjF5vg7ZGJfg.png)

텍스쳐는 위와 같이 UI에 필요한 핵심적이고 가장 기본적은 [LayoutSpec 9종](http://texturegroup.org/docs/layout2-layoutspec-types.html)을 제공해줍니다. 필요에 따라 커스텀하게 만들 수도 있습니다.

우선 Layout설계나 FlexBox 에 대한 부분은

[**Texture Best Practice #3**  
_Texture Best Practice #3 iOS개발자가 FlexBox 를?_medium.com](https://medium.com/@h2s1880/texture-best-practice-3-eef064094f06 "https://medium.com/@h2s1880/texture-best-practice-3-eef064094f06")[](https://medium.com/@h2s1880/texture-best-practice-3-eef064094f06)

[**Texture Best Practice #2**  
_Texture Best Practice #2 LayoutSpec 기초 및 노하우_medium.com](https://medium.com/@h2s1880/texture-best-practice-2-7259bde869ee "https://medium.com/@h2s1880/texture-best-practice-2-7259bde869ee")[](https://medium.com/@h2s1880/texture-best-practice-2-7259bde869ee)

위의 2개 게시물을 참고하시는게 더욱 효과적입니다.

![](/images/blog/1__stO8MKT1cxbv55HB0nraNQ.png)
![](/images/blog/1__3yGzrTr__E8aGdBI2XMA6cw.png)

좌측과 같이 LayoutSpec을 정의하고 우측과 같이 FlexBox 값을 수정하면 코드는 아래와 같습니다.

![](/images/blog/1__ZIHNqK8vHtCwQh__GjqLAfA.png)

위의 코드상태에서 장점은 다음과 같습니다.

1.  유지보수: 어떠한 새로운 UI가 추가되더라도 Constraint를 다시 연결하는 번거로움 없이 체계적이고 구조적으로 추가가 가능합니다.
2.  가독성: 순수 코드로 썼기 때문에 Xib에 비해서 가독성이 뛰어납니다.
3.  재사용성: 이러한 LayoutSpec을 공용 LayoutSpec으로 잘 관리만 해줘도 플랫폼의 새로운 기능을 추가할 때 재사용하거나 다른 UI에 이식하기가 쉽습니다.
4.  완벽한 코드리뷰: 위의 가독성과 겹쳐지지만 코드가 상대적으로 가독성이 뛰어나기 때문에 협업하거나 상대개발자의 실수를 찾는데 상당히 도움이 됩니다.

통들어서 생산성이 좋다고 할 수 있겠습니다.

#### 4\. 기존 UI재사용성, UIView -> Node (Wrapping)

이왕이면 Node로 순수하게 만드는 것도 좋으나 불가피하게 UIKit로 순수하게 만들어진 UI써야 되는 경우가 있습니다. 대표적으로 Facebook Audience 라이브러리에서 제공하는 FBMeidaView와 같은 경우죠.

![](/images/blog/1__6PK5KTLgp5vTY1PbyoXj2Q.png)

Texture는 View or Layer를 Node로 Wrapping해서 쓸 수 있도록 도와줍니다.

![](/images/blog/1__YR3GaPPaMlPgbWhtq7kI1A.png)

위와 같이 viewBloack으로 init하되 view만 return해주면 끝입니다.

자세한건 여기 [참고](http://texturegroup.org/docs/display-node.html)해주시면 좋습니다.

참고로 view property접근하면 UIView 타입으로 return 하는데 이거 해당 UI Class이름으로 as? 옵셔널 타입캐스팅해서 접근하시면 되겠습니다.

![](/images/blog/1__lBoqDsOcECz8hJgF7dTImw.png)

현재 Vingle의 Texture사용하는 스크린 비율은 약 80%이상을 차지하고 있으며 아래와 같이 복잡하고 다양한 UI를 그려낼 수 있습니다.

![](/images/blog/1__U25OKcKmXV9jrE9V__DdWqw.png)

이 정도가 기초적인 과정이고 이 다음 부터는 Rx기술도 같이 사용되기 때문에 다소 난이도가 어려울 수도 있겠습니다.

[**ReactiveX/RxSwift**  
_RxSwift - Reactive Programming in Swift_github.com](https://github.com/ReactiveX/RxSwift "https://github.com/ReactiveX/RxSwift")[](https://github.com/ReactiveX/RxSwift)

![](/images/blog/1__lv31ojJij11NXtfYSteH4g.png)

반응형 Wrapper를 어떻게 만드냐인데 쉽게 말해서 Texture도 RxCocoa에서 기본적으로 제공해주는 Reactive Wrapper처럼 쓸 수 있냐는 겁니다.

![](/images/blog/1__nzKpd9qCVem2FjWZIGMGXg.png)

아쉽게도 회색에 해당하는 서브클래스들은 기존 RxCocoa에서 제공해주는 Wrapper를 쓸 수가 없습니다 이유는 아래와 같습니다.

![](/images/blog/1__WnUK4aSo2__TfvHuZzFarHA.png)

view property가 UIControl이 아닌 UIView로 가지고 있다는 점입니다.

즉, 아래와 같이 RxCocoa에서 제공해주는 Reactive Wrapper를 사용할 수가 없다는 겁니다.

![](/images/blog/1__7zQ2EwrQqx9PoKVLBJLJ2Q.png)

그럼 직접 만들어야 되는데 발표 전에 실험용으로 게시했던 글이 있었습니다.

[**Texture + RxSwift Interactive Wrapper**  
_How to make RxSwift Interactive wrapper for Texture?_medium.com](https://medium.com/@h2s1880/texture-rxswift-interactive-wrapper-d3c9843ed8d7 "https://medium.com/@h2s1880/texture-rxswift-interactive-wrapper-d3c9843ed8d7")[](https://medium.com/@h2s1880/texture-rxswift-interactive-wrapper-d3c9843ed8d7)

이거는 콩글리쉬로 쓰여졌기때문에 좋지 않습니다.

![](/images/blog/1__9GFznt7x1W5LRMExUUEiEw.png)

우선 Control스펙을 보면 UIControl과 ASControlNode의 addTarget가 행위는 같으나 인자 값이 다른 걸로 봐서 같이 공존 할 수 없다는 것을 확인 하실 수가 있습니다.

우선 ASControlNode의 rx 로 접근했을 때 터치이벤트에 대해서 동작하기 위해선

GestureTarget과 같은 RxTarget이 필요합니다.

![](/images/blog/1__dN7Kz6PaqoQ6__eo6Ou8GnA.png)

여기서 간단히 말씀 드리자면

init에서 addTarget 넣어주고 이벤트에 따라서 event가 잘 흐르겠끔 eventHandler와 selector를 잘 정의 해줍니다.

마지막으로 dispose될 때 removeTarget이 되게 설계가 되어있는데

위와 똑같이 ASControlNode도 RxTarget을 만들어 주시면 되겠습니다.

![](/images/blog/1__5i6TvyhMbMXeTJfZF29ORg.png)

그리고 이것을 ASControlNode를 Base로 한 Reactive extension을 구현합니다.

![](/images/blog/1__HM0fgTsSuVPM4lXKQip__kQ.png)

tap은 event에서 받아와서 처리해도 되지만 발표문이기 때문에 형식적으로 만들었다는 점 양해 부탁드립니다.

따라서 위와같이 RxCocoa에서 기본으로 제공해주는 Wrapper와 같은 기능을 완성하였습니다.

[**GeekTree0101/GTTexture-RxExtension**  
_GTTexture-RxExtension - Texture RxSwift Interactive Wrapper base on ASControlNode_github.com](https://github.com/GeekTree0101/GTTexture-RxExtension "https://github.com/GeekTree0101/GTTexture-RxExtension")[](https://github.com/GeekTree0101/GTTexture-RxExtension)

따라서 위와 같이 실험용으로 정리한 Repo가 있으니 들어가시는 겸 Star 찍어주시면 감사하겠습니다.

그럼 위에서 만든 Wrapper를 한번 응용해보겠습니다.

![](/images/blog/1____S2__7vCmFZAxl6XY5HyHMQ.png)

위의 사진을 설명하자면 사용자가 imageView를 터치하면 API를 통해서 url받아온후 setURL method를 통해서 image를 decoding해서 보여주는 겁니다.

그 전에 간단히 setURL을 해주는 Base를 [ASNetworkImageNode](http://texturegroup.org/docs/network-image-node.html)한 Reactive extension을 만들면 다음과 같습니다.

![](/images/blog/1__oCG__f67__VTTqd6biyCjgyQ.png)

따라서 위에서 만든 Binder와 Reactive Wrapper를 적절히 사용하면 아래와 같은 코드로 표현 할 수 있습니다.

![](/images/blog/1__9GUF6S4d9FSRAoFQuMqj1A.png)

여기서 문제점은 UI가 복잡해질 경우인데 예를 들어보도록 하겠습니다.

![](/images/blog/1__5UAublmcjI4dtPUoGDHVdw.png)

위와 같은 UI에는 다양한 비즈니스 로직들이 subscrbie / bind 되어 있습니다.

목록은 우측과 같이 다양합니다.

Rx는 말 그대로 비동기작업을 하기 때문에 UI가 Observer의 값의 변화에 따라서 layout이 달라지고 data가 바뀌면서 부모뿐만 아니라 형제 Node의 Layout에 영향을 줍니다.

이럴 땐 Texture에서 권장하는 방식은 해당 노드의 상위 노드에 setNeedsLayouts 호출 해주는 것을 권장합니다.

Texture는 내부적으로 [ASRunLoopQueue](http://texturegroup.org/docs/network-image-node.html)라는 게 있어서 기본 NSRunLoop를 더욱 효과적으로 최대한 많이 돌아가게 해줍니다.

즉, 기존 UIKit와 일량은 같지만 최대한 효율적으로 일을 분배해서 처리시켜서 퍼포먼스를 끌어 올림과 동시에 내부적으로 Layout을 효과적으로 rendering 해서 setNeedsLayout 를 많이 불러도 퍼포먼스에 큰 악 향을 끼치지 않겠습니다.

따라서 아래와 같이 bind를 포기하고 subscribe으로 처리해서 할 수도 있겠으나

![](/images/blog/1__w2jKUWO00z1ZK99vX__6RFw.png)

코드만 난잡해보이므로 Texture에 대한 특수한 Binder를 만들기로 했습니다.

![](/images/blog/1__3OwaMi__ij82dYOf__qPqAAg.png)

기존 Bind의 스펙은 위의 사진과 같습니다. bind에 보시면 observer를 subscribe하여 이벤트가 발생시 상단에 on method를 통과한다고 보시면 되겠습니다.

여기서 저희가 필요한건 해당 부모노드나 상대 노드를 setNeedsLayout을 binding이후에 동작시키기 위해선 ASDisplayNode 가 들어가는 parameter가 필요하겠습니다. 물론 Optional로 처리해주는것이 좋겠습니다. (필요없을 수도 있으니깐 말이죠)

![](/images/blog/1__GmhQARlS8__Pq__C6PNaYRrA.png)

따라서 위와 같이 ObserverType를 ASObserverType이라는 sub-protocol를 만들고 ObservableType에 node가 들어가는 bind를 설계해주겠습니다.

위에 보면 event에서 .next 이벤트 발생시 ASObservableType의 on메서드를 호출하는 것을 보실 수 있겠습니다.

![](/images/blog/1__ZvQNkxOahmdzhaidhEFusg.png)

그리고 기존 Binder도 binding이후에 node를 setNeedsLayout호출시켜주기 위해서 ASBinder를 만들도록 하겠습니다.

![](/images/blog/1__gSY__p__0P617C4Kyq3ytviw.png)

큰 차이는 없고 class name과 새로 추가된 parameter가 다 입니다.

그리고 binding 다음 라인에 보시면 setNeedsLayout을 호출하시는 부분을 보실 수가 있고 따라서 아래의 그림과 같이 동작한다 보시면 되겠습니다.

![](/images/blog/0__9pwU8BkljreIM0pr.jpg)

따라서 setNeedsLayout을 호출하면 필요에 따라서 layoutThatFits method를 호출하게 되고 layout을 비동기적으로 재구성하게 되겠습니다.

마지막으로 앞에서 예시로 들었던 코드에 기능을 추가하면 다음과 같이 되겠습니다.

![](/images/blog/1__DfAANgrPg__Gh66jpUFRWvw.png)
![](/images/blog/1__nmhAk7bQ473M2Un__E0QgBw.png)

궁금하신 점 있으시면 Texture Slack에 오셔서 general 또는 저에게 개인 슬렉 주시면 언제든 답변 드리겠습니다. (상시대기)

[https://asyncdisplaykit.slack.com](https://asyncdisplaykit.slack.com/messages/C0V63R86T/convo/C0V63R86T-1532045112.000153/)