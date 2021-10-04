---
title: 'Texture Best Practice #5'
description: MVVM 패턴을 활용한 Texture로 Application 만들기
date: '2018-05-19T03:55:29.686Z'
categories: []
keywords: []
slug: /@h2s1880/texture-best-practice-5-8958482e7fb3
---

![](/images/blog/1__Mnv7LOwnlzgzuNyE4__hbQw.png)

#### 서론

지난 1 ~ 4 편까지는 전반적으로 Texture를 어떻게 활용해서 기본적인 UI 구성법과 개발자가 주로 실수하는 부분 및 노하우에 대해서 다뤘고, 여기까지 오신분들은 기본적인 Application을 뚝딱 만들어 내실 수 있을꺼라 생각이 듭니다.

이번에 다룰내용은 학습곡선이 매우 높기 때문에 이번 포스팅을 읽기에 앞서 아래의 항목에 대해서 기본적으로 숙지하신 분들에게 용이한 내용이 될꺼라 생각이 듭니다.

*   RxSwift / RxCocoa 에 대한 개념 및 이해 ([Link](https://github.com/ReactiveX/RxSwift))
*   Texture UI 기본 구성 요소 및 제작 가능 (AsyncDisplayKit)
*   Model, View 에 대한 개념 이해, 기존 MVC 패턴에 대한 경험

#### MVC와 MVVM

우선 MVVM 패턴에 대해서 간단히 소개하기에 앞서 기존 MVC 패턴을 우선 말씀드리자면

MVC패턴이란?, Model — View — Controller의 약자로 에플리케이션을 세가지의 역할로 구분한 아키텍쳐입니다. 실제 Application의 사용자가 Controller를 조작하면 Controller는 Model로 부터 Data를 가져오고, 가져온 데이터를 이용하여 View를 업데이트 함으로써 앱사용자에게 시각적으로 정보를 보여주게 됩니다.

iOS 개발자에게 가장 기본적인 아키텍쳐이며, 많이 쓰이기도 합니다. 특히, 다른 플랫폼과 다르게 iOS는 Delegate 패턴을 제공해주기 때문에 이를 바탕으로 견고하게 앱을 설계할 수가 있습니다.

위와 같이, 잘 되어있고 쉽게 설계할 수 있는 패턴이 있는데 왜 MVVM 패턴이 탄생하게된 것 일까요?. 어떻게 만들든 다 똑같은 어플리케이션인데 말이죠.

MVC 로 개발하신 분들은 아시겠지만 어플리케이션의 규모가 커지면 사용자에게 제공해야할 비즈니스 로직들도 많아 질 뿐더러 UI도 다양해지고 복잡해지게 됩니다.

이에 따라 MVC의 경우 Model과 View간의 의존성이 강력하기 때문에 분리하기가 쉽지가 않을 뿐더러, Controller 내부에 있는 비즈니스 로직들은 점점 많이지고 복잡해짐에 따라 어느순간 하울의 움직이는 성에 나오는 하울의 성마냥 비대해지고 커지게 됩니다.

![](/images/blog/1__WftLtvBUgarRsdEMVe6Jyw.jpeg)

따라서 View와 Model간의 의존성을 줄일 수 있는 방안을 고려함에 따라서 탄생한 것이 MVVM 패턴입니다.

MVVM패턴은 Model — ViewModel — View로 구성되어 있습니다. 모든 비즈니스 로직은 ViewModel이 다루게 되고, View는 ViewModel로 부터 데이터를 받아와 비즈니스 로직에 따라서 업데이트되어 사용자에게 시각적인 정보를 제공합니다. 그리고 ViewModel은 Model로 부터 정보를 받아오거나 비즈니스 로직에 따라서 Model을 업데이트합니다.

iOS는 ViewController라는게 있기 때문에 Model — ViewModel — View(ViewController) 이렇게 이해하시면 되겠습니다.

따라서, 거대 어플리케이션에 적절한 아키텍쳐였고, 문제가 생기면 ViewModel에 최대한 집중하면 되기 때문에 가독성면이나 개발자의 생산성면에서 뛰어났던 것 같습니다.

> 위처럼 간단히 MVVM이랑 MVC에 대해서 소개를 했습니다만, 부족하다고 느끼시는 분들은 다른 분들의 패턴소개글을 참조하시면 감사하겠습니다. (이번 포스팅의 취지는 패턴 소개 및 비교할려는게 아니기 때문이니 양해부탁드립니다.)

자 그러면, 위의 이해를 바탕으로 같이 MVVM패턴과 Texture를 활용하여 간단한 Github Repository list를 보여주는 어플리케이션을 만들어 봅시다. 준비물이 필요하겠죠? 준비사항은 아래와 같습니다.

*   Github Repository API ([https://api.github.com/repositories](https://api.github.com/repositories))
*   Xcode
*   Cocoapod ( Texture, RxSwift / RxCocoa 4.x 이상, AlamoFire)

귀찮으신 분들은 [https://github.com/GeekTree0101/RxMVVM-Texture](https://github.com/GeekTree0101/RxMVVM-Texture)

위의 Github Repository를 clone 받아서 학습하시면 되겠습니다. _(Star 눌려주시면 감사하겠습니다. ㅎ )_

참고로 Swift 4.x 기준으로 설명 및 진행하도록 하겠습니다.

#### Model과 View를 만들어보자!

우선, 전체적인 구성요소를 개략적으로 그림 예시를 통해서 알아보도록하겠습니다.

![](/images/blog/1__NGUtZM6kCfONOBABM99jaQ.png)

보시는 바와 같이 View와 ViewModel, 그리고 Model로 구성되어 있는데, 앞서 설명했던 것과 약간의 차이점이 있다면 ModelProvider가 있습니다.

Model Provider는 서버측으로 받아온 Model 데이터들을 객체로 파싱 후 Array형태로 특정 Model들을 관리하는 서비스라 하겠습니다.

View는 저희가 만들 View를 스크린 샷 찍어서 넣었고, 각각 연결되는 화살표는 실제 동작할 때 일어나는 상황을 나타냈습니다.

따라서 아래의 사진과 같이 어플리케이션이 동작하게 됩니다.

![](/images/blog/1__vQP6eflA__p0AFYJePmLdBg.png)

우선, View를 만드는과정을 보여드릴려고 했으나, 1 ~ 4편과정과 중복되는 부분이 많아서 간단히 링크 첨부로 생략하도록 하겠습니다.

[https://github.com/GeekTree0101/RxMVVM-Texture/blob/master/RxMVVM%2BTexture/nodes/RepositoryListCellNode.swift](https://github.com/GeekTree0101/RxMVVM-Texture/blob/master/RxMVVM%2BTexture/nodes/RepositoryListCellNode.swift)

그리고 Model은 Swift 4.x 이전까지만 해도 Model Mapper 또는 Mantle를 이용하여 서버로 부터 받은 데이터를 Model로 파싱하였으나, Swift 4.x 에서 Codable 및 Decodable 이 제공됨으로써 훨~씬 간편하게 Model를 파싱할 수가 있게 되었습니다. (짞짞짞)

[https://github.com/GeekTree0101/RxMVVM-Texture/blob/master/RxMVVM%2BTexture/models/Repository.swift](https://github.com/GeekTree0101/RxMVVM-Texture/blob/master/RxMVVM%2BTexture/models/Repository.swift)

그리고 Alamofire를 이용한 [Network Service](https://github.com/GeekTree0101/RxMVVM-Texture/blob/master/RxMVVM%2BTexture/networks/Network.swift)와 Github API로 부터 받은 json형태의 [데이터를 Model로 파싱하는 로직](https://github.com/GeekTree0101/RxMVVM-Texture/blob/master/RxMVVM%2BTexture/extensions/Decoder%2Bextension.swift) 은 별도로 각각 해당 링크에 첨부했습니다.

그리고 List형태이기 때문에 해당 ASCellNode를 다루는 ASTableNode가 있는 [ViewController](https://github.com/GeekTree0101/RxMVVM-Texture/blob/master/RxMVVM%2BTexture/controllers/RepositoryViewController.swift)를 해당 링크와 같이 설계하였습니다.

#### Model Provider

이건 제가 편의상 만들었지만, 개발자 취향에 따라서 상이할 수도 있습니다.

만든 이유는 여러 스크린에서 동일한 Model를 사용할 수도 있고 해당 스크린에서 특정 Model의 상태가 변경됬을때, 다른 스크린에서 동일한 Model을 사용하고 있는 View를 업데이트 해주기 위해서 입니다.

_예를 들자면, UINavigationController에 여러 동일한 ViewController Stack이 있고, 트위터의 팔로우 버튼과 같은 팔로우 버튼이 있으면 팔로우를 했을 때, 동일한 ViewController Stack의 해당 팔로우버튼들이 모두 업데이트가 되어야 합니다._

[여기를 클릭하시면](https://github.com/GeekTree0101/RxMVVM-Texture/blob/master/RxMVVM%2BTexture/dataProvider/RepoProvider.swift) 해당 소스 코드를 확인 하실 수 있으며, 각각 Property들과 Method에 대해서 설명을 드리자면

private static let repoRelay = BehaviorRelay<\[Int: (repo: Repository, count: Int, updatedAt: Date)\]>(value: \[:\])

private static let queue = DispatchQueue(label: "RepoProvider.RxMVVMTexture.com", qos: .utility)

private static let repoObservable = repoRelay.asObservable()        .subscribeOn(SerialDispatchQueueScheduler(queue: queue, internalSerialQueueName: UUID().uuidString)).share(replay: 1, scope: .whileConnected)

**repoRelay (BehaviorRelay)**: Relay는 불과 몇달 전에 RxSwift에서 제공하는 기능이며, BehaviorSubject와 다르게 Error나 Complete가 발생하더라도 Terminate가 되지 않습니다. 이러한 이점이 있기에 BehaviorSubject나 Deprecated 된 Variable보다 적합하다 판단되었기 때문에 BehaviorRelay를 사용하였습니다. 또한, 다루는 데이터는 Dictionary형태로 되어 있는데, \[Int: (repo: Repository, count: Int, updatedAt: Date)\] 여기서 key값은 Model의 Unique value 주로 identifier 를 다루며 repo는 Model 객체를 가리키며, count는 해당 Model를 참조하고 있는 ViewModel의 갯수를 가리킵니다. 0일시에는 Model의 사용이 더 이상 필요 없기 때문에 release가 되게 되고 해당 Dictionary 에서 제거됩니다. 마지막으로 updatedAt은 model이 갱신 또는 업데이트된 시간정보를 Date형태로 다루게 됩니다. 더 자세한건 method 설명에서 다루겠습니다.

**repoObservable과 labeled utility queue**: Provider가 Model를 관리하는 데 있어서 관리되는 모든 Model들이 ms단위로 업데이트 되는게 아닐 뿐더러, MainThread에 방해를 주지 않기 위해서 적절히 Utility QoS 로 동작하는 DispatchQueue를 만들었습니다. (Labeling을 할 경우 차후 문제가 생기시 디버깅하기가 용이합니다. ) 따라서 만들어진 Queue를 repoObservable를 만드는데 사용합니다.

그외 subscribeOn을 이용하여 Serialize하게 동작하게 하였고, shareReplay를 이용하여 공유 구독을 할 수 있게 설계했는데, 더 자세한 사항은 아래의 포스터를 확인하시면 이해가 가실꺼라 생각합니다.

[**RxJava Tip for the Day — Share, Publish, Refcount and All That Jazz**  
_Originally posted this article on the Wedding Party tech blog_blog.kaush.co](https://blog.kaush.co/2015/01/21/rxjava-tip-for-the-day-share-publish-refcount-and-all-that-jazz/ "https://blog.kaush.co/2015/01/21/rxjava-tip-for-the-day-share-publish-refcount-and-all-that-jazz/")[](https://blog.kaush.co/2015/01/21/rxjava-tip-for-the-day-share-publish-refcount-and-all-that-jazz/)

그리고 여러 method들이 있습니다.

static func addAndUpdate(\_ repo: Repository) { ... }

static func update(\_ repo: Repository) { ... }

static func retain(id: Int) { ... }

static func release(id: Int) { ... }

static func repo(id: Int) -> Repository? { ... }

static func observable(id: Int) -> Observable<Repository?> { ... }

**addAndUpdate**: 새로운 Model를 Provider에 갱신 시켜줍니다. 만약 새로운 Model를 받아서 addAndUpdate했을 때, repoRelay에서 관리하는 Model중 중복되는 사항이 있을시, 알아서 retain count와 update된 시간을 갱신 시켜주고 model를 교체해줍니다.

**update**: repoRelay가 다루고 있는 특정 Model를 직접적으로 업데이트 해줍니다. 주로 ViewModel에 의해 Model의 Property가 변경되었을 때 사용합니다.

**retain / release**: 새로운 Model이 갱신 되거나 더 이상 해당 Model를 참조하고 있는 ViewModel이 없을 때 repoRelay에서 다루고 있는 특정 Model에 대한 참조 카운터를 증가/감소를 통하여 retain에서 만약 특정 Model의 refcount가 zero가 될 시, Model을 repoRelay로 부터 제거하도록 설계 되어 있습니다.

**repo**: Model의 Identifier를 이용해서 직접적으로 Model를 repoRelay로 부터 가져옵니다. Identifier만으로 Model를 직접적으로 Access하거나 Mutating 할 때 사용합니다.

observable: ViewModel를 생성하는데 가장 중요한 요소 이며, Identifier를 이용하여 특정 Model에 대한 Observer를 생성합니다.

> ModelProvider를 설계 및 개념을 잡아주신 [준모님](https://github.com/junmo-kim)께 감사의 말씀드립니다.

이렇게 간단히 Model Provider를 만들었으니 이제 ViewModel를 만들어 보도록하겠습니다.

#### ViewModel

우선 설명하게에 앞서 ViewModel의 내부 구성 요소를 먼저 보도록 하겠습니다. [https://github.com/GeekTree0101/RxMVVM-Texture/blob/master/RxMVVM%2BTexture/viewmodels/RepositoryViewModel.swif](https://github.com/GeekTree0101/RxMVVM-Texture/blob/master/RxMVVM%2BTexture/viewmodels/RepositoryViewModel.swift)t

class RepositoryViewModel {

// @INPUT  
    let didTapUserProfile = PublishRelay<Void>()

// @OUTPUT  
    var openUserProfile: Observable<Void>  
    var username: Driver<String?>  
    var profileURL: Driver<URL?>

let id: Int  
    private let disposeBag = DisposeBag()

deinit {  
        RepoProvider.release(id: id)  
    }

init(repository: Repository) {  
        self.id = repository.id  
        RepoProvider.addAndUpdate(repository)

let repoObserver = RepoProvider  
                           .observable(id: id)  
                           .share(replay: 1,  
                                  scope: .whileConnected)

....   
      }

Property는 크게 Input, Output, Identifier, DisposeBag 4가지로 구성되어 있습니다. 각 구성요소에 대해서 자세히 설명하자면 다음과 같습니다.

**Intput**: 사용자의 동작 및 제어에 대한 이벤트를 받는 Property입니다. 즉, 사용자가 어떤 버튼(View)을 클릭했을 때, 그 이벤트를 accept를 하는 역할을 하고, 비즈니스로직을 ViewModel내에서 수행할 수 있도록 연결을 해줍니다. Input을 만드는 과정은 나중에 더 자세히 다루도록 하겠습니다.

> 이전엔 PublishSubject를 이용했지만, 이 또한 RxSwift가 최근에 Relay라는 것을 제공해줌으로써 PublishRelay를 주로 사용합니다. 원치않는 Error나 Complete에 의해 dispose되어 View를 사용자가 제어해도 동작하지 않는 다면 얼마나 당황스럽겠습니까.

**Output**: View의 구성요소를 업데이트 해주기 위한 Data를 제공해줌과 동시에 Model의 데이터를 observer하는 Property입니다. Output에 대한 설계는 나중에 더 자세히 다루도록 하겠습니다.

**Identifier:** 특정 Model의 Identifier를 가지는 Property이며, ViewModel이 deallocated(더 이상 사용되지 않을 때)될 때, Model Provider의 특정 Model을 deallocate하기 위해서 저장해놓는 Property입니다.

**DisposeBag**: 이건 RxSwift 기본 개념 숙지하신 분들은 이해가실꺼라 생각하기에 생략하겠습니다.

이제 Input / Output을 만드는 과정에 대해서 자세히 설명하도록 하겠습니다.

#### Input / Output 설계

우선 ViewModel를 생성할 때 서버로 부터 받아서 Model을 init시점에 넘겨줍니다.

init(repository: Repository) { <<<<<<<<

}

그리고 Model의 Identifier (Unique Value)를 Identifier Property에 저장을 하도록 하겠습니다.

init(repository: Repository) {  
        self.id = repository.id <<<<<  
}

그리고 해당 모델은 Model Provider에 넘겨 줍시다.

init(repository: Repository) {  
        self.id = repository.id  
        RepoProvider.addAndUpdate(repository) <<<<<<  
}

이렇게 하면 이제 ModelProvider로 부터 특정 Model의 Observer를 생성하여 Model 값을 비동기적으로 아래와 같이 가져올 수 있게 됩니다.

init(repository: Repository) {  
        self.id = repository.id  
        RepoProvider.addAndUpdate(repository)

let repoObserver = RepoProvider  
                           .observable(id: id) <<<<<  
                           .share(replay: 1,  
                                  scope: .whileConnected)  
 }

![](/images/blog/1__nTVoL7o1GYBaH6V36VlgBA.png)

이제 위의 사진과 같이 username 을 보여주는 ASTextNode(View)를 업데이트 해주시위해서 username을 Observable형태의 Property, 즉 Output을 만들어 보도록 하겠습니다.

위에서 만든 repoObserver를 map으로 걸면 Model값을 확인 할 수가 있고 Model 내부에는 Model이 가지고 있는 각종 Property들이 있습니다. 그럼 저희가 필요한건 username이니깐 아래와 같이 username Observer을 repoObserver를 이용하여 만들 수 있습니다.

self.username = repoObserver.map { $0?.user?.username }  
                            .asDriver(onErrorJustReturn: nil)

위와 보시는 바와 같이 $0 (Model) 의 user property의 username property를 참고하고 asDriver로 Driver형태의 username observer property를 완성하였습니다. Observable로 만들지 않고 driver로 한 이유는 RxCocoa Driver 문서를 구독 하시면 되겠습니다.

Output에 대한 설계는 이게 끝이며, 필요한 비즈니스 로직이 있을 시 map내에서 처리하시면 되겠습니다.

마지막으로 사용자의 이벤트를 다루는 Input을 설계하자면 다음과 같습니다.

저는 프로필 터치 시 Profile 상세스크린을 열기위한 이벤트를 간단히 설계 하겠습니다. 아래와 같이 두개의 Property를 만들었습니다.

class RepositoryViewModel {

// @INPUT  
    let didTapUserProfile = PublishRelay<Void>()

// @OUTPUT  
    var openUserProfile: Observable<Void>

didTapUserProfile은 앞서 말했듯이 PublishRelay로 만들었고, 이벤트에 따라서 profile을 여는 동작을 시키는 openUserProfile ( Output property) 로 구성하였습니다.

그리고 이것들을 아래와 같이 연결 시켜줄 수 있습니다.

init(repository: Repository) {  
    ....

self.openUserProfile = self.didTapUserProfile.asObservable()

}

만약 복잡한 비즈니스로직이 필요하다면 아래와 같이 map을 이용하여 처리할 수 있을 뿐더러

init(repository: Repository) {  
    ....

self.openUserProfile = self.didTapUserProfile  
.map { ... }  
.asObservable()

}

비즈니스 로직을 처리하는데 Model값이 필요한 경우

init(repository: Repository) {  
    ....

let repoObserver = RepoProvider  
                           .observable(id: id)  
                           .share(replay: 1,  
                                  scope: .whileConnected)

self.openUserProfile = self.didTapUserProfile  
.withLatestFrom(repoObserver)  
.map { ... }  
.asObservable()

}

withLatestFrom(:Observable) 를 이용하여 Model를 참고 할 수 있습니다.

이렇게 전체를 종합하여 가독성이 좋은 ViewModel를 만들 수 있습니다.

#### View — ViewModel Binding

View도 만들고 Model 및 Provider도 만들고 마지막으로 ViewModel도 만들었으면 마지막으로 ViewModel을 View에 바인딩하는 작업만 남았습니다.

바인딩이란, 간단히말해서 View에서 사용자에 의해서 발생한 이벤트를 ViewModel로 넘겨주는 통로와 ViewModel로 부터 View를 업데이트 해주기 위한 통로를 만드는 과정을 말합니다.

여기서 RxSwift (Reactive) 가 반드시 필요하며, 사실상 Rx없이는 MVVM 아키텍쳐를 설계하기가 쉽지는 않습니다.

> 물론 기본적으로 제공해주는 key-value observer 로 일일히 할 수야 있지만 오히려 일만 늘어납니다. RxSwift가 괜히 있겠습니까.

또한 RxCocoa의 경우 UIKit에서 제공하는 각 UI에 대한 이벤트 바인딩 및 편으로 제공되는 터치나 동작 이벤트를 기본적으로 제공을 해줍니다.

하지만 Texture는 1편에서 말한 것처럼 view property를 접근해서 사용하지 않는 이상 RxCocoa에서 사용할 수 있는 편리한 기능들에 대해서 제약이 있습니다. 이러한 점을 보완하기 위해서 필자는 따로 아래와 같은 라이브러리를 만들어서 사용합니다. ( 더 자세한 내용은 해당 링크 README.md를 읽어주시거나 해당 포스터를 참고하시면 되겠습니다. )

[**GeekTree0101/GTTexture-RxExtension**  
_GTTexture-RxExtension — Texture RxSwift Interactive Wrapper base on ASControlNode_github.com](https://github.com/GeekTree0101/GTTexture-RxExtension "https://github.com/GeekTree0101/GTTexture-RxExtension")[](https://github.com/GeekTree0101/GTTexture-RxExtension)

[**Texture + RxSwift Interactive Wrapper**  
_How to make RxSwift Interactive wrapper for Texture?_medium.com](https://medium.com/@h2s1880/texture-rxswift-interactive-wrapper-d3c9843ed8d7 "https://medium.com/@h2s1880/texture-rxswift-interactive-wrapper-d3c9843ed8d7")[](https://medium.com/@h2s1880/texture-rxswift-interactive-wrapper-d3c9843ed8d7)

따라서 View -> ViewModel 의 이벤트를 위의 라이브러리를 이용해서 Binding한다면 아래와 같습니다.

init(viewModel: RepositoryViewModel) {  
      
    userProfileNode.rx  
                   .tap(to: viewModel.didTapUserProfile)  
                   .disposed(by: disposeBag)

조금 전에 설계했던 Input (didTapUSserProfile)를 다음과 같이 bind 할 수가 있습니다. 그렇게 된다면 userProfileNode의 tap event가 viewModel의 didTapUserProfile로 이벤트를 보내게 됩니다.

그리고 username Output 은 다음과 같이 바인딩하여 view를 비동기적으로 업데이트 할 수 있습니다.

init(viewModel: RepositoryViewModel) {  
      
    viewModel.username.asObservable()  
    .bind(to: usernameNode.rx.text(Node.usernameAttributes),  
          setNeedsLayout: self)  
    .disposed(by: disposeBag)

위이 코드와 같이 usernameDriver와 bind(to: 를 이용하여 usernameNode의 text binder에 연결해줌으로써 View가 업데이트 되게 됩니다.

위의 binder의 경우 ASBinder로 제가 기존 RxCocoa에서 제공해주는 Binder를 커스텀해서 만든 것입니다. 이 또한 앞서 언급한 링크를 참고하시면 자세히 확인 하실수가 있습니다.

따라서 아래의 비디오와 같이 동일한 ViewModel을 공유하는 서로 다른 스크린에서 특정 Model 값이 업데이트 되었을 때 비동기적으로 동일한 ViewModel을 참조하는 View들을 업데이트 하게 됩니다.

이러한 일련과정은 [https://github.com/GeekTree0101/RxMVVM-Texture](https://github.com/GeekTree0101/RxMVVM-Texture) 해당 링크의 README.md에 이미지와 함께 상세히 설명 해놨습니다.

따라서 Texture와 MVVM 패턴을 이용하여 완벽한 어플리케이션을 같이 제작해 보았습니다.

Rx에 익숙하지 않으신분들께서는 제 포스팅 글이 어려울 수는 있겠지만, R학습을 바탕으로 Texture로 Application을 제작한다는 것은 참 즐거운 일이 될꺼라 생각이 듭니다. Texture로 UI 퍼포먼스도 잡고 깔끔하고 정돈된 코드설계도 잡고 말이죠.

마지막으로 가장중요한것!

![](/images/blog/1__I236SQ5MIORYYMPyLIHOzQ.jpeg)

위의 사진과 같이 유닛테스트 없이 프로덕션에서 테스트를 직접하시는 분들은 없으시겠지만 ViewModel을 유닛테스트 하기위해서는 RxTest를 사용할 줄 알아야됩니다.

[**RxSwift Testing**  
_One of my favorite features of RxSwift is its testing infrastructure, RxTest. And it’s an undersold one too, it’s not…_kean.github.io](http://kean.github.io/post/rxswift-testing "http://kean.github.io/post/rxswift-testing")[](http://kean.github.io/post/rxswift-testing)

따라서 위와 같이 RxSwift Unit Test기법에 대해서 설명한 포스트가 있어요. TDD하시는 분들께는 많은 도움이 될꺼라 생각이듭니다. 저 또한 이걸 통해서 Rx Unit Test하는 방법에 대해서 학습했던 기억이 납니다.

그리고 Texture UI를 Unit Test 가능한가에 대해서 지난 2월 발표때 받은 적이 있었는데요. 가능합니다. 여러분들이 일반적으로 UIKit에서 제공하는 UI를 Unit Test하듯이 하시면 됩니다.

> 아마 제가 다음 글을 쓴다면 Texture Unit Test에 관련해서 쓰지않을까 싶네요.

이번 글은 여기까지 입니다. 그리고 마지막 편이기도 하구요.

지금까지 1 ~ 5편까지 구독해주신 많은 개발자 여러분들에게 감사의 말씀드리고, 함께 여러시도와 연구를 같이 해주신 Vingle iOS개발팀 여러분들께도 감사의 말씀드립니다.

그리고 의견이나 설명 및 수정이 필요한부분 있으시면 댓글 남겨 주시면 감사하겠습니다.

#### 이것으로 Texture Best Practice 를 마치도록 하겠습니다.

#### 감사합니다.