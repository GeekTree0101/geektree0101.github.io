---
title: 'Texture Best Practice #1'
description: 'Texture Best practice #1 기초편'
date: '2018-04-12T04:30:25.262Z'
tags: ["ios", "texture"]
categories: ["iOS"]
---

Texture Best practice #1 기초편

현재 Vingle에서 iOS 개발을 맡고있는 하현수라고 합니다.

Vingle에 입사하고 이후 Texture(AsyncDisplayKit)를 도입한지는 이제 7달이 훌쩍 넘어가고 있네요.

그 동안 Texture로 여러가지 실험적인 것들도 시도해보고 Texture Slack에서 다른 개발자분들 고충도 들어주면서 올해 2월에 Vingle Tech Talk에서 Texture를 주내용으로 발표를 했었습니다.

[**Improvement feed performance with Texture(AsyncDisplayKit)**  
_아직도 발열을 못잡네. 게임 돌리는것 보다 발열이 심합니다. 앱 최적화가 그만큼 안된다는 소리겠죠? 예전 앱이 더 안정적이었는데 최신앱이 이모양이라니… + 와. 15분 만지고 배터리 20% 광탈…_medium.com](https://medium.com/vingle-tech-blog/improvement-feed-performance-with-texture-asyncdisplaykit-2ef2ee11f06e "https://medium.com/vingle-tech-blog/improvement-feed-performance-with-texture-asyncdisplaykit-2ef2ee11f06e")[](https://medium.com/vingle-tech-blog/improvement-feed-performance-with-texture-asyncdisplaykit-2ef2ee11f06e)

아래는 제 깃허브고 엄청 대단한건 아니지만 Texture를 이용한 여러 장난감들을 보유하고 있습니다. 여러분들이 좋아하시는 RxSwift를 응용도 해보고, MVVM 아키텍쳐도 적용해보고, 비디오 피드 등등 여러시도를 했었어요.

[**GeekTree0101 (Ha Hyun soo)**  
_GeekTree0101 has 37 repositories available. Follow their code on GitHub._github.com](https://github.com/GeekTree0101 "https://github.com/GeekTree0101")[](https://github.com/GeekTree0101)

[**A UI Framework for Effortless Responsiveness**  
_Texture_texturegroup.org](http://texturegroup.org/ "http://texturegroup.org/")[](http://texturegroup.org/)

Texture가 엄청 Major한 라이브러리는 아니지만 나름 다른 UI관련 라이브러리랑 비교했을때 결코 비효율적이거나 부족한 점은 없었습니다.

여러분들 중고등학교때 필수템이였던 수학의 XX와 같은 책처럼 Texture라이브러리 내부를 들여다보면 Text를 다루거나 Image를 다룰때 Table, Collection등등 각각 UIKit에서 제공하는 UI Components를 어떻게 효율적으로 잘 사용할 수 있는지 많은 경험들이 녹아있는 것을 볼 수가 있습니다. (물론 Objective-C로 되어있어서 Swift부터 입문하신 개발자 분들께서는 좀 이해하기 힘든 면도 없잖아 있지 않을까 싶네요)

따라서 오늘부터 제가 그 동안 겪었던 축적된 노하우들을 하나씩 정리해서 포스팅 할려고 합니다.

> 저도 사람인지라 작성하다보면 잘못된 부분이 있을 수도 있으니 따끔하게 Comment로 지적남겨주시면 매우 감사하겠습니다.

#### 1\. Node Property 작성시 Lazy(지연) 로 작성하는 것이 좋음

lazy var node: ASDisplayNode = {  
    let node = ASDisplayNode()  
    return node  
}()

: 나중에 layoutSpecThatFits 메서드를 통해 LayoutSpec 를 생성할 때 불필요한 초기화 과정을 피할 수 있음.

주의 할 점은 초기화 되지도 않았는데 LayoutSpec를 잡는 과정에서ASDisplayNode+UIViewBridge에 있는 Property를 layoutSpecThatFits에서 사용하는 것은 자제하자(대표적으로 isHidden). \_bridge\_prologue\_read 전처리문 확인

**_Fatal Exception: NSInternalInconsistencyException_**

_Incorrect display node thread affinity — this method should not be called off the main thread after the ASDisplayNode’s view or layer have been created_

#### 2\. 왠만하면 automaticallyManagesSubnodes는 YES!

특수한 경우아니라면 **addSubnode** 대신 **automaticallyManagesSubnodes**를 YES로 처리해서 사용하자. layoutSpecThatFits 내에서 영향 받는 Node들은 알아서 addSubnode가 자동적으로 된다.

#### 3\. Interaction 이 없는 node의 경우 **isLayerBacked**를 YES로 하자.

나름 퍼포먼스 이득을 볼 수가 있다.

#### 4\. ASTextNode의 경우 특수한 경우가 아니라면 flexShrink 1.0 정도 주자

lazy var textNode: ASTextNode = {  
    let node = ASTextNode()   
    node.style.flexShrink = 1.0  
    return node  
}()

layoutSpecThatFits 내에서도 shrink값 조절가능하지만 특별히 screen상에서 overflow 되야하는 특수한 경우가 아니라면 shrink값을 줘서 늘어나지 않게 하자. shrink를 주지않는 실수로 인해 긴 text의 경우 스크린범위를 넘어가는 경우가 종종 발생한다.

flexBox 가 익숙하지않다면 아래의 링크에서 제공해주는 PlayGround를 통해서 연습해보자.

[**Yoga Layout | A cross-platform layout engine**  
_Build flexible layouts on any platform with a highly optimized open source layout engine designed with speed, size, and…_yogalayout.com](https://yogalayout.com/ "https://yogalayout.com/")[](https://yogalayout.com/)

_참고: Texture의 layoutSpec은 Yoga Layout을 기반으로 작성되었습니다._

#### 5\. 추가적인 UIGestureRecognizer를 사용할땐 didLoad override method를 이용하자.

let longpressGesture = UILongPressGestureRecognizer()

// ...

override func didLoad() {  
   super.didLoad()  
   self.someNode.view.addGestureRecognizer(longpressGesture)  
   longpressGesture.addTarget(self, action: #selector(todo))  
}

Texture는 Thread 에 대해서 매우 엄격하기 때문에 무분별한 메인스레드 접근시 Error log와 함께 Crash를 발생시킨다. 사실상 초보 iOS개발자들이 UIKit에서 가장 실수하기가 좋은게 **잘못된 Thread사용**이다. _( Xcode 9.2에서부터는 경고를 띄워주지만 필자는 솔직히 Xcode를 믿지않는다.)_

따라서 Texture에서는 didLoad or didLoad Block 을 제공해준다. 해당 메서드(블록)에서는 안정적으로 메인 스레드에서만 돌아가기 때문에 view property를 접근해서 뭔가를 할 때 주로 여기서 코드를 작성해주는게 좋다.

1~5번까지 총정리해서 한눈에 보자면 다음과 같다.

class TestNode: ASDisplayNode {  
    lazy var textNode: ASTextNode = { // ---> (1)  
        let node = ASTextNode()  
        node.style.flexShrink = 1.0 // ---> (4)  
        return node  
    }

    lazy var imageNode: ASImageNode = {  
        let node = ASImageNode()  
        node.image = UIImage(named: "test.jpg")  
        node.isLayerBacked = true // ---> (3)  
        return node  
    }

    override init() {  
        super.init()  
        self.automaticallyManagesSubnodes = true // ---> (2)  
    }  
   
    // ---> (2)  
    override func layoutSpectTahtFits(... ) -> ASLayoutSpec {  
        let imgLayout = ASRat...Spec(ratio: 0.5, child: imageNode)  
        return ASOve...utSpec(child: imgLayout, overlay: textNode)  
    }

    override func didLoad() { // ---> (5)  
       super.didLoad()  
       self.view.addGestureRecognizer(longpressGesture)  
       longpressGesture.addTarget(self, action: #selector(todo))  
    }

}

여기까지 정도면 하나의 UI component가 완성이 됩니다.

다음엔 LayoutSpec에 대해서 다룰 예정입니다.