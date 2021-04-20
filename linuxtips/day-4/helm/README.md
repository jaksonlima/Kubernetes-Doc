### Helm

##### documentação git

- [https://github.com/badtuxx/DescomplicandoKubernetes/blob/master/day-4/DescomplicandoKubernetes-Day4.md](https://github.com/badtuxx/DescomplicandoKubernetes/blob/master/day-4/DescomplicandoKubernetes-Day4.md)

```
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash -
```

```
helm version
```

```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm repo add grafana https://grafana.github.io/helm-charts
```

```
helm repo list
```

```
helm repo update
```

```
helm search repo
```

```
helm search hub
```

```
helm search repo prometheus-community
```

```
helm install meu-prometheus --version=11.16.2 prometheus-community/prometheus
```

```
helm list
```

```
kubectl get pods
```

```
sudo mkdir -p /opt/{alertmanager,prometheus}

sudo chmod -R 777 /opt/alertmanager/

sudo chmod -R 777 /opt/prometheus/
```

```
sudo vim /etc/exportfs

    /opt/prometheus *(rw,sync,subtree_check,no_root_squash)
    /opt/alertmanager *(rw,sync,subtree_check,no_root_squash)

```

```
exportfs -ar

```

```
vim volume-prometheus.yaml

```

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: meu-prometheus-server
spec:
  capacity:
    storage: 8Gi
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  nfs:
    path: /opt/prometheus
    server: 10.138.0.2
    readOnly: false
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: meu-prometheus-alertmanager
spec:
  capacity:
    storage: 8Gi
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  nfs:
    path: /opt/alertmanager
    server: 10.138.0.2
    readOnly: false

```

```
kubectl create -f volume-prometheus.yaml
```

```
kubectl port-forward meu-prometheus-server-5bc59849fd-b29q4 --namespace default 9091:9090
```

```
helm search repo grafana
```

```
helm install meu-grafana --version=5.8.12 grafana/grafana
```

```
helm status meu-grafana

helm status meu-prometheus

```

```
helm list --all
```

```
helm uninstall meu-prometheus --keep-history

```

```
helm list --all
```

```
helm rollback meu-prometheus 1
```

```
helm list --all
```

```
helm history meu-prometheus
```

```
helm uninstall meu-grafana

helm uninstall meu-prometheus
```

```
helm list --all
```
