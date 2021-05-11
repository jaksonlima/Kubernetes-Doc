- Documentação exemplo

- [https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)

- [https://github.com/badtuxx/DescomplicandoKubernetes](https://github.com/badtuxx/DescomplicandoKubernetes)

# ⭐ Instalação do Docker

- Debian

- A instalação do Docker pode ser realizada com apenas um comando, que deve ser executado nos três nós

```
curl -fsSL https://get.docker.com | bash
```

- Driver Cgroup do Docker será configurado para o systemd, mesmo do k8s

```
cat > /etc/docker/daemon.json <<EOF
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF
```

```
sudo mkdir -p /etc/systemd/system/docker.service.d
```

```
systemctl daemon-reload

systemctl restart docker
```

- Para finalizar, verifique se o driver Cgroup foi corretamente definido.

```
docker info | grep -i cgroup
```

# ⭐ Instalação do Containerd

- [https://kubernetes.io/docs/setup/production-environment/container-runtimes/#containerd](https://kubernetes.io/docs/setup/production-environment/container-runtimes/#containerd)

- [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)

```
cat <<EOF | sudo tee /etc/modules-load.d/containerd.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# Configure os parâmetros sysctl necessários, eles persistem durante as reinicializações.
cat <<EOF | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF

# Aplicar parâmetros sysctl sem reinicializar
sudo sysctl --system
```

```
 sudo apt-get update
 sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

```
 curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

```
 echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

```
 sudo apt-get update
 sudo apt-get install containerd.io
```

# ⭐ Instalação do Kubernetes

```
sudo apt-get update
```

```
sudo apt-get install -y apt-transport-https ca-certificates curl
```

- Baixe a chave de assinatura pública do Google Cloud

```
sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg

```

- Adicione o repositório apt do Kubernetes

```
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
```

- Atualize o índice do pacote apt, instale kubelet, kubeadm e kubectl e fixe suas versões

```
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

- Distribuições GNU/Linux também é necessário desativar a memória swap em todos os nós com o comando a seguir.

```
swapoff -a
```

# ⭐ Upgrading Kubernetes caso deseja atualizar versão já instaladas

- [https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/)

# ⭐ Inicialização cluster

- Escolha uma maquina como control plane master

```

kubeadm config images pull

```

```

kubeadm init

```

- A saída do comando será algo similar ao mostrado a seguir.

```

    [WARNING SystemVerification]: docker version is greater than the most recently validated version. Docker version: 18.05.0-ce. Max validated version: 17.03

...
To start using your cluster, you need to run the following as a regular user:

mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config
...
kubeadm join --token 39c341.a3bc3c4dd49758d5 IP_DO_MASTER:6443 --discovery-token-ca-cert-hash sha256:37092
...

```

- Configuração do arquivo de contextos do kubectl

```

mkdir -p $HOME/.kube

cp -i /etc/kubernetes/admin.conf $HOME/.kube/config

sudo chown $(id -u):$(id -g) $HOME/.kube/config

```

# ⭐ Instalação de um complemento de rede pod

- [https://kubernetes.io/docs/concepts/cluster-administration/networking/#how-to-implement-the-kubernetes-networking-model](https://kubernetes.io/docs/concepts/cluster-administration/networking/#how-to-implement-the-kubernetes-networking-model)

- Instalação do pod network da Weave Net from Weaveworks

- [https://www.weave.works/docs/net/latest/kubernetes/kube-addon/](https://www.weave.works/docs/net/latest/kubernetes/kube-addon/)

```
 kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"
```

- Inserindo os nós workers no cluster

```
kubeadm join --token 39c341.a3bc3c4dd49758d5 IP_DO_MASTER:6443 --discovery-token-ca-cert-hash sha256:37092
```

- Verificando a instalação no control plane master

```
kubectl get nodes

```

# ⭐ Comandos kubectl

- [https://github.com/jaksonlima/Kubernetes-Doc/blob/main/K8S-Commands.md](https://github.com/jaksonlima/Kubernetes-Doc/blob/main/K8S-Commands.md)

# ⭐ Ativando o autocomplete

- Em distribuições Debian e baseadas, certifique-se que o pacote bash-completion esteja instalado. Instale-o com o comando a seguir.

```
sudo apt install -y bash-completion
```

- Feito isso, execute o seguinte comando.

```
kubectl completion bash > /etc/bash_completion.d/kubectl
```

- Efetue logoff e login para carregar o autocomplete. Caso não deseje, execute:

```
source <(kubectl completion bash)
```
