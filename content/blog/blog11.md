---
title: 'ASCollectionNode 다루기 #1'
description: "UICollectionView만 있으면 세상에 현존하는 어떠한 형태의  화면이든 자유롭게 그려낼 수 있는 아주 멋진 View에요!\_:]"
date: '2020-01-31T12:41:56.347Z'
tags: ["ios", "texture"]
categories: ["iOS"]
image: "images/blog/1__I0CyqWilnxS__mYJPTXtN0Q.png"
---

![](/images/blog/1__I0CyqWilnxS__mYJPTXtN0Q.png)

UICollectionView만 있으면 세상에 현존하는 어떠한 형태의 화면이든 자유롭게 그려낼 수 있는 아주 멋진 View에요.

주로 이러한 UI에서 사용되고 있어요.

*   양방향 페이징할 수 있는 채팅화면
*   피드형태의 리스트
*   다양한 그리드 형태를 그려내는 UI
*   카로셀형태의 UI
*   기타 등등

보통 일반적으로 많이 설계하는 형태가 Single Column Feed UI인데, 이는 특별히 신경쓸것도 없고 심지어 UITableView로 만들어도 이상하지가 않아요.

![](/images/blog/1__pYNUojWA8BM3Wo__7fYjfAw.png)
![](/images/blog/1__LEtLd4xCsUwqoMH__KiVpXg.png)

오늘 예기하고자 하는 부분은 Texture에서 제공하는 Proxy 형태의 UICollectionView 인 **ASCollectionNode**를 가지고 아주 기초적이지만 약간 복잡한 형태의 UI 설계 전략에 대해서 보여드릴까해요.

_그리고 Texture는 어렵지 않고 똑같다라는 걸 예기하고 싶어요._

이번에 다뤄볼 UI 예시는 PugGram을 가져와봤어요.

![](/images/blog/1__pVRDcbokwBvUalMEYRG8wQ.png)

#### Section 선언

PugGram에는 총 3가지의 Section으로 나눠져있어요.

*   image (이미지나 다른 형태의 미디어 썸네일 이미지를 보여주는 섹션)
*   content (컨텐츠의 정보를 보여주는 섹션)
*   Related Card (연관된 카드를 보여주는 섹션, 헤더와 투칼럼으로 구성된 아이템들이 있어요.)

![](/images/blog/1__lvf06SQ6cB__cFWxbiG7QsQ.png)

#### ASCollectionNode initialization

CollectionNode의 인스턴스를 만들어 주세요.

![](/images/blog/1__vGT3GkERZ0NcIn7jX61NLQ.png)

*   위의 이미지에서 보았다싶이 Related Card Section에는 section header가 사용됨을 알 수 있어요. 따라서 아래의 코드와 같이 registerSupplementaryNode API를 이용하여 UICollectionView.elementKindSectionHeader 및 Footer를 register를 해줘야해요!
*   UICollectionViewFlowLayout default 방향은 vertical이라 특별히 지정해주진않았어요.
*   저희는 혼합된 레이아웃을 구현해야하기 때문에 별도로 minimum-inter-item-spacing 및 minimum-line-spacing, section-inset을 지정하지 않았어요.

#### ASCollectionDataSource 상속 및 구현

![](/images/blog/1__fd__c4Ou31e5fRmbnHCKRug.png)

이전에 만든 Section enum을 이용하여 위와 같이 코드를 구현할 수 있어요.

image와 content 섹션의 아이템은 임의로 1개 정도 반환하고 relatedCard 섹션은 임의로 20개를 반환해봤어요.

![](/images/blog/1__7FHEuA6__fyUIbcQYD__oNBg.png)

그리고 item에 대한 ASCellNode와 footer 및 header에 따른 supplementary element 대한 ASCellNode를 반환하는 로직을 구현해봤어요. (아주대충)

