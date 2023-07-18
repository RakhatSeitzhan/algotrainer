import './App.css';
import { Header } from './components/Header';
import "./styles/CustomStyles.css"
import ProblemsPage from './components/ProblemsPage';
import Homepage from './components/homepage/Homepage';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import ProblemWorkspace from './components/ProblemWorkspace';
import { SkeletonTheme } from 'react-loading-skeleton';
function App() {
  const gray = getComputedStyle(document.documentElement).getPropertyValue('--gray-t1')
  const grayLight = getComputedStyle(document.documentElement).getPropertyValue('--gray-t1-light')
  return (
    <Router>
      <div className="App">
        <SkeletonTheme baseColor={gray} highlightColor={grayLight} borderRadius = '1rem'>
          <Header/>
          <Routes>
            <Route path ="/" element = {<Homepage/>} />
            <Route path ="/problems" element = {<ProblemsPage/>} />
            <Route path ="/problems/:problemid" element = {<ProblemWorkspace/>}/>
          </Routes>
        </SkeletonTheme>
      </div>
      </Router>
  );
}
export default App;
