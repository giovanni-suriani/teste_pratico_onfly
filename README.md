# n8n-nodes: custom node: random

Este repositório é a solução do teste pratico, contém um conector programático para o n8n que gera números inteiros aleatórios utilizando a API pública do Random.org.

## 📦 Estrutura do projeto
```
n8n-nodes-random/
├─ package.json
└─ nodes/
└─ nodes/Random/
└─ nodes/Random.node.json
└─ nodes/Random.node.ts
```

## 📋 Pré-requisitos

Você precisa ter os seguintes itens instalados em sua máquina de desenvolvimento:

* [git](https://git-scm.com/downloads)  
* Node.js e npm. Versão mínima: Node 20.  
  Você pode encontrar instruções de instalação usando **nvm (Node Version Manager)** para Linux, Mac e WSL [aqui](https://github.com/nvm-sh/nvm).  
  Para usuários do Windows, consulte o guia da Microsoft para [instalar o NodeJS no Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).  
* Instale o n8n com:  
  ```bash
  npm install n8n -g

## ⚙️ Instalação

Clone este repositório e instale as dependências:

```bash
git clone https://github.com/giovanni-suriani/teste_pratico_onfly.git
cd teste_pratico_onfly
npm install
npm run build
docker compose up -d
```
**Certifique-se de que a porta 5678 está livre**

## 🚀 Uso

1. Acesse o n8n em seu navegador: `http://localhost:5678`( espere de 1-2minutos para o n8n iniciar, apos docker compose up -d).
2. Crie um novo workflow.
3. Adicione o node "Random" ao workflow.
4. Configure os parâmetros "Min" e "Max" para definir o intervalo do número aleatório.
5. Execute o fluxo de trabalho para gerar um número aleatório.
