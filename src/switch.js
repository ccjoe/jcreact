'use strict';
var Nav = Nav || require('./Nav'),
    NavItem = NavItem || require('./NavItem'); 

//实现Tab, Accord, Pane, Slide
/*
 * <Switch type="tab">
 *   <pane title="tabTitle1">tab Content1</pane>
 *   <pane title="tabTitle2">tab Content2</pane>
 * </Switch>
 * tab菜单标签内部实现
 * <Nav><NavItem/><NavItem/></Nav>
 */

var Switch = React.createClass({
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
                return <div>{results}</div>;
                break;
            case 'tab':
             return <div className={classes}>
                        <Nav type="tabs">
                        {results.map(function(result, key){
                            return <NavItem onClick={that.changeState.bind(this, key, result.props.disabled)} 
                                            href={result.props.href}
                                            ref={'ref'+key}
                                            active={key === activeKey}
                                   >
                                            {result.props.title}
                                    </NavItem>
                        })}</Nav>
                           <div className="am-tabs-bd"> 
                              {results.map(function(result, key){
                                var cls = (key === activeKey) ? "am-active" : "";
                                console.log(cls, 'cls');
                                return <div className={"am-tab-panel " + cls}>{result.props.children}</div>
                            })}  
                       </div>
                    </div>;
                 break;
            case 'slide':              
                return <div className={classes}>
                            <div className="am-viewport">
                                <Nav type="slide">
                                    {results.map(function(result, key){
                                        return <li className={key === activeKey ? 'active' : ''}>{result.props.children}
                                                <div className="am-slider-desc">{result.props.title}</div>
                                            </li>
                                    })}
                                </Nav>
                            </div>
                            <ol className="am-control-nav am-control-paging">
                                {results.map(function(result, key){
                                    return <NavItem onClick={that.changeState.bind(this, key, result.props.disabled)} 
                                            href={result.props.href}
                                            ref={'ref'+key}
                                            active={key === activeKey}
                                   >
                                            {key}
                                    </NavItem>
                                })}
                            </ol>
                        </div>
        }

    }
});

module.exports = Switch;