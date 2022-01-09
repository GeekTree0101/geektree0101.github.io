---
title: "모듈화하고 Needle 적용해보기"
description: "iOS Dependency Injection by Uber’s Needle"
date: '2021-08-23T14:33:41.799Z'
tags: ["iOS", "DI"]
categories: ["iOS", "Devops"]
image: "images/blog/1__umJS__fyx49VhLHLhhXWLPg.png"
---

8월 11일 오늘도 평화로운 당근마켓의 iOS개발자들은 워크샵을 열어서 VoIP도 뜯어보고 당근마켓 iOS 프로젝트 미래에 대해서 이야기를 나누고 있었다.

최근 신규 프로젝트 기술스택을 고민하던 레이가 넌지시 필자에게 다음과 같은 질문을 직구로 던졌다.

“Pure쓸지 Needle쓸지 고민이에요. 요즘 바빠서 Needle을 어떻게 쓰면 잘썼다고 할 수 있을지 연구를 못했는데, 데이빗이 해줘도 좋을꺼같아요!, 데이빗이면 하루면 금방하실꺼같아요!”

![](/images/blog/0__qUyfEQMR__mhTCuaL.jpg)

사실 필자의 머릿속엔 원숭이가 심벌즈 치고 있었는데… 동료들의 사슴같은 눈망울을 보자니 차마 거절을 할 수 없었다.

그렇게 귀가 후 샤워를 마치고 경건한 마음으로 맥북을 열었다.

### Needle?

Needle을 보기에 앞서서 Dependency Injection에 대해서 교과서 적으로 알아보자면 다음과 같다.

> 소프트웨어 엔지니어링에서 의존성 주입은 하나의 객체가 다른 객체의 의존성을 제공하는 테크닉이다. “의존성”은 예를 들어 서비스로 사용할 수 있는 객체이다. 클라이언트가 어떤 서비스를 사용할 것인지 지정하는 대신, 클라이언트에게 무슨 서비스를 사용할 것인지를 말해주는 것이다

뭔가 굉장히 정직하게 꼬아서 교과서적으로 적어봤는데, 쉽게 비유하자면 자전거가 있는데 노인이 타는 노인용 자전거로 제공할 수도 있고, 어린아이가 타는 유아용 자전거로 제공할 수도 있는데, 남녀노소 어느 누가 타더라도 자전거의 역할을 자전거로써 충실히 역할을 할 수 있어야한다.

그래서 탑승객을 추상화하고 자전거의 안장위에 탑승객을 주입받는 형태를 dependency injection이라고 한다. 그러면 노인이 타든, 어린아이가 타든 문제가 없다! (단, 외계인이나 돼지, 고양이는 제외한다 남녀노소 즉 인간으로 추상화를 했기 때문이다!)

그럼 Needle은 무엇이냐면 간단히 요약하자면 다음과 같다.

*   Cleaning, Swinject와 같은 DI(dependency injection) 프레임워크지만! 계층적으로 DI 구조를 작성하도록 유도하고 있습니다.
*   다른 DI 프레임워크와 달리 제공되는 커멘드 라인 툴을 통해서 런타임이 아닌 **컴파일 타임**에서 잘못된 DI 계층에 대해서 지적을 해줍니다. (WOW)
*   컴파일과 동시에 계층적으로 그려진 **DI 코드를 자동으로 생성**해줍니다. (AWESOME!!!)

수 많은 DI framework가 있는데 필자가 Needle에 매료된 포인트는 컴파일 타임에서 잘못된 DI 계층을 지적해주는 포인트와 코드를 자동으로 생성해주는 즉, 매번 새로운 객체를 추가할 때마다 register 해주는 코드를 작성하는 번거로움이 필요가 없는 점이다. (자동 생성해주는 코드는 참을 수 없지)