_사실 위에서 설명한 부분들은 이번 내용과는 상당히 먼 이야기이므로 간단히 생략하도록 할께요. 자세한건_ [_https://texture-kr.gitbook.io/wiki/_](https://texture-kr.gitbook.io/wiki/) _여기서 다뤄져요. :\]_

#### ASCollectionDelegate 상속과 아이템에 대한 제약사이즈 반환

![](/images/blog/1____4sY1I0xHkiW6QxKnK5b9Q.png)

저희가 설계하고자 하는 Related Card 영역의 아이템들은 위의 이미지와 같이 16.0pt의 간격을 유지하는 격자형태로 구현하고자 해요.

ASCollectionDelegate를 상속받으면 item들의 제약사이즈를 반환하는 constrainedSizeForItemAt API 가 있어요.

제약사이즈(ASSizeRange)는 minSize(CGSize), maxSize(CGSize)로 구성되어 있고 이를 기반으로 Texture의 Layout API가 Flexible 하게 frame를 계산해내는 방식으로 UI를 그려내요.

*   _\*Texture에선 편의용으로 ASSizeRangeUnconstrained 와 ASSizeRangeZero두가지를 제공해주고 있어요. 자세한건_ [_https://texture-kr.gitbook.io/wiki/_](https://texture-kr.gitbook.io/wiki/)

![](/images/blog/1__mdFF1G5h02Tvx__3XzEON__w.png)

*   image와 content 섹션은 Single-Column 이기 때문에 ASSizeRangeUnconstrained 정도면 충분해요.
*   Related Card 섹션은 각 spacing(16.0pt) 영역를 제외한 공간의 1/2 영역을 최대 Size (maxSize)로 두고 minSize는 .zero로 지정해서 제약사이즈를 반환해주면되요.

#### ASCollectionDelegateFlowLayout 상속과 각종 제약값 반환

![](/images/blog/1__5ZqN__GrPRXOHGezU5UQ0Hw.png)

ASCollectionDelegateFlowLayout에 보면 위와같이 3가지의 API를 제공해요.

_footer 및 header 에 대한 제약사이즈를 반환하는 API들과 그리고 section에 대한 inset(UIEdgeInset)을 반환하는 API가 있는데 충격적인건 minimum-inter-item-spacing과 minimum-line-spacing에 대한 API가 없었어요…_ [_https://github.com/TextureGroup/Texture/pull/1768_](https://github.com/TextureGroup/Texture/pull/1768)

![](/images/blog/1__PtpJw8ELe__3krd9khUQFdg.png)

처음부터 말한 것처럼 ASCollectionNode는 UICollectionView proxy개념이기 때문에 당황하지 않고 주어진 대로 위의 코드와 같이 설계를 하면 다음과 같아요..

*   footer는 사실상 사용하지 않기 때문에 SizeRange를 zero로 반환해요.
*   header는 Related Card에서만 필요하기 때문에 이를 제외한 나머지는 zero를 반환해요.
*   header와 마찬가지로 Related Card의 section만 좌/우로 16.0pt만 반환해요.

좌우만 16.0pt를 반환하면 섹션에 대한 inset은 다음과 같이 적용된다 보시면 되요.

![](/images/blog/1__2Y6Efz4kXNRvznzrl6s4nQ.png)

#### ASCollectionDelegateFlowLayout가 다 못하는건 UICollectionViewDelegateFlowLayout에서 해결

UI Framework 오픈소스고 규모가 커지다보면 사람들이 개발하는거다보니 놓치는 건 어쩔 수 없다 생각은 해요. 앞서 말했듯이 proxy개념이라 결코 UIKit에서 기본적으로 제공하는 API를 아예 못쓰는 건 아니에요! :\]

_Texture = UIKit + meta 같은 개념!_

이제 우리에게 필요한건 두가지가 남았어요.

*   minimum inter-item spcing: 아이템 간의 최소 간격
*   minimum line-spacing: 아이템 그룹과 그룹간의 간격

![](/images/blog/1__UcCWVMs3fzlV__LXGaCPW7Q.png)
![](/images/blog/1__FKbyM918qcD6rgcm6IQSyA.png)

좀전에 언급 했듯이 저희는 16.0pt의 균일한 간격을 유지하는 것이 목표이기 때문에 아래와 같이 코드를 작성하면 끝나요.

![](/images/blog/1__Ft6ohpnIw21hd1qxFviIfQ.png)
![](/images/blog/1__x4Jpefb2NxrL26gU0jpM1g.jpeg)

사실 기본적으로 UIKit에서 제공하는 UICollectionView의 문서를 가볍게 읽어보면 간단히 구현할 수 있는 기능이지만 Texture를 초기에 접한 개발자들이 이러한 부분들 때문에 **UIKit != Texture**라는 공식과 **러닝커브가 높다**라는 인식을 가지는 경우가 많았던거 같아요.

이번 글을 통해서 많은 iOS 개발자분들이 Texture에 대한 편견을 버리고 **재미있게 즐겼으면** 하는 바램으로 적어봤어요. :)