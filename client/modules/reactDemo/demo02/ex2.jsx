import React from 'react';

export default class demo extends React.Component{
    constructor(props) {
        super(props);
        // this.state = { data: [] };
        this.state = { arr: ['luanjin', 'chenjiao'] };
        this.show = this.show.bind(this);
        
    }
    
    // componentWillMount() {
    //     this.setState = { arr: ['luanjin', 'chenjiao'] }
    // }
    show() {
       return this.state.arr.map((v, k) => {
           return  <div key={k}>{v}</div>
        })
    }
    
    render() {
        return (
            <div>
                {this.state.arr.map((v, k) => {
                  return   <div key={k}>{v}</div>
                })}
            </div>
        )
    }

}