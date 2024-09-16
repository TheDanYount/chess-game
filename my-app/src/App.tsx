// eslint-disable no-unused-vars
const tailwindClasses = [""]; //placeholder

export default function App() {
  const rows = [];
  for (let i = 0; i < 8; i++) {
    const spaces = [];
    for (let j = 0; j < 8; j++) {
      const isWhite = (i + j) % 2 === 0 ? true : false;
      spaces.push(
        <div
          key={`row${8 - i}column${j + 1}`}
          className={`w-[12.5%] h-full ${isWhite ? "" : "bg-gray-800"}`}
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
      <div className="w-[35px] lg:w-[75px] h-[280px] lg:h-[600px]"></div>
      <div className="w-[280px] lg:w-[600px] h-[280px] lg:h-[600px]">
        {rows}
      </div>
      <div className="w-[35px] lg:w-[75px] h-[280px] lg:h-[600px]"></div>
    </div>
  );
}
