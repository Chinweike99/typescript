// Board.tsx
import React, { useEffect, useState } from 'react'
import { generateBoard } from '../utils/boardSetup'
import Candy from './Candy';
import { checkMatches, Swappcandies } from '../utils/gamelogic';
import {motion} from 'framer-motion'

function Board() {

    const [board, setBoard] = useState<string[][]>(generateBoard());
    const [draggedCandy, setDraggedCandy] = useState<{row: number; col: number} | null>(null)
    const [status, setStatus] = useState<string>("")
    const [score, setScore] = useState<number>(0);
    const [showCrushMessage, setCrushedMessage] = useState(false);
    const [crushedCandies, setCrushedCandies] = useState<number [][]>([])


    useEffect(() =>{
        console.log(board);
        const { crashedCount } = checkMatches(board);
        if (crashedCount > 0) {
            handleMatches();
        }
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
            const { row: draggedRow, col: draggedCol} = draggedCandy;

            const isAdjacent =
            (draggedRow === row && Math.abs(draggedCol - col) === 1) ||
            (draggedCol === col && Math.abs(draggedRow - row) === 1 );

            if(isAdjacent){
                 let newBoard = Swappcandies(board, draggedRow, row, draggedCol, col);
                 setBoard(newBoard);
                 
                 // Check for matches after the swap
                 const { crashedCount } = checkMatches(newBoard);
                 if (crashedCount > 0) {
                     // If matches are found, handle them
                     setTimeout(() => handleMatches(), 100);
                 }
            }
        } 
        setDraggedCandy(null);
    };


    const handleMatches = () => {
        const {newBoard, crashedPositions, crashedCount} = checkMatches(board);

        if(crashedCount > 0) {
            setScore(prev => prev + crashedCount);
            setCrushedMessage(true);
            setCrushedCandies(crashedPositions);
            
            setTimeout(() =>{
                setBoard(newBoard);
                setCrushedCandies([]);
            }, 500)

            setTimeout(() =>{
                setCrushedMessage(false);
            }, 2000)
            
            setStatus("You're a champion");
        }
    }



  return (
    <div className='flex flex-col items-center bg-amber-200 p-10'>
        <h1 className='text-3xl py-4'>
            score: {score}
            <p>{status}</p>
        </h1>


        {
            showCrushMessage && (
                <motion.div
                className='text-lg font-semibold text-green-600'
                initial={{opacity: 0, y: -10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0}}
                transition={{duration: 0.8}}
                >
                    You are a big time crusher 🥳🙌
                </motion.div>
            )
        }


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
                         isCrushed={crushedCandies.some(([r, c]) => r === rowIndex && c === colIndex)}
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
