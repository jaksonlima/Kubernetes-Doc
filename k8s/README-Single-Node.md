minikube version
minikube start --wait=false
minikube addons enable dashboard
kubectl apply -f /opt/kubernetes-dashboard.yaml

kubectl cluster-info
kubectl get nodes
kubectl get namespaces
kubectl describe pod etcd-minikube -n kube-system
kubectl get pods --all-namespaces
kubectl create namespace teste
kubectl run nginx --generator=run-pod/v1 --image=nginx -n teste
kubectl get pods -n teste -w
kubectl get pods -n teste -o wide
kubectl get pods --all-namespaces -o wide
kubectl get pod nginx -o yaml -n teste --export > nginx.yaml
kubectl get pods --show-labels -n teste
kubectl get pods --show-labels --all-namespaces
kubectl label pod nginx-pod -n teste run=novonginx
kubectl delete pods -l run=novonginx --all-namespaces
kubectl edit pod nginx -n teste
