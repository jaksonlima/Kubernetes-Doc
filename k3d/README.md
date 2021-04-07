#### Guia instalação k3d

### https://k3d.io/

#### Configuração e criação do cluster, mapeamento porta service, necessário docker

`k3d cluster create --config k3d-config-open-port.yaml`

`k3d cluster list`

`k3d cluster delete k3d-init`

#### Criação deployment e service

`kubectl get nodes`

`kubectl create -f k8s/`

`kubectl get service,deployment,replicaset,pod`

#### http://localhost:8081/

#### Parametros de configuração k3d

Porta `-p`

Quantidade de control-plane: `--servers 2`

Quantidade de agents/pods: `--agents 2`

Desabilitar Balanceamento de carga: `--no-lb`

#### Parametros de criação/delete cluster k3d

Status cluster

`k3d cluster list`

Criação do cluster simples

`k3d cluster create <nome-cluster>`

Criação do cluster selecionando servers, agents

`k3d cluster create <nome-cluster> --servers 2 --agents 2`

Criação do cluster selecionando servers, agents
e loadbalancer, configuração de um NodeIP service
para acesso ao container externo do kubernetes.

###### Porta 8080 do loadbalancer do k3d

###### NodePort 30000 do service kubernetes

Quando definido o type node port de 30000 a 32747,
basta pegar ip da maquina e chamar com a porta
definida no nodePort.
exemplo: 127.0.0.1:30001

`k3d cluster create <nome-cluster> --servers 1 --agents 2 -p "8080:30000@loadbalancer"`

Para deletar, toda a arvore de criação do cluster juntamente com
services, deployment, replicaset, pod.

`k3d cluster delete <nome-cluster>`
