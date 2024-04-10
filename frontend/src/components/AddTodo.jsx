import React, { useRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Typography, TextField } from "@mui/material";
import axios from "axios";
const backendUrl = "http://localhost:3000/api";

export default function AddTodo({
  handleAddTodoState,
  addState,
  setAddState,
  handleTodoAdded,
}) {
  // State to store todo title
  const [todoTitle, setTodoTitle] = React.useState("");
  // Reference for the text field
  const inputRef = useRef(null);

  // Effect to focus the text field when addState becomes true
  useEffect(() => {
    if (addState && inputRef.current) {
      inputRef.current.focus();
    }
  }, [addState]);

  // Function to handle adding a new todo
  const handleAddTodo = async (e) => {
    if (e.key === "Enter") {
      setAddState(false);
      try {
        const response = await axios.post(
          `${backendUrl}/todos`,
          {
            title: todoTitle,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        handleTodoAdded();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      {/* Render input field if addState is true, otherwise render "Add task" button */}
      {addState ? (
        <div>
          <TextField
            id="standard-basic"
            label="Task name"
            variant="standard"
            fullWidth={true}
            onChange={(e) => {
              setTodoTitle(e.target.value); // Update todoTitle state as user types
            }}
            onKeyDown={handleAddTodo} // Call handleAddTodo when user presses Enter key
            inputRef={inputRef} // Assign the ref to the text field
          />
        </div>
      ) : (
        <div
          style={{
            marginBottom: "25px",
            boxSizing: "border-box",
            cursor: "pointer",
          }}
          onClick={handleAddTodoState} // Call handleAddTodoState when button is clicked
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <AddIcon /> {/* Add task icon */}
              <Typography style={{ marginLeft: "10px" }}>
                Add task
              </Typography>{" "}
              {/* "Add task" text */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
