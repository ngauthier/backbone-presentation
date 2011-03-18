!SLIDE
# Views
## Gateway to the DOM

!SLIDE
# Tweet View
    @@@ javascript
    Backbone.View.extend({
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
# View properties
## className
### name of css class (i.e. 'tweet')
## el
### existing element selector (i.e. '#tweets')
## tagName
### name of html tag (i.e. "li", "span")

!SLIDE
# View Event Listeners
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
# View Event Listeners
* maintain scope
* automatically remove and bind


