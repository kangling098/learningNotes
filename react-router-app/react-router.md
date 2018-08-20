1. React路由
不同的路径渲染不同的组件
有两种实现方式
HashRouter:利用hash实现路由切换
BrowserRouter:实现h5 Api实现路由的切换
1.1 hash
    <a href="#/a">去a</a>
    <a href="#/b">去b</a>
    <script>
      window.addEventListener('hashchange',()=>{
          console.log(window.location.hash);
      });
    </script>
1.2 history
history对象提供了操作浏览器会话历史的接口。
history对象持续追踪着一组location
除了一组location外，history也保存一个索引值，用来指向当前所对应的location
history
History
onpopstate
2.跑通路由
2.1 index.js
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route} from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
ReactDOM.render(
    <Router>
        <div>
          <Route path="/" component={Home} />
          <Route path="/user" component={User} />
          <Route path="/profile" component={Profile}/>
        </div>
    </Router>
,document.getElementById('root'));
2.2 Home.js
components/Home.js

import React,{Component} from 'react';
export default class Home extends Component{
    render() {
        return (
            <div>Home</div>
        )
    }
}
2.3 Profile.js
components/Profile.js

import React,{Component} from 'react';
export default class Profile extends Component{
    render() {
        return (
            <div>Profile</div>
        )
    }
}
2.4 User.js
components/User.js

import React,{Component} from 'react';
export default class User extends Component{
    render() {
        return (
            <div>User</div>
        )
    }
}
2.5 this.props
http://localhost:3000/#/user?name=zfpx#top

{
    "match": {
        "path": "/user/:id",   //匹配路径
        "url": "/user/1",      //地址栏中的url
        "isExact": true,       //是否精确匹配
        "params": {"id": "1"}  // 路径参数对象
    },
    "location": {
        "pathname": "/user/1",  //路径名
        "search": "?name=zfpx", //查询字符串
        "hash": "#top"          //hash值
        "state":undefined
    },
    "history": {
        "length": 6,            //历史长度
        "action": "POP",        //动作
        "location": {           //当前应用所处的位置
            "pathname": "/user/1",
            "search": "?name=zfpx",
            "hash": "#top",
            "state":undefined  //location可以拥有与之相关的状态。这是一些固定的数据，并且不存在于URL之中
        },
        "go":f go(n),//是一个强大的方法，并包含了goForward与goBack的功能。传入负数则退后，传入正数则向前
        "goBack":f goBack(),//返回一层页面。实际上是将history的索引值减1
        "goForward":f goForward(),//与goBack相对。向前一层页面
        "listen":f listen(listener),//采用观察者模式，在location改变时，history会发出通知
        "push":f push(path,state),//方法使能你跳转到新的location
        "replace":f replace(path,state)//replace方法与push相似，但它并非添加location，而是替换当前索引上的位置,重定向时要使用replace,
        "createHref":f createHref(location)
    }
}
2.6 createHref
const location = {
  pathname: '/user',
  search: '?id=1',
  hash: '#bottom'
}
const url = history.createHref(location)
const link = document.createElement('a')
a.href = url
// <a href='/user?id=1#bottom'></a>
3.实现基本路由
react-router
3.1 index.js
src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route} from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
ReactDOM.render(
    <Router>
        <div>
          <Route path="/" component={Home} />
            <Route path="/user" component={User} />
          <Route path="/profile" component={Profile}/>
        </div>
    </Router>
,document.getElementById('root'));
3.2 index.js
src/react-router-dom/index.js

import HashRouter from './HashRouter';
import Route from './Route';

export {
    HashRouter,
    Route
}
3.3 context.js
src/react-router-dom/context.js

import React from 'react';
// React16.3
let {Provider,Consumer}=React.createContext();
export {Provider,Consumer};
3.4 HashRouter.js
src/react-router-dom/HashRouter.js

