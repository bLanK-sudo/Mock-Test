/* @refresh reload */
import { render } from 'solid-js/web';
import '../public/css/output.css'
import App from './pages/App';
import Mock from './pages/Mock';
import Page404 from './pages/Page404';
import { onMount } from 'solid-js'
import { Router, Route, Routes } from "@solidjs/router";
import Profile from './pages/Profile';
import Test from './pages/Test';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';






const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}



render(
  () =>( 
  <Router>
    <Routes>
      <Route path="*" component={Page404} />
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" component={App} />
      <Route path="/about" component={About} />
      <Route path="/mock" component={Mock} />
      <Route path="/profile" component={Profile} />
      <Route path="/test/:id" component={Test} />
      <Route path="/contact" component={Contact} />
    </Routes>
  </Router>
  
  ), 
  root
  );
