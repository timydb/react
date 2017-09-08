import React from 'react'
export default class CurrentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state={ item: null }
    }

    // componentWillMount() {
    //     var item = this.props.match;
    //     debugger
    //     console.log(this.props.match)
    //     this.setState({item:item})
    // }
    get(id) {
        return { id: id, name: 'xx', age: 'xx', address: 'xx' }
    }
    componentWillMount() {
        let id = this.props.match.params.id;
        console.log(this.props.match.params)
        this.setState({ item: this.get(id) })
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({ item: this.get(nextProps.match.params.id) })
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