import { Routes, Route } from "react-router-dom";
import Carrinho from "./pages/Carrinho";
import Pagamento from "./pages/Pagamento";
import Sucesso from "./pages/Sucesso";
import Falha from "./pages/Falha";
import logo from "./assets/img/logo.svg";

function App() {
  return (
    <div className="app">
      <a className="link-pular" href="#conteudo-principal">
        Pular para o conteúdo
      </a>

      <header className="cabecalho">
        <div className="cabecalho__conteudo">
          <img src={logo} alt="" className="cabecalho__logo" />
          <span className="cabecalho__nome">Nordeva</span>
        </div>
      </header>

      <div id="conteudo-principal">
        <Routes>
          <Route path="/" element={<Carrinho />} />
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="/sucesso" element={<Sucesso />} />
          <Route path="/falha" element={<Falha />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
