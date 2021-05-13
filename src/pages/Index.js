import { useState } from "react";
import { Link } from "react-router-dom";

function Index(props) {
  //state to hold the form data
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    title: "",
  });

  // handlechange function to allow our state to control the form. "handle the changes in the form"
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  //! This is the function that's always always the same
  // handlesubmit function handles the form submission.
  const handleSubmit = (event) => {
    //prevent refresh, just bc of how browsers work!
    event.preventDefault();
    // use the createPeople props to set the "person" data as the input value of form
    props.createPeople(newForm);
    // clear the form!
    setNewForm({
      name: "",
      image: "",
      title: "",
    });
  };

  // loaded function
  const loaded = () => {
    return props.people.map((person) => (
      <div key={person._id} className="person">
        <Link to={`/people/${person._id}`}>
          <h1>{person.name}</h1>
        </Link>
        <img src={person.image} alt={person.name} />
        <h3>{person.title}</h3>
      </div>
    ));
  };

  // loading function
  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.image}
          name="image"
          placeholder="image"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Create Person" />
      </form>
      {props.people ? loaded() : loading()}
    </section>
  );
}

export default Index;
