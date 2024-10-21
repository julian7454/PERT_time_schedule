function calculateDueDateExcludingWeekends(
  startDate: Date, // 接收 string 類型的日期
  hours: number
): string {
  let remainingHours = hours;
  let currentDate = new Date(startDate); // 將傳入的 string 轉換為 Date

  while (remainingHours > 0) {
    const dayOfWeek = currentDate.getDay(); // 0 是周日, 6 是周六

    // 如果是週末，就跳到下個星期一
    if (dayOfWeek === 6) {
      // 如果是週六，跳到星期一
      currentDate.setDate(currentDate.getDate() + 2);
    } else if (dayOfWeek === 0) {
      // 如果是週日，跳到星期一
      currentDate.setDate(currentDate.getDate() + 1);
    } else {
      // 如果是工作日，扣除一天的工作時間 (假設每天工作 8 小時)
      const workHoursInADay = 8;
      if (remainingHours >= workHoursInADay) {
        remainingHours -= workHoursInADay;
        currentDate.setDate(currentDate.getDate() + 1);
      } else {
        // 如果剩下的時間不足一整天，直接將剩餘時間加到當前日期
        currentDate.setHours(currentDate.getHours() + remainingHours);
        remainingHours = 0;
      }
    }
  }

  return currentDate.toISOString().split("T")[0];
}

export { calculateDueDateExcludingWeekends };
