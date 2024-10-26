import React, { useCallback } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import { taskReducer } from "../reducer";
import { OptimisticSelect, PressimisticSelect } from "./Select";
import TextField from "@mui/material/TextField";

const Task = React.memo(
  ({
    task,
    setTasks,
  }: {
    task: Task;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  }) => {
    // const [taskState, dispatch] = useReducer(taskReducer, task);
    const removeTask = (task: Task) => {
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    };

    console.log("re-render task");

    // useEffect(() => {
    //   setTasks((prevTasks: Task[]) => {
    //     return prevTasks.map((item) => {
    //       if (item.id === taskState.id) {
    //         return {
    //           ...item,
    //           name: taskState.name,
    //           mostLikely: Number(taskState.mostLikely),
    //           optimisticMultiplier: taskState.optimisticMultiplier,
    //           pessimisticMultiplier: taskState.pessimisticMultiplier,
    //         };
    //       }

    //       return item;
    //     });
    //   });
    // }, [taskState]);

    const updateTasks = (payload: TaskSingleKeyValue) => {
      setTasks((prevTasks) => {
        return prevTasks.map((item) => {
          if (item.id === task.id) {
            console.log(payload);
            return {
              ...item,
              ...payload,
              // name: taskState.name,
              // mostLikely: Number(taskState.mostLikely),
              // optimisticMultiplier: taskState.optimisticMultiplier,
              // pessimisticMultiplier: taskState.pessimisticMultiplier,
            };
          }

          return item;
        });
      });
    };
    const optimistic = Math.ceil(task.optimisticMultiplier * task.mostLikely);
    const pessimistic = Math.ceil(task.pessimisticMultiplier * task.mostLikely);

    return (
      <TableRow>
        {/* <td>{task.id}</td> */}
        <TableCell>
          <TextField
            type="text"
            value={task.name}
            onChange={(e) => {
              const payload = e.target.value;
              console.log(payload);
              updateTasks({
                name: payload,
              });
            }}
          />
        </TableCell>
        <TableCell>{optimistic}</TableCell>
        {/* <td>{task.mostLikely}</td> */}
        <TableCell>
          <TextField
            value={task.mostLikely}
            type="number"
            onChange={(e) => {
              updateTasks({
                mostLikely: Number(e.target.value),
              });
            }}
          />
        </TableCell>
        <TableCell>{pessimistic}</TableCell>
        <TableCell>
          <OptimisticSelect task={task} updateTasks={updateTasks} />
        </TableCell>
        <TableCell>
          <PressimisticSelect task={task} updateTasks={updateTasks} />
        </TableCell>
        <TableCell>
          {Math.ceil((optimistic + pessimistic + task.mostLikely * 4) / 6)}
        </TableCell>
        <TableCell>{Math.ceil((pessimistic - optimistic) / 6)}</TableCell>
        <TableCell>
          <Button
            variant="outlined"
            color="error"
            onClick={() => removeTask(task)}
          >
            刪除
          </Button>
        </TableCell>
      </TableRow>
    );
  }
);

export default Task;
