/*jshint esversion: 6 */
import React from 'react';
import ReactDom from 'react-dom';
// import Car from './modules/car/car.jsx';
// import ToDo from './modules/todo/todo.jsx';
import ToDo1 from './modules/todo1/todo.jsx'
// import ComponentHeader from './modules/exer/header.jsx';
// import Componentfooter from './modules/exer/footer.jsx';
// import ComponentBody from './modules/exer/body.jsx';
// class Index extends React.Component{
//     render() {
//         return (
//             <div>
//                 <ComponentHeader/>
//                 <ComponentBody userId={110} add={'abcde'}/>
//                 <Componentfooter/>
//             </div>
//         )
//     }
// }

ReactDom.render(
    <ToDo1/>,  document.getElementById('c')
)




