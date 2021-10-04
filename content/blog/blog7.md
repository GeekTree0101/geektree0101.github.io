---
title: 'Vapor, 테스트 주도 개발을 해가면서 Slack slash command 만들기'
description: >-
  왜 Vapor를 선택하게 되었는지, 어떠한 방식으로 TDD를 해가면서 간단한 Slack slash command API를 만들었는지에 대한
  과정을 적어봤어요,.
date: '2020-11-13T22:28:49.334Z'
categories: []
keywords: []
image: "images/blog/0__JHVa3o6dFCX83a0r.png"
tags: ["vapor", "swift", "server"]
---

### 고린이(golang 입문기)시절

![](/images/blog/0__JHVa3o6dFCX83a0r.png)

비록 iOS 앱을 개발하는 한낱의 모바일 개발자이지만, 지난 몇 달간 회사에 재직중인 고퍼(Gopher)분들로 부터 영감을 받아 [Echo framework](https://echo.labstack.com/)기반으로 간단한 업무용 Slack slash command 로직은 만든적이 있었습니다.

![](/images/blog/1__IN9z0xm3UCIOI3k73pwXYg.png)

처음엔 코드를 작성하기 쉬웠지만 가면 갈수록 어렵게 느껴짐과 동시에 서버사이드 개발과 테스트가 미숙하다보니 구조는 오히려 망가져가고 정상적인 테스트 코드를 작성하지 못해서. 결국, 나는 망가진 코드를 직면하게 될 수 밖에 없었습니다. :\[

제일 중요한건 혼자 이걸 유지보수 하다보니 외로움도 없잖아 있었습니다…

### 구관이 명관

결국 제가 내린 결론은 처음부터 다시 새로 만드는 것!

새로만들기 전에 고려했던 포인트들은 다음과 같습니다.

*   나와 함께 일하는 iOS 개발자들도 함께 만들어 나갈 수 있어야함
*   즐거운 테스트 주도 개발(의식의 흐름대로 코드를 작성하는 것을 피하고 싶음)
*   유연한 구조설계(특히, 추상화 가능한 언어를 사용하는 프레임워크!)

위 3가지중 이번에 가장 중요한 포인트는 함께하는 부분에 집중했었고, 동료들은 Swift에 친숙하고 언어의 특성을 깊게 잘 알고 있는 상황이기 때문에, 결국 Swift Server Side Framework중 Vapor를 선택하게 되었습니다.

### Framework 선택하기

Swift Server Side Framework는 대표적으로 크게 3가지가 있습니다.

*   Kitura, [https://github.com/Kitura/Kitura](https://github.com/Kitura/Kitura)
*   Perfact, [https://github.com/PerfectlySoft/Perfect](https://github.com/PerfectlySoft/Perfect)
*   Vapor, [https://github.com/vapor/vapor](https://github.com/vapor/vapor)

수 많은 Swift Server Side Framework중 굳이 Vapor를 선택한 이유는

Kitura는 거의 관리가 안되는게 실정이고 문제나 여러 이슈들이 쌓여있는게 현실입니다. 더군다나 3년전에 봤던 때와 비교했을 때 큰 변화나 발전이 없었습니다.

Perfact도 몇 년 동안 큰 변화는 없었지만, [Apple Swift-NIO](https://github.com/apple/swift-nio)기반 작업한 [레포지토리는 여전히 알파상태](https://github.com/PerfectlySoft/Perfect-NIO)에 있고 DX(Developer Experience)측면에서 아직까지 좋지 않은 느낌 없잖아 있었습니다.

마지막으로 남은게 Vapor인데, Vapor는 2020년 4월에 [**Swift-NIO**](https://github.com/apple/swift-nio) 기반으로 구조 재설계 이후 꾸준한 활동성을 보여주고 있음과 동시에 Kitura나 Perfact와 비교했을 때 상대적으로 많은 장점과 좋은 DX를 제공하고 있어서 망설임 없이 Vapor를 채택하게 되었습니다.

### 환경

*   Vapor 4.0
*   Swift 5.2
*   SPM(Swift Package Manager) 기반 구성
*   돈쓰기 싫어서? Heroku에 Deploy

### 구조 설계

![](/images/blog/1__T4__FEemr1THb71parNwD4Q.png)

Vapor framework자체에선 RouteCollection을 기반으로 한 MVC 구조를 가지고 있습니다. (Ruby on rails나 Django와 같은 다른 보편적인 프레임워크의 구조와 동일합니다.)

Controller(RouteCollection)는 중재자 역할을 하게 되지만, 비즈니스 로직이나 외부 서비스와의 연결등등이 많아지게 되면 **Controller는 결국 Massive**해지게 되고 테스트 하기도 쉽지않아서 수정이나 기능을 추가하다 보면 원치 않는 사이드 이펙트 버그가 생기고 프로덕트가 쉽게 무너지기 쉽습니다.

이를 피하기 위해서 나는 새로운 객체 두가지를 Controller로 부터 분리했습니다.

*   Worker: 비즈니스 로직을 주로담당
*   Service: 외부 서비스 로직을 담당

worker와 service는 각자 interface를 상속받아 구현을 합니다.

// worker

protocol CmdWorkerLogic { ... }

struct CmdWorker: CmdWorkerLogic { ... } // Production 용

struct CmdBetaWorker: CmdWorkerLogic { ... } // Beta 용 (임의 작성)

  
// service

protocol GithubServiceLogic { ... }

struct GithubService: GithubServiceLogic { ... }

![](/images/blog/1__oPlctJxFpCApQqRLlMpDog.png)

그리고 controller에는 아래의 코드와 같이 작성합니다.

import Vapor 

struct CmdController: RouteCollection, Then {   

  var worker: CmdWorkerLogic = CmdWorker()  
  var service: GithubServiceLogic = GithubService()

}

### 테스트 설계

#### Test Double 준비

이후, Worker와 Service에 대한 Spy객체를 준비합니다.

_WorkerSpy 객체 예시_

import Vapor  
@testable import App

final class CmdWorkerSpy: CmdWorkerLogic {

  var pullReqeustCalled: Int = 0  
  var pullRequestStub: SlackMessage = .init()

  func pullRequest(prs: \[GithubPullRequest\]) -> SlackMessage { 

    self.pullRequestCalled += 1  
    return self.pullRequestStub  
  }

  // ~~~ 생략 ~~~  
}

ServiceSpy 객체 예시

import Vapor  
@testable import App

final class GithubServiceSpy: GithubServiceLogic {

  var getPullRequestsCalled: Int = 0  
  var getPullRequestsStub: EventLoopFuture<\[GithubPullRequest\]>?

  func getPullRequests(req: Request) -> EventLoopFuture<\[GithubPullRequest\]> {

    self.getPullRequestCalled += 1  
    return self.getPullRequestStub ??  
    req.eventLoop.makeFailedFuture(Abort(.internalServerError))  
  }

  // ~~~ 생략 ~~~  
}

*   XXX Called 형태로 Integer를 선언한 이유는, 호출했는지 판단 할 수 있으며 호출 횟수까지 테스트 과정에서 식별하기 위함
*   XXX Stub 프로퍼티를 선언해 스터빙을 함으로써 다양한 테스트 시나리오 작성에 도움을 줍니다.
*   사실 Mockito나 별다른 Stubbing 서드파티 굳이 쓰지 않고 Test Double을 위와 같은 형태로 간단히 구현할 수 있습니다. ([Clean Swift TDD Part 1](https://clean-swift.com/test-driven-development-using-clean-architecture-part-1/))

#### Unit Test 작성

import Vapor  
import XCTVapor  
import Nimble

@testable import App

final class CmdControllerTests: XCTestCase {

  var app: Application!  

  // sut: system under test  
  var sut: CmdController!  

  // test doubles  
  var githubService: GithubServiceSpy!    
  var worker: CmdWorkerSpy!    

  override func setUp() {    

   self.githubService = GithubServiceSpy()   
   self.worker = CmdWorkerSpy()        
   self.sut = CmdController().with {      
    $0.worker = self.worker       
    $0.service = self.githubService     
   }     

   self.app = Application(.testing).then {        
     try? configure($0)        
     try? $0.register(collection: self.sut)   
   }  

  }   

  override func tearDown() {    

   self.app.shutdown()    
  }

}

*   setUp과 tearDown 구성
*   Nimble은 빠른 테스트 타이핑에 도움을 주기 위해서 import
*   with 나 then은 임의로 [Then](https://github.com/devxoul/Then)에서 가져와서 사용했어요.

그리고 아래의 코드와 같이 Worker와 Service Spy객체에 스터빙을 기반으로한 Test Code를 작성합니다.

// MARK: - Pull Request

extension CmdControllerTests {

  func test\_post\_cmd\_pull\_request\_success() throws {  
    // given      
    self.githubService.getPullRequestsStub = self.app.eventLoopGroup.future(\[GithubPullRequest()\]) 

   self.worker.pullRequestStub = SlackMessage()     

   // when     
   try self.app.test(.POST, "/cmd", afterResponse: { res in        
     // then        
     expect(self.githubService.getPullRequestsCalled) == 1   
     expect(self.worker.pullRequestCalled) == 1      
     expect(res.status) == .ok      
    })   
  }    

  func test\_post\_cmd\_pull\_request\_failed() throws {      
    // given      
    self.worker.isValidStub = true  
    self.worker.getTargetStub = .init(target: .pullRequest, query: nil)    

    self.githubService.getPullRequestsStub = self.app.eventLoopGroup.future(error: Abort(.internalServerError)) 

    // when      
    try self.app.test(.POST, "/cmd", afterResponse: { res in    
     // then        
     expect(self.githubService.getPullRequestsCalled) == 1       
     expect(self.worker.pullRequestCalled) == 0      
     expect(res.status) == .internalServerError      
    })    
  }

}

*   given: 제안된 시나리오를 기반으로 worker나 service에 필요한 스터빙을 합니다.
*   when: 제안된 시나리오를 동작시킵니다.
*   then: when에 따른 결과값을 체크합니다.

그리고 test를 돌려주면 해당 테스트는 실패하거나 부분적으로 성공했음을 알 수 있습니다. 즉, **Red상태**에 들어갑니다.

![](/images/blog/1__ZjZnK3ZDJL03uTXKWpzZKQ.png)

위와 같이 테스트를 작성하고 Worker와 Service의 실질적인 객체 내용을 구현을 합니다. **Green 상태** 즉, 테스트가 온전히 성공상태가 될 때까지 말입니다.

struct CmdWorker: CmdWorkerLogic {

  func pullRequest(prs: \[GithubPullRequest\]) -> SlackMessage {   
    // 구현  
  }  
}

struct GithubService: GithubServiceLogic { ... 구현 ... }

struct CmdController: RouteCollection { ... 구현 ... }

이후 Controller에 새로운 기능을 추가하거나, 비즈니스 로직 변경사항이 있으면 변경(**Refactor**) 을 통해서 다시 Red상태에 들어가게 되고 위와 같은 과정 반복을 통해 Green상태로 만들어가면서 안정적으로 프로덕트를 설계합니다.

![](/images/blog/1__e8MNESnv9BdGlhNvwJDetg.png)

### 끝으로

Golang으로 지속가능한 개발을 하지 못한점은 아쉽긴하지만, 이번 프로젝트를 통해서 iOS팀 동료분들도 읽기 쉽고 함께 참여가능한 프로젝트를 만들었다는 부분에 대해서 큰 의미를 가지게 되었습니다.

최근에는 [Leaf](https://github.com/vapor/leaf)기반으로 슬렉 Hook을 활용한 선택적 채널에 대한 전역적 공지사항 웹앱도 만들면서 아직까진 특별한 불편함 없이 잘 사용하고 있어서 마냥 행복합니다. :\]

Swift-NIO와 Swift 그리고 Vapor의 무궁한 발전과 앞날을 기원하며 이 정도로 글 마무리하겠습니다.

읽어 주셔서 감사합니다.

더 궁금하신 내용이 있으시거나 수정할 내용이 보이신다면 언제든 편안하게 [https://github.com/GeekTree0101/GeekTreeQnA](https://github.com/GeekTree0101/GeekTreeQnA) 에 이슈남겨주시면 감사하겠습니다.