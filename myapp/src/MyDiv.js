import React, { Component } from 'react';
class MyDiv extends React.Component{
    constructor(props){
        super(props);
        console.log("Constructor prop:", this.props.name);
    }
    render() {
        console.log("render");
        return <div>JS: {this.props.name} </div>

    }
    componentDidMount(){console.log("componentDidMount: ",this.props.name);}
    componentWillUnmount() {console.log("componentWillUnmount: ",this.props.name)}
}
export default MyDiv;