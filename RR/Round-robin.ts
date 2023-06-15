import prompt from 'prompt-sync';
const input = prompt();

class Processo {
    nome: string;
    ingresso: number;
    tempoTotaldeExecucao: number;
    tempoTotalEspera: number;
    graficoParcial: string;

    constructor(nome: string, ingresso: number, tempoTotaldeExecucao: number) {
        this.nome = nome;
        this.ingresso = ingresso;
        this.tempoTotaldeExecucao = tempoTotaldeExecucao;
        this.tempoTotalEspera = 0;
        this.graficoParcial = `${this.nome} | `;
    }
}

class RoundRobin {
    processos: Processo[] = [];
    quantum: number;
    trocaContexto: number;
    tempoTotal: number;
    tempoTotalEspera: number;
    tempoMedioEspera: number;
    tempoMedioExecucao: number;
    grafico: string = '';

    constructor(quantum: number, trocaContexto: number = 0) {
        this.quantum = quantum;
        this.tempoTotal = 0;
        this.tempoTotalEspera = 0;
        this.tempoMedioEspera = 0;
        this.tempoMedioExecucao = 0;
        this.trocaContexto = trocaContexto;
    }

    addProcesso(ingresso: number, tempoTotaldeExecucao: number) {
        const nome = `p${this.processos.length + 1}`
        this.processos.push(new Processo(nome, ingresso, tempoTotaldeExecucao));
    }

    executar() {
        let fila: Processo[] = [];
        let processos: Processo[] = this.processos.slice().sort((a, b) => a.ingresso - b.ingresso);
        let trocaContexto: number = this.trocaContexto;
        let processoAtual = processos.shift()
        let tempo: number = 0;

        for (let t = 0, TT = 0, q = this.quantum; processos.length > 0 || fila.length > 0 || processoAtual != undefined; t++) {

            if (processoAtual && processoAtual.ingresso > tempo) {
                tempo++;
                continue;
            }
            if (TT > 0) {
                for (let processo of fila) {
                    if (processo) {
                        processo.tempoTotalEspera += 1;
                        if (TT === 0 || TT === trocaContexto) {
                            processo.graficoParcial += '|';
                            if (TT == 0) {
                                processo.graficoParcial += ' tt ';
                            }
                        }
                    }
                }
                continue;
            }

            while (processos.length > 0 && processos[0].ingresso <= tempo) {
                const processo = processos.shift();
                if (processo instanceof Processo) {
                    fila.push(processo);
                } else {
                    throw new Error('Erro ao adicionar processo na fila');
                }
            }

            if (processoAtual) {
                if (processoAtual.tempoTotaldeExecucao > 0 && q > 0) {
                    processoAtual.tempoTotaldeExecucao--;
                    processoAtual.graficoParcial += '~';
                    q--;
                    if (q === 0) {
                        fila.push(processoAtual);
                        processoAtual = undefined;
                        q = this.quantum;
                        TT = trocaContexto;
                    }
                } else {
                    processoAtual.graficoParcial += '|';
                    processoAtual = undefined;
                    q = this.quantum;
                    TT = trocaContexto;
                }
            }

            if (processoAtual == undefined && fila.length > 0) {
                processoAtual = fila.shift();
            }
            tempo++;
        }

        this.tempoTotal = tempo;
        this.tempoTotalEspera = this.processos.reduce((total, processo) => total + processo.tempoTotalEspera, 0);
        this.tempoMedioEspera = this.tempoTotalEspera / this.processos.length;
        this.tempoMedioExecucao = this.tempoTotal / this.processos.length;

        return this.graficoGeral();

    }

    retorno() {
        let retorno: string[] = [];
        retorno.push('------- Valores resultantes -------');
        retorno.push(`Tempo total de execução: ${this.tempoTotal} s`);
        retorno.push(`Tempo total de espera: ${this.tempoTotalEspera} s`);
        retorno.push(`Tempo médio de espera: ${this.tempoMedioEspera.toFixed(2)} s`);
        retorno.push(`Tempo médio de execução: ${this.tempoMedioExecucao.toFixed(2)} s`);
        return retorno;
    }

    private graficoGeral() {
        let grafico = '------- Gráfico Resultante -------\n\n';
        for (let processo of this.processos) {
            grafico += processo.graficoParcial + '\n';
        }
        grafico += '-'.repeat(this.tempoTotal) + '\n';
        grafico += 'Legenda:\n';
        grafico += '- = Processo está sendo Executado\n';
        grafico += '~ = Processo está esperando para ser executado\n';
        return grafico;
    }
}

function main() {
    console.log('Round-robin\n');

    let quantum = parseInt(input('Quantum: '));
    while (isNaN(quantum) || quantum <= 0) {
        console.log('Quantum inválido!!\n');
        quantum = parseInt(input('Quantum: '));
    }
    let tempo_troca_contexto = parseInt(input('Tempo de troca de contexto: '));
    while (isNaN(tempo_troca_contexto) || tempo_troca_contexto < 0) {
        console.log('Tempo de troca de contexto inválido!!\n');
        tempo_troca_contexto = parseInt(input('Tempo de troca de contexto: '));
    }
    const roundRobin = new RoundRobin(quantum, tempo_troca_contexto);
    let opcao = 1;

    while (opcao !== 0) {
        console.log('\n1 - Adicionar processo\n2 - Executar\n0 - Sair\n\n');
        opcao = parseInt(input('=> '));

        switch (opcao) {
            case 1:
                const ingresso = parseInt(input('Tempo de ingresso (em segundos): '));
                const tempo = parseFloat(input('Tempo de execução(em segundos): '));
                roundRobin.addProcesso(ingresso, tempo);
                break;
            case 2:
                console.log(roundRobin.executar());
                console.log('\n');
                console.log(roundRobin.retorno().join('\n'));
                break;
            case 0:
                break;
            default:
                console.log('Opção inválida');
        }
    }
}

main();