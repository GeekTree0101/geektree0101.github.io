---
title: '[iOS] Let’s Tracking Visible Cell on ScrollView'
description: >-
  In my experience, When i makes content impression tracking service then i uses
  iOS UIKit default delegate method such as UITableView &…
date: '2018-10-28T07:19:54.880Z'
categories: []
keywords: []
slug: /@h2s1880/ios-lets-tracking-visible-cell-on-scrollview-7f40922f1165
---

![](/images/blog/1__8tPd5AAWctiPm9P07Mn6Wg.gif)

In my experience, When i makes content impression tracking service then i uses iOS UIKit default delegate method such as UITableView & UICollectionView willDisplayCell method, didEnterVisibleStatus in Texture(AsyncDisplayKit) and so on.

![](/images/blog/1__xkcVKRRWvtsnD____D__ZjEJA.gif)

Recently I faced some difficult situation. My company colleague want to exquisite & precise content impression tracking service about horizontal scrollable contents.

But, UITableView & UICollectionView willDisplayCell delegate method can’t support more exquisite tracking service. (In Texture(ASDK), didEnterVisibleStatus too)

So, In my opinion, I think that best method is **create & define tracking area**.

![](/images/blog/1__lVxnLIR3PO4PjiqkbRMJew.png)

At first, you can make trackingRect (CGRect)

![](/images/blog/1__Lad27hmbqUaA5OtzOKXSWw.png)

and you should get visibleCells (In Texture case, use visibleNodes), and you should convert CGRect of cell with rootView (self.node is rootView of UIViewController) and just use **CGRect.contains: method** with trackingRect.

![](/images/blog/1__HTeHBCXor__F53sso82NsIQ.png)

### That’s all! Thank you for reading

> I’m looking for more effective and good method. if you know it then please reply on comment.