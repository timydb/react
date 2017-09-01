import React from 'react';

export default class son extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.data}  
            </div>
        )
    }
}
