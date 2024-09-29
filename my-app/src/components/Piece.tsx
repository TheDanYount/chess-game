import { Icon } from "./Tile.tsx";

type Props = {
  color: string;
  type: string;
};

export function Piece({ color, type }: Props) {
  return (
    <div
      className={`w-[35px] md:w-[75px] h-[35px] md:h-[75px] flex
        justify-center items-center my-[-10.5px] md:my-[-22.5px]`}
    >
      <Icon color={color} type={type} />
    </div>
  );
}
