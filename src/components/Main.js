import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import env from 'react-dotenv'
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {

  const [people, setPeople] = useState(null);

  // function to make the API call for people
console.log(env)
  const URL = env.API_URL || "http://localhost:3000/";
  // const URL = "https://favorite-actors-express-react.herokuapp.com/people";

  const getPeople = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPeople(data);
  };

  // function to create a new person
  const createPerson = async (person) => {
    //make post request to create people
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    //update list of people
    getPeople();
  };

  // useEffect to make initial call for people list
  useEffect(() => getPeople(), []);

  // pass the people state and the create function to Index
  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index people={people} createPerson={createPerson} />
        </Route>
        <Route path="/people/:id" render={(rp) => <Show {...rp} />} />
      </Switch>
    </main>
  );
}

export default Main;
