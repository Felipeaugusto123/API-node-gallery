# API-node-gallery

API para gerenciamento de **galerias** e **fotos**, construída com **Node.js**, **Express**, **TypeScript** ,**Multer** ,**Sharp** ,**uuid** ,**Prisma** e tratamento avançado de erros com classes personalizadas

---

# 📌 Funcionalidades

* Criar galeria
* Listar galerias
* Buscar galeria por ID (com fotos)
* Upload de fotos para uma galeria
* Tratamento de erros customizados com status corretos

# 🚀 Endpoints

## 📍 **POST /gallery** — Criar galeria

Cria uma nova galeria no sistema.

### Body

```json
{
  "title": "posts"
}
```

### Possíveis Erros

| Erro                  | Status  | Quando ocorre           |
| --------------------- | ------- | ----------------------- |
| `RequiredParamsError` | **400** | Sem título              |
| `ServerError`         | **500** | Falha ao salvar galeria |

### Resposta de Sucesso — 201

```json
{
  "galeria": {}
}
```

---

## 📍 **GET /gallerys** — Listar todas as galerias

Retorna todas as galerias registradas.

### Resposta — 200

```json
{
  "gallery": {}
}
```

### Possíveis Erros

| Erro          | Status  |
| ------------- | ------- |
| `ServerError` | **500** |

---

## 📍 **GET /gallery/:id** — Buscar galeria + fotos

Retorna uma galeria específica e suas fotos.

### Exemplo de Resposta — 200

```json
{
  "gallery": {
    "id": 1,
    "name": "posts"
  },
  "photos": []
}
```

### Possíveis Erros

| Erro                    | Status  | Quando              |
| ----------------------- | ------- | ------------------- |
| `RequiredParamsError`   | **400** | Sem ID              |
| `ResourceNotFoundError` | **404** | Galeria inexistente |
| `ServerError`           | **500** | Erro inesperado     |

---

## 📍 **POST /gallery/upload** — Enviar foto

Realiza upload de uma foto para uma galeria específica.

### Form-Data

| Campo     | Tipo    | Descrição      |
| --------- | ------- | -------------- |
| `photo`   | arquivo | Imagem enviada |
| `gallery` | number  | ID da galeria  |

### Resposta — 200

```json
{}
```

### Possíveis Erros

| Erro                    | Status  | Motivo                      |
| ----------------------- | ------- | --------------------------- |
| `FileNotProvidedError`  | **400** | Nenhum arquivo enviado      |
| `RequiredParamsError`   | **400** | ID da galeria não informado |
| `ResourceNotFoundError` | **404** | Galeria não existe          |
| `ServerError`           | **500** | Falha ao processar imagem   |

---

# ⚠️ Tratamento de Erros

A API usa classes customizadas, cada uma retornando o *status HTTP correto*:

| Erro                    | Status  | Significado                      |
| ----------------------- | ------- | -------------------------------- |
| `RequiredParamsError`   | **400** | Parâmetros obrigatórios ausentes |
| `FileNotProvidedError`  | **400** | Arquivo não enviado              |
| `ResourceNotFoundError` | **404** | Recurso não encontrado           |
| `ServerError`           | **500** | Erro interno do servidor         |

---

# ▶️ Como Rodar o Projeto

```
npm install
npm run dev
```
