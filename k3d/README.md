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
