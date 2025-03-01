import React from "react";

interface CandyProps{
    color: string;
    row: number;
    col: number;
}

const Candy: React.FC<CandyProps> = ({color, row, col}) =>{
    return (
        <div
        className={`w-10 h-10 rounded-full ${color}-500`}
        data-row={row}
        data-col={col}
        >
           
        </div>
    )
}

export default Candy;