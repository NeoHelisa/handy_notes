import './App.css';
import Header from './components/header/header';
import Notes from './components/notes/notesHandler';


function App() {
  const noteDragOver = event =>
    {
        event.stopPropagation();
        event.preventDefault();
    }
  return (
    <div className="App" onDragOver={noteDragOver}>
      <Header/>
      <Notes/>
    </div>
  );
}

export default App;
