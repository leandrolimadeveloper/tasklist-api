<h1 align="center">Task List API</h1>

<p align="center">
    <a href="#tecnologias">Tecnologias |</a>
    <a href="#instalacao">Instalação de dependências e uso |</a>
    <a href="#documentacao">Documentação |</a>
    <a href="#licença">Licença</a>
</p>

Bem-vindo ao Task List API! Este é um projeto de API desenvolvido para uma aplicação de lista de tarefas, que proporciona uma maneira eficiente e flexível de gerenciar suas tarefas diárias. Integre esta API ao seu aplicativo para criar, atualizar, listar e excluir tarefas de forma fácil e eficaz.

# Tecnologias 🌐

<ul>
    <li><a href="https://nodejs.org/" alt="Node.js">Node.js</a></li>
    <li><a href="https://www.typescriptlang.org/" alt="TypeScript">TypeScript</a></li>
    <li><a href="https://www.postgresql.org/" alt="PostgreSQL">PostgreSQL</a></li>
    <li><a href="https://typeorm.io/" alt="TypeORM">TypeORM</a></li>
    <li><a href="https://www.docker.com/" alt="Docker">Docker</a></li>
</ul>

## Instalação de dependências e uso 🛠️
> Este guia assume que você já tenha o Node.js instalado, o sistema gerenciador de banco de dados PostgreSQL, e os dados de conexão com o banco. 

> Caso prefira testar a aplicação com o Docker (sem necessidade de ter o PostgreSQL), tenha-o instalado em sua máquina, e siga os passos demonstrados mais adiante. 

1. **Clonando o Repositório**
```
git clone https://github.com/leandrolimadeveloper/tasklist-api
cd todo-app-server
```

2. **Instalando as dependências** 
```
npm i
```

3. **Configurando o ambiente**<br><br>
Crie um arquivo **.env** para as variáveis de ambiente, com as configurações do banco de dados (localizado no arquivo **data-source.ts**, em *./src/shared/infra/typeorm/data-source.ts*), no diretório raiz do projeto. Siga o modelo disponível no arquivo .env.example.

![image](https://github.com/leandrolimadeveloper/tasklist-api/assets/76854209/1dc2e61b-1697-42ec-8eea-7ddf604d2412)


### Execução
**Pelo Docker**:

Acesse pelo Terminal o diretório do projeto e execute:
```
cd tasklist-api
docker-compose up
```

Se tudo ocorrer bem, irá aparecer uma imagem similar a esta:
![image](https://github.com/leandrolimadeveloper/todo-app-server/assets/76854209/f93d7fe7-f381-4c5e-86b2-68c24fedb50c)

<hr>

**Pelo computador** (sem uso de containers):
Antes de executar o comando para iniciar o servidor Node e fazer a conexão com o banco de dados, é necessário fazer uma alteração no arquivo index.ts (arquivo responsável por configurar e inicializar uma instância do TypeORM DataSource para a conexão com o banco de dados).

Com o arquivo aberto, troque o valor do parâmetro host, da função default, para 'localhost' (onde está escrito 'database_todo', nome do serviço do banco de dados que é executado pelo Docker. Ver arquivo docker-compose.yml, na raiz do projeto). 
![image](https://github.com/leandrolimadeveloper/tasklist-api/assets/76854209/f5c71866-2979-4ddb-83d5-a000d6aec675)


Também é necessário criar um banco de dados para o projeto, com as devidas configurações requisitadas.

Por último, estando no diretório projeto, execute:
```
npm run dev
``` 

### Executando as migrations
Para a criação das tabelas, execute o comando:
```
npm run typeorm migration:run -- -d ./src/shared/infra/typeorm/data-source.ts
```

## Documentação 📚
A documentação será feita em breve com a ferramenta Swagger.

## Licença 📄
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.


