### Documentação

- https://github.com/fortio/fortio

```
 kubectl run -it fortio --rm --image=fortio/fortio -- load -qps 800 -t 120s -c 70 "http://goserver-service/healthz"
```

```
fortio load -qps 800 -t 60s -c 70 "http://service-k8s/api/actuator/health"
```
