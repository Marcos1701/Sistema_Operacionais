"use strict";
// Round-robin algorithm
class Processo {
    constructor(nome, ingresso, tempo) {
        this.nome = nome;
        this.ingresso = ingresso;
        this.tempo = tempo;
    }
}
class RoundRobin {
    constructor(quantum) {
        this.processos = [];
        this.quantum = quantum;
        this.tempoTotal = 0;
        this.tempoTotalEspera = 0;
        this.tempoMedioEspera = 0;
        this.tempoMedioExecucao = 0;
    }
    addProcesso(nome, ingresso, tempo) {
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
                    }
                    else {
                        tempoTotal += quantum;
                        processo.tempo -= quantum;
                    }
                }
                else {
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
    retorno() {
        const retorno = [];
        retorno.push(`Tempo total de espera: ${this.tempoTotalEspera.toFixed(2)}`);
        retorno.push(`Tempo médio de espera: ${this.tempoMedioEspera.toFixed(2)}`);
        retorno.push(`Tempo médio de execução: ${this.tempoMedioExecucao.toFixed(2)}`);
        return retorno;
    }
}
const quantumInput = document.getElementById("quantum");
const btnIniciar = document.getElementById("iniciar");
let rr;
if (quantumInput && btnIniciar) {
    btnIniciar.addEventListener("click", () => {
        var _a, _b;
        rr = new RoundRobin(parseInt(quantumInput.value));
        (_a = document.getElementById("Quantum")) === null || _a === void 0 ? void 0 : _a.setAttribute("hidden", "true");
        (_b = document.getElementById("inputs")) === null || _b === void 0 ? void 0 : _b.removeAttribute("hidden");
    });
    const btnAdd = document.getElementById("adicionar");
    const btnExecutar = document.getElementById("executar");
    const nomeInput = document.getElementById("nome");
    const ingressoInput = document.getElementById("ingresso");
    const tempoInput = document.getElementById("tempo");
    const tabela = document.getElementById("tabela");
    const tabelaMedias = document.getElementById("tabela-medias");
    const divProcessos = document.getElementById("resultado-processos");
    const divMedias = document.getElementById("resultado-medias");
    if (btnAdd) {
        btnAdd.addEventListener("click", () => {
            if (nomeInput && ingressoInput && tempoInput) {
                rr.addProcesso(nomeInput.value, parseInt(ingressoInput.value), parseInt(tempoInput.value));
                if (tabela) {
                    tabela.innerHTML += `<tr><td>${nomeInput.value}</td><td>${ingressoInput.value}</td><td>${tempoInput.value}</td></tr>`;
                }
                if (divProcessos === null || divProcessos === void 0 ? void 0 : divProcessos.hasAttribute("hidden")) {
                    divProcessos === null || divProcessos === void 0 ? void 0 : divProcessos.removeAttribute("hidden");
                }
            }
        });
        if (btnExecutar) {
            btnExecutar.addEventListener("click", () => {
                rr.executar();
                if (tabelaMedias) {
                    tabelaMedias.innerHTML += `<tr><td colspan="3">${rr.retorno()}</td></tr>`;
                }
                if (divMedias === null || divMedias === void 0 ? void 0 : divMedias.hasAttribute("hidden")) {
                    divMedias === null || divMedias === void 0 ? void 0 : divMedias.removeAttribute("hidden");
                }
            });
        }
    }
}
