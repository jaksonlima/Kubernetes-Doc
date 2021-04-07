## K8S Parametros

### Habilitar context atual do cluster criado

`kubectl config use-context <name-cluster>`

`kubectl config get-contexts`

`kubectl config delete-cluster my-cluster`

#### Instalação Kd3 https://k3d.io/#installation

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
