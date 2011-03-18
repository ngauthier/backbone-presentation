!SLIDE
# Model
    @@@ javascript
    Tweet = Backbone.Model.extend({})
### (no persistence)

!SLIDE
# Collection
    @@@ javascript
    Backbone.Collection.extend({
      model: Tweet,
      url: "http://api.twitter.com/1/
            statuses/public_timeline.json"
    });

!SLIDE
# Tweet Template
    @@@ javascript
    TweetTemplate = _.template(
      "<div class='user span-4 '>" +
      "<%= model.get('user').screen_name %>"+
      "</div>"+
      "<div class='text span-20 last'>"+
      "<%= model.escape('text') %>"+
      "</div>"
    );
### In a "real app" this would not be a string

!SLIDE
# Tweet View
    @@@ javascript
    TweetView = Backbone.View.extend({
      className: 'tweet span-24',
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
# Tweet List View
    @@@ javascript
    TweetList = Backbone.View.extend({
      el: '#tweets',
      initialize: function() {
        _.bindAll(this, 'render');
      },
      // cont ...

!SLIDE
# Tweet List View
    @@@ javascript
      render: function() {
        $(this.el).html('');
        _.each(Feed.select(TweetFilter), function(tweet) {
          $(this.el).append(
            (new TweetView({model: tweet})).render().el
          );
        }, this);
      }
    });

!SLIDE
# So what's that TweetFilter?

!SLIDE
# Filter View
    @@@ javascript
    FilterView = Backbone.View.extend({
      el: '#filter',
      events: {
        'keyup input': 'filter'
      },
      initialize: function() {
        _.bindAll(this, 'filter', 'render');
      },
      // cont

!SLIDE
# Filter View
    @@@ javascript
      // returns true if tweet text
      // contains field value
      filter: function() {
        TweetFilter = function(tweet) {
          val = this.$('input').val();
          text = tweet.escape('text');
          return text.indexOf(val) >= 0;
        };
        this.trigger('change:filter');
      }
      // cont

!SLIDE
# Filter View
    @@@ javascript
      render: function() {
        $(this.el).html(
          "<div class='span-4'>Filter tweets by query</div>"+
          "<div class='span-20 last'>"+
            "<input type='text' />" +
          "</div>"
        );
        this.delegateEvents(this.events);
      },
    });


!SLIDE
# Glue it together
    @@@ javascript
    // Setup the filter view
    $(FilterView.render);

!SLIDE
# Glue it together
    @@@ javascript
    // Render tweet list when 
    // new tweets come in
    var Feed = new Tweets();
    Feed.bind(
      'refresh',
      TweetList.render
    );

!SLIDE
# Glue it together
    @@@ javascript
    // Render tweet list when
    // the filter changes
    FilterView.bind(
      'change:filter',
      TweetList.render
    );

!SLIDE
# Glue it together
    @@@ javascript
    // Refresh every 10 seconds
    var Refresh = function() {
      setTimeout(Refresh, 10000);
      Feed.fetch();
    };
    Refresh();
