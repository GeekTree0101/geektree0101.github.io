---
title: Chatting application built on Texture
description: Texture 사용한지 이제 반년이 넘었다.
date: '2018-03-04T05:28:06.509Z'
categories: []
keywords: []
slug: /@h2s1880/chatting-application-built-on-texture-43961d4cb495
---

> Texture 사용한지 이제 반년이 넘었다.

> 그 동안 Vingle 앱 내부의 대부분 기능들을 Texture로 만들다보니 나름 여러 노하우라던가 Texture Core 까지 들여다볼 정도로 실력이 많이 늘어난거 같다.

> Texture 내부를 들여다보면 SNS 어플리케이션 만드는데 고려된 사소한 코드들과 핵심 로직을 배울 수가 있어서 마치 \[수학의 정석?\]같은 책을 정독하는 느낌이 든다.

최근 Vingle에서 진행했던 프로젝트 중에 한가지가 채팅방을 만드는 기능이 있었다.

물론 iOS 개발인력도 적고 나름 빙글에 다니면서 가장 하고싶었던 부분이기도 해서 3주동안 나혼자 맡게 되었다. (PR 리뷰하시느라 고생하신 동료개발자에게 우선 감사의 말씀을 올립니다.)

우선 채팅앱이 기본적으로 양방향 로딩(BiDirectional Pagination)이 되야하는데, 이전부터 지금까지 단방향에 익숙했던 나에게는 처음에 어떻게 구조를 잡아야 할지 감이 약간 오진 않았지만

1.  TableView를 간단히 사용하면 되겠지라는 생각
2.  Texture에서 제공해주지 않을까?

라는 생각으로 이틀동안 큰 그림을 그려서 만들었지만

결과적으로는 대실패했었다.

위 항목을 하나씩 분석하자면

1.  TableView의 경우에는 CollectionView 처럼 FlowLayout 같은게 제공되지 않는다. 즉 변태적으로 커스터마이징하게 쓸 수 없다.
2.  Texture에서 leadingScreensForBatching 이라는 프로퍼티 값을 기반으로한 Pagination 은 있긴하지만 Preloading 을 지원하지 않는다는 것이다.!

좀 더 자세히 보자면

![](/images/blog/1__xe7qBOAFzmKNvwUR7Mr8Jg.png)

위의 코드에서 Fetching 을 할지 결정하게 되는데, Scroll Direction이 Up과 Left (일반적인 사용자 스크롤 방향) 밖에 제공되지 않는다는 것이다.

그래서 기본으로 제공하는 Batch Fetch 기능을 사용하지 않고 Scroll을 위의 로직과 비슷하게 만들어서 CATransaction 을 이용해 Preload상태일 때

CATransaction.begin()

CATransaction.setDisableActions(true)

한다음

tableView의 0 인덱스 부터 새로운 items 갯수 만큼의 IndexPath들 값을 inserted Items 후 scroll offset이 조절되었을때

CATransaction.commit()

했지만 오히려 사용성이 악화되고 Frame Drop까지 상당히 일어나는 것을 경험했다.

나름 이거 때문에 스트레스 많이 받았었지만, 이런거 한번정도 갈아엎는거는 큰문제가 아니다라는 정신승리를 가다듬고

국가 공휴일 하루 잡고 개인 헤커톤? 을 진행했었고 결과물은 다음과 같다.

