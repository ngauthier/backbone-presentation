!SLIDE bullets
# Models
* Make REST calls
* Validation
* Fires events

!SLIDE
# Twitter Model
    @@@ javascript
    Backbone.Model.extend({
      initialize: function() {
        // set some defaults
      },
      reply: function(tweet, message) {
        // create new tweet replying
        // to referenced tweet with
        // a message
      }
    });

!SLIDE bullets
# Model Actions
* get
* set
* save
* destroy

!SLIDE bullets
# Model Events
* add
* remove
* change

!SLIDE
# Models
## Validate before saving

!SLIDE
# Models
## Mostly helper methods
