import './App.css';
import AppFooter from './Components/appfooter';
import AppHeader from './Components/appheader';
import PageContent from './Components/pagecontent';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <PageContent/>
      <AppFooter/>
    </div>
  );
}

export default App;
