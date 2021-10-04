---
title: Let’s make an iOS Google Chrome Pull to refresh with Texture
description: >-
  Today, I made [Pull to Refresh Interaction Tab] like an iOS Google Chrome
  application.
date: '2018-11-11T07:09:24.984Z'
tags: ["ios", "texture"]
image: images/blog/1__1DHz4zfJlbRSjyObGciImA.gif
---

![](/images/blog/1__1DHz4zfJlbRSjyObGciImA.gif)

Today, I made **\[Pull to Refresh Interaction Tab\]** like an iOS Google Chrome application.

![](/images/blog/1__o2gb2oe9hNf40GtKlAC8Nw.gif)
![](/images/blog/1__wyTQelfG76Co1YWLf6M0mA.png)

![](/images/blog/1__n9LRsb0Q54a__lutFKlWr__w.png)

[**A UI Framework for Effortless Responsiveness**  
_Texture_texturegroup.org](http://texturegroup.org/ "http://texturegroup.org/")[](http://texturegroup.org/)

![](/images/blog/1__K__Oy__vEL__J4sXNPW4__hwiQ.png)

At first, you should make button items with indicatorNode.

IndicatorNode is just circle view with some color.

And next, you have to make layoutSpec

![](/images/blog/1__Rxhmvcln29__RrfL3u048JQ.png)

1.  Make StackLayout with close/refresh/plus button
2.  Set padding Inset about stackLayout

static let insets: UIEdgeInsets = .init(top: 30.0, left: 0.0, bottom: 30.0, right: 0.0)

3\. Wrap indicatorNode to absoluteLayout.

4\. return WrapperLayoutSpec with **padding stack layout** and **absolute indicator layout**

![](/images/blog/1__smfmsf3pmtPTTCbiMKLSzQ.png)

and next, you should overlay refresh-node onto tableNode. Oh! layoutSpecThatFits is just custom method for using layoutSpecBlock

![](/images/blog/1__8LCnA4TLFg4XK5jBver4SA.png)

Now, you make updatePostion method with scrollView parameter.

![](/images/blog/1__S4V3rMvrnXBTH0iIeWWRwQ.png)
![](/images/blog/1__HrRsxyfKPLEYV7ArBVokIw.png)

Now, we should update alpha value with gesture recognizer

![](/images/blog/1__uRbECGxT7r59fsMjkihRPQ.png)
![](/images/blog/1__lIksA8fSqFPLi6CGmZZzUg.png)

and next, we should update target position such as close, refresh and plus.

we can divide scrollView into three area.

![](/images/blog/1__cVZ6Av3K9hV4LnI59jU7Ng.png)

we don’t need measure layout (shouldMeasureAsync is false). Cuz, we just needs update indicatorNode position.

![](/images/blog/1__QwCpL6C1Lu0S7GPHr1aFMw.png)

[**Layout Transition API**  
_Texture_texturegroup.org](http://texturegroup.org/docs/layout-transition-api.html "http://texturegroup.org/docs/layout-transition-api.html")[](http://texturegroup.org/docs/layout-transition-api.html)

Full source code: