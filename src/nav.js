'use strict';
var Nav = React.createClass({
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
        return <ul className={classes}>{this.props.children}</ul>;
    }    
});

module.exports = Nav;