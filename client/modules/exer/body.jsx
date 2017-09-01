import React from 'react';
import ReactDOM from 'react-dom';
import ReactMixin from 'react-mixin';
import Son from './son.jsx';
import Mixin from './mixins.jsx';
// const defaultProps = '这是默认名字';
const userName = {
    userName: '这是默认名字'
}
export default class componentBody extends React.Component {
    constructor(props) {
        super(props);//
        this.state = {userName:'timy',newName:'123',age:'123'};
    }
    
     
    componentWillMount() {
        console.log('willMount')
        this.setState({ name: 'timy', newName: 'timy123', age: 20 });
        
    }
    
    componentDidMount() {
        console.log('didmount')
    }
    getState() {
        return this.state.newName
    }
    changeInfo() {
        this.setState({ age: 50 })
        Mixin.log();
        // var btn = document.getElementById('btn');
        console.log(this.refs.btn)
        this.refs.btn.style.color = 'yellow';
        // ReactDOM.findDOMNode(btn).style.color = 'red';
    }
    handleChildValueChange(e) {
        this.setState({age:e.target.value})   
    }
    render() {
        return (
            <div>
                <h2>这是主体222</h2>
                <p dangerouslySetInnerHTML={{ __html: this.state.html }}></p>{/* 最好不用，容易被攻击 */}
                <p>{this.state.name ? this.state.name : '未登录'}</p>
                <p>{this.props.userId}</p>
                <p>{this.props.userName}</p>
                <p>{this.state.age}</p>
                <input type="button" value='提交' onClick={this.changeInfo.bind(this)}  ref='btn' />
                <Son handleChildValueChange={this.handleChildValueChange.bind(this)} {...this.props} id={4}/>
            </div>
        )
    }
}
componentBody.PropTypes = {
    userId:React.PropTypes.number.isRequired
}
componentBody.defaultProps = userName;

ReactMixin(componentBody.PropTypes,Mixin)