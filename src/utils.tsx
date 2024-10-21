function getPlans(): Plan[] {
  const plans = localStorage.getItem("plans");
  return plans ? JSON.parse(plans) : [];
}

function savePlans(plans: Plan[]) {
  localStorage.setItem("plans", JSON.stringify(plans));
}

export { getPlans, savePlans };