import React,{Component} from 'react';
import {Provider} from './context';
export default class HashRouter extends Component{
    state={
        location: {
            pathname:window.location.hash?window.location.hash.slice(1):'/'
        }
    }
    componentDidMount() {
        //默认hash没有的时候跳转到/
        window.location.hash=window.location.hash||'/';
        //监听hash值变化
        window.addEventListener('hashchange',() => {
            this.setState({
                location: {
                ...this.state.location,
                pathname:window.location.hash?window.location.hash.slice(1):'/'
            }});
        });
    }
    render() {
        let value={
            location:this.state.location
        }
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
}
3.5 Route.js
src/react-router-dom/Route.js

import React,{Component} from 'react';
import {Consumer} from './context';
export default class Route extends Component{
    render() {
        let {path,component: Component}=this.props;
        return (
            <Consumer>
                {
                    value => {
                        let {pathname}=value.location;
                        if (path == pathname) {
                            return <Component/>
                        } else {
                            return null;
                        }
                    }
                }
            </Consumer>
        )
    }
}
4. path-to-regexp
把一个路径转换成正则表达式

path-to-regexp
regexper

不需要结束

需要结束
有路径参数
let pathToRegexp=require('path-to-regexp');
//let regex=pathToRegexp('/user',[],{end: true});// /^\/user(?:\/)?$/i
//let regex=pathToRegexp('/user',[],{end: false});// //^\/user(?:\/(?=$))?(?=\/|$)/i
let keys=[];
let regex=pathToRegexp('/user/:id',keys,{end: false});///^\/user\/([^\/]+?)(?:\/(?=$))?(?=\/|$)/i
// (?:) 是 不想被捕获的时候使用
// (?=pattern) 零宽正向先行断言(zero-width positive lookahead assertion) 
console.log(regex);
console.log(keys);
//console.log(regex.test('/user'));   //true
//console.log(regex.test('/user/1')); //true
console.log(regex.test('/user/1')); //true
5. 正则匹配路径
5.1 Route.js
src/react-router-dom/Route.js

import React,{Component} from 'react';
import {Consumer} from './context';
import pathToRegexp from 'path-to-regexp';
export default class Route extends Component{
    render() {
        let {path,component: Component}=this.props;
        let regexp=pathToRegexp(path,[],{end:false});
        return (
            <Consumer>
                {
                    value => {
                        let {pathname}=value.location;
                        if (regexp.test(pathname)) {
                            return <Component/>
                        } else {
                            return null;
                        }
                    }
                }
            </Consumer>
        )
    }
}
6.exact 精确匹配
6.1 index.js
src/index.js

ReactDOM.render(
    <Router>
        <div>
+            <Route exact={true} path="/" component={Home} />
            <Route path="/user" component={User} />
          <Route path="/profile" component={Profile}/>
        </div>
    </Router>
,document.getElementById('root'));
6.2 Route.js
src/react-router-dom/Route.js

export default class Route extends Component{
    render() {
+        let {path,component: Component,exact=false}=this.props;
+        let regexp=pathToRegexp(path,[],{end:exact});
        return (
            <Consumer>
                {
                    value => {
                        let {pathname}=value.location;
                        if (regexp.test(pathname)) {
                            return <Component/>
                        } else {
                            return null;
                        }
                    }
                }
            </Consumer>
        )
    }
}
7. Link
7.1 Link.js
src/react-router-dom/Link.js

import React,{Component} from 'react';
import {Consumer} from './context';
export default class Link extends Component{
    render() {
        return (
            <Consumer>
                {
                    value => {
                        let {history: {push}}=value;
                        return (
                            <a onClick={()=>push(this.props.to)}>{this.props.children}</a>
                        )
                    }
                }
            </Consumer>
        )
    }
}
7.2 index.js
src/index.js

import 'bootstrap/dist/css/bootstrap.css'
ReactDOM.render(
    <Router>
        <div>
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" >学生管理系统</a>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/user">User</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <Route exact={true} path="/" component={Home} />
                <Route path="/user" component={User} />
                <Route path="/profile" component={Profile}/>
            </div>
        </div>
    </Router>
,document.getElementById('root'));
7.3 HashRouter.js
src/react-router-dom/HashRouter.js

