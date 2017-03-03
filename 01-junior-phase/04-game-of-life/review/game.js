var toggleCell = function (cell) {
  
  // QUESTION TO ASK YOURSELF: What is "this" equal to here?
  
  // how to set the style of the cell when it's clicked
  if (cell.dataset.status == 'dead') {
    cell.className = 'alive';
    cell.dataset.status = 'alive';
  } else {
    cell.className = 'dead';
    cell.dataset.status = 'dead';
  }
  
};

var gameOfLife = {
  
  width: 12, 
  height: 12, // width and height dimensions of the board
  stepInterval: null, // should be used to hold reference to an interval that is "playing" the game

  createAndShowBoard: function () {
    
    // create <table> element
    var goltable = document.createElement("tbody");
    
    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;
    
    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);
    
    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    /* 
      Write forEachCell here. You will have to visit
      each cell on the board, call the "iteratorFunc" function,
      and pass into func, the cell and the cell's x & y
      coordinates. For example: iteratorFunc(cell, x, y)
    */
    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {
        var cell = document.getElementById(x + '-' + y);
        iteratorFunc(cell, x, y); // this = window
      }
    }
  },
  
  setupBoardEvents: function() {
    // each board cell has an CSS id in the format of: "x-y" 
    // where x is the x-coordinate and y the y-coordinate
    // use this fact to loop through all the ids and assign
    // them "click" events that allow a user to click on 
    // cells to setup the initial state of the game
    // before clicking "Step" or "Auto-Play"
    
    // clicking on a cell should toggle the cell between "alive" & "dead"
    // for ex: an "alive" cell be colored "blue", a dead cell could stay white
    
    // EXAMPLE FOR ONE CELL
    // Here is how we would catch a click event on just the 0-0 cell
    // You need to add the click event on EVERY cell on the board
    
    
    
    var board = document.getElementById('board');
    board.addEventListener('click', function (event) {
      toggleCell(event.target);
    });

    var stepBtn = document.getElementById('step_btn');
    // // arrow fn
    // stepBtn.addEventListener('click', () => {
    //   this.step();
    // });
    var myThisIsAltered = this.step.bind(this);
    stepBtn.addEventListener('click', myThisIsAltered);

    var playBtn = document.getElementById('play_btn');
    // arrow fn: its this will be whatever it is HERE, on this line
    playBtn.addEventListener('click', () => {
      if (this.stepInterval === null) {
        this.enableAutoPlay();
        playBtn.innerText = 'Pause';
        playBtn.classList.remove('btn-primary');
        playBtn.classList.add('btn-danger');
      } else {
        this.pause();
        playBtn.innerText = 'Play';
        playBtn.classList.add('btn-primary');
        playBtn.classList.remove('btn-danger');
      }
    });

    var randomBtn = document.getElementById('reset_btn');
    var clearBtn = document.getElementById('clear_btn');
  },

  step: function () {
    // Here is where you want to loop through all the cells
    // on the board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game. 
    //
    var toToggle = [];
    this.forEachCell((cell, x, y) => {
      // You need to:
      // 1. Count alive neighbors for all cells
      var count = 0;
      for (var neighborX = x - 1; neighborX <= x + 1; neighborX++) {
        if (neighborX < 0 || neighborX >= this.width) {
          continue;
        }
        for (var neighborY = y - 1; neighborY <= y + 1; neighborY++) {
          if (neighborY < 0 || neighborY >= this.height) {
            continue;
          }
          if (neighborX === x && neighborY === y) {
            continue;
          }
          var neighbor = document.getElementById(neighborX + '-' + neighborY);
          if (neighbor.dataset.status === 'alive') {
            count++;
          }
        }
      }
      // 2. Set the next state of all cells based on their alive neighbors
      if (cell.dataset.status === 'dead') {
        if (count === 3) {
          toToggle.push(cell);
        }
      } else {
        if (count > 3 || count < 2) {
          // kill it
          toToggle.push(cell);
        }
      }
    });
    toToggle.forEach(toggleCell);
    // function (x) {otherFunc(x)} ~> otherFunc
  },

  enableAutoPlay: function () {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval 
    this.stepInterval = setInterval(this.step.bind(this), 100);

  },

  pause: function () {
    clearInterval(this.stepInterval);
    this.stepInterval = null;
  }
  
};

gameOfLife.createAndShowBoard();
