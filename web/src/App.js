import './App.css';
import Sandbox from './components/Sandbox';
import ProblemsTable from './components/ProblemsTable';
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
            <Route path ="/sandbox" element = {<Sandbox/>}/>
            <Route path ="/problems/:problemid" element = {<ProblemWorkspace/>}/>
          </Routes>
        </SkeletonTheme>
      </div>
      </Router>
  );
}


const restrictedFunctions = ['fetch','window','document', 'eval', 'Function', 'import', 'require', 'with']
function checkCode(code){
  for(var i = 0; i < restrictedFunctions.length; i++){
    const myRe = new RegExp(restrictedFunctions[i])
    const res = myRe.exec(code);
    if (res != null) {
      console.log('Restricted functions are detected in the code!')
      return false
    }
  }
  return true
}


export default App;
