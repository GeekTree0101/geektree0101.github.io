---
title: 2022년 목표
description: 2022년 당근마켓 글로벌 프로덕트팀 어느 iOS개발자의 목표
date: '2022-01-13T00:00:00.390Z'
tags: ["Vision"]
categories: ["Vision"]
---

2019년 10월 영국에 당근마켓(Karrot)을 출시를 했다. 내가 6월에 입사하고 글로벌 진출은 상상도 못했었는데 지금까지 글로벌 프로덕트를 개발하면서 행복한 나날들을 보내왔다. 그리고 영국에 이어서 캐나다/미국(북미)진출을 하고 현재 일본까지 동료들과 열심히 달려서 iOS앱을 진출시켰다.

현재 글로벌 프로덕트팀이라는 목적조직과 각 국가팀들과 함께 유기적으로 글로벌 서비스를 열심히 만들어나가고 있다.

시간이 지나면서 회사의 성장과 함께 동료들도 하나둘씩 늘어가기 시작했고, 글로벌 프로덕트팀엔 PM 3명, 디자이너 1명, 안드로이드, 서버 개발자, 유저 리서처 그리고 iOS개발자 나까지 포함해서 10명 이상 훌쩍넘겼다.

팀의 구성원이 작을 수록 행?복하지만 앞으로 달성하고 싶은 목표들과 만들어나가야하는 서비스들이 많기 때문에 자연스럽게 메이커들이 더 필요해지는 상황까지 도달하게 되었고, 조만간 나와 함께 글로벌 프로덕트를 만들어 나갈 새로운 iOS개발자 동료를 맞이하게 될 꺼 같다.

짧으면서도 긴 시간동안 글로벌 프로덕트를 만들어나가면서 가장 크게 느낀 점이라면, 글로벌 프로덕트팀 구성원 모두가 다른 국가출신들과 다양한 해외 경험들을 접한 분들이 뭉쳐있다보니 서로서로 많은 인사이트를 주고받고 서비스에 녹여내는 부분에서 큰 행복을 느낄 수 있었고 개발자라고 단순히 개발만 하는 것 뿐 만 아니라 유저를 위한 서비스 측면에서의 아이디어나 기획과정에서의 참여도가 높기 때문에 앞으로 새로운 맴버들이 합류하게 되더라도 이 것만큼은 정말 유지하고 싶은 욕심이라면 욕심이지만 그런 기대감을 저버릴 수가 없었다.

시간이 지나다 보면 글로벌 프로덕트팀에서의 iOS개발자가 1명 부터 시작해서 2명이 될 테고 2명에서 4명이 되고 점점 늘어나게 될 텐데, 
글로벌 프로덕트 팀의 유일한 iOS 개발자로서 첫 단추를 어떻게 꿰맬까에 대한 생각들과 앞으로 더 많은 국가에 진출하게 되는 과정동안 글로벌 프로덕트를 어떻게 **다양한 서비스 제공**과 **고도화** 그리고 **안정적**인 제품 출시를 해나갈지에 대해서 끄적여보려고 한다.

### 단순 개발뿐만 아니라 해외경험이 있는 개발자 또는 국내에 체류중인 외국인 개발자와 함께 일해보기
직접적으로 국내에 체류중이거나 해외에 거주중인 iOS개발자와 현업에서 일해본 경험은 사실 없지만, 오픈소스 커뮤니티에서 Muchab과 DM도 주고받고 당근마켓 iOS개발자들과 기술 티타임도 해보기도 했었는데 단순 기술적인 것 뿐만 아니라 커뮤니케이션에 있어서 접근법이나 소통하는 방법에 대해서 많은 것을 배웠다. 뿐만 아니라 현재 글로벌 프로덕트팀내에 서버개발자도 국적이 미국인인데 엔지니어링 관점에서 커뮤니케이션할 때 설계에 있어서 바라보는 관점이나 서비스를 기술적으로 풀어나가는데 있어서 정말 많은 인사이트를 얻을 수 있었다.

비록 몇 명 안되는 외국인 개발자들과 교류를 했지만 문화나 언어만 다를 뿐 서비스를 기술로 풀어내는 관점이나 시야가 많이 넓어 질 수 있는 걸 크게 경험할 수 있었다. 그래서 만약 더 다양한 국적의 개발자들과 협업을 하게 되면 그것이 곧 서비스에도 녹여들게 되고 자연스럽게 전 세계 인류가 만족할 수 있는 제품을 만드는게 큰 시너지를 줄 것이라 생각한다. 서비스 뿐만 아니라 프로젝트의 코드 설계나 스타일에도 영향을 줄 수 있을꺼라 생각한다.
만약 외국인 iOS개발자가 합류하게 된다면, 당근마켓 iOS챕터 구성원들의 글로벌 서비스 개발의 시야를 넓혀주는데 많은 좋은 영향을 주길 기대해본다.

### 국가별 Test Plan 작성하기

![](/images/blog/xctest.png)

