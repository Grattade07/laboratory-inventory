import './App.css';
import logo from "./Conical_flask_teal.png"
import Login from './components/Login';
import ProductTable from './components/ProductTable';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import AddItem from './components/AddItem';
import githubLogo from "./github-mark-white.png"
import linkedInLogo from "./LI-In-Bug.png"

function App() {
  return (
    <div className='App'>
      <header id="header">
        {/* Logo for website */}
        <img src={logo} alt="conical flask" id="company-logo"/>

        {/* Application name */}
        <h1 id="app-name">Elemental Inventory</h1>

        {/* Login box */}
        <Login/>
      </header>

      <main id="main">
        <ProductTable />
        <SearchBar />
        <Filters />
        <AddItem />
      </main>

      <footer id="footer">
        <a href='https://github.com/logos' className='links' target="_blank" rel="noreferrer"><img src={githubLogo} className="linkLogos" alt="GitHub Logo"/></a>
        <a href='https://www.linkedin.com/in/joe-woodcock-a79510171/' className='links' target="_blank" rel="noreferrer"><img src={linkedInLogo} className="linkLogos" alt="LinkedIn Logo"/></a>
      </footer>
    </div>
  );
}

export default App;
