---
title: 'SwiftUI와 Texture의 미래?에 대한 고찰 #1'
description: >-
  WWDC2019에서 드디어 일냈다. Autolayout이 아닌 flexible한 DSL기반 UI 개발을 할 수 있게 되었다. 한편으로는 매우
  기쁘지만 한편으로는 iOS13부터 최소지원이라 아쉬운 감도 없잖아 있다.
date: '2019-06-06T13:30:24.176Z'
tags: ["ios", "texture", "SwiftUI"]
categories: ["iOS"]
image: "images/blog/1__FsLyc18Aw2__w2qJfCcHobQ__2x.jpeg"
---

![](/images/blog/1__FsLyc18Aw2__w2qJfCcHobQ__2x.jpeg)

WWDC2019에서 드디어 일냈다. Autolayout이 아닌 flexible한 DSL기반 UI 개발을 할 수 있게 되었다. 한편으로는 매우 기쁘지만 한편으로는 iOS13부터 최소지원이라 아쉬운 감도 없잖아 있다.

![](/images/blog/1__41vNxGUIJppKhXtwYnDzrQ__2x.jpeg)

이런 상황에서 텍스쳐는 과연 어떻게 앞으로의 입지를 다져 나갈껏인가? 그리고 미래 방향과 메인테이너 분들의 생각이 매우 궁금했다.

때마침 텍스쳐 커뮤니티에서 술렁술렁 거리는 가운데 huy 메인테이너 분께서 말씀하시기를

![](/images/blog/1__ZSxSYXgK531pz3zpBZODwQ__2x.jpeg)

**_allowing a clear and (hopefully) simple migration path between the 2 frameworks._**

SwiftUI와 Texture간의 migration길을 간단히 열어두는 것이 개인 의견이라고 말씀하셨다.

SwiftUI특징에 초점을 맞추면 크게 두가지가 있다.

*   DSL UIs
*   Custom attribute (ex: @State)

달리 말하자면 아래와 같이 표현된다.

*   Function builder
*   Property Delegate

위 두가지를 Texture와 잘 조합하면 양방향으로 마이그레이션 할 수 있는 길이 있지않을까 하는 생각이 들긴 하지만, 아무래도 Objective-C가 아닌 Swift에서 제공되는 것들이다보니, SwiftUI호환에 맞춰가면서 쓰기 위해선 Texture를 Swift로 마이그레이션한다던가 또는 호환을 위한 Ext또는 슈퍼셋을 만드는 방법도 있지 않을까 싶다. 기회만 된다면 아주 작은거 부터 당장해보고싶다.

[**\[WIP\] Basic support for function builders by rjmccall · Pull Request #25221 · apple/swift**  
_Provide basic support for function builders, which allow the convenient creation of eDSLs for complex lists and…_github.com](https://github.com/apple/swift/pull/25221 "https://github.com/apple/swift/pull/25221")[](https://github.com/apple/swift/pull/25221)

[**Property delegates as custom attributes by DougGregor · Pull Request #23701 · apple/swift**  
_This is an implementation of property delegates as custom attributes, under discussion in this pitch thread. The…_github.com](https://github.com/apple/swift/pull/23701 "https://github.com/apple/swift/pull/23701")[](https://github.com/apple/swift/pull/23701)