import React from 'react';

export default class Person extends React.Component{
    constructor(props) {
        super(props);
        this.state = { data: this.props.data, col: [] }
    }
    
    componentWillMount() {
        var arr = this.props.data;
        this.setState({data:arr,col:this.getCols(arr)})
    }
    
    componentWillReceiveProps(nextProps) {
        var arr = this.props.data;
        this.setState({data:arr})
    }
    
    getCols(data) {
        var obj = data[0];
        var col = [];
        for (var key in obj) {
             col.push(key)
        }
        return col
    }
    detail(id) {
        this.props.history.push({ pathname: `${this.props.match.url}/${id} `})
    }
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        {this.state.col.map((v, k) => {
                            return <td key={k}>{v}</td>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((value, index) => {
                        return (
                            <tr key={index}>
                                {
                                    this.state.col.map((v,k) => {
                                        return (
                                            <td key={k}>{value[v]}
                                               
                                            </td>
                                        )
                                    })
                                }
                                <td>
                                    <button onClick={e => { this.props.tell(value,index)}}>详情</button>
                                    <button onClick={e => { this.props.del(value,index)}}>删除</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}