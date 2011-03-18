!SLIDE
# That's it!
### Backbone is only ~ 1k lines

!SLIDE
# So what's the fuss about?

!SLIDE
# Scalability

!SLIDE
### no, not webscale

!SLIDE
# Scalability of Code

!SLIDE
# Callbacks only go so far
    @@@ javascript
    $.ajax({
        url: 'document.xml',
        type: 'GET',
        dataType: 'xml',
        timeout: 1000,
        error: function(){
            alert('Error loading XML document');
        },
        success: function(xml){
            // do something with xml
        }
    });
#### from "Simplify Ajax development with jQuery" [http://www.ibm.com/developerworks/library/x-ajaxjquery.html](http://www.ibm.com/developerworks/library/x-ajaxjquery.html)

!SLIDE center
# $.ajax in a callback?
![Yo dawg](yo_dawg_function.jpg)

!SLIDE
# Event driven programming scales nicely

!SLIDE
# Let's do a short example!

!SLIDE bullets
# Application
* Display twitter public feed
* Refresh every 10 seconds
* Find-as-you-type search
* (that persists across refreshes)

!SLIDE center
# Demo
![Demo](demo.jpg)

!SLIDE
# 82 lines of js


