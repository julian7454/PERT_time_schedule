import * as XLSX from "xlsx";
import ReactGA from "react-ga4";
import { saveAs } from "file-saver";
import Button from "@mui/material/Button";
import useTaskEstimates from "../useTaskEstimates";

function Export({
  tasks,
  currentPlan,
  startDate,
}: {
  tasks: Task[];
  currentPlan: string;
  startDate: Date;
}) {
  const {
    sumOfMostLikelyHours,
    sumOfOptimisticHours,
    sumOfPessimisticHours,
    expectedHours,
    delayHours,
    regularDueDate,
    optimisticDueDate,
    pessimisticDueDate,
    dueDate,
    delayDate,
  } = useTaskEstimates(tasks, startDate);

  const handleExport = () => {
    const exportTasks = tasks.map(({ id, ...rest }) => {
      const optimistic = Math.ceil(rest.optimisticMultiplier * rest.mostLikely);
      const pessimistic = Math.ceil(
        rest.pessimisticMultiplier * rest.mostLikely
      );

      return {
        任務名稱: rest.name,
        常規预估: rest.mostLikely,
        樂觀預估: optimistic,
        悲觀預估: pessimistic,
        預估完成工時: Math.ceil(
          (optimistic + rest.mostLikely * 4 + pessimistic) / 6
        ),
        標準差工時: Math.ceil((pessimistic - optimistic) / 6),
      };
    });

    const totalRow = {
      任務名稱: "總和",
      常規预估: sumOfMostLikelyHours,
      樂觀預估: sumOfOptimisticHours,
      悲觀預估: sumOfPessimisticHours,
      預估完成工時: expectedHours,
      標準差工時: delayHours,
    };

    const dueRow = {
      任務名稱: "到期日",
      常規预估: regularDueDate,
      樂觀預估: optimisticDueDate,
      悲觀預估: pessimisticDueDate,
      預估完成工時: dueDate,
      標準差工時: delayDate,
    };

    const worksheet = XLSX.utils.json_to_sheet([
      ...exportTasks,
      totalRow,
      dueRow,
    ]);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    ReactGA.event({
      category: "User interaction",
      action: "Click",
      label: "匯出",
    });

    // 使用 file-saver 保存文件
    saveAs(blob, `${currentPlan}.xlsx`);
  };
  return (
    <Button variant="contained" onClick={handleExport}>
      匯出
    </Button>
  );
}

export default Export;
