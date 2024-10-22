 // Cotação de moeda do dia
const USD = 4.87;
const EUR = 5.32;
const GBP = 6.08;

// obtendo os elementos do formulario
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
  //formula para pesquisar somente letras e caracteres especiais.  
  const hasCharacterRegex = /\D+/g;
     
  //analisa os caracteres digitados e retira as letras e caracteres especiais
  amount.value = amount.value.replace(hasCharacterRegex,"");
})

// Capturando o evento submit do formulário.
form.onsubmit = (event) => {
  event.preventDefault();
  
  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
}

//função para converter a moeda selecionada.
function convertCurrency(amount, price, symbol) {
  try {
    // Exibindo a cotação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;
      
    // valida se o valor inforado é um número valido.
    if (isNaN(amount)) {
      return alert("Valor informado está incorreto. Verifique!");
    }
    
    //Calcula o valor da conversão da moeda
    let total = amount * price;

    //Retorna na tela o resultado.
    result.textContent = `${formatCurrencyBRL(total).replace("R$", "")} Reais`;
      
    // Aplica a classe que irá exibir o footer, onde estará o resultado   
    footer.classList.add("show-result");

  } catch (error) {
    console.log(error);

    // Remove a classe aplicada em caso de erro.
    footer.classList.remove("show-result");
    alert("Não foi possível realizar a conversão para a moeda selecionada.");
  }
}

// função criada para formatar a moeda em Real Brasileiro
function formatCurrencyBRL(value) {
  //Converte no padrão BRL
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}