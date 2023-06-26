- ## Impasse
   - ### Grupo de tarefas bloqueadas aguardando umas pelas outras.
   - ### Resumo
      - Um impasse (ou deadlock) ocorre quando dois ou mais processos em um sistema computacional ficam presos aguardando um recurso que está sendo usado por outro processo, resultando em uma situação em que nenhum dos processos pode avançar. Isso cria um impasse, pois cada processo está esperando pelo recurso que está sendo retido por outro processo.
      - Os impasses podem ocorrer devido a uma série de fatores, como alocação inadequada de recursos, sincronização inadequada entre processos, falta de prioridades claras ou dependências circulares entre os processos. Essa situação de impasse pode ser prejudicial para o desempenho e a eficiência do sistema, pois os recursos ficam inativos, impedindo o progresso dos processos e desperdiçando recursos disponíveis.
      - Para resolver impasses, são necessárias técnicas específicas, como o uso de algoritmos de prevenção, detecção e recuperação de deadlock. Essas técnicas visam evitar a ocorrência de impasses, detectar sua presença quando ocorrem e recuperar o sistema para que os processos possam continuar sua execução normalmente.
   - ### Condições para ocorrer um impasse
      - Exclusão Mútua: Recursos só podem ser usados por um processo de cada vez.
      - Espera Circular: Processos estão aguardando uns aos outros em um ciclo para obter recursos.
      - Não Preempção: Recursos não podem ser tomados à força de um processo.
      - Espera Circular: Deve existir um ciclo de dependências circulares entre os processos.
      - Se todas essas condições estiverem presentes simultaneamente, pode ocorrer um impasse. Para evitar impasses, é necessário eliminar ou evitar uma ou mais dessas condições.

# --------------------- Gerencia de Memória ----------------------------

- Resumo
    - Espaço de Endereçamento:

            Resumo: Cada processo tem seu próprio espaço de endereçamento, que é uma faixa de endereços de memória que ele pode acessar.
            Exemplo: Imagine dois processos em execução, A e B. O processo A tem acesso aos endereços de memória de 0 a 1000, enquanto o processo B tem acesso aos endereços de memória de 1001 a 2000. Isso garante que cada processo execute independentemente sem interferências.

   - Memória Física:

            Resumo: É a memória real disponível no sistema, geralmente implementada como chips de RAM.
            Exemplo: Se o sistema possui 4 GB de memória RAM, então a memória física seria representada pelos 4 bilhões de bytes disponíveis para armazenar dados e instruções em tempo real.

    - Memória Virtual:

              Resumo: É uma abstração da memória física, onde cada processo possui seu próprio espaço de memória virtual.
              Exemplo: Suponha que um processo tenha um espaço de memória virtual de 2 GB. Essa é a quantidade de memória que o processo acredita estar disponível para ele, independentemente da quantidade de memória física real no sistema.

    - Paginação:

              Resumo: Divide a memória física e virtual em páginas do mesmo tamanho e mantém um mapa de página para rastrear as correspondências entre elas.
              Exemplo: Se a página física e a página virtual têm um tamanho de 4 KB, então cada página física armazenará um bloco de 4 KB de dados e instruções. O mapa de página rastreará quais páginas virtuais estão mapeadas para quais páginas físicas.

    - Troca de Páginas (Swapping):

              Resumo: Quando a memória física fica cheia, o sistema operacional move páginas inativas para o disco rígido para liberar espaço para novas páginas.
              Exemplo: Suponha que um sistema esteja executando vários processos simultaneamente e a memória física esteja cheia. O sistema operacional identificará páginas que não estão sendo usadas ativamente por nenhum processo e as moverá para o disco rígido, liberando espaço para páginas de outros processos.
      
   - Gerenciamento de Memória Virtual:

              Resumo: O sistema operacional é responsável por gerenciar o mapeamento entre páginas virtuais e físicas, controlar permissões de acesso e decidir quais páginas manter na memória física.
              Exemplo: Quando um processo tenta acessar um endereço de memória virtual, o sistema operacional verifica o mapa de página para encontrar a correspondência física e permite ou nega o acesso com base nas permissões definidas.

  - Memória Compartilhada:

              Resumo: Permite que vários processos acessem a mesma área de memória, facilitando a comunicação e o compartilhamento de dados entre eles.
              Exemplo: Dois processos podem compartilhar uma área de memória onde eles escrevem e leem dados em comum. Isso permite que eles cooperem e troquem informações de forma eficiente.

  - Fragmentação:

              Resumo: Ocorre quando pequenos blocos de memória livre ficam espalhados, reduzindo a eficiência do uso da memória.
              Exemplo: Imagine que dois processos são carregados e descarregados da memória ao longo do tempo, deixando pequenos espaços vazios entre eles. Esses espaços vazios são fragmentos de memória que não podem ser usados para alocar um novo processo, levando à fragmentação.
              

