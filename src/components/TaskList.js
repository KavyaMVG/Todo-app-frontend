import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
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

const style2 = {
  position: "absolute",
  top: "11%",
  left: "8%",
  fontSize: "1.7rem",
  backgroundColor: "#1a759f",
  color: "#f2f2f2",
  borderRadius: "3px",
  padding: ".2rem .3rem",
};
export default function TaskList() {
  const location = useLocation();
  const task = (location.state && location.state.task) || null;

  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState(task && task.tasks);
  const userId = localStorage.getItem("id");
  const [open, setOpen] = useState("");
  const [editTodo, setEditTodo] = useState("");

  const navigate = useNavigate();

  const addTodo = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `${config.API.baseURL}/todo/edit?id=${task._id}`,
      {
        tasks: [...todoList, todo],
        userId,
      }
    );
    if (response.status === 200) {
      setTodoList((prev) => [...prev, todo]);
    }
    setTodo("");
    console.log(response.data);
  };

  const deleteTodo = async (idx) => {
    const filteredList = todoList.filter((todo, currIdx) => currIdx !== idx);

    const response = await axios.put(
      `${config.API.baseURL}/todo/edit?id=${task._id}`,
      {
        tasks: filteredList,
      }
    );
    console.log(response);
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
    await axios.put(`${config.API.baseURL}/todo/edit?id=${task._id}`, {
      tasks: updatedList,
    });
    setTodoList(updatedList);
    setOpen(false);
  };

  useEffect(() => {
    if (!userId) {
      return navigate("/login");
    }
    if (!location.state) {
      return navigate("/home");
    }
  }, [location.state, navigate, userId]);

  return (
    <div>
      <CssBaseline />

      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: "#fff",
            minHeight: "100vh",
            margin: "1rem",
            padding: "2rem",
            position: "relative",
            borderRadius: "5px",
          }}
        >
          <div>
            <h1 style={{ textAlign: "center" }}>{task && task.title}</h1>
            <ArrowBackIcon sx={style2} onClick={() => navigate("/home")} />
            <form className="todo-input " onSubmit={addTodo}>
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
                  backgroundColor: "#1a759f",
                  color: "#FFF",
                  marginLeft: ".5rem",
                  padding: "0.7rem 0.1rem",
                  width: "19%",
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
                <div className="taskList sub-todo">
                  <div className="hero">
                    <div>
                      <span
                        style={{ marginRight: "1rem", marginLeft: ".5rem" }}
                      >
                        {todo}
                      </span>
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
