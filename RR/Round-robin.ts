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

