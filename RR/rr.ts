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
    quantum: number;
    processos: Processo[];
    tempo: number;
    grafico: string;
    retornoProcessos: string[];

    constructor(quantum: number) {
        this.quantum = quantum;
        this.processos = [];
        this.tempo = 0;
        this.grafico = '';
        this.retornoProcessos = [];
    }

    addProcesso(ingresso: number, tempoTotaldeExecucao: number) {
        const nome = `P${this.processos.length + 1}`;
        const processo = new Processo(nome, ingresso, tempoTotaldeExecucao);
        this.processos.push(processo);
    }

    executar() {
        const processos = this.processos.sort((a, b) => a.ingresso - b.ingresso);
        let tempo = 0;
        const fila = [];
        let processoAtual: Processo | undefined = undefined;

        while (processos.length > 0 || fila.length > 0 || processoAtual) {
            while (processos.length > 0 && processos[0].ingresso <= tempo) {
                fila.push(processos.shift());
            }

            if (processoAtual) {
                
                if(processoAtual.tempoTotaldeExecucao > this.quantum){
                    processoAtual.tempoTotaldeExecucao -= this.quantum;
                    tempo += this.quantum;
                    processoAtual.graficoParcial += '-'.repeat(this.quantum);
                    for(let processo of fila){
                        if(processo){
                            processo.tempoTotalEspera += this.quantum;
                            processo.graficoParcial += ' ~ '.repeat(this.quantum);
                        }
                    }
                    fila.push(processoAtual);
                    processoAtual = undefined;
                }else{
                    tempo += processoAtual.tempoTotaldeExecucao;
                    processoAtual.graficoParcial += '-'.repeat(processoAtual.tempoTotaldeExecucao);
                    for(let processo of fila){
                        if(processo){
                            processo.tempoTotalEspera += processoAtual.tempoTotaldeExecucao;
                            processo.graficoParcial += ' ~ '.repeat(processoAtual.tempoTotaldeExecucao);
                        }
                    }
                    this.retornoProcessos.push(`${processoAtual.nome} - ${processoAtual.tempoTotalEspera}`);
                    processoAtual = undefined;
                }
            }

            if (!processoAtual && fila.length > 0) {
                processoAtual = fila.shift();
            }
            tempo++;
        }
    }

    graficoGeral() {
        let grafico = '';
        for (let processo of this.processos) {
            grafico += processo.graficoParcial + '\n';
        }
        return grafico;
    }

    retorno() {
        return this.retornoProcessos;
    }

}



function main(){
    const roundRobin = new RoundRobin(2);

    roundRobin.addProcesso(0, 5);
    roundRobin.addProcesso(1, 4);
    roundRobin.addProcesso(2, 2);
    roundRobin.addProcesso(3, 1);

    roundRobin.executar();

    console.log(roundRobin.graficoGeral());
    console.log(roundRobin.retorno());
}

main()