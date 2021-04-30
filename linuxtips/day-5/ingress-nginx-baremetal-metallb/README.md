# ⭐ MetalLB

#### link doc instalação

- [https://metallb.universe.tf/installation/#installation-by-manifest](https://metallb.universe.tf/installation/#installation-by-manifest)

```
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.9.6/manifests/namespace.yaml
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.9.6/manifests/metallb.yaml

```

#### Apenas na primeira instalação

```
kubectl create secret generic -n metallb-system memberlist --from-literal=secretkey="$(openssl rand -base64 128)"
```

#### Configuração de range de portas que você desejar usando camada layer2 é feito pelo configmap no mesmo namespace metallb-system

#### link doc

[https://metallb.universe.tf/configuration/#layer-2-configuration](https://metallb.universe.tf/configuration/#layer-2-configuration)

```
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: metallb-system
  name: config
data:
  config: |
    address-pools:
    - name: default
      protocol: layer2
      addresses:
      - 192.168.1.240-192.168.1.250
```

# ⭐ Bare-Metal Ingress-Nginx

#### link doc instalação

- [https://kubernetes.github.io/ingress-nginx/deploy/#bare-metal](https://kubernetes.github.io/ingress-nginx/deploy/#bare-metal)

#### Apliques arquivo de configuração Bare-metal

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.45.0/deploy/static/provider/baremetal/deploy.yaml
```

#### Edite o service que tem as portas http-> 80, https-> 443, no namespace criado pelo arquivo.yaml

```
kubectl get service -n ingress-nginx
```

```
NAMESPACE       NAME                                 TYPE           CLUSTER-IP       EXTERNAL-IP    PORT(S)                      AGE
ingress-nginx   ingress-nginx-controller             NodePort   10.104.255.125       <pending>      80:30110/TCP,443:30814/TCP   75m
ingress-nginx   ingress-nginx-controller-admission   ClusterIP      10.110.85.8      <none>         443/TCP                      75m
```

```
kubectl edit service ingress-nginx-controller -n ingress-nginx
```

#### Edite o arquivo e altere o type para LoadBalancer

```
apiVersion: v1
kind: Service
metadata:
  name: ingress-nginx-controller
  namespace: ingress-nginx
spec:
  clusterIP: 10.104.255.125
  clusterIPs:
  - 10.104.255.125
  externalTrafficPolicy: Cluster
  ipFamilies:
  - IPv4
  ipFamilyPolicy: SingleStack
  ports:
  - name: http
    nodePort: 30110
    port: 80
    protocol: TCP
    targetPort: http
  - name: https
    nodePort: 30814
    port: 443
    protocol: TCP
    targetPort: https
  selector:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
  sessionAffinity: None
  type: LoadBalancer  <--------------------------------------------------------(⭐)
status:
  loadBalancer:
    ingress:
    - ip: 172.31.36.93

```

#### Automaticamente já ira disponibilizar EXTERNAL-IP

```
NAMESPACE       NAME                                         TYPE           CLUSTER-IP       EXTERNAL-IP    PORT(S)                      AGE
ingress-nginx   service/ingress-nginx-controller             LoadBalancer   10.104.255.125   172.31.36.93   80:30110/TCP,443:30814/TCP   85m
ingress-nginx   service/ingress-nginx-controller-admission   ClusterIP      10.110.85.8      <none>         443/TCP                      85m
```

#### Já disponível para applicar ingress com suas regras

#### Edição hosts com a EXTERNAL-IP do ingress-nginx-controller e dns para acesso ingress

```
sudo /etc/hosts

172.31.36.93 ec2-52-67-200-24.sa-east-1.compute.amazonaws.com

# The following lines are desirable for IPv6 capable hosts
::1 ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
ff02::3 ip6-allhosts
```

# ⭐ Helm Ingress-Nginx

#### link doc instalação

- [https://kubernetes.github.io/ingress-nginx/deploy/#using-helm](https://kubernetes.github.io/ingress-nginx/deploy/#using-helm)
- [https://artifacthub.io/packages/helm/ingress-nginx/ingress-nginx](https://artifacthub.io/packages/helm/ingress-nginx/ingress-nginx)

#### Crie um namespace

```
kubectl create namespace ingress-nginx
```

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx

helm repo update

helm install my-ingress-nginx ingress-nginx/ingress-nginx -n ingress-nginx
```

```
helm ls -A
```

```
NAME            	NAMESPACE    	REVISION	UPDATED                                	STATUS  	CHART               	APP VERSION
my-ingress-nginx	ingress-nginx	1       	2021-04-30 20:34:51.483221519 +0000 UTC	deployed	ingress-nginx-3.29.0	0.45.0
```

#### Com configuração do MetalLB em seu cluster o my-ingress-nginx-controller já optem o EXTERNAL-IP

```
NAME                                               READY   STATUS    RESTARTS   AGE
pod/my-ingress-nginx-controller-645f769cbb-592vk   1/1     Running   0          2m

NAME                                            TYPE           CLUSTER-IP      EXTERNAL-IP    PORT(S)                      AGE
service/my-ingress-nginx-controller             LoadBalancer   10.102.102.37   172.31.36.93   80:32248/TCP,443:30187/TCP   2m
service/my-ingress-nginx-controller-admission   ClusterIP      10.99.68.183    <none>         443/TCP                      2m

NAME                                          READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/my-ingress-nginx-controller   1/1     1            1           2m

NAME                                                     DESIRED   CURRENT   READY   AGE
replicaset.apps/my-ingress-nginx-controller-645f769cbb   1         1         1       2m

```

#### Desistalar

```
helm unistall my-ingress-nginx -n ingress-nginx
```
