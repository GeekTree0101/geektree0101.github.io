---
title: How to pre-append ASCellNode like a Chat Application
description: How to pre-append ASCellNode like a Chat Application?
date: '2018-06-06T04:08:11.073Z'
categories: []
keywords: []
slug: /@h2s1880/how-to-pre-append-ascellnode-like-a-chat-application-23b35d39b6cb
---

![](/images/blog/1__qAfL9DqKdLSzUVTTyhdXcg.gif)

#### How to pre-append ASCellNode like a Chat Application?

> Texture is an iOS framework built on top of UIKit that keeps even the most complex user interfaces smooth and responsive.

8 months ago, our Vingle iOS team has been using it with RxSwift & RxCocoa.

About a month, Our team has been working on a realtime chat application project called “Vingle Talk” .

Well, Every iOS Developer & Texture Fan know that ASTableNode & ASCollectionNode doesn’t support Bi-Directional Pagination.

[**TextureGroup/Texture**  
_Texture - Smooth asynchronous user interfaces for iOS apps._github.com](https://github.com/TextureGroup/Texture/blob/master/Source/Private/ASBatchFetching.m "https://github.com/TextureGroup/Texture/blob/master/Source/Private/ASBatchFetching.m")[](https://github.com/TextureGroup/Texture/blob/master/Source/Private/ASBatchFetching.m)

// If they are scrolling toward the head of content, don’t batch fetch.   
BOOL isScrollingTowardHead = (ASScrollDirectionContainsUp(scrollDirection) || ASScrollDirectionContainsLeft(scrollDirection)); if (isScrollingTowardHead) { return NO; }

ASBatchFetching just trigger only scroll up & left. (ASBatchFetching.m line 90)

So, We customized it which is able to bi-directional batch fetching on ASTableNode like this

![](/images/blog/1__vWlMaI3WJW061O1jiac1Dw.png)

At first, Save contentSize Height before ASTableNode pre-fetching.

let prevContentHeight = self.tableNode.view.contentSize.height

self.tableNode.performBatch(updates: { … }, complate: { … })

and then, Calculate contentSize height difference value between previous contentSize height with present contentSize height, and get content y-offset

self.tableNode.performBatch(updates: { … }, complate: { \_ in   
    let presentHeight = self.tableNode.view.contentSize.height  
    let diff = presentHeight - prevContentHeight  
    var offset = self.tableNode.contentOffset

})

In this case, you can see that contentOffset doesn’t change after update ASTableNode. So, you just append difference value onto content y-offset with setContentOffset

self.tableNode.performBatch(updates: { … }, complate: { \_ in   
    let presentHeight = self.tableNode.view.contentSize.height  
    let diff = presentHeight - prevContentHeight  
    var offset = self.tableNode.contentOffset  
    offset.y += diff

    self.tableNode.setContentOffset(offset, animated: false)

})

#### Is it work? I say NO!

I found that ASTableNode **contentSize is constantly changing** after finished tableNode and during scrolling. Because, Chatting message is variable content which contain message text, media, open-graph or some emoji and so on. So I modified it as follows.

#### Modified as follows

1.  Replace ASTableNode to ASCollectionNode with using UICollectionViewFlowLayout
2.  Revise pre-appending timing at content offset close to zero.
3.  Avoid excessive use Reactive Functional Programming(RxSwift & RxCocoa) to update message content

Replace ASTableNode to ASCollectionNode with using UICollectionViewFlowLayout

UICollectionViewFlowLayout offer powerful functions and you can trigger all of collection update process job.

At first, we don’t care append process job. Automatically, it will work on ASBatchFetching. so, we just consider on pre-appending process job.

I made very simply ChatFlowLayout base on ASCollectionNode. and process jobs arranged by code lines.

When ASCollectionNode begin pre-append items from index zero. ChatFlowLayout will work.

1.  layoutAttributesForElements(in:) line 11

*   Reset offset and scope(Append or Pre-Append Control Variable)

2\. prepare(forCollectionViewUpdates updateItems:) line 19

*   1\. Calculate Bottom and Top Visible Item Count
*   2\. Checking Initial Load or Load More
*   3\. Checking Pre-Append work or Append work
*   4\. In Pre-Append Case, Calculate new items total height.
*   5\. CATransaction begin with disable actions

3\. finalizeCollectionViewUpdates() line 81

*   In Pre-Append Case, Adjust content offset

Revise pre-appending timing at content offset close to zero.

![](/images/blog/1__Cm3oXH__1zv4GBEOYLpnJWw.jpeg)
![](/images/blog/1__l5gn9lmjcAq7Ezqod3kANQ.jpeg)

Well, You know these famous Chat Application. WeChat & Kakao Talk.

These has a common feature.

It is that These **pre-append messages at content offset close to zero**.

Before, I just customized ASBatchFetching that pre-append fetching can work like a basic append fetching work.

let contentSize: CGSize = scrollView.contentSize   
let viewLength = bounds.size.height   
let contentLength = contentSize.height 

// has small content   
if contentLength < viewLength {   
    switch scrollDirection {  
         case .down: return .prepend   
         case .up: return .append   
         default: return .none }   
}

let triggerDistance = viewLength \* leadingScreens let remainingDistance = contentLength — viewLength — offset

switch scrollDirection {   
    case .down:   
         return remainingDistance <= triggerDistance ?  
                .append: .none   
    case .up:   
         return offset < triggerDistance ?  <<--- @HERE  
                .prepend: .none  
    default:   
         return .none   
}

But This logic occur unnatural update collection items pre-appending work with unexpected content offset.

So, i just adjust pre-append trigger offset.

switch scrollDirection {   
    case .down:   
         return remainingDistance <= triggerDistance ?  
                .append: .none   
    case .up:   
         guard offset <= 0.0 else { return .none }  <<--- @HERE  
         return .prepend  
    default:   
         return .none   
}

Avoid excessive use Reactive Functional Programming(RxSwift & RxCocoa) to update message content

![](/images/blog/1__c4KOXac7Nyl1m____0cVzJ9w.png)

VTalk(Vingle Talk) message contains some simple components such as media, profile, message text, like engage button, username, timestamp and so on.

Especially, media should calculate image-ratio base on max/minimum width & height.

Unfortunately, all of message components are updated by component attribute observer on [ViewModel](https://medium.com/@h2s1880/texture-best-practice-5-8958482e7fb3)

So, [Before entering display status](http://texturegroup.org/docs/intelligent-preloading.html), Sometime layoutAttributesForItem method return unexpected attributes on UICollectionFlowLayout prepare method.

Because, media is asynchronously updated by observer on ViewModel. Finally, layoutAttributesForItem don’t know that message contain media with height value base on image ratio.

If sent message don’t need revise, i recommend avoid reactive programming at here. If you need update message content then just reload cell.