import React from 'react';
import Son from './son.jsx';
export default class father extends React.Component {
    constructor(props) {
        super(props);
        this.state={name:'timy'}
    }
    render() {
        return (
            <Son data={this.state.name}/>
        )
    }
}
