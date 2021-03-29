kubeadm init --apiserver-advertise-address $(hostname -i)

<!-- kubeadm init --token=102952.1a7dd4cc8d1f4cc5 --kubernetes-version $(kubeadm version -o short) -->

kubectl apply -n kube-system -f \
 "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 |tr -d '\n')"

kubectl apply -f /opt/weave-kube.yaml

kubectl get nodes
kubectl get pods -n kube-system
kubectl get componentstatuses
kubectl cluster-info

---
