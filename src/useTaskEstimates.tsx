import { useMemo } from "react";
import { calculateDueDateExcludingWeekends } from "./helper";

const useTaskEstimates = (tasks: Task[], startDate: Date) => {
  const sumOfMostLikelyHours = useMemo(() => {
    return tasks.reduce((sum, task) => {
      return sum + task.mostLikely;
    }, 0);
  }, [tasks]);

  const sumOfOptimisticHours = useMemo(() => {
    return Math.ceil(
      tasks.reduce((sum, task) => {
        return sum + Math.ceil(task.mostLikely * task.optimisticMultiplier);
      }, 0)
    );
  }, [tasks]);

  const sumOfPessimisticHours = useMemo(() => {
    return Math.ceil(
      tasks.reduce((sum, task) => {
        return sum + Math.ceil(task.mostLikely * task.pessimisticMultiplier);
      }, 0)
    );
  }, [tasks]);

  const expectedHours = useMemo(() => {
    return Math.ceil(
      (sumOfOptimisticHours +
        sumOfMostLikelyHours * 4 +
        sumOfPessimisticHours) /
        6
    );
  }, [sumOfMostLikelyHours, sumOfOptimisticHours, sumOfPessimisticHours]);

  const delayHours = useMemo(() => {
    return Math.ceil((sumOfPessimisticHours - sumOfOptimisticHours) / 6);
  }, [sumOfOptimisticHours, sumOfPessimisticHours]);

  // 計算到期日
  const regularDueDate = useMemo(
    () =>
      startDate
        ? calculateDueDateExcludingWeekends(startDate, sumOfMostLikelyHours)
        : "",
    [startDate, sumOfMostLikelyHours]
  );

  const optimisticDueDate = useMemo(
    () =>
      startDate
        ? calculateDueDateExcludingWeekends(startDate, sumOfOptimisticHours)
        : "",
    [startDate, sumOfOptimisticHours]
  );

  const pessimisticDueDate = useMemo(
    () =>
      startDate
        ? calculateDueDateExcludingWeekends(startDate, sumOfPessimisticHours)
        : "",
    [startDate, sumOfPessimisticHours]
  );

  const dueDate = useMemo(
    () =>
      startDate
        ? calculateDueDateExcludingWeekends(startDate, expectedHours)
        : "",
    [startDate, expectedHours]
  );

  const delayDate = useMemo(
    () =>
      startDate
        ? calculateDueDateExcludingWeekends(
            startDate,
            expectedHours + delayHours
          )
        : "",
    [startDate, delayHours]
  );

  return {
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
  };
};

export default useTaskEstimates;
