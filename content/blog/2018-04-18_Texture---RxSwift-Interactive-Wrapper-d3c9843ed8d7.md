---
title: Texture + RxSwift Interactive Wrapper
description: How to make RxSwift Interactive wrapper for Texture?
date: '2018-04-18T04:24:21.206Z'
tags: ["ios", "RxSwift", "texture"]
categories: ["iOS"]
image: images/blog/1__V2wNg6VHbao81vQkaBzk__g.png
---

![](/images/blog/1__V2wNg6VHbao81vQkaBzk__g.png)

How to make RxSwift Interactive wrapper for Texture?

Basically, Texture provides various basic components as shown in the picture below.

![](/images/blog/1__9r2267esHNR0R5Wo__ufZCA.png)

Especially, I focused on ASControlNode to make reactive wrapper.

Because, Basically **RxCocoa** offer various **interactive wrapper** such as UIButton tap wrapper, UIGestureRecognizer event wrapper etc.

ref: [https://github.com/ReactiveX/RxSwift/blob/master/RxCocoa/iOS/UIGestureRecognizer%2BRx.swift](https://github.com/ReactiveX/RxSwift/blob/master/RxCocoa/iOS/UIGestureRecognizer%2BRx.swift)

[https://github.com/ReactiveX/RxSwift/blob/master/RxCocoa/iOS/UIButton%2BRx.swift](https://github.com/ReactiveX/RxSwift/blob/master/RxCocoa/iOS/UIButton%2BRx.swift)

So, If i focused on ASControlNode then i guessed that i could make convenience interactive wrappers on ASImageNode(UIImageView), ASNetworkImageNode(UIImageView), ASButtonNode and so on.

I referred to UIGestureRecognizer+Rx script, and remake it to making ASControlNode wrapper.

and extend it as shown in the code below.

Finally, you can use upper code like this!

Reference:

[**Improvement feed performance with Texture(AsyncDisplayKit)**  
_아직도 발열을 못잡네. 게임 돌리는것 보다 발열이 심합니다. 앱 최적화가 그만큼 안된다는 소리겠죠? 예전 앱이 더 안정적이었는데 최신앱이 이모양이라니… + 와. 15분 만지고 배터리 20% 광탈…_medium.com](https://medium.com/vingle-tech-blog/improvement-feed-performance-with-texture-asyncdisplaykit-2ef2ee11f06e "https://medium.com/vingle-tech-blog/improvement-feed-performance-with-texture-asyncdisplaykit-2ef2ee11f06e")[](https://medium.com/vingle-tech-blog/improvement-feed-performance-with-texture-asyncdisplaykit-2ef2ee11f06e)

[**GeekTree0101/GTTexture-RxExtension**  
_GTTexture-RxExtension - Texture RxSwift Interactive Wrapper base on ASControlNode_github.com](https://github.com/GeekTree0101/GTTexture-RxExtension "https://github.com/GeekTree0101/GTTexture-RxExtension")[](https://github.com/GeekTree0101/GTTexture-RxExtension)