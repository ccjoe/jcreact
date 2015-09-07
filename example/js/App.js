var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render(){
    return (
      <div>
        <h1>Jcreact</h1>
        <RouteHandler />
      </div>
    );
  }
});

var SetNav = require('./SetNav');
var SetSwitch = require('./SetSwitch');

//handler值为相应的组件
var routes = (
  <Route handler={App}>
    <Route path="setnav" handler={SetNav} />
    <Route path="setswitch" handler={SetSwitch} />
  </Route>
);

document.addEventListener('DOMContentLoaded', function() {
  Router.run(routes, Router.HashLocation, function(Handler) {
      React.render(<Handler />, document.body);
  });
});

module.exports = App;