당근마켓 iOS챕터에서는 개발과정에 있어서 UI 테스트 자동화를 배제한 UseCase/Presentation 로직은 Unit Test를 작성하고 있다. 작성을 열심히 시작한지는 2018년 부터 Marty(magi82)가 당근마켓에 합류하고 난 이후시점부터 였는데, 현재 나눠진 프레임워크들까지 포함해서 약 5500+ 이상의 테스트 코드로 검증하고 있다. 

그럼 국가별로 테스트는 어떻게 했냐면, 국가별로 프로젝트가 있는 것이 아닌 싱글 프로젝트에서 코드베이스로 국가분기를 하고 있기 때문에 상황에 따라서 국내 or 글로벌, 영국/북미 vs 한국/일본 이런식으로 필요에 따라 unit test를 method네이밍에 명시적으로 분리해놓은 상태다.
나름 혼자서 국내를 제외한 영국/북미/일본 국가 제품들을 혼자서 개발하고 관리하는 상황이라서 딱히 Test Plan으로 나눌 생각은 없었지만, 글로벌 프로덕트 팀에서 iOS개발자들이 점점 늘어남에 따라 그리고 국가별로 새롭게 출시하는 서비스들과 분기지점들이 늘어남에 따라서 복잡도가 커지고 모든 국가 또는 N개 국가가 공유하는 로직에 있어서 충돌이 자연스럽게 잦아질 것이다. 

만약 새로운 동료가 합류하게 된다면 안정적으로 각 국가별로 새로운 피쳐나 비즈니스 로직을 적절히 잘 수행시키기 위해서 나와 함께 국가별 Test Plan을 정리하게 되지 않을까? 물론 하게되면 몹시 귀찮은 작업일 수 있겠지만 그 과정속에서 내가 지난 시간동안 저질러 놓은 수 천 라인의 코드들을 볼 수 있는 좋은 기회라는 생각이 든다.

### Global branch point project 2.0 개선해보기
아무래도 싱글 프로젝트에서 여러국가를 커버하다 보니 열심히 개발을 하다보면 국가분기지점에 대해서 관리가 쉽지 않아서 처음에 내가 Global Branch Point Project(GBP)를 기획해서 iOS챕터 구성원들에게 협조를 요청했었다.

"국가분기가 필요하면 간단히 주석으로 MARK:처럼 GLB:를 붙여주고 분기사유만 한줄로 가볍게 요약해서 적어주세요!"

그리고 나는 지난 시간동안 글로벌 프로덕트 개발과정들을 전부 되새김질하면서 GLB을 붙이기 시작했고, 적용이 끝난 후 간단히 모든 코드상에 국가분기된 지점들을 긁어모아서 슬렉으로 전달해주는 webhook을 구축해보았다.

![](/images/blog/gbp.png)

22년 1월 기준으로 벌써 분기지점이 75개나 달했는데, 미래를 생각해보면 이건 새발의 피일 것이다. 언젠간 국내에 서비스하고 있는 다양한 서비스들(동네생활, 내 근처, 각종 버티컬 사업등)이 글로벌로 진출하게 될 것이고 그 서비스들도 국가에 맞게 다양한 실험들과 분기작업을 하게 될 테니 말이다.

만약 새로운 동료가 합류하게 된다면 국가분기 관리를 좀 더 고도화해서 글로벌 프로덕트팀 구성원들이 분기된 제품을 인류 모두가 보편적으로 쉽게 접근하고 사랑받는 기능이 될 수 있도록 노력하는데 큰 인사이트를 줄 수 있길 기도해본다.

### 국내를 넘어 세계 Apple 커뮤니티에서 활약해보기
이전 회사에 재직중일 때는 사람들 앞에 나서서 발표하고 하는게 정말 심장을 뛰게 할 정도로 즐거웠고 흥분될 수 밖에 없었는데, 당근마켓 입사 이후로는 코로나 여파일 수도 있고 너무 일을 열심히?해서 그런지 발표할 기회가 많지 않았다. 그래도 소소하게 iOS챕터내에서나마 소소하게 이것저것 재밌는 발표도 하고 뭔가 뚝딱뚝딱만들어 보기도하고 했다만, 언젠간 코로나가 사라지게 되면 수 많은 개발자들이 겨울잠 자고 일어난 개구리마냥 날 뛰기 시작할테고 내 영혼?도 날뛰기 시작할 텐데 이 왕 돌아다닐꺼 국내뿐만 아니라 해외 커뮤니티까지 뻗어 나가고?싶은 생각도 너무나 간절하다.
그래서 몇 달 전부터 영어 스피킹과 중국어를 열심히 단련하고 있는데, 나중에 기회가 된다면 동료들과 함께 세계 곳곳에 발표하러 다니고 싶다.


### 마무리
위에 희망사항들이 올해안에 전부 100% 이뤄지기엔 쉽진 않겠지만, 좋은 동료와 함께하게 된다면 가능하지 않을까 기도메타를 해본다.
아직 [채용공고](https://team.daangn.com/)가 올라오진 않았지만, 혹시 이 글을 보시고 관심이 있으시거나 티타임을 하고 싶으시다면 언제든 david@daangn.com으로 이메일을 보내주시면 언제든 환영합니다.