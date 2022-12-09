import React from "react";
import { useState, useEffect } from "react";
import Task from "./Task";
import Button from "@mui/material/Button";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
    backgroundColor: "#f4f6f7",
    margin: "1rem 0",
    border: "2px solid #f4f6f7",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function TodoList() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [searchTodo, setSearchTodo] = useState("");
  const [alphabetSort, setAlphabetSort] = useState("ASC");
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
    const getAllData = async () => {
      const response = await axios.get(
        `http://localhost:3001/todo/allTasks/${userId}`
      );
      setTaskList(response.data);
    };

    getAllData();
  }, [userId, navigate]);

  const todoSearch = async (e) => {
    console.log("hello");
    const searchText = e.target.value;
    setSearchTodo(searchText);
    try {
      const response = await axios.get(
        `http://localhost:3001/todo/search?search=${searchText}&userId=${userId}`
      );
      setTaskList(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const taskSort = (e) => {
    e.preventDefault();
    if (alphabetSort === "ASC") {
      const sortedTaskList = [...taskList];
      sortedTaskList.sort((a, b) => a.title.localeCompare(b.title));
      setTaskList(sortedTaskList);
      setAlphabetSort("DESC");
    } else if (alphabetSort === "DESC") {
      const sortedTaskList = [...taskList];
      sortedTaskList.sort((a, b) => b.title.localeCompare(a.title));
      setTaskList(sortedTaskList);
      setAlphabetSort("ASC");
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!task) return;

    try {
      const response = await axios.post("http://localhost:3001/todo/", {
        title: task,
        tasks: [],
        userId,
      });
      const { data } = response;

      if (response.status === 201) {
        setTaskList((prev) => {
          return [...prev, { title: task, _id: data.response._id }];
        });
        setTask("");
      }
    } catch (err) {
      console.log("Error adding task: ", err);
    }
  };
  return (
    <div className="main">
      <form onSubmit={addTask}>
        <h1 style={{ textAlign: "center" }}>Add Todo</h1>

        <div className="textfield">
          <input
            required
            className="addTask"
            placeholder="Add Task...."
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <Button
            type="submit"
            value="Add"
            variant="contained"
            style={{
              backgroundColor: "#1a759f",
              color: "#FFF",
              marginLeft: ".5rem",
              padding: "0.7rem 1rem",
              width: "23%",
            }}
          >
            Add
          </Button>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTodo}
              onChange={(e) => todoSearch(e)}
            />
          </Search>
        </div>
        <div className="sort">
          <button onClick={(e) => taskSort(e)} className="sort-btn">
            Sort
          </button>
        </div>

        {taskList.map((task) => {
          return (
            <div key={task._id}>
              <Task
                task={task}
                taskList={taskList}
                setTaskList={setTaskList}
                setTask={setTask}
              />
            </div>
          );
        })}
      </form>
    </div>
  );
}
