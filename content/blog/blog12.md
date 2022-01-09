---
title: '[TIp] ASCollectionNode & Rotation'
description: How to rotate ASCollectionNode efficiently?
date: '2020-01-31T14:25:18.088Z'
tags: ["ios", "texture"]
categories: ["iOS"]
image: "images/blog/1__zZo5fSy__I__EpJ7qoohKCiQ.png"
---

![](/images/blog/1__wljfPQ__tC__JrOvgRoW0fQA.gif)

How to rotate ASCollectionNode efficiently?

![](/images/blog/1__zZo5fSy__I__EpJ7qoohKCiQ.png)

In UICollectionView case, you just follow above code.

But, ASCollectionNode doesn’t work. Cuz, Node requires latest constraint size for re-rendering.

In ASCollectionNode.h, you can find relayoutItems.

![](/images/blog/1__UxqP32UHNOS3voSTflI__lQ.png)

you don’t needs reloadData or performBatch. you just calls relayoutItems: inside of alongsideTransition closure.

![](/images/blog/1__LtAYQYW0oEMljWxD9qds1g.png)

> Extra

If you needs calculate constrainedSize for cell with safe-area-insets, you just calls relayoutItems at viewSafeAreaInsetsDidChange override method! :\]

![](/images/blog/1__lIfhrmpueJvr3u1BU7y__qQ.png)