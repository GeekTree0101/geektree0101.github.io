---
title: 맛있는 반응형 스파게티 레시피
description: "Rx(ReactiveX)는 정말 힙하고 멋지고\_.. Awesome합니다."
date: '2019-09-18T15:26:05.031Z'
tags: ["ios", "RxSwift"]
categories: ["iOS"]
image: "images/blog/0__sBBV3zUsPP5bsnPM.jpg"
---

![](/images/blog/0__sBBV3zUsPP5bsnPM.jpg)

Rx(ReactiveX)는 정말 힙하고 멋지고 .. Awesome합니다.

Map, FlatMap, Merge, withLastestFrom등과 같은 수 많은 연산자들과 유연한 스케줄링 및 멀티스레딩 등…

요즘 주변 개발자들을 봤을 때, 코드 레시피에서 빠질 수 없는 재료이기도 합니다.

필자도 Rx를 많이 좋아합니다. 몇 년간 Rx를 가지고 여러가지 코드를 요리한 레시피를 소개해볼까 합니다.

#### 1\. FlatMap/SwichMap 등 Rx에서 제공하는 여러 연산자를 체이닝해서 사용하면 멋지고 아름답습니다.

![](/images/blog/0__sn__OFCb0W73maf7V.png)

필요에 따라 변환 또는 조합 연산자를 활용하여 적절히 다른형태의 Observable을 반환 할 수 있습니다.

꽤나 유용하기 때문에 체이닝해서 쓰셔도 좋습니다.

let userDidTapLoginButton = PublishSubject<Void>()

userDidTapLoginButton  
.withLastestFrom(userInputData)  
.flatMap { () -> Observable<Auth> in 

   return API.login(id, pw)  
}  
.flatMap { auth -> Observable<User> in 

   return API.userInfo(auth.token)  
}  
.flatMap { user -> Observable<?> in 

   return ...  
}  
// ...

6개월뒤에 본인이 쓴 오퍼레이터들의 의도를 파악하기 힘들다면 또는 동료가 파악하기 힘들꺼 같다면 **주석**을 남겨주는것도 하나의 방법입니다.

let userDidTapLoginButton = PublishSubject<Void>()

// 로그인버튼누르면 유저가 넣은 데이터를 가지고 Auth를 받아와서 받아온걸로   
// 유저데이터를 받아와서 받아온걸로 .... .해서 할꺼에요.

userDidTapLoginButton  
.withLastestFrom(userInputData)  
.flatMap { () -> Observable<Auth> in

  return API.login(id, pw)  
}  
.flatMap { auth -> Observable<User> in

  return API.userInfo(auth.token)  
}  
.flatMap { user -> Observable<?> in

  return ...  
}  
// ...

선형적으로 코드를 작성했을 때 보다 상대적으로 굉장히 **힙** 해보입니다.

주변 동료들에게 자랑하십시오.

#### 2\. 동료가 설계한 스트림을 건들지 않고 내가 하고싶은 일을 하고 싶으면 do operator를 사용하십시오.

Observable  
.map { ... }  
.map { ... }  
.flatMap { ... }  
.withLastestFrom(...) ...

위와 같이 동료가 아주 멋지고 고급지게 오퍼레이터들을 사용했습니다.

하지만 동료가 만든 코드를 영향을 주지않고 다른 일을 해야한다면 do 를 쓰는 것이 매우 좋습니다.

Observable  
.map { ... }  
.map { ... }  
.flatMap { ... }  
.withLastestFrom(...)  
.do(onNext: { TODO }) // 짠!

본인도 만족하고 동료 정신건강챙기고 이것이야말로 **1석 2조** 입니다.

#### 3\. 땜빵치기에는 skip, take, delay 와 같은 오퍼레이터를 사용하시면 정신건강에 이롭습니다.

BehaviorSubject는 필요한데 구독 시점에 이벤트가 필요없다면 skip(1) 쓰시면되고, 한번만 이벤트 받고 싶으면 take(1), 약간의 딜레이가 필요하다면 delay 오퍼레이터를 적극적으로 쓰시면 **정신건강에 매우 이롭습니다.**

#### 4\. 계층간의 경계연결을 Subject로 Input주고 Observable로 Output를 받아서 구독하십시오.

![](/images/blog/0__l3__lpk8QaXs7KNVA.png)
![](/images/blog/0__7iN8Z__Q1JXr2u91E.png)

Rx로 계층간 연결하면 **Clean**해집니다. 단순함의 미학을 느낄 수가 있습니다.

#### 5\. 제 코드에 있는 Observable을 수정했는데 동료가 작성한 코드에서 버그가 발생했어요!

동료가 본인의 Observable를 구독했으니 동료에게 차근차근 잘 설명하고 설득해서 수정해라고 요구하십시오. 그래도 동료가 징징거리면 동료가 구독받는 Observable은 냅두고 보일러플레이트 코드를 쓰십시오.

어찌됬든 정상동작만하면 되는겁니다.

#### 6\. RxTest를 이용해서 테스트코드를 작성하는데 virtualTime 0이 집계되네요..

테스트코드에 skip(1)을 추가하시면 정신건강에 이롭습니다.

![](/images/blog/0__n8AbMRa8DZkt__PqO.jpg)

하아.. 이… 예측할 수 없는 매력…

필자가 하고싶은 말은 사실 다음과 같습니다.

*   동료가 고통받지 않게 예측할 수 있는 코드를 작성하십시오.
*   함수형 프로그래밍 광신자가 되지 마십시오. (적당한게 최고)
*   우아한 코드보다 실용적인 코드를 작성하십시오.
*   동료에게 자신감있고 확신할 수 있는 코드를 선물해주세요.
*   반응형 코드를 만드는데 Rx가 필수는 아닙니다.

> When you have a hammer everything looks like a nail.