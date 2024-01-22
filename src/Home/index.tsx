import { Delete } from "@mui/icons-material";
import { Divider, Paper, Checkbox, FormControl, FormControlLabel, TextField, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";

const AddTask = ({ updateTasks }: any) => {
    const [task, setTask] = useState('');

    const handleTaskChange = (event: any) => {
        setTask(event.target.value);
    };

    const handleAddTaskClick = () => {
        const newTask = `tsk${Math.random()}`;
        localStorage.setItem(newTask, JSON.stringify(task));
        updateTasks();
        setTask('');
    };

    return (
        <Grid container className="items-center">
            <Grid item xs={9.5}>
                <TextField
                    size="small"
                    fullWidth
                    value={task}
                    onChange={handleTaskChange}
                />
            </Grid>
            <Grid item xs={2.5}>
                <Button onClick={handleAddTaskClick}>Adicionar</Button>
            </Grid>
        </Grid>
    );
};

const Tasks = ({ updateTasks }: any) => {
    const armazenamento = Object.entries(localStorage);

    const handleRemoveTask = (taskKey: string) => {
        localStorage.removeItem(taskKey);
        updateTasks();
    };

    if (localStorage.length != 0) {
        return (
            <div className="mt-4">
                <Divider light />
                <FormControl className="w-[550px]">
                    {armazenamento.map(([taskKey, taskValue], index) => (
                        <Grid container key={index} className="items-center justify-between">
                            <Grid item>
                                <FormControlLabel
                                    control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }} />}
                                    label={JSON.parse(taskValue)}
                                />
                            </Grid>
                            <Grid item>
                                <Button color="error" size="small" onClick={() => handleRemoveTask(taskKey)}><Delete /></Button>
                            </Grid>
                        </Grid>
                    ))}
                </FormControl>
            </div>
        );
    }
};

const ActionButtons = ({ updateTasks }: any) => {
    if (localStorage.length !== 0) {
        return (
            <Grid className="flex justify-end">
                <Button color="error" size="small" onClick={() => { localStorage.clear(); updateTasks(); }}>Apagar todos</Button>
            </Grid>
        );
    }
    return null;
}

export default function Home() {
    const [tasksUpdated, setTasksUpdated] = useState(false);

    const updateTasks = () => {
        setTasksUpdated(!tasksUpdated);
    };

    useEffect(() => {
    }, [tasksUpdated]);

    return (
        <>
            <div className="flex justify-center items-center h-[100vh]">
                <Paper className="w-[600px] p-4 text-center">
                    <AddTask updateTasks={updateTasks} />
                    <Tasks updateTasks={updateTasks} />
                    <ActionButtons updateTasks={updateTasks} />
                </Paper>
            </div>
        </>
    );
}
