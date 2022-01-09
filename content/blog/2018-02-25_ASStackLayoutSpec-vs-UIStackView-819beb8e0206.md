---
title: ASStackLayoutSpec vs UIStackView
description: 지난 2018년 2월 Vingle Tech-Talk에서 받은 질문중 하나가 아직도 기억에 남는다.
date: '2018-02-25T08:28:49.375Z'
tags: ["ios", "texture"]
categories: ["iOS"]
image: static/images/blog/1__oE94__u2j6bqVtjEfNHQJbA.png
---

지난 2018년 2월 Vingle Tech-Talk에서 받은 질문중 하나가 아직도 기억에 남는다.

Q. UIStackView가 있는데 (또는 관련 라이브러리 OAStackView) 굳이 Texture로 ASStackLayoutSpec으로 Stack UI를 만들 필요가 있나요?

발표 취지는 Texture를 사용하면 UIKit로 순수하게 만드는 것과 비교해서 상대적으로 좋은 점에 대해서 발표했던거였지만, 위의 질문은 Texture를 아예 쓰지않는 사람에게는 이해는 간다만…

당시 질문에 대해서 제대로 답변을 하지 못했던 점이 아쉬웠다. (UIStackView과 비교를 딱히 한적도 없고 단순 사용이 아닌 실제 UI가 사용자에게 보여주기 전까지의 모든 내부적인 동작에 대해서 알 방법이 없기 때문)

이번 글 포스팅을 계기로 한번 정리하고자 한다.

우선 짚고 넘어가야할 것이 왜 Texture인가? 에 대해서 말하자면, Texture의 핵심적인 기술인 ASRunLoopQueue를 먼저 볼 필요가 있다.

[ASRunLoopQueue에 대해서 요약을 하자면](http://texturegroup.org/docs/asrunloopqueue.html)

UI를 사전에 준비하고 UI에 대한 객체의 생성을 작은 UI조각으로 펼칠 수있는 버퍼를 제공하는데, 이게 화면에 있어야 할 때가 끝나지 않으면, 나머지 UI들을 하나의 UI로 만들어야지 성능에 이득이 있다.

하지만 UIKit의 UI Components들은 UI가 실제 사용자에게 보여지기 전, 세분화된 UI Component들을 하나의 UI로 만드는 비슷한 메커니즘이 없으며 하나의 큰 덩어리형태의 UI로 그냥 냅다 rendering한다는 것이다.

따라서 Texture설명을 UIStackView에 응용하자면, UIStackView도 UIKit에서 제공하는 하나의 거대한 UI덩러리라는 것이고, StackView에 들어가는 Components들 또한 사용자에게 보여지기 전까지 한번에 작업을 해야한다는 것이다.

![](/images/blog/1__oE94__u2j6bqVtjEfNHQJbA.png)

하지만 ASStackLayoutSpec은 위의 그림에 해당하는 layoutTahtFits의 메서드에서 처리되며 즉 Background Thread에서 UI가 사용자에게 보여지기 전에 사전 작업을 한다는 것이다.

그렇다면 [UIStackView](https://github.com/GeekTree0101/iOS-Runtime-Headers/blob/master/Frameworks/UIKit.framework/UIStackView.h)는 Stack상의 UI Components를 사용자에게 보여지기 직전까지 어떠한 과정과 작업을 거치는지는 솔직히 자세히 알 수가 없다.

그렇다면 무식하지만 비교할 수 있는 방법이라면 두가지 방법이용해 똑같이 만들어서 퍼포먼스를 비교해보는 수 밖에…

![](/images/blog/1__zxjRr2w2rxKBIop__5__jLrQ.png)
![](/images/blog/1__PYhAgQw4E5fKlnrVVC5ucw.png)

위의 사진과 같이 (좌)와 Xib로 간단히 Stack View가 들어간 UITableViewCell을 만들고 (우)와 같이 Texture를 이용한 좌측과 똑같은 스펙의 Stack Cell을 만들었다.

따라서 1000개의 Cell를 만들어서 Instrument 도구로 체크한 결과

![](/images/blog/1__60RHuJRCoFuqq__MW826qsQ.png)
![](/images/blog/1__U7dtBcSaAD__ez__QH5kg0ZA.png)

다음 과 같은 결과값을 확인 할 수가 있다.

좌측의 경우 UIStackView와 UITableCellView로 만든 결과 값인데, UI가 rendering되기 전까지 압도적으로 MainThread를 70~100%를 사용하는 것을 볼 수가 있다.

이에 반해서 우측 Texture로 만든 ASCellNode의 경우에는 실제 Layout를 구성할 때 두개의 Background Thread 에서 점유하면서 실제 보여지는 시점에서 MainThread를 사용하는 것을 볼 수가 있다.

![](/images/blog/1__IaqyY192woD8ohWtqX__wvQ.png)

솔직히 아주 간단한 UI로 만들었기 때문에 퍼포먼스 차이를 유저나 개발자가 느낄 수가 없다.

하지만.

![](/images/blog/1__Czub7tn3UZhl__wx7XYMqJA.png)

만약 좌측 이미자와 같이 다양한Media Case와 label, button 등등 복잡한 Cell의 경우에는 퍼포먼스가 차이가 날 수 밖에 없지 않을 까?

> 심지어 저 Media Case의 경우 UIKit로 만들면 Constraints 지옥맛보게 될 것이다.

> 반면 Texture는 Constraints를 전혀 쓰지 않고 [CSS FlexBox개념](https://code.facebook.com/posts/1751945575131606/yoga-a-cross-platform-layout-engine/)으로 만들기 때문에 코드 몇 줄이면 간단히 만들 수가 있다

물론 UIKit로 만든다는게 나쁜건아니다. 오히려 아주 간단한 UI라면 UIKit로 만드는게 쉬울 수도 있다.

하지만 서비스가 커지고 복잡성이 커질 수록 UIKit를 사용하면서 퍼포먼스 성능을 위해 튜닝하는데 소요되는 시간에 비해서 Texture가 생산성이 좋다는 걸 실제 회사내에서 프로젝트를 진행하면서 경험했다.

Texture 정말 매력적인 라이브러리인건 확실하다.

더 자세히 알고싶다면 [http://texturegroup.org/](http://texturegroup.org/) 를 참고 하시길 바랍니다.