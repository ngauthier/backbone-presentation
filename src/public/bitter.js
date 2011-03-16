var Tweet = Backbone.Model.extend({

});
var Tweets = Backbone.Collection.extend({
  model: Tweet,
  url: '/tweets', 
  initialize: function(options) {
    this.screen_name = options.screen_name;
  }
});

var TweetView = Backbone.View.extend({
  className: 'tweet',
  initialize: function() {
    _.bindAll(this, 'render');
  },
  render: function() {
    $(this.el).html(this.model.escape('text'));
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

var Feed = new Tweets({screen_name: 'ngauthier'});

Feed.bind('refresh', TweetList.render);
//Feed.bind('refresh', function() { TweetList.render()});


$(function() {
  Feed.fetch();
});

