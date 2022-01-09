---
title: 'VEditorKit: Lightweight and Powerful Editor Kit (Part 1.  NSTextStorage)'
description: Lightweight and Powerful Editor Kit built on Texture
date: '2019-01-20T04:23:30.385Z'
image: images/blog/0__SxvCIXdi445gUH7r.png
tags: ["ios", "vingle", "VEditorKit"]
categories: ["iOS"]
---

![](/images/blog/0__SxvCIXdi445gUH7r.png)

Lightweight and Powerful Editor Kit built on Texture(AsyncDisplayKit)

VEditorKit provides the **most core functionality** needed for the editor. Unfortunately, When **combined words** are entered then UITextView selectedRange will changed and **typingAttribute will cleared**. So, In combined words case, Users can’t continue typing the style they want.

[**typingAttributes - UITextView | Apple Developer Documentation**  
_This dictionary contains the attribute keys (and corresponding values) to apply to newly typed text. When the text…_developer.apple.com](https://developer.apple.com/documentation/uikit/uitextview/1618629-typingattributes "https://developer.apple.com/documentation/uikit/uitextview/1618629-typingattributes")[](https://developer.apple.com/documentation/uikit/uitextview/1618629-typingattributes)

> This dictionary contains the attribute keys (and corresponding values) to apply to newly typed text. **When the text view’s selection changes, the contents of the dictionary are cleared automatically**.

![](/images/blog/0__Ci6__gbc8tjS1vW1R.jpg)

#### So, How to solve this issue?

Key points is NSTextStorage!

[**NSTextStorage - UIKit | Apple Developer Documentation**  
_A text storage object can be accessed from any thread of your app, but your app must guarantee access from only one…_developer.apple.com](https://developer.apple.com/documentation/uikit/nstextstorage "https://developer.apple.com/documentation/uikit/nstextstorage")[](https://developer.apple.com/documentation/uikit/nstextstorage)

Our Vingle iOS team is missing part is as follows :

*   UITextView covers many attribute-related features such as delete, typing with bold, italic, heading, quote attributes
*   No dependency separation between typing attribute controller with UITextView
*   When the text view’s selection changes, the contents of the dictionary are cleared automatically. But, Our team UITextView apply typing attribute value on a redundant basis after update text.

[**GeekTree0101/VEditorKit**  
_Lightweight and Powerful Editor Kit (Beta). Contribute to GeekTree0101/VEditorKit development by creating an account on…_github.com](https://github.com/GeekTree0101/VEditorKit/blob/master/VEditorKit/Classes/VEditorTextStorage.swift "https://github.com/GeekTree0101/VEditorKit/blob/master/VEditorKit/Classes/VEditorTextStorage.swift")[](https://github.com/GeekTree0101/VEditorKit/blob/master/VEditorKit/Classes/VEditorTextStorage.swift)

The above problems were resolved as follows.

### 1\. Define typing status & make currentTypingAttribute property

enum TypingStstus {         
 case typing          
 case remove          
 case paste         
 case none      
}  
  
internal var currentTypingAttribute: \[NSAttributedString.Key: Any\] = \[:\]

currentTypingAttribute replaces UITextView typingAttribute property.

In this case, How to update internal currentTypingAttribute on NSTextStorage?.

The solutions are as follows:

open class VEditorTextNode: ASEditableTextNode, ASEditableTextNodeDelegate {          
      
    open var textStorage: VEditorTextStorage? {   
       return self.textView.textStorage as? VEditorTextStorage      
     }     
      
    open var currentTypingAttribute: \[NSAttributedString.Key: Any\] = \[:\] {          
     didSet {  
           self.typingAttributes = currentTypingAttribute  
                                   .typingAttribute()  
           self.textStorage?  
               .currentTypingAttribute = currentTypingAttribute  
     }     
}

If you set currentTypingAttribute on TextView then automatically update UITextView typingAttribute with textStorage internal currentTypingAttribute.

### 2\. Set typingStatus as Paste on setAttributedString:

override public func setAttributedString(\_ attrString: NSAttributedString) {          
    self.status = .paste          
    super.setAttributedString(attrString)      
}

### 3\. Set typingStatus as remove or typing on replaceCharacters:

override public func replaceCharacters(in range: NSRange, with str: String) {          
    if self.status != .paste {         
        self.status = str.isEmpty ? .remove: .typing         
    }                

    self.beginEditing()         
    self.internalAttributedString  
        .replaceCharacters(in: range, with: str)          
    self.replaceTextString(in: range, with: str)       
    self.edited(.editedCharacters,  
                range: range,  
                changeInLength: str.count - range.length)          
    self.endEditing()     
}

If status is paste then ignore status updating as remove or typing.

override public func setAttributes(\_ attrs: \[NSAttributedString.Key: Any\]?, range: NSRange) {      

     guard internalAttributedString.length > range.location else {   
          return   
     }           
         
     switch status {        
       case .typing, .paste: break      
       default: return          
     }         
          
     self.beginEditing()  
     self.internalAttributedString  
         .setAttributes(attrs, range: range)  
     self.edited(.editedAttributes, range: range, changeInLength: 0)  
     self.endEditing()      
}

In typing & paste status, after typing text will operate setAttributes methods.

### 4\. override processEditing:

override public func processEditing() {  
       switch status {  
        case .typing:     
           guard !self.currentTypingAttribute.isEmpty else { break }  
           self.internalAttributedString  
               .setAttributes(self.currentTypingAttribute,  
                              range: self.editedRange)         
        default:              
            break         
      }   
       super.processEditing()     
}

In combined character typing status, typingAttribute cleared due to selection changing. But, currentTypingAttribute sustained and will set expected typing attributes. Therefore, The cleared UITextView typingAttribute returns internal currentTypingAttribute on NSTextStorage by UITextView internal system logic.

![](/images/blog/1__GPJAsVw4I3XUyPsDEejF9w.gif)
![](/images/blog/1__ewpzNsWOxjOW8AADYYr3pg.gif)

![](/images/blog/1__6HbBYrl6A4WEKAa8Wh6diQ.png)

VEditorKit is looking for contributor who will be thinking about iOS Text editor technology.

![](/images/blog/1__GPJAsVw4I3XUyPsDEejF9w.gif)
![](/images/blog/1__ewpzNsWOxjOW8AADYYr3pg.gif)
![](/images/blog/1__PRjX2mIls8nOIfx2hRavNg.gif)

![](/images/blog/1__faTeUe8mKcnq9Z8ltt__zUA.gif)
![](/images/blog/1__9ytvYQ__cRnh7P7FJYxKoYQ.gif)
![](/images/blog/1__rRnf__vMUta7SUS__7hH2nmw.gif)