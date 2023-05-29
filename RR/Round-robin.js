"use strict";
// // Round-robin algorithm
// import prompt from 'prompt-sync';
// const input = prompt();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// class Processo {
//     nome: string;
//     ingresso: number;
//     tempoTotaldeExecucao: number;
//     tempoTotalEspera: number;
//     graficoParcial: string;
//     constructor(nome: string, ingresso: number, tempoTotaldeExecucao: number) {
//         this.nome = nome;
//         this.ingresso = ingresso;
//         this.tempoTotaldeExecucao = tempoTotaldeExecucao;
//         this.tempoTotalEspera = 0;
//         this.graficoParcial = `${this.nome}} | `;
//     }
// }
// class RoundRobin {
//     processos: Processo[] = [];
//     quantum: number;
//     tempoTotal: number;
//     tempoTotalEspera: number;
//     tempoMedioEspera: number;
//     tempoMedioExecucao: number;
//     grafico: string = '';
//     constructor(quantum: number) {
//         this.quantum = quantum;
//         this.tempoTotal = 0;
//         this.tempoTotalEspera = 0;
//         this.tempoMedioEspera = 0;
//         this.tempoMedioExecucao = 0;
//     }
//     addProcesso(nome: string, ingresso: number, tempoTotaldeExecucao: number) {
//         this.processos.push(new Processo(nome, ingresso, tempoTotaldeExecucao));
//     }
//     executar() {
//         let processos: Processo[] = this.processos;
//         let quantum = this.quantum;
//         let tempoTotal = this.tempoTotal;
//         let tempoTotalEspera = this.tempoTotalEspera;
//         while (processos.length > 0) {
//             let processo = processos.shift() as Processo;
//             if(processo.ingresso < tempoTotal){
//                 processos.push(processo);
//                 continue;
//             }
//             if (processo.tempoTotaldeExecucao > quantum) {
//                 processo.tempoTotaldeExecucao -= quantum;
//                 tempoTotal += quantum;
//                 tempoTotalEspera += quantum * (processos.length - 1);
//                 processo.graficoParcial += `${'='.repeat(quantum)}| `;
//                 for (let processo of processos){ 
//                     processo.graficoParcial += `${'~'.repeat(quantum)}| `;
//                 }
//                 processos.push(processo);
//             } else {
//                 tempoTotal += processo.tempoTotaldeExecucao;
//                 tempoTotalEspera += (processos.length - 1) * processo.tempoTotaldeExecucao;
//                 processo.tempoTotaldeExecucao = 0;
//                 processo.graficoParcial += `${'='.repeat(processo.tempoTotaldeExecucao)}`;
//                 for (let processo of processos){
//                     processo.graficoParcial += `${'~'.repeat(processo.tempoTotaldeExecucao)}| `;
//                 }
//             }
//         }
//         this.tempoTotal = tempoTotal;
//         this.tempoTotalEspera = tempoTotalEspera;
//         this.tempoMedioEspera = tempoTotalEspera / this.processos.length;
//         this.tempoMedioExecucao = tempoTotal / this.processos.length;
//     }
//     retorno() {
//         let retorno = [];
//         retorno.push('------- Valores resultantes -------');
//         retorno.push(`Tempo total de execução: ${this.tempoTotal}s`);
//         retorno.push(`Tempo total de espera: ${this.tempoTotalEspera}s`);
//         retorno.push(`Tempo médio de espera: ${this.tempoMedioEspera}s`);
//         retorno.push(`Tempo médio de execução: ${this.tempoMedioExecucao}s`);
//         return retorno;
//     }
//     graficoGeral() {
//         let grafico = '------- Grafico Resultante -------\n';
//         for (let processo of this.processos) {
//             grafico += processo.graficoParcial + '\n';
//         }
//         grafico += '-'.repeat(this.tempoTotal) + '\n';
//         return grafico;
//     }
// }
// function main(){
//     console.log('Round-robin\n');
//     let quantum = parseInt(input('Quantum: '));
//     while (isNaN(quantum) || quantum <= 0) {
//         console.log('Quantum inválido!!\n');
//         quantum = parseInt(input('Quantum: '));
//     }
//     const roundRobin = new RoundRobin(quantum);
//     let opcao = 1;
//     while (opcao != 0) {
//         console.log('\n1 - Adicionar processo\n2 - Executar\n0 - Sair\n\n');
//         opcao = parseInt(input('=> '));
//         switch (opcao) {
//             case 1:
//                 const nome = input('Nome do processo: ');
//                 const ingresso = parseInt(input('Tempo de ingresso (em segundos): '));
//                 const tempo = parseFloat(input('Tempo de execução(em segundos): '));
//                 roundRobin.addProcesso(nome, ingresso, tempo);
//                 break;
//             case 2:
//                 roundRobin.executar();
//                 console.log(roundRobin.graficoGeral());
//                 console.log('\n');
//                 console.log(roundRobin.retorno().join('\n'));
//                 break;
//             case 0:
//                 break;
//             default:
//                 console.log('Opção inválida');
//         }
//     }
// }
// main()
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const input = (0, prompt_sync_1.default)();
class Processo {
    constructor(nome, ingresso, tempoTotaldeExecucao) {
        this.nome = nome;
        this.ingresso = ingresso;
        this.tempoTotaldeExecucao = tempoTotaldeExecucao;
        this.tempoTotalEspera = 0;
        this.graficoParcial = `${this.nome} | `;
    }
}
class RoundRobin {
    constructor(quantum) {
        this.processos = [];
        this.grafico = '';
        this.quantum = quantum;
        this.tempoTotal = 0;
        this.tempoTotalEspera = 0;
        this.tempoMedioEspera = 0;
        this.tempoMedioExecucao = 0;
    }
    addProcesso(ingresso, tempoTotaldeExecucao) {
        const nome = `p${this.processos.length + 1}`;
        this.processos.push(new Processo(nome, ingresso, tempoTotaldeExecucao));
    }
    executar() {
        let processos = this.processos.slice();
        let quantum = this.quantum;
        let tempoTotal = this.tempoTotal;
        let tempoTotalEspera = this.tempoTotalEspera;
        while (processos.length > 0) {
            let processo = processos.shift();
            if (processo.ingresso > tempoTotal) {
                processos.push(processo);
                tempoTotal++;
                continue;
            }
            if (processo.tempoTotaldeExecucao > quantum) {
                processo.tempoTotaldeExecucao -= quantum;
                tempoTotal += quantum;
                tempoTotalEspera += quantum * (processos.length);
                processo.graficoParcial += `${'-'.repeat(quantum)}`;
                this.grafico += `${'-'.repeat(quantum)} ${tempoTotal}`;
                for (let p of processos) {
                    p.graficoParcial += `${'~'.repeat(quantum)}`;
                }
                processos.push(processo);
            }
            else {
                tempoTotal += processo.tempoTotaldeExecucao;
                tempoTotalEspera += (processos.length) * processo.tempoTotaldeExecucao;
                processo.tempoTotaldeExecucao = 0;
                processo.graficoParcial += `${'-'.repeat(processo.tempoTotaldeExecucao)} (FINALIZADO)`;
                for (let p of processos) {
                    p.graficoParcial += `${'~'.repeat(processo.tempoTotaldeExecucao)}`;
                }
            }
        }
        this.tempoTotal = tempoTotal;
        this.tempoTotalEspera = tempoTotalEspera;
        this.tempoMedioEspera = tempoTotalEspera / this.processos.length;
        this.tempoMedioExecucao = tempoTotal / this.processos.length;
    }
    retorno() {
        let retorno = [];
        retorno.push('------- Valores resultantes -------');
        retorno.push(`Tempo total de execução: ${this.tempoTotal} s`);
        retorno.push(`Tempo total de espera: ${this.tempoTotalEspera} s`);
        retorno.push(`Tempo médio de espera: ${this.tempoMedioEspera.toFixed(2)} s`);
        retorno.push(`Tempo médio de execução: ${this.tempoMedioExecucao.toFixed(2)} s`);
        return retorno;
    }
    graficoGeral() {
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
    const roundRobin = new RoundRobin(quantum);
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
                roundRobin.executar();
                console.log(roundRobin.graficoGeral());
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
