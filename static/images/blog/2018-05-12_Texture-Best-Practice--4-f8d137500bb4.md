---
title: 'Texture Best Practice #4'
description: Texture를 사용하면서 주로 실수하는 부분과 노하우
date: '2018-05-12T06:38:07.192Z'
categories: []
keywords: []
slug: /@h2s1880/texture-best-practice-4-f8d137500bb4
---

![](/images/blog/1__UcCDylxc8OWrH__ICMEAFVg.png)

#1, 2, 3 을 차근차근 숙지하시고 진행하신 분들이라면 필자가 체감으로는 이제 제법 나름 괜찮은 UI를 어느정도 만들줄 알거라고 생각합니다.

이전 #3에서 예고했던대로 이번 포스팅에서는 Texture를 사용하면서 주로 개발자들이 실수하는 부분과 노하우에 대해서 정리하고자 합니다.

물론 Texture Slack활동하면서 받았던 문제점들도 같이 다뤘습니다.

#### Q: ASTextNode에서 텍스트가 길 경우 화면을 초과해버려요 ㅠㅠ

A: 최근 우리회사 신입개발자가 처음 Texture를 학습하고 프로덕트를 개발하는 과정에서 발견했었던 문제중 자주 접했던 문제이며, Texture 커뮤니티에 주니어 개발자들이 주로 질문했던 내용이다.

물론 TextNode에만 국한 된것뿐만 아니라 다른 Node를 이용했는데 화면에 딱 안들어오는 UI가 rendering되는 경우를 종종 접한다고 한다.

이러한 현상의 가장 근본적인 문제점은 FlexBox를 제대로 이용하지 않은 점이주 원인이라고 말씀드리고 싶습니다.

따라서 예시와 함께 설명하도록 하겠습니다.

![](/images/blog/1__pG5__LvIp1iQTKTEX1CLDcw.png)

어느 플랫폼에서든 쉽게 접할 수 있는 가장 기본적인 UI를 준비했는데요, 간단히 이런 UI를 개발한다고 합시다.

Profile과 설명문, 그리고 버튼으로 구성되어 있습니다.

하지만 주니어 개발자들이 실수했을 때 모습은 다음과 같습니다.

![](/images/blog/1__I80gKX__pY__D__bF6pDNukCg.png)

옆의 사진과 같이 더보기 버튼은 화면을 초과해버리고 설명문은 워낙 긴 나머지 화면을 뚫고 나가버리는 현상생겨버립니다.

그래서 제가 코드를 확인해봤는데요. 아래와 같습니다.

처음에 Profile과 Description 을 Stack으로 잡고 또 Stack으로 잡은 것 button과 함께 spacebetween으로 해서 stack을 만든후 상하좌우로 margin값을 준것을 반환해주는 것을 확인 할 수가 있습니다.

