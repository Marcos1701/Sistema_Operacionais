FIFO, LRU e NRU são algoritmos de substituição de páginas usados em sistemas de gerenciamento de memória virtual para decidir qual página deve ser removida da memória quando há uma falta de página (page fault).


Aqui está um resumo das diferenças entre eles:




FIFO (First-In, First-Out):



Funcionamento: O algoritmo FIFO substitui a página que entrou primeiro na memória, ou seja, a página mais antiga é removida.

Vantagens: É simples de implementar.

Desvantagens: Não considera o padrão de acesso às páginas, o que pode resultar em uma taxa de acertos menor em certos cenários.




LRU (Least Recently Used - Menos Recente Utilizado):



Funcionamento: O algoritmo LRU substitui a página que foi menos recentemente utilizada, ou seja, a página que não foi acessada por um longo período de tempo.

Vantagens: Considera o padrão de acesso às páginas, removendo as páginas menos utilizadas.

Desvantagens: Pode ser mais complexo de implementar do que o FIFO.




NRU (Not Recently Used - Não Utilizado Recentemente):



Funcionamento: O algoritmo NRU divide as páginas em quatro classes com base em dois bits associados a cada página: R (Referenced - Referenciado) e M (Modified - Modificado). A cada intervalo de tempo, as páginas são classificadas em uma das quatro classes, e uma página é escolhida aleatoriamente dentro da classe mais baixa para substituição.

Vantagens: Considera tanto o padrão de acesso quanto a modificação das páginas.

Desvantagens: A escolha aleatória pode levar a uma taxa de acertos menor do que outros algoritmos.




Cada algoritmo tem suas próprias vantagens e desvantagens, e a escolha do algoritmo de substituição de páginas depende das características e requisitos do sistema em questão. Além desses algoritmos, existem muitos outros desenvolvidos ao longo dos anos, cada um com suas peculiaridades e otimizações para diferentes cenários.
