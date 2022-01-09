---
title: Hello Knot
description: >-
  최근 클린 아키텍처 한글번역판이 나와서 열심히 읽으면서 앞으로 어떤 라이브러리를 만들어서 iOS커뮤니티와 세상?에 기여를 해볼까 수 많은
  고민을 해봤었습니다.
date: '2019-08-23T01:08:50.548Z'
image: "images/blog/0__ZyM3mDA67vy6eboU.png"
tags: ["ios"]
categories: ["iOS"]
---

![](/images/blog/0__ZyM3mDA67vy6eboU.png)

[**클린 아키텍처**  
_"살아있는 전설이 들려주는 실용적인 소프트웨어 아키텍처 원칙"소프트웨어 아키텍처의 보편 원칙을 적용하면 소프트웨어 수명 전반에서 개발자 생산성을 획기적으로 끌어올릴 수 있다. 《클린 코드》와 《클린 코더》의…_book.naver.com](https://book.naver.com/bookdb/book_detail.nhn?bid=15303798 "https://book.naver.com/bookdb/book_detail.nhn?bid=15303798")[](https://book.naver.com/bookdb/book_detail.nhn?bid=15303798)

최근 클린 아키텍처 한글번역판이 나와서 열심히 읽으면서 앞으로 어떤 라이브러리를 만들어서 iOS커뮤니티와 세상?에 기여를 해볼까 수 많은 고민을 해봤었습니다.

요 몇년간 RxSwift가 국내에서 흥행 하면서 사용하는 회사들도 많이 늘어나고 있고 수 많은 여러 관련 라이브러리들이 쏟아져나왔다. 예를 들면, ReactorKit같은 훌륭한 프레임워크같은 것들.

필자는 RxSwift좋아하고 Texture 관련된 여러 테크닉들도 연구하고 있는 상황속에서 여러가지 시도 끝에 일주일전 **Knot**이라는 라이브러리를 배포하게 되었습니다. (짞짞짞)

![](/images/blog/1__XAAvK3qzu8VaYGxcClocWw.png)

ReactorKit 쓰면 되지 라는 의문도 스스로에게 피드백 해보기도 했는데, 몇 년전 RxCocoa-Texture를 이용해서 Node의 UI Components properties에 bind하면서 한가지의 잘못된 부분을 발견했었습니다.

![](/images/blog/1__D__KEJhnPDdWYArWtaqbfdw.png)

binding 과정에서

*   setNeedsLayout을 지나치게 남발하고 있지않은가?,
*   보일러플레이트를 쓰고 있는게 아닌가?
*   디버깅하기가 쉽지 않았다. debug operator를 써줘야한다.
*   예측하기가 쉽지는 않다.

> 사실 위의 코드는 세상 아무일 없다는 듯이 매우 잘 동작한다.

물론 위의 경우 다음과 같은 장점은 있을 수가 있다.

*   중복에 대한 처리
*   다양한 Rx operators을 자유롭게 쓸 수 있음 (장점인진 모르겠음)
*   etc…

반응형 노드를 만들다 보면 노드와 1:1 로 Reactor 를 만들던가 아니면 유사한 동작을 하는 ViewModel을 만들게 됩니다.

하지만, 현실은 항상 변화하는 기획과 UI Design spec, 비즈니스 로직들에 비해 매우 짧은 생명주기를 가지는 게 UI영역이지 아니한지?

필자는 ViewModel이 많은 일을 하기를 바라지 않고, ViewModel내에서 여러 Repository나 Service들과 함께 공존하기를 바라지 않는 않습니다.

> 나중에 코드 덜어낼 때 맴찢

따라서 ViewModel은 View와 1:1로 매칭되더라도 생산성과 개발의 편의성, 용이성을 위해 아래와 같은 조건들을 가져야 한다고 생각합니다.

*   빠른 생산성
*   UI Component 의 재사용성
*   ViewModel은 UI Components 제어에 직접적으로 필요한 프로퍼티만 가진다. (hidden, show, title, description, imageURL etc..)
*   예측 가능해야한다.
*   비즈니스 로직들과 분리가 가능해야하며, 엔터티를 직접적으로 건들여서는 안된다.

![](/images/blog/0__ZyM3mDA67vy6eboU.png)

위의 그림을 보면 UI와 Controller는 분리되어있다. 보통 iOS 첫시작하면 MVC패턴을 주로 활용하게 되는데, 이러한 Controller 가 Massive해지는 경향이 커지다 보니 MVVM이나 다른 수 많은 아키텍처와 프레임워크들이 나오기 시작했습니다.

Texture를 사용한 개발자는 알다싶이 UIViewController가 아닌 UIViewController subclass형태 및 제네릭형태로 ASDisplayNode 및 subclass를 base로 하는 **ASViewController<DisplayNodeType>** class가 있다는 걸 알 수 있을 겁니다.

#### 1\. ViewController와 View 정리하기

우선, 최대한 UI가 해야하는 일들을 전적으로 Node에다 맡기는 방법으로 리펙토링하면

before:

class VC: ASViewController<ASDisplayNode> {

  let targetNode = ASDisplayNode()

}

after:

class TargetNode: ASDisplayNode {

}

class VC: ASViewController<TargetNode> {

}

위의 코드와 같이 변경하게 되면 이점음

*   ViewController는 단순 presenter과 node간의 브릿징 역할을 하게 됌
*   Scene의 LifeCycle과 이외 요소들에 좀 더 집중할 수 있게 됌 (viewWillAppear, viewWillDisappear etc)

그러면 다음과 같은 파일 구조를 가지게 될 겁니다.

![](/images/blog/1__DspHDYcOeaxR__COGYH5UIA.png)

Adapter에 Controller와 Presenter가 있으며, View dir에 노드들이 있습니다.

> 도메인도 정리하긴 해야하는데.. 이건 이번글에서 다룰 부분은 아니니 패스

위와 같은 형태에서 노드(뷰)들은 외부에서 재사용 할 수 있으며 버려지더라도 Domain은 UI영역에 대해서 완벽히 분리되며, Adapter는 사용하는 View의 상태값에 대한 타입만 바꿔주면 언제든 다시 재사용 할 수가 있을 껍니다.

> (사실 여기에 대해서 앞으로 좀 더 개선해서 다룰 예정입니다.)

#### 2\. Knot State와 update method

우선 Node에 Knotable을 상속받고 KnotState를 상속받은 State struct을 만들어줍니다. KnotState 를 상속하는 이유는 default 상태값을 지정하기 위함입니다. static defaultState: method를 작성하라고 알려줄껍니다.

![](/images/blog/1__2nXtkoZiwUElAjFor__r__Ww.png)

그리고 Knotable의 State를 지정하면 아래와같이 update:state method를 정의해라고 말해줄껍니다.

![](/images/blog/1__9xzkB9b3DokEuwmLDHoZQA.png)

이전 RxCocoa-Texture와 같이 직접적으로 setNeedsLayout을 위한 보일러 플레이트 코드를 쓰실 필요도 없고 setNeedsLayout을 직접적으로 호출하실 필요가 없습니다. 정말 UI Components의 상태값만 지정해주며, Then 디펜던시가지고 갈까 고민하다 그냥 ASDisplayNode 및 subclass를 위한 update block 을 제공했습니다.

자세한 건, 아래의 코드(Knotable.swift)를 통해 확인가능합니다.

![](/images/blog/1__j3IEFpWqC95BFze6TBEQrA.png)

#### **3\. Sink**

비즈니스로직에 따라 만들어지진 규칙들을 바탕으로 프레젠터에서 State를 만들게 되면 이것을 View(노드)에 적용을 해줘야합니다.

이러한 역할을 하는 method가 Sink입니다.

![](/images/blog/1__e3uO0I5f0yx7Pibgp63w8w.png)

Sink는 setNeedsLayout을 포함하지않고 단순히 node에 state값만 반영해줄 뿐입니다. 필요에 따라서 sink후에 setNeedsLayout 또는 이외 Transition API를 활용하여 Re-layout할 수가 있습니다.

#### 4\. Pipe & Stream

그렇다면 Observable을 binding할 수는 없을까?

물론 Knot는 이러한 부분도 제공해준다. 좀 더 편의를 위해서 [Knot+Convenience.swift](https://github.com/GeekTree0101/Knot/blob/master/Knot/Classes/Knot%2BConvenience.swift) 에서 좀 더 쉬운 pipe라는 method를 제공해준다.

![](/images/blog/1__xgNsmx56ESV1oAPpNSttiw.png)

pipe가 받는 파라메터는 Knotable를 상속받은 노드이며 해당 노드의 상태값에 대한 Observable Event 를 받습니다.

동작 플로우는 다음과 같습니다.

이벤트 -> update: -> setNeedsLayout or layoutIfNeeds

내부적으로 setNeedsLayout을 호출하기 때문에 크게 신경 쓰지 않아도 됩니다. 하지만, Transition(animation) 이 필요한 경우라면 subscribe: 후 sink + transition API 를 사용하기를 권장합니다. (개선예정)

stream은 말그대로 stream이며 pipe보다 하위개념으로 사용됩니다.

bind method와 stream을 합친것이 pipe이며 stream을 사용하게 된다면 다음과 같이 사용할 수 있습니다.

Observable.just(State.init(...)).bind(to: node.stream)

#### 마무리

두서없이 쓰기는 했지만 필자가 하고싶은 말을 정리하면 다음과 같습니다.

*   ViewModel도 멍청해야합니다. 똑똑해야 한다면 프리젠터가 똑똑해야하고 재사용가능해야합니다.
*   나뭇잎(뷰)의 라이프사이클은 짧고 뿌리(도메인과 비즈니스로직)는 깊습니다.
*   반응형 뷰(노드)는 예측이 가능해야하며 읽기 쉽고 디버깅이 용이해야합니다.

이 외에 상세한 API Guide는 [README.md](https://github.com/GeekTree0101/Knot/blob/master/README.md) 에 있으며, 많은 컨트리뷰트와 이슈 참여 부탁드립니다. :)