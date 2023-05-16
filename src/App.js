import './App.css';
import AppFooter from './components/app_footer';
import AppHeader from './components/app_header';
import PageContent from './components/page_content';
import BreadCrumb from './pages/bread_crumbs';

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
