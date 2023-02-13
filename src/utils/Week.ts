function weekDelimiters(): {
  firstDateOfTheWeek: Date;
  lastDateOfTheWeek: Date;
} {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const firstDayOfTheWeek = today.getDate() - today.getDay();

  const firstDateOfTheWeek = new Date(todayYear, todayMonth, firstDayOfTheWeek);

  const lastDateOfTheWeek = new Date(
    todayYear,
    todayMonth,
    firstDayOfTheWeek + 7
  );

  lastDateOfTheWeek.setTime(lastDateOfTheWeek.getTime() - 1);

  return { firstDateOfTheWeek, lastDateOfTheWeek };
}

export function isFromCurrentWeek(date: Date) {
  const { firstDateOfTheWeek, lastDateOfTheWeek } = weekDelimiters();
  return date >= firstDateOfTheWeek && date <= lastDateOfTheWeek;
}
