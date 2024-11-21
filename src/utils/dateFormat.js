// Ngày trong tuần
const days = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const formatTime = (dateString) =>
  new Date(dateString).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

const convertToDow = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  return days[new Date(year, month - 1, day).getDay()];
};

const formattedSchedule = (filmSchedule) => {
    const groupByDate = filmSchedule.reduce((acc, item) => {
      const date = formatDate(item.showTime);
      const time = formatTime(item.showTime);
      if (!acc[date]) acc[date] = [];
      acc[date].push({ ...item, showTime: time });
      return acc;
    }, {});
    return groupByDate;
  };

export { formatDate, formatTime, convertToDow, formattedSchedule };
