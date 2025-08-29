# 🏗️ API SERVICE TEMPLATE (GOOGLE CLOUD)

This repository contains a template for an API built with **Node.js, Express, and Docker**, ready to deploy on **Google Cloud Run**. It’s designed to serve as a starting point for new services.

---

## 👤 Creator

This API template was created by **Arthur Artugue**.  

[GitHub](https://github.com/majiinB) | [Portfolio](https://personal-portfolio-virid-delta.vercel.app) | [Email](mailto:arthurartugue392@gmail.com)

---

## 📃 Table of Contents

1. [Overview](#-overview)  
2. [Security Features](#-security-features)  
2. [Prerequisites](#-prerequisites)  
    - [Make a copy](#make-a-copy-of-the-repo)  
    - [What to Change](#what-to-change) 
    - [Additional Steps](#additional-steps)  
3. [Setup](#-setup)  
4. [Running Locally](#-running-locally)  
5. [Deploying to Cloud Run](#d-eploying-to-cloud-run)  
  

---

## 🔭 Overview

This API template includes:

- Node.js + Express server  
- Dockerfile for containerization  
- GitHub Actions workflow for CI/CD to Cloud Run  
- Example endpoints ready to extend  

It’s intended as a **starting point for new services**, so you can copy this repo, rename it, and adapt it for your specific API.

---

## 🔐 Security Features

- **CORS**:  
  The API already uses [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) to restrict cross-origin requests.
  > **Note:** Rate limiting was not included since this is expected to run in `Google Cloud Run`. The API will be behind a load balancer so rate limiting by IP address will not work. In addition, in memory cache (like Redis) will be dependent on your architecture (Stateless or Stateful). I recommend using `Redis` served in the cloud or just use `Google Cloud Armor`. 

- **Service Accounts**:  
  Deployment uses a Google Cloud service account with minimal required permissions for Cloud Run and Artifact Registry. The key is stored securely in GitHub Secrets (`GCP_KEY`) and is never committed to the repo.

- **Branch Protection & Workflow Rules**:  
  The repository can enforce that the `staging` branch passes tests before changes are merged into `main`. This ensures deployments are safe and reviewed.
  >**Note:** You need to enforce these rules manually to your github repo. `<your-repo>` -> ⚙️ settings -> 🌿branches -> ➕ Add branch ruleset

- **Environment Variables**:  
  Sensitive configuration (like `NODE_ENV`, `PORT`, API keys) is stored in a `.env` file or GitHub Secrets, keeping credentials out of source code.


---

## ✅ Prerequisites

**Before you start** Make sure you have the following installed and set up:

- **Node.js 22+**  
- **npm** or **yarn**  
- **Docker** (for building images locally)  
- **Google Cloud SDK**  
- **Google Cloud CLI**  

Also, ensure you have a **Google Cloud Project** with:

- Cloud Run enabled  
- Artifact Registry repository created  
- Service account key for authentication  

On the GitHub side:

- Repository created  
- Secrets configured:
  - `GCP_KEY` (your service account JSON)

Finally, create a **.env** file with the following keys:

- `NODE_ENV=development` (see `env.config.ts` for accepted values)  
- `PORT=8080`

---

## 🪜 Setup
### Make a copy of the repo
1. **Clone the repo**  
```bash
git clone <your-repo-url>
cd <repo-name>
```

2. **Install dependencies**  
```bash
npm install
# or if you use yarn
yarn install
```

3. **Create your `.env` file**  
```bash
NODE_ENV=development
PORT=8080
```

### What to Change

#### package.json
- Update the `name` and `version` fields to match your API.  
- Ensure the `start` script points to your entry file (`index.js` or `dist/index.js`).

#### .env file
- Set `NODE_ENV`, `PORT`, and any other environment variables your API needs.

#### Github Workflows
- Uncomment the whole script if automation is needed, delete if otherwise.

#### Google Cloud configuration
- Update `GCP_PROJECT_ID`, `REGION`, `ARTIFACT_REGISTRY_REPO`, and `SERVICE_NAME` in your GitHub Actions workflow.  
- Ensure your service account key has the proper permissions for Cloud Run and Artifact Registry.

### Additional Steps 
>**Note:** These steps are already included in the [Deployment](#deployment) automation. Specifically when you push to `main`, perform these steps if needed (eg. for local development testing).

4. **Build the Docker image**  
```bash
docker build -t <your-region>-docker.pkg.dev/<your-project-id>/<your-repo>/<your-service-name>:latest .
```

5. **Authenticate Docker with Google Artifact Registry**  
```bash
gcloud auth configure-docker <your-region>-docker.pkg.dev --quiet
```

6. **Push the Docker image to Artifact Registry**  
```bash
docker push <your-region>-docker.pkg.dev/<your-project-id>/<your-repo>/<your-service-name>:latest
```

7. **Deploy to Cloud Run**  
```bash
gcloud run deploy <your-service-name> \
  --image <your-region>-docker.pkg.dev/<your-project-id>/<your-repo>/<your-service-name>:latest \
  --region <your-region> \
  --platform managed \
  --allow-unauthenticated
```

---

## 🖥️ Running Locally

- Run API locally (Express server):
```bash
npm run dev
# or
yarn dev
```
- Run API locally (Docker Container):
```bash
docker run -p 8080:8080 <your-region>-docker.pkg.dev/<your-project-id>/<your-repo>/<your-service-name>:latest
```

---

## ☁️ Deploying to Cloud Run

Deployment is automated via **GitHub Actions**:

1. Push to the `staging` branch for testing in a staging environment (optional but recommended).  
2. Push to the `main` branch to deploy to production.  

The workflow will:  
- Authenticate with Google Cloud  
- Build and push Docker image to Artifact Registry  
- Deploy the API to Cloud Run  

>**Note:** Make sure the `GCP_KEY` secret in GitHub contains your service account JSON key.

**Optional best practice:**  
- You can enforce a branch protection rule in GitHub so that `main` can only be updated after the `staging` branch passes tests. This ensures that only verified code is deployed to production.

