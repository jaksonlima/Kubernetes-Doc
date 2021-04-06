#### Guia instalação kind

### https://kind.sigs.k8s.io/docs/user/quick-start/

#### Configuração e criação do cluster, mapeamento porta service, necessário docker

`kind create cluster --config=kind-config-open-port.yaml`

`kind delete cluster`

#### Criação deployment e service

`kubectl get nodes`

`kubectl create -f k8s/`

`kubectl get service,deployment,replicaset,pod`

#### http://localhost:8080/
