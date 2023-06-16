# Trabalho de Escalonamento Circular Round-Robin (Round-Robin Scheduling);
# Isto é, uma situação em que calcula-se o tempo médio de vida (tm_vida) e
# o tempo médio de espera (tm_espera) para um conjunto de tarefas utilizadas por
# um processador.

class Tarefa:
    # Método init ou constructor em Linguagem Python
    def __init__(self, tarefa, duracao_execucao):
        self.tarefa = tarefa
        self.duracao_execucao = duracao_execucao

print("Neste trabalho, serão levados em conta a submissão deste Algoritmo com submissão de 4 tarefas.")

ingressos_de_tarefas = [
    "ingresso_1"(5),
    "ingresso_2"(15),
    "ingresso_3"(10),
    "ingresso_4"(0),
]      # Esta é a duração de execução para cada tarefa, ou seja, seu ingresso no processador.

quantum = 15,
troca_contexto = 4

ingressos_de_tarefas.sort()
# Ordenando a execução de tarefas para quantum e trocas de contexto.

print(ingressos_de_tarefas.sort())

print("A primeira tarefa a ser executada será a tarefa 4.")

tarefa_4 = (0 + quantum + troca_contexto)
print("Logo, minha primeira tarefa, ou seja, a tarefa 4 irá rodar em: ", tarefa_4, "unidades de tempo.")

print("A segunda tarefa a ser executada será a tarefa 1.")

tarefa_1 = (tarefa_4 + quantum + troca_contexto)
print("Logo, minha segunda tarefa, ou seja, a tarefa 1 irá rodar em: ", tarefa_1, "unidades de tempo.")

print("A terceira tarefa a ser executada será a tarefa 3.")

tarefa_3 = (tarefa_1 + quantum + troca_contexto)
print("Logo, minha terceira tarefa, ou seja, a tarefa 3 irá rodar em: ", tarefa_3, "unidades de tempo.")

print("A quarta tarefa a ser executada será a tarefa 2.")

tarefa_2 = (tarefa_3 + quantum + troca_contexto)
print("Logo, minha quarta tarefa, ou seja, a tarefa 2 irá rodar em: ", tarefa_2, "unidades de tempo.")

valores_final = [tarefa_4, tarefa_1, tarefa_3, tarefa_2]
print(valores_final)

  # Somente para critério de dúvidas e esclarecimentos do funcionamento do Algoritmo Round-Robin

  # calcular_tempo_medio_vida = ((95 - 5) + (67 - 15) + (124 - 10) + (76 - 0) / 4)

  # calcular_tempo_medio_espera = (((19 - 5) + (80 - 34) + (57 - 15) + (38 - 10) + (99 - 53) + (71 - 15)) / 4)

def round_robin(tarefas, quantum):
    tempo_total = 0
    tarefas_concluidas = []

    while len(tarefas) > 0:
        tarefa_atual = tarefas.pop(0)
        if tarefa_atual.duracao_execucao > quantum:
            tempo_atual += quantum
            tarefa_atual.duracao_execucao -= quantum
            tarefa_atual.tempo_vida += quantum
            tarefa_atual.tempo_espera += tarefa_atual.tempo_vida
            tarefas.append(tarefa_atual)
        else:
            tempo_total += tarefa_atual.duracao_execucao
            tarefa_atual.tempo_vida += tarefa_atual.duracao_execucao
            tarefa_atual.tempo_espera += tarefa_atual.tempo_vida
            tarefas_concluidas.append(tarefa_atual)

    tempo_medio_vida = sum (tarefa.tempo_vida for tarefa in tarefas_concluidas) / len (tarefas_concluidas)
    tempo_medio_espera = sum(tarefa.tempo_espera for tarefa in tarefas_concluidas) / len (tarefas_concluidas)

    return tempo_medio_vida, tempo_medio_espera

# Criação das tarefas em Estado de Pronto

tarefas = [
    Tarefa("T1", 10),
    Tarefa("T2", 5),
    Tarefa("T3", 8),
    Tarefa("T4", 3),
]

quantum_2 = 4  # Outro valor para quantum, sem ser o da situação anteriror de 15 u.t. conforme a situação dada.

# Execução do Algoritmo Round-Robin
tempo_medio_vida, tempo_medio_espera = round_robin(tarefas, quantum)

print("Deste modo, o meu tempo médio de vida será: ", tempo_medio_vida)
print("E, após o meu tempo médio de vida, encontrarei o tempo médio de espera que será de: ", tempo_medio_espera)

# No final da execução do algoritmo, o tempo médio de vida e o tempo médio de espera são calculados com base nas
# tarefas concluídas e são exibidos como saída. #

# Lembrando que os valores de tempo de execução das tarefas e o quantum podem ser ajustados conforme necessário 
# para o seu cenário específico. #

















