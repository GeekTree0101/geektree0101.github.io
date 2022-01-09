---
title: iOS 14 CTTelephonyNetworkInfo
description: >-
  iOS 13 이하에선 serviceSubscriberCellularProviders 를 출력하면 국내 디바이스에선 듀얼 유심이 아니기 때문에
  CTCarrier 반환값은 한개만 나온다.
date: '2020-09-19T09:25:48.772Z'
tags: ["ios", "bug"]
categories: ["iOS"]
image: "images/blog/0__sZc__5gq5USs5i9UT.png"
---

![](/images/blog/0__sZc__5gq5USs5i9UT.png)

iOS 13 이하에선 serviceSubscriberCellularProviders 를 출력하면 **국내 디바이스에선 듀얼 유심**이 아니기 때문에 CTCarrier 반환값은 한개만 나온다.

iOS 14에서 serviceSubscriberCellularProviders 를 출력하면 아래와 같은 값을 반환한다.

▿ Optional<Dictionary<String, CTCarrier>>

▿ some : 2 elements

▿ 0 : 2 elements

\- key : "0000000100000002"

\- value : CTCarrier (0x282b9ae80) {

Carrier name: \[<nil>\]

Mobile Country Code: \[<nil>\]

Mobile Network Code:\[<nil>\]

ISO Country Code:\[<nil>\]

Allows VOIP? \[YES\]

}

▿ 1 : 2 elements

\- key : "0000000100000001"

\- value : CTCarrier (0x282b9b210) {

Carrier name: \[KT\]

Mobile Country Code: \[450\]

Mobile Network Code:\[08\]

ISO Country Code:\[kr\]

Allows VOIP? \[YES\]

}

즉, 듀얼 유심 디바이스가 아니더라도 CTCarrier를 2개 반환한다.

*   하나는 unknown CTCarrier
*   나머지는 정상적인 CTCarrier

USIM 정보를 이용하여 어떤 서비스 하시는 분들께서는 이 부분 잘 고려해서 설계하시는게 좋겠습니다.