import "./index.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import { Web3Provider, useWeb3 } from "./Web3Context";
import Dashboard from "./pages/Dashboard";
import MyStakes from "./pages/MyStakes";
import Transactions from "./pages/Transactions";
import About from "./pages/About";
const CONTRACT_ADDRESS = "0xCd279499974Ac556a7DA538e5F1f1B501E46c14c";

function Navbar() {

  const { account, connectWallet } = useWeb3();

  return (
    <nav className="navbar">

      <div className="logoSection">
        <div className="logoCircle">♦</div>
        <div>
          <h1 className="logoText">EtherAuthority</h1>
          <p className="subLogo">Blockchain Internship</p>
        </div>
      </div>

      <div className="navLinks">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/my-stakes">My Stakes</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>

      <button className="walletBtn" onClick={connectWallet}>
        <FaWallet />
        {
          account
            ? `${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect Wallet"
        }
      </button>

    </nav>
  );
}

function App() {

  return (
    <Web3Provider>
      <BrowserRouter>
        <div className="appContainer">

          <Navbar />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/my-stakes" element={<MyStakes />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/about" element={<About />} />
          </Routes>

          <footer>
            <div>
              <h2>EtherAuthority</h2>
              <p>Blockchain Internship</p>
            </div>
            <h2>Powered by EtherAuthority</h2>
          </footer>

        </div>
      </BrowserRouter>
    </Web3Provider>
  );
}

export default App;