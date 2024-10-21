type Task = {
  id: string;
  name: string;
  mostLikely: number;
  optimisticMultiplier: number;
  pessimisticMultiplier: number;
};
// type InputTask = Task & {
//   mostLikelyInput: string; // 添加一個新的屬性來表示用戶輸入
// };

type InputTask = Omit<Task, "id" | "mostLikely"> & {
  id: string | null;
  mostLikely: string; // 覆蓋為 string
};

type TaskSingleKeyValue = {
  [K in keyof Task]: { [P in K]: Task[K] };
}[keyof Task];

type TaskAction =
  | { type: "updateName"; payload: string }
  | { type: "updateMostLikely"; payload: string }
  | { type: "updateOptimistic"; payload: number }
  | { type: "updatePessimistic"; payload: number }
  | { type: "reset" };

type Plan = {
  id: string;
  name: string;
  tasks: Task[];
};
