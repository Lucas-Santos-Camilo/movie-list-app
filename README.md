Aqui está o README no formato solicitado:

---

# Movie List App

## Descrição

Movie List App é uma aplicação web que permite aos usuários pesquisar, salvar e remover filmes em uma lista de favoritos, integrada com a API do The Movie Database (TMDb). O projeto é dividido em dois módulos: um front-end desenvolvido com React.JS e um back-end com Django (Python).

## Estrutura do Projeto

```plaintext
movie-list-app/
│
├── movie-list/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── index.js
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
│
├── backend/
│   ├── mymovielist/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   ├── .gitignore
|   ├── manage.py
│   ├── README.md
│   ├── requirements.txt
│
├── .gitignore
├── README.md
├── requirements.txt
```

## Pré-requisitos

Certifique-se de ter instalado os seguintes softwares:

- [Python 3.8+](https://www.python.org/downloads/)
- [Node.js 14+](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)

## Passos para Configuração

### 1. Clonando o Repositório

Primeiro, clone este repositório em sua máquina local:

```bash
git clone https://github.com/seu-usuario/movie-list-app.git
cd movie-list-app
```

### 2. Configurando o Backend (Django)

#### 2.1. Criar um Ambiente Virtual

Navegue até a pasta `backend` e crie um ambiente virtual:

```bash
cd backend
python -m venv venv
```

#### 2.2. Ativar o Ambiente Virtual

Ative o ambiente virtual:

- No Windows:

  ```bash
  venv\Scripts\activate
  ```

- No macOS/Linux:

  ```bash
  source venv/bin/activate
  ```

#### 2.3. Instalar as Dependências

Instale as dependências listadas no arquivo `requirements.txt`:

```bash
pip install -r requirements.txt
```

#### 2.4. Configurar as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do diretório `backend/mymovielist/` com as seguintes variáveis de ambiente:

```plaintext
SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
TMDB_API_KEY=your_tmdb_api_key
```

Substitua `your_django_secret_key` e `your_tmdb_api_key` pelos valores corretos.

#### 2.5. Migrar o Banco de Dados

Execute as migrações para configurar o banco de dados:

```bash
python manage.py migrate
```

#### 2.6. Criar um Superusuário

Crie um superusuário para acessar o Django Admin:

```bash
python manage.py createsuperuser
```

#### 2.7. Iniciar o Servidor

Inicie o servidor de desenvolvimento do Django:

```bash
python manage.py runserver
```

### 3. Configurando o Frontend (React)

#### 3.1. Navegar para o Diretório Frontend

Abra um novo terminal, navegue para o diretório `frontend`:

```bash
cd frontend
```

#### 3.2. Instalar as Dependências

Instale as dependências listadas no `package.json`:

```bash
npm install
```

#### 3.3. Iniciar o Servidor de Desenvolvimento

Inicie o servidor de desenvolvimento do React:

```bash
npm start
```

### 4. Acessar a Aplicação

Com ambos os servidores (Django e React) rodando, você pode acessar a aplicação:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend/Admin: [http://localhost:8000/admin](http://localhost:8000/admin)

## Testes

### Backend

Para rodar os testes no backend:

```bash
python manage.py test
```

### Frontend

Para rodar os testes no frontend:

```bash
npm test
```

## Contribuição

Se você quiser contribuir para este projeto, siga as etapas abaixo:

1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b feature/sua-feature`).
3. Faça o commit das suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/sua-feature`).
5. Abra um Pull Request.