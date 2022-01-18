import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from "./components/Landing"
import Home from './components/Home';
import Create from './components/Create'
import Detail from './components/Detail'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route path="/pokemons" component={Create} />
          <Route exact path="/home/:id" component={Detail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
