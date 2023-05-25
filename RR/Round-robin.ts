// Round-robin algorithm
class Processo {
    nome: string;
    ingresso: number;
    tempo: number;

    constructor(nome: string, ingresso: number, tempo: number) {
        this.nome = nome;
        this.ingresso = ingresso;
        this.tempo = tempo;
    }
}

class RoundRobin {
    processos: Processo[] = [];
    quantum: number;
    tempoTotal: number;
    tempoTotalEspera: number;
    tempoMedioEspera: number;
    tempoMedioExecucao: number;

    constructor(quantum: number) {
        this.quantum = quantum;
        this.tempoTotal = 0;
        this.tempoTotalEspera = 0;
        this.tempoMedioEspera = 0;
        this.tempoMedioExecucao = 0;
    }

    addProcesso(nome: string, ingresso: number, tempo: number) {
        this.processos.push(new Processo(nome, ingresso, tempo));
    }

    executar() {
        let tempoTotal = 0;
        let tempoTotalEspera = 0;
        let processos = this.processos.slice(); // Cria uma cópia dos processos para não modificar a lista original
        const quantum = this.quantum;

        while (processos.length > 0) {
            for (let i = 0; i < processos.length; i++) {
                const processo = processos[i];

                if (processo.ingresso <= tempoTotal) {
                    if (processo.tempo <= quantum) {
                        tempoTotal += processo.tempo;
                        tempoTotalEspera += tempoTotal - processo.ingresso - processo.tempo;
                        processos.splice(i, 1);
                        i--;
                    } else {
                        tempoTotal += quantum;
                        processo.tempo -= quantum;
                    }
                } else {
                    tempoTotal++;
                    i--;
                }
            }
        }

        const quantidadeProcessos = this.processos.length;
        this.tempoTotal = tempoTotal;
        this.tempoTotalEspera = tempoTotalEspera;
        this.tempoMedioEspera = tempoTotalEspera / quantidadeProcessos;
        this.tempoMedioExecucao = tempoTotal / quantidadeProcessos;
    }

    retorno(): string[] {
        const retorno: string[] = [];
        retorno.push(`Tempo total de espera: ${this.tempoTotalEspera.toFixed(2)}`);
        retorno.push(`Tempo médio de espera: ${this.tempoMedioEspera.toFixed(2)}`);
        retorno.push(`Tempo médio de execução: ${this.tempoMedioExecucao.toFixed(2)}`);
        return retorno;
    }
}

const quantumInput: HTMLInputElement | null = document.getElementById("quantum") as HTMLInputElement;
const btnIniciar: HTMLInputElement | null = document.getElementById("iniciar") as HTMLInputElement;

let rr: RoundRobin;

if (quantumInput && btnIniciar) {
    btnIniciar.addEventListener("click", () => {
        rr = new RoundRobin(parseInt(quantumInput.value));
        document.getElementById("Quantum")?.setAttribute("hidden", "true");
        document.getElementById("inputs")?.removeAttribute("hidden");
    });

    const btnAdd: HTMLInputElement | null = document.getElementById("adicionar") as HTMLInputElement;
    const btnExecutar: HTMLInputElement | null = document.getElementById("executar") as HTMLInputElement;

    const nomeInput: HTMLInputElement | null = document.getElementById("nome") as HTMLInputElement;
    const ingressoInput: HTMLInputElement | null = document.getElementById("ingresso") as HTMLInputElement;
    const tempoInput: HTMLInputElement | null = document.getElementById("tempo") as HTMLInputElement;

    const tabela: HTMLElement | null = document.getElementById("tabela");
    const tabelaMedias: HTMLElement | null = document.getElementById("tabela-medias");

    const divProcessos: HTMLElement | null = document.getElementById("resultado-processos");
    const divMedias: HTMLElement | null = document.getElementById("resultado-medias");

    if (btnAdd) {
        btnAdd.addEventListener("click", () => {
            if (nomeInput && ingressoInput && tempoInput) {
                rr.addProcesso(nomeInput.value, parseInt(ingressoInput.value), parseInt(tempoInput.value));
                if (tabela) {
                    tabela.innerHTML += `<tr><td>${nomeInput.value}</td><td>${ingressoInput.value}</td><td>${tempoInput.value}</td></tr>`;
                }

                if (divProcessos?.hasAttribute("hidden")) {
                    divProcessos?.removeAttribute("hidden");
                }
            }
        });

        if (btnExecutar) {
            btnExecutar.addEventListener("click", () => {
                rr.executar();
                if (tabelaMedias) {
                    tabelaMedias.innerHTML += `<tr><td colspan="3">${rr.retorno()}</td></tr>`;
                }

                if (divMedias?.hasAttribute("hidden")) {
                    divMedias?.removeAttribute("hidden");
                }
            });
        }
    }
}
