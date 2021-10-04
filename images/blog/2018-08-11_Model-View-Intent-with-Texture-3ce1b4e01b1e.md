---
title: Model-View-Intent with Texture
description: 1. Model
date: '2018-08-11T06:24:40.311Z'
categories: []
keywords: []
slug: /@h2s1880/mode-view-intent-with-texture-3ce1b4e01b1e
---

![](/images/blog/1__gaecppjo99HOwc6cQdwtzw.png)
![](/images/blog/1__qhW165H54x0YCHa66CxV7A.png)
![](/images/blog/1__7jKNFrN__a4Tb2TngUv7L8g.png)

### 1\. Model

![](/images/blog/1__sAglVgbeJqi__T0pEVIzP8A.png)

ASRenderModelProtocol & ASRenderModelIdentifier is convenience ID object & protocol for identifying the model on ASModelSyncronizer.

ASModelSyncronizer is model manager base on model unique identifier.

![](/images/blog/1__rwB6o__BG7IThfmgp4eM8hA.png)

it is work concurrent on background scheduler with thread safty

![](/images/blog/1__vs4RQRnAc__t4__ycnLtR2oQ.png)

You can inherit ASRenderModelProtocol on your basic model object

and you should make some business logic like this

![](/images/blog/1__4XiBTCbUuUzBP1sVTpYU7Q.png)
![](/images/blog/1__QG7vYSOayPBJjusNSFrSOw.png)

### 2\. View & Intent(Auto)

I said my goal that All subnode attributes must initialize before Node initialize completes.

[**GeekTree0101/RxMVVM-Texture**  
_RxMVVM-Texture - RxSwift MVVM pattern best practice built on Texture(AsyncDisplayKit) and written in Swift_github.com](https://github.com/GeekTree0101/RxMVVM-Texture "https://github.com/GeekTree0101/RxMVVM-Texture")[](https://github.com/GeekTree0101/RxMVVM-Texture)

In upper repo case, You can see that alll subnode initialize asynchronously.

![](/images/blog/1__BkG9niN2fHR8__h6B3DLa5Q.png)

Even after the supernode completes its initialization, all subnode doesn’t know that their property values have been initialized by themselves.

At first, intent will initialized with model

![](/images/blog/1__0t4jymhOE5H0redt__sISTw.png)

and next, intent should be subscribe with business logic (mutation closure)

![](/images/blog/1__Aivkga9Nmjc12Qn8mFdZ8w.png)

*   Mutation is business logic closure
*   update(to:) is update target view property, it means output
*   interact(from:) means input

If you needs update layout after binding value. then insert update target node on update(to:) setNeedsLayout parameter.

![](/images/blog/1__K__lprGln46E__NiD__zXn3Bg.png)

You can see that all subnode attributes initialized before Node initialize completes from upper diagram.

### 3\. WorkFlow

![](/images/blog/1__b__OG__upyDorXwhocjRAUkA.gif)

1.  User will touch profile Image. At that time, profile view will emit tap event
2.  profile tap event will call image download from backend service

![](/images/blog/1__o5l5Zk51Xu__pIsiXbBvHxw.png)

3\. ASModelSyncronizer will automatically update all of identified user model with business logic.

![](/images/blog/1__CLTN32Cd4qTO1E__RB7W60Q.png)
![](/images/blog/1__69RVNoB0ggmzTWgngbwDRw.png)
![](/images/blog/1__LRL2EWOmEWEXExPAqyj6__Q.png)
![](/images/blog/1__D3ARjHWZcq9YQQ4mdQLV__Q.png)
![](/images/blog/1__vA3nvcyHZM__kj6qqqXmSiQ.png)

\[1 ~ 2\] user interaction > emit > intent

\[2 ~3 \] intent > backend-service

\[3 ~ 4 \] backend service > mutation closure for update model

\[4 ~ 5\] mutation > model update

\[5 ~ 6\] model > mutation closure for update view

[**GeekTree0101/RxCocoa-Texture**  
_RxCocoa-Texture - RxCocoa Extension Library for Texture._github.com](https://github.com/GeekTree0101/RxCocoa-Texture "https://github.com/GeekTree0101/RxCocoa-Texture")[](https://github.com/GeekTree0101/RxCocoa-Texture)