console.log(...['%c█ Máquina de vendas JS ™ \n',
	'font-size: 1.6em; color: blue; text-shadow: 2px 2px 4px #000000;']);
	console.log(...['%cMáquina de vendas JS ™ - por Giusley Camilo',
 `background:#ffffff23;font-size: 1.2em; color: cyan; 
 text-shadow: 2px 2px 4px #000000; color: 110% blue;`]);
/**████████████████████████████████████████████████████████████████████████*/
/**	@App: Máquina de vendas JS ™███████████████████████████████████████████*/
/**	@Version: 1.0 - jun2023;	███████████████████████████████████████████*/
/**	@author: Giusley Camilo;	███████████████████████████████████████████*/
/**	@Data: jun2023| --  ;   	███████████████████████████████████████████*/
/**████████████████████████████████████████████████████████████████████████*/
 
 const textRandomArray = [
	'Bem vindo!', 
	'Máquina de vendas JS ™', 
	'Desenvolvido por:Giusley Camilo', 
	'Escolha algum item'
 ];
var currentCredits = 0;
var pLetterId = null;
var pNumberId = null;
var boolSelected = false;
var nomeDoProduto = pLetterId + pNumberId;

let currentTxtIndex = 0;
let animateTextInterval;
let updateDateTimeInterval;


const responseDate = document.getElementById('responseDate');
const responseHour = document.getElementById('responseHour');
const responseTxt = document.getElementById('responseTxt');
const displayTxt = document.getElementById('displayTxt');
const btnLetter = document.querySelectorAll('.btn-letter')
const btnNumber = document.querySelectorAll('.btn-number')
const btnCorrigir = document.querySelector('#btnCorrigir')
const btnConfirmar = document.querySelector('#btnConfirmar')
const divAdd = document.querySelector('#divAdd')
const coin = document.querySelector('#coin')
const bill = document.querySelector('#bill')
const coinSelect = document.getElementById('coin');
const billSelect = document.getElementById('bill');
const imgInsertBill = document.getElementById('imgInsertBill');
const imgInsertCoin = document.getElementById('imgInsertCoin');
const addCoinBtn = document.getElementById('addCoinBtn');
const addBillBtn = document.getElementById('addBillBtn');
const compraDialog = document.querySelector('.compra-dialog');
const initDialog = document.querySelector('.init-dialog');
const fecharDialogButton = document.querySelectorAll('.fechar-dialog');


const productsContainer = document.querySelector('.productsContainer')
const itemBlk = document.querySelectorAll('.item')

var updateCredit = `CRÉDITOS: R$ ${currentCredits.toFixed(2)}`;
var produtosDisp = {
  A1: { NOME: "nuts azul", PRECO: 1.25 },
  B1: { NOME: "nuts amarelo", PRECO: 1.15 },
  C1: { NOME: "chips bacon", PRECO: 0.99 },
  D1: { NOME: "chocolate green", PRECO: 2.49 },
  A2: { NOME: "chips pote", PRECO: 3.00 },
  B2: { NOME: "aneis de cebola", PRECO: 1.50 },
  C2: { NOME: "batata palito", PRECO: 1.10 },
  D2: { NOME: "batata ondulada", PRECO: 1.20 },
  A3: { NOME: "biscoito green", PRECO: 0.75 },
  B3: { NOME: "biscoito vermelho", PRECO: 0.80 },
  C3: { NOME: "amendoim vermelho", PRECO: 0.95 },
  D3: { NOME: "batata chips", PRECO: 1.05 },
  A4: { NOME: "chocolate black", PRECO: 2.80 },
  B4: { NOME: "chocolate meio-amargo", PRECO: 2.50 },
  C4: { NOME: "pastilhas chocolate", PRECO: 1.30 },
  D4: { NOME: "chocolate pastilhas", PRECO: 1.40 }
};


window.getSelection().removeAllRanges(); // remover seleção de texto
for (const img of document.querySelectorAll("img")) {
  img.draggable = false;
}
document.getElementById("billBlk").style.display = "grid"
	document.getElementById("coinBlk").style.display = "grid"

