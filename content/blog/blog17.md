---
title: 아~ Fastlane 이중인증 해결법
description: Apple itune connect two-factor auth issue
date: '2019-05-24T03:13:21.629Z'
tags: ["ios", "fastlane"]
categories: ["iOS", "Devops"]
image: images/blog/0____betKn9zTRaLl3d4.png
---

![](/images/blog/0____betKn9zTRaLl3d4.png)

### Apple itune connect two-factor auth issue

### 1\. Get two factor session cookie

spaceauth를 이용하여 session cookie를 가져옵니다.

\> 명령어

rm -rf ~/.fastlane/spaceship/name@gmail.com  
fastlane spaceauth -u name@gmail.com

\> Output Log 예시

rm -rf ~/.fastlane/spaceship/name@gmail.com  
fastlane spaceauth -u name@gmail.com  
fastlane spaceauth expected output  
Logging into to App Store Connect (name@gmail.com)...

Two-step Verification (4 digits code) or Two-factor Authentication (6 digits code) is enabled for account 'name@gmail.com'  
More information about Two-step Verification (4 digits code): [https://support.apple.com/en-us/HT204152](https://support.apple.com/en-us/HT204152)  
More information about Two-factor Authentication (6 digits code): [https://support.apple.com/en-us/HT204915](https://support.apple.com/en-us/HT204915)

Two-factor Authentication (6 digits code) is enabled for account 'name@gmail.com'  
If you're running this in a non-interactive session (e.g. server or CI)  
check out [https://github.com/fastlane/fastlane/tree/master/spaceship#2-step-verification](https://github.com/fastlane/fastlane/tree/master/spaceship#2-step-verification)  
Please enter the 6 digit code: 016193  
Requesting session...  
Successfully logged in to App Store Connect

\---

Pass the following via the FASTLANE\_SESSION environment variable:  
\---\\n-~~~~~~ {fastlane session cookie} ~~~~~\`\` 

Example:  
\---\\n-~~~~~~ {example cookie} ~~~~~\`\`

### 2\. Copy & Paste FASTLANE\_SESSION environment variable onto Travis CI

CI configuration에 매달 한번씩 주기적으로FASTLANE\_SESSION key값에 복사한 session cookie를 value값으로 지정해 업데이트 해줍니다.

### 3\. Test session validation

정상적으로 동작하는지 검증합니다.

\> 명령어

fastlane run latest\_testflight\_build\_number

\> Output Log 예시

fastlane run latest\_testflight\_build\_number  
Expected output log  
\[✔\] 🚀   
\[09:54:09\]: fastlane detected a Gemfile in the current directory  
\[09:54:09\]: however it seems like you don't use \`bundle exec\`  
\[09:54:09\]: to launch fastlane faster, please use  
\[09:54:09\]:   
\[09:54:09\]: $ bundle exec fastlane run latest\_testflight\_build\_number  
\[09:54:09\]:   
\[09:54:09\]: Get started using a Gemfile for fastlane [https://docs.fastlane.tools/getting-started/ios/setup/#use-a-gemfile](https://docs.fastlane.tools/getting-started/ios/setup/#use-a-gemfile)  
+-----------------------+---------+-----------+  
|                Used plugins                 |  
+-----------------------+---------+-----------+  
| Plugin                | Version | Action    |  
+-----------------------+---------+-----------+  
| fastlane-plugin-badge | 1.2.0   | add\_badge |  
+-----------------------+---------+-----------+

\[09:54:11\]: --------------------------------------------  
\[09:54:11\]: --- Step: latest\_testflight\_build\_number ---  
\[09:54:11\]: --------------------------------------------  
\[09:54:12\]: Login to App Store Connect (name@gmail.com)  
\[09:54:15\]: Login successful <---- HERE!  
\[09:54:24\]: Fetching the latest build number for version 4.7.8  
\[09:54:25\]: Latest upload for version 4.7.8 is build: 223  
\[09:54:25\]: Result: 223

👍