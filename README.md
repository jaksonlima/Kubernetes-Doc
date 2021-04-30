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

# ⭐ Instalação do Kubernetes

```
apt-get update && apt-get install -y apt-transport-https gnupg2

curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -

echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" > /etc/apt/sources.list.d/kubernetes.list

apt-get update

apt-get install -y kubelet kubeadm kubectl
```

- Distribuições GNU/Linux também é necessário desativar a memória swap em todos os nós com o comando a seguir.

```
swapoff -a
```

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

- Instalação do pod network

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
