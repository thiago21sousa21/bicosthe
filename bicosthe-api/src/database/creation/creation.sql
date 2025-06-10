DROP DATABASE IF EXISTS bicosthe;
CREATE DATABASE bicosthe;
USE bicosthe;

CREATE TABLE usuario (
  idusuario INT PRIMARY KEY AUTO_INCREMENT,
  cpf CHAR(11) UNIQUE NOT NULL,
  nome VARCHAR(100),
  email VARCHAR(45),
  senha VARCHAR(255),
  celular VARCHAR(13),
  bloqueado BOOLEAN DEFAULT FALSE
);

CREATE TABLE regiao (
  idregiao INT PRIMARY KEY AUTO_INCREMENT,
  bairro VARCHAR(45),
  zona ENUM('norte', 'sul', 'leste', 'sudeste', 'centro')
);

CREATE TABLE servico (
  idservico INT PRIMARY KEY AUTO_INCREMENT,
  valor DECIMAL(10,2),
  descricao TEXT,
  titulo VARCHAR(100),
  dataInicio DATETIME,
  dataFim DATETIME,
  idregiao INT,
  usuarioId INT, -- quem criou o serviço
  contato_visivel BOOLEAN DEFAULT FALSE,
  id_usuario_atribuido INT DEFAULT NULL,
  visivel_feed BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (usuarioId) REFERENCES usuario(idusuario),
  FOREIGN KEY (id_usuario_atribuido) REFERENCES usuario(idusuario),
  FOREIGN KEY (idregiao) REFERENCES regiao(idregiao)
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
  nome VARCHAR(45)
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

ALTER TABLE usuario MODIFY nome VARCHAR(100) NOT NULL;
ALTER TABLE usuario MODIFY email VARCHAR(45) NOT NULL;
ALTER TABLE usuario MODIFY senha VARCHAR(255) NOT NULL;
ALTER TABLE servico MODIFY titulo VARCHAR(100) NOT NULL;
ALTER TABLE servico MODIFY descricao TEXT NOT NULL;
ALTER TABLE categoria MODIFY nome VARCHAR(45) NOT NULL;
