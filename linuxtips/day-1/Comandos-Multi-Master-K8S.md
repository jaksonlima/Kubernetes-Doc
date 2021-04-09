## HaProxy

- [https://www.haproxy.com/](https://www.haproxy.com/)

```
hostname k8s-haproxy-1

echo "k8s-haproxy-1" > /etc/hostname

bash
```

```
apt-get install -y haproxy

nano /etc/haproxy/haproxy.cfg
```

```
frontend kubernetes
    mode tcp
    bind 172.31.40.11:6443  <------ IP Interno maquina : Porta K8s
    option tcplog
    default_backend k8s-masters

backend k8s-masters
   mode tcp
   balance roundrobin
   option tcp-check
   server k8s-master-0 172.31.46.68:6443 check fall 3 rise 2   <------ IP Interno maquina master : Porta K8s
   server k8s-master-1 172.31.37.237:6443 check fall 3 rise 2  <------ IP Interno maquina master : Porta K8s
   server k8s-master-2 172.31.42.207:6443 check fall 3 rise 2  <------ IP Interno maquina master : Porta K8s
```

```
systemctl restart haproxy
```

## Docker

- [https://kubernetes.io/docs/setup/production-environment/container-runtimes/](https://kubernetes.io/docs/setup/production-environment/container-runtimes/)

```
curl -fsSL https://get.docker.com | bash
```

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

## K8s

- Masters

- [https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)

```
sudo apt-get update

sudo apt-get install -y apt-transport-https ca-certificates curl
```

```
sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg

```

```
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list

```

```
sudo apt-get update

sudo apt-get install -y kubelet kubeadm kubectl

sudo apt-mark hold kubelet kubeadm kubectl
```

```
nano /etc/hosts

172.31.40.11 k8s-haproxy  <------ IP maquina haProxy

```

```
kubeadm init --control-plane-endpoint "k8s-haproxy:6443" --upload-certs
```

```
 kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"
```

- Sera impresso kubeadm init, uso nos outros masters

```
kubeadm join k8s-haproxy:6443 --token ornr5u.3nzzdhh8n47bik50     --discovery-token-ca-cert-hash sha256:f2529c0b5b856d7f2e35a4a081d71650ac3d236e96c464beab407e69f7e43f40
```

- Works

- [https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)

```
sudo apt-get update

sudo apt-get install -y apt-transport-https ca-certificates curl
```

```
sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg

```

```
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list

```

```
sudo apt-get update

sudo apt-get install -y kubelet kubeadm kubectl

sudo apt-mark hold kubelet kubeadm kubectl
```

```
nano /etc/hosts

172.31.40.11 k8s-haproxy  <------ IP maquina haProxy

```
