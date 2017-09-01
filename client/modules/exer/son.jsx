import React from 'react';
export default class Son extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                <p>{this.props.userId}</p>
                <p>子页面输入：<input type="text" onChange={this.props.handleChildValueChange} /></p>
                <p>{this.props.userName}{this.props.add}{this.props.id}</p>
            </div>
        )
    }
}
