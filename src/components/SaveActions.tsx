import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import { getPlans, savePlans } from "../utils";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import Export from "../components/Export";

function SaveActions({
  tasks,
  currentPlan,
  startDate,
  setCurrentPlan,
  setPlansStorage,
}: {
  tasks: Task[];
  currentPlan: string;
  startDate: Date;
  setCurrentPlan: React.Dispatch<React.SetStateAction<string>>;
  setPlansStorage: React.Dispatch<React.SetStateAction<Plan[]>>;
}) {
  const planRef = useRef<HTMLInputElement>(null);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <TextField
        ref={planRef}
        label="計畫名稱"
        value={currentPlan}
        onChange={(e) => {
          if (planRef.current) {
            planRef.current.value = e.target.value;
            setCurrentPlan(e.target.value);
          }
        }}
      />
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={() => {
              const existingPlans: Plan[] = getPlans();

              const planId = uuidv4();

              const plainName = planRef.current?.value || "Plan -" + planId;

              const newPlan = {
                id: planId,
                name: plainName,
                tasks,
              };

              setCurrentPlan(plainName);
              const updatedPlans = [newPlan, ...existingPlans]; // 添加新任務
              savePlans(updatedPlans);
              setPlansStorage(updatedPlans);

              if (planRef.current) {
                planRef.current.value = "";
              }
            }}
          >
            另存新檔
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              const plansStorage: Plan[] = getPlans();
              const planIdx = plansStorage.findIndex(
                (plan) => plan.name === currentPlan
              );
              alert(planIdx !== -1 ? "存檔成功" : "請另存新檔");

              if (planIdx !== -1) {
                plansStorage[planIdx].tasks = tasks;

                savePlans(plansStorage);
                setPlansStorage(plansStorage);
              }
            }}
          >
            存檔
          </Button>
          <Export
            tasks={tasks}
            currentPlan={currentPlan}
            startDate={startDate}
          />
        </ButtonGroup>
      </Grid>
    </Box>
  );
}

export default SaveActions;
