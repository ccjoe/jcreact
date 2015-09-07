//捆绑模式引入依赖
// var React = require('react');
// var Router = require('react-router');
//非捆绑模式（UMD）引入依赖
var Router = ReactRouter;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Nav = JcReact.Nav,
    NavItem = JcReact.NavItem;

var AppNav = React.createClass({
  render(){
    return(
      <Nav type="pills" justify="true">
          <NavItem href="/#/SetNav" title="SetNav">菜单类</NavItem>
          <NavItem href="/#/SetSwitch" title="SetSwitch" >切换面板类</NavItem>
      </Nav>
    )
  }
})
var App = React.createClass({
  render(){
    return (
      <div>
        <AppNav/>
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
  <Route path="/" handler={App}>
    <Route path="setnav" handler={SetNav} />
    <Route path="setswitch" handler={SetSwitch} />
  </Route>
);

Router.run(routes, Router.HashLocation, function(Handler) {
    React.render(<Handler />, document.getElementById('body'));
});

module.exports = App;

