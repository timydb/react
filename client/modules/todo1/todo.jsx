import React from 'react';
import { Link, NavLink, BrowserRouter, Switch, Route, HashRouter } from 'react-router-dom';
import Table from './table.jsx';
import Dialog from './dialog.jsx';
import CurrentDetail from './detail.jsx';
export default class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { lists: {},  state: '', singleItem:'',index:'',item:''};
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.close = this.close.bind(this);
        this.del = this.del.bind(this);
    }
    
    componentWillMount() {
        var location = this.props.location.params;
        console.log(location)
        var arr = [
            { name: 'timy', age: 2, address: 'bj' },
            { name: '大白', age: 2, address: 'bj' },
            { name: '多多', age: 1, address: 'bj' }
        ]
        this.setState({ lists: arr, item: location})
    }
    add() {
        this.setState({state:'add'})
    }
    edit(item,index) {
        this.setState({ state: 'edit',singleItem:item,index:index })
    }

    del(index) {
        let tmp = this.state.lists.splice(index, 1);
        this.setState({ data: tmp });
    }

    close(item, flag, index) {
        if (flag === 'add') {
            this.state.lists.push(item)
            this.setState({lists:this.state.lists,state:false})
        } else if (flag === 'edit') {
            let obj = this.state.lists;
            let len = this.state.lists.length;
            for (let i = 0; i < len; i++){
                if (index === i) {
                    obj.splice(i,1,item)
                }
            }
            this.setState({ lists: obj, state: false })
        } else this.setState({ state: false})
    }
    toCar() {
        console.dir(this.props)
        this.props.history.push({pathname:'/car'})
    }
    todoNewDetail() {
        this.props.history.push({ pathname: '/todoDetail/' + this.state.item.id , params:this.state.item})
    }
    detail() {
        this.props.history.push({ pathname: '/todo/1', params: {id:1,name:'123',age:'123',address:'123'}})
    }
    render() {
        return (
            <div>
                <p>count:{this.state.lists.length}</p><button onClick={this.add}>ADD</button>
                <Table data={this.state.lists} edit={this.edit} del={this.del}/>
                <div style={{ display: this.state.state ? "block" : "none"}}>
                    <Dialog data={this.state.lists} flag={this.state.state} close={this.close} singleItem={this.state.singleItem} index={this.state.index}/>
                </div>
                <button onClick={this.toCar.bind(this)}>toCar</button>
                <button onClick={this.todoNewDetail.bind(this)}>todoNewDetai</button>
                <button onClick={this.detail.bind(this)}>详情</button>
                <Route path='/todo/:id' component={CurrentDetail}/>
            </div>
        )
    }
}
