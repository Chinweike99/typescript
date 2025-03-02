import React from "react";
import {motion} from 'framer-motion'


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
    isCrushed: boolean;
}

const Candy: React.FC<CandyProps> = ({color, row, col, onDragStart, onDrop, onDragOver, isCrushed}) =>{
    return (
        <div className="border-1 border-gray-400 rounded p-1">
            <motion.div
        className={`w-10 h-10 rounded  cursor-pointer ${colorClassess[color] || "bg-white-700"}`}
        data-row={row}
        data-col={col}
        draggable
        onDragStart={()=>onDragStart(row, col)}
        onDrop={()=>onDrop(row, col)}
        onDragOver={onDragOver}
        animate={isCrushed ?{rotate: [0, 5, -5, 5, -5, 0]} : {}}
        transition={isCrushed ? {duration: 0.5, repeat: 2} : {}}
        initial={{y: 0, opacity: 1}}
    
        >
        </motion.div>
        </div>
    )
}

export default Candy;