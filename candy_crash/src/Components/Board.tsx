// Board.tsx
import React, { useEffect, useState } from 'react'
import { generateBoard } from '../utils/boardSetup'
import Candy from './Candy';
import { checkMatches, Swappcandies } from '../utils/gamelogic';
import {motion} from 'framer-motion'

function Board() {
    const [boardSize, setBoardSize] = useState(window.innerWidth < 640 ? 4 : 8); 
    const [board, setBoard] = useState<string[][]>(generateBoard(boardSize));
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

    useEffect(() =>{
        const handleResize = () =>{
            setBoardSize(window.innerWidth < 640 ? 4 : 8);
            setBoard(generateBoard(window.innerWidth < 640 ? 4 : 8))
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    })


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


    // const handleMatches = () => {
    //     const {newBoard, crashedPositions, crashedCount} = checkMatches(board);

    //     if(crashedCount > 0) {
    //         setScore(prev => prev + crashedCount);
    //         setCrushedMessage(true);
    //         setCrushedCandies(crashedPositions);
            
    //         setTimeout(() =>{
    //             setBoard(newBoard);
    //             setCrushedCandies([]);
    //         }, 500)

    //         setTimeout(() =>{
    //             setCrushedMessage(false);
    //         }, 2000)
            
    //         setStatus("You're a champion");
    //     }
    // }

    const handleMatches = () => {
        const {newBoard, crashedPositions, crashedCount} = checkMatches(board);

        if(crashedCount > 0) {
            // Update score by the actual number of crashed candies
            setScore(prev => prev + crashedPositions.length);
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
    <div className='relative flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-500  w-full p-16 '>
        <h1 className='text-4xl py-4 font-bold'>
            score: {score}
        </h1>


        {
            showCrushMessage && (
                <motion.div
                className='absolute top-5 text-lg font-semibold text-green-600 border-2 p-2 bg-white '
                initial={{opacity: 0, y: -10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0}}
                transition={{duration: 0.8}}
                >
                    You are a big time crusher 🥳🙌
                </motion.div>
            )
        }


        <div className='mt-5 grid grid-cols-4 lg:grid-cols-8 gap-1 sm:grid-cols-6 bg-gray-300 rounded-lg p-5'>
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
