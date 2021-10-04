---
title: How to make Bouncing Table HeaderView with Texture?
description: 1. Define Bouncing Area
date: '2018-09-16T03:44:57.254Z'
tags: ["ios", "texture"]
image: images/blog/1__COQcKhtNUWZpsrajD88mtA.gif
---

![](/images/blog/1__COQcKhtNUWZpsrajD88mtA.gif)
![](/images/blog/1__JVC6__iU6hYzTc2iguVMcFQ.gif)

### 1\. Define Bouncing Area

![](/images/blog/1__556GWqJNticmvfIlGthjBw.png)

### 2\. Make Constraints Bouncing Area Node

![](/images/blog/1__GaNAmRcX1wSa2eBTEtW__gw.png)

Unfortunately, Recently Texture doesn’t support tableHeaderNode (In Texture 2.7)

Well you know that ASDisplayNode is built on UIView. So, you just use view property from node like a upper source code.

![](/images/blog/1__0lChKUQUrolhjLeYxC7RnQ.png)

Also, you can see that backgroundView(bounding area view) setup with fixed height value. (ProfileHeaderNode.Const.defaultHeight)

Because of **consistency.**

> In my subjective opinion, If height of bouncing area UI doesn’t consistency then it will occur bad user experience.

![](/images/blog/1__5S2YLMhaSWZ05E9teHj8aA.png)

### 3\. Update Bouncing Area Node Size with scroll offset

![](/images/blog/1__kY0KpZUkN632S6pK9Uaw7Q.png)
![](/images/blog/1__Y__yU8yMbXfFhWodQiWvM5A.png)

Although, Texture doesn’t use apple constraints system. Recently Texture doesn’t support node for TableHeaderView. In this case, bouncing header view should lean on constraints system.

In Summary:

![](/images/blog/1__JkA42Ug4dFSJWfDJkHh8Cg.png)

### 4\. Bounus: Bouncing Background Image

![](/images/blog/1__j__Xqsnmv4d59rqriRJZ65w.png)

> If you wanna \[bouncing background image\] like this article example screen. you should setup contentMode as scaleAspeacFill

Thank you!

![](/images/blog/1__Z____kOz__uzBDl5z4w6RzJBg.png)

[**\[채용 공고\] Vingle에서 함께 성장할 동료를 찾고 있습니다**  
_관심사로 세상을 잇다! 관심사 기반 SNS, Vingle_careers.vingle.net](https://careers.vingle.net/#/engineering/ios "https://careers.vingle.net/#/engineering/ios")[](https://careers.vingle.net/#/engineering/ios)

> We are looking for colleagues to grow together in Vingle!