import { v4 as uuidv4 } from "uuid";

const taskReducer = (state: InputTask | Task, action: TaskAction) => {
  switch (action.type) {
    case "updateName":
      return {
        ...state,
        name: action.payload,
      };
    case "updateMostLikely":
      const payload = action.payload;
      return {
        ...state,
        mostLikely: payload,
      };
    case "updateOptimistic":
      return { ...state, optimisticMultiplier: action.payload };
    case "updatePessimistic":
      return { ...state, pessimisticMultiplier: action.payload };
    case "reset":
      return {
        id: uuidv4(),
        name: "",
        mostLikely: "",
        optimisticMultiplier: 0.8,
        pessimisticMultiplier: 1.5,
      };
    default:
      throw "action error";
  }
};

export { taskReducer };
