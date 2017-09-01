import React from 'react';
export default class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', age: '', address: '' };
        this.getName = this.getName.bind(this);
        this.getAge = this.getAge.bind(this);
        this.getAddress = this.getAddress.bind(this);
        this.save = this.save.bind(this);
        this.close = this.close.bind(this);
        
    }
    
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.flag !== 'edit') { 
            this.setState({ name: '', age: '', address: '' })
        } else {
            this.setState({ name: nextProps.singleItem.name, age: nextProps.singleItem.age, address: nextProps.singleItem.address})
        }
    }
    

    getName(e) {
        this.setState({ name:e.target.value })
    }
    getAge(e) {
        this.setState({ age:e.target.value })
    }
    getAddress(e) {
        this.setState({ address:e.target.value })
    }
    save() {
        let flag = this.props.flag;
        let index = this.props.index
        if (flag === 'add')
            this.props.close(this.state, flag, index)
        else if (flag === 'edit') {
            this.props.close(this.state,flag,index)            
        }
    }
    close() {
        this.props.close()
    }
    render() {
        return (
            <div style={{ background: "rgba(0,0,0,.7)", position: "fixed", top: "0px", left: "0px", right: "0px", bottom: "0px",}}>
                <div style={{ width: "500px", height: "500px", margin: "50px auto", background: "#fff" }}>
                    name: <input type="text" value={this.state.name} onChange={this.getName}/><br />
                    age: <input type="text" value={this.state.age} onChange={this.getAge} /><br />
                    address: <input type="text" value={this.state.address} onChange={this.getAddress} /><br />
                    <input type="button" value="save" onClick={this.save} />
                    <input type="button" value="close" onClick={this.close}/>
                </div>
            </div>
        )
    }
}
