---
title: 'Oh Vetty, Vam da lam (Reactive Model Provider)'
description: Vetty iz…
date: '2018-12-15T06:23:20.391Z'
categories: []
keywords: []
slug: /@h2s1880/oh-vetty-vam-da-lam-reactive-model-provider-9c622e499d2a
---

![](/images/blog/1__8etS6UYlpb05L__Q7dAwzcQ.png)

[**GeekTree0101/Vetty**  
_Very easy commit & read & mutation mechanism about all of model, Reactive Model Provider built on RxSwift …_github.com](https://github.com/GeekTree0101/Vetty "https://github.com/GeekTree0101/Vetty")[](https://github.com/GeekTree0101/Vetty)

![](/images/blog/1__HQzYhDJwiqyvTSymv5fTrg.gif)

[**GeekTree0101/DoggyGram**  
_Vetty Best Practice Example. Contribute to GeekTree0101/DoggyGram development by creating an account on GitHub._github.com](https://github.com/GeekTree0101/DoggyGram "https://github.com/GeekTree0101/DoggyGram")[](https://github.com/GeekTree0101/DoggyGram)

### Vetty iz…

*   Thread Safe during read & write ([https://medium.com/@oyalhi/dispatch-barriers-in-swift-3-6c4a295215d6](https://medium.com/@oyalhi/dispatch-barriers-in-swift-3-6c4a295215d6))
*   Interconvertible with RxSwift. also, it is optional!
*   It provides convenience reactive wrapper
*   Swift 4.x Codable

#### 1\. Commit & Cache model at Vetty

![](/images/blog/1__vzQC__Af6cPOQYISmStqKSQ.png)

#### 2\. Make Model Observer & Binding with View

![](/images/blog/1__MK5sT7V4jUetvUJdKHZEWg.png)

In my case, I create observer at ViewModel

[**DoggyViewModel.swift**  
_Vetty Best Practice Example. Contribute to GeekTree0101/DoggyGram development by creating an account on GitHub._github.com](https://github.com/GeekTree0101/DoggyGram/blob/master/Doggygram/ViewModels/DoggyViewModel.swift "https://github.com/GeekTree0101/DoggyGram/blob/master/Doggygram/ViewModels/DoggyViewModel.swift")[](https://github.com/GeekTree0101/DoggyGram/blob/master/Doggygram/ViewModels/DoggyViewModel.swift)

![](/images/blog/1__W__t0H0H8q9oV__tpVvoMPvg.png)

#### 3\. Automatic bi-directional update flow

![](/images/blog/1__zyJOeDSCZWv7t5XR345Uqg.png)

![](/images/blog/1__zyJOeDSCZWv7t5XR345Uqg.png)
![](/images/blog/1__KIoNyRO6s__52W68Y__0usJw.png)

![](/images/blog/1__PtOoe1FTSEz7MfLER8zp__g.png)

youtube: [https://www.youtube.com/embed/Offudn51F8M](https://www.youtube.com/embed/Offudn51F8M)