class Processo {
    recursos_alocados: number[];
    recursos_necessarios: number[];

    constructor(recursos_alocados: number[], recursos_necessarios: number[]) {
        this.recursos_alocados = recursos_alocados;
        this.recursos_necessarios = recursos_necessarios;
    }
}

class BB {
    processos: Processo[];
    recursos_disponiveis: number[];

    constructor(processos: Processo[], recursos_disponiveis: number[]) {
        this.processos = processos;
        this.recursos_disponiveis = recursos_disponiveis;
    }

    executa(): boolean { // Retorna true se o sistema está em estado seguro
        const n = this.processos.length;
        const m = this.recursos_disponiveis.length;

        const recursos_disponiveis = this.recursos_disponiveis.slice();
        const recursos_alocados = this.processos.map(p => p.recursos_alocados.slice());

        const recursos_necessarios = this.processos.map(p => p.recursos_necessarios.slice());

        const processos_finalizados = new Array(n).fill(false);

        let processos_finalizados_count = 0;

        while (processos_finalizados_count < n) {

            let processo_encontrado = false;

            for (let i = 0; i < n; i++) {

                if (!processos_finalizados[i]) {

                    let j = 0;

                    for (; j < m; j++) {
                        if (recursos_necessarios[i][j] > recursos_disponiveis[j]) {
                            break;
                        }
                    }

                    if (j == m) {

                        processos_finalizados_count++;

                        processos_finalizados[i] = true;

                        processo_encontrado = true;

                        for (let k = 0; k < m; k++) {
                            recursos_disponiveis[k] += recursos_alocados[i][k];
                        }

                    }

                }

            }

            if (!processo_encontrado) {
                break;
            }

        }

        return processos_finalizados_count == n;
    }

}

function exibeProcessos(processos: Processo[]) {
    for (let i = 0; i < processos.length; i++) {
        console.log("Processo " + i + ":");
        console.log("- Recursos alocados:    " + processos[i].recursos_alocados.join(", "));
        console.log("- Recursos necessários: " + processos[i].recursos_necessarios.join(", "), "\n");
    }
}


function main() {

    const processos = [
        new Processo([0, 0, 1, 0], [2, 0, 0, 1]),
        new Processo([2, 0, 0, 1], [1, 0, 1, 0]),
        new Processo([0, 1, 2, 0], [2, 1, 0, 0])
    ];

    const recursos_disponiveis = [2, 1, 0, 0];

    console.log("----------- Teste 1 -----------")
    console.log("Processos:");
    exibeProcessos(processos);
    console.log("Recursos disponíveis: " + recursos_disponiveis.join(", "))

    const bb = new BB(processos, recursos_disponiveis);

    if (bb.executa()) {
        console.log("O sistema está em estado seguro")
    } else {
        console.log("O sistema não está em estado seguro (Ocorreu deadlock..)");
    }

    // exemplo em que o sistema não está em estado seguro	
    const processos2 = [
        new Processo([0, 0, 1, 0], [2, 0, 0, 1]),
        new Processo([2, 0, 0, 1], [1, 0, 1, 0]),
        new Processo([0, 1, 2, 0], [2, 1, 0, 1])
    ];

    const recursos_disponiveis2 = [2, 1, 0, 0];

    console.log("\n ----------- Teste 2 -----------")
    console.log("Processos: ");
    exibeProcessos(processos2);
    console.log("Recursos disponíveis: " + recursos_disponiveis2.join(", "))

    const bb2 = new BB(processos2, recursos_disponiveis2);

    if (bb2.executa()) {
        console.log("O sistema está em estado seguro")
    } else {
        console.log("O sistema não está em estado seguro (Ocorreu deadlock..)");
    }

}

main();
