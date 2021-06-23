docker image pull jenkins/jenkins:lts

docker volume create [YOUR VOLUME]

docker run -u 0 --privileged --name jenkins-local -it -d -p [YOUR PORT]:8080 -p 50000:50000 \
-v /var/run/docker.sock:/var/run/docker.sock \
-v $(which docker):/usr/bin/docker \
-v [YOUR VOLUME]:/var/jenkins_home \
jenkins/jenkins:lts


docker container exec \
    [CONTAINER ID or NAME] \
    sh -c "cat /var/jenkins_home/secrets/initialAdminPassword"