import React from 'react'

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = { lists: this.props.data, cols: [] };
        this.getCols = this.getCols.bind(this);
        this.getRows = this.getRows.bind(this);
    }
    
    componentWillMount() {
        this.setState({ cols: this.getCols() })
    }
    
    getCols() {
        var cols=[]
        for (var key in this.state.lists[0]) {
            cols.push(key)
        }
        return cols;
        
    }
    edit(value,index) {
        this.props.edit(value,index)
    }

    del(index) {
        console.log(index);
        this.props.del(index)
    }

    getRows() {
        return this.state.lists.map((value,index) => {
            return(
                <tr key={index}>
                    {this.state.cols.map((v, k) => { 
                        return <td key={k}>{value[v]}</td>
                    })}
                    <td>
                        <button onClick={this.edit.bind(this,value,index)} >edit</button>
                        <button onClick={this.del.bind(this, index)} >del</button>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        {this.state.cols.map((v, k) => {
                            return (
                                <td key={k}>{v}</td>
                           )
                        })}
                        <td>action</td>
                    </tr>
                </thead>
                <tbody>
                    {this.getRows()}
                </tbody>
            </table>
        )
    }
}
