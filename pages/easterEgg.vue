<script setup lang="ts">
import {ref, onMounted} from 'vue'

const cells = ref<NodeListOf<Element>>()
const titleHeader = ref<HTMLElement | null>(null)
const xPlayerDisplay = ref<HTMLElement | null>(null)
const oPlayerDisplay = ref<HTMLElement | null>(null)
const restartBtn = ref<HTMLElement | null>(null)

// Initialize variables for the game
let player = 'X'
let isPauseGame = false
let isGameStart = false

// Array of win conditions
const inputCells = ref(['', '', '', '', '', '', '', '', ''])

// Array of win conditions
const winConditions: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
]

// Functions
function tapCell(cell: Element, index: number) {
    // Ensure cell is empty and game isn't paused
    if (cell.textContent == '' && !isPauseGame) {
        isGameStart = true
        updateCell(cell, index)

        // Do a random pick if there are no results
        if (!checkWinner()) {
            changePlayer()
            randomPick()
        }
    }
}

function updateCell(cell: Element, index: number) {
    cell.textContent = player
    inputCells.value[index] = player
    cell.setAttribute('style', `color: ${player == 'X' ? '#1892EA' : '#A737FF'}`)
}

function changePlayer() {
    player = player == 'X' ? 'O' : 'X'
}

function randomPick() {
    // Pause the game to allow Computer to pick
    isPauseGame = true

    setTimeout(() => {
        let randomIndex: number
        do {
            // Pick a random index
            randomIndex = Math.floor(Math.random() * inputCells.value.length)
        } while (inputCells.value[randomIndex] != '')

        // Update the cell with Computer move
        updateCell(cells.value![randomIndex], randomIndex)
        // Check if Computer not won
        if (!checkWinner()) {
            changePlayer()
            // Switch back to Human player
            isPauseGame = false
            return
        }
        player = player == 'X' ? 'O' : 'X'
    }, 1000) // Delay Computer move by 1 second
}

function checkWinner(): boolean {
    for (const [a, b, c] of winConditions) {
        // Check each winning condition
        if (
            inputCells.value[a] == player &&
            inputCells.value[b] == player &&
            inputCells.value[c] == player
        ) {
            declareWinner([a, b, c])
            return true
        }
    }

    // Check for a draw (if all cells are filled)
    if (inputCells.value.every((cell) => cell != '')) {
        declareDraw()
        return true
    }
    return false
}

function declareWinner(winningIndices: number[]) {
    if (titleHeader.value) titleHeader.value.textContent = `${player} Win`
    isPauseGame = true

    // Highlight winning cells
    winningIndices.forEach((index) => {
        cells.value![index].setAttribute('style', 'background: #2A2343')
    })

    if (restartBtn.value) restartBtn.value.style.visibility = 'visible'
}

function declareDraw() {
    if (titleHeader.value) titleHeader.value.textContent = 'Draw!'
    isPauseGame = true
    if (restartBtn.value) restartBtn.value.style.visibility = 'visible'
}

function choosePlayer(selectedPlayer: 'X' | 'O') {
    // Ensure the game hasn't started
    if (!isGameStart) {
        // Override the selected player value
        player = selectedPlayer
        if (player == 'X') {
            // Highlight X display
            xPlayerDisplay.value?.classList.add('player-active')
            oPlayerDisplay.value?.classList.remove('player-active')
        } else {
            // Highlight O display
            xPlayerDisplay.value?.classList.remove('player-active')
            oPlayerDisplay.value?.classList.add('player-active')
        }
    }
}

// Event listeners
onMounted(() => {
    cells.value = document.querySelectorAll('.cell')
    titleHeader.value = document.querySelector('#titleHeader')
    xPlayerDisplay.value = document.querySelector('#xPlayerDisplay')
    oPlayerDisplay.value = document.querySelector('#oPlayerDisplay')
    restartBtn.value = document.querySelector('#restartBtn')

    cells.value.forEach((cell, index) => {
        cell.addEventListener('click', () => tapCell(cell, index))
    })

    if (restartBtn.value) {
        restartBtn.value.addEventListener('click', () => {
            if (restartBtn.value) restartBtn.value.style.visibility = 'hidden'
            inputCells.value.fill('')
            cells.value?.forEach((cell) => {
                cell.textContent = ''
                cell.setAttribute('style', '')
            })
            isPauseGame = false
            isGameStart = false
            if (titleHeader.value) titleHeader.value.textContent = 'Choose'
        })
    }
})
</script>

<template>
    <main>
        <header id="header">
            <div class="player player-active" id="xPlayerDisplay" onclick="choosePlayer('X')">
                X
            </div>
            <h3 id="titleHeader">Choose</h3>
            <div class="player" id="oPlayerDisplay" onclick="choosePlayer('O')">O</div>
        </header>

        <div id="board">
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
        </div>

        <button id="restartBtn">Restart</button>
        <UButton size="xl" label="Exit" color="red" class="mt-4">
            <NuxtLink to="/communities">Exit</NuxtLink></UButton
        >
    </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    user-select: none;

    color: white;
}

main {
    background: #0a0519;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#header {
    display: flex;
    width: 235px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}
#header .player {
    background: #17122a;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 12px;
    border: solid 4px #17122a;
    opacity: 0.5;
    transition: 0.3s;
}
#header .player:hover {
    border: solid 4px #2a2343;
}
#header .player-active {
    opacity: 1;
    border: solid 4px #2a2343;
}
#header #xPlayerDisplay {
    color: #1892ea;
}
#header #oPlayerDisplay {
    color: #a737ff;
}

#board {
    display: grid;
    grid-template-columns: repeat(3, 70px);
    grid-template-rows: repeat(3, 70px);
    gap: 12px;
}
#board .cell {
    background: #17122a;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s background;
}
#board .cell:hover {
    background: #2a2343;
}

#restartBtn {
    margin-top: 30px;
    width: 235px;
    background: #17122a;
    padding-top: 8px;
    padding-bottom: 8px;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s background;
    visibility: hidden;
}
#restartBtn:hover {
    background: #2a2343;
}
</style>
