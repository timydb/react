/*jshint esversion: 6 */
import React from 'react';
export default class Dialog extends React.Component{
    constructor(props) {
        super(props);
        this.closeDialog = this.closeDialog.bind(this);
        this.state = { item:this.props.data };
    }
    
    componentWillReceiveProps(next) {
        this.setState({item:next.data});
    }
    closeDialog(){
        this.props.closeCb(this.state.item);
    }
    render() {
        if (this.state.item) {
            return (
                <div style={{ background: "rgba(0,0,0,.7)", position: "fixed", top: "0px", left: "0px", right: "0px", bottom: "0px" }}>
                    <div style={{ width: "500px", height: "500px", margin: "50px auto", background: "#fff" }}>
                        {this.state.item.name}
                        <input type="button" value="close" onClick={this.closeDialog} />
                    </div>
                </div>
            )
        }
        return <div>null</div>;
        
    }
}