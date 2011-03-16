!SLIDE bullets
# Collections
* Make REST calls
* Instantiates Models
* Fires events

!SLIDE
# Twitter Collection
    @@@ javascript
    Backbone.Collection.extend({
      model: Tweet,
      url: "http://api.twitter.com/1/
            statuses/public_timeline.json"
    });

!SLIDE bullets
# Collection Actions
* fetch
* add
* create
* remove
* get

!SLIDE bullets
# Collection Events
* refresh
* add
* remove
* change

