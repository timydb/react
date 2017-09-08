import React from 'react';
import { Link, NavLink, BrowserRouter, Switch, Route, HashRouter } from 'react-router-dom';
import Table from '../core/table.jsx';
import CurrentDetail from '../todo1/detail.jsx';
export default class Person extends React.Component{
    constructor(props) {
        super(props);
        this.state={data:[]}
    }
    
    componentWillMount() {
        let arr = [
            {id:1, name: 'timy', age: 2, address: 'bj' },
            {id:2, name: '大白', age: 2, address: 'bj' },
            {id:3, name: '多多', age: 1, address: 'bj' }
        ]
        this.setState({data:arr})
    }
    tell(value,index) {
        this.props.history.push({ pathname:`${this.props.match.url}/${value.id}`})
    }
    del(value, index) {
        this.state.data.splice(index, 1)
        this.setState({ data: this.state.data })
        console.log(this.state.data)
    }
    render() {
        return (
            <div>
                <Table data={this.state.data} tell={this.tell.bind(this)} del={this.del.bind(this)}/>
                <Route path={`${this.props.match.url}/:id`} component={CurrentDetail} />
            </div>
        )
    }
}