    render() {
        let value={
            location: this.state.location,
            history: {
                push(to) {
                    window.location.hash=to;
                }
            }
        }
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
8.Redirect&Switch
8.1 index.js
src/index.js

<div className="container">
                <Switch>
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/user" component={User} />
                    <Route path="/profile" component={Profile} />
                    <Redirect to="/"/>
                </Switch>
            </div>
8.2 Redirect.js
src/react-router-dom/Redirect.js

import React,{Component} from 'react';
import {Consumer} from './context';
export default class Redirect extends Component{
    render() {
        return (
            <Consumer>
                {
                    value => {
                        value.history.push(this.props.to);
                        return null;
                    }
                }
            </Consumer>
        )
    }
}
8.3 Switch.js
src/react-router-dom/Switch.js

import React,{Component} from 'react';
import {Consumer} from './context';
import pathToRegexp from 'path-to-regexp';
export default class Switch extends Component{
    render() {
        return (
            <Consumer>
                {
                    value => {
                        let {location: {pathname}}=value;
                        let children=this.props.children;
                        for (let i=0;i<children.length;i++){
                            let child=children[i];
                            let {path="/",exact=false}=child.props;
                            let regexp=pathToRegexp(path,[],{end: exact});
                            if (regexp.test(pathname)) {
                                return child;
                            }
                        }
                        return null;
                    }
                }
            </Consumer>
        )
    }
}
9.页面跳转
9.1 User.js
src/components/User.js

 <Switch>
    <Route path="/user/add" component={UserAdd} />
    <Route path="/user/list" component={UserList} />
    <Route path="/user/detail/:id" component={UserDetail}/>
</Switch>
9.2 HashRouter.js
src/react-router-dom/HashRouter.js

    render() {
        let value={
            location: this.state.location,
            history: {
                push(to) {
                    window.location.hash=to;
                }
            }
        }
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
9.3 Route.js
src/react-router-dom/Route.js

import React,{Component} from 'react';
import {Consumer} from './context';
import pathToRegexp from 'path-to-regexp';
export default class Route extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        let {path,component: Component,exact=false}=this.props;
        return (
            <Consumer>
                {
                    value => {
                        let {pathname}=value.location;
                        let keys=[];
                        let regexp=pathToRegexp(path,keys,{end: exact});
                        keys = keys.map(item=>item.name)
                        let result=pathname.match(regexp);
                        if (result) {
                            let [,...values]=result;
                            let match={
                                params: keys.reduce((params,key,idx) => {
                                    params[key]=values[idx];
                                    return params;
                                },{}),
                                path,
                                url: pathname
                            };

                            let props={
                                location: value.location,
                                history: value.history,
                                match
                            }
                            return <Component {...props}/>
                        } else {
                            return null;
                        }
                    }
                }
            </Consumer>
        )
    }
}
9.4 Switch.js
src/react-router-dom/Switch.js

import React,{Component} from 'react';
import {Consumer} from './context';
import pathToRegexp from 'path-to-regexp';
export default class Switch extends Component{
    render() {
        return (
            <Consumer>
                {
                    value => {
                        let {location: {pathname}}=value;
                        let children=this.props.children;
                        for (let i=0;i<children.length;i++){
                            let child=children[i];
                            let {path="/",exact=false}=child.props;
                            let regexp=pathToRegexp(path,[],{end: exact});
                            if (regexp.test(pathname)) {
                                return child;
                            }
                        }
                        return null;
                    }
                }
            </Consumer>
        )
    }
}
9.5 UserAdd.js
src/components/UserAdd.js

import React,{Component} from 'react';
export default class UserAdd extends Component{
    handleSubmit=(event) => {
        event.preventDefault();
        let username=this.username.value;
        let email=this.email.value;
        let user={username,email};
        let usersStr=localStorage.getItem('users');
        let users=usersStr? JSON.parse(usersStr):[];
        user.id = users.length>0? users[users.length-1].id+1:1;
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users));
        this.props.history.push('/user/list');
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">用户名</label>
                            <input type="text" className="form-control" ref={input=>this.username = input}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">邮箱 </label>
                            <input type="email" className="form-control" ref={input=>this.email = input}/>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
9.6 UserDetail.js
src/components/UserDetail.js

import React,{Component} from 'react';
export default class UserList extends Component{
    state={
        user: {}
    }
    componentDidMount() {
        let usersStr=localStorage.getItem('users');
        let users=usersStr? JSON.parse(usersStr):[];
        let user = users.find(user => user.id==this.props.match.params.id);
        this.setState({user});
    }    
    render() {
        let {user}=this.state;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div>ID:{user.id}</div>
                    <div>用户名:{user.username}</div>
                    <div>邮箱:{user.email}</div>
                </div>
            </div>
        )
    }
}
9.7 UserList.js
src/components/UserList.js

