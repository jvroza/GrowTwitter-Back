# GrowTwitter API

Uma API REST para uma rede social similar ao Twitter, desenvolvida com Node.js, Express, TypeScript e Prisma.

## Funcionalidades

- **Autenticação de Usuários**: Cadastro e login com JWT.
- **Gerenciamento de Usuários**: Listar usuários e obter detalhes de um usuário específico.
- **Tweets**: Criar, buscar, atualizar, excluir tweets e respostas.
- **Likes**: Curtir e descurtir tweets.
- **Followers**: Seguir e deixar de seguir usuários, listar seguidores.
- **Feed**: Obter o feed de tweets dos usuários seguidos.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework web para Node.js.
- **TypeScript**: Superset do JavaScript com tipagem estática.
- **Prisma**: ORM para banco de dados PostgreSQL.
- **JWT**: Para autenticação.
- **bcrypt**: Para hash de senhas.
- **Express Validator**: Para validação de dados.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/academygrowdev-leticialeal/growtwitter-api.git
   cd growtwitter-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
     ```
     PORT=3030
     JWT_SECRET_KEY="sua_chave_secreta_jwt"
     JWT_EXPIRE_IN=1h
     BCRYPT_SALT=10
     DATABASE_URL="postgresql://usuario:senha@localhost:5432/growtwitter"
     ```

