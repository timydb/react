import React from 'react';
import { Link, NavLink, BrowserRouter, Switch, Route, HashRouter } from 'react-router-dom';
import LoginCss from './login.css';
import Layout from '../layout/layout.jsx';

export default class login extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path='/' component={LoginTmp}/>
                        <Route path='/layout' component={Layout} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
   }
}

export class LoginTmp extends React.Component{
    constructor(props) {
        super(props)
    }
    login() {
        var name = this.refs['__loginName'].value;
        var pwd = this.refs['__loginPwd'].value;
        if (pwd && name) {
            cachePub.set(CacheKeys.USERNAME, name)
            this.props.history.push({pathname:'/layout'})
        }
    }
    render() {
        return (
            <div className={LoginCss.bg}>
                <div className={LoginCss.container}>
                    <div className={LoginCss.item}>
                        <label>登录名：</label>
                        <input type="text" ref="__loginName" />
                    </div>

                    <div className={LoginCss.item}>
                        <label>密码：</label>
                        <input className={LoginCss.ml14} type="text" ref="__loginPwd" />
                    </div>

                    <div className={LoginCss.btn} onClick={e => this.login()}>登录</div>
                </div>

            </div>
        )
    }
}