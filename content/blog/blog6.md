---
title: "Tasting a flutter \U0001F60B"
description: >-
  Flutter is an extremely good SDK for developing iOS and Android applications
  at the same time.
date: '2021-05-01T13:12:49.446Z'
categories: []
keywords: []
image: "images/blog/0__4EHTHHTEnugwxCTz.png"
tags: ["flutter"]
---

A few months ago, I used SwiftUI/UIKit and Jetpack compose. Cuz, there is no doubt that it is good to consider the performance & accessibility.

But, as everyone has experienced, it was inevitable to feel tired of writing the same UI and business logic… SO, I had approached RN(react native) with expo.

I felt that it made a lot of progress in development experience compared to the past 4~5 years ago. but, i felt tired about various aspects of dependency management and usage. Especially, regarding navigation and routing dependencies & various hooks are made me confuse (Unfamiliarity is the biggest factor 😫). But, there is no doubt that it is a very good tool for developing apps as MVP(Minimum Viable Product).

Performance or language was not an important point for me in developing apps.

The most important points to me

*   **Hot reload**
*   Great **developer experience**(fast development and convenience)
*   **Accessibility** support for specialized users
*   Easily writing custom platform specific code
*   Layout inspector & Performance monitoring

Above all, I want everything to be simple.

![](/images/blog/0__4EHTHHTEnugwxCTz.png)

In conclusion, the flutter could not satisfy all needs, but it was relatively more satisfying than RN when used many things.

### User Interface

[https://flutter-ko.dev/docs/reference/widgets](https://flutter-ko.dev/docs/reference/widgets) there were quite a number of components needed to configure the UI(Text, Label, Appbar) and layout(Row, Column, Stack). I felt that it was more than the basic UIKit components needed to develop iOS apps, but if you use only what you really need, it’s not a lot :\].

In [pub.dev](https://pub.dev/), there were quite a lot of UI-related pubs. but it was still difficult to find pubs that were used universally and well-made with details. (That means there are many opportunities for growth. LOL)

#### \[Personally\] well-written flutter pubs 😋

*   flutter\_platform\_widgets: the convenience of developing apps for Android and iOS at the same time.
*   ionicons: simple icon assets
*   provider: it was much better to use than bloc.
*   pull\_to\_refresh: it most satisfactorily among the pull to refresh pubs.
*   fluttertoast: very simple. but, accessibility was not good.
*   flutter\_swipe\_action\_cell: it’s not free to form, but it’s pretty useful.

### Context?

[**BuildContext class - widgets library - Dart API**  
_A handle to the location of a widget in the widget tree. This class presents a set of methods that can be used from…_api.flutter.dev](https://api.flutter.dev/flutter/widgets/BuildContext-class.html "https://api.flutter.dev/flutter/widgets/BuildContext-class.html")[](https://api.flutter.dev/flutter/widgets/BuildContext-class.html)

BuildContext was one of the most interesting objects, it uses a number of roles in developing flutter app.

*   Make a the widget listen to changes on notifier inherited model with some provider (ex: context.watch<SomeModel>())
*   Get media query or model router
*   etc~

Finally, I could understand BuildContext from afar like a big river stream.

![](/images/blog/1__R5cemq9nWnk1KMdNWmrEAQ.png)

### Routing

At first, I was going to try bastard injection singleton service dependency into model inherited notifier.

As you know, a singleton object made of dart is uglier than you think.

![](/images/blog/1__5kVDwm0VEdwKLQ2fFxDTow.png)

In my case, I just created the grouped object with the dependencies as below screenshot & injected it into the model. (\* It’s never a good way or a good design.)

![](/images/blog/1__g8HUj8HxCESVvrfrRZSK0g.png)

![](/images/blog/1__pSBXUcfsNmtRc8zOxhB90w.png)
![](/images/blog/1__ARt6j1364HGCEkMJngbnjA.png)

It focused on flutter UI development rather than structure, so it roughly implemented this structure. If i have a time, i’ll try to design with Inversion Of Control Container.

### Unit Test

![](/images/blog/1__OS2BBZpyfEXEXtsxCkPq1Q.png)
![](/images/blog/1__YklxNeI5BvQuhFCIly0eYQ.png)

Flutter’s Unit Test was very very satisfying, with a much more advanced look compared to the XCTest.

### Conclusion

![](/images/blog/1__4HVyKHfvPWfzbpEuEcHWjQ.gif)

I regret that I should have referred to [the convention](https://medium.com/nonstopio/flutter-best-practices-c3db1c3cd694) before developing the app. it was very unfortunate that I spent most of time scene/object/folder naming. 😂

Apart from architecture or structural design, Flutter is an extremely good SDK for developing iOS and Android applications at the same time.

[**GeekTree0101/gitfeed**  
_A github api example flutter project. home feed tab, favorite repositories tab, personal profile tab, repository owner…_github.com](https://github.com/GeekTree0101/gitfeed "https://github.com/GeekTree0101/gitfeed")[](https://github.com/GeekTree0101/gitfeed)

I’m still a flutter beginner, So there may be a wrong design in my repository. If you find it, I would appreciate it if you could leave an issue or make a pull request at any time.

Thank you