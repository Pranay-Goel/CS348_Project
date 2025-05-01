import{
  BrowserRouter,
  Routes,
  Route

} from 'react-router-dom';
import Movies from './pages/Movies';
import Update from './pages/Update';
import Add from './pages/Add';
import "./style.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Movies/>} />
          <Route path="/add" element={<Add/>} />
          <Route path="/update/:id" element={<Update/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
