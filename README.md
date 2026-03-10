🏎️ Paddock Brasil — Formula 1 Data Dashboard

Paddock Brasil é um dashboard moderno de estatísticas da Fórmula 1, desenvolvido para exibir dados reais da temporada atual de forma elegante, rápida e interativa.

O projeto foi inspirado em interfaces premium de esportes e no design visual moderno do site oficial do piloto da Formula 1 Lando Norris, trazendo uma experiência fluida com animações, efeitos visuais e dados dinâmicos.

A aplicação utiliza Python com Flask no backend e HTML, CSS e JavaScript puro no frontend, consumindo dados da Ergast F1 API através de um mirror estável.

🚀 Preview

<img width="1337" height="615" alt="image" src="https://github.com/user-attachments/assets/abcd7049-9c10-4651-ad22-ac563a2dc2b7" />

<img width="1317" height="617" alt="image" src="https://github.com/user-attachments/assets/63993a59-5d09-4ff4-a119-eb7b5980e5d3" />

<img width="1326" height="615" alt="image" src="https://github.com/user-attachments/assets/b5407105-b722-47d3-a55a-e71a5e20a5f8" />

<img width="1325" height="623" alt="image" src="https://github.com/user-attachments/assets/a690d025-1ef8-48f7-8a68-440531a589e8" />

<img width="1324" height="618" alt="image" src="https://github.com/user-attachments/assets/920cc44e-725a-4640-b44a-b71efa0987a4" />


APIs e Recursos

Ergast F1 API (via mirror)

Material Design Icons

Google Fonts — Outfit

🧠 Arquitetura do Projeto

A aplicação utiliza uma arquitetura simples e eficiente:

Frontend (HTML + CSS + JS)
        ↓
Flask Backend (Proxy API)
        ↓
Ergast API Mirror
Backend

O Flask atua como um proxy de API, recebendo requisições do frontend e buscando os dados da API externa.

Isso traz vantagens como:

evitar problemas de CORS

centralizar chamadas da API

padronizar respostas JSON

Arquivo principal:

backend.py
Frontend

O frontend é composto por:

templates/
    index.html
    pilotos.html
    equipes.html
    calendario.html
    circuitos.html

static/
    style.css
    script.js
CSS

O design utiliza um sistema de design baseado em variáveis CSS.

Tema visual:

Deep Dark: #0a0a0c

Racing Red: #e10600

Efeitos implementados:

glassmorphism

sombras neon (glow)

animações de hover

skeleton screens (carregamento)

JavaScript

O script.js utiliza:

Fetch API assíncrona

renderização dinâmica

manipulação de DOM

Fluxo de dados:

1️⃣ JS faz request para rotas do Flask
2️⃣ Flask consulta a Ergast API
3️⃣ Dados retornam em JSON
4️⃣ JS renderiza cards e tabelas dinamicamente

📊 Funcionalidades
🏁 Dashboard

Widget com vencedor da última corrida

Cards de navegação rápida

visão geral da temporada

(print do dashboard aqui)

👨‍✈️ Lista de Pilotos

Grid com:

nome

número permanente

nacionalidade

foto (placeholder)

(print da página de pilotos)

🏎️ Lista de Equipes

Exibe os construtores da temporada atual com:

nome da equipe

nacionalidade

dados do campeonato

(print da página de equipes)

📅 Calendário de Corridas

Lista cronológica das etapas da temporada:

nome do Grande Prêmio

circuito

data formatada

(print do calendário)

🏟️ Circuitos

Galeria dos circuitos da temporada:

nome do circuito

localização

país

(print da página de circuitos)

🎨 Design e Experiência

O visual do projeto foi inspirado em interfaces premium do mundo do automobilismo, com referências ao site do piloto da McLaren Lando Norris.

Elementos visuais incluem:

✨ Layout moderno em cards
✨ efeitos hover interativos
✨ glow neon racing
✨ animações suaves
✨ loading skeletons
✨ interface responsiva

O objetivo foi criar uma experiência próxima a um dashboard profissional de análise esportiva.

🛠️ Como Rodar o Projeto
1️⃣ Clonar o repositório
git clone https://github.com/seu-usuario/paddock-brasil.git
cd paddock-brasil
2️⃣ Criar ambiente virtual (opcional)
python -m venv venv

Ativar:

Windows:

venv\Scripts\activate

Linux / Mac:

source venv/bin/activate
3️⃣ Instalar dependências
pip install flask requests
4️⃣ Rodar o servidor
python backend.py
5️⃣ Abrir no navegador
http://127.0.0.1:5000
🔌 Fonte dos Dados

Os dados de corrida são obtidos da:

Ergast F1 API

Como a API oficial foi descontinuada em 2024, o projeto utiliza um mirror compatível mantido pela comunidade:

https://api.jolpi.ca/ergast/f1/

Esse mirror mantém o mesmo formato de resposta JSON, permitindo integração direta com aplicações existentes.

📄 Licença

Este projeto está sob a licença MIT.

Você pode:

usar

modificar

distribuir

livremente.

🙌 Créditos

Dados da Ergast F1 API

Ícones: Material Design Icons

Tipografia: Google Fonts – Outfit
