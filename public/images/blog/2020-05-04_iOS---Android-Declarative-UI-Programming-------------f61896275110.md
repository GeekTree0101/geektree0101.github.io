---
title: iOS & Android Declarative UI Programming 방식이 가져온 변화들
description: Hello Declarative UI Programming!
date: '2020-05-04T04:06:32.216Z'
categories: []
keywords: []
slug: >-
  /@h2s1880/ios-android-declarative-ui-programming-%EB%B0%A9%EC%8B%9D%EC%9D%B4-%EA%B0%80%EC%A0%B8%EC%98%A8-%EB%B3%80%ED%99%94%EB%93%A4-f61896275110
---

### Hello Declarative UI Programming!

선언적인 UI 개발방식의 역사는 짧지만은 않습니다. 애초에 웹기술에서는 기본적으로 사용 되어왔던 방식입니다.

![](/images/blog/1__IyvnR__EdXOPedQb41JoBKA.png)

몇 년간 frame을 직접계산하거나 Constraints(제약)을 주는 방식으로 UI를 배치해오던 시절을 지나 현재 Native(Android및 iOS) 개발에 있어서도 선언적으로 UI를 개발하는 시대가 왔다는 사실이 기쁘지 않을 수가 없습니다.

![](/images/blog/0__RmryXA__G84YgiqEx.jpg)

3년전 웹개발을 그만두고 현업에서 iOS를 개발시작했을 때만해도 auto-layout과 constraints개발 방식에 대한 생산성과 유지보수 및 가독성에 좋지 않아 선언적으로 레이아웃을 설계할 수 있는 UI Framework인 Texture(AsyncDisplayKit)로 퉁쳐서 날로먹으며 지금까지 잘 사용해왔습니다. (물론 현업에서도 잘 쓰고 있습니다.)

![](/images/blog/0__puSogxWQb5Gcfprk.jpg)

하지만, 지난 2019년 WWDC에서 SwiftUI가 발표되었고 작별할 시간을 준비해야겠다는 직감이 왔었습니다.