> Needle에 대한 자세한 사용법은 [https://github.com/uber/needle/blob/master/API.md](https://github.com/uber/needle/blob/master/API.md) 해당 needle 레포의 API.md에 매우 상세히 나와있어서 이 글에 담에내기엔 글의 그릇이 너무작아서 패스하겠습니다.

### 모듈화(Modularization)

[**GitHub - GeekTree0101/Dodi: Modular iOS with Uber needle & tuist example**  
_Modular iOS with Uber needle & tuist example. Contribute to GeekTree0101/Dodi development by creating an account on…_github.com](https://github.com/GeekTree0101/Dodi "https://github.com/GeekTree0101/Dodi")[](https://github.com/GeekTree0101/Dodi)

모듈화하고 Needle을 적용하려는 이유는 다음과 같은 이유가 있다.

당근마켓 iOS 프로젝트에선 Pure를 사용하는데 그 중에서 도메인 별로 Swinject에서 기본적으로 제공하는 Assembly를 통해서 관리를 하고 있다. Needle에서는 어떤 식으로 모듈별로 의존성을 관리해줄지가 가장 주된 목표였다.

![](/images/blog/0__a5GBMruaYoRD9uL3.png)

따라서, 아주 가볍게 위의 이미지와 같이 List, Detail, UI, Repository, Core 모듈을 Tuist를 활용하여 분리하였다.

Tuist로 모듈을 분리하는 노하우는 내가 가장 사랑하는? 동료 Ray(오강훈님)의 게시글을 참고해보면 좋습니다.

[**당근마켓) XcodeGen 에서 Tuist 로 전환하기**  
_당근마켓 iOS 프로젝트 구성 툴을 XcodeGen 에서 Tuist 로 전환하게 된 이야기를 해보려고 합니다._medium.com](https://medium.com/daangn/xcodegen-%EC%97%90%EC%84%9C-tuist-%EB%A1%9C-%EC%A0%84%ED%99%98%ED%95%98%EA%B8%B0-3f0156e0c2ea "https://medium.com/daangn/xcodegen-%EC%97%90%EC%84%9C-tuist-%EB%A1%9C-%EC%A0%84%ED%99%98%ED%95%98%EA%B8%B0-3f0156e0c2ea")[](https://medium.com/daangn/xcodegen-%EC%97%90%EC%84%9C-tuist-%EB%A1%9C-%EC%A0%84%ED%99%98%ED%95%98%EA%B8%B0-3f0156e0c2ea)

그리고 각각 분리된 모듈 별로 Swinject에선 Assembly와 같은 뭔가를 준비해야하는데… 딱히 그런건 제공되지 않고 순수하게 Component만 제공된다.. (끼야옳)

![](/images/blog/0__zyttjpcRrn__XcnZv.jpg)

그래서 머리를 굴려본 결과 다음과 같은 형태로 구성하기로 했다.

### 1\. 각 계층별로 Assembly 역할하는 Component 구성하기

![](/images/blog/1__6whNixdjczTcQerMR54r4w.png)
![](/images/blog/1__R307n5JTJXm8Vthb4CwdOA.png)

여기까지는 마치 Assembly의 역할과 동일하다. 그냥 해당 모듈내에서 제공되는 추상화된 객체를 제공하거나 만약 하위 component가 있다면 해당하는 component를 에그리게이션해서 제공하는 것.

> 주의: 요기서 문제점은 RepositoryBuilder라는게 있는데, 필자가 처음에 접했을 때는 사실 Builder개념이 문서화는 안되어있고 모호했기 때문에 Builder를 상속받고 특정 repository구현체를 반환했지만 혹시 보시는 분들이 “이건 아닌데”라는 생각과 혹은 응용하고자 할 때 이점 참고 및 양해를 부탁드립니다. 즉, Needle에서 원하는 건 ViewController(화면)반환정도를 기대하고 있습니다.([https://github.com/uber/needle/tree/master/Sample/MVC/TicTacToe](https://github.com/uber/needle/tree/master/Sample/MVC/TicTacToe))

### 2\. Root Component에 모듈마다 제공되는 Assembly Component를 sharing하기

![](/images/blog/1__Bomf__AmZwX2iMJgdCRZa7A.png)

그리고 이를 직접적으로 운용했을 때는 다음과 같이 구성을 했다.

![](/images/blog/1__umJS__fyx49VhLHLhhXWLPg.png)
![](/images/blog/1__1K6w4UiWFYeJTwwVkf__3mQ.png)

그리고 compile을 하게되면 동시에 needle이 생성한 파일이 나오게 됩니다.

[**Dodi/NeedleGenerated.swift at master · GeekTree0101/Dodi**  
_Modular iOS with Uber needle & tuist example. Contribute to GeekTree0101/Dodi development by creating an account on…_github.com](https://github.com/GeekTree0101/Dodi/blob/master/Projects/Dodi/Sources/NeedleGenerated.swift "https://github.com/GeekTree0101/Dodi/blob/master/Projects/Dodi/Sources/NeedleGenerated.swift")[](https://github.com/GeekTree0101/Dodi/blob/master/Projects/Dodi/Sources/NeedleGenerated.swift)

\_\_DependencyProviderRegistry.instance 는 Swinject의 default container와 같은 역할하고 각 모듈별로 만든 Component는 Provider라는 형태로 code가 auto-gen되는데 각 Provider는 \_\_DependencyProviderRegistry.instance에서 제공하는 component를 각 모듈별 provider에게 제공하는 것을 볼 수 있다. (즉, 각 모듈별로 작성한 component와 root component의도대로 코드가 생성됬다는 점.)

생성된 파일만 보았을 땐 특별히 Swinject에서 제공하는 Assembly같은 것 필요없어보이지만 런타임에서 lazy하게 apply하는 방법은 없어보인다.

### 마무리

Needle이 지향하는 바는 명확하다. 기준 Swinject에서 다뤘던 또는 제공되는 특별한 테크닉이 정말 필요없는 군더기 없는 프레임워크이며 런타임이 아닌 컴파일타임에 잘못된 의존성 계층에 대해서 잘 잡아내주고 안정적인 설계를 돕는 프레임워크라 의심할 여지가 없다.

만약, 런타임에서 뭔가 하고싶다면 둘중하나일 것이다. Needle로 어찌 풀어볼 꿈을 깨거나 아니면 Swinject을 적절히 섞어쓰거나.. 뭘해도 보기에는 좋진않을 것이다.

> 이미 당신의 옷깃을 바늘로 꿰맸다면.. 그저 바느질을 계속 이어나가라

#### 그리고…

당근마켓 iOS팀에서는 매월 한번씩 이러한 기술적인 워크샵을 통해서 함께 성장하고 영감을 얻어갑니다.

이러한 팀 분위기 속에서 성장하고 싶으시거나 본인만의 영향력을 보여주시고 싶으시다면, 아래 링크를 통해서 이력서를 제출해주시면 감사하겠습니다.

[**iOS 개발자 - 프로덕트 | 당근마켓 채용**  
_iOS팀에서는 코드 리뷰를 통해 개인과 팀이 함께 성장할 수 있다고 생각해요. 코드 리뷰를 통해 서로의 도메인 지식을 공유하고, 좋은 코드의 기준을 함께 만들고 있어요. 좋은 코드 리뷰 문화를 만들기 위해, 작은…_daangn.team](https://daangn.team/jobs/4300798003/ "https://daangn.team/jobs/4300798003/")[](https://daangn.team/jobs/4300798003/)

혹시, 부담스럽지 않으시다면 저와 ☕(티타임)도 언제나 환영입니다. :\] (david@daangn.com으로 이메일 보내주시면 됩니다.)