- RESUMO SIMPLIFICADO DOS PRINCIPAIS TÓPICOS:
     
     - Espaço de Endereçamento:

            Resumo simplificado: Cada programa tem sua própria "área" na memória onde pode armazenar coisas.
       
            Exemplo simplificado: Imagine que cada programa tenha seu próprio quarto onde pode colocar suas coisas. Um programa não
             pode acessar o quarto de outro programa, então eles não interferem um no outro.

  - Memória Física:
          
          Resumo simplificado: É a memória real disponível no computador.
    
          Exemplo simplificado: A memória física é como a mesa de trabalho onde você pode colocar e manipular
          objetos enquanto trabalha. Quanto mais espaço na mesa, mais coisas você pode ter à mão.

  - Memória Virtual:
          
          Resumo simplificado: É uma maneira de fingir que há mais memória disponível do que realmente há.
    
          Exemplo simplificado: Imagine que você tem um caderno pequeno, mas usa um índice para se referir a páginas de
          outros cadernos maiores. Você pode se referir a essas páginas maiores sem realmente tê-las todas no seu
            caderno pequeno.

  - Paginação:
          
          Resumo simplificado: Divide a memória em pedaços pequenos chamados "páginas" para facilitar o gerenciamento.
    
          Exemplo simplificado: Você divide um armário grande em gavetas do mesmo tamanho. Cada gaveta é uma "página".
          Dessa forma, você pode organizar e encontrar coisas com mais facilidade.

  - Troca de Páginas (Swapping):
          
            Resumo simplificado: Quando a memória fica cheia, algumas coisas menos usadas são temporariamente movidas para
          outro lugar para abrir espaço para coisas novas.
    
          Exemplo simplificado: Imagine que sua mesa de trabalho esteja cheia de coisas. Você pode mover algumas coisas menos
             importantes para uma prateleira próxima para liberar espaço na mesa.
   
   -  Gerenciamento de Memória Virtual:
          
          Resumo simplificado: O sistema operacional cuida de "traduzir" os endereços de memória usados pelos programas
            para a memória física real.
      
          Exemplo simplificado: Digamos que você tenha um mapa que relaciona as páginas do seu caderno pequeno com as
          páginas dos cadernos maiores. Você pode usá-lo para encontrar a página real correspondente a um número de
          página do seu caderno pequeno.

  - Memória Compartilhada:
          
          Resumo simplificado: Vários programas podem usar a mesma área de memória para compartilhar informações.
    
          Exemplo simplificado: Imagine que você e seu amigo possam escrever e ler notas em um quadro branco compartilhado.
           Vocês podem cooperar e atualizar as informações para trabalhar em conjunto.
 
 - Fragmentação:
          
          Resumo simplificado: Pequenos espaços vazios entre coisas na memória podem fazer com que a memória não seja
         usada de forma eficiente.
   
          Exemplo simplificado: Se houver pequenos espaços vazios entre objetos na sua mesa de trabalho, você não poderá
         usar esses espaços para colocar novos objetos, resultando em desperdício de espaço.




## ---------- Gerenciamento de memória Virtual ----------

- ## Divisão de memória:
   - Memória é dividida em páginas.
   - Espaço de endereçamento virtual é dividido em páginas virtuais.

- ## Mapeamento:
   - Mapeamento entre páginas virtuais e físicas.
   - Tabela de páginas mantém o mapeamento.

- ## Paginação:
   - Páginas são carregadas sob demanda.
   - Ocorre falha de página se página não está presente na memória física.
   - Páginas são buscadas e carregadas do armazenamento secundário.

- ## Substituição de páginas:
   - Se memória física estiver cheia, páginas são substituídas.
   - Algoritmos de substituição, como LRU, são utilizados.

- ## Proteção de memória:
   - Páginas possuem permissões de acesso.
   - Protege processos uns contra os outros.
  
- ## O gerenciamento de memória virtual permite:
   - Execução eficiente de programas com memória física limitada.
   - Abstração de memória contígua para os processos.
   - Aproveitamento máximo da memória disponível.
   - Proteção e controle de acesso entre os processos.

--  -------------  ------

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

------------------------------------ Calculo -----------------------------------------------

Resumo simplificado:

O sistema operacional usa uma tabela de páginas para fazer a correspondência entre páginas virtuais e físicas.
Quando um programa faz referência a um endereço virtual, o sistema operacional divide esse endereço em número da página e deslocamento.
Ele busca na tabela de páginas o número da página virtual correspondente, obtendo o número da página física.
O sistema operacional concatena o número da página física com o deslocamento para obter o endereço físico correspondente.
Exemplo simplificado:

Suponha que um programa esteja executando com páginas virtuais de tamanho 4 KB.
O programa faz referência ao endereço virtual 0x1234, onde os primeiros 12 bits representam o número da página e os últimos 12 bits representam o deslocamento dentro da página.
A tabela de páginas tem a entrada: Página virtual 0x1 mapeada para a Página física 0x7.
O número da página virtual é 0x1, portanto, corresponde à página física 0x7.
O deslocamento dentro da página é 0x234.
O endereço físico correspondente é 0x7234 (concatenação do número da página física 0x7 com o deslocamento 0x234).
Nesse exemplo simplificado, o cálculo do endereço físico é feito através do mapeamento da página virtual para a página física usando a tabela de páginas. O número da página física é concatenado com o deslocamento para obter o endereço físico completo.

Lembre-se de que esse exemplo é uma simplificação e não considera todos os detalhes do cálculo real, mas espero que ele ilustre de forma clara como o cálculo é realizado.
