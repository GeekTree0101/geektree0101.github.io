---
title: How to use regular expressions to distinguish national languages in Swift
description: 'String(“안녕하세요”).range(of: “\\p{Hangul}”, options: .regularExpression)'
date: '2018-05-12T04:00:13.543Z'
tags: ["ios", "regex"]
categories: ["iOS"]
---

String(“안녕하세요”).range(of: “\\\\p{Hangul}”, options: .regularExpression)

: True

String(“Say Hello”).range(of: “\\\\p{Hangul}”, options: .regularExpression)

: False

1.  \\p{Common}
2.  \\p{Arabic}
3.  \\p{Armenian}
4.  \\p{Bengali}
5.  \\p{Bopomofo}
6.  \\p{Braille}
7.  \\p{Buhid}
8.  \\p{Canadian\_Aboriginal}
9.  \\p{Cherokee}
10.  \\p{Cyrillic}
11.  \\p{Devanagari}
12.  \\p{Ethiopic}
13.  \\p{Georgian}
14.  \\p{Greek}
15.  \\p{Gujarati}
16.  \\p{Gurmukhi}
17.  \\p{Han}
18.  \\p{Hangul}
19.  \\p{Hanunoo}
20.  \\p{Hebrew}
21.  \\p{Hiragana}
22.  \\p{Inherited}
23.  \\p{Kannada}
24.  \\p{Katakana}
25.  \\p{Khmer}
26.  \\p{Lao}
27.  \\p{Latin}
28.  \\p{Limbu}
29.  \\p{Malayalam}
30.  \\p{Mongolian}
31.  \\p{Myanmar}
32.  \\p{Ogham}
33.  \\p{Oriya}
34.  \\p{Runic}
35.  \\p{Sinhala}
36.  \\p{Syriac}
37.  \\p{Tagalog}
38.  \\p{Tagbanwa}
39.  \\p{TaiLe}
40.  \\p{Tamil}
41.  \\p{Telugu}
42.  \\p{Thaana}
43.  \\p{Thai}
44.  \\p{Tibetan}
45.  \\p{Yi}

ref:

[**Regex Tutorial - Unicode Characters and Properties**  
_Edit description_www.regular-expressions.info](https://www.regular-expressions.info/unicode.html "https://www.regular-expressions.info/unicode.html")[](https://www.regular-expressions.info/unicode.html)