/*██ PAINEL EXIBIR ITENS ████████████████████████████████████████████████████*/

imgInsertBill.addEventListener('click',()=>{
	//imgInsertBill.style.display = "none"
	
	compraDialog.setAttribute('open','');
	compraDialog.style.display = 'flex';
	coinBlk.style.display = 'none';
	billBlk.style.display = 'grid';
	
})
imgInsertCoin.addEventListener('click',()=>{
	//imgInsertCoin.style.display = "none"
	
	compraDialog.setAttribute('open','');
	compraDialog.style.display = 'flex';
	coinBlk.style.display = 'grid';
	billBlk.style.display = 'none';
})

Array.from(productsContainer.children).forEach((element)=>{
	let novoFilho = document.createElement("div");
	let imageName = element.firstElementChild.nextElementSibling.getAttribute('src')
	let fileName = imageName.split('/').pop().substr(0, 2); // Extrai apenas o nome do arquivo

	//console.log(produtosDisp[fileName].NOME)
	element.firstElementChild.textContent = produtosDisp[fileName].NOME
	element.lastElementChild.textContent = `R$ ${produtosDisp[fileName].PRECO}`;
	element.addEventListener('click', (e)=>{
	Array.from(productsContainer.children).forEach(e=>{
		e.style.filter = 'none';
		e.firstElementChild.nextElementSibling.style.filter = 'none';
	})
	element.setAttribute("style", "filter:drop-shadow(0px 0px 4px #15ff1A);");
	element.firstElementChild.nextElementSibling.setAttribute("style", "filter:drop-shadow(0px 0px 4px #15ff1A);");	
	clearTxtDisplay()
	pLetterId = element.dataset.letterid;
	 pNumberId = element.dataset.numberid;
	boolSelected = true
	novoFilho.innerHTML = `<div>CRÉDITOS: R$ ${currentCredits.toFixed(2)}<br>
	Produto: ${element.firstElementChild.textContent} <br>Preço: R$ ${parseFloat(element.lastElementChild.textContent.substring(2))}  <br>
	CONFIRMAR|CORRIGIR</div>`
	checkItem(element.dataset.letterid + element.dataset.numberid)
	displayTxt.appendChild(novoFilho);
	})
})

