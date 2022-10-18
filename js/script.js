/*  -----------------------------------------------------------------------------------------------
    Consegna
    Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
    L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
    con difficoltà 1 => tra 1 e 100
    con difficoltà 2 => tra 1 e 81
    con difficoltà 3 => tra 1 e 49
    Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
    I numeri nella lista delle bombe non possono essere duplicati.
    In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
    La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
    Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
--------------------------------------------------------------------------------------------------- */

// Prendo il bottone play
const playBUTTON = document.getElementById('play');

// Prendo il div che starà sopra il main dopo aver perso
const containeMsgHTML = document.getElementById('container-msg');

function play() {
    console.log('Inizio gioco...');
    const NUM_BOMB = 16;
    const bombsPosition = [];
    let numCell;
    let score = 0;
    const fieldGame = document.getElementById('field-game');
    fieldGame.innerHTML = '';
    
    // proprietà per aggiungere le classi ad ogni click del bottone play
    containeMsgHTML.className = 'container-pop-up invisible';
    const levelHTML = document.getElementById('livello');
    const level = levelHTML.value;
    switch(level) {
        case '0':
            alert('Devi selezionare un livello di difficoltà!');
            return;
        case '1':
            numCell = 100;
            break;
        case '2':
            numCell = 81;
            break;
        case '3':
            numCell = 49;
            break;
    }

    // Funzione per far sparire il titolo dopo aver cliccato play
    function titleDisappear() {
        const titleHTML = document.getElementById('title');
        titleHTML.classList = 'd-none';
    }

    function clickCell() {
        const MAX_ATTEMPT = numCell - NUM_BOMB;
        score++;
        this.classList.add('right');
        this.removeEventListener('click', clickCell);
        document.getElementById("contatore-caselle").innerHTML = 'Hai scoperto ' + score + ' celle!';
        console.log(score);
        if(score == MAX_ATTEMPT) {
            containeMsgHTML.className = 'container-pop-up visible';
            document.getElementById('msg').innerHTML = 'Hai Vinto!' + '<br>' +  'Hai scoperto tutte le ' + score + ' celle!'  + '<br>' + 'Gioca di nuovo!'
        }
    }


    // funzione che genera la cella
    function drawCell(num) {
        const cellPerSide = Math.sqrt(numCell);
        const cell = document.createElement('div');

        cell.className = 'square';
        cell.style.width = `calc(100% / ${cellPerSide})`;
        cell.style.height = `calc(100% / ${cellPerSide})`;
        cell.innerHTML = `
            <span></span>
        `;
        if(bombsPosition.includes(num)) {
            cell.classList.add('bomb');
            cell.classList.add('bomba');
            cell.addEventListener('click', function() {
                const arrBomb = document.querySelectorAll('.bomb');
                for(let i = 0; i < arrBomb.length; i++) {
                    arrBomb[i].classList.add('bomba');
                }
                // proprietà per far apparire il messaggio di Game Over
                containeMsgHTML.className = 'container-pop-up visible';
                document.getElementById('msg').innerHTML = 'Game Over!' + '<br>' + 'Hai scoperto ' + score + ' celle giuste, riprova!'
            });
            } else {
                cell.addEventListener('click', clickCell);
            }
            return cell;
        }

    while(bombsPosition.length < NUM_BOMB) {
        const bomb = randomNumber(1, numCell);
        if(!bombsPosition.includes(bomb)) {
            bombsPosition.push(bomb);
        }
    }
    console.log(bombsPosition);

    // funzione che genera il campo di gioco
    function drawGrid() {
        const grid = document.createElement('div');
        grid.className = 'grid';
        for(let i = 1; i <= numCell; i++) {
            const cell = drawCell(i);
            grid.appendChild(cell);
        }
        fieldGame.appendChild(grid);
    }
    // chiamo la funzione
    drawGrid();
    titleDisappear();
}
// attacco event listener al bottono play
playBUTTON.addEventListener('click', play);