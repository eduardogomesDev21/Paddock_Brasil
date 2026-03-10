from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

# Base URL para o mirror da Ergast API (100% compativel)
ERGAST_API_BASE = "https://api.jolpi.ca/ergast/f1"

# --- ROTAS DE TEMPLATES HTML ---

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/pilotos')
def pilotos():
    return render_template('pilotos.html')

@app.route('/equipes')
def equipes():
    return render_template('equipes.html')

@app.route('/corridas')
def corridas():
    return render_template('corridas.html')

@app.route('/circuitos')
def circuitos():
    return render_template('circuitos.html')

# --- ROTAS DA API INTERNA (PROXY PARA ERGAST) ---

def fetch_from_api(endpoint):
    """Função utilitária para buscar dados da API da Ergast"""
    try:
        response = requests.get(f"{ERGAST_API_BASE}/{endpoint}.json")
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/pilotos')
def api_pilotos():
    # current/drivers
    return fetch_from_api("current/drivers")

@app.route('/api/equipes')
def api_equipes():
    # current/constructors
    return fetch_from_api("current/constructors")

@app.route('/api/corridas')
def api_corridas():
    # current (retorna o calendário atual)
    return fetch_from_api("current")

@app.route('/api/circuitos')
def api_circuitos():
    # circuits
    return fetch_from_api("circuits")

@app.route('/api/classificacao_pilotos')
def api_classificacao_pilotos():
    # current/driverStandings
    return fetch_from_api("current/driverStandings")

@app.route('/api/classificacao_equipes')
def api_classificacao_equipes():
    # current/constructorStandings
    return fetch_from_api("current/constructorStandings")

@app.route('/api/ultima_corrida')
def api_ultima_corrida():
    # current/last/results
    return fetch_from_api("current/last/results")


if __name__ == '__main__':
    # Rodar o app em modo debug em desenvolvimento
    app.run(debug=True, port=8080)
