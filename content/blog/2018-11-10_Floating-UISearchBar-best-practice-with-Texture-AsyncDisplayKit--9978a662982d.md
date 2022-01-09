---
title: Floating UISearchBar best practice with Texture(AsyncDisplayKit)
description: 'Today, I wanna show you that customized UISearchBar with Texture'
date: '2018-11-10T07:29:38.199Z'
tags: ["ios", "texture"]
categories: ["iOS"]
image: images/blog/1__KkINKRDy9dDqDQw2TUyN0g.gif
---

![](/images/blog/1__KkINKRDy9dDqDQw2TUyN0g.gif)

Today, I wanna show you that customized UISearchBar with Texture

Unfortunately, ASTableNode doesn’t support ASDisplayNode returnable delegate method for header in section.

So, How to attach Floating UISearchBar on ASTableNode?

### 1\. Make UISearchBar wrapped ASDisplayNode

It’s very simple, [http://texturegroup.org/docs/display-node.html](http://texturegroup.org/docs/display-node.html) Texture support **View-Wrapping**

In some cases, it is desirable to initialize a node and provide a view to be used as the backing view. These views are provided via a block that will return a view so that the actual construction of the view can be saved until later. These nodes’ display step happens synchronously. This is because a node can only be asynchronously displayed when it wraps an `_ASDisplayView` (the internal view subclass), not when it wraps a plain `UIView`.

![](/images/blog/1__CxwJdd__jPG2RkawYndIYjg.png)

**bar** property is convenience access property which wrapped UISearchBar from ASDisplayNode

### 2\. Install SearchNode on ASTableNode

At first, you make searchNode property

![](/images/blog/1__bu3ya0oyfdRkCCWRu6yBvw.png)
![](/images/blog/1__jB__Vr5LDkrls3Dt83I9qNA.png)

searchNode style property has height value as ASDismension. so, you just return height from **height for header in section** delegate method.

and next, just return view property from **view for header in section** method.

you can see below screen shot

![](/images/blog/1__eBbZgmGnsaOZS4JJbzwuow.png)
![](/images/blog/1__fGDln9hPaLG22dDSiQQ0Fw.png)

### 3\. How to make expanded search bar

At first, you should know about constrained size layout system mechanism.

[**Layout API Sizing**  
_Texture_texturegroup.org](http://texturegroup.org/docs/layout2-api-sizing.html "http://texturegroup.org/docs/layout2-api-sizing.html")[](http://texturegroup.org/docs/layout2-api-sizing.html)

#### Size Range (`ASSizeRange`)

`UIKit` doesn’t provide a structure to bundle a minimum and maximum `CGSize`. So, `ASSizeRange` was created to support **a minimum and maximum CGSize pair**.

`ASSizeRange` is used mostly in the internals of the layout API. However, the `constrainedSize`value passed as an input to `layoutSpecThatFits:` is an `ASSizeRange`.

SwiftObjective-C

\- (ASLayoutSpec \*)layoutSpecThatFits:(ASSizeRange)constrainedSize;

The `constrainedSize` passed to an `ASDisplayNode` subclass’ `layoutSpecThatFits:` method is the minimum and maximum sizes that the node should fit in. The minimum and maximum `CGSize`s contained in `constrainedSize` can be used to size the node’s layout elements.

Let’s make AdvencedSearchNode

![](/images/blog/1__Cl2knL7ugO271Puv__svZLA.png)

![](/images/blog/1__H4L__UjIlMLMmMS8y4RRlbQ.png)

I will reuse searchNode which is already made.

![](/images/blog/1__NnsVNGCraRQltsPd9YdQow.png)

![](/images/blog/1__8nj4hLUBOlp25xHsxUNnRg.png)

and next, I will attach hash tag UIs below the searchNode.

![](/images/blog/1__0qiGUEYHguIQb9gj__oYldw.png)

Finally, Just define LayoutSpec at layoutSpecThatFits method

![](/images/blog/1__o2xdLYNliAWrsKYtl2YVBw.png)

Also, you just make searchNode property like a upper screenshot

![](/images/blog/1__UQPPCO0QtjWnxuHAbA3cTw.png)

**viewForHeaderSection** is the same as described previously.

Most Important is **height for header in section**. In other words, it have to calculate AdvencedSearchNode height.

So, How to calculate node height from **viewForHeaderInSection** method?

![](/images/blog/1__nNyPpEu2oFtzhGIO6Dg8Yw.png)

A lot of Texture newbie will access calculatedSize or bounds properties.

When you access upper properties than you can’t get expected height. Because, these doesn’t know constrainedSize

So, you just define constrainedSize(ASSizeRange) and call calculateLayoutThatFits method.

![](/images/blog/1__3Z1zJwiyrJ7w__yTNQJntXA.png)

ASSizeRange has minSize and maxSize parameter. minSize is zero and maxSize is superNode bounds size which is maximum constrainedSize for childNode(searchNode).

![](/images/blog/1__KkINKRDy9dDqDQw2TUyN0g.gif)

Thank you!

![](/images/blog/1__Z____kOz__uzBDl5z4w6RzJBg.png)

[**\[Job announcement\] We’re looking for colleagues to grow together in Vingle**  
_Very Community, Vingle!_careers.vingle.net](https://careers.vingle.net/#/engineering/ios "https://careers.vingle.net/#/engineering/ios")[](https://careers.vingle.net/#/engineering/ios)