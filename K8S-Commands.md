## K8S command

- [https://kubernetes.io/docs/reference/generated/kubectl/kubectl-command-](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands)
- [https://kubernetes.io/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [https://kubernetes.io/docs/reference/kubectl/kubectl/](https://kubernetes.io/docs/reference/kubectl/kubectl/)

### Habilitar contexts atual do cluster criado

```
kubectl config get-clusters

kubectl config delete-cluster my-cluster

kubectl config current-context

kubectl config get-contexts

kubectl config use-context <name-cluster>
```

### Adicional CLI

- Usado para passar namespace: `-n`
- Usado para passar em gets em tempo real: `-w`
- Usado para passar em gets visualização geral dos registros: `-o wide`
- Todos namespaces: `--all-namespaces`

### Rollout-Back

- ###### services, deployment, replicaset, pods, ...

```
kubectl rollout undo deployment.v1.apps/nginx-deployment
```

### Criação namespace

```
kubectl create namespace <nome-namespace>
```

### Executar arquivo de manifesto

- ###### services, deployment, replicaset, pods, ...

```
kubectl create -f <nome_arquivo-ou-pasta>

kubectl -n <namespace> create -f <nome_arquivo-ou-pasta>
```

### Alteração arquivo de manifesto

- ###### services, deployment, replicaset, pods, ...

```
kubectl apply -f <nome_arquivo>
```

### Executar bash/terminal nos pods/containers

- ###### pods

```
kubectl exec -it <nome-pod> /bin/sh
```

### Delete

- ###### services, deployment, replicaset, pods, ...

```
kubectl delete deployment <nome>

kubectl delete -f <arquivo-manifesto>
```

### Delete por labels

- ###### services, deployment, replicaset, pods, ...

```
kubectl get pods --show-labels

kubectl delete pods -l app=nginx, template=spring
```

### Visualização por labels

- ###### services, deployment, replicaset, pods, ...

```
kubectl get pods -l app=nginx, template=spring
```

### Visualização pods internos

```
kubectl get pods -n kube-system

kubectl get pods -namespace=kube-system
```

### Visualização pods com ip's

```
kubectl get all -o wide

kubectl get pods -o wide -n kube-system

kubectl get pods -o wide -w
```

### Visualização por namespaces

- ###### services, deployment, replicaset, pods, ...

```
kubectl get pods -n <namespace>
```

### Visualização detalhada

- ###### services, deployment, replicaset, pods, ...

```
kubectl describe pod <nome-ou-ID>
```

### Visualização logs pod

```
kubectl logs -f <nome-pod>
```

### Reencaminhamento de porta

- ###### services, pods

```
kubectl port-forward services <nome-ou-ID> Port-Maquina:Port-Container
```

### Visualização geral

- ###### services, deployment, replicaset, pods, ...

```
kubectl get all

kubectl get pods --show-labels

kubectl get pods --all-namespaces

kubectl get nodes,services,deployments,replicasets,pods

kubectl get nodes

kubectl get service

kubectl get deployment

kubectl get replicaset

kubectl get pods
```

### Recuperar token join

```
kubeadm token create --print-join-command
```

### Visualização de detalhada objeto de uso

- ###### services, deployment, replicaset, pods, ...

```
kubectl explain deployment

kubectl explain deployment --recursive

kubectl explain deployment.spec.template.spec --recursive
```

### Criação service

- ###### deployment, pods, ...

```
kubectl expose deployment --port <porta dos containers pods>

kubectl expose deployment app-deployment --type=ClusterIP
kubectl expose deployment app-deployment --type=NodePort
kubectl expose deployment app-deployment --type=LoadBalancer
```

### Vizualizar endpints

```
kubectl get endpoints
```

### Aumentar replicas

```
kubectl scale --replicas=10 deployment app-deployment
```

### Editar arquivo manifesto em execução

- ###### services, deployment, replicaset, pods, ...

```
kubectl edit service <nome>
```
