import prompt from 'prompt-sync';
const input = prompt();

class Processo {
    nome: string;
    ingresso: number;
    duracao: number;
    tempodeVida: number;
    tempoTotalEspera: number;
    graficoParcial: string;

    constructor(nome: string, ingresso: number, tempoTotaldeExecucao: number) {
        this.nome = nome;
        this.ingresso = ingresso;
        this.duracao = tempoTotaldeExecucao;
        this.tempoTotalEspera = 0;
        this.tempodeVida = 0;
        this.graficoParcial = `${this.nome} | `;
    }

}

class RoundRobin {
    processos: Processo[] = [];
    quantum: number;
    trocaContexto: number;
    somatempodeVida: number;
    tempoTotalEspera: number;
    tempoMedioEspera: number;
    tempoMedioExecucao: number;
    grafico: string = '';

    constructor(quantum: number, trocaContexto: number = 0) {
        this.quantum = quantum;
        this.somatempodeVida = 0;
        this.tempoTotalEspera = 0;
        this.tempoMedioEspera = 0;
        this.tempoMedioExecucao = 0;
        this.trocaContexto = trocaContexto;
    }

    adicionarProcesso(processo: Processo) {
        this.processos.push(new Processo(processo.nome, processo.ingresso, processo.duracao))
    }

    printProcessos() {
        console.log('------- Processos -------');
        for (let processo of this.processos) {
            console.log(`Nome: ${processo.nome} | Ingresso: ${processo.ingresso} | Tempo total de execução: ${processo.duracao}`);
        }
    }

    reset() {
        this.processos = [];
        this.somatempodeVida = 0;
        this.tempoTotalEspera = 0;
        this.tempoMedioEspera = 0;
        this.tempoMedioExecucao = 0;
        this.grafico = '';
    }

    executar() {
        let fila: Processo[] = [];
        let processos: Processo[] = this.processos.slice().sort((a, b) => a.ingresso - b.ingresso);
        let trocaContexto: number = 0;
        let processoAtual: Processo | undefined = undefined;
        let tempo: number = 0;
        let quantum: number = this.quantum;
        let aux: boolean = true;

        console.log('------- Execução -------');

        while (true) {
            processos.sort((a, b) => a.ingresso - b.ingresso);
            for (let i = 0; i < processos.length; i++) {
                if (processos[i].ingresso === tempo) {
                    fila.push(processos[i]);
                    console.log(`Processo ${processos[i].nome} chegou na fila`);
                    processos.splice(i, 1);
                    i--;
                } else {
                    processos[i].graficoParcial += ' ';
                }
            }

            if (trocaContexto === 0 && processoAtual === undefined && fila.length >= 0) {
                if (fila.length === 0 && processoAtual === undefined) {
                    tempo++;
                    continue;
                }
                console.log(`Processo ${fila[0].nome} entrou em execução`);
                processoAtual = fila.shift();
                quantum = this.quantum;
                if (!aux) {
                    trocaContexto = this.trocaContexto;
                } else {
                    aux = false;
                }
            }


            if (processoAtual !== undefined) {
                if (trocaContexto > 0) {
                    if (trocaContexto === this.trocaContexto) {
                        processoAtual.graficoParcial += '|tt';
                        processoAtual.tempodeVida += this.trocaContexto;
                        for (let processo of fila) {
                            processo.tempodeVida += this.trocaContexto;
                            processo.tempoTotalEspera += this.trocaContexto + 1;
                            if (processo.ingresso === tempo) {
                                processo.graficoParcial += ' ';
                                continue;
                            }
                            processo.graficoParcial += '|tt';
                        }
                    } else if (trocaContexto === 1) {
                        processoAtual.graficoParcial += '|';
                        for (let processo of fila) {
                            if (processo.ingresso === tempo || tempo === processo.ingresso + this.trocaContexto - 1) {
                                processo.graficoParcial += ' ';
                                continue;
                            }
                            processo.graficoParcial += '|';
                        }
                    }
                    tempo++;
                    trocaContexto--;
                    continue;
                } else {
                    if (quantum === 0 && fila.length > 0) {
                        console.log(`Processo ${processoAtual.nome} saiu da execução`);
                        if (processoAtual.duracao === 0) {
                            processoAtual.graficoParcial += '|';
                        } else {
                            fila.push(processoAtual);
                        }
                        fila.forEach(processo => {
                            processo.tempoTotalEspera++;
                            processo.graficoParcial += '-';
                        });

                        processoAtual = undefined;
                        quantum = this.quantum;
                        trocaContexto = this.trocaContexto;
                        continue;
                    }
                    console.log(`Processo ${processoAtual.nome} está em execução, faltam ${processoAtual.duracao} unidades de tempo para finalizar`);
                    processoAtual.duracao--;
                    quantum--;
                    tempo++;
                    processoAtual.graficoParcial += '~';
                    processoAtual.tempodeVida++;
                    fila.forEach(processo => {
                        processo.tempodeVida++;
                        processo.tempoTotalEspera++;
                        processo.graficoParcial += '-';
                    });

                    if (processoAtual.duracao === 0) {
                        processoAtual.graficoParcial += '|';
                        console.log(`Processo ${processoAtual.nome} finalizou`);
                        if (fila.length === 0) {
                            break;
                        }
                        processoAtual = undefined;
                        quantum = this.quantum;
                        trocaContexto = this.trocaContexto;
                    }
                }
            } else {
                if (fila.length === 0) {
                    break;
                }
                processoAtual = fila.shift();
                quantum = this.quantum;
                trocaContexto = this.trocaContexto;
            }
        }

        this.somatempodeVida = this.processos.reduce((total, processo) => total + processo.tempodeVida, 0)
        this.tempoTotalEspera = this.processos.reduce((total, processo) => total + processo.tempoTotalEspera, 0);
        this.tempoMedioEspera = this.tempoTotalEspera / this.processos.length;
        this.tempoMedioExecucao = this.somatempodeVida / this.processos.length;

        return this.retorno();
    }

