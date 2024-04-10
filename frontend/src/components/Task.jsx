import axios from "axios";
import { Card, Typography, Checkbox, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";

/**
 * Functional component representing a task item.
 * @param {Object} props - Props passed to the component.
 * @param {Object} props.task - Task object containing task details.
 * @param {Function} props.handleComplete - Function to handle task completion.
 * @param {Function} props.handleDelete - Function to handle task deletion.
 * @returns {JSX.Element} JSX representation of the component.
 */
export default function Task({ task, handleComplete, handleDelete }) {
  return (
    <Card
      style={{
        marginBottom: "25px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Task completion checkbox */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Checkbox
            onClick={() => {
              handleComplete(task._id);
            }}
          />
          {/* Task title */}
          <Typography variant="h6">{task.title}</Typography>
        </div>
        {/* Task actions */}
        <div style={{ display: "flex", gap: "20px", marginRight: "20px" }}>
          {/* Delete task button */}
          <DeleteIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(task._id);
            }}
          />
        </div>
      </div>
    </Card>
  );
}
