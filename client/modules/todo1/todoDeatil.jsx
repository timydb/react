import React from 'react';
export default class TodoNewDetail extends React.Component{
    constructor(props) {
        super(props)
        this.state = { item:''}
    }
    
    get(id) {
        return {id:'id',name:'xx',age:'xx',address:'xx'}
    }
    componentWillMount() {  
        let id = this.props.match.params.id;
        // console.log(this.props.location)
        // debugger;
        // if (id) {
            // let item = this.props.location.params;
            // this.setState({ item: item })
        // } else {
            this.setState({item:this.get(id)})
        // }
    }
    render() {
        return (
            <div>
                id:{this.state.item.id}<br />
                name:{this.state.item.name}<br />
                age:{this.state.item.age}<br />
                address:{this.state.item.address}<br />

                <input type="button" value="back"  />
            </div>
        )
    }
}