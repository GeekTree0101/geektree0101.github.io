---
title: Vingle Texture Style guide
description: We hope anybody who loves iOS and Texture find this helpful!
date: '2019-02-14T12:53:17.335Z'
image: images/blog/1__bLxgJzoG5ktMJ5ZLSNgu5A.png
tags: ["ios", "texture", "vingle"]
categories: ["iOS"]
---

![](/images/blog/1__bLxgJzoG5ktMJ5ZLSNgu5A.png)

We hope anybody who loves iOS and Texture find this guide helpful!

### 1\. Making UI Components

![](/images/blog/1__Twwe1zjnmZ3wyKEs__2AfcQ.png)

*   use **lazy property** for **Conditional** UI Component.

> otherwise, you end up doing unnecessary allocation and computation even when given UI Component is not used at all

*   Don’t use node generate **function**!

![](/images/blog/1__kIr__jgcKqwkwYJVKCU7Ezw.png)

We recommend to use [**automaticallyManagesSubnodes**](http://texturegroup.org/docs/automatic-subnode-mgmt.html) instead of **addSubnode**.

![](/images/blog/1__e5jR9wmC1wRFsjIZ5y__p6A.png)

*   Place all UI Component attributes in Const structure.

### 2\. LayoutSpec

![](/images/blog/1__8A5IoN9DS__4RsdvpBSnNbA.png)

*   `// MARK:` and `// MARK: -` is Swift equivalent of `#pragma mark` and `#pragma mark -` in Objective-C.

![](/images/blog/1__GjxLigCW__t4gVTHxHnnSPQ.png)

*   Recommended use extension for layoutSpec [**code cohesion**](https://en.wikipedia.org/wiki/Cohesion_%28computer_science%29) **& readability.**
*   Do not put all the codes at layoutSpecThatFits: for readability sake
*   Meaningful layoutSpec separation. ([Article](https://medium.com/@h2s1880/texture-best-practice-2-7259bde869ee))
*   Method name must ends with“**LayoutSpec”.**
*   Local layoutSpec variable name must ends with “**Layout”.**

override func layoutSpecThatFits(:) -> ASLayoutSpec {

    let ~~~~layout = ~~~~layoutSpec(:)

}

![](/images/blog/1__bSxdgAPLttQG0zpXOXagyA.png)

*   [**FlexBox**](https://yogalayout.com/) attribute should be defined at layoutSpecThatFits:
*   Recommended to create a flex-style sugar code as shown in the screenshot below.

![](/images/blog/1__c552Tfu0sXqSqJ9jDrLsoQ.png)

### 3\. Any main thread view related property accesses must be handled at didLoad method.

![](/images/blog/1__6Yx____JQ3cH9RKPfV5ZlCTw.png)
![](/images/blog/1__liKpDo7NYOBgnNA2__TxdHA.png)

### 4\. Reactive Programming (\* RxSwift)

[**RxSwiftCommunity/RxCocoa-Texture**  
_RxCocoa Extension Library for Texture. Contribute to RxSwiftCommunity/RxCocoa-Texture development by creating an…_github.com](https://github.com/RxSwiftCommunity/RxCocoa-Texture/blob/master/Example/RxCocoa-Texture/RepositoryListCellNode.swift "https://github.com/RxSwiftCommunity/RxCocoa-Texture/blob/master/Example/RxCocoa-Texture/RepositoryListCellNode.swift")[](https://github.com/RxSwiftCommunity/RxCocoa-Texture/blob/master/Example/RxCocoa-Texture/RepositoryListCellNode.swift)

RxCocoa doesn’t support Texture, So if you wanna use Rx, than download RxCocoa-Texture!. _Currently, it maintained by_ [_Vingle Inc_](https://careers.vingle.net/#/engineering/ios)_._

Please read [README.md](https://github.com/RxSwiftCommunity/RxCocoa-Texture/blob/master/README.md)

![](/images/blog/1__MVmmWPWGAPZBZvZjChUFqw.png)

*   Binding Logic has to be separate by using extension for [**code cohesion**](https://en.wikipedia.org/wiki/Cohesion_%28computer_science%29) **& readability.**

![](/images/blog/1__ItVvWSozCNUDBxfVwdunvg.png)

*   Do not access directly target node from outside.
*   It is recommended to create **reactive extension**.

#### Complex Example

![](/images/blog/1__ITnqfOszUVIimLTxrGhGwA.png)

Vingle iOS팀은 수많은 사람들이 매일 새로운 관심사와 커뮤니티를 발견하는 빙글앱을 만들어 나갑니다.

[**\[채용 공고\] Vingle에서 함께 성장할 동료를 찾고 있습니다**  
_관심사로 세상을 잇다! 관심사 기반 SNS, Vingle_careers.vingle.net](https://careers.vingle.net/#/engineering/ios "https://careers.vingle.net/#/engineering/ios")[](https://careers.vingle.net/#/engineering/ios)