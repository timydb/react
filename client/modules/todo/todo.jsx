/*jshint esversion: 6 */
import React from 'react';
import Table from './table.jsx';
import Dialog from './dialog.jsx';
export default class toDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [],open:false,flag:''};
        this.showOne = this.showOne.bind(this);
        this.saveDialog = this.saveDialog.bind(this);
    }
    componentWillMount() {
        var array = [
            { name: 'aaa', age: '11', address: '北京' },
            { name: 'bbb', age: '15', address: '上海', },
            { name: 'ccc', age: '25', address: '美国', }
        ];
        this.setState({ data: array });
    }
    
    showOne() {
        this.setState({ open: !this.state.open, flag:'add' });
    }
    saveDialog(item) {
        this.state.data.push(item); 
        this.setState({ open:"", data: this.state.data });
    }
    render() {
        return (
            <div>
                Count:{this.state.data.length}
                <input type='button' onClick={this.showOne} value='add' />
                <Table data={this.state.data} />
                <div style={{ display: this.state.open ? "block" : "none" }}>
                    <Dialog data={this.state.flag} closeCb={this.saveDialog} flag={this.state.flag}/>
                </div>
            </div>
        )
    }
}