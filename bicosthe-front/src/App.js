import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import FeedDeServicos from './pages/FeedDeServicos';



function Sobre() {
  return <h1>Sobre nós</h1>;
}

function Contato() {
  return <h1>Fale conosco</h1>;
}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Início</Link> | 
        <Link to="/sobre">Sobre</Link> | 
        <Link to="/contato">Contato</Link>
      </nav>

      <Routes>
        <Route path="/" element={<FeedDeServicos />} />servicos
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </Router>
  );
}

export default App;
