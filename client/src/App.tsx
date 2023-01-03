import Main from './components/main';
import './comCss/App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Main />
      <ToastContainer
        position="bottom-left"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </div>
  );
}

export default App;
