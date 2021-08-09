## ⭐ Configuração Ingress-Nginx com Cert-Manager

#### ⭐Cert-Manager
- Configuração cert-manager site kubernetes 
  - https://cert-manager.io/next-docs/tutorials/acme/ingress/
  - https://cert-manager.io/docs/installation/helm/

#### ⭐ Helm
- Installing Helm
  - https://helm.sh/docs/intro/install/
  
### ⭐ Installation Ingress Nginx
- https://kubernetes.github.io/ingress-nginx/deploy/#using-helm

```
kubectl create namespace ingress-nginx
```

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx

helm repo update

helm install ingress-nginx ingress-nginx/ingress-nginx -n ingress-nginx
```

### ⭐ Installation Cert-Manager
- https://artifacthub.io/packages/helm/cert-manager/cert-manager

```
kubectl create namespace cert-manager
```

```
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.4.3/cert-manager.crds.yaml
```

```
helm repo add jetstack https://charts.jetstack.io

helm repo update

helm install cert-manager --namespace cert-manager jetstack/cert-manager
```

```
kubectl get Issuers,ClusterIssuers,Certificates,CertificateRequests,Orders,Challenges --all-namespaces
```

## ⭐ Caso deseje que seus certificados sejam regerados novamente, basta excluir os Secrets associados aos Ingress.

```
kubectl get secrets
```

```
NAME                     TYPE                                  DATA   AGE
default-token-4rhkt      kubernetes.io/service-account-token   3      5h51m
letsencrypt-staging      Opaque                                1      121m
tls-staging-olimpiatec   kubernetes.io/tls                     2      1s
```

```
kubectl delete secrets tls-staging-olimpiatec
```

