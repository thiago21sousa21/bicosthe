import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

function Home() {
  return <h1>Página Inicial</h1>;
}

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
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </Router>
  );
}

export default App;
