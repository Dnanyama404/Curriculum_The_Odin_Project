function escolha(n) {
    // Valida se o número está entre 0 e 2
    if (n === 0) return "Pedra";
    if (n === 1) return "Papel";
    if (n === 2) return "Tesoura";

    return "Escolha Inválida.";
}

function escolha_do_computador() {
    // Sorteia um número inteiro entre 0, 1 e 2
    let numeroAleatorio = Math.floor(Math.random() * 3);

    // Passa o número sorteado para a função escolha e exibe o resultado
    console.log("O computador escolheu: " + escolha(numeroAleatorio));
}

// Executa a função para testar
escolha_do_computador();

function escolha_humana() {

}