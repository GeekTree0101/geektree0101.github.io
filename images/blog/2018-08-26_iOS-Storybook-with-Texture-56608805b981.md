---
title: iOS Storybook with Texture
description: >-
  Recently, Our Vingle Web-Front team applied the storybook to the development
  environment. It was a non-jealous jealousy to me. :(
date: '2018-08-26T06:44:39.604Z'
categories: []
keywords: []
slug: /@h2s1880/ios-storybook-with-texture-56608805b981
---

![](/images/blog/1__gLbtMlSs1A4bn73s7uoVaQ.png)

Recently, Our Vingle Web-Front team applied the storybook to the development environment. It was a non-jealous jealousy to me. :(

[**storybooks/storybook**  
_storybook - Interactive UI component dev & test: React, React Native, Vue, Angular_github.com](https://github.com/storybooks/storybook "https://github.com/storybooks/storybook")[](https://github.com/storybooks/storybook)

If i make as Pure UIKit like a storybook concept then i will failed it due to 3 reasons.

At first, We have to pay much attention to height calculation in UITableViewCell or UICollectionViewCell.

Secondly, A Unit Storybook generate logic should branch off between Table and Collection in List case.

Thirdly, I just lazy. If i use only UIKit then i have to write a lot ~~~ of codes. very very a lot (it isn’t kidding)

[**GeekTree0101/ASStoryBook**  
_ASStoryBook - Interactive UI component dev & test built on Texture_github.com](https://github.com/GeekTree0101/ASStoryBook "https://github.com/GeekTree0101/ASStoryBook")[](https://github.com/GeekTree0101/ASStoryBook)

The ASStoryBook project is currently in progress and installation instructions are as follows:

![](/images/blog/1__Y6TkJPUpWaZwbJ__6C5b7xA.png)

If you’re lazy like me then just duplicate your base project target.

and rename target such as BlahBlahProjectStoryBook, AwesomeStoryBook and so on.

Now, you will got two Target Membership (your project & your storybook).

![](/images/blog/1__Wz9__WQ32fPfeZumjGJW2QA.png)

And next, create StoryBook Group with StoryBook AppDelegate, Some StoryBook.

you can see example at here: [https://github.com/GeekTree0101/ASStoryBook/tree/master/Example/Sample/SampleStorybook](https://github.com/GeekTree0101/ASStoryBook/tree/master/Example/Sample/SampleStorybook)

![](/images/blog/1__dxVkOzwcNgEyoTOvDbqbyA.png)

This process is very important. If you mistake at here then you will faced build error due to appDelegate.

![](/images/blog/1__i57SsgeyBoYAX__meQo__ZtA.png)

Now, you should update podfile, Ahha… very disappoint issue is that Libraries built on **Texture 2.7** can’t be published to CocoaPods caused by **Thread-local storage is not supported on this architecture.**

Don’t worry, Texture team already fixed upper issue.

[https://github.com/TextureGroup/Texture/pull/1025/files](https://github.com/TextureGroup/Texture/pull/1025/files)

![](/images/blog/1__OcoyIK3m5pR__6nvwqK__MsQ.png)

Finally, Your Nodes should share Base Project & Storybook Target Membership.

Example Video:

Thank you!