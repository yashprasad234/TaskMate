// Import necessary modules from React and MUI
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material/";

// Import child components
import Sidebar from "../components/Sidebar";
import Task from "../components/Task";
import AddTodo from "../components/AddTodo";
const backendUrl = "http://ec2-16-171-143-39.eu-north-1.compute.amazonaws.com:3000/api";

// Define the Tasks component
function Tasks() {
  // Define state variables using the useState hook
  const [updateCounter, setUpdateCounter] = useState(0);
  const [todos, setTodos] = useState([]);
  const [addState, setAddState] = useState(false);

  // Define functions to handle todo operations
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUpdateCounter((prev) => prev + 1); // Increment updateCounter to trigger re-fetch
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = async (id) => {
    try {
      const response = await axios.put(
        `${backendUrl}/todos/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to set addState to true
  const handleAddTodoState = () => {
    setAddState(true);
  };

  // Callback function to handle adding a new todo
  const handleTodoAdded = () => {
    setAddState(false); // Reset addState after adding a todo
    setUpdateCounter((prevCounter) => prevCounter + 1); // Trigger re-fetch of todos
  };

  // useEffect hook to fetch todos when updateCounter changes
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${backendUrl}/todos`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTodos(response.data.todos);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTodos();
  }, [updateCounter]); // Depend on updateCounter to re-fetch todos

  // Render the Tasks component
  return (
    <Grid container spacing={10}>
      {/* Sidebar component */}
      <Grid item md={4} lg={3} style={{ display: { sm: "none" } }}>
        <Sidebar />
      </Grid>
      {/* Task list and AddTodo components */}
      <Grid item xs={12} sm={12} md={8} lg={9}>
        {/* Map over todos and render Task components */}
        {todos.map((todo) => (
          <Task
            key={todo._id}
            task={todo}
            handleComplete={handleComplete}
            handleDelete={handleDelete}
          />
        ))}
        {/* Render AddTodo component */}
        <AddTodo
          handleAddTodoState={handleAddTodoState}
          addState={addState}
          setAddState={setAddState}
          handleTodoAdded={handleTodoAdded} // Pass the callback function
        />
      </Grid>
    </Grid>
  );
}

// Export the Tasks component as the default export
export default Tasks;
