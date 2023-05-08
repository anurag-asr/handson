import './App.css';
// import AllRoutes from './Components/AllRoutes';
import AppFooter from './Components/AppFooter';
import AppHeader from './Components/AppHeader';
import PageContent from './Components/PageContent';

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
