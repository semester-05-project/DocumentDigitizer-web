import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Login, Register, Profile } from './components';

function App() {

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                </Switch>
            </div>
        </Router>

    );
}

export default App;
