!SLIDE
# Controllers
### Super high level
### Routing and control flow

!SLIDE
# Message Controller
    @@@ javascript
    Backbone.Controller.extend({
      routes: {
        "": "index",
        "from/:sender": "from",
      },
      index: function() {
        MessageView.render();
      },
      from: function(sender) {
        FromView.filter(sender);
      }
    })



