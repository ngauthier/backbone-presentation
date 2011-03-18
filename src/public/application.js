// Alias away the sync method
Backbone._sync = Backbone.sync;
// Override sync
Backbone.sync = function(method, model, success, error) {
  // If we're making a twitter call ...
  if (model.url.indexOf('http://api.twitter.com') === 0) {
    // Do it with jsonp
    $.ajax({
      url: model.url,
      type: 'get',
      contentType: 'application/json',
      dataType: 'jsonp',
      success: success,
      error: error
    });
  } else {
    // otherwise make a normal call
    Backbone._sync(method, model, success, error);
  }
};

// Filter for which tweets to display. Defaults to all
var TweetFilter = function(tweet) { return true; };

// Empty model to hold our tweets
var Tweet = Backbone.Model.extend({});

// Tweet collection for fetching tweets
var Tweets = Backbone.Collection.extend({
  model: Tweet,
  url: "http://api.twitter.com/1/statuses/public_timeline.json"
});

// Template for rendering tweets
var TweetTemplate = _.template(
  "<div class='user span-4 '><%= model.get('user').screen_name %></div>"+
  "<div class='text span-20 last'><%= model.escape('text') %></div>"
);

// View for an individual tweet
var TweetView = Backbone.View.extend({
  className: 'tweet span-24',
  initialize: function() {
    // This binds the render call so "this" is always this view
    _.bindAll(this, 'render');
  },
  render: function() {
    // Populate the template with our model
    $(this.el).html(TweetTemplate({model: this.model}));
    // for chaining
    return this;
  }
});

// View for the entire list of tweets
var TweetList = new (Backbone.View.extend({
  // Bind to an existing element
  el: '#tweets',
  initialize: function() {
    _.bindAll(this, 'render');
  },
  render: function() {
    // empty the element
    $(this.el).html('');
    // select tweets that match the current filter and iterate
    _.each(Feed.select(TweetFilter), function(tweet) {
      // Append a tweetview to this element
      $(this.el).append(
        (new TweetView({model: tweet})).render().el
      );
    }, this);
  }
}))();

// View to handle find-as-you-type filtering
var FilterView = new (Backbone.View.extend({
  // bind to existing element
  el: '#filter',
  // when keyup fires on the input, run the filter method
  events: {
    'keyup input': 'filter'
  },
  initialize: function() {
    _.bindAll(this, 'filter', 'render');
  },
  render: function() {
    // Fill with static html
    $(this.el).html(
      "<div class='span-4'>Filter tweets by query</div>"+
      "<div class='span-20 last'>"+
        "<input type='text' />" +
      "</div>"
    );
    // And bind our events (this backbone method auto-clears events)
    this.delegateEvents(this.events);
  },
  filter: function() {
    // Set the global filter to return true for tweets
    // containing text that has the value of the filter field
    // in it somewhere
    TweetFilter = function(tweet) {
      return (tweet.escape('text').indexOf(this.$('input').val()) >= 0);
    };
    // When the filter changes, fire an event
    this.trigger('change:filter');
  }
}))();

// Setup the filter
$(FilterView.render);

// Instantiate a new feed
var Feed = new Tweets();
// When the feed is refreshed, render the list
Feed.bind('refresh', TweetList.render);
// When the filter changes, render the list
FilterView.bind('change:filter', TweetList.render);

// Auto-refresh the feed every 10 seconds
var Refresh = function() {
  setTimeout(Refresh, 10000);
  Feed.fetch();
};
Refresh();
