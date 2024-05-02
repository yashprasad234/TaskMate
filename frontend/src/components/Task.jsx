import axios from "axios";
import { Card, Typography, Checkbox, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";

export default function Task({ task, handleComplete, handleDelete }) {
  return (
    <Card
      style={{
        marginBottom: "25px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Checkbox
            checked={task.isDone}
            onClick={() => {
              handleComplete(task._id);
            }}
          />
          <Typography variant="h6">{task.title}</Typography>
        </div>
        <div style={{ display: "flex", gap: "20px", marginRight: "20px" }}>
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
