'use strict';
var NavItem = React.createClass({
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
        return <li className={classes}><a {...this.props} >{this.props.children}</a></li>;
    }
});

module.exports = NavItem;
