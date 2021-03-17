import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './components/pages/HomePage/Home';
import ServicePage from './components/pages/ServicePage';
import SolutionPage from './components/pages/SolutionPage';

function App() {
  return (
    <Router>
     <Navbar />
     <Switch>
       <Route exact path='/' component={Home} />
       <Route exact path='/services' component={ServicePage} />
       <Route exact path='/solutions' component={SolutionPage} />
     </Switch>
     <Footer />
    </Router>
  );
}

export default App;