4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate deploy
   ```

5. Gere o cliente Prisma:
   ```bash
   npx prisma generate
   ```

## Uso

Para iniciar o servidor em modo de desenvolvimento:
```bash
npm run dev
```

Para construir e iniciar em produção:
```bash
npm run build
npm start
```

O servidor será iniciado na porta 3000 (ou conforme configurado).

## Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Para acessar endpoints protegidos, inclua o token no header da requisição:

```
Authorization: Bearer <seu_token_jwt>
```

Obtenha o token através do endpoint de login.

## Endpoints

### Autenticação

#### POST /auth/register
Registra um novo usuário.

**Corpo da Requisição:**
```json
{
  "name": "Nome do Usuário",
  "username": "nomeusuario",
  "password": "senha123",
  "imageUrl": "https://exemplo.com/imagem.jpg" // opcional
}
```

**Resposta de Sucesso (201):**
```json
{
  "user": {
    "id": "uuid",
    "name": "Nome do Usuário",
    "username": "nomeusuario",
    "imageUrl": "https://exemplo.com/imagem.jpg",
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  "token": "jwt_token"
}
```

#### POST /auth/login
Faz login de um usuário.

**Corpo da Requisição:**
```json
{
  "username": "nomeusuario",
  "password": "senha123"
}
```

**Resposta de Sucesso (200):**
```json
{
  "user": {
    "id": "uuid",
    "name": "Nome do Usuário",
    "username": "nomeusuario",
    "imageUrl": "https://exemplo.com/imagem.jpg"
  },
  "token": "jwt_token"
}
```

### Usuários

#### GET /users
Lista todos os usuários.

**Resposta de Sucesso (200):**
```json
[
  {
    "id": "uuid",
    "name": "Nome do Usuário",
    "username": "nomeusuario",
    "imageUrl": "https://exemplo.com/imagem.jpg",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
]
```

#### GET /users/:userId
Obtém detalhes de um usuário específico. (Requer autenticação)

**Parâmetros de URL:**
- `userId`: UUID do usuário.

**Resposta de Sucesso (200):**
```json
{
  "id": "uuid",
  "name": "Nome do Usuário",
  "username": "nomeusuario",
  "imageUrl": "https://exemplo.com/imagem.jpg",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

### Tweets

#### POST /tweets
Cria um novo tweet. (Requer autenticação)

**Corpo da Requisição:**
```json
{
  "content": "Conteúdo do tweet"
}
```

**Resposta de Sucesso (201):**
```json
{
  "id": "uuid",
  "content": "Conteúdo do tweet",
  "authorId": "uuid",
  "type": "NORMAL",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

#### POST /replies
Cria uma resposta a um tweet. (Requer autenticação)

**Corpo da Requisição:**
```json
{
  "content": "Conteúdo da resposta",
  "replyTo": "uuid_do_tweet"
}
```

**Resposta de Sucesso (201):**
Similar ao tweet normal, mas com type "REPLY".

#### GET /tweets/:id
Busca um tweet por ID. (Requer autenticação)

**Parâmetros de URL:**
- `id`: UUID do tweet.

**Resposta de Sucesso (200):**
```json
{
  "id": "uuid",
  "content": "Conteúdo do tweet",
  "authorId": "uuid",
  "type": "NORMAL",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "author": {
    "id": "uuid",
    "name": "Nome",
    "username": "username"
  },
  "likes": 0,
  "replies": []
}
```

#### PUT /tweets/:id
Atualiza um tweet. (Requer autenticação, apenas o autor pode atualizar)

**Parâmetros de URL:**
- `id`: UUID do tweet.

**Corpo da Requisição:**
```json
{
  "content": "Novo conteúdo"
}
```

**Resposta de Sucesso (200):**
Tweet atualizado.

#### DELETE /tweets/:id
Exclui um tweet. (Requer autenticação, apenas o autor pode excluir)

**Parâmetros de URL:**
- `id`: UUID do tweet.

**Resposta de Sucesso (204):**
Sem conteúdo.

#### GET /users/:userId/tweets
Lista tweets de um usuário. (Requer autenticação)

**Parâmetros de URL:**
- `userId`: UUID do usuário.

**Resposta de Sucesso (200):**
Array de tweets.

#### GET /feed
Obtém o feed de tweets dos usuários seguidos. (Requer autenticação)

**Resposta de Sucesso (200):**
Array de tweets.

### Likes

#### POST /likes
Curtir um tweet. (Requer autenticação)

**Corpo da Requisição:**
```json
{
  "tweetId": "uuid_do_tweet"
}
```

**Resposta de Sucesso (201):**
Like criado.

#### DELETE /likes
Descurtir um tweet. (Requer autenticação)

**Corpo da Requisição:**
```json
{
  "tweetId": "uuid_do_tweet"
}
```

**Resposta de Sucesso (204):**
Like removido.

### Followers

#### POST /followers
Seguir um usuário. (Requer autenticação)

**Corpo da Requisição:**
```json
{
  "userId": "uuid_do_usuario"
}
```

**Resposta de Sucesso (201):**
Follow criado.

#### DELETE /followers
Deixar de seguir um usuário. (Requer autenticação)

**Corpo da Requisição:**
```json
{
  "userId": "uuid_do_usuario"
}
```

**Resposta de Sucesso (204):**
Follow removido.

#### GET /followers
Lista seguidores e seguidos do usuário logado. (Requer autenticação)

**Resposta de Sucesso (200):**
```json
{
  "followers": [
    {
      "id": "uuid",
      "name": "Nome",
      "username": "username"
    }
  ],
  "following": [
    {
      "id": "uuid",
      "name": "Nome",
      "username": "username"
    }
  ]
}
```

## Modelos de Dados

### User
- `id`: String (UUID)
- `name`: String
- `imageUrl`: String (opcional)
- `username`: String (único)
- `password`: String (hash)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Tweet
- `id`: String (UUID)
- `content`: String (máx. 300 caracteres)
- `authorId`: String (UUID)
- `type`: TweetType (NORMAL ou REPLY)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Like
- `tweetId`: String (UUID)
- `authorId`: String (UUID)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Follow
- `followerId`: String (UUID)
- `followingId`: String (UUID)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Reply
- `tweetId`: String (UUID)
- `replyId`: String (UUID)
- `createdAt`: DateTime
- `updatedAt`: DateTime

## Contribuição

1. Fork o projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está sob a licença ISC.
