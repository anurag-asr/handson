import './App.css';
import AppFooter from './Components/appfooter';
import AppHeader from './Components/appheader';
import PageContent from './Components/pagecontent';
import BreadCrumb from './pages/breadcrumbs';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <BreadCrumb/>
      <PageContent/>
      <AppFooter/>
    </div>
  );
}

export default App;
