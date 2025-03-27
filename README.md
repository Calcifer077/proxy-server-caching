# Proxy Server

A simple implementation of a proxy server that uses the Pokémon API.

## 🛠️ How It Works

- Whenever a request is made to the server, it checks whether the specified Pokémon name exists in the cache.
- If the data is not found in the cache or is too old, the server fetches the latest data from the Pokémon API.
- Cached data ensures faster responses and reduces API calls.

## 🚀 Tools Used

- **Node.js**
- **Express**
- **Pokemon API**

---

## 📦 Project Structure

```bash
├── config.env            # Environment variables
├── server.js             # Main server file
├── controllers
│   ├── proxyController.js # Handles requests and manages caching
├── cache                 # Directory to store cached data
├── package.json
└── README.md
```

---

## 🧑‍💻 How to run this project

Follow these steps:

1. **Clone the repositry**

```bash
git clone https://github.com/Calcifer077/proxy-server-caching.git
```

2. **Navigate to the project directory**

```bash
cd proxy-server-caching
```

3. **Create a Configuration File**
   Create a .env file in the root directory with the following variables:

```bash
PORT:<YOUR_PORT>
URL:https://pokeapi.co/api/v2/pokemon/
TIME_BEFORE_EXIRES:<TIME_IN_MILLISECONDS>
```

4. **Install Dependencies**

```bash
npm install
```

5. **Run the server**

```bash
npm run dev
```

## 🎯 Example

````
GET http://localhost:<PORT>/api/v1/pokemon/<Name Or Id>
```# Proxy Server

A simple implementation of a proxy server that uses the Pokémon API.

## 🛠️ How It Works
- Whenever a request is made to the server, it checks whether the specified Pokémon name exists in the cache.
- If the data is not found in the cache or is too old, the server fetches the latest data from the Pokémon API.
- Cached data ensures faster responses and reduces API calls.

## 🚀 Tools Used
- **Node.js**
- **Express**
- **Pokémon API**

---

## 📦 Project Structure

```bash
├── config.env            # Environment variables
├── server.js             # Main server file
├── app.js
├── controllers
│   ├── pokemonController.js # Handles requests and manages caching
├── routes
|   ├── pokemonRouter.js # Handles routing
├── cache                 # Directory to store cached data
├── package.json
└── README.md
````

---

## 🧑‍💻 How to run this project

Follow these steps:

1. **Clone the repositry**

```bash
git clone https://github.com/Calcifer077/proxy-server-caching.git
```

2. **Navigate to the project directory**

```bash
cd proxy-server-caching
```

3. **Create a Configuration File**
   Create a .env file in the root directory with the following variables:

```bash
PORT:<YOUR_PORT>
URL:https://pokeapi.co/api/v2/pokemon/
TIME_BEFORE_EXIRES:<TIME_IN_MILLISECONDS>
```

4. **Install Dependencies**

```bash
npm install
```

5. **Run the server**

```bash
npm run dev
```

## 🎯 Example

```
GET http://localhost:<PORT>/api/v1/pokemon/<Name Or Id>
```
