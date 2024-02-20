function isWithinDateRange(startDate, endDate) {
  const currentDate = new Date();
  return currentDate >= new Date(startDate) && currentDate <= new Date(endDate);
}

module.exports = isWithinDateRange;
