/*jshint esversion: 6 */
import React from 'react';
export default class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.saveDialog = this.saveDialog.bind(this);
        this.editDialog = this.editDialog.bind(this);
        this.getName = this.getName.bind(this);
        this.getAge = this.getAge.bind(this);
        this.getAddress = this.getAddress.bind(this);
        this.state = { data: { name: "", age: "", address: "" }};
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.flag === 'add') {
            this.setState({ data:{ name: "", age: "", address: "" }});
        }
    }
    saveDialog() {
        this.setState({ open: !this.props.data });
        this.props.closeCb(this.state.data);
    }
    editDialog() {
        console.log(this.state.data);
    }
    getName(e) {
        this.setState({ data: { name: e.target.value, age: this.state.data.age, address: this.state.data.address } });
    }
    getAge(e) {
        this.setState({ data: { age: e.target.value, name: this.state.data.name, address: this.state.data.address } });
    }
    getAddress(e) {
        this.setState({ data: { address: e.target.value, name: this.state.data.name, age: this.state.data.age } });
    }
    render() {
            return (
                <div style={{ background: "rgba(0,0,0,.7)", position: "fixed", top: "0px", left: "0px", right: "0px", bottom: "0px"}}>
                    <div style={{ width: "500px", height: "500px", margin: "50px auto", background: "#fff" }}>
                        name: <input type="text" value={this.state.data.name} onChange={this.getName} /><br/>
                        age: <input type="text" value={this.state.data.age} onChange={this.getAge} /><br />
                        address: <input type="text" value={this.state.data.address} onChange={this.getAddress} /><br />
                        <input type="button" value="save" onClick={this.saveDialog} />
                        <input type="button" value="edit" onClick={this.editDialog} />
                    </div>
                </div>
            )
    }
}