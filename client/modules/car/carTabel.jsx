/*jshint esversion: 6 */
import React from 'react';
export default class CarTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: this.props.data, cols: [] };
        this.getHeader = this.getHeader.bind(this);
        this.getSingleRows = this.getSingleRows.bind(this);
        this.getRows = this.getRows.bind(this);
    }
    componentWillMount() {
        this.setState({ cols: this.getCols(this.state.data) });
    }
    getCols(data) {
        var cols = [];
        for (var key in data[0]) {
            cols.push(key);
        }
        return cols;
    }
    getHeader() {
        var html = [];
        this.state.cols.map(v => {
            html.push(<td key={Math.ceil(Math.random() * 100000)}>{v}</td>);
        });
        return html;
    }


    getSingleRows(data) {
        var html = [];
        this.state.cols.map(v => {
            html.push(<td key={Math.ceil(Math.random() * 100000)}>{data[v]}</td>)
        })
        return html;
    }
    getRows() {
        var html = [];
        this.state.data.map(v => {
            html.push(<tr key={Math.ceil(Math.random() * 10000)}>{this.getSingleRows(v)}</tr>);
        });
        return html;
    }



    render() {
        return (
            <table>
                <thead>
                    <tr>
                        {this.getHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this.getRows()}
                </tbody>
            </table>
        )
    }
}