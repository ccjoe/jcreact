(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.JcReact = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/shaofengliu/IT/git/jcreact/src/Button.js":[function(_dereq_,module,exports){

},{}],"/Users/shaofengliu/IT/git/jcreact/src/Grid.js":[function(_dereq_,module,exports){

},{}],"/Users/shaofengliu/IT/git/jcreact/src/Layout.js":[function(_dereq_,module,exports){

},{}],"/Users/shaofengliu/IT/git/jcreact/src/Nav.js":[function(_dereq_,module,exports){
'use strict';
var Nav = React.createClass({displayName: "Nav",
    getDefaultProps: function(){
        return {
            active: false,
            type: 'tab'
        }
    },
    propTypes: {
        type: React.PropTypes.oneOf(['tab', 'top', 'side', 'copyright', 'breadcrumb'])
    },
    render: function(){
         var cx = React.addons.classSet;
          var classes = cx({
            'am-nav am-nav-pills': (this.props.type==='pills'),     //水平导航
            'am-nav am-nav-tabs': (this.props.type==='tabs'),       //tab导航
            'am-nav': (this.props.type==='side'),                   //侧边导航
            'am-nav-justify': this.props.justify ,                  //宽度只适应
            'am-breadcrumb': (this.props.type==='breadcrumb'),
            'am-breadcrumb-slash': this.props.slash==='true',       //带/的分隔
            'am-list': (this.props.type === 'list'),                //列表
            'am-pagination': (this.props.type==='pagination'),
            'am-slides': (this.props.type==='slide')
          });
        return React.createElement("ul", {className: classes}, this.props.children);
    }    
});

module.exports = Nav;

},{}],"/Users/shaofengliu/IT/git/jcreact/src/NavItem.js":[function(_dereq_,module,exports){
'use strict';
var NavItem = React.createClass({displayName: "NavItem",
    getDefaultProps: function(){
        return {
            active: false
        }
    },
    propTypes: {
        active: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        // divider: React.propTypes.bool,
        href: React.PropTypes.any
    },

    render: function(){
        var cx = React.addons.classSet;
          var classes = cx({
            'am-disabled': this.props.disabled,
            'am-active': this.props.active,
            'am-nav-header': this.props.header,
            'am-divider am-nav-divider': this.props.divider,
          });
        return React.createElement("li", {className: classes}, React.createElement("a", React.__spread({},  this.props), this.props.children));
    }
});

module.exports = NavItem;

},{}],"/Users/shaofengliu/IT/git/jcreact/src/Pane.js":[function(_dereq_,module,exports){
var Pane = React.createClass({displayName: "Pane",
    //设置默认属性
    getDefaultProps: function(){
        return{
            color: 'default',   //warning success error info
            collapse: true      //是否可以收缩
        }
    },
    //propTypes验证实体属性类型
    propTypes: {
        color: React.PropTypes.string.isRequired,
        collapse: React.PropTypes.bool.isRequired
    },
    getInitialState: function(){
      return {
        collapseState: true    //展开态
      }
    },
    // 切换时改变状态
    changeState: function(collapse){
      if(!collapse) return;
      this.setState({
        collapseState: !this.state.collapseState
      })
    },

    render: function(){
        var cls =  this.props.collapse ? "am-panel-collapse am-collapse " : " ";
        var clsbd = this.state.collapseState ? "am-in" : " ";

        return React.createElement("div", {className: "am-panel am-panel-"+this.props.color}, 
                React.createElement("div", {className: "am-panel-hd", onClick: this.changeState.bind(this.props.collapse)}, 
                    this.props.title
                ), 
                React.createElement("div", {className: cls + clsbd}, 
                 React.createElement("div", {className: "am-panel-bd"}, this.props.children)
                )
            )
    }
});

module.exports = Pane;

},{}],"/Users/shaofengliu/IT/git/jcreact/src/Switch.js":[function(_dereq_,module,exports){
'use strict';
var Nav = Nav || _dereq_('./Nav'),
    NavItem = NavItem || _dereq_('./NavItem'); 

//实现Tab, Accord, Pane, Slide
/*
 * <Switch type="tab">
 *   <pane title="tabTitle1">tab Content1</pane>
 *   <pane title="tabTitle2">tab Content2</pane>
 * </Switch>
 * tab菜单标签内部实现
 * <Nav><NavItem/><NavItem/></Nav>
 */

var Switch = React.createClass({displayName: "Switch",
    //设置默认属性
    getDefaultProps: function(){
        return{
            type: 'pane',   //还可以是Accord, PaneGroup, Slide @todo,
            play: 'false'  //是否自动切换 
        }
    },
    //propTypes验证实体属性类型
    propTypes: {
        type: React.PropTypes.string.isRequired && React.PropTypes.oneOf(['pane','tab','accrod','slide']),
        play: React.PropTypes.bool,
        position: React.PropTypes.oneOf(['lt', 'lb', 'rt', 'rb']),
        onSelect: React.PropTypes.func,
        // customProp: function(props, propName, ComponentName){

        // }
    },
    //设置初始状态
    getInitialState: function(){
      return {
        activeKey: 0
      }
    },

    // 切换时改变状态
    changeState: function(key, disabled, event){
        event.preventDefault();
        var activeKey = this.state.activeKey;

        if (disabled) {
          return;
        }

        if (this.props.onSelect) {
          this.props.onSelect(key);
        }

        if (activeKey !== key) {
          this.setState({
            activeKey: key
          });
        }
        // React.findDOMNode(this.refs[tabindex+index])
    },

    render: function(){
        var cx = React.addons.classSet;
        var classes = cx({
            'am-tabs': (this.props.type==='tab'),     //水平导航
            'am-slider am-slider-default am-slider-slide': (this.props.type==='slide'),
        });

        var that = this;
        var results = this.props.children;
        var activeKey = this.state.activeKey;

        console.log(activeKey, 'activeKey');
        switch(this.props.type){
            case 'pane':
                return React.createElement("div", null, results);
                break;
            case 'tab':
             return React.createElement("div", {className: classes}, 
                        React.createElement(Nav, {type: "tabs"}, 
                        results.map(function(result, key){
                            return React.createElement(NavItem, {onClick: that.changeState.bind(this, key, result.props.disabled), 
                                            href: result.props.href, 
                                            ref: 'ref'+key, 
                                            active: key === activeKey
                                   }, 
                                            result.props.title
                                    )
                        })), 
                           React.createElement("div", {className: "am-tabs-bd"}, 
                              results.map(function(result, key){
                                var cls = (key === activeKey) ? "am-active" : "";
                                console.log(cls, 'cls');
                                return React.createElement("div", {className: "am-tab-panel " + cls}, result.props.children)
                            })
                       )
                    );
                 break;
            case 'slide':              
                return React.createElement("div", {className: classes}, 
                            React.createElement("div", {className: "am-viewport"}, 
                                React.createElement(Nav, {type: "slide"}, 
                                    results.map(function(result, key){
                                        return React.createElement("li", {className: key === activeKey ? 'active' : ''}, result.props.children, 
                                                React.createElement("div", {className: "am-slider-desc"}, result.props.title)
                                            )
                                    })
                                )
                            ), 
                            React.createElement("ol", {className: "am-control-nav am-control-paging"}, 
                                results.map(function(result, key){
                                    return React.createElement(NavItem, {onClick: that.changeState.bind(this, key, result.props.disabled), 
                                            href: result.props.href, 
                                            ref: 'ref'+key, 
                                            active: key === activeKey
                                   }, 
                                            key
                                    )
                                })
                            )
                        )
        }

    }
});

module.exports = Switch;

},{"./Nav":"/Users/shaofengliu/IT/git/jcreact/src/Nav.js","./NavItem":"/Users/shaofengliu/IT/git/jcreact/src/NavItem.js"}],"/Users/shaofengliu/IT/git/jcreact/src/jcreact.js":[function(_dereq_,module,exports){
'use strict';
// var React = require('react');
// if (!React) {
//   throw new Error('AMUIReact requires React.');
// }
module.exports = {
    VERSION: '__VERSION__',
    Nav: _dereq_('./Nav'),
    Button: _dereq_('./Button'),
    Switch: _dereq_('./Switch'),
    Layout: _dereq_('./Layout'),
    Grid: _dereq_('./Grid'),

    NavItem: _dereq_('./NavItem'),
    Pane: _dereq_('./Pane')

};

},{"./Button":"/Users/shaofengliu/IT/git/jcreact/src/Button.js","./Grid":"/Users/shaofengliu/IT/git/jcreact/src/Grid.js","./Layout":"/Users/shaofengliu/IT/git/jcreact/src/Layout.js","./Nav":"/Users/shaofengliu/IT/git/jcreact/src/Nav.js","./NavItem":"/Users/shaofengliu/IT/git/jcreact/src/NavItem.js","./Pane":"/Users/shaofengliu/IT/git/jcreact/src/Pane.js","./Switch":"/Users/shaofengliu/IT/git/jcreact/src/Switch.js"}]},{},["/Users/shaofengliu/IT/git/jcreact/src/jcreact.js"])("/Users/shaofengliu/IT/git/jcreact/src/jcreact.js")
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQnV0dG9uLmpzIiwic3JjL0dyaWQuanMiLCJzcmMvTGF5b3V0LmpzIiwiL1VzZXJzL3NoYW9mZW5nbGl1L0lUL2dpdC9qY3JlYWN0L3NyYy9OYXYuanMiLCIvVXNlcnMvc2hhb2ZlbmdsaXUvSVQvZ2l0L2pjcmVhY3Qvc3JjL05hdkl0ZW0uanMiLCIvVXNlcnMvc2hhb2ZlbmdsaXUvSVQvZ2l0L2pjcmVhY3Qvc3JjL1BhbmUuanMiLCIvVXNlcnMvc2hhb2ZlbmdsaXUvSVQvZ2l0L2pjcmVhY3Qvc3JjL1N3aXRjaC5qcyIsIi9Vc2Vycy9zaGFvZmVuZ2xpdS9JVC9naXQvamNyZWFjdC9zcmMvamNyZWFjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUNEQTtBQUNBO0FDREE7QUFDQTtBQ0RBLFlBQVksQ0FBQztBQUNiLElBQUkseUJBQXlCLG1CQUFBO0lBQ3pCLGVBQWUsRUFBRSxVQUFVO1FBQ3ZCLE9BQU87WUFDSCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBRSxLQUFLO1NBQ2Q7S0FDSjtJQUNELFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztLQUNqRjtJQUNELE1BQU0sRUFBRSxVQUFVO1NBQ2IsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7VUFDOUIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2YscUJBQXFCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1lBQ2xELG9CQUFvQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FB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TyxDQUFDO0lBQ3JCLE1BQU0sRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQzNCLE1BQU0sRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQzNCLE1BQU0sRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQy9CLElBQUksSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUM7O0lBRXZCLE9BQU8sRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDO0FBQ2pDLElBQUksSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUM7O0NBRTFCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pTDFWelpYSnpMM05vWVc5bVpXNW5iR2wxTDBsVUwyZHBkQzlxWTNKbFlXTjBMM055WXk5Q2RYUjBiMjR1YW5NaUxDSnpiM1Z5WTJWeklqcGJJaTlWYzJWeWN5OXphR0Z2Wm1WdVoyeHBkUzlKVkM5bmFYUXZhbU55WldGamRDOXpjbU12UW5WMGRHOXVMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJaVhYMD0iLCJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaUwxVnpaWEp6TDNOb1lXOW1aVzVuYkdsMUwwbFVMMmRwZEM5cVkzSmxZV04wTDNOeVl5OUhjbWxrTG1weklpd2ljMjkxY21ObGN5STZXeUl2VlhObGNuTXZjMmhoYjJabGJtZHNhWFV2U1ZRdloybDBMMnBqY21WaFkzUXZjM0pqTDBkeWFXUXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJaUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWlKZGZRPT0iLCJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaUwxVnpaWEp6TDNOb1lXOW1aVzVuYkdsMUwwbFVMMmRwZEM5cVkzSmxZV04wTDNOeVl5OU1ZWGx2ZFhRdWFuTWlMQ0p6YjNWeVkyVnpJanBiSWk5VmMyVnljeTl6YUdGdlptVnVaMnhwZFM5SlZDOW5hWFF2YW1OeVpXRmpkQzl6Y21NdlRHRjViM1YwTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SWlYWDA9IiwiJ3VzZSBzdHJpY3QnO1xudmFyIE5hdiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgdHlwZTogJ3RhYidcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3RhYicsICd0b3AnLCAnc2lkZScsICdjb3B5cmlnaHQnLCAnYnJlYWRjcnVtYiddKVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAgICAgICAgdmFyIGN4ID0gUmVhY3QuYWRkb25zLmNsYXNzU2V0O1xuICAgICAgICAgIHZhciBjbGFzc2VzID0gY3goe1xuICAgICAgICAgICAgJ2FtLW5hdiBhbS1uYXYtcGlsbHMnOiAodGhpcy5wcm9wcy50eXBlPT09J3BpbGxzJyksICAgICAvL+awtOW5s+WvvOiIqlxuICAgICAgICAgICAgJ2FtLW5hdiBhbS1uYXYtdGFicyc6ICh0aGlzLnByb3BzLnR5cGU9PT0ndGFicycpLCAgICAgICAvL3RhYuWvvOiIqlxuICAgICAgICAgICAgJ2FtLW5hdic6ICh0aGlzLnByb3BzLnR5cGU9PT0nc2lkZScpLCAgICAgICAgICAgICAgICAgICAvL+S+p+i+ueWvvOiIqlxuICAgICAgICAgICAgJ2FtLW5hdi1qdXN0aWZ5JzogdGhpcy5wcm9wcy5qdXN0aWZ5ICwgICAgICAgICAgICAgICAgICAvL+WuveW6puWPqumAguW6lFxuICAgICAgICAgICAgJ2FtLWJyZWFkY3J1bWInOiAodGhpcy5wcm9wcy50eXBlPT09J2JyZWFkY3J1bWInKSxcbiAgICAgICAgICAgICdhbS1icmVhZGNydW1iLXNsYXNoJzogdGhpcy5wcm9wcy5zbGFzaD09PSd0cnVlJywgICAgICAgLy/luKYv55qE5YiG6ZqUXG4gICAgICAgICAgICAnYW0tbGlzdCc6ICh0aGlzLnByb3BzLnR5cGUgPT09ICdsaXN0JyksICAgICAgICAgICAgICAgIC8v5YiX6KGoXG4gICAgICAgICAgICAnYW0tcGFnaW5hdGlvbic6ICh0aGlzLnByb3BzLnR5cGU9PT0ncGFnaW5hdGlvbicpLFxuICAgICAgICAgICAgJ2FtLXNsaWRlcyc6ICh0aGlzLnByb3BzLnR5cGU9PT0nc2xpZGUnKVxuICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gPHVsIGNsYXNzTmFtZT17Y2xhc3Nlc30+e3RoaXMucHJvcHMuY2hpbGRyZW59PC91bD47XG4gICAgfSAgICBcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5hdjsiLCIndXNlIHN0cmljdCc7XG52YXIgTmF2SXRlbSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBhY3RpdmU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBkaXNhYmxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIC8vIGRpdmlkZXI6IFJlYWN0LnByb3BUeXBlcy5ib29sLFxuICAgICAgICBocmVmOiBSZWFjdC5Qcm9wVHlwZXMuYW55XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGN4ID0gUmVhY3QuYWRkb25zLmNsYXNzU2V0O1xuICAgICAgICAgIHZhciBjbGFzc2VzID0gY3goe1xuICAgICAgICAgICAgJ2FtLWRpc2FibGVkJzogdGhpcy5wcm9wcy5kaXNhYmxlZCxcbiAgICAgICAgICAgICdhbS1hY3RpdmUnOiB0aGlzLnByb3BzLmFjdGl2ZSxcbiAgICAgICAgICAgICdhbS1uYXYtaGVhZGVyJzogdGhpcy5wcm9wcy5oZWFkZXIsXG4gICAgICAgICAgICAnYW0tZGl2aWRlciBhbS1uYXYtZGl2aWRlcic6IHRoaXMucHJvcHMuZGl2aWRlcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIDxsaSBjbGFzc05hbWU9e2NsYXNzZXN9PjxhIHsuLi50aGlzLnByb3BzfSA+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9hPjwvbGk+O1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5hdkl0ZW07XG4iLCJ2YXIgUGFuZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAvL+iuvue9rum7mOiupOWxnuaAp1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJue1xuICAgICAgICAgICAgY29sb3I6ICdkZWZhdWx0JywgICAvL3dhcm5pbmcgc3VjY2VzcyBlcnJvciBpbmZvXG4gICAgICAgICAgICBjb2xsYXBzZTogdHJ1ZSAgICAgIC8v5piv5ZCm5Y+v5Lul5pS257ypXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vcHJvcFR5cGVz6aqM6K+B5a6e5L2T5bGe5oCn57G75Z6LXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbG9yOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICAgIGNvbGxhcHNlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXG4gICAgfSxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb2xsYXBzZVN0YXRlOiB0cnVlICAgIC8v5bGV5byA5oCBXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyDliIfmjaLml7bmlLnlj5jnirbmgIFcbiAgICBjaGFuZ2VTdGF0ZTogZnVuY3Rpb24oY29sbGFwc2Upe1xuICAgICAgaWYoIWNvbGxhcHNlKSByZXR1cm47XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29sbGFwc2VTdGF0ZTogIXRoaXMuc3RhdGUuY29sbGFwc2VTdGF0ZVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgY2xzID0gIHRoaXMucHJvcHMuY29sbGFwc2UgPyBcImFtLXBhbmVsLWNvbGxhcHNlIGFtLWNvbGxhcHNlIFwiIDogXCIgXCI7XG4gICAgICAgIHZhciBjbHNiZCA9IHRoaXMuc3RhdGUuY29sbGFwc2VTdGF0ZSA/IFwiYW0taW5cIiA6IFwiIFwiO1xuXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17XCJhbS1wYW5lbCBhbS1wYW5lbC1cIit0aGlzLnByb3BzLmNvbG9yfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFtLXBhbmVsLWhkXCIgb25DbGljaz17dGhpcy5jaGFuZ2VTdGF0ZS5iaW5kKHRoaXMucHJvcHMuY29sbGFwc2UpfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMudGl0bGV9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NscyArIGNsc2JkfT5cbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbS1wYW5lbC1iZFwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGFuZTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBOYXYgPSBOYXYgfHwgcmVxdWlyZSgnLi9OYXYnKSxcbiAgICBOYXZJdGVtID0gTmF2SXRlbSB8fCByZXF1aXJlKCcuL05hdkl0ZW0nKTsgXG5cbi8v5a6e546wVGFiLCBBY2NvcmQsIFBhbmUsIFNsaWRlXG4vKlxuICogPFN3aXRjaCB0eXBlPVwidGFiXCI+XG4gKiAgIDxwYW5lIHRpdGxlPVwidGFiVGl0bGUxXCI+dGFiIENvbnRlbnQxPC9wYW5lPlxuICogICA8cGFuZSB0aXRsZT1cInRhYlRpdGxlMlwiPnRhYiBDb250ZW50MjwvcGFuZT5cbiAqIDwvU3dpdGNoPlxuICogdGFi6I+c5Y2V5qCH562+5YaF6YOo5a6e546wXG4gKiA8TmF2PjxOYXZJdGVtLz48TmF2SXRlbS8+PC9OYXY+XG4gKi9cblxudmFyIFN3aXRjaCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAvL+iuvue9rum7mOiupOWxnuaAp1xuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJue1xuICAgICAgICAgICAgdHlwZTogJ3BhbmUnLCAgIC8v6L+Y5Y+v5Lul5pivQWNjb3JkLCBQYW5lR3JvdXAsIFNsaWRlIEB0b2RvLFxuICAgICAgICAgICAgcGxheTogJ2ZhbHNlJyAgLy/mmK/lkKboh6rliqjliIfmjaIgXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vcHJvcFR5cGVz6aqM6K+B5a6e5L2T5bGe5oCn57G75Z6LXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCAmJiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWydwYW5lJywndGFiJywnYWNjcm9kJywnc2xpZGUnXSksXG4gICAgICAgIHBsYXk6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICBwb3NpdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnbHQnLCAnbGInLCAncnQnLCAncmInXSksXG4gICAgICAgIG9uU2VsZWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgLy8gY3VzdG9tUHJvcDogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBDb21wb25lbnROYW1lKXtcblxuICAgICAgICAvLyB9XG4gICAgfSxcbiAgICAvL+iuvue9ruWIneWni+eKtuaAgVxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjdGl2ZUtleTogMFxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyDliIfmjaLml7bmlLnlj5jnirbmgIFcbiAgICBjaGFuZ2VTdGF0ZTogZnVuY3Rpb24oa2V5LCBkaXNhYmxlZCwgZXZlbnQpe1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgYWN0aXZlS2V5ID0gdGhpcy5zdGF0ZS5hY3RpdmVLZXk7XG5cbiAgICAgICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3QpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWN0aXZlS2V5ICE9PSBrZXkpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZUtleToga2V5XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVhY3QuZmluZERPTU5vZGUodGhpcy5yZWZzW3RhYmluZGV4K2luZGV4XSlcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgY3ggPSBSZWFjdC5hZGRvbnMuY2xhc3NTZXQ7XG4gICAgICAgIHZhciBjbGFzc2VzID0gY3goe1xuICAgICAgICAgICAgJ2FtLXRhYnMnOiAodGhpcy5wcm9wcy50eXBlPT09J3RhYicpLCAgICAgLy/msLTlubPlr7zoiKpcbiAgICAgICAgICAgICdhbS1zbGlkZXIgYW0tc2xpZGVyLWRlZmF1bHQgYW0tc2xpZGVyLXNsaWRlJzogKHRoaXMucHJvcHMudHlwZT09PSdzbGlkZScpLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHZhciByZXN1bHRzID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICAgICAgdmFyIGFjdGl2ZUtleSA9IHRoaXMuc3RhdGUuYWN0aXZlS2V5O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGFjdGl2ZUtleSwgJ2FjdGl2ZUtleScpO1xuICAgICAgICBzd2l0Y2godGhpcy5wcm9wcy50eXBlKXtcbiAgICAgICAgICAgIGNhc2UgJ3BhbmUnOlxuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2PntyZXN1bHRzfTwvZGl2PjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RhYic6XG4gICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxOYXYgdHlwZT1cInRhYnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyZXN1bHRzLm1hcChmdW5jdGlvbihyZXN1bHQsIGtleSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxOYXZJdGVtIG9uQ2xpY2s9e3RoYXQuY2hhbmdlU3RhdGUuYmluZCh0aGlzLCBrZXksIHJlc3VsdC5wcm9wcy5kaXNhYmxlZCl9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPXtyZXN1bHQucHJvcHMuaHJlZn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXsncmVmJytrZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZT17a2V5ID09PSBhY3RpdmVLZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jlc3VsdC5wcm9wcy50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfTwvTmF2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbS10YWJzLWJkXCI+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jlc3VsdHMubWFwKGZ1bmN0aW9uKHJlc3VsdCwga2V5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNscyA9IChrZXkgPT09IGFjdGl2ZUtleSkgPyBcImFtLWFjdGl2ZVwiIDogXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY2xzLCAnY2xzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17XCJhbS10YWItcGFuZWwgXCIgKyBjbHN9PntyZXN1bHQucHJvcHMuY2hpbGRyZW59PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9ICBcbiAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PjtcbiAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzbGlkZSc6ICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW0tdmlld3BvcnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdiB0eXBlPVwic2xpZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZXN1bHRzLm1hcChmdW5jdGlvbihyZXN1bHQsIGtleSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBjbGFzc05hbWU9e2tleSA9PT0gYWN0aXZlS2V5ID8gJ2FjdGl2ZScgOiAnJ30+e3Jlc3VsdC5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW0tc2xpZGVyLWRlc2NcIj57cmVzdWx0LnByb3BzLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvbCBjbGFzc05hbWU9XCJhbS1jb250cm9sLW5hdiBhbS1jb250cm9sLXBhZ2luZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVzdWx0cy5tYXAoZnVuY3Rpb24ocmVzdWx0LCBrZXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxOYXZJdGVtIG9uQ2xpY2s9e3RoYXQuY2hhbmdlU3RhdGUuYmluZCh0aGlzLCBrZXksIHJlc3VsdC5wcm9wcy5kaXNhYmxlZCl9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPXtyZXN1bHQucHJvcHMuaHJlZn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXsncmVmJytrZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZT17a2V5ID09PSBhY3RpdmVLZXl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2tleX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9XG5cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTd2l0Y2g7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gdmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbi8vIGlmICghUmVhY3QpIHtcbi8vICAgdGhyb3cgbmV3IEVycm9yKCdBTVVJUmVhY3QgcmVxdWlyZXMgUmVhY3QuJyk7XG4vLyB9XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBWRVJTSU9OOiAnX19WRVJTSU9OX18nLFxuICAgIE5hdjogcmVxdWlyZSgnLi9OYXYnKSxcbiAgICBCdXR0b246IHJlcXVpcmUoJy4vQnV0dG9uJyksXG4gICAgU3dpdGNoOiByZXF1aXJlKCcuL1N3aXRjaCcpLFxuICAgIExheW91dDogcmVxdWlyZSgnLi9MYXlvdXQnKSxcbiAgICBHcmlkOiByZXF1aXJlKCcuL0dyaWQnKSxcblxuICAgIE5hdkl0ZW06IHJlcXVpcmUoJy4vTmF2SXRlbScpLFxuICAgIFBhbmU6IHJlcXVpcmUoJy4vUGFuZScpXG5cbn07Il19
