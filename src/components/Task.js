import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { config } from "../config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Task({ task, taskList, setTaskList }) {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState("");
  const navigate = useNavigate();

  const deleteTask = async (deleteTaskId) => {
    const response = await axios.delete(`${config.API.baseURL}/todo/delete`, {
      deleteId: deleteTaskId,
    });

    if (response.status === 200) {
      const filteredTask = taskList.filter((task) => task._id !== deleteTaskId);
      setTaskList(filteredTask);
      console.log(filteredTask);
    }
  };

  const isChecked = async (taskId) => {
    const response = await axios.put(
      `${config.API.baseURL}/todo/edit?id=${taskId}`,
      {
        isComplete: !checked,
      }
    );
    setChecked(!checked);

    console.log(response);
  };
  const updateTask = async (taskId) => {
    const { data } = await axios.put(
      `${config.API.baseURL}/todo/edit?id=${taskId}`,
      {
        title: editTask,
      }
    );

    const updatedList = taskList.map((todo) => {
      if (todo._id === taskId) {
        return {
          title: editTask,
          _id: data.response._id,
        };
      }
      return todo;
    });
    setTaskList(updatedList);
    setOpen(false);
  };

  useEffect(() => {
    setChecked(task.isComplete);
  }, [task.isComplete]);

  return (
    <div className="taskList">
      <div className="hero">
        <div>
          <Checkbox
            style={{ marginRight: ".5rem" }}
            checked={checked}
            onClick={() => isChecked(task._id)}
          />
          <span
            style={{ marginRight: ".5rem" }}
            className={checked ? "strike-text" : ""}
            onClick={() => navigate("/todo", { state: { task } })}
          >
            {task.title}
          </span>
        </div>

        <div className="icons">
          <DeleteOutlineIcon
            style={{ marginRight: ".5rem" }}
            onClick={() => deleteTask(task._id)}
          />
          <EditIcon
            style={{ marginRight: ".5rem" }}
            onClick={() => {
              setEditTask(task.title);
              setOpen(true);
            }}
          />
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <TextField
            required
            id="outlined-required"
            label="Edit Task"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <Button
            type="submit"
            value="Add"
            variant="contained"
            onClick={() => updateTask(task._id)}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
