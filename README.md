## Projeto 02 - WEBII
#### StoreManager - Gerenciador de lojas.
#### Aluno: Oscar Kemuel Orrico dos Santos

##### Requisitos mínimos:
- Node.js v14

##### Frameworks/bibliotecas usadas:
- AdonisJS 5 (API)
- Lucid ORM
- SQLite
- TypeScript

##### Como rodar o projeto:
1. Fazer clone do projeto
2. Abrir o terminal na pasta do projeto
3. Baixar dependencias rodando ```npm install``` ou ```yarn ```
4. Rodar as migrations ```node ace migration:run``` (Antes disso, garanta que as credenciais do banco estão corretas no arquivo ```.env```)
5. Iniciar o projeto com ```npm run dev``` ou ```yarn dev```
6. Abrir o navegador em ```http://localhost:3333/```

##### Entidades do StoreManager:
- Product
- Sale
- Seller
- Store
- User
- Address
