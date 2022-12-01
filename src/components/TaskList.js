import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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

export default function TaskList() {
  const location = useLocation();
  const task = (location.state && location.state.task) || null;

  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState(task.tasks);
  const userId = localStorage.getItem("id");
  const [open, setOpen] = useState("");
  const [editTodo, setEditTodo] = useState("");

  const navigate = useNavigate();

  const addTodo = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `http://localhost:3001/todo/edit?id=${task._id}`,
      {
        tasks: [...todoList, todo],
        userId,
      }
    );
    if (response.status === 200) {
      setTodoList((prev) => [...prev, todo]);
    }
    console.log(response.data);
  };

  const deleteTodo = async (idx) => {
    const filteredList = todoList.filter((todo, currIdx) => currIdx !== idx);

    const response = await axios.put(
      `http://localhost:3001/todo/edit?id=${task._id}`,
      {
        tasks: filteredList,
      }
    );
    if (response.status === 200) {
      setTodoList(filteredList);
    }
  };

  const updateTodo = async (idx) => {
    const updatedList = todoList.map((todo, currIdx) => {
      if (currIdx === idx) {
        return editTodo;
      }
      return todo;
    });
    await axios.put(`http://localhost:3001/todo/edit?id=${task._id}`, {
      tasks: updatedList,
    });
    setTodoList(updatedList);
    setOpen(false);
  };

  useEffect(() => {
    if (!location.state) {
      navigate("/home");
    }
  }, [location.state, navigate]);

  return (
    <div>
      <CssBaseline />

      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: "#f2f2f2",
            minHeight: "100vh",
            margin: "1rem",
            padding: "1rem",
          }}
        >
          <div>
            <h1 style={{ textAlign: "center" }}>{task && task.title}</h1>
            <form className="todo-input" onSubmit={addTodo}>
              <input
                required
                className="addTask"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Add Todo...."
              />
              <Button
                type="submit"
                value="Add"
                variant="contained"
                style={{
                  backgroundColor: "#789D87",
                  color: "#FFF",
                  marginLeft: ".5rem",
                }}
              >
                Add
              </Button>
            </form>
          </div>
          {console.log(todoList)}
          {todoList &&
            todoList.map((todo, idx) => {
              return (
                <div className="taskList">
                  <div className="hero">
                    <div>
                      {/* <Checkbox style={{ marginRight: ".5rem" }} /> */}
                      <span style={{ marginRight: "1rem" }}>{todo}</span>
                    </div>

                    <div className="icons">
                      <DeleteOutlineIcon
                        onClick={() => deleteTodo(idx)}
                        style={{ marginRight: ".5rem" }}
                      />

                      <EditIcon
                        onClick={() => {
                          setEditTodo(todo);
                          setOpen(true);
                        }}
                        style={{ marginRight: ".5rem" }}
                      />
                    </div>
                  </div>

                  <Modal open={open} onClose={() => setOpen(false)}>
                    <Box sx={style}>
                      <TextField
                        required
                        id="outlined-required"
                        label="Edit Task"
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                        style={{ marginBottom: "1rem" }}
                      />
                      <Button
                        type="submit"
                        value="Add"
                        variant="contained"
                        onClick={() => updateTodo(idx)}
                      >
                        Update
                      </Button>
                    </Box>
                  </Modal>
                </div>
              );
            })}
        </Box>
      </Container>
    </div>
  );
}
