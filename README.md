## Kubernetes K3D | Docker

#### instalação Docker https://docs.docker.com/get-docker/

#### Instalação Kubectl https://kubernetes.io/docs/tasks/tools/

### Habilitar auto complete kubectl

`source <(kubectl completion bash)`

### Habilitar context atual do cluster criado

`kubectl config use-context <name-cluster>`

`kubectl config get-contexts`

`kubectl config delete-cluster my-cluster`

#### Instalação Kd3 https://k3d.io/#installation

### Configuração Cluster K3D

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

#### Kubernetes orquestração com kubectl

usado para passar namespace: `-n`
usado para passar em gets em tempo real: `-w`
usado para passar em gets visualização geral dos registros: `-o wide`

Rollout-Back

###### services, deployment, replicaset, pods

`kubectl rollout undo deployment.v1.apps/nginx-deployment`

Criação e com namespace

###### services, deployment, replicaset, pods

`kubectl create -f <nome_arquivo-ou-pasta>`

`kubectl -n robot-shop create -f <nome_arquivo-ou-pasta>`

Alteração

###### services, deployment, replicaset, pods

`kubectl apply -f <nome_arquivo>`

Executar bash nos pods/containers

###### pods

`kubectl exec -it <nome-pod> /bin/sh`

Delete

###### services, deployment, replicaset, pods

`kubectl delete [services, deployment, replicaset, pods] <nome>`

Delete por labels

###### services, deployment, replicaset, pods

`kubectl get pods --show-labels`

`kubectl delete pods -l app=http-deployment,pod-template-hash=cd7cc4678`

Visualização pods internos

`kubectl get pods -n kube-system`
`kubectl get pods --namespace=kube-system`

Visualização pods com ip's

`kubectl get all -o wide`
`kubectl get pods -o wide -n kube-system`
`kubectl get pods -o wide -w`

Visualização pods com namespace

`kubectl get pods -n robot-shop -w`

Visualização

###### services, deployment, replicaset, pods

`kubectl get all`

`kubectl get pods --show-labels`

`kubectl get pods --all-namespaces`

`kubectl get nodes,services,deployments,replicasets,pods`

`kubectl get nodes`

`kubectl get service`

`kubectl get deployment`

`kubectl get replicaset`

`kubectl get pods`

Visualização detalhado

###### services, deployment, replicaset, pods

`kubectl describe [services, deployment, replicaset, pods]/<nome-ou-id>`

Reencaminhamento de porta para maquina local

###### services, deployment, replicaset, pods

`kubectl port-forward [services, deployment, replicaset, pods]/<nome-ou-id> 8080:80`

Visualização pela labels

###### services, deployment, replicaset, pods

`kubectl get [services, deployment, replicaset, pods] -l app=<labels-app-name>`
