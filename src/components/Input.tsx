import { useReducer } from "react";
import { OptimisticSelect, PressimisticSelect } from "./Select";
import { taskReducer } from "../reducer";
import { v4 as uuidv4 } from "uuid";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Input({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  const [taskState, dispatch] = useReducer(taskReducer, {
    id: null,
    mostLikely: "",
    name: "",
    optimisticMultiplier: 0.8,
    pessimisticMultiplier: 1.5,
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <TextField
            label="任務名稱"
            type="text"
            value={taskState.name}
            onChange={(e) => {
              const payload = e.target.value;
              dispatch({
                type: "updateName",
                payload,
              });
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <TextField
            label="常規預估工時"
            type="number"
            inputProps={{
              min: 1,
            }}
            value={taskState.mostLikely}
            onChange={(e) => {
              const payload = e.target.value;
              dispatch({
                type: "updateMostLikely",
                payload,
              });
            }}
          />
        </Grid>

        <Grid size={{ xs: 6, md: 4, lg: 3 }}>
          樂觀乘數:
          <OptimisticSelect task={taskState} dispatch={dispatch} />
        </Grid>
        <Grid size={{ xs: 6, md: 4, lg: 3 }}>
          悲觀乘數：
          <PressimisticSelect task={taskState} dispatch={dispatch} />
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 12 }}>
          <Button
            variant="contained"
            disabled={!Number(taskState.mostLikely) || !taskState.name}
            onClick={() => {
              setTasks([
                ...tasks,
                {
                  ...taskState,
                  id: uuidv4(),
                  mostLikely: Number(taskState.mostLikely),
                },
              ]);
              dispatch({ type: "reset" });
            }}
          >
            加入任務
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Input;
