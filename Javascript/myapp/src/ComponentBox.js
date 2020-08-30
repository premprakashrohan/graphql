import React,{Component} from 'react';

class CoponentBox extends React.Component{
    render(){
        let status = "empty";
        return (
            <div className ="myBox">
                This is an info box, which is currently {status}.
            </div>
        );
    }
}

export default CoponentBox;