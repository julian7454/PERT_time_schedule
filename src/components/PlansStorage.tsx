import { getPlans, savePlans } from "../utils";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemButton from "@mui/material/ListItemButton";

export default function PlansStorage({
  setTasks,
  setCurrentPlan,
  plan,
  setPlansStorage,
}: {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setCurrentPlan: React.Dispatch<React.SetStateAction<string>>;
  plan: Plan;
  setPlansStorage: React.Dispatch<React.SetStateAction<Plan[]>>;
}) {
  return (
    <ListItemButton
      onClick={() => {
        setTasks(plan.tasks);
        setCurrentPlan(plan.name);
      }}
    >
      {/* <button
        onClick={() => {
          setTasks(plan.tasks);
          setCurrentPlan(plan.name);
        }}
      > */}
      {plan.name}
      {/* </button> */}
      <IconButton
        onClick={() => {
          const existingPlans: Plan[] = getPlans();
          const updatedPlans = existingPlans.filter((p) => p.id !== plan.id);

          setPlansStorage(updatedPlans);
          savePlans(updatedPlans);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </ListItemButton>
  );
}
