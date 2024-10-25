import "./styles.css";
import { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import AppBar from "@mui/material/AppBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Input from "./components/Input";
import Task from "./components/Task";
import List from "@mui/material/List";
import SaveActions from "./components/SaveActions";
import PlansStorage from "./components/PlansStorage";
import useTaskEstimates from "./useTaskEstimates";
import { getPlans } from "./utils";
import "normalize.css";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [plansStorage, setPlansStorage] = useState<Plan[]>(getPlans);
  const [currentPlan, setCurrentPlan] = useState<string>("");

  // console.log("re-render app");

  const {
    sumOfMostLikelyHours,
    sumOfOptimisticHours,
    sumOfPessimisticHours,
    expectedHours,
    regularDueDate,
    optimisticDueDate,
    pessimisticDueDate,
    dueDate,
  } = useTaskEstimates(tasks, startDate);

  return (
    <div className="App">
      <AppBar position="static">
        <Typography variant="h1" sx={{ fontSize: "35px", lineHeight: "45px" }}>
          PERT Time schedule{" "}
        </Typography>
      </AppBar>
      <Grid container spacing={2} direction={{ xs: "column", md: "row" }}>
        <Grid
          size={{ xs: 12, md: 8 }}
          sx={{
            padding: "15px",
          }}
        >
          {currentPlan && (
            <>
              <Button
                variant="outlined"
                onClick={() => {
                  setTasks([]);
                  setCurrentPlan("");
                }}
              >
                建立新的時程計畫
              </Button>
              <hr />
            </>
          )}
          <Input tasks={tasks} setTasks={setTasks} />
          <Typography variant="h5" sx={{ padding: "15px" }}>
            {currentPlan}
          </Typography>
          {!!tasks.length && (
            <>
              <TableContainer>
                <Table sx={{ minWidth: 950 }}>
                  <TableHead>
                    <TableRow>
                      {/* <th>ID</th> */}
                      <TableCell>任務</TableCell>
                      <TableCell>樂觀預估</TableCell>
                      <TableCell>常規預估</TableCell>
                      <TableCell>悲觀預估</TableCell>
                      <TableCell>樂觀乘數</TableCell>
                      <TableCell>悲觀乘數</TableCell>
                      <TableCell>刪除</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks.map((task) => (
                      <Task key={task.id} task={task} setTasks={setTasks} />
                    ))}

                    <CalculateSum
                      sumOfMostLikelyHours={sumOfMostLikelyHours}
                      sumOfOptimisticHours={sumOfOptimisticHours}
                      sumOfPessimisticHours={sumOfPessimisticHours}
                    />
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                sx={{
                  paddingTop: "15px",
                  textAlign: { sx: "center", md: "left" },
                }}
              >
                <Typography>PERT 預估完成工時：{expectedHours}</Typography>
                <Typography sx={{ paddingBottom: "15px" }}>
                  PERT 預估完成天數：{Math.ceil(expectedHours / 8)}
                </Typography>
              </Box>
              <SaveActions
                tasks={tasks}
                currentPlan={currentPlan}
                startDate={startDate}
                setCurrentPlan={setCurrentPlan}
                setPlansStorage={setPlansStorage}
              />
              {/* <Export tasks={tasks} currentPlan={currentPlan} /> */}
            </>
          )}
          <hr />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoItem
              label="開始日期"
              sx={{ width: "200px", margin: "0 auto" }}
            >
              <DatePicker
                sx={{
                  paddingBottom: "20px",
                }}
                defaultValue={startDate}
                onChange={(newValue) => setStartDate(newValue ?? new Date())}
              />
            </DemoItem>
            {/* <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              /> */}
          </LocalizationProvider>
          <Typography
            variant="h5"
            sx={{
              padding: "15px",
            }}
          >
            預估的到期日：{" "}
            <Tooltip
              title="完成日期會扣除期間的週末，但不會扣除國定假日"
              enterTouchDelay={0}
            >
              <ContactSupportIcon sx={{ fontSize: "30px" }} />
            </Tooltip>
          </Typography>
          <p>樂觀到期日：{optimisticDueDate}</p>
          <p>常規到期日：{regularDueDate}</p>
          <p>悲觀到期日：{pessimisticDueDate}</p>
          <p>
            PERT 預估到期日{" "}
            <Tooltip
              title="PERT 的計算公式： (悲觀工時 + 常規工時 × 4 + 樂觀工時) ÷ 6"
              enterTouchDelay={0}
            >
              <ContactSupportIcon sx={{ fontSize: "30px" }} />
            </Tooltip>
            ：{dueDate}
          </p>

          <hr />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              backgroundColor: "#e0e0e0", // 背景顏色
              textAlign: "center", // 文字水平置中
              display: "flex", // 使用 Flexbox
              flexDirection: "column", // 垂直排列
              justifyContent: plansStorage.length ? "start" : "center", // 垂直置中
              alignItems: "center", // 水平置中
              height: { md: `calc(100vh - 20px)` }, // 使用整個視口的高度
            }}
          >
            {plansStorage.length ? (
              <List>
                {plansStorage?.map((plan, i) => (
                  <PlansStorage
                    setTasks={setTasks}
                    setCurrentPlan={setCurrentPlan}
                    plan={plan}
                    setPlansStorage={setPlansStorage}
                  />
                ))}
              </List>
            ) : (
              <Typography
                variant="h6"
                sx={{ padding: "15px" }}
                color="textSecondary"
              >
                目前沒有存檔
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

function CalculateSum({
  sumOfMostLikelyHours,
  sumOfOptimisticHours,
  sumOfPessimisticHours,
}: {
  sumOfMostLikelyHours: number;
  sumOfOptimisticHours: number;
  sumOfPessimisticHours: number;
}) {
  return (
    <TableRow>
      {/* <td></td> */}
      <TableCell>總和</TableCell>
      <TableCell>{sumOfOptimisticHours}</TableCell>
      <TableCell>{sumOfMostLikelyHours}</TableCell>
      <TableCell>{sumOfPessimisticHours}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}
