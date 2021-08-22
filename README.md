![gruppo lineCode](https://imagizer.imageshack.com/img923/557/86bUrf.png)

# Unit - PORTACS
Componente Unit per l'applicativo PORTACS sviluppato come attività progettuale per il corso di Ingegneria del Software dell'Università degli Studi di Padova sotto il nominativo di Progetto _PORTACS_.

## Overview
L'applicativo funge da simulatore per il comportamento di un unità robotica a guida autonoma in un contesto di ristorazione, ed é pensato per funzionare in collegamento alle altre componenti sviluppate nello stesso contesto.

## Installazione, dipendenze ed esecuzione
Dipendenze:
 - Node.js
 - npm
 - Docker
 
 Clonare repo con:
 ```shell
 git clone https://github.com/lineCode-swe/unit.git
 ```
 
 Compilazione dell'applicativo con:
  ```shell
 npx tsc src/main.ts
 ```
 
 Creazione della Docker image:
  ```shell
docker build -t portacs-unit
 ```
 
Creazione delle variabili d'ambiente che contengono:
- UNIT_ID: id che si vuole assegnare alla specifica unità
- BASE_X: coordinata X della base dell'unità
- BASE_Y: coordinata Y della base dell'untià
 
Avvio delle componenti sensors e server (per indicazioni vedere le pagine specifiche dedicate alle singole componenti)

Avvio della Docker image:
 ```shell
 docker run --interactive --tty --network portacs-net
 ```

