/*jshint esversion: 6 */
import React from 'react';
import CarTable from './carTabel.jsx';
import Dialog from './dialog.jsx';
export default class Car extends React.Component{
    constructor(props) {
        super(props);
        this.state = { data: [], singleItem: null };
        this.showOne = this.showOne.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }
    componentWillMount() {
        var array = [
            { name: '福特', price: '20w', address: '北京', cc: 123 },
            { name: '奥迪', price: '30w', address: '上海', cc: 333 },
            { name: '保时捷', price: '50w', address: '美国', cc: 444 }
        ];
        this.setState({ data: array });
    }
    
    showOne() {
        this.setState({ singleItem: this.state.data[0] });
    }
    closeDialog(item) {
        this.state.data.push(item);
        this.setState({ singleItem: null, data: this.state.data });
    }
    todo() {
        let item = { "id": 1, "name": "张三", "age": "18", "address": "北京" };
        this.props.history.push({ pathname: '/todo', params: item });
        // console.log(this.props)
    }
    render() {
        return (
            <div>
                <input type='button' onClick={this.showOne} value='show' />
                <CarTable data={this.state.data} />
                <div style={{ display: this.state.singleItem ? "block" : "none"}}>
                    <Dialog data={this.state.singleItem} closeCb={this.closeDialog}/>
                </div>
                <button onClick={this.todo.bind(this)}>ToDo</button>
            </div>
        )
    }
}