const rooms = [
  { room: 1, rows: 5, cols: 10, coupleStart: 6 }, // 5 hàng, 10 ghế, 5 ghế cuối là couple
  { room: 2, rows: 4, cols: 15, coupleStart: 12 }, // 4 hàng, 15 ghế, 4 ghế cuối là couple
  { room: 3, rows: 5, cols: 7 }, // 5 hàng, 7 ghế, không có couple
  { room: 4, rows: 5, cols: 10, coupleStart: 1 }, // 5 hàng, 10 ghế, tất cả là couple
  { room: 5, rows: 4, cols: 5, coupleStart: 1 }, // 4 hàng, 5 ghế, tất cả là couple
];
const generateSeats = () => {
  const seatInRoom = [];

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  rooms.forEach(({ room, rows: rowCount, cols, coupleStart }) => {
    for (let i = 0; i < rowCount; i++) {
      const row = rows[i];

      for (let j = 1; j <= cols; j++) {
        const col = j < 10 ? "0" + j : String(j);
        const type =
          coupleStart && j >= coupleStart
            ? "couple"
            : "single";

        seatInRoom.push({
          room,
          row,
          col,
          type,
          isBooked: Math.random() < 0.2, // Randomize isBooked to be true or false
        });
      }
    }
  });

  return seatInRoom;
};

const seatInRoom = generateSeats();

const roomDetail = [
  {
    id: 1,
    rows: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"],
    cols: [10, 10, 10, 10, 10, 10, 10, 10, 10, 5],
  },
  {
    id: 2,
    rows: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"],
    cols: [10, 10, 10, 10, 10, 10, 10, 10, 10, 6],
  },
  {
    id: 3,
    rows: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"],
    cols: [10, 10, 10, 10, 10, 10, 10, 10, 10, 7],
  },
  {
    id: 4,
    rows: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"],
    cols: [10, 10, 10, 10, 10, 10, 10, 10, 10, 8],
  },
  {
    id: 5,
    rows: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"],
    cols: [10, 10, 10, 10, 10, 10, 10, 10, 10, 9],
  },
];

export { rooms , seatInRoom, roomDetail };
