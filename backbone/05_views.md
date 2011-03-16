!SLIDE
# Views
## Gateway to the DOM

!SLIDE
# Tweet View
    @@@ javascript
    var TweetView = Backbone.View.extend({
      className: 'tweet',
      initialize: function() {
        _.bindAll(this, 'render');
      },
      render: function() {
        $(this.el).html(TweetTemplate({
          model: this.model
        }));
        return this;
      }
    });

!SLIDE
# No templates in Backbone
### In the previous example, TweetTemplate was an underscore template

!SLIDE
# View Events
### Receive information from the DOM

!SLIDE
# Filter View
    @@@ javascript

    FilterView = Backbone.View.extend({
      events: {
        'keyup input': 'filter'
      },
      filter: function() {
        // stuff!
      }
      // remainder of view code
      // initializer, render, etc
    }
    });

!SLIDE bullets
# View Events
* maintain scope
* automatically remove and bind