/*██ PAINEL SELECIONAR:NÚMEROS ██████████████████████████████████████████████*/
Array.from(btnNumber).forEach(element=>{
	element.addEventListener('click', (e)=>{
		pNumberId = parseInt(element.textContent)
		clearTxtDisplay()
		
		let novoFilho = document.createElement("div");
		if(pLetterId != null){
			boolSelected = true
			novoFilho.innerHTML = `<div>CRÉDITOS: R$ ${currentCredits.toFixed(2)}<br>
			Produto: ${pLetterId}${pNumberId} – ${produtosDisp[pLetterId + pNumberId].NOME}  <br>
			CONFIRMAR|CORRIGIR</div>`
			checkItem(pLetterId + pNumberId)
		} else {
			boolSelected = false
			pNumberId = null
			novoFilho.innerHTML = `<div><div>CRÉDITOS: R$ ${currentCredits.toFixed(2)}<br>
			Primeiro, selecione a identificação <br>(letra e numero do produto)</div>`
		}
		displayTxt.appendChild(novoFilho);
		for(let rm of btnNumber) rm.classList.remove('activeNumber')
		element.classList.add('activeNumber')
	})
	
	element.addEventListener('mouseover', (e)=>{
		let chk = element.textContent
		Array.from(productsContainer.children).forEach(e=>{
			e.style.filter = 'none';
			e.firstElementChild.nextElementSibling.style.filter = 'none';
		})
		
		const nums = productsContainer.querySelectorAll(`[data-numberid="${e.target.textContent}"]`);
		//elm.setAttribute("style", "filter:drop-shadow(0px 0px 4px #15ff1A);");
		//elm.firstElementChild.nextElementSibling.setAttribute("style", "filter:drop-shadow(0px 0px 4px #15ff1A);");
		Array.from(nums).forEach((elm) => {
		  //console.log(elm)
		  if(elm.dataset.letterid == pLetterId){
			   elm.setAttribute("style", "filter: drop-shadow(0px 0px 4px #15ff1A);");
			    const childElement = elm.firstElementChild.nextElementSibling;
		  if (childElement) {
			childElement.setAttribute("style", "filter: drop-shadow(0px 0px 4px #15ff1A);");
		  }
			   
		  } else {
			  elm.style.filter = 'none';
			  elm.firstElementChild.nextElementSibling.style.filter = 'none';
		  }
		 
		 
		});
		
	});
})
/*██ PAINEL SELECIONAR:LETRAS  ██████████████████████████████████████████████*/
Array.from(btnLetter).forEach(element=>{
	element.addEventListener('click', (e)=>{
		pLetterId = element.textContent
		clearTxtDisplay()
		let novoFilho = document.createElement("div");
		novoFilho.innerHTML = `<div><div>CRÉDITOS: R$ ${currentCredits.toFixed(2)}<br>
		Produto: ${pLetterId} - <br>Selecione o numero de identificação do produto</div>`;
		displayTxt.appendChild(novoFilho);
		for(let rm of btnLetter) rm.classList.remove('activeLetter')
		element.classList.add('activeLetter')
	})
	element.addEventListener('mouseover', (e)=>{
		let chk = element.textContent
		
		clearSelected()
		
		switch(chk){
			case 'A' :
				Array.from(productsContainer.children).forEach((elm,idx)=>{
					if(elm.dataset.letterid == "A"){
						elm.setAttribute("style", "filter:drop-shadow(0px 0px 4px #15ff1A);");
						elm.firstElementChild.nextElementSibling.setAttribute("style", "filter:drop-shadow(0px 0px 4px #15ff1A);");
					}
				})
				;break;
			case 'B' :
				Array.from(productsContainer.children).forEach((elm,idx)=>{
					if(elm.dataset.letterid == "B"){
						elm.setAttribute("style", "filter:drop-shadow(0px 0px 4px #15ff1A);");
						elm.firstElementChild.nextElementSibling.setAttribute("style", "filter:drop-shadow(0px 0px 4px #15ff1A);");
					}
				})
				;break;
			case 'C' :
				Array.from(productsContainer.children).forEach((elm,idx)=>{
					if(elm.dataset.letterid == "C"){
						elm.setAttribute("style", "filter:drop-shadow(0px 0px 4px #15ff1A);");
						elm.firstElementChild.nextElementSibling.setAttribute("style", "filter:drop-shadow(0px 0px 4px #15ff1A);");
					}
				})
				;break;
			case 'D' :
				Array.from(productsContainer.children).forEach((elm,idx)=>{
					if(elm.dataset.letterid == "D"){
						elm.setAttribute("style", "filter:drop-shadow(0px 0px 4px #15ff1A);");
						elm.firstElementChild.nextElementSibling.setAttribute("style", "filter:drop-shadow(0px 0px 4px #15ff1A);");
					}
				})
				;break;
				default :
				 console.log('default');break;
		}
		
	});
})

function clearSelected(){
	Array.from(productsContainer.children).forEach(e=>{
		e.style.filter = 'none';
		e.firstElementChild.nextElementSibling.style.filter = 'none';
	})
}

coinSelect.addEventListener('change', () => {updateTxtDisplay()});
billSelect.addEventListener('change', () => {updateTxtDisplay()});

addCoinBtn.addEventListener('click', () => {
	currentCredits += parseFloat(coinSelect.value);
	updateTxtDisplay()
});

addBillBtn.addEventListener('click', () => {
	currentCredits += parseFloat(billSelect.value);
	updateTxtDisplay()
});

