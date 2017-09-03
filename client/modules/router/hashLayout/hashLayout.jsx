import React from 'react';
import { Link, NavLink, BrowserRouter, Switch, Route, HashRouter } from 'react-router-dom';
import Car from '../../car/car.jsx';
import Todo from '../../todo1/todo.jsx';
import NoMatch from '../../noMatch/noMatch.jsx';
import LayoutCss from './Layout.css';
import TodoNewDetail from '../../todo1/todoDeatil.jsx';
export default class Layout extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <HashRouter>
                <div>
                    <ul className={LayoutCss.ulLayout + " " + LayoutCss.clearfix}>
                        <li><Link style={{ color: 'red' }} to="/">Home</Link></li>
                        <li><Link className={LayoutCss.green} to="/car">Car</Link></li>
                        <li><Link style={{ color: 'pink' }} to="/todo">ToDo</Link></li>
                        <li><Link style={{ color: 'pink' }} to="/todoDetail/1">todoDetail</Link></li>
                    </ul>
                    <Switch>
                        <Route exact path="/" component={Car} />
                        <Route path="/car" component={Car} />
                        <Route exact path="/todoDetail/:id" component={TodoNewDetail} /> 
                        <Route path="/todo" component={Todo} />
                        <Route path="*" component={NoMatch} />
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}