/** Daily currency rate */
const USD = 4.87;
const EUR = 5.32;
const GBP = 6.08;

/** Getting form elements */
const form = document.querySelector('form');
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

/** Manipulationg "amount" input to get only numbers  */
amount.addEventListener("input", (event) => {
    const hasCharacterRegex = /\D+/g
    console.log(amount.value);
    amount.value = amount.value.replace(hasCharacterRegex, "")
});

/** Capturing submit event */
form.onsubmit = (event) => {
    event.preventDefault();

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "$");
            break;
        case "EUR":
            convertCurrency(amount.value, EUR, "€");
            break;
        case "GBP":
            convertCurrency(amount.value, GBP, "£");
            break;

    }
}

/** Function to convert currencies */
function convertCurrency(amount, price, symbol) {
    try {
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

        let total = amount * price;
        if (isNaN(total)) {
            return alert("Por favor, digite um valor válido!");
        }

        total = formatCurrencyBRL(total).replace("R$", "");
        result.textContent = `${total}  Reais`;

        /** Appplies class to show the calc result */
        footer.classList.add("show-result");
    } catch (error) {
        console.log(error);
        footer.classList.remove("show-result");
        alert("Nnao foi possóvel realizar a converção. Tente novamente mais tarde!")
    }
}


/** Format any currency to Brazilian Real */
function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

