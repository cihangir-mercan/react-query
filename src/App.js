import AddText from "./components/AddText";
import History from "./components/History";
import "./App.scss";

function App() {
    return (
        <div className="App">
            <h1>Translate English to Turkish</h1>

            <AddText/>

            <History/>
        </div>
    );
}

export default App;