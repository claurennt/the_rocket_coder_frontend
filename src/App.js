import "./App.css";
import { ClientContext } from "graphql-hooks";
import { client } from "./db/GraphQLClient";

import MainBody from "./Components/MainBody";

function App() {
  return (
    <ClientContext.Provider value={client}>
      <div>
        <MainBody />
      </div>
    </ClientContext.Provider>
  );
}

export default App;
