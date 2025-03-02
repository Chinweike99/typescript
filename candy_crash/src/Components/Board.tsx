import React, { useEffect, useState } from 'react'
import { generateBoard } from '../utils/boardSetup'
import Candy from './Candy';
import { checkMatches, Swappcandies } from '../utils/gamelogic';

function Board() {

    const [board, setBoard] = useState<string[][]>(generateBoard());
    const [draggedCandy, setDraggedCandy] = useState<{row: number; col: number} | null>(null)


    useEffect(() =>{
        console.log(board);
        console.log(checkMatches(board))
    }, [board])


    const handleDragStart = (row: number, col: number) =>{
        setDraggedCandy({row, col})
    }

    //Prevent Default behaviour
    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    }

    const handleDrop = (row: number, col: number)=>{
        if(draggedCandy){
            // const newBoard = Swappcandies(board, draggedCandy.row, row, draggedCandy.col, col);
            // setBoard(newBoard);
            // setDraggedCandy(null);
            const { row: draggedRow, col: draggedCol} = draggedCandy;

            const isAdjacent =
            (draggedRow === row && Math.abs(draggedCol - col) === 1) ||
            (draggedCol === col && Math.abs(draggedRow - row) === 1 );

            if(isAdjacent){
                 const newBoard = Swappcandies(board, draggedRow, row, draggedCol, col);
                 setBoard(newBoard);
            }
        } 
        setDraggedCandy(null);
    };





  return (
    <div className='flex flex-col items-center bg-amber-200 p-10'>
        <div className='max-w-[150rem]  grid grid-cols-8 gap-1 bg-gray-300 rounded-lg p-5'>
        {board.map((row, rowIndex) => {
            return(
                row.map((candy, colIndex) => {
                    return (
                        <Candy key={`${rowIndex}-${colIndex}`}
                         color={candy} row={rowIndex} col={colIndex}
                         onDragStart={handleDragStart}
                         onDrop={handleDrop}
                         onDragOver={handleDragOver}
                         />
                    )
                })
            )
        })}
    </div>
    </div>
  )
}

export default Board