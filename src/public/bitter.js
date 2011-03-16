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
}


var Tweet = Backbone.Model.extend({
});

var Tweets = Backbone.Collection.extend({
  model: Tweet,
  url: "http://api.twitter.com/1/statuses/public_timeline.json"
});

var TweetTemplate = _.template(
  "<div class='user span-12 last'><%= model.get('user').screen_name %></div>"+
  "<div class='text span-12 last'><%= model.escape('text') %></div>"
);

var TweetView = Backbone.View.extend({
  className: 'tweet',
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
    Feed.each(function(tweet) {
      $(this.el).append(
        (new TweetView({model: tweet})).render().el
      );
    }, this);
  }
}))();

var Feed = new Tweets();

Feed.bind('refresh', TweetList.render);
//Feed.bind('refresh', function() { TweetList.render()});


$(function() {
  Feed.fetch();
});

