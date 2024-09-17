import { ChessPiece } from "./components/ChessPiece";

export default function App() {
  const rows = [];
  for (let i = 0; i < 8; i++) {
    const spaces = [];
    for (let j = 0; j < 8; j++) {
      const isWhite = (i + j) % 2 === 0 ? true : false;
      spaces.push(
        <div
          key={`row${8 - i}column${j + 1}`}
          className={`w-[12.5%] h-full ${
            isWhite ? "bg-[#E0D6C8]" : "bg-gray-800"
          }`}
        ></div>
      );
    }
    const row = (
      <div key={`row${8 - i}`} className="flex w-full h-[12.5%]">
        {spaces}
      </div>
    );
    rows.push(row);
  }
  return (
    <div className="flex justify-center">
      <div className="w-[35px] md:w-[75px] h-[280px] md:h-[600px]"></div>
      <div className="relative w-[280px] md:w-[600px] h-[280px] md:h-[600px]">
        {rows}
        <ChessPiece
          position={{
            x: 2,
            y: 1,
          }}
          color={"white"}
          startType={"knight"}
        />
      </div>
      <div className="w-[35px] md:w-[75px] h-[280px] md:h-[600px]"></div>
    </div>
  );
}
