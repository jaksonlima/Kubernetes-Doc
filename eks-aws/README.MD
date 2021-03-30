## Configuração eksctl

### doc: https://github.com/weaveworks/eksctl

### Config eksctl:

#### `curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp`

#### `sudo mv /tmp/eksctl /usr/local/bin`

## Instalação aws-iam-authenticator

### Config aws-iam-authenticator

### doc: https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html

#### `curl -o aws-iam-authenticator https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/aws-iam-authenticator`

#### `curl -o aws-iam-authenticator.sha256 https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/aws-iam-authenticator.sha256`

#### `openssl sha1 -sha256 aws-iam-authenticator`

#### `chmod +x ./aws-iam-authenticator`

#### `mkdir -p $HOME/bin && cp ./aws-iam-authenticator $HOME/bin/aws-iam-authenticator && export PATH=$PATH:$HOME/bin`

#### `echo 'export PATH=$PATH:$HOME/bin' >> ~/.bashrc`

#### `aws-iam-authenticator help`

## Configuração IAM

### Abra Console de gerenciamento da AWS

### Entre em ![Alt text](./img/iam.png "Title")

### Entre em ![Alt text](./img/user.png "Title"), e crie um usuário.

### Aguarde o arquivo .scv para usar | #aws_access_key_id= | #aws_secret_access_key= |

### Entre em usuário e adicione permissões.

![Alt text](./img/p1.png "Title")
![Alt text](./img/p2.png "Title")
![Alt text](./img/p3.png "Title")

### Criar pasta para suas credenciais

`mkdir ~/.aws/credentials`

### adicione no arquivo credentials = `[default] aws_access_key_id=AKIAIOSFODNN7EXAMPLE aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`

`mkdir ~/.aws/config`

### adicione no arquivo config = `[default] region=us-west-2 output=json`

#### Criar cluster

`eksctl create cluster --name test-cluster --version 1.17 --region sa-east-1 --nodegroup-name linux-node --node-type t2.micro --nodes 2`

### Crie uma instância ec2 neste processo terá uma lista, fica ao seu critério escolher.

`--node-type t2.medium`

#### Deletar cluster

`eksctl delete cluster --name test-cluster`

### Kubectl

`kubectl get nodes`

### Vizualizar cluster

### Abra Console de gerenciamento da AWS

#### ![Alt text](./img/cluster-master.png "Title")

#### ![Alt text](./img/clusters.png "Title")

#### ![Alt text](./img/cluster-create.png "Title")

### Vizualizar nodes

### Abra Console de gerenciamento da AWS

#### ![Alt text](./img/ec2.png "Title")

#### ![Alt text](./img/instance.png "Title")

#### ![Alt text](./img/nodes.png "Title")
