import { Person } from "./Component/Person";
import Salute from "./Component/Salute";



function App() {

  const nameList = [
    {first: "chidi", last: "matthew"},
    {first: "Sunday", last: "Bruce"},
    {first: "Julian", last: "matthew"},
    {first: "Yande", last: "Brenda"},
  ]

  return (
    <div className="App">
      <Salute name="Chinweike" />
      <Person names={nameList}/>
    </div>
  );
}

export default App;
