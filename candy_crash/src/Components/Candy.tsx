import React from "react";

const colorClassess: Record<string, string> = {
    red: "bg-red-700",
    blue: "bg-blue-700",
    green: "bg-green-700",
    yellow: "bg-yellow-500",
    purple: "bg-purple-700",
    amber: "bg-amber-700",
    black: "bg-gray-700",
};


interface CandyProps{
    color: string;
    row: number;
    col: number;
    onDragStart: (row: number, col: number) => void;
    onDrop: (row: number, col: number) => void;
    onDragOver: (event: React.DragEvent) => void;
}

const Candy: React.FC<CandyProps> = ({color, row, col, onDragStart, onDrop, onDragOver}) =>{
    return (
        <div className="border-1 border-gray-400 rounded p-1">
            <div
        className={`w-10 h-10 rounded  cursor-pointer ${colorClassess[color] || "bg-white-700"}`}
        data-row={row}
        data-col={col}
        draggable
        onDragStart={()=>onDragStart(row, col)}
        onDrop={()=>onDrop(row, col)}
        onDragOver={onDragOver}
        >
        </div>
        </div>
    )
}

export default Candy;