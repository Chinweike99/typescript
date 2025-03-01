import React, { useEffect, useState } from 'react'
import { generateBoard } from '../utils/boardSetup'

function Board() {

    const [board, setBoard] = useState<string[][]>(generateBoard());


    useEffect(() =>{
        console.log(board);
    }, [board])

  return (
    <div>Board</div>
  )
}

export default Board