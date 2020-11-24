// maga a mátrix, egyelőre csak egy üres tömb
const matrix = [];
// sorok és oszlopok száma, hátha nem négyzetes
const rows = 3;
const cols = 3;
// lépések száma
let stepCount = 0;
// az aktuális jel
let mark = 'X';

// csak feltöltöm a mátrixot (valójában opcionális lépés is lehet)
const initState = () => {
    // ehelyett a fill metódussal szebb lenne
    for (let i = 0; i < rows; i += 1) {
        matrix[i] = [];
        for (let j = 0; j < cols; j += 1) {
            matrix[i][j] = null;
        }
    }
}

// a mátrix egy elemének értéket adok, az adott elem data attribútumait felhasználva nyerem ki az értéket
const changeMatrixValue = (element) => {
    // element.dataset.cell = element.getAttribute('data-cell'))
    const row = parseInt(element.dataset.row, 10);
    const cell = parseInt(element.dataset.cell, 10);
    matrix[row][cell] = element.textContent;
}

const increaseCounter = () => {
    stepCount += 1;
}

const modifyCell = (element) => {
    element.removeEventListener('click', handleClick);
    element.textContent = mark;
}

const setMark = () => {
    mark = mark === 'X' ? 'O' : 'X';
}

// kattintáskor mi történjen, érdemes lenne több függvényre bontani
const handleClick = (event) => {
    increaseCounter();
    modifyCell(event.target);
    setMark();
    changeMatrixValue(event.target);
    checkWinner();
}

// minden elemhez hozzáadom az eseményfigyelőt
const addListener = () => {
    document.querySelectorAll('.tictactoe__cell').forEach(element => {
        element.addEventListener('click', handleClick)
    });
}

// ha van győztes minden elemről eltávolítom az eseményfigyelőt
const removeListener = () => {
    document.querySelectorAll('.tictactoe__cell').forEach(element => {
        element.removeListener('click', handleClick)
    });
}

// megnézem hogy van-e olyan sor, ahol minden elem ugyanaz
const checkRowValues = () => {
    const values = matrix.map(row =>
        row.every((value) => value === 'X') ||
        row.every((value) => value === 'O'))
    return values.indexOf(true) !== -1 ? true : false;
}

// Megnézem hogy van e olyan oszlop, ahol minden elem ugyanaz
// TODO: Meg kell írnod, boolean-t adjon vissza
const checkColumnValues = () => { 
    return  ((matrix[0][0] === 'O' && matrix[1][0] === 'O' && matrix[2][0] === 'O') ||
    (matrix[0][1] === 'O' && matrix[1][1] === 'O' && matrix[2][1] === 'O') ||
    (matrix[0][2] === 'O' && matrix[1][2] === 'O' && matrix[2][2] === 'O')) ||
    ((matrix[0][0] === 'X' && matrix[1][0] === 'X'  && matrix[2][0] === 'X') ||
    (matrix[0][1] === 'X'  && matrix[1][1] === 'X'  && matrix[2][1] === 'X') ||
    (matrix[0][2] === 'X'  && matrix[1][2] === 'X'  && matrix[2][2] === 'X')) ? true : false; 
}

const dataPrice = Array.from(document.querySelectorAll('.tictactoe__cell[data-cell]'));
console.log(dataPrice);



// Megnézem hogy van e olyan átló, ahol minden elem ugyanaz
// TODO: Meg kell írnod, boolean-t adjon vissza
const checkDiagonalValues = () => { 
    return ((matrix[0][0] === 'X'  && matrix[1][1] === 'X'  && matrix[2][2] === 'X') ||
    (matrix[0][2] === 'X' && matrix[1][1] === 'X' && matrix[2][0] === 'X')) ||
    ((matrix[0][0] === 'O' && matrix[1][1] === 'O' && matrix[2][2] === 'O') ||
    (matrix[0][2] === 'O' && matrix[1][1] === 'O' && matrix[2][0] === 'O')) ? true : false;
}


// TODO: Meg kell írnod, nincs befejezve
const checkWinner = () => {
    // Akár a checkRowValues, checkColumnValues, checkDiagonalValues true, akkor van győztes
    (checkRowValues === true || checkColumnValues === true || checkDiagonalValues === true) ? console.log('Nyertél!') : '-';

    /* Csak azért van itt a log hogy lássátok, hogy true akkor lesz, ha van olyan sor, ahol minden 
    elem ugyanaz */
    console.log(checkRowValues());
    console.log(checkColumnValues());
    console.log(checkDiagonalValues());
}

initState();
addListener();