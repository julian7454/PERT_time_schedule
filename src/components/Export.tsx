import * as XLSX from "xlsx";
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
    regularDueDate,
    optimisticDueDate,
    pessimisticDueDate,
    dueDate,
  } = useTaskEstimates(tasks, startDate);

  const handleExport = () => {
    const exportTasks = tasks.map(({ id, ...rest }) => ({
      任務名稱: rest.name,
      常規预估: rest.mostLikely,
      樂觀乘數: Math.ceil(rest.optimisticMultiplier * rest.mostLikely),
      悲觀乘数: Math.ceil(rest.pessimisticMultiplier * rest.mostLikely),
      PERT: "",
    }));

    const totalRow = {
      任務名稱: "總和",
      常規预估: sumOfMostLikelyHours,
      樂觀乘數: sumOfOptimisticHours,
      悲觀乘数: sumOfPessimisticHours,
      PERT: expectedHours,
    };

    const dueRow = {
      任務名稱: "到期日",
      常規预估: regularDueDate,
      樂觀乘數: optimisticDueDate,
      悲觀乘数: pessimisticDueDate,
      PERT: dueDate,
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
