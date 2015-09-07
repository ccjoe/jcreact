'use strict';

var Switch = jcreact.Switch,
    Pane = jcreact.Pane; 

var SetSwitch = React.createClass({
    render: function(){
        return <div>
            <Pane title="test1" color="warning"  collapse="true">test1Content</Pane>
            <Switch type="pane"><Pane title="test1">test1Content</Pane><Pane title="test2">test2Content</Pane></Switch>
            <Switch type="tab"><Pane title="test1">test1Content</Pane><Pane title="test2">test2Content</Pane></Switch>
            <Switch type="slide">
                <Pane title="test1">
                    <img src="../imgs/test.jpg"/>
                </Pane>
                <Pane title="test2">
                    <img src="../imgs/test2.jpg"/>
                </Pane>
            </Switch>
        </div>
    }
});

module.exports = SetSwitch;