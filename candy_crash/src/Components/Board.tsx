import React, { useEffect, useState } from 'react'
import { generateBoard } from '../utils/boardSetup'
import Candy from './Candy';

function Board() {

    const [board, setBoard] = useState<string[][]>(generateBoard());


    useEffect(() =>{
        console.log(board);
    }, [board])

  return (
    <div className='flex flex-col items-center bg-amber-200 p-10'>
        <div className='max-w-[150rem]  grid grid-cols-8 gap-1 bg-gray-300 rounded-lg p-5'>
        {board.map((row, rowIndex) => {
            return(
                row.map((candy, colIndex) => {
                    return (
                        <Candy key={`${rowIndex}-${colIndex}`} color={candy} row={rowIndex} col={colIndex}/>
                    )
                })
            )
        })}
    </div>
    </div>
  )
}

export default Board