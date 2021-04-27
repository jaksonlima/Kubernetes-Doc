## - link [https://github.com/badtuxx/DescomplicandoKubernetes/blob/master/day-5/DescomplicandoKubernetes-Day5.md](https://github.com/badtuxx/DescomplicandoKubernetes/blob/master/day-5/DescomplicandoKubernetes-Day5.md)

### vim app1.yaml

```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: app1
spec:
  replicas: 2
  template:
    metadata:
      labels:
        app: app1
    spec:
      containers:
      - name: app1
        image: dockersamples/static-site
        env:
        - name: AUTHOR
          value: GIROPOPS
        ports:
        - containerPort: 80
```

### vim app2.yaml

```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: app2
spec:
  replicas: 2
  template:
    metadata:
      labels:
        app: app2
    spec:
      containers:
      - name: app2
        image: dockersamples/static-site
        env:
        - name: AUTHOR
          value: STRIGUS
        ports:
        - containerPort: 80
```

### vim svc-app1.yaml

```
apiVersion: v1
kind: Service
metadata:
  name: appsvc1
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: app1
```

### vim svc-app2.yaml

```
apiVersion: v1
kind: Service
metadata:
  name: appsvc2
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: app2
```

### kubectl create -f app1.yaml

deployment.extensions/app2 created

### kubectl create -f app2.yaml

deployment.extensions/app2 created

### kubectl create -f svc-app1.yaml

deployment.extensions/svc-app1 created

### kubectl create -f svc-app2.yaml

deployment.extensions/svc-app2 created

### kubectl get deploy

### kubectl get services

### kubectl get ep

### vim default-backend.yaml

### kubectl create namespace ingress

### kubectl create -f default-backend.yaml -n ingress

### vim default-backend-service.yaml

```
apiVersion: v1
kind: Service
metadata:
  name: default-backend
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 8080
  selector:
    app: default-backend
```

### kubectl create -f default-backend-service.yaml -n ingress

### kubectl get deployments.

### kubectl get deployments. -n ingress

### kubectl get service

### kubectl get service -n ingress

### kubectl get ep -n ingress

### vim nginx-ingress-controller-config-map.yaml

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-ingress-controller-conf
  labels:
    app: nginx-ingress-lb
data:
  enable-vts-status: 'true'
```

### kubectl create -f nginx-ingress-controller-config-map.yaml -n ingress

### kubectl describe configmaps nginx-ingress-controller-conf -n ingress

### kubectl get configmaps -n ingress

### vim nginx-ingress-controller-roles.yaml

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: nginx
  namespace: ingress
---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: nginx-role
rules:
- apiGroups:
  - ""
  - "extensions"
  resources:
  - configmaps
  - secrets
  - endpoints
  - ingresses
  - nodes
  - pods
  verbs:
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - services
  verbs:
  - list
  - watch
  - get
  - update
- apiGroups:
  - "extensions"
  resources:
  - ingresses
  verbs:
  - get
- apiGroups:
  - ""
  resources:
  - events
  verbs:
  - create
- apiGroups:
  - "extensions"
  resources:
  - ingresses/status
  verbs:
  - update
- apiGroups:
  - ""
  resources:
  - configmaps
  verbs:
  - get
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: nginx-role
  namespace: ingress
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: nginx-role
subjects:
- kind: ServiceAccount
  name: nginx
  namespace: ingress
```

### kubectl create -f nginx-ingress-controller-roles.yaml -n ingress

### kubectl get serviceaccounts

### kubectl get clusterrole -n ingress

### kubectl get clusterrolebindings -n ingress

### vim nginx-ingress-controller-deployment.yaml

```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: nginx-ingress-controller
spec:
  replicas: 1
  revisionHistoryLimit: 3
  template:
    metadata:
      labels:
        app: nginx-ingress-lb
    spec:
      terminationGracePeriodSeconds: 60
      serviceAccount: nginx
      containers:
        - name: nginx-ingress-controller
          image: quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.9.0
          imagePullPolicy: Always
          readinessProbe:
            httpGet:
              path: /healthz
              port: 10254
              scheme: HTTP
          livenessProbe:
            httpGet:
              path: /healthz
              port: 10254
              scheme: HTTP
            initialDelaySeconds: 10
            timeoutSeconds: 5
          args:
            - /nginx-ingress-controller
            - --default-backend-service=ingress/default-backend
            - --configmap=ingress/nginx-ingress-controller-conf
            - --v=2
          env:
            - name: POD_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: POD_NAMESPACE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
          ports:
            - containerPort: 80
            - containerPort: 18080

```

### kubectl create -f nginx-ingress-controller-deployment.yaml -n ingress

### kubectl get deployments -n ingress

### kubectl get pods --all-namespaces

### vim nginx-ingress.yaml

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: nginx-ingress
spec:
  rules:
  - host: ec2-54-198-119-88.compute-1.amazonaws.com ### Mude para o seu endereço
    http:
      paths:
      - backend:
          serviceName: nginx-ingress
          servicePort: 18080
        path: /nginx_status
```

### vim app-ingress.yaml

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
  name: app-ingress
spec:
  rules:
  - host: ec2-54-198-119-88.compute-1.amazonaws.com ### Mude para o seu endereço
    http:
      paths:
      - backend:
          serviceName: appsvc1
          servicePort: 80
        path: /app1
      - backend:
          serviceName: appsvc2
          servicePort: 80
        path: /app2
```

### kubectl create -f nginx-ingress.yaml -n ingress

### kubectl create -f app-ingress.yaml

### kubectl get ingresses

### kubectl get ingresses -n ingress

### kubectl describe ingresses.extensions nginx-ingress -n ingress

### kubectl describe ingresses.extensions app-ingress

### vim nginx-ingress-controller-service.yaml

### kubectl create -f nginx-ingress-controller-service.yaml -n=ingress

Pronto, agora você já pode acessar suas apps pela URL que você configurou. Abra o navegador e adicione os seguintes endereços:

http://SEU-ENDEREÇO:30000/app1

http://SEU-ENDEREÇO:30000/app2

http://SEU-ENDEREÇO:32000/nginx_status

Ou ainda via curl:

### curl http://SEU-ENDEREÇO:30000/app1

### curl http://SEU-ENDEREÇO:30000/app2

### curl http://SEU-ENDEREÇO:32000/nginx_status
