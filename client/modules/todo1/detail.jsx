import React from 'react'
export default class CurrentDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        var item = this.props.location.params;
        console.log(this.props.location)
        this.setState({item:item})
    }
    
    
    render() {
        return (
            <div>
                id:{this.state.item.id}<br />
                name:{this.state.item.name}<br />
                age:{this.state.item.age}<br />
                address:{this.state.item.address}<br />
                <button>back</button>
            </div>
        )
    }
}