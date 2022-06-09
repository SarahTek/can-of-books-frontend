import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
 import { withAuth0 } from '@auth0/auth0-react';
 import Profile from './Profile';
// import Content from './Content';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>

              <Route
                exact path="/"
                
                element=

                {this.props.auth0.isAuthenticated ?
                 <>
                  <Profile />
                  <BestBooks />
                 </>
                  :
                  <Login />
                  
                }
                >
              <Route
                path="/about"
                element={<About />}
              >
              </Route>
              {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
              </Route>
            </Routes>
          {/* </Routes> */}
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
