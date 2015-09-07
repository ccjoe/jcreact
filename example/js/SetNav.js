'use strict';
//CommonJs 方式
// var J = require('../../src/Jcreact'),
//     Nav = J.Nav,
//     NavItem = J.NavItem,
//     Switch = J.Switch,
//     Pane = J.Pane; //全局方式

// 全局方式
var Nav = JcReact.Nav,
    NavItem = JcReact.NavItem;
var SetNav = React.createClass({
    render: function(){
        return <div>
            <Nav type="tabs"> 
                <NavItem href="/test.html" title="test it" active>abc</NavItem>
                <NavItem href="/test2.html" title="test it">abc123</NavItem>
                <NavItem href="/test3.html" title="test it2" disabled>abc123</NavItem>
            </Nav>
            <Nav type="pills" justify="true">
                <NavItem href="/test.html" title="test it" active>abc</NavItem>
                <NavItem href="/test2.html" title="test it" >abc123</NavItem>
                <NavItem href="/test3.html" title="test it2" disabled>abc123</NavItem>
            </Nav>
            <Nav type="side">
                <NavItem href="/test.html" header="true" active title="test it">abc</NavItem>
                <NavItem href="/test2.html" title="test it" >abc123</NavItem>
                <NavItem divider />
                <NavItem href="/test3.html" title="test it2" disabled>abc123</NavItem>
            </Nav>
            <Nav type="breadcrumb">
                <NavItem href="/test.html" title="test it"  disabled>abc</NavItem>
                <NavItem href="/test2.html" title="test it" >abc123</NavItem>
                <NavItem href="/test3.html" title="test it2" >abc123</NavItem>
            </Nav>
            <Nav type="list">
                <NavItem href="/test.html" title="test it" disabled>每个人都有一个死角， 自己走不出来，别人也闯不进去。</NavItem>
                <NavItem href="/test2.html" title="test it">我把最深沉的秘密放在那里。</NavItem>
                <NavItem href="/test3.html" title="test it2">你不懂我，我不怪你.</NavItem>
            </Nav>
            <Nav type="pagination">
                <NavItem disabled href="#">&laquo;</NavItem>
                <NavItem active>1</NavItem>
                <NavItem href="#">2</NavItem>
                <NavItem href="#">3</NavItem>
                <NavItem href="#">4</NavItem>
                <NavItem href="#">5</NavItem>
                <NavItem href="#">&raquo;</NavItem>
            </Nav>
        </div>
    }
});

module.exports = SetNav;