    retorno() {
        let retorno: string[] = [];
        retorno.push('\n------- Valores resultantes -------');
        retorno.push(`Tempo total de vida: ${this.somatempodeVida} u.t`);
        retorno.push(`Tempo total de espera: ${this.tempoTotalEspera} u.t`);
        retorno.push(`Tempo médio de espera(arredondado): ${this.tempoMedioEspera} u.t`);
        retorno.push(`Tempo médio de vida(arredondado): ${this.tempoMedioExecucao.toFixed(0)} u.t`);
        return retorno;
    }

    graficoGeral() {
        let grafico: string = '------- Gráfico Resultante -------\n\n';
        let tamanho: number = 0;
        for (let processo of this.processos) {
            if (processo.graficoParcial.length > tamanho) {
                tamanho = processo.graficoParcial.length;
            }
            grafico += processo.graficoParcial + ' (finalizado)\n';
        }
        grafico += '-'.repeat(tamanho) + '\n';
        grafico += 'Legenda:\n';
        grafico += '~ = Processo está sendo Executado\n';
        grafico += '- = Processo está esperando para ser executado\n';
        grafico += 'tt = troca de contexto\n';
        return grafico;
    }
}

function main() {
    console.log('Algoritmo Round-robin\n');

    let quantum: number = parseInt(input('Quantum: '));
    while (isNaN(quantum) || quantum <= 0) {
        console.log('Quantum inválido!!\n');
        quantum = parseInt(input('Quantum: '));
    }

    let tempo_troca_contexto: number = parseInt(input('Tempo de troca de contexto: '));
    while (isNaN(tempo_troca_contexto) || tempo_troca_contexto < 0) {
        console.log('Tempo de troca de contexto inválido!!\n');
        tempo_troca_contexto = parseInt(input('Tempo de troca de contexto: '));
    }

    let processos: Processo[] = [];

    const roundRobin: RoundRobin = new RoundRobin(quantum, tempo_troca_contexto);
    let opcao: number = 1;

    while (opcao !== 0) {
        console.log('\n1 - Adicionar processo\n2 - Exibir processos\n3 - Executar\n0 - Sair\n\n');
        opcao = parseInt(input('=> '));

        switch (opcao) {
            case 1:
                let ingresso: number = parseInt(input('Tempo de ingresso: '));
                while (isNaN(ingresso) || ingresso < 0) {
                    console.log('Tempo de ingresso inválido!!\n');
                    ingresso = parseInt(input('Tempo de ingresso: '));
                }
                let duracao: number = parseInt(input('Duração: '));
                while (isNaN(duracao) || duracao <= 0) {
                    console.log('Duração inválida!!\n');
                    duracao = parseInt(input('Duração: '));
                }
                processos.push(new Processo(`P${processos.length + 1}`, ingresso, duracao));
                console.clear();
                break;
            case 2:
                console.log('\n');
                for (let processo of processos) {
                    if (processo instanceof Processo) {
                        console.log(`${processo.nome} - Ingresso: ${processo.ingresso} u.t - Duração: ${processo.duracao} u.t`)
                    }
                }
                input('Pressione enter para continuar...');
                console.clear()
                break;
            case 3:
                roundRobin.reset();
                for (let processo of processos) {
                    roundRobin.adicionarProcesso(processo);
                }
                console.log(roundRobin.executar().join('\n'));
                console.log('\n');
                console.log(roundRobin.graficoGeral());
                input('Pressione enter para continuar...');
                console.clear()
                break;
            case 0:
                break;
            default:
                console.log('Opção inválida');
        }
    }
}

main();