
# Dashboard Financeiro Escolar

Este projeto apresenta um dashboard financeiro completo para escolas, permitindo visualizar dados de mensalidades, despesas, inadimplência e métricas-chave.
Ele utiliza NestJS + PostgreSQL no backend e Next.js no frontend, tudo executado dentro de containers Docker.

<img width="783" height="285" alt="Captura de tela 2025-11-18 004626" src="https://github.com/user-attachments/assets/eef5962e-a763-4402-87c0-4ebd9c4a3daa" />

## 1. Dor identificada

Após uma conversa com o Coordenador do Ensino Médio da escola na qual estudei, identifiquei que uma dificuldades era a inexistência de uma plataforma que centralizasse, de forma simples e direta, as informações sobre a saúde financeira da escola. Então, decidi implementar a versão inicial um dashboard financeiro que exibisse seis métricas: receita total no mês atual, valor total em aberto, percentual de inadimplência, receita média por aluno, tempo médio de atraso dos pagamentos e controle de despesas.



## 2. Tecnologias utilizadas

Frontend: NextJS, TailwindCSS, Axios
Backend: NestJS, TypeORM, PostgreSQL
Intraestrutura: Docker






## 3. Funcionamento da aplicação

Resumidamente, o fluxo operacional da aplicação é:

backend sobe → seed.ts popula o banco automaticamente de maneira aleatória → frontend carrega os indicadores → gestor visualiza a saúde financeira da escola
## 4. Como rodar o projeto

### 1. Crie os arquivos .env

A aplicação exige arquivos .env tanto no frontend quanto no backend. 

/frontend/.env
```
NEXT_PUBLIC_API_URL=http://localhost:3001

```
/backend/.env
```

DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=1234
DB_NAME=nest_db
PORT=3001

POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
POSTGRES_DB=nest_db

```

### 2. Subir a aplicação

#### Buildar as imagens

```
docker compose build
```

#### Subir os containers

```
docker compose up
```




