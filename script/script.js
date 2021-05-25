(function () {

  var tiles = [] 
  var tilesAnswer = []

  var tilesSort = []
  var answer = []  


  //tempo		
	var parado = 0
	var tempo_controle = 0
	var centesimas = 0
	var minutos = 0
	var segundos = 0


  var startScreen = document.querySelector("#startScreen")
  startScreen.addEventListener("click", startGame, false)
  
  var random = document.querySelector("#random")
  random.addEventListener("click", startGame, false)

  var random = document.querySelector("#sort")
  random.addEventListener("click", sort, false)
  
  var reset = document.querySelector("#reset")
  reset.addEventListener("click", resetGame, false)

  var overScreen = document.querySelector("#overScreen")

  function init() {  
    //varro toda a estrutura do html
    for(var i = 1; i < 9; i++){                     
      var tile = document.querySelector("#n" + i)     
      tile.style.background = "url('img/n" + i + ".png')"
      tile.addEventListener("click", moveTile, false)
      tiles.push(tile)
            
      var tileSort = document.querySelector("#e" + i)
      tileSort.style.background = "url('img/n" + i + ".png')"
      tilesSort.push(tileSort)
    }  
    tiles.push(null) 
    tilesSort.push(null)    
    
    render()
    render2()
  }

  function render(){
    /* faço a varredura em dentro do array e organizo de acordo com a posição
    do array, em relação ao topo e as margens do tabuleiro */ 
    for(var i in tiles){
      // pra cada indice do tiles crio uma variável e atribuo o valor
      var tile = tiles[i]    
      if(tile){
        tile.style.left = (i%3) * 100 + 5 + "px"
        if(i < 3){
          tile.style.top = "5px"
        }else if(i < 6){
          tile.style.top = "105px"
        }else{
          tile.style.top = "205px"
        }            
      }
    }       
  }

  function render2(){
     for(var i in tilesSort){
      // pra cada indice do tiles crio uma variável e atribuo o valor
      var tile = tilesSort[i]    
      if(tile){
        tile.style.left = (i%3) * 100 + 5 + "px"
        if(i < 3){
          tile.style.top = "5px"
        }else if(i < 6){
          tile.style.top = "105px"
        }else{
          tile.style.top = "205px"
        }            
      }
    }   
  }

    //valida o array
    /*
    * o sistema conta uma inversão ao comparar o valor do índice i com os seguintes e identificar valores menores
    * Caso o array apresente um número ímpar de inversões, o sistema é insolucionável
    * */
  function validGame(array) {
    var inversions = 0;
    var len = array.length;
    for (var i = 0; i < len - 1; i++) {
      for (var j = i; j < len; j++) {
        if (array[i] && array[j] && array[i].dataset.value > array[j].dataset.value) {
          inversions++;
        }
      }
    }
    return inversions % 2 === 0;
  }

  // SORTEANDO O PADRÃO
  function sort(){
    tilesSort = randomSort(tilesSort)
    answer = tilesSort   
    console.log('tilesSort', tilesSort[4].dataset.value)
    render2()
    
  }

  // EMBARALHANDO AS PEÇAS
  function randomSort(oldArray) {
    var newArray
    do{          
      var newArray = []
      while(newArray.length < oldArray.length){
        var i = Math.floor(Math.random() * oldArray.length)  
        if(newArray.indexOf(oldArray[i]) < 0){
          newArray.push(oldArray[i])
        }
      }
    }while(!validGame(newArray))  
    
    return newArray
  }

  // //Tempo de partida
	// function cronometro() {
	// 	if (parado) return

	// 	if (centesimas < 99) {
	// 		centesimas++
	// 		// console.log(centesimas)
	// 	}
	// 	if(centesimas == 99) {
	// 		centesimas = -1
	// 	}
	// 	if (centesimas == 0 ) {
	// 		segundos++
	// 		if(segundos < 10){
	// 			segundos = "0"+segundos
	// 		}
	// 		document.querySelector("#secs").innerHTML = segundos
	// 	}
	// 	if (segundos == 59) {
	// 		segundos = -1
	// 	}
	// 	if ((centesimas == 0) && (segundos == 0)) {
	// 		minutos++
	// 		document.querySelector("#minutes").innerHTML = minutos
	// 	}
	// }

  function startGame() {
    // bagunço as peças e retorno pro array as peças bagunçadas      
    tiles = randomSort(tiles)    
    console.log('tiles',tiles[4].dataset.value)

    startScreen.removeEventListener("click",startGame,false)  
    startScreen.style.opacity = "0"
    startScreen.style.zIndex = -1

    // parado = 0
    // tempo_controle = setInterval(cronometro, 10)
    render()    
  }

  // RESETANDO O JOGO
  function resetGame() {  
    location.reload()    
  }

  
  // MOVIMENTO DAS PEÇAS
  function moveTile() {
		var index = tiles.indexOf(this)

		// movie.src = 'sounds/clique.mp3'
		// movie.play()

		//confere se a peça não está na coluna da esquerda
		if (index % 3 !== 0) {
			//move a peça para a esquerda, caso o espaço esteja vazio
			if (!tiles[index - 1]) {
				tiles[index - 1] = this
				tiles[index] = null
			}
		}

		//confere se a peça não está na coluna da esquerda
		if (index % 3 !== 2) {
			//move a peça para a direita, caso o espaço esteja vazio
			if (!tiles[index + 1]) {
				tiles[index + 1] = this
				tiles[index] = null
			}
		}

		//confere se a peça não está na coluna do topo
		if (index > 2) {
			//move a peça para o topo, caso o espaço esteja vazio
			if (!tiles[index - 3]) {
				tiles[index - 3] = this
				tiles[index] = null
			}
		}

		//confere se a peça não está na coluna do fundo
		if (index < 6) {
			//move a peça para baixo, caso o espaço esteja vazio
			if (!tiles[index + 3]) {
				tiles[index + 3] = this
				tiles[index] = null
			}
		}

		render()    

		// //verificar a condição de vitória
		// if (chkWin()) {
		// 	gameOver()
    //   alert("Seu tempo foi: " + minutos + " minutos" + " e " + segundos + " segundos" );				
		// }

		// function chkWin() {
    //   // for(var i in tiles){
    //       var a = tiles[4].dataset.value
    //       var b = answer[4].dataset.value
    //       if(a !== b) {
    //         console.log('a', a)       
    //         console.log('b', b)       
    //         return false                  
    //       // }
    //     }


		// 	window.clearInterval(tempo_controle)
		// 	parado = 1						
		// 	return true
		// }

    // function gameOver() {
		// 	overScreen.style.zIndex = "1"
		// 	overScreen.style.opacity = "1"
		// 	setTimeout(function () {
		// 		overScreen.addEventListener("click", startGame, false)
		// 		segundos = -1
		// 	}, 500)
		// }
  }

  init()
}())