btnCorrigir.addEventListener('click', () => {
	clearTxtDisplay()
	let novoFilho = document.createElement("div");
	if(pLetterId == null){
		novoFilho.innerHTML = `<div>${updateCredit}<br>` + `<br>Selecione a letra de identificação</div>`;
	} else {
		novoFilho.innerHTML = `<div><div>CRÉDITOS: R$ ${currentCredits.toFixed(2)}<br>Selecione novamente a letra de identificação</div>`;
		console.log(pLetterId.target)
	}
	displayTxt.appendChild(novoFilho);
	 pLetterId = null;
		 pNumberId = null;
		boolSelected = false;
		for(let rm of btnLetter) rm.classList.remove('activeLetter')
		for(let rm of btnNumber) rm.classList.remove('activeNumber')
});

btnConfirmar.addEventListener('click', () => {
	clearTxtDisplay()
	let novoFilho = document.createElement("div");
	
	if(currentCredits == 0){
		novoFilho.innerHTML = `<div>CRÉDITOS: R$ ${currentCredits.toFixed(2)}<br>SALDO INSUFICIENTE<br>inserir dinheiro</div>`
		displayTxt.appendChild(novoFilho);
		return;
	}
	
	if(boolSelected){
		
		const nowData = new Date();
		if(Number(currentCredits.toFixed(2)) < produtosDisp[pLetterId + pNumberId].PRECO){
			console.log(`valor: ${produtosDisp[pLetterId + pNumberId].PRECO}\ncréditos: ${parseFloat(currentCredits.toFixed(2))}`)
			novoFilho.innerHTML = `<div>
		VALOR INSUFICIENTE ****<br>
		Valor: R$ ${produtosDisp[pLetterId + pNumberId].PRECO}<br>
		CRÉD.: R$ ${currentCredits.toFixed(2)}<br>
		<br></div>`;
		displayTxt.appendChild(novoFilho);
		return;
		} else {
			let troco = Number(currentCredits.toFixed(2) - produtosDisp[pLetterId + pNumberId].PRECO).toFixed(2)
			currentCredits = parseFloat(troco)
			responseTxt.textContent = `CRÉDITOS: R$ ${currentCredits.toFixed(2)}`
			novoFilho.innerHTML = `<div>
Produto: ${produtosDisp[pLetterId + pNumberId].NOME}<br>
Valor: R$ ${produtosDisp[pLetterId + pNumberId].PRECO}<br>
Troco: R$ ${troco}<br>
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■<br>
OBRIGADO PELA PREFERÊNCIA!<br>
<br>
</div>`;
			displayTxt.appendChild(novoFilho);
			
		}
		
		
		pLetterId = null;
		pNumberId = null;
		boolSelected = false;
		for(let rm of btnLetter) rm.classList.remove('activeLetter')
		for(let rm of btnNumber) rm.classList.remove('activeNumber')
			
		return;
	}

	if(pLetterId == null && pNumberId == null){
		
		novoFilho.innerHTML = `<div>CRÉDITOS: R$ ${currentCredits.toFixed(2)}<br>O Produto não foi selecionado.<br> Selecione a letra e o número de identificação</div>`;	
	}
		
	if(pLetterId == null){
		if(pNumberId == null){
			novoFilho.innerHTML = `<div>CRÉDITOS: R$ ${currentCredits.toFixed(2)}<br>O Produto não foi selecionado.<br> Selecione o número de identificação</div>`;
		}
		novoFilho.innerHTML = `<div>CRÉDITOS: R$ ${currentCredits.toFixed(2)}<br>O Produto não foi selecionado</div>`;
		displayTxt.appendChild(novoFilho);
		return;
	}
	if(pNumberId == null){
		if(pLetterId == null){
			novoFilho.innerHTML = `<div>Selecione a letra de identificação</div>`;
		}
		novoFilho.innerHTML = `<div>Número de identificação não foi selecionado</div>`;
		displayTxt.appendChild(novoFilho);
		return;
	}
	displayTxt.appendChild(novoFilho);
});

