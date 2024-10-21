import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function OptimisticSelect({
  task,
  updateTasks,
  dispatch,
}: {
  task: InputTask | Task;
  updateTasks?: (payload: TaskSingleKeyValue) => void;
  dispatch?: React.Dispatch<TaskAction>;
}) {
  return (
    <Select
      value={task.optimisticMultiplier}
      onChange={(e) => {
        const payload = Number(e.target.value);

        if (dispatch) {
          dispatch({
            type: "updateOptimistic",
            payload,
          });
        }

        if (updateTasks) {
          updateTasks({
            optimisticMultiplier: payload,
          });
        }
      }}
    >
      {new Array(9)
        .fill(0)
        .map((_, i) => (i + 1) / 10)
        .map((num) => (
          <MenuItem value={num}>{num}</MenuItem>
        ))}
    </Select>
  );
}

function PressimisticSelect({
  task,
  updateTasks,
  dispatch,
}: {
  task: InputTask | Task;
  updateTasks?: (payload: TaskSingleKeyValue) => void;
  dispatch?: React.Dispatch<TaskAction>;
}) {
  return (
    <Select
      value={task.pessimisticMultiplier}
      onChange={(e) => {
        const payload = Number(e.target.value);

        if (dispatch) {
          dispatch({
            type: "updatePessimistic",
            payload,
          });
        }
        if (updateTasks) {
          updateTasks({
            pessimisticMultiplier: payload,
          });
        }
      }}
    >
      {new Array(10)
        .fill(0)
        .map((_, i) => (i + 1) / 10 + 1)
        .map((num) => (
          <MenuItem value={num}>{num}</MenuItem>
        ))}
    </Select>
  );
}

export { OptimisticSelect, PressimisticSelect };
