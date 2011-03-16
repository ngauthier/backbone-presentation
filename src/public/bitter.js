Backbone._sync = Backbone.sync;
Backbone.sync = function(method, model, success, error) {
  if (model.url.indexOf('http://api.twitter.com') === 0) {
    $.ajax({
      url: model.url,
      type: 'get',
      contentType: 'application/json',
      dataType: 'jsonp',
      success: success,
      error: error
    });
  } else {
    Backbone._sync(method, model, success, error);
  }
};

var TweetFilter = function(tweet) { return true; };

var Tweet = Backbone.Model.extend({
});

var Tweets = Backbone.Collection.extend({
  model: Tweet,
  url: "http://api.twitter.com/1/statuses/public_timeline.json"
});

var TweetTemplate = _.template(
  "<div class='user span-4 '><%= model.get('user').screen_name %></div>"+
  "<div class='text span-20 last'><%= model.escape('text') %></div>"
);

var TweetView = Backbone.View.extend({
  className: 'tweet span-24',
  initialize: function() {
    _.bindAll(this, 'render');
  },
  render: function() {
    $(this.el).html(TweetTemplate({model: this.model}));
    return this;
  }
});

var TweetList = new (Backbone.View.extend({
  el: '#tweets',
  initialize: function() {
    _.bindAll(this, 'render');
  },
  render: function() {
    $(this.el).html('');
    _.each(Feed.select(TweetFilter), function(tweet) {
      $(this.el).append(
        (new TweetView({model: tweet})).render().el
      );
    }, this);
  }
}))();

var FilterView = new (Backbone.View.extend({
  el: '#filter',
  events: {
    'keyup input': 'filter'
  },
  initialize: function() {
    _.bindAll(this, 'filter', 'render');
  },
  render: function() {
    $(this.el).html(
      "<div class='span-4'>Filter tweets by query</div>"+
      "<div class='span-20 last'>"+
        "<input type='text' />" +
      "</div>"
    );
    this.delegateEvents(this.events);
  },
  filter: function() {
    TweetFilter = function(tweet) {
      return (tweet.escape('text').indexOf(this.$('input').val()) >= 0);
    };
    this.trigger('change:filter');
  }
}))();

$(FilterView.render);

var Feed = new Tweets();
Feed.bind('refresh', TweetList.render);
FilterView.bind('change:filter', TweetList.render);

var Refresh = function() {
  //setTimeout(Refresh, 60000);
  Feed.fetch();
};
Refresh();
