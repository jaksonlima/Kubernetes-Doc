FROM openjdk
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar", "--spring.profiles.active=production"]
EXPOSE 8081


#Gerar imagem: sudo docker build -t smartbr/api:v1 .

#Startar imagem: sudo docker run -d -p <Porta host maquina 8081>:<Porta container 8081> --name api smartbr/api:v1

#Em execução: sudo docker container ls -a

#Parar container: sudo docker container stop <CONTAINER_ID>

#Parar e remover container: sudo docker container rm -f <CONTAINER_ID>

#Para enviar uma nova tag a este repositório

#docker push jaksonsneider/spring-kube-dev-2.0:tagname

#Para puxar imagem

#docker pull openjdk

#Contêineres remove all:  docker container rm $(docker container ls -a -q)
#Imagens remove all:      docker image rm $(docker image ls -a -q)
#Volumes remove all:      docker volume rm $(docker volume ls -q)
#Networks remove all:    docker network rm $(docker network ls -q)

#Acessar container bash: sudo docker container exec -it <CONTAINER_ID> /bin/bash

#java -Xms6g -Xmx6g -jar api-1.0.0.jar --spring.profiles.active=production
