import React, { useRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Typography, TextField } from "@mui/material";
import axios from "axios";
const backendUrl = import.meta.env.VITE_API_URL;

export default function AddTodo({
  handleAddTodoState,
  addState,
  setAddState,
  handleTodoAdded,
}) {
  const [todoTitle, setTodoTitle] = React.useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (addState && inputRef.current) {
      inputRef.current.focus();
    }
  }, [addState]);

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
      {addState ? (
        <div>
          <TextField
            id="standard-basic"
            label="Task name"
            variant="standard"
            fullWidth={true}
            onChange={(e) => {
              setTodoTitle(e.target.value);
            }}
            onKeyDown={handleAddTodo}
            inputRef={inputRef}
          />
        </div>
      ) : (
        <div
          style={{
            marginBottom: "25px",
            boxSizing: "border-box",
            cursor: "pointer",
          }}
          onClick={handleAddTodoState}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <AddIcon />
              <Typography style={{ marginLeft: "10px" }}>Add task</Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