[**GeekTree0101/GTChatKit**  
_GTChatKit - iOS ChatKit built on Texture(AsyncDisplayKit) and written in Swift_github.com](https://github.com/GeekTree0101/GTChatKit "https://github.com/GeekTree0101/GTChatKit")[](https://github.com/GeekTree0101/GTChatKit)

![](/images/blog/1__FYRdiWFzzwxr24KS3nng__w.gif)
![](/images/blog/1__EfitOdH1SwoTzE__39V9xoQ.gif)

Texture를 이용한 ChatKit을 만들었다. 정말 필요한 기능만 담아서

물론 다른 라이브러리들도 고려는 해봤었다.

[**mukyasa/MMTextureChat**  
_MMTextureChat - AsyncDisplayKit(Texture) Smooth Scroll Chat Simulation for Whatsapp and iMessage_github.com](https://github.com/mukyasa/MMTextureChat "https://github.com/mukyasa/MMTextureChat")[](https://github.com/mukyasa/MMTextureChat)

[**MessageKit/MessageKit**  
_MessageKit - In-progress: A community-driven replacement for JSQMessagesViewController_github.com](https://github.com/MessageKit/MessageKit "https://github.com/MessageKit/MessageKit")[](https://github.com/MessageKit/MessageKit)

[**nguyenhuy/AsyncMessagesViewController**  
_AsyncMessagesViewController - A smooth, responsive and flexible messages UI library for iOS._github.com](https://github.com/nguyenhuy/AsyncMessagesViewController "https://github.com/nguyenhuy/AsyncMessagesViewController")[](https://github.com/nguyenhuy/AsyncMessagesViewController)

[**slackhq/SlackTextViewController**  
_SlackTextViewController - A drop-in UIViewController subclass with a growing text input view and other useful messaging…_github.com](https://github.com/slackhq/SlackTextViewController "https://github.com/slackhq/SlackTextViewController")[](https://github.com/slackhq/SlackTextViewController)

등등이 있었는데, 내가 생각한 Chatting application 라이브러리에서 가장 핵심적인 기능은

1.  Prepend, Append가 용이해야한다.
2.  Prepend할 때 스크롤 오프셋이 유지되야하고 사용자 경험성이 좋아야한다.
3.  Message Input UI를 붙이기가 용이해야한다.

그리고 나머지 Diff algorithm 이용해서 업데이트하고 제거하고, Network작업은 당연히 해당 라이브러리를 사용하는 개발자 역량에 따라서 작성되는게 맞다고 생각한다.

물론 위에 열거된 라이브러리들은 일반 Chatting Application의 핵심 기능들과 부가적으로 괜찮은 기능들이 많다.

우선 내가 제작한 GTChatKit 의 핵심은 정말 가볍게 사용해서 채팅앱을 만들 수있는 라이브러리라고 말하고 싶다.

사용법을 간단히 먼저 말하자면

1.  subclass 만들기

class ChatNodeController: GTChatNodeController { ... }

그냥 GTChatNodeController subclass를 만들어 주면된다.

그리고 아래와 같이 그냥 initialization해주면 끝이다.

let viewController = ChatNodeController()

그리고 내부에서 접근가능한 프로퍼티 몇개를 간단히 보자면

class ChatNodeController: GTChatNodeController {  
  
    ...  
  
    func foo() {  
  
        let collectionView = self.chatNode // chatNode is equal to UICollectionView  
        let backgroundView = self.node // self.node is equal to backgroundView(UIView)  
    }  
  
}

chatNode와 그냥 node가 있다. 그냥 옆의 주석과 같이 해석하면 된다. chatNode와는 별개로 node 프로퍼티가 있는이유는 여러 악세서리 UI를 붙이기 좋게 할려고 만들어 놓은 Node다. 이건 나중에 Message Input UI를 붙이거나 Floating UI를 붙이기 위해서 사용한다.

2\. GTChatNodeDelegate implementation

extension ChatNodeController: GTChatNodeDelegate {  
    func shouldAppendBatchFetch(for chatNode: ASCollectionNode) -> Bool {  
        // Should Append Batch Fetch  
        return true  
    }  
      
    func shouldPrependBatchFetch(for chatNode: ASCollectionNode) -> Bool {  
        // Should Prepend Batch Fetch  
        return true  
    }  
  
    func chatNode(\_ chatNode: ASCollectionNode, willBeginAppendBatchFetchWith context: ASBatchContext) {  
        // Network Call Handling  
        // If Network Call Completed then context should be completed  
        // required example  
        // eg) self.completeBatchFetching(true, endDirection: .none)  
    }  
  
    func chatNode(\_ chatNode: ASCollectionNode, willBeginPrependBatchFetchWith context: ASBatchContext) {  
        ...  
    }  
}

위에서 부터 하나씩 말하자면

*   append fetching을 할 것인지 제어한다.
*   prepend fetching을 할 것인지 제어한다.
*   append에 대한 Network 콜을 여기서 하면되고 끝나면 completeBatchFetching 메서드를 호출 해주면 된다.
*   prepend에 대한 Network 콜을 사용자가 직접 작성한다.

물론 Pagination 이 일어나는 스크롤 영역조절은 leadingScreensForBatching 메서드를 접근하면 된다 (default는 기존 Texture와 동일하게 2)

추가적으로 complateBatchFetching에 대해서 말하자면 위에 인자값중 context: ASBatchContext를 볼수가 있는데 보통 일반적으로 Network 가 끝나고 table 이나 collection 를 reload하고 나면

context.complateBatchFetching(true)

위와 같이 호출해주면 이후에 Scroll 상태에 따른 다음 새로운 Item에 대한 Fetching 계산을 다시 시작하게 된다.

하지만 양방향 로딩인 만큼 이전값의 끝부분과 마지막 새로운 값의 끝 즉 end-point를 확실해 해줘야하는데 따로 property를 subclass에 만들어 쓰면 좀 더러워질꺼 같아서 아래와 같이 completeBatchFetching method를 만들었다.

func completeBatchFetching(\_ complated: Bool, endDirection: BatchFetchDirection) { ... }  
  
    endDirection: automatically block append or prepend batch fetching  
    self.completeBatchFetching(true, endDirection: .append) -> no more append doesn't work  
    self.completeBatchFetching(true, endDirection: .prepend) -> no more prepend doesn't work

눈 여겨볼 점은 endDirection인데 여기에 3가지 상태가 있다

*   append
*   prepend
*   none

none은 즉 아무 일 없다는 의미고, append와 prepend를 넣어주게 되면 자동적으로 내부 코드에 따라서 더 이상 append/prepend에 대한 fetching 하지 않겠다는 의미다.

이게 호불호가 갈릴 수 있어서 부가적인 기능일 뿐 불필요 및 context를 직접 제어하고 status를 세부적으로 나누고 싶다면 subclass에서 따로 작업하고

self.isPagingStatusEnable = false

위의 코드와 같이 isPagingStatusEnable을 off시켜주면 된다.

그리고 위의 기능을 사용한다면

self.pagingStatus

로 접근하면 어떤 상태인지 확인 할 수가 있다.

이걸 응용해서 사용한다면

func collectionNode(\_ collectionNode: ASCollectionNode, numberOfItemsInSection section: Int) -> Int {      
    switch section {        
       case Section.prependIndicator.rawValue:    
          return self.pagingStatus == .prepending ? 1: 0   
       case Section.appendIndicator.rawValue:    
          return self.pagingStatus == .appending ? 1: 0     
       case Section.messages.rawValue:             
          return self.items.count      
       default: return 0          
     }     
 }

위와 같이 Loading Indicator 를 보여주기 위한 Section을 만들 수 있다.

> (물론 TableView 였다면 저렇게 사용안하고 footer, header 에다 붙이는게 정석이겠지만…)

3\. 기본적으로 Texture 는 Intelligent-preloading이라는 기술을 가지고 있는데[http://texturegroup.org/docs/intelligent-preloading.html](http://texturegroup.org/docs/intelligent-preloading.html)

셀의 크기에 따라서 preload, display 영역을 조절 해주면 된다.

open func setupChatRangeTuningParameters() {  
        self.chatNode.setTuningParameters(ASRangeTuningParameters(leadingBufferScreenfuls: 1.5,  
                                                              trailingBufferScreenfuls: 1.5),  
                                      for: .full,  
                                      rangeType: .display)  
        self.chatNode.setTuningParameters(ASRangeTuningParameters(leadingBufferScreenfuls: 2,  
                                                              trailingBufferScreenfuls: 2),  
                                      for: .full,  
                                      rangeType: .preload)  
    }

이라고 GTChatKit 내부에 작성되어 있는데, 사용자의 필요에 따라 위의 method를 override해주면 된다.

4\. 마지막으로 LayoutSpecThatFits라는 method가 있는데 Texture를 아시는 분들은 아시겠지만 ASViewController에선 제공하지 않는 메서드지만 나는 필요에 따라서 Messsage Input UI나 다른 Floating UI를 붙이기 위해선 필요 했다.

따라서 아래와 같이 사용할 수 있게 코드를 작성했다.

override func layoutSpecThatFits(\_ constrainedSize: ASSizeRange, chatNode: ASCollectionNode) -> ASLayoutSpec {  
        let messageInsets: UIEdgeInsets = .init(top: .infinity,  
                                                left: 0.0,  
                                                bottom: self.keyboardVisibleHeight,  
                                                right: 0.0)  
  
        let messageLayout = ASInsetLayoutSpec(insets: messageInsets,  
                                              child: self.messageNode)  
  
        // overlay message input box onto chatNode  
        let messageOverlayedLayout = ASOverlayLayoutSpec(child: chatNode,  
                                                         overlay: messageLayout)  
  
        return ASInsetLayoutSpec(insets: .zero, child: messageOverlayedLayout)  
    }

default는 chatNode(ASCollectionNode)를 반환 해주게 되어있지만 사용자의 필요에 따라서 해당 메서드를 overriding해서 사용하면 된다.

결국 위의 내용을 총정리하자면 아래와 같다.

*   Prepending, Appending에 대한 명확한 구분
*   Paging Status 관리
*   새로운 UI 이식성
*   퍼포먼스(Texture가 알아서 챙겨줄꺼에요)
*   Prepend시 GTChatKit 의 FlowLayout가 사용자 경험성을 챙겨줍니다.

만든지 솔직히 2~3일 밖에 안됬고 앞으로 좀 더 개선해야할 부분도 있겠지만 살을 붙이다보면 괜찮을 라이브러리가 되지 않을까 기대된다.