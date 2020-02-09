import React, {useState} from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [quote, setQuote] = useState('');

  const fetchQuote = () => {
    fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=3LRW2P74Y5SLLONQ').then(res =>
    res.json()).then((data) =>
    setQuote(data["Global Quote"]))
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
{/* use button event, onclick executes the fetchQuote */}
      </header>
    </div>
  );
}

export default App;
