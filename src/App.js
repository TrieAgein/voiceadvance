// import style from './App.css';
import Login from './APP/index.js';
import Dashboard from './APP/dashboard.js';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

function App() {
  return (
    // <div className="App">
    <div>
      <Login/> 
      <Dashboard/>

    <Router>
    <Switch>
    <Route path="/" component={Login} />
      <Redirect from="/" to="/dashboard" component={Dashboard}/>
      </Switch>
      </Router>  
    <Router>
      <div className="App">
        {/* You can render either Login or Dashboard here */}
        {/* Fix routing below to render to dashboard */}
        {/* <Switch>
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Redirect from="/" to="/dashboard" />
        </Switch> */}
      </div>
    </Router>
    </div>
  );
}

function dashboard(){
  return 
}

export default App;
