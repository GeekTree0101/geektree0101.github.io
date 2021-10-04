---
title: Let’s Merge Decodable Class!
description: Swift 4.x support Decodable which is very easy an useful to make Model.
date: '2018-05-13T12:49:46.375Z'
categories: []
keywords: []
slug: /@h2s1880/lets-merge-decodable-class-3689d0a58514
---

Swift 4.x support Decodable which is very easy an useful to make Model.

However, It isn’t support merge method between same class properties

So, I have created \[Mergeable\] protocol.

and, I have created a \[User\] class that inherits Mergeable and NSObject.

In swift4.x, Class property must be objc attribute applied property. Cuz, Mergeable use setValueForKey method.

_The @objc attribute makes your Swift API available in Objective-C and the Objective-C runtime._

uhmm.. something wrong?…