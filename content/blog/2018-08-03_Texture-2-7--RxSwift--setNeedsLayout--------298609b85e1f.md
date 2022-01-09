---
title: 'Texture 2.7: RxSwift와 setNeedsLayout에 대한 고찰'
description: >-
  Texture 2.7에서 많은 변화가 있었습니다. iOS 11 iPhoneX safeArea를 node 어디서든 적용할 수 있게 되었을 뿐만
  아니라 전반적으로 퍼포먼스가 상향되었습니다.
date: '2018-08-03T17:05:52.105Z'
tags: ["ios", "texture", "bug"]
categories: ["iOS"]
image: images/blog/1__T8CAgDZ__c9F6E0DiFQYW6Q.png
---

![](/images/blog/1__T8CAgDZ__c9F6E0DiFQYW6Q.png)

Texture 2.7에서 많은 변화가 있었습니다. iOS 11 iPhoneX safeArea를 node 어디서든 적용할 수 있게 되었을 뿐만 아니라 전반적으로 퍼포먼스가 상향되었습니다.

하지만

Texture 2.6에서 2.7로 마이그레이션 후 프로덕트 테스트를 한 결과 치명적인 문제점을 발견하였는데 바로 아래 이슈입니다.

[**\[ASDisplayNode\] setNeedsLayout doesn't work only Texture 2.7 · Issue #977 · TextureGroup/Texture**  
_similar issue In my case, I forced setNeedLayout after textNode attributedText value with a few sec delay…_github.com](https://github.com/TextureGroup/Texture/issues/977 "https://github.com/TextureGroup/Texture/issues/977")[](https://github.com/TextureGroup/Texture/issues/977)

![](/images/blog/0__4RGACF948xouJsbY.png)

아무리 setNeedsLayout를 호출해도 layoutSpecThatFits: 에서 내려오는 constrainedSize (ASSizeRange)의 max과 min값이 변하지 않고 같은 값으로 계속 유지된다는 점이다.

그래서 해당 부분에 대해서면 집중적으로 내부 동작을 분석한 결과를 보여드리고자 합니다.

우선!

Node가 didLoad 되기 전/후로 나눠서 볼 수가 있습니다.

만약 init시점에서 어떤 Rx를 subscribe하고 onNext에서 setNeedsLayout을 호출한다고 가정합시다.

그러면 아래의 코드가 동작을 하게 됩니다.

![](/images/blog/1__TJ5bncYpUdB8NOjhX5RFIQ.png)

우선 subscribe onNext 동작시점이 Node가 didLoad되기 전/후 어느 한쪽을 확실히 보장하지 못합니다.

그러므로 didLoad 이후라면 layoutIfNeeded method가 호출 될 것이고, didLoad 전이면 \_\_layout(내부 layout api)가 호출됩니다.

결국 Texture 2.7에서 \_\_layout method에서 threadSafeBounds가 변해야지 그렇지 않으면 \_u\_measureNodeWithBoundsIfNecessary에서 원치않는 measurement 결과값이 나와 constrainedSize가 변하지 않는걸 발견 할 수가 있습니다.

![](/images/blog/1__LGr0__wh0Dguyr__OH__aQO2Q.png)
![](/images/blog/1__dwJ__sS0H6gnT__IUzawWfeg.png)

하지만 친절하게도 다음과 같은 Commit을 발견할 수가 있었다.

![](/images/blog/1__c__2S__JiZVY__fVQvcivOJkw.png)

didEnterPreloadState에서 automaticallyManagesSubnodes가 true일때 layoutIfNeeded를 호출 한다는 점입니다.

위의 주석을 해석하자면 다음과 같습니다.

> 해당 노드에 ASM(automaticallyManagesSubnodes)이 활성화되어 있으며, 아직 Visible상태가 아님과 동시에 적용 가능한 보류중인 레이아웃이 있는 경우, 해당 레이아웃을 적용하도록 레이아웃 패스를 강제 실행합니다.

하지만 필자의 눈에는 이 부분이 좀 거슬렸습니다.

> // — If it doesn’t have a calculated or pending layout that fits its current bounds, a measurement pass will occur

> // (see -\_\_layout and -\_u\_measureNodeWithBoundsIfNecessary:). This scenario is uncommon,

> // and running a measurement pass here is a fine trade-off because preloading any time after this point would be late.

즉, 현재 경계에 맞는 계산된거 또는 Pending된 레이아웃이없는 경우 **측정 패스가 발생**하며 이 같은 현상은 드문 경우라고 되어있다. 게다가 \_\_ layout 및 -\_u\_measureNodeWithBoundsIfNecessary 참고해라고 하니…

결국 node가 didLoad되기 전 시점에서 \_\_layout이 호출되는것은 가급적이면 피하던가 아니면 기존 디스플레이에 대해 이전에 measure되고 캐쉬 된 레이아웃을 무효로 할 수 있는 코드가 필요하다는 점입니다.

우선 didLoad이전 시점에서 setNeedsLayout을 호출하는것을 피하는 방향으로 작업을 해봤습니다.

![](/images/blog/1__tcwmE54t__u4pmeBVr7T5__A.png)

RxCocoa에서 제공하는 methoInvoked(메서드의 동작 이후의 이벤트를 획득)를 이용하여 node가 didLoad되지 않았을 때 해당 Wrapper를 이용해서 didLoad를 subscribe하여 onNext시 setNeedsLayout을 호출하는 기법으로 시도하였습니다.

![](/images/blog/1__8r__vAfXeGBiNSTaSUyFoTg.png)

물론 앞서 언급된 UI Layout measurement 측면에선 문제가 없었으나, 싱글뷰가 아닌 리스트형태의 뷰에서 InterfaceStatus와 사용자 스크롤에 대한 반응성이 나빠지는 현상을 발견할 수가 있었습니다.

이러면 Texture를 써봐야 의미가 없습니다.

그렇다면 마지막 대안인 **기존 디스플레이에 대해 이전에 measure되고 캐쉬 된 레이아웃을 무효로 할 수 있는 코드** 가 필요하다는게 확실해졌다고 할 수 있겠습니다.

친절하게도 Texture에서는 그러한 필요한 API를 제공해주는데 바로

**invalidateCalculatedLayout 이라는 메서드를 제공해줍니다.**

해당 메서드에 주석이 달려있는데 다음과 같습니다.

> /\*\*

> \* @abstract Invalidate previously measured and cached layout.

> \*

> \* @discussion Subclasses should call this method to invalidate the previously measured and cached layout for the display

> \* node, when the contents of the node change in such a way as to require measuring it again.

> \*/

해석하자면 Node의 내용이 다시 요구할 수있는 방식으로 변경 될 때. 해당 메서드를 호출하여 디스플레이에 대해서 이전에 측정되고 캐쉬된 레이아웃을 무효로 할 필요가 있을 때 사용해라고 명시적으로 나와있습니다. 즉, **측정 및 캐시 된 레이아웃을 무효화한다는 것입니다.**

또한 앞서 말했던 didEnterPreloadState의 주석내용과 같이 **layoutIfNeeds**를 같이 사용할 것입니다. 이거 또한 주석을 보면 다음과 같습니다.

View나 Layer의 load상태의 여부에 관계없이 편리하게 사용할 수 있다고 명시되어 있으며, Background Thread에서 안전하게 호출 할 수 있다고 합니다.

그렇다면 layoutIfNeeds호출전에 현재 레이아웃을 무효화하고 다음 업데이트주기 동안 레이아웃 업데이트를 Trigger를 하기위해서 **setNeedsLayout**까지 응용하자면 다음과 같이 코드를 작성 할 수가 있습니다.

![](/images/blog/1__E8LNaa1MmMi2__Cq__qvbHgQ.png)

다음 업데이트주기 동안 레이아웃 업데이트에 대한 트리거와 동시에 View나 Layer의 load상태의 여부에 관계없이 레이아웃 업데이트가 보류중인 경우 하위 뷰를 즉시 레이아웃 업데이트하며 동시에 측정 및 캐시 된 레이아웃을 무효화함으로써 constrainedSize가 고정값으로 유지되는 현상을 막는 방법입니다.

Node에서의 setNeedsLayout과 layoutIfNeeds Thread에 대해서 안정성을 가지고 있기 때문에 퍼포먼스상 문제는 없으며 동시에 사용자 스크롤 반응성 또한 기대값만큼 보여주는 것을 확인 할 수가 있었습니다.

> 가장 이상적인건 init시점에서 동기적으로 각 서브노드들의 데이터를 업데이트 해주고 그 이후에 발생하는 이벤트를 비동기적으로 해당하는 노드에 대해서 데이터를 업데이트 해주는것이 였으나 이러한 방법은 [코드 응집도](https://www.slideshare.net/ChiwonSong/20180721-code-defragment-106434267)(곰튀김님 자료참고)에 좋지 않으며 MVC가 아닌 MVVM 패턴에선 사실상 좋지 않은 방법이라 생각합니다. (물론 주관적인 견해입니다.)

이번 게시글에 대한 내용은 여기까지입니다.

그리고 위의 내용은 아래의 Repo를 통해서 확인 하실 수가 있습니다.

[**GeekTree0101/RxCocoa-Texture**  
_RxCocoa-Texture - RxCocoa Extension Library for Texture._github.com](https://github.com/GeekTree0101/RxCocoa-Texture "https://github.com/GeekTree0101/RxCocoa-Texture")[](https://github.com/GeekTree0101/RxCocoa-Texture)

시작한지 얼마 안됬지만

### 컨트리뷰터는 언제나 환영합니다!!!