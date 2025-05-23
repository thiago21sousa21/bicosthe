import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PostarServico from '../pages/PostarServico';
import DetalheServico from '../pages/DetalheServico';
import Navbar from '../components/Navbar';


export default function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/postar" element={<PostarServico />} />
        <Route path="/servico/:id" element={<DetalheServico />} />
      </Routes>
    </Router>
  );
}
