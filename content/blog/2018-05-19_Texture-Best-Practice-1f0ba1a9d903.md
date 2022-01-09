---
title: Texture Best Practice
description: Keeps the most complex iOS user interfaces smooth and responsive.
date: '2018-05-19T04:29:44.040Z'
tags: ["ios", "texture"]
categories: ["iOS"]
image: images/blog/1__IJLH2VMJTa298r1TiITSMA.png
---

![](/images/blog/1__IJLH2VMJTa298r1TiITSMA.png)

#### Keeps the most complex iOS user interfaces smooth and responsive.

— Texture —

> Texture is an iOS framework built on top of UIKit that keeps even the most complex user interfaces smooth and responsive. It was originally built to make Facebook’s Paper possible, and goes hand-in-hand with [pop](https://github.com/facebook/pop)’s physics-based animations — but it’s just as powerful with UIKit Dynamics and conventional app designs. More recently, it was used to power Pinterest’s [app rewrite](https://www.wired.com/2016/04/pinterest-reinvents-prove-really-worth-billions/).

안녕하세요!

현재 **Vingle**에서 iOS 개발자로 재직중인 하현수라고 합니다.

[**Vingle, Interest Network. on the App Store**  
_Read reviews, compare customer ratings, see screenshots and learn more about Vingle, Interest Network.. Download…_itunes.apple.com](https://itunes.apple.com/kr/app/vingle-interest-network/id637534820?l=en&mt=8 "https://itunes.apple.com/kr/app/vingle-interest-network/id637534820?l=en&mt=8")[](https://itunes.apple.com/kr/app/vingle-interest-network/id637534820?l=en&mt=8)

Github나 그 외 개발자 커뮤니티에선 **Geektree0101** 닉네임으로 활동하고 있습니다.

[**GeekTree0101 (Ha Hyun soo)**  
_GeekTree0101 has 39 repositories available. Follow their code on GitHub._github.com](https://github.com/GeekTree0101 "https://github.com/GeekTree0101")[](https://github.com/GeekTree0101)

지난 2018년 2월에 Vingle Tech-Talk에서 Texture를 주제로 발표를 했었습니다. _해당발표자료는 아래의 링크에서 확인하실 수 있습니다._

[**Vingle Tech Blog**  
_Very Community_medium.com](https://medium.com/vingle-tech-blog "https://medium.com/vingle-tech-blog")[](https://medium.com/vingle-tech-blog)

발표를 계기로 _“Texture를 어떻게 활용해야 잘 썼다고 할 수 있을까?”_ 를 고민하던 찰나에 Texture Best Practice를 포스팅하게 되었습니다. 아래와 같이 총 5부작으로 구성되어있습니다.

[**Texture Best Practice #1**  
_Texture Best practice #1 기초편_medium.com](https://medium.com/@h2s1880/texture-best-practice-1-4d830a7ff11b "https://medium.com/@h2s1880/texture-best-practice-1-4d830a7ff11b")[](https://medium.com/@h2s1880/texture-best-practice-1-4d830a7ff11b)

[**Texture Best Practice #2**  
_Texture Best Practice #2 LayoutSpec 기초 및 노하우_medium.com](https://medium.com/@h2s1880/texture-best-practice-2-7259bde869ee "https://medium.com/@h2s1880/texture-best-practice-2-7259bde869ee")[](https://medium.com/@h2s1880/texture-best-practice-2-7259bde869ee)

[**Texture Best Practice #3**  
_Texture Best Practice #3 iOS개발자가 FlexBox 를?_medium.com](https://medium.com/@h2s1880/texture-best-practice-3-eef064094f06 "https://medium.com/@h2s1880/texture-best-practice-3-eef064094f06")[](https://medium.com/@h2s1880/texture-best-practice-3-eef064094f06)

[**Texture Best Practice #4**  
_Texture를 사용하면서 주로 실수하는 부분과 노하우_medium.com](https://medium.com/@h2s1880/texture-best-practice-4-f8d137500bb4 "https://medium.com/@h2s1880/texture-best-practice-4-f8d137500bb4")[](https://medium.com/@h2s1880/texture-best-practice-4-f8d137500bb4)

[**Texture Best Practice #5**  
_MVVM 패턴을 활용한 Texture로 Application 만들기_medium.com](https://medium.com/@h2s1880/texture-best-practice-5-8958482e7fb3 "https://medium.com/@h2s1880/texture-best-practice-5-8958482e7fb3")[](https://medium.com/@h2s1880/texture-best-practice-5-8958482e7fb3)

Texture자체가 Learning Curve가 높은 편은 아니지만 1 ~ 5편까지 난이도를 단계적으로 포스팅 하였습니다.

현재 빙글에선

NewsFeed, User List, Profile, Talk(Chatting), Q&A, Interest Show, Card, Notification List 등 서비스 약 70% 이상을 Texture로 제작하였고 새로 개발되는 모든 UI 구성요소들이 Texture를 이용하여 개발되고 있습니다.

포스팅을 하면서, Texture를 사용하는 기간동안 있었던 여러 문제점들과 좋았던 점 그리고 각종 노하우들을 총정리해보는 시간이 였던것 같습니다.

[**A UI Framework for Effortless Responsiveness**  
_Texture_texturegroup.org](http://texturegroup.org/ "http://texturegroup.org/")[](http://texturegroup.org/)

![](/images/blog/1__H__YM6k1it8i78gZiy0fVNA.png)

Texture는 과거에 AsyncDisplayKit로 알려져있으며, Fork 약 2,600 Star 약15,000 을 보유하고 있고 Showcase는 약 30개의 플랫폼들이 등록되어 있으며, 많은 회사들이 사용하고 있습니다. 나름 튼튼한 UI 라이브러리 입니다.

[**Slack**  
_Edit description_asyncdisplaykit.slack.com](https://asyncdisplaykit.slack.com/messages/C42AW0GEQ "https://asyncdisplaykit.slack.com/messages/C42AW0GEQ")[](https://asyncdisplaykit.slack.com/messages/C42AW0GEQ)

또한, 슬렉 커뮤니티도 있으며, 현재 약 1670명의 회원들과 Texture 라이브러리를 관리 및 개발하시는 핀터레스트 개발자분들이 활동하고 계시며, Texture를 사용하시는 다른 플랫폼의 메인 iOS개발자 분들과 직접적으로 커뮤니케이션을 하실 수가 있습니다. 필자 또한 자주 활동하는 편입니다.

Texture Best Practice라고 주제를 잡았는데, 다소 부담스럽기는 합니다. 하지만, 개발방법이라는게 사람의 사고가 담겨져있고 기술이라는게 항상 변하는것이기에 이 포스팅이 100% 완벽하거나 10년 후까지 보장 할 수는 없습니다.

단지, UI개발을 xib나 storyboard를 쓰지않고도 이렇게 접근하여 이런 식으로 개발할 수도 있구나 라는 것을 얻어 가시면 충분하다고 생각합니다. 이러한점 구독자 여러분들께 양해부탁드립니다.

마지막으로, 읽어주시는 모든 구독자 여러분들께 진심으로 감사의 말씀을 드리며, 이러한 환경과 도움을 주신 Vingle 개발자 여러분들과 Vingle iOS 팀여러분들께 감사의 말씀을 드립니다.

감사합니다.

\[채용 관련 안내\]

빙글의 커뮤니티와 컨텐츠에 elegant한 UI를 더해서 사용자들에게 더 좋은 경험과 빙글에게 성공을 가져다 줄 iOS 엔지니어를 찾습니다.

빙글 iOS 엔지니어인 당신은 기획 팀, 디자인 팀과 함께 사용자들에게 즐거운 놀라움을 줄 수 있는 앱을 만들어갑니다. 컨텐츠는 물론이고 커머스와 광고까지 장인 정신으로 아름다운 UI와 코드를 동시에 구현합니다.

[**\[채용 공고\] Vingle에서 함께 성장할 동료를 찾고 있습니다**  
_관심사로 세상을 잇다! 관심사 기반 SNS, Vingle_careers.vingle.net](https://careers.vingle.net/#/engineering/ios "https://careers.vingle.net/#/engineering/ios")[](https://careers.vingle.net/#/engineering/ios)