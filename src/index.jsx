/* @refresh reload */
import { render } from 'solid-js/web';
import '../public/css/output.css'
import Home from './pages/Home';
import Mock from './pages/Mock';
import Page404 from './pages/Page404';
import { Router, Route, Routes } from "@solidjs/router";
import Profile from './pages/Profile';
import Test from './pages/Test';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Subjects from './pages/Subjects';
import Exams from './pages/Exams';
import Forgot from './pages/Forgot';
import Report from './pages/Report';
import FeedBack from './pages/Feedback';
import Features from './pages/Features';
import Solved from './pages/Solved';
import SubjectCategory from './pages/SubjectCategory';






const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}



render(
  () => (
    <Router>
      <Routes>
        <Route path="*" component={Page404} />
        <Route path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/forgot_pwd" component={Forgot} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/mock" component={Mock} />
        <Route path="/profile" component={Profile} />
        <Route path="/test/:id" component={Test} />
        <Route path="/contact" component={Contact} />
        <Route path="/donate" component={Donate} />
        <Route path="/report" component={Report} />
        <Route path="/solved" component={Solved} />
        <Route path="/feedback" component={FeedBack} />
        <Route path="/features" component={Features} />
        <Route path="/subjects" component={Subjects} />
        <Route path="/subjects/:id" component={SubjectCategory} />
        <Route path="/exams/:id" component={Exams} />
      </Routes>
    </Router>
  ),
  root
);
