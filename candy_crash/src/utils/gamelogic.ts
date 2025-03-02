export function checkMatches(board: string[][]): boolean {
    let matches = false;

    for(let row = 0; row < board.length; row++){
        for (let col = 0; col < board[row].length-2; col++){
            if (
                board[row][col] &&
                board[row][col] === board[row][col + 1] && 
                board[row][col] === board[row][col + 2]
            ){
                console.log(`Match found at (${row}, ${col})`);
                matches = true
            }
        }
    }

    //Check for Vertical matches
    for(let col = 0; col < board.length; col++){
        for(let row = 0; row < board[col].length - 2; row++){
            if(
                board[row][col] &&
                board[row][col] === board[row + 1][col] &&
                board[row][col] === board[row + 2][col]
            ){
                console.log(`Match found at ${row}, ${col}`);
                matches = true
            }
        }
    }
    return matches;
}



//Swapp colors
export function Swappcandies(
    board: string[][],
    row1: number,
    row2: number,
    col1: number,
    col2: number
): string[][]{
    const newBoard= board.map(row => [...row]);
    [newBoard[row1][col1], newBoard[row2][col2]] = [newBoard[row2][col2], newBoard[row1][col1]];
    return newBoard;
}