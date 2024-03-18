import { Delete } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import Toast from "../../components/Toast";
import "./index.css";

const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

const AddTask = ({ updateTasks }: any) => {
  const [toast, setToast] = useState(false);
  const [task, setTask] = useState("");

  const handleTaskChange = (event: any) => {
    setTask(event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTaskClick();
    }
  };

  const handleAddTaskClick = () => {
    const tarefa = { nome: task, status: false };
    if (task != "") {
      const newTask = "easy_" + uuidv4();
      localStorage.setItem(newTask, JSON.stringify(tarefa));
      updateTasks();
      setTask("");
    } else {
      setToast(true);
    }
  };

  return (
    <Grid container className="items-center">
      <Grid item xs={9.5}>
        <TextField
          size="small"
          fullWidth
          value={task}
          label="Digite a sua tarefa"
          onKeyDown={handleKeyDown}
          onChange={handleTaskChange}
        />
      </Grid>
      <Grid item xs={2.5}>
        <Button onClick={handleAddTaskClick}>Adicionar</Button>
      </Grid>
      <Toast
        severity={"error"}
        children={"Insira uma tarefa"}
        toast={toast}
        setToast={setToast}
      />
    </Grid>
  );
};

const Tasks = ({ updateTasks }: any) => {
  const armazenamento2 = Object.keys(localStorage)
    .filter((key) => key.startsWith("easy_"))
    .reduce((obj, key) => {
      obj[key] = localStorage[key];
      return obj;
    }, {} as any);

  const handleRemoveTask = (taskKey: string) => {
    localStorage.removeItem(taskKey);
    updateTasks();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const taskKey = event.target.name;
    const task = JSON.parse(localStorage.getItem(taskKey) || "{}");

    task.status = event.target.checked;
    localStorage.setItem(taskKey, JSON.stringify(task));
    updateTasks();
  };

  if (localStorage.length != 0) {
    return (
      <div className="mt-4">
        <Divider light />
        {Object.keys(armazenamento2).map((index) => {
          const taskKey = index;
          const { nome, status } = JSON.parse(armazenamento2[index]);

          return (
            <Grid
              container
              key={index}
              className="items-center justify-between"
            >
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={status}
                      onChange={handleChange}
                      name={taskKey} // Passar a chave como nome
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                    />
                  }
                  label={nome}
                />
              </Grid>
              <Grid item>
                <Button
                  color="error"
                  size="small"
                  onClick={() => handleRemoveTask(taskKey)}
                >
                  <Delete />
                </Button>
              </Grid>
            </Grid>
          );
        })}
      </div>
    );
  }
};

const ActionButtons = ({ updateTasks }: any) => {
  const clearTasks = () => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("easy_"))
      .forEach((key) => localStorage.removeItem(key));
    updateTasks();
  };

  if (localStorage.length !== 0) {
    return (
      <Grid className="flex justify-end">
        <Button
          color="error"
          size="small"
          onClick={() => {
            clearTasks();
            updateTasks();
          }}
        >
          Apagar todos
        </Button>
      </Grid>
    );
  }
  return null;
};

export default function Home() {
  const [tasksUpdated, setTasksUpdated] = useState(false);

  const updateTasks = () => {
    setTasksUpdated(!tasksUpdated);
  };

  useEffect(() => {}, [tasksUpdated]);

  return (
    <>
      <div className="flex justify-center items-center" id="fullViewPort">
        <Paper className="w-[600px] p-4 text-center m-4">
          <AddTask updateTasks={updateTasks} />
          <Tasks updateTasks={updateTasks} />
          <ActionButtons updateTasks={updateTasks} />
        </Paper>
      </div>
    </>
  );
}
