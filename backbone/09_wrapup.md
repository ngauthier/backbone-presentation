!SLIDE
# Scalability of Code

!SLIDE
# 71 lines of class definition

!SLIDE
# 9 lines of 'business logic'

!SLIDE
# Backbone inspires OO style

!SLIDE
# Logic pushed down to classes

!SLIDE
# Natural decoupling due to evented nature

!SLIDE
# Afterword
### hackability

!SLIDE
# Backbone is ~1k lines
### A lot of that is comments

!SLIDE
# To pull from twitter directly (no proxy), I needed jsonp

!SLIDE
# Overrode Backbone.sync
    @@@ javascript
    Backbone._sync=Backbone.sync;
    Backbone.sync=function(/*params*/) {
     if (/* call to twitter */) {
      $.ajax({url: model.url,
        contentType: 'application/json',
        type: 'get', dataType: 'jsonp',
        success: success, error: error
       });
     } else { Backbone._sync(/*params*/); }
    };

!SLIDE
# Bonus!

!SLIDE
# Questions?
### [@ngauthier](http://twitter.com/ngauthier)
### [ngauthier@shortmail.com](mailto:ngauthier@shortmail.com)
### [http://ngauthier-backbone.heroku.com](http://ngauthier-backbone.heroku.com)
### [http://github.com/ngauthier/backbone-presentation](http://github.com/ngauthier/backbone-presentation)


