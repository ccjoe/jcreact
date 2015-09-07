var Pane = React.createClass({
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

        return <div className={"am-panel am-panel-"+this.props.color}>
                <div className="am-panel-hd" onClick={this.changeState.bind(this.props.collapse)}>
                    {this.props.title}
                </div>
                <div className={cls + clsbd}>
                 <div className="am-panel-bd">{this.props.children}</div>
                </div>
            </div>
    }
});

module.exports = Pane;
