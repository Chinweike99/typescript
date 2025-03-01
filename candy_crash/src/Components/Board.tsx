import React, { useEffect, useState } from 'react'
import { generateBoard } from '../utils/boardSetup'
import Candy from './Candy';

function Board() {

    const [board, setBoard] = useState<string[][]>(generateBoard());


    useEffect(() =>{
        console.log(board);
    }, [board])

  return (
    <div>
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
  )
}

export default Board