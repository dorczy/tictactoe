const rows = 3;
const cols = 3;
let matrix;
let stepCount = 0;
let mark = 'X';


const startGame = () => {
    initState();
    addClickListener();
    newGame();
}

const initState = () => {
    stepCount = 0;
    matrix = Array(cols).fill(null).map(() => Array(rows).fill(null))
}

const addClickListener = () => {
    document
        .querySelectorAll('.tictactoe__cell')
        .forEach(element => {
            element.addEventListener('click', handleClick)
        });
}

    const handleClick = (event) => {
        increaseCounter();
        modifyCell(event.target);
        setMark();
        setMessage(mark + ' lép!');
        changeMatrixValue(event.target);
        checkWinner();
    }

        const increaseCounter = () => {
            stepCount += 1;
        }

        const modifyCell = (element) => {
            element.textContent = mark;
            element.removeEventListener('click', handleClick);
        }

        const setMark = () => {
            mark = mark === 'X' ? 'O' : 'X';
        }

        const changeMatrixValue = (element) => {
            const row = parseInt(element.dataset.row, 10);
            const cell = parseInt(element.dataset.cell, 10);
            matrix[row][cell] = element.textContent;
        }

        const checkWinner = () => {
            console.log(checkColumnValues(), checkDiagonalValues());
            console.log(stepCount);
            if (checkValues(matrix) || checkColumnValues() || checkDiagonalValues()) {
                endGame();
            }
            if (stepCount == 9)  {
                drawGame()
            }
        }

            const checkValues = (arr) => arr.map(row =>
                row.every((value) => value === 'X') ||
                row.every((value) => value === 'O'))
                .indexOf(true) !== -1;

            const checkColumnValues = () =>
                checkValues(matrix.map((arr, i) => arr.map((item, j) => matrix[j][i])))

            const checkDiagonalValues = () =>
                checkValues([
                    matrix.map((arr, i) => matrix[i][i]),
                    matrix.map((arr, i) => matrix[i][matrix[i].length - i - 1])
                ])

            const endGame = () => {
                setMessage('Nyertes: ' + (mark === 'X' ? 'O' : 'X'));
                removeAllClickListener();
            }

            const drawGame = () => {
                setMessage('Döntetlen!');
                removeAllClickListener();
            }

                const removeAllClickListener = () => {
                    document.querySelectorAll('.tictactoe__cell')
                        .forEach(element => {
                            element.removeEventListener('click', handleClick)
                        });
                }
            


const newGame = () => {
    setMessage(mark + ' lép!');
    document
        .querySelector('.new-game')
        .addEventListener('click', () => {
            initState();
            addClickListener();
            deleteSigns();
            // setMessage('');
            console.log(mark);
            setMark();
            setMessage(mark + ' lép!');
        })
}

/*  const initState = () => {
        matrix = Array(cols).fill(null).map(() => Array(rows).fill(null))
    } */

/*  const addClickListener = () => {
        document
            .querySelectorAll('.tictactoe__cell')
            .forEach(element => {
                element.addEventListener('click', handleClick)
            });
    }

        const handleClick = (event) => {
            increaseCounter();
            modifyCell(event.target);
            setMark();
            changeMatrixValue(event.target);
            checkWinner();
        }

            const increaseCounter = () => {
                stepCount += 1;
            }

            const modifyCell = (element) => {
                element.textContent = mark;
                element.removeEventListener('click', handleClick);
            }

            const setMark = () => {
                mark = mark === 'X' ? 'O' : 'X';
            }

            const changeMatrixValue = (element) => {
                const row = parseInt(element.dataset.row, 10);
                const cell = parseInt(element.dataset.cell, 10);
                matrix[row][cell] = element.textContent;
            }

            const checkWinner = () => {
                console.log(checkColumnValues(), checkDiagonalValues());
                if (checkValues(matrix) || checkColumnValues() || checkDiagonalValues()) {
                    endGame();
                }
            }

                const checkValues = (arr) => arr.map(row =>
                    row.every((value) => value === 'X') ||
                    row.every((value) => value === 'O'))
                    .indexOf(true) !== -1;

                const checkColumnValues = () =>
                    checkValues(matrix.map((arr, i) => arr.map((item, j) => matrix[j][i])))

                const checkDiagonalValues = () =>
                    checkValues([
                        matrix.map((arr, i) => matrix[i][i]),
                        matrix.map((arr, i) => matrix[i][matrix[i].length - i - 1])
                    ]) 

                const endGame = () => {
                setMessage('Nyertes: ' + (mark === 'X' ? 'O' : 'X'));
                removeAllClickListener();
            }

                    const removeAllClickListener = () => {
                        document.querySelectorAll('.tictactoe__cell')
                            .forEach(element => {
                                element.removeEventListener('click', handleClick)
                            });
                }*/

    const deleteSigns = () => {
        document
            .querySelectorAll('.tictactoe__cell')
            .forEach(element => {
                element.textContent = ' ';
            });
}

    const setMessage = (message) => {
        document
            .querySelector('.winnerOutput')
            .textContent = message
    }

/*  const setMark = () => {
        mark = mark === 'X' ? 'O' : 'X';
    } */


startGame();