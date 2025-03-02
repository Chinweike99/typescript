import React from "react";

const colorClassess: Record<string, string> = {
    red: "bg-red-700",
    blue: "bg-blue-700",
    green: "bg-green-700",
    yellow: "bg-yellow-700",
    purple: "bg-purple-700",
    amber: "bg-amber-700",
    black: "bg-gray-700",
};


interface CandyProps{
    color: string;
    row: number;
    col: number;
}

const Candy: React.FC<CandyProps> = ({color, row, col}) =>{
    return (
        <div
        className={`w-10 h-10 rounded-full cursor-pointer ${colorClassess[color] || "bg-white-700"}`}
        data-row={row}
        data-col={col}
        >
        
        </div>
    )
}

export default Candy;