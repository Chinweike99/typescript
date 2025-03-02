/**
 * generateBoard: Function that creates the grid
 */

const boardSize = 8;
const candyColors = ["red", "blue", "green", "yellow", "purple", "blue", "black", "amber"];

export function generateBoard(boardSize: number): string[][]{
    return Array.from({length: boardSize}, ()=>
    Array.from({length: boardSize}, ()=>
        candyColors[Math.floor(Math.random() * candyColors.length)]
        )
    )
}