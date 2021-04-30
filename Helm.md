# ⭐ Helm

- [https://helm.sh/](https://helm.sh/)

#### Instalação From Apt (Debian/Ubuntu)

#### Charts/Repositório

- [https://artifacthub.io/](https://artifacthub.io/)

#### doc instalação

- [https://helm.sh/docs/intro/install/#from-apt-debianubuntu](https://helm.sh/docs/intro/install/#from-apt-debianubuntu)

```
curl https://baltocdn.com/helm/signing.asc | sudo apt-key add -
sudo apt-get install apt-transport-https --yes
echo "deb https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```

#### Comandos

- [https://helm.sh/docs/intro/using_helm/](https://helm.sh/docs/intro/using_helm/)

```
helm search repo ingress
```

```
NAME                            	CHART VERSION	APP VERSION	DESCRIPTION
bitnami/nginx-ingress-controller	7.6.5        	0.45.0     	Chart for the nginx Ingress controller
ingress-nginx/ingress-nginx     	3.29.0       	0.45.0     	Ingress controller for Kubernetes using NGINX a...
bitnami/contour                 	4.3.1        	1.14.1     	Contour Ingress controller for Kubernetes
bitnami/kong                    	3.5.4        	2.4.0      	Kong is a scalable, open source API layer (aka ...
```

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx

helm repo update

helm repo list
```

```
NAME                	URL
ingress-nginx       	https://kubernetes.github.io/ingress-nginx
```

```
helm install my-ingress-nginx ingress-nginx/ingress-nginx
```

```
helm list -A
```

```
NAME            	NAMESPACE    	REVISION	UPDATED                                	STATUS  	CHART               	APP VERSION
my-ingress-nginx	default     	1       	2021-04-30 20:34:51.483221519 +0000 UTC	deployed	ingress-nginx-3.29.0	0.45.0
```
