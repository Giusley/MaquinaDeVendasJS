const itens = [
  { nome: "Salgadinho de queijo", preço: 1.00 },
  { nome: "Salgadinho de milho", preço: 0.90 },
  { nome: "Batata frita", preço: 0.80 },
  { nome: "Chocolate", preço: 0.70 },
  { nome: "Gominha", preço: 0.60 },
  { nome: "Refrigerante", preço: 1.50 },
  { nome: "Água mineral", preço: 1.20 },
  { nome: "Suco", preço: 1.00 },
  { nome: "Chá gelado", preço: 0.90 },
  { nome: "Iogurte", preço: 0.80 },
  { nome: "Leite", preço: 0.70 },
  { nome: "Suco de fruta", preço: 0.60 },
  { nome: "Água de coco", preço: 0.50 },
  { nome: "Achocolatado", preço: 0.40 },
  { nome: "Café", preço: 0.30 },
  { nome: "Chamate", preço: 0.20 },
];

// Exemplo de interação com o usuário para escolher um item
console.log("Lista de itens disponíveis:");
for (const item of itens) {
  console.log(item.nome + " - R$" + item.preço.toFixed(2));
}

// Supondo que o usuário escolha "Refrigerante"
const escolha = "Refrigerante";
const itemEscolhido = itens.find(item => item.nome === escolha);

// Supondo que o usuário insira R$ 2.00
const dinheiroInserido = 2.00;

// Verificando se o item está disponível
if (!itemEscolhido) {
  console.log("Item não disponível.");
} else {
  // Verificando se o dinheiro é suficiente
  if (dinheiroInserido < itemEscolhido.preço) {
    console.log("Dinheiro insuficiente.");
  } else {
    // Dando o item para o usuário
    console.log("Aqui está o seu item: " + itemEscolhido.nome);

    // Calculando e retornando o troco
    const troco = dinheiroInserido - itemEscolhido.preço;
    if (troco > 0) {
      console.log("O seu troco é: R$" + troco.toFixed(2));
    }
  }
}