Texture는 SwiftUI가 등장하기 전까지 뛰어난 성능과 DX(Developer experience) 를 제공해주어 왔었고, SwiftUI에 올라타기위한 초석이 되어준 부분에 대해서 매우 감사따름입니다. (SwiftUI영향인지, 지난 2년 비교했을 때 활동이 거의 없어졌습니다. :\[ )

하지만, SwiftUI는 iOS 13.x 이상부터 제공되기 때문에 12이하 유저가 거의 없어질 때 쯤이면 완전한 작별인사를 하게 될꺼 같습니다.

이러한 변화는 Apple뿐만아니라 Android에서도 나타나고 있었는데, 그것이 바로 Jetpack compose입니다.

![](/images/blog/1__WK0r3AzzxfqY7uT6epPm7Q.png)

Jetpack compose등장 전까지 만해도 Android도 iOS와 별반 차이없이 Constraint Layout형태로 UI를 배치하고 개발해왔습니다.

필자는 애초에 선언적으로 UI를 프로그래밍것에 대한 믿음이 강해서?인지, 사이드프로젝트나 취미로 Android개발할 때 Constraint Layout 를 쓰지 않고 선언적으로 Android UI를 개발할 수 있는 다른 UI framework를 찾아서 쓰곤 했었다. 대표적으로 Kotlin등장시쯤에 무너지기 시작한? Anko와 Texture(AsyncDisplayKit)의 이복형제? Facebook Litho가 대표적인 프레임워크입니다. _필자는 Litho에 밀었습니다. (물론 2달만에 접었지만 말이죠..)_

![](/images/blog/1__9kLXgTKUHWy64iP6SbI__fQ.png)

Texture(AsyncDisplayKit)이나 Litho가 Native개발에 있어서 선언적으로 UI를 개발하는데 초석역할을 한건 사실이지만 결국 이 둘은 3rd-party의 한계와 Web hot-reload방식으로 개발을 할 수 없다는 부분이 굉장히 아쉬울 수 밖에 없었습니다 :\[

> Web개발입장에서 보면 Native 개발방식은 덜진화한거 처럼 보일 수 밖에 ...

### Cross platform, 무게를 견뎌라.

사업측면에서의 비용절감을 위한 니즈들과 쾌적한 개발경험을 위해서 수십년동안 각종 하이브리드 & 크로스 플랫폼 프레임워크들이 등장을 했었습니다.

Crosswalk프로젝트로 부터 시작된 PhoneGap, Cordova부터 시작해서 C# Xamarin, React.js로 부터 영감을 받아 탄생한 React-Native 등등.

특히, React-Native는 혁명적이긴 했다. Native퍼포먼스와 hot-reload 개발방식에 대한 갈증을 동시에 충족시켜줬기 때문!

하지만, 강과 호수를 통일하고자 한다면 그 무게와 고통을 감내해야하는 법!

![](/images/blog/1__Ub__LmG2sw1DB7hIYSMal0Q.png)

Android나 iOS는 성장은 결코 느리지 않고 그들이 성장할 때마다 그 성장고통은 크로스 플랫폼을 유지하는 자의 몫이라 생각합니다.

> React-Native에 헌신하시는 수 많은 컨트리뷰터들과 Facebook에 이 글을 빌어 감사의 인사를 드립니다.

이렇게 React-Native 가 능지처참 당하는 동안 Google에서도 혁신?적인 크로스 플랫폼을 들고 나오게 되는데…

### 그의 이름은 Flutter

![](/images/blog/1__MHs7TX____xSZcKRGSSHJtJg.png)

부유한 가정(Google)에서 태어난 친구라 그런지 등장부터 우람한거 같습니다. 꽤나 많은 기능을 제공할 뿐더러 Native 개발자들의 갈증을 해소해주는데 있어서도 사이다 같은 크로스 플랫폼입니다.

React-Native와 큰 차이점이라면 Javascript engine 을 쓰지않고 자체적인 Skia 2D graphic engine을 사용한다는점!

거기에 언어는 Dart를 사용하는데..

오래전에 웹개발시절엔 Dart 굉장히 극혐?했지만, Dart채택으로 수 많은 웹개발자들의 네이티브 앱 개발의 진입장벽을 낮추는 데는 한 몫한거 같습니다. (주변 웹 개발자들이 Flutter로 네이티브 앱 뽑아내는 거 보면 참말로 신기합니다.)

![](/images/blog/1__6ne9vNSTqf7RJnV__ibqAjQ.png)

_어찌됬든, Flutter가 Dart를 선정한 이유에 대해선 위 링크를 읽어보면 이해가실꺼라 생각합니다._

수 많은 팬들이 있기 때문에 스타가 빛나는 것처럼, 크로스 플랫폼을 빛나게 하는데는 거대한 소비자들이 중요합니다.

그 중 중국 알리바바 Xian yu가 대표적입니다.

![](/images/blog/1__HOp6jXU7uOg1MResV__675A.png)
![](/images/blog/1__fUxErbw__vFqI2paggUsblw.png)

작년까지만해도 피드나 게시글 상세화면 진입시 프레임드랍이 상당히 심했었는데, 많은 숙련을 거쳤는지 아직까진 프레임 드랍이 소소하게 남아있는 편이지만 많은 기능들과 빠른 디자인 변화를 보면 Xianyu 개발자들이 Flutter를 통해서 좋은 경험?을 하고 있는거 같다고 생각합니다. (파이팅…)

### 크로스 플랫폼이 매력적일 수 밖에 없는 이유들

앞서 여러번 언급했었지만, **비용**과 **생산성** 그리고 **개발경험**들이 React-Native와 Flutter 선택을 유도하는 큰 요인이 됩니다.

*   돈도 없고, 개발자도 별로 없고
*   빠르게 프로토 타입을 뽑아내고 프로덕션에 배포해야하고
*   hot-reload를 제공해주지 않아서 매번 빌드돌리고 기다려야하고…

이렇게 크로스 플랫폼이 지구상에서 탈춤 추는 와중에도 탈 크로스 플랫폼을 한 사례도 있는데 에어비엔비가 대표적인 사례입니다. (당시 에어비엔비 탈 크로스플랫폼 medium articles이 나왔을 때 굉장히 충격적일 수 밖에 없었습니다.)

[**Sunsetting React Native**  
_Due to a variety of technical and organizational issues, we will be sunsetting React Native and putting all of our…_medium.com](https://medium.com/airbnb-engineering/sunsetting-react-native-1868ba28e30a "https://medium.com/airbnb-engineering/sunsetting-react-native-1868ba28e30a")[](https://medium.com/airbnb-engineering/sunsetting-react-native-1868ba28e30a)

애초에 에어비엔비는 훌륭한 네이티브 개발자들이 많기 때문에 탈 크로스플랫폼해도 큰 문제는 없을 뿐더러, 오히려 네이티브에 리소스를 더 투자할 수록 크로스 플랫폼 틀을 벗어나 더욱 더 네이티브가 성숙할 수 밖에…

### 고기는 직접 뜯어 먹어봐야 맛을 아는법

필자는 SwiftUI 몇달 밖에 안된 경험들을 기반으로 Jetpack compose를 활용해서 UI 동일한 android sample app을 개발해서 SwiftUI와 Jetpack compose가 네이티브 개발자에게 주는 DX(Developer Experience)를 체감해보기로 했습니다.

![](/images/blog/1__eesXHk1ISO3OLF34t0aD__w.png)

뭘 만들까 하다 무의식적으로 만든 홍당무?마켓 중고거래 피드 레이아웃을 간단히 설계해봤습니다. (2년전 Litho랑 Texture 둘 다 만들어서 비교했던 경험이 생각났습니다. :\] )

#### UI Layout API 측면에서의 비교

SwiftUI나 Jetpack compose둘다 flexbox를 근간으로 layout을 설계 및 UI 배치하는데 특성을 아주 잘 살렸습니다. (100점)

설계부분에 있어서 용어나 사용되는 parameters, 특별히 제공되는 Compoents 차이를 제외하고 설계하는 경험에 있어서는 큰차이 없어서 필요한 Components를 찾아서 넣는 방식으로 해도 생각한 만큼 뇌더링했던게 잘 표현되서 기분은 좋았습니다.

좀 파괴적인 부분이라면 기존 UIViewController의 라이프사이클은 잊혀진 존재가 되어버린 부분이다. 대신 특정 UI 컴포넌트에 대해서 onAppear와 onDisappear이렇게 두가지가 제공됩니다.

Jetpack compose도 마찬가지로 Activity위에 setContent 후 Activity의 라이프 사이클을 사용은 할 수 있으나. SwiftUI 와 마찬가지로 onActive, onDispose가 제공됩니다.

요약하자면 구석구석 다른 부분있어도 숲을 보면 큰차이가 없습니다.

#### IDE에서 제공하는 Preview 기능 측면에서 비교

![](/images/blog/1__NaKqyK91ur5wps3BMu8MFQ.png)
![](/images/blog/1__1CkETQFpNaiJ__ib6kJl5oA.png)

Preview기능적인 측면에서는 Xcode가 더 많은 기능들을 제공해주고 사용하기도 편리했습니다.

안드로이드 스튜디오에 비해서 Xcode Preview가 주는 장점이라면

*   인터렉티브한 프리뷰
*   반응형 hot-reload (컴포넌트의 어트리뷰트 변화에 즉시 hot-reload를 잘 표출해주는 부분)
*   Android Preview보다 훨씬 빠름

기능적인 측면에선 의외로 애플이 영혼을 갈아 넣었다 싶을정도로 잘했지만, 코드스타일은 Jetpack compose preview선언시 어노테이션을 붙이는 스타일이 훨씬 이쁘긴했습니다.

크로스플랫폼으로 개발하는거에 비하면 동일한 코드를 작성하는데 있어 손은 많이 가지만, 각 플랫폼의 IDE와 Kotlin과 Swift가 제공하는 매력, 네이티브로 개발하는 즐거움을 주는데는 큰 손색은 없는거 같습니다.

다만, 현업에서 한사람이 위에 샘플 프로젝트 개발하듯이 왔다갔다하는건 피곤해질 수 있을꺼 같습니다.

단순히 네이티브도 선언적으로 UI를 개발하는 방식으로 채택했을 뿐인데 체감할 수 있을 정도로 많은 변화를 기여해주신 Jetpack compose및 SwiftUI 메인테이너분들께 감사할 따름입니다.

### 마무리

![](/images/blog/1__MHs7TX____xSZcKRGSSHJtJg.png)
![](/images/blog/1__6jLrpSk3V6KzN8AJ1FI0iw.png)

Flutter의 등장으로 인해 각 플랫폼과 많은 앱들에 잠식하여 Jetpack compose나 SwiftUI가 초크슬램?당할일도 없을것이며, 그렇다고 Jetpack compose랑 SwiftUI가 Flutter를 두들겨팰 정도로 엄청 뛰어나다고 할 수 없는게, 사용자의 상황이나 환경에 따라서 차이만 있을 뿐 모두 다 뛰어난 프레임워크들입니다.

다만 앞으로 향후 1~2년 동안은 Jetpack compose나 SwiftUI에는 많은 리소스가 투입되어 많은 성장을 하게 될 것이기 때문에 많은 관심을 가질 필요는 있습니다.

그리고 Flutter의 발전과 능지처참을 인내할 수 있도록 물떠놓고 기도하겠습니다.

![](/images/blog/0__Ll9skGaWpFwmgbMv.png)

특히, 안드로이드 개발자분들께서는 먼 미래?Fuchsia OS를 생각해서 Flutter에 관심을 쏟는건 좋은 일이라 생각합니다.

[https://meowyorktimes.com/20200106.html](https://meowyorktimes.com/20200106.html) SwiftUI & Flutter

[https://juejin.im/post/5d05b45bf265da1bcc193ff4?fbclid=IwAR3e46FZ\_tzNPHL2ZTH839K3j-lYoHsJrOdG0ssoawgxTNwK5ymiqPbaMHc](https://juejin.im/post/5d05b45bf265da1bcc193ff4?fbclid=IwAR3e46FZ_tzNPHL2ZTH839K3j-lYoHsJrOdG0ssoawgxTNwK5ymiqPbaMHc) SwiftUI or Flutter?

[https://brunch.co.kr/@jowlee/101](https://brunch.co.kr/@jowlee/101) React Native or Flutter?

[https://medium.com/@jolanda.verhoef/take-aways-comparing-flutter-to-jetpack-compose-a26775617e38](https://medium.com/@jolanda.verhoef/take-aways-comparing-flutter-to-jetpack-compose-a26775617e38) Take aways comparing flutter to jetpack compose

[https://medium.com/airbnb-engineering/react-native-at-airbnb-f95aa460be1c](https://medium.com/airbnb-engineering/react-native-at-airbnb-f95aa460be1c) react native at airbnb

[https://blog.karumi.com/android-jetpack-compose-review/](https://blog.karumi.com/android-jetpack-compose-review/) jetpack compose review