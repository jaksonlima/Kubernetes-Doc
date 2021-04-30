## ⭐ K8S command

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

kubeadm reset
```

### Adicional CLI

- Usado para passar namespace: `-n`
- Usado para passar em gets em tempo real: `-w`
- Usado para passar em gets visualização geral dos registros: `-o wide`
- Todos namespaces: `--all-namespaces`
- Todos namespaces `-A`
- Todos labels: `--show-labels`
- Ver detalhes de alteração `--revision`
- Setar qual revisão deseja voltar `--to-revision`
- Forçar aplicar `--overwrite`
- Listar especificações labels `--all`
- Scale `--replicas`
- Labels list `--list`
- Ver contínuo `watch kubectl <commands>`
- Yaml gerador `--dry-run=client -o yaml > pod.yaml`

### Rollout/Rollback

- ###### daemonset, deployment, replicaset, pods, ...

```
kubectl rollout history daemonset <nome>

kubectl rollout history daemonset <nome-ou-ID> --revision=<numero-revisao>

kubectl rollout undo deployment <nome-ou-ID> --to-revision=<numero-revisao>
```

### Criação namespace

```
kubectl create namespace <nome-namespace>
```

### Obter arquivo manisfesto

- ###### services, deployment, replicaset, pods, ...

```
kubectl get deployment <nome-ou-ID> -o yaml > nome.yaml

kubectl run pod nginx --image=nginx --dry-run=client -o yaml > pod.yaml

kubectl create deployment app --image jaksonsneider/spring:v3 --dry-run=client -o yaml
```

### Criação/Execução declarativo

- ###### services, deployment, replicaset, pods, ...

```
kubectl create -f <nome_arquivo-ou-pasta>

kubectl -n <namespace> create -f <nome_arquivo-ou-pasta>
```

### Criação/Execução imperativo

- ###### deployment, pods, secret,...

```
kubectl create pod nginx --image=nginx --port=80

kubectl create deployment nginx --image=nginx --port=80

```

### Criação Secret

```
kubectl create secret generic my-secret --from-file=secret.txt

kubectl create secret generic my-literal-secret --from-literal user=linuxtips --from-literal password=catota
```

### Criação ConfigMap

```
 kubectl create configmap cores-frutas --from-literal uva=roxa --from-file=predileto --from-file=frutas/
```

### Criação Service Account

```
 kubectl get clusterrole

 kubectl get clusterrolebindings.rbac.authorization.k8s.io

 kubectl create serviceaccount lima

 kubectl create clusterrolebinding toskeria --serviceaccount=default:lima --clusterrole=cluster-admin
```

###

### Alteração arquivo de manifesto

- ###### services, deployment, replicaset, pods, ...

```
kubectl apply -f <nome_arquivo>
```

### Executar bash/terminal nos pods/containers

- ###### pods

```
kubectl exec -ti <nome-ou-ID> -- sh

kubectl exec -ti <nome-ou-ID>  -- bash
```

### Estressar pod/container

```
apt-get update && apt-get install

stress --vm 1 --vm-bytes 512M
```

### Delete

- ###### services, deployment, replicaset, pods, ...

```
kubectl delete deployment <nome>

kubectl delete -f <arquivo-manifesto>
```

### Criação labels

- ###### services, deployment, replicaset, pods, ...

```
kubectl label pod <nome-pod> app=nginx

kubectl label pod <nome-pod> --list


```

### Delete labels

- ###### services, deployment, replicaset, pods, ...

```
kubectl label pod <nome-pod> app=nginx-

kubectl label pod <nome-pod> app-

kubectl label pod <nome-pod> --list

kubectl label pods --list app-
```

### Visualização por labels

- ###### services, deployment, replicaset, pods, ...

```
kubectl get pods -l app=nginx, template=spring

kubectl get pods -L app
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

kubectl expose deployment app-deployment --type=ClusterIP --port <porta dos containers pods>
kubectl expose deployment app-deployment --type=NodePort --port <porta dos containers pods>
kubectl expose deployment app-deployment --type=LoadBalancer --port <porta dos containers pods>
```

### Vizualizar endpints

```
kubectl get endpoints

kubectl describe endpoints  <nome-ou-ID>
```

### Scale replicas

- ###### deployment, replicaset, replicationcontroller, statefulset

```
kubectl scale --replicas=10 deployment app-deployment
```

### Editar arquivo manifesto em execução

- ###### services, deployment, replicaset, pods, ...

```
kubectl edit service <nome>
```

### Limite recurso por namespace

- ##### limitrange

```
kubectl create -f <yaml> -n <namespace>

kubectl get limitrange -n <namespace>
```

### Taint NoSchedule

- ##### node

```
Add NoSchedule -> kubectl taint node <nome-no> key1=value1:NoSchedule

Add Master NoSchedule -> kubectl taint node elliot-01 node-role.kubernetes.io/Master:NoSchedule

Delete NoSchedule -> kubectl taint node nome-no key1:NoSchedule-

Delete master NoSchedule -> kubectl taint node elliot-01 node-role.kubernetes.io/master:NoSchedule-
```

### Taint NoExecute

- ##### node

```
Add NoSchedule -> kubectl taint node <nome-no> key1=value1:NoExecute


Delete NoSchedule -> kubectl taint node nome-no key1:NoExecute-

```

### Taint all

```
Add All -> kubectl taint node --all key1=value1:NoExecute

Delete All -> kubectl taint node --all key1=value1:NoExecute-
```

### Desabilitar/Habilitar No

```
kubectl cordon <nome-no>

kubectl uncordon <nome-no>

```

### Alteração imagem

- ###### deployment, replicaset, deamondset,pods, ...

```
kubectl set image daemonset appdaemonset nginx=jaksonsneider/nginx:red

kubectl set image deployment/nginx-deployment nginx=nginx:1.16.1 --record
```

### PersistentVolume/PersistentVolumeClaim

- ###### exemplos

- [https://github.com/jaksonlima/Kubernetes-Doc/blob/main/linuxtips/day-4/k8s/persistent_volume.yaml](https://github.com/jaksonlima/Kubernetes-Doc/blob/main/linuxtips/day-4/k8s/persistent_volume.yaml)

- [https://github.com/jaksonlima/Kubernetes-Doc/blob/main/linuxtips/day-4/k8s/persistent_volume_claim.yaml](https://github.com/jaksonlima/Kubernetes-Doc/blob/main/linuxtips/day-4/k8s/persistent_volume_claim.yaml)

- [https://github.com/jaksonlima/Kubernetes-Doc/blob/main/linuxtips/day-4/k8s/deployment_persistent.yaml](https://github.com/jaksonlima/Kubernetes-Doc/blob/main/linuxtips/day-4/k8s/deployment_persistent.yaml)

```
kubectl get persistentvolume,persistentvolumeclaims
```