import React,{Component} from 'react';
import {Link} from '../react-router-dom';
export default class UserList extends Component{
    state={
        users:[]
    }
    componentDidMount() {
        let usersStr=localStorage.getItem('users');
        let users=usersStr? JSON.parse(usersStr):[];
        this.setState({users});
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <li className="list-group-item" key={user.id}>
                                    <Link to={`/user/detail/${user.id}`}>{user.username}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
10. 受保护的路由
10.1 src/index.js
                <Switch>
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/user" component={User} />
+                    <Route path="/login" component={Login} />
+                    <Protected path="/profile" component={Profile} />
                    <Redirect to="/"/>
                </Switch>
10.2 HashRouter.js
src/react-router-dom/HashRouter.js

render() {
        let self=this;
        let value={
            location: self.state.location,
            history: {
+                push(to) {
+                    if (typeof to == 'object') {
+                        let {pathname,state}=to;
+                        self.setState({
+                            location: {
+                                ...self.state.location,state,pathname
+                            }
+                        },() => {
+                            window.location.hash=pathname;
+                        });
+                    } else {
+                        window.location.hash=to;
+                    }                    
+                }
+            }
        }
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
10.3 Route.js
src/react-router-dom/Route.js

+                             if (Component) {
+                                return <Component {...props}/> 
+                            } else if (render) {
+                                return render(props);
+                            } else {
+                                return null;
+                            }
10.4 Login.js
src/components/Login.js

+ import React from 'react'
+ export default class Login extends React.Component{
+    handleClick=() => {
+        localStorage.setItem('logined',true);
+        this.props.history.push(this.props.location.state.from);
+    }
+    render() {
+        return (
+            <div>
+                <button
+                    className="btn btn-primary"
+                    onClick={this.handleClick}
+                >登录</button>
+            </div>
+        )
+    }
+}
10.5 Protected.js
src/components/Protected.js

+ import React from 'react'
+ import {Route,Redirect} from '../react-router-dom';
+ export default ({component:Component,...rest}) => (
+     <Route
+         {...rest}
+         render={
+             props => (
+                 localStorage.getItem('logined')?
+                     <Component {...props} />:
+                     <Redirect to={{pathname: '/login',state: {from: props.location.pathname}}} />
+             )
+         }
+     />
+ )
11. 自定义导航
11.1 index.js
src/index.js

<ul className="nav navbar-nav">
+    <MenuLink exact to="/">Home</MenuLink>
+    <MenuLink to="/user">User</MenuLink>
+    <MenuLink to="/profile">Profile</MenuLink>
</ul>
11.2 Route.js
src/react-router-dom/Route.js

 let props={
                            location: value.location,
                            history: value.history
                        }
                        if (result) {
                            let [,...values]=result;
                            let match={
                                params: keys.reduce((params,key,idx) => {
                                    params[key]=values[idx];
                                    return params;
                                },{}),
                                path,
                                url: pathname
                            };

                            props.match = match;
                            if (Component) {
                                return <Component {...props}/> 
                            } else if (render) {
                                return render(props);
                            } else if(children){
                                return children(props);
                            }else {
                              return null;
                            }
                        } else if(children){
                            return children(props);
                        } else {
                            return null;
                        }
11.3 MenuLink.js
import React from 'react'
import {Route,Link} from '../react-router-dom';
import './MenuLink.css'
export default ({to,exact,children}) => (
    <Route
        path={to}
        exact={exact}
        children={
            props => (
                <li className={props.match?'active':''}><Link to={to}>{children}</Link></li>
            )
        }
    />
)
11.4 MenuLink.css
.navbar-inverse .navbar-nav > .active > a{
    background-color: orange;
}
12. 防止跳转
12.1 UserAdd.js
src/components/UserAdd.js

import React,{Component} from 'react';
import {Prompt} from '../react-router-dom';
export default class UserAdd extends Component{
+    state={
+        isBlocking:false
+    }
    handleSubmit=(event) => {
+        event.preventDefault();
+        this.setState({
+            isBlocking:false
+        },() => {
            let username=this.username.value;
            let email=this.email.value;
            let user={username,email};
            let usersStr=localStorage.getItem('users');
            let users=usersStr? JSON.parse(usersStr):[];
            user.id = users.length>0? users[users.length-1].id+1:1;
            users.push(user);
            localStorage.setItem('users',JSON.stringify(users));
            this.props.history.push('/user/list');
        });
    }
    render() {
+        let {isBlocking}=this.state;
        return (
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={this.handleSubmit}>
+                        <Prompt
+                            when={isBlocking}
+                            message={
+                                location=>`你确定要跳转到${location.pathname}吗？`
+                            }
+                        />
                        <div className="form-group">
                            <label htmlFor="username">用户名</label>
                            <input type="text"
                                onChange={
                                    event => this.setState({isBlocking:event.target.value.length>0})
                                }
                                className="form-control" ref={input => this.username=input} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">邮箱 </label>
                            <input
                                onChange={
                                    event => this.setState({isBlocking:event.target.value.length>0})
                                }
                                type="email" className="form-control" ref={input => this.email=input} />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
12.2 HashRouter.js
src/react-router-dom/HashRouter.js

let value={
            location: self.state.location,
            history: {
                push(to) {
+                    if (self.block) {
+                        let allow=window.confirm(self.block(typeof to=='object'? to:{pathname:to}));
+                        if (!allow) return;
+                    }
                    if (typeof to == 'object') {
                        let {pathname,state}=to;
                        self.setState({
                            location: {
                                ...self.state.location,state,pathname
                            }
                        },() => {
                            window.location.hash=pathname;
                        });
                    } else {
                        window.location.hash=to;
                    }

                },
+                block(message) {
+                    self.block=message;
+                },
+                unblock() {
+                    self.block=null;
+                }
            }
        }
12.3 Prompt.js
src/react-router-dom/Prompt.js

import React from 'react'
import {Consumer} from './context'
export default class Prompt extends React.Component{
    componentWillUnmount() {
        this.history.unblock();
    }
    render() {
        return (
            <Consumer>
                {
                    value => {
                        this.history=value.history;
                        const {when,message}=this.props;
                        if (when) {
                            this.history.block(message);
                        } else {
                            this.history.block(null);
                        }
                    }
                }
            </Consumer>
        );
    }
}
13. withRouter
13.1 index.js
rc/index.js

    <div className="container-fluid">
+                    <Header/>
                    <div id="navbar" className="collapse navbar-collapse">
13.2 Route.js
src/react-router-dom/Route.js

+    let {path='/',component: Component,exact=false,render,children}=this.props;
        return (
            <Consumer>
13.3 index.js
src/react-router-dom/index.js

+import withRouter from './withRouter';
export {
    HashRouter,
    Route,
    Link,
    Redirect,
    Switch,
    Prompt,
+    withRouter
}
13.4 Header.js
src/components/Header.js

import React from 'react'
import {withRouter} from '../react-router-dom';
class Header extends React.Component{
    render() {
        return (
            <div className="navbar-header">
                <a
                    onClick={()=>this.props.history.push('/')}
                    className="navbar-brand" >
                   学生管理系统
                </a>
            </div>
        )
    }
}
export default withRouter(Header);
13.5 withRouter.js
src/react-router-dom/withRouter.js

import React from 'react'
import {Consumer} from './context';
import Route from './Route';
export default function (Component) {
    class Proxy extends React.Component{
        render() {
            return (
                <Consumer>
                    {
                        value => {
                            return <Route  component={Component}/>
                        }
                    }
               </Consumer>
            )
        }
    }
    return Proxy;
}