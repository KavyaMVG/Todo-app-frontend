import React from "react";
import TodoList from "./TodoList";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Home() {
  return (
    <header className="App-header">
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
          <TodoList />
        </Box>
      </Container>
    </header>
  );
}
