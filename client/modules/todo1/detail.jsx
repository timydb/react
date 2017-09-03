import React from 'react'
export default class CurrentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state={ item: '' }
    }

    componentWillMount() {
        var item = this.props.location.params;
        console.log(this.props.location)
        this.setState({item:item})
    }
    get(id) {
        return { id: 'id', name: 'xx', age: 'xx', address: 'xx' }
    }
    componentWillMount() {
        let id = this.props.match.params.id;
        this.setState({ item: this.get(id) })
    }
    
    back() {
        this.props.history.push({ pathname: '/layout/todo' })
    }
    render() {
        return (
            <div>
                id:{this.state.item.id}<br />
                name:{this.state.item.name}<br />
                age:{this.state.item.age}<br />
                address:{this.state.item.address}<br />
                <button onClick={e=>this.back()}>back</button>
            </div>
        )
    }
}