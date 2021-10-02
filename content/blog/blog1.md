---
title: "Clean Swift Scaffold"
date: 2021-08-21T00:00:00+09:00
image: "images/blog/clean-swift-scaffold.png"
tags: ["ios","golang","utility"]
description: "This is meta description."
draft: false
---

<img class="blog-image" src="/images/blog/0_HbLR1Ytta-XzFphU.png" />

2019년 6월쯤이였나.. 당근마켓은 서초루비를 운영하면서 뛰어난 루비개발자들이 루비로 당근마켓 서비스를 열심히 만들고 있었다. (물론 지금도 루비개발자들이 많이 계신다.)
하지만 어느순간 고퍼(golang을 다루는 개발자)분들이 점점 늘어나기 시작하고 당근 repository엔 고퍼들의 작품들이 점점늘어나기 시작했다.

비록 iOS개발자이지만 파도가 밀려오면 이 때 파도를 타고 노를 저어야겠다는?직감을 가지고 당근에 있는 고퍼분들이 작성한 코드를 흩어보면서 수 개월동안 golang을 기반으로 이런저런것들을 만들어 보기 시작했고, 결국 주로 다루던 Swift몹지 않게 나름? 생각한 것들을 뚝딱뚝딱만들어 내기 시작했다.

<br><br>
## iGospy
https://github.com/GeekTree0101/iGospy

2020년 8월쯤이였을꺼다. 당근에 입사와 동시에 iOS동료인 Marty와 함께 당근마켓 iOS아키텍쳐 방향에 대해서 고민하면서 Clean Swift를 도입하고 Templates를 이용해서 필요한 파일들을 만들고 작성을 해왔다.
하나의 화면을 구성하는데는 다음과 같은 파일과 객체들이 필요했다.

- Interactor
- ViewController
- Presenter
- Router
- Worker
- Model
- Interactor Unit Test
- Presenter Unit Test
- ViewController Unit Test

특히, Interactor, Presenterm Router, Worker같은 경우에는 테스트를 위한 Spy객체는 파일생성후 별도로 코드를 Usecase에 따라 작성을 했어야했는데.. 이 과정이 몹시 귀찮았다.

*한번 다 작성하고 나면 평균적으로 500~600라인의 코드가 생성이 된다.*

그래서 Usecase만 작성하고 Usecase를 기반으로 Implementation code와 Spy객체에 필요한 code를 자동으로 생성해주는 유틸리티를 만들게 되는데 이것이 iGospy다.


<img class="blog-image" src="/images/blog/1_9YW_r2G70sI0HS_ojPvC-w.png" />

위와 같이 코드를 입력하고

<img class="blog-image" src="/images/blog/1_yRHBsq3pwxC4WPm387xFUQ.png" />

이렇게 짠! 하고 코드가 생성이 된다. 이것을 프로젝트 소스파일에 복붙하면 된다.

기존보다는 확실히 화면하나 준비하는데 부담감은 많이 줄었다!
하지만 복붙하는것마저도 몹시 귀찮았다…


<img class="blog-image" src="/images/blog/1_5sKgkpXFFZZo5ZTxbTPSaQ.png" />

Ruby on rails처럼 커멘드만 간단하게 입력해서 마법과 같이 화면에 필요한 객체들과 Usecase그리고 Spy까지 만들어주면 얼마나 편할까… 하고 혼자 생각에 잠겨있다가 용기를 내서 Clean Swift Scaffold라는 것을 만들기 시작했다.


<img class="blog-image" src="/images/blog/clean-swift-scaffold.png" />

처음엔 golang으로 내 편한방식과? 의식의 흐름대로 코드를 작성해나가기 시작했다. 아무래도 소스코드를 생성해줘야하는데 띄워쓰기나 줄바꿈 마저도 정교하게 기대하는대로 생성하고 잘 동작하기 위해선 검증을 해야했고, 또한 중간에 수정을 하더라도 사이드이펙트 발생에 대한 두려움을 잠재우기 위해서 테스트 주도 개발로 작업을 진행했었다.

<img class="blog-image" src="/images/blog/1_of__aeTcxWPo7EHYX60lVg.png" />

당연히 테스트를 작성했기 때문에 중간에 구현체를 리펙토링하거나 수정을 하더라도 안정감있게 개발을 할 수 있었다. 만약 작성하지 않았더라면 오류를 삽질하다가 스트레스 받고 중간에 포기하고 결국 세상밖에 못나왔을것이다.



<img class="blog-image" src="/images/blog/0_o1zSmPhkzjfNl_yg.png" />

결국 동작방식은 ruby on rails generate와 유사한 방식으로 사용하기 위해서 커멘트 툴을 구축해야했고, 당근 고퍼들이 즐겨쓰는 Cobra를 적극적으로 활용을 했다. (사실 이 만한 서드파티는 없다.)

이전에도 평소에 Toy project할 때도 자주썼었는데, 이번엔 flag가 필요했었고 처음으로 cobra에서 제공하는 flag를 사용해봤었는데 굉장히 쉽게 사용할 수 있도록 잘되어있었고 생각하는 flag 제공패턴들을 다 준비되어있었다.

<br><br>
### 잠시 가볍게 알아보는 Cobra's Flag

<img class="blog-image" src="/images/blog/1_7805dVpJz2W8fav0ErVkSw.png" />

StringVarP name flag기준으로 들어가는 arguments를 보면
&name: 입력한 flag 의 value값을 해당 변수에 저장해준다!

“name”: flag의 기본 이름 (사용예시: — name)
“n”: flag의 단축형 이름 (사용예시: -n)
“”: 빈 string값을 넣었는데 이 영역은 flag를 사용하지 않았을 때 처리되는 기본값(default value)를 의미한다.
“Usecase name, ~~~”: 해당 flag의 설명(description)에 해당

이 만큼 정말 직관적이고 편리하게 제공되고 있다.

<br><br>
## 어떻게 Export하지…

사실 golang으로 뭔가 만들어서 서드파티를 제공해본 경험이 없는게 함정…

*분명 외부에서 사용하도록 제공하기 위한 국룰(기본 컨벤션)같은 것이 있을꺼 같아서 다른 서드파티들을 둘러봤는데 역시… 정답은 없는것인가;; 혹시 좋은 방법있다면 코멘드 남겨주시면 감사하겠습니다..*

결국 궁극적으로 다른 개발자나 혹은 동료들이 사용하기 위해서 필요한 건 cmd고 cmd를 기존에 구축해둔 cmd에 무지성으로 추가만 하면 구축할 수 있도록 최소한만 제공해보자 해서 cmd의 use만 자유롭게 가변할 수 있도록 parameter로 받고 scaffold cmd객체를 반환만 하도록 설계를 해서 Deploy했고 실험적으로 개인적으로 했었던 프로젝트(Uber의 Needle을 가볍게 사용해보았던 프로젝트, 다음에 이것도 글로 작성예정)에 도입을 해봤다.


<img class="blog-image" src="/images/blog/0_werKZWhFCEK-z8BL.png" />

어어… 한번에 성공하면 안되는데… 너무 잘동작해버려서 몹시 당황스럽다..

심지어 결과물도 문제가 없었다… (소리없는 기쁨의 아우성)

<img class="blog-image" src="/images/blog/0_vTQubwdkTqFxEtT0.png" />

다음날 Demo를 준비해서 당근마켓 iOS동료들앞에서 이 마법과 같은 순간을 공유하고 피드백도 받았었다. 몹시 기뻤다.

- 중간에 새로운 Usecase추가할 수도 있으면 좋겠어요.
- Created by <name> 에서 name은 스크립트를 실행한 사람의 이름으로 들어가면 좋겠어요.
- 저희 Pure쓰는데 Pure안써도 되는 Templates뿐만 아니라 Pure도 적용된 Templates도 지정해서 동작할 수 있으면 좋겠어요.
- 저희 iOS 프로젝트에 go의존성도 있고 요상한 go로 만든 것들 있는데 다른 레포로 빼서 옮겨줬으면 좋겠어요. (sorry…)

<br><br>
## 마무리

사실 이러한 프로그램을 만드는데 있어서 언어는 중요하진 않다. 당연히 Ruby나 Swift로도 충분히 만들 수 있다.
이러한 프로그램이 나올 수 있었던 가장 큰 본질은 이 무더운 여름날 땀흘려가면서 키보드위에서 손가락 크로스 핏을 뛰고 있는 고생하는 동료에 대한 사랑하는 마음에서 우러났기 때문이라 생각한다.
<br><br>