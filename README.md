# 🚀 Postman to Swagger (OpenAPI) Converter Server

Easily convert your Postman collections to OpenAPI (Swagger) YAML and merge them into your API docs, all via a simple HTTP endpoint!

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## 🛠️ Installation

```bash
# Clone this repository
$ git clone <your-repo-url>
$ cd Zulqarnainishaq-Postman-to-Swagger-Converte-Server

# Install dependencies
$ npm install
```

---

## ▶️ Running the Server

```bash
# Start the server (default: http://localhost:3000)
$ npm start
```

---

## 🔄 Convert Postman Collection to Swagger (OpenAPI)

### Endpoint

```
POST /convert-postman-to-openapi
```

- **Form field:** `file` (your Postman collection JSON file)
- **Response:** Success message and merged OpenAPI YAML at `swagger/collection.yml`

### Example using `curl`

```bash
curl -X POST http://localhost:3000/convert-postman-to-openapi \
  -F "file=@/path/to/your/postman_collection.json"
```

### Example using Postman

1. Open Postman and create a new `POST` request to `http://localhost:3000/convert-postman-to-openapi`
2. Go to the `Body` tab, select `form-data`
3. Add a key named `file`, set type to `File`, and upload your Postman collection
4. Send the request and receive a success message!

---

## 📖 View Your Swagger (OpenAPI) Docs

After conversion, your merged OpenAPI docs are available at:

- [http://localhost:3000/api-docs](http://localhost:3000/api-docs) ← **Swagger UI**

---

## 📂 Output

- The merged OpenAPI YAML is saved at: `swagger/collection.yml`

---

## 📝 Notes

- Each upload merges the new collection with the existing OpenAPI YAML.
- Supports both new and existing Swagger components, paths, and tags.

---

## 💡 Enjoy seamless API documentation conversion!
