import streamlit as st
import requests

st.set_page_config(page_title="Cadastro de Usuário", layout="centered")
st.title("Cadastro de Usuário")

with st.form(key='cadastro_form'):
    cpf = st.text_input("CPF", max_chars=11)
    nome = st.text_input("Nome")
    email = st.text_input("Email")
    senha = st.text_input("Senha", type="password")
    celular = st.text_input("Celular", max_chars=11)

    submit_button = st.form_submit_button("Cadastrar")

    if submit_button:
        dados = {
            "cpf": cpf,
            "nome": nome,
            "email": email,
            "senha": senha,
            "celular": celular
        }

        try:
            resposta = requests.post(
                "http://localhost:3000/seu-endpoint-aqui",  # Substitua pelo endpoint da sua API
                json=dados
            )

            if resposta.status_code == 200 or resposta.status_code == 201:
                st.success("Usuário cadastrado com sucesso!")
            else:
                st.error(f"Erro ao cadastrar: {resposta.status_code} - {resposta.text}")

        except requests.exceptions.RequestException as erro:
            st.error("Erro de conexão com a API.")
            st.exception(erro)