btnConfirmar.addEventListener('mouseover', () => {
	clearSelected()
	Array.from(productsContainer.children).forEach((elm,idx)=>{
		if(elm.dataset.letterid == pLetterId && elm.dataset.numberid == pNumberId){
			console.log(elm)
			elm.setAttribute("style", "filter:drop-shadow(0px 0px 4px #15ff1A);");
			elm.firstElementChild.nextElementSibling.setAttribute("style", "filter:drop-shadow(0px 0px 4px #15ff1A);");
		}
	})
	
})

function checkItem(item){
	const strCompare = `${produtosDisp[pLetterId + pNumberId].NOME}`
	const itemElements = document.querySelectorAll('.item');
	const elementoEncontrado = Array.from(itemElements).find(item => {
		const h2Element = item.querySelector('h2');
		return h2Element && h2Element.textContent.includes(strCompare);
	});
	const imageElement = elementoEncontrado.firstElementChild.nextElementSibling
	
	Array.from(itemElements).forEach(e=>{
		e.style.filter = 'none';
		e.firstElementChild.nextElementSibling.style.filter = 'none';
	})
	elementoEncontrado.setAttribute("style", "filter:drop-shadow(0px 0px 4px #15ff1A);");
	imageElement.setAttribute("style", "filter:drop-shadow(0px 0px 4px #15ff1A);");
	
}

function updateDateTime() {
	
	const now = new Date();

		const dateTimeStringOptions = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			hour12: false
		};
		
		const dateStringOptions = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      };
	  
	  const timeStringOptions = {
        hour: '2-digit',
        minute: '2-digit',
		second: '2-digit'
      };
		
		

	//const dateTimeString = now.toLocaleString('pt-BR', dateTimeStringOptions);
	const dateString = now.toLocaleDateString('pt-BR', dateStringOptions);
	const timeString = now.toLocaleTimeString('pt-BR', timeStringOptions);
	
	responseDate.textContent = dateString;
	responseHour.textContent = timeString;
	responseTxt.textContent = `CRÉDITOS: R$ ${currentCredits.toFixed(2)}`//dateTimeString;
	
}

let displayCounter = document.querySelector('#displayTxt').children.length

function clearTxtDisplay(){
	while(document.getElementById('displayTxt').firstChild){
		document.getElementById('displayTxt').removeChild(displayTxt.firstChild);
	}
}

function updateTxtDisplay(){
		clearTxtDisplay()
		updateCredit = `CRÉDITOS: R$ ${currentCredits.toFixed(2)}`;
	
	let novoFilho = document.createElement("div");
	novoFilho.innerHTML = `<div>${updateCredit}<br></div>`;
	
	displayTxt.appendChild(novoFilho);
	

	addCoinBtn.lastChild.textContent = `R$ ${parseFloat(coinSelect.value).toFixed(2)}`
	addBillBtn.lastChild.textContent = `R$ ${parseFloat(billSelect.value).toFixed(2)}`
	
	responseTxt.textContent = `CRÉDITOS: R$ ${currentCredits.toFixed(2)}`
	//displayTxt.textContent = updateCredit + randomTxt
	
}

function animateText() {
	updateTxtDisplay();
	currentTxtIndex = (currentTxtIndex + 1) % textRandomArray.length;
}



document.addEventListener('DOMContentLoaded', () => {
  //animateTextInterval = setInterval(animateText, 5000);
  updateDateTimeInterval = setInterval(updateDateTime, 1000);
  startCounter();
});

function startCounter() {
  let count = 0;
  const interval = setInterval(() => {
    count++;
	
	let novoFilho = document.createElement("div");
	novoFilho.innerHTML = `<div>Carregando...<br></div>`;
	
	displayTxt.appendChild(novoFilho);
	
    if (count >= 4) {
      updateTxtDisplay();
      clearInterval(interval);
    }
  }, 1000);
}

    Array.from(fecharDialogButton).forEach(e=>{
		e.addEventListener('click', () => {
		
		compraDialog.removeAttribute('open');
		initDialog.removeAttribute('open');
		compraDialog.style.display = 'none';
		initDialog.style.display = 'none';
    });
	})
	

    window.addEventListener('click', (event) => {
      if (event.target === compraDialog) {
        compraDialog.removeAttribute('open');
      }
    });