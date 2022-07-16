import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import Parent from './covidApp/Parent';


function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Parent />
      </Provider>
    </div>
  );
}

export default App;
