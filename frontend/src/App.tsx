import { Switch, Match } from 'solid-js';
import Home from './views/Home';
import Navbar from './components/Navbar';


function App() {
  // Récuperer le dernier elt de l'url
  const page = window.location.pathname

  return (<>
    <Navbar />
    <Switch fallback={<div>Page not found</div>}>
      <Match when={ page == "/" }> <Home/></Match>
    </Switch>
  </>
  );
}

export default App;
