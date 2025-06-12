DROP DATABASE IF EXISTS bicosthe;
CREATE DATABASE bicosthe;
USE bicosthe;

CREATE TABLE usuario (
  idusuario INT PRIMARY KEY AUTO_INCREMENT,
  cpf CHAR(11) UNIQUE NOT NULL,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  celular VARCHAR(13),
  bloqueado BOOLEAN DEFAULT FALSE
);

CREATE TABLE zona (
  idzona INT PRIMARY KEY,
  zona VARCHAR(45)
);


CREATE TABLE bairro (
  idbairro INT PRIMARY KEY AUTO_INCREMENT,
  bairro VARCHAR(45),
  idzona INT NOT NULL,
  FOREIGN KEY (idzona) REFERENCES zona(idzona)
);

CREATE TABLE servico (
  idservico INT PRIMARY KEY AUTO_INCREMENT,
  valor DECIMAL(10,2),
  descricao TEXT NOT NULL,
  titulo VARCHAR(100) NOT NULL,
  dataInicio DATETIME,
  dataFim DATETIME,
  idbairro INT,
  usuarioId INT, -- quem criou o serviço
  contato_visivel BOOLEAN DEFAULT FALSE,
  id_usuario_atribuido INT DEFAULT NULL,
  visivel_feed BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (usuarioId) REFERENCES usuario(idusuario),
  FOREIGN KEY (id_usuario_atribuido) REFERENCES usuario(idusuario),
  FOREIGN KEY (idbairro) REFERENCES bairro(idbairro)
);

CREATE TABLE usuario_servico (
  usuario_idusuario INT,
  servico_idservico INT,
  data_candidatura DATETIME DEFAULT NOW(),
  PRIMARY KEY (usuario_idusuario, servico_idservico),
  FOREIGN KEY (usuario_idusuario) REFERENCES usuario(idusuario),
  FOREIGN KEY (servico_idservico) REFERENCES servico(idservico)
);

CREATE TABLE categoria (
  idcategoria INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL
);

CREATE TABLE servico_categoria (
  idservico INT,
  idcategoria INT,
  PRIMARY KEY (idservico, idcategoria),
  FOREIGN KEY (idservico) REFERENCES servico(idservico),
  FOREIGN KEY (idcategoria) REFERENCES categoria(idcategoria)
);

CREATE TABLE denuncia (
  iddenuncia INT PRIMARY KEY AUTO_INCREMENT,
  idusuario_denunciado INT,
  idusuario_denunciante INT,
  motivo TEXT,
  data_denuncia DATETIME DEFAULT NOW(),
  FOREIGN KEY (idusuario_denunciado) REFERENCES usuario(idusuario),
  FOREIGN KEY (idusuario_denunciante) REFERENCES usuario(idusuario)
);

CREATE TABLE sessao (
  idsessao INT PRIMARY KEY AUTO_INCREMENT,
  idusuario INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  criado_em DATETIME DEFAULT NOW(),
  expira_em DATETIME,
  ativo BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (idusuario) REFERENCES usuario(idusuario)
);
