## Kubernetes K3D | Docker

#### instalação Docker https://docs.docker.com/get-docker/

#### Instalação Kubectl https://kubernetes.io/docs/tasks/tools/

#### Instalação Kd3 https://k3d.io/#installation

### Configuração Cluster K3D

#### Parametros de configuração k3d

Quantidade de control-plane: `--servers 2`

Quantidade de agents/pods: `--agents 2`

Desabilitar Balanceamento de carga: `--no-lb`

#### Parametros de criação cluster k3d

Criação do cluster simples

`k3d cluster create <nome-cluster>`

Criação do cluster selecionando <servers> e <agents>

`k3d cluster create <nome-cluster> --servers 2 --agents 2`