주니어개발자들은 [Texture Docs](http://texturegroup.org/docs/automatic-layout-examples-2.html)을 따라서 저렇게 만들었을 뿐인데 UI가 깨지다니 …

직설적으로 한마디하자면, 앞서 말했듯이 위의 코드는 FlexBox 개념을 제대로 이해하지 않은 상태로 코드를 작성했다고 봐야됩니다.

그럼 어떻게 해결하는지 확인해봅시다.

![](/images/blog/1__bkMiXpOD51i01__dJP4pjPQ.png)

우선 위의 사진과 같이 녹색 영역(StackLayout)의 flexShrink를 1.0정도 줘야합니다. (default는 0.0입니다.) 따라서, 아래의 코드와 같습니다. (line 10 참고)

그러면 더보기버튼과 상대적으로 Shrink값이 높기 때문에 상대값에 따라서 녹색영역이 줄어들게 됩니다만…

![](/images/blog/1__9swNIogWIp2mhtWr0Jnv8w.png)

물론 Stack 영역은 줄어들어서 더보기버튼이 보이는건 확인하였으나 여전히 Description은 화면을 초과한 것을 확인할 수가 있습니다.

이 또한 FlexBox를 제대로 쓰지않았기 때문입니다.

![](/images/blog/1__wVOyxc3f3EMk2t6sas1__4g.png)

따라서 위의 사진과 같이 녹색 박스(Description)에도 FlexShrink를 1.0정도 줘야됩니다. 그러면 상대적으로 Profile에 비해 Shrink값이 높기 때문에 늘어나지 않게 됩니다. 코드는 아래와 같습니다. (Line 11 참고)

![](/images/blog/1__N01l1bv7KY8dQCWm24qw7A.png)

드디어 원하는 UI가 완성이 되었군요. 필자의 경우 애초에 Node를 만들때 Flex값을 주거나 혹은 필요에 따라서 layoutSpecThatFits: method 내에서 처리하는 편입니다.

연습이 더 필요하신 분은 [https://yogalayout.com/docs/flex](https://yogalayout.com/docs/flex) 해당 링크를 통해서 더 자세히 다룰수가 있습니다.

#### Q: addSubnode했는데 Node가 안붙어요..

A: [#1](https://medium.com/@h2s1880/texture-best-practice-1-4d830a7ff11b)에서 언급했던 내용중 automaticallyManagesSubnodes 이걸 true로 했을 때 LayoutSpecThatFits에서 알아서 layoutspec에 따라서 다뤄지는 node에 대해서 addSubnode를 해줍니다. 일일이 addSubnode를 해주면 layoutSpec설계 하는 과정에서 해당 node를 빼먹는 실수도 많아 질 뿐더러 유지보수 하기도 쉽지 않습니다. automaticallyManagesSubnodes 를 기본으로 true로 시작하고 합시다.

#### Q: UIGestureRecognizer(Pan, Swipe, Longpress etc) 를 사용했는데 동작하지 않거나 Main Thread Crash가 나요.

A: 필자가 [#1](https://medium.com/@h2s1880/texture-best-practice-1-4d830a7ff11b)에서 강력하게 강조했던 것이, view property를 접근해서 사용이 필요할때는 Main Thread에 주의해야 할 필요가 있다고 언급한적이다. (UIKit는 Thread에 엄격하지 않고 Texture는 이러한 점을 보완하기 위해서 Thread에 엄격하게 설계 되어 있다.)

따라서 Main Thread에 접근이 필요한 모든 경우는 didLoad: override method에서 처리하는게 좋습니다.

*   Shadow를 추가하는 경우
*   UIGestureRecognizer를 사용하는 경우
*   어찌됬든 view property를 접근하는 경우.

따라서 UIGestureRecognizer를 사용할 때 일반적으로 여러분들이 사용하는 방법대로 하되, didLoad내에서 설계해주는게 바람직합니다.

let panne = UIPanGestureRecognizer()

override func didLoad() {  
    super.didLoad()  
    self.view.addGestureRecognizer(panne)  
    panne.addTarget(self, action: #selector(move:\_))  
}

#### Q: 가끔 간헐적으로 Thread Affinity Crash가 나요.

A: 해당 크래시의 경우 필자도 가끔 의문스러운 부분이다. 우선 ASDisplayNode+UIViewBridge.m 에서 가장 기본적인 **isHidden Property** 스펙을 보면 다음과 같다.

\- (BOOL)isHidden   
{  
  \_bridge\_prologue\_read;  
  return \_getFromViewOrLayer(hidden, hidden);  
}

\_brige\_prologue\_read 라는 것을 확인할 수가 있는데 이것은 아래와 같이 정의 되어있다.

#define \_bridge\_prologue\_read ASDN::MutexLocker l(\_\_instanceLock\_\_); ASDisplayNodeAssertThreadAffinity(self)

바로 **Affinity Thread Crash**를 일으키는 주범이 이것인데 이게 어떻게 하면 크래시가 나느냐면 대표적으로 이런 경우이다.

layoutSpecThatFit:에서 isHidden을 사용해 분기문을 작성하여 layoutSpec을 다르게 해주는 경우 즉, layoutSpec은 backgroundThread에서 동작하는데 background thread에서 isHidden을 접근했고 \_brige\_prologue\_read 가 호출됨과 동시에 ASDisplayNodeAsserThreadAffinity가 발생한 것이다. 물론 운이 좋으면 해당 크래시를 피하는 경우도 있다.

물론 이러한 부분을 상세하게 [http://texturegroup.org/appledocs.html](http://texturegroup.org/appledocs.html) api docs에서 다루지는 않으나, 코드로는 명확하게 작성되어 있으니, 주니어 개발자분들께서는 약간 수고스럽겠지만 어떠한 프로퍼티를 사용시 해당 프로퍼티로 이동하셔서, 이게 어떤 **Thread에 안정적인지 판단** 후 사용하시면 되겠습니다.

> 굉장히 까다롭게 느껴지시겠지만, 이게 다 프로덕트의 안정성을 위한 것이며, 이러한 점을 학습하다보면 Texture를 사용하지 않고 UIKit를 다룰 상황에서도 해당 프로퍼티 사용시 어떤 상황에서 주의를 해야하는지 학습하는데 상당히 도움이 될 것입니다.

#### Q: RxSwift를 즐겨 사용하는데 bind(to:)를 이용해서 Node의 Attribute를 업데이트 해줬는데도 layout이 간헐적으로 적용되질 않습니다.

A: Texture의 경우 어떤 Node의 Property값이 변함에 따라서 Size가 resize가 필요한 경우 setNeedsLayout를 호출해주는 것을 권장합니다. 퍼포먼스가 저하되지 않을까 하시는 분들도 있으시겠지만, 해당 method를 호출하면 background thread에서 동작하며 ASRunLoop가 기본 NSRunLoop에 비해서 유도리 있게 일하기 때문에 성능이나 퍼포먼스, 사용성에 영향을 주지 않습니다.

하지만 코드를 깔끔하게 처리해줄 수 있는 bind(to:)를 쓸 수가 없다니… 필자 또한 이러한 한계점을 느꼈고 여러 Layer의 노드들이 있는데 계속 supernode를 setNeedsLayout를 호출해주는 것도 비효율적이라고 생각했었습니다. 따라서 필자는 ASBinder라는 것을 직접 만들어서 사용하는 편입니다.

우선, 앞서 말한 문제점은 다음과 같습니다.

![](/images/blog/0__jPpyhATpaP__BnWpL.png)
![](/images/blog/0__pa0uOUcJ6OctElk__.png)

좌측은 동작 흐름을 나타낸것이고 우측은 실제 렌더링 된 화면입니다. 물론 binding이 layout이 Background Thread에서 완전 그려지기 전에 event가 발생해서 binding을 해서 property값을 업데이트 해준 경우에는 문제가 없으나. 만약 Observer의 비즈니스 로직이 무거워 질 경우에는 다음과 같은 현상이 발생합니다.

![](/images/blog/0__rFLZZOsrljK8DOsT.png)
![](/images/blog/0__HsjfAGNCmaP6Fui1.png)

이러한 경우에는 아래와 같이 해결 할 수가 있습니다.

// \*\*\* self is usernameNode supernode  
viewModel.username  
         .subscribe(onNext: { \[weak self\] text in   
            self?.usernameNode.rx.text(Node.usernameAttributes).onNext(text)  
            self?.setNeedsLayout() // Here  
         })  
         .disposed(by: disposeBag)

하지만 앞서서 말했듯이 bind:to 를 사용할 수 없다는게 안타까울 뿐이죠.

// Profile NetworkImage Node is default  
// username, description is Optional

// \*\*\* self is usernameNode supernode  
viewModel.username  
         .bind(to: usernameNode.rx.text(Node.usernameAttributes),  
               setNeedsLayout: self)   
         .disposed(by: disposeBag)

// \*\*\* self is descriptionNode supernode  
viewModel.desc  
         .bind(to: descriptionNode.rx.text(Node.descAttributes),  
               setNeedsLayout: self)   
         .disposed(by: disposeBag)

ASBinder를 사용할 경우 setNeedsLayout에 layout를 다시 설계해줘야 하는 node를 입력만 하면 끝입니다. 이후 동작은 아래와 같습니다.

![](/images/blog/0__iiKtgJXJxWlHfP3v.png)
![](/images/blog/0__XEvUfNQyDYf9sgvI.png)

[**GeekTree0101/GTTexture-RxExtension**  
_GTTexture-RxExtension — Texture RxSwift Interactive Wrapper base on ASControlNode_github.com](https://github.com/GeekTree0101/GTTexture-RxExtension "https://github.com/GeekTree0101/GTTexture-RxExtension")[](https://github.com/GeekTree0101/GTTexture-RxExtension)

위와 같이 CocoaPod 라이브러리로 배포중인 상태이며 ASBinderNode 코드 내부를 확인하시면 좋습니다.

위의 내용이 많이 길었는데, 한마디로 요약하자면 **setNeedsLayout**을 적극적으로 호출하자는 것입니다.

#### Q: Texture로 만든 Node를 다른 UIView에 붙여야 하는 상황이 있는데 이러한 경우에는 어떻게 하면되나요?

A: Texture는 기본적으로 UIKit위에 만들어진 Framework이기 때문에 view property를 접근해서 view를 가져온 후 일반적인 Constraints로 View를 구성하면 됩니다. 물론 권장하진 않지만 Texture의 이식성은 나쁘진 않습니다.

그래도 Constraints로 이식하는게 아니곱게 느껴지고 FlexBox 본질을 그대로 유지하고 싶으시면 YogaKit를 적극적으로 이용하는 것도 하나의 방법입니다.

#### Q: ASViewController 쓸 수 없는 경우가 있고 UIViewController 위에다 Texture UI를 구성하고 싶어요.

A: 앞서 말했듯이 이식성이 뛰어나기 때문에 Constraints나 SnapKit로 적당히 원하는 Node를 잡아서 사용하시면 됩니다. 필자의 경우 UIViewController 의 view 위에 backgroundNode (ASDisplayNode)를 만들어 붙인 후 backgroundNode에 필요한 Node들을 layoutSpecBlock을 이용해서 설계하는 것을 선호합니다.

*   background addSubnode (AsyncDisplayKit import시 UIView에 기본적으로 addSubnode 가 자동으로 붙게 됩니다.)
*   automaticallyManagesSubnodes = true
*   layoutSpecBlock : backgroundNode 위에 올라가게 될 Node의 LayoutSpec 설계를 위한 Block function
*   onDidLoad: MainThread로 부터 안전한 코드 동작을 위한 Block function

이번 편에서는 여기까지 마치도록 하겠습니다. 다음 편에선 마지막으로 MVVM(Model-View-ViewModel) 아키텍쳐 기반 Texture 개발방법에 대해서 설명하도록 하겠습니다.

읽어주셔서 감사합니다.

### 번외(기타):

#### Q: RxDataSource와 같은 라이브러리를 사용했었는데 Texture에서는 사용할 수가 없어서 슬프네요.

A: [https://github.com/RxSwiftCommunity/RxASDataSources](https://github.com/RxSwiftCommunity/RxASDataSources) RxASDataSource가 있네요. Texture라이브러리는 근본 없는 라이브러리는 아닙니다.

#### Q: Texture Android version은 없을 까요?

A: Litho라고 있습니다.

[**Litho**  
_A declarative framework for building efficient UIs on Android._fblitho.com](https://fblitho.com/ "https://fblitho.com/")[](https://fblitho.com/)

Litho와 Texture의 Layout 설계 방식의 근원은 YogaLayout이기 때문에 필자도 안드로이드를 전문적으로 하지 않지만은 FlexBox개념과 YogaLayout 사용 법에 대해서 근본적으로 이해하고 있는 바탕에서 Android UI개발하는데는 큰 지장은 없었습니다만, 물론 Android Intent, Fragment, Activity와 같은 기초적인 부분은 바탕이 되야겠지요?

[**GeekTree0101/GithubRepoList-Litho**  
_GithubRepoList-Litho - Github Repository List built on Litho Framework (iOS version…_github.com](https://github.com/GeekTree0101/GithubRepoList-Litho "https://github.com/GeekTree0101/GithubRepoList-Litho")[](https://github.com/GeekTree0101/GithubRepoList-Litho)

#### Q: 한국 국내에 Texture(AsyncDisplayKit)를 사용하는 회사 있나요?

A: [http://texturegroup.org/showcase.html](http://texturegroup.org/showcase.html) 쇼케이스에 여러앱들이 있는데 들록된 플랫폼 중 국내 플랫폼은 2018년 5월 기준으로 Vingle 이 있으며, 이 외에 여러 구인 앱들에서 간혹 보이기는 합니다만, 개인적으로 Vingle 강추?드립니다. [https://careers.vingle.net/#/engineering/ios](https://careers.vingle.net/#/engineering/ios) 해당링크를 통해서 지원하실 수가 있습니다.