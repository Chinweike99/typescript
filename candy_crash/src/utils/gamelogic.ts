const candyColors = ["red", "blue", "green", "yellow", "purple", "blue", "black", "amber"];


export function checkMatches(board: string[][]): string[][] {
    const newBoard = board.map(row => [...row]);
    let matchesFound = false;

    for(let row = 0; row < board.length; row++){
        for (let col = 0; col < board[row].length-2; col++){
            if (
                newBoard[row][col] &&
                newBoard[row][col] === board[row][col + 1] && 
                newBoard[row][col] === board[row][col + 2]
            ){
                console.log(`Match found at (${row}, ${col})`);
                newBoard[row][col] = "";
                newBoard[row][col + 1] = "";
                newBoard[row][col + 2] = "";
                matchesFound = true
            }
        }
    }

    //Check for Vertical matches
    for(let col = 0; col < board.length; col++){
        for(let row = 0; row < board[col].length - 2; row++){
            if(
                newBoard[row][col] &&
                newBoard[row][col] === board[row + 1][col] &&
                newBoard[row][col] === board[row + 2][col]
            ){
                console.log(`Match was been discovered at ${row}, ${col}`);
                newBoard[row][col] = "";
                newBoard[row + 1][col] = "";
                newBoard[row + 2][col] = "";
                matchesFound = true
            }
        }
    }
    if(matchesFound){
        return dropCandies(newBoard);
    }

    return newBoard;
}

function displayMood(): string{
    return ("You are a crusher 😂")
}


// Function to drop candies
function dropCandies(board: string[][]): string[][]{
    let newBoard = board.map(row=> [...row]);

    for (let col = 0; col < newBoard[0].length; col++){
        let emptySpaces = 0;
        for(let row = newBoard.length - 1; row >=0; row--){
            if(newBoard[row][col] === ""){
                emptySpaces++;
            }else if(emptySpaces > 0){
                newBoard[row + emptySpaces][col] = newBoard[row][col];
                newBoard[row][col] = "";
            }
        }

        for (let row = 0; row < emptySpaces; row++){
            newBoard[row][col] = candyColors[Math.floor(Math.random() * candyColors.length)]
        }
    }

    return newBoard;
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