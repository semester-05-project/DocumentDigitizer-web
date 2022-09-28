import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Login, Register, Profile } from './components';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

    const {currentUser} = useContext(AuthContext);

    const RequireAuth = ({ children }) => {
        if (currentUser){
            return (children);
        }
        else{
            window.location = "/";
        }
    }

    console.log(currentUser);

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
                        <RequireAuth>
                            <Profile />
                        </RequireAuth>
                    </Route>
                </Switch>
            </div>
        </Router>

    );
}

export default App;
