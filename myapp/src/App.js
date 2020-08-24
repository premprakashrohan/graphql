import React from 'react';
import CoponentBox from './ComponentBox';
import MyDiv from './MyDiv';
/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
mongodb+srv://root:<password>@cluster0.rxoxn.mongodb.net/<dbname>?retryWrites=true&w=majority

export default App;*/
class MyApp extends React.Component {

  render() {
    const greeting = 'Welcome to React';
    return ( 
    <div>
      <CoponentBox /> 
      <MyDiv name={greeting}/> 
      </div>  
      );
  }
}
export default MyApp;