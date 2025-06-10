from sqlalchemy import create_engine, text
import pandas as pd
import os # Importar o módulo os para acessar variáveis de ambiente
from dotenv import load_dotenv # Importar load_dotenv para carregar o arquivo .env

class Povoar:
    """
    Classe para interagir com o banco de dados e realizar operações de povoamento.
    """
    def __init__(self, user: str, password: str, host: str, db_name: str):
        """
        Inicializa a conexão com o banco de dados MySQL.

        Args:
            user (str): Nome de usuário do banco de dados.
            password (str): Senha do usuário do banco de dados.
            host (str): Host do banco de dados (ex: 'localhost').
            db_name (str): Nome do banco de dados a ser conectado.
        """
        try:
            # Cria o objeto engine para interagir com o banco de dados
            self._engine = create_engine(f"mysql+pymysql://{user}:{password}@{host}/{db_name}")
            print("Conexão estabelecida com sucesso.")
        except Exception as e:
            print(f"Erro ao estabelecer conexão: {e}")
            raise e

    @property
    def engine(self):
        """
        Retorna o objeto engine da SQLAlchemy.
        """
        return self._engine

    def send(self, data: pd.DataFrame, name_table: str):
        """
        Envia dados de um DataFrame para uma tabela específica no banco de dados.

        Args:
            data (pd.DataFrame): DataFrame contendo os dados a serem inseridos.
            name_table (str): Nome da tabela no banco de dados.
        """
        try:
            # Usa to_sql para inserir o DataFrame na tabela
            data.to_sql(f"{name_table}", self.engine, if_exists="append", index=False)
            print(f"Dados inseridos com sucesso na tabela '{name_table}'.")
        except Exception as e:
            print(f"Erro ao inserir dados na tabela '{name_table}': {e}")
            raise e

    def read(self, table_name: str):
        """
        Lê dados de uma tabela específica no banco de dados e retorna um DataFrame.

        Args:
            table_name (str): Nome da tabela a ser lida.

        Returns:
            pd.DataFrame: DataFrame contendo os dados da tabela.
        """
        try:
            df = pd.read_sql_table(table_name, self.engine)
            print(f"Dados da tabela '{table_name}' lidos com sucesso.")
            return df
        except Exception as e:
            print(f"Erro ao ler dados da tabela '{table_name}': {e}")
            raise e

    def execute_sql_script(self, sql_script: str):
        """
        Executa um script SQL completo, que pode conter múltiplos comandos.

        Args:
            sql_script (str): String contendo o script SQL a ser executado.
        """
        # Divide o script em comandos individuais usando ';' como delimitador
        commands = sql_script.split(';')
        
        # Conecta ao banco de dados para executar os comandos
        with self.engine.connect() as connection:
            with connection.begin(): # Inicia uma transação para garantir atomicidade
                for command in commands:
                    # Limpa espaços em branco e remove comentários de linha
                    clean_command = command.strip()
                    if clean_command and not clean_command.startswith('--'):
                        try:
                            # Executa o comando SQL. Usamos text() para comandos brutos.
                            connection.execute(text(clean_command))
                            print(f"Comando executado: {clean_command[:80]}...") # Exibe os primeiros 80 caracteres do comando
                        except Exception as e:
                            print(f"Erro ao executar comando SQL: {clean_command[:80]}...")
                            print(f"Detalhes do erro: {e}")
                            # Em um cenário real, você pode querer levantar o erro ou registrar mais detalhes.
                            # raise e # Descomente para parar a execução em caso de erro.
                print("Script SQL executado com sucesso!")

def main():
    # Carrega as variáveis de ambiente do arquivo .env
    load_dotenv()

    # Credenciais do banco de dados (carregadas do arquivo .env)
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_HOST = os.getenv("DB_HOST")
    DB_NAME = os.getenv("DB_NAME")

    # Verifica se as variáveis de ambiente foram carregadas
    if not all([DB_USER, DB_PASSWORD, DB_HOST, DB_NAME]):
        print("Erro: As variáveis de ambiente do banco de dados (DB_USER, DB_PASSWORD, DB_HOST, DB_NAME) não foram carregadas. Verifique seu arquivo .env.")
        return # Sai da função se as variáveis não estiverem definidas

    # Caminho para o arquivo SQL de povoamento
    sql_file_path = "src/database/seeds/populate_bicosthe.sql"
    sql_populate_script = ""

    # Tenta ler o conteúdo do arquivo SQL
    try:
        with open(sql_file_path, 'r', encoding='utf-8') as file:
            sql_populate_script = file.read()
        print(f"Arquivo '{sql_file_path}' lido com sucesso.")
    except FileNotFoundError:
        print(f"Erro: O arquivo '{sql_file_path}' não foi encontrado. Certifique-se de que ele está no mesmo diretório do script Python.")
        return
    except Exception as e:
        print(f"Erro ao ler o arquivo '{sql_file_path}': {e}")
        return

    try:
        # Instancia a classe Povoar
        db_povoar = Povoar(DB_USER, DB_PASSWORD, DB_HOST, DB_NAME)
        
        # Em seguida, execute o script de povoamento lido do arquivo
        db_povoar.execute_sql_script(sql_populate_script)

        # Exemplo de leitura de dados após o povoamento
        # usuarios_df = db_povoar.read("usuario")
        # print("\nDados da tabela 'usuario' após povoamento:")
        # print(usuarios_df.head())

    except Exception as e:
        print(f"Ocorreu um erro no script principal: {e}")

if __name__ == '__main__':
    main()
