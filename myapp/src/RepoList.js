import React, { Component } from 'react';

class RepoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            data:null
        };
    }
    componentDidMount() {
        this.props.prm.then( 
            value => this.setState({loading: false,data: value}),
            error => this.setState({loading: false,error: error})
        )
    }

    render() {
        if(this.state.loading){
            return <span>Loading.........</span>;
        }else if (this.state.error !== null ){
            return <span>Error: {this.state.error.message}</span>;
        }else{
            let repos = this.state.data.items;
            let repoList = repos.map((repo, idx) =>{

                return (
                    <li key={idx}>
                        <a href={repo.html_url}>{repo.name}</a>
                        ({repo.stargazers_count} stars) <br/><br/>
                        {repo.description}<br/>
                    </li>
                );
            });

            return (
                    <selection>
                        <h4>Most Popular JS Projects @ Github</h4>
                        <ul>{repoList}</ul>
                    </selection>
            );
        }
    }
}
export default RepoList;