-- Arquivo SQL para povoamento do banco de dados bicosthe (Nova Estrutura)

-- -----------------------------------------------------
-- Inserção de dados na tabela `usuario`
-- -----------------------------------------------------
INSERT INTO usuario (cpf, nome, email, senha, celular, bloqueado) VALUES
('11122233344', 'João Silva', 'joao.silva@example.com', '$2a$10$hashedpassword.12345', '86988887777', FALSE),
('22233344455', 'Maria Souza', 'maria.souza@example.com', '$2a$10$hashedpassword.67890', '86999996666', FALSE),
('33344455566', 'Pedro Costa', 'pedro.costa@example.com', '$2a$10$hashedpassword.abcde', '86987654321', TRUE), -- Usuário bloqueado
('44455566677', 'Ana Pereira', 'ana.pereira@example.com', '$2a$10$hashedpassword.fghij', '86981234567', FALSE),
('55566677788', 'Carlos Oliveira', 'carlos.oliveira@example.com', '$2a$10$hashedpassword.klmno', '86991238765', FALSE);

-- -----------------------------------------------------
-- Inserção de dados na tabela `zona`
-- -----------------------------------------------------
-- Assumindo que você quer IDs específicos para cada zona, como 1 para 'centro', 2 para 'leste', etc.
-- Se a tabela zona tiver AUTO_INCREMENT, você pode omitir o idzona e ele será gerado.
-- Neste exemplo, estou mantendo a ideia de IDs específicos para as zonas para facilitar a referência.
INSERT INTO zona (idzona, zona) VALUES
(1, 'centro'),
(2, 'leste'),
(3, 'sul'),
(4, 'norte'),
(5, 'sudeste');

-- -----------------------------------------------------
-- Inserção de dados na tabela `bairro`
-- -----------------------------------------------------
-- Os idzona referenciam os IDs inseridos na tabela `zona` acima.
INSERT INTO bairro (bairro, idzona) VALUES
('Centro', 1),          -- idzona 1 (centro)
('Morada do Sol', 2),   -- idzona 2 (leste)
('Saci', 3),            -- idzona 3 (sul)
('Mocambinho', 4),      -- idzona 4 (norte)
('São João', 2),        -- idzona 2 (leste)
('Dirceu Arcoverde', 5); -- idzona 5 (sudeste)

-- -----------------------------------------------------
-- Inserção de dados na tabela `categoria`
-- -----------------------------------------------------
INSERT INTO categoria (nome) VALUES
('Encanador'),
('Eletricista'),
('Diarista'),
('Jardineiro'),
('Pedreiro'),
('Programador'),
('Designer Gráfico'),
('Professor Particular');

-- -----------------------------------------------------
-- Inserção de dados na tabela `servico`
-- -----------------------------------------------------
-- Os idbairro referenciam os IDs inseridos na tabela `bairro`.
-- Você precisará verificar qual `idbairro` corresponde a qual bairro após a inserção.
-- Para simplificar neste exemplo, estou usando os IDs sequenciais que seriam gerados
-- se você inserisse os bairros na ordem em que estão no script `bairro`.
INSERT INTO servico (valor, descricao, titulo, dataInicio, dataFim, idbairro, usuarioId, contato_visivel, id_usuario_atribuido, visivel_feed) VALUES
-- Serviços criados por João Silva (idusuario = 1)
(150.00, 'Conserto de vazamento em pia da cozinha, URGENTE.', 'Conserto de Vazamento', '2025-06-10 09:00:00', '2025-06-10 12:00:00', 1, 1, TRUE, NULL, TRUE), -- Centro (idbairro = 1)
(200.00, 'Instalação de novas tomadas e fiação para chuveiro elétrico.', 'Instalação Elétrica', '2025-06-12 14:00:00', '2025-06-12 18:00:00', 2, 1, TRUE, NULL, TRUE), -- Morada do Sol (idbairro = 2)
(120.00, 'Limpeza completa de apartamento 2 quartos, 2 banheiros.', 'Diarista para Apto', '2025-06-15 08:00:00', '2025-06-15 16:00:00', 3, 1, FALSE, NULL, TRUE), -- Saci (idbairro = 3)

-- Serviços criados por Maria Souza (idusuario = 2)
(80.00, 'Poda de árvores e corte de grama em jardim residencial.', 'Manutenção de Jardim', '2025-06-11 10:00:00', '2025-06-11 13:00:00', 4, 2, TRUE, 1, TRUE), -- Mocambinho (idbairro = 4), atribuído a João Silva
(300.00, 'Construção de muro de contenção em área de declive.', 'Construção de Muro', '2025-06-20 08:00:00', '2025-06-25 17:00:00', 5, 2, TRUE, NULL, TRUE), -- São João (idbairro = 5)

-- Serviços criados por Ana Pereira (idusuario = 4)
(50.00, 'Aulas de reforço em matemática para ensino fundamental.', 'Aulas de Matemática', '2025-06-13 15:00:00', '2025-06-13 17:00:00', 1, 4, TRUE, NULL, TRUE), -- Centro (idbairro = 1)
(400.00, 'Desenvolvimento de website institucional para pequena empresa.', 'Criação de Website', '2025-07-01 09:00:00', '2025-07-30 17:00:00', 6, 4, FALSE, NULL, TRUE), -- Dirceu Arcoverde (idbairro = 6)
(180.00, 'Criação de logo e identidade visual para novo negócio.', 'Designer Gráfico', '2025-06-18 10:00:00', '2025-06-20 18:00:00', 2, 4, TRUE, 5, TRUE); -- Morada do Sol (idbairro = 2), atribuído a Carlos Oliveira

-- -----------------------------------------------------
-- Inserção de dados na tabela `usuario_servico` (candidaturas)
-- -----------------------------------------------------
INSERT INTO usuario_servico (usuario_idusuario, servico_idservico, data_candidatura) VALUES
(2, 1, '2025-06-09 10:00:00'), -- Maria Souza se candidata ao serviço de João Silva (Conserto de Vazamento)
(4, 1, '2025-06-09 11:30:00'), -- Ana Pereira se candidata ao serviço de João Silva (Conserto de Vazamento)
(1, 4, '2025-06-10 08:00:00'), -- João Silva se candidata ao serviço de Maria Souza (Manutenção de Jardim)
(5, 7, '2025-06-14 10:00:00'), -- Carlos Oliveira se candidata ao serviço de Ana Pereira (Criação de Website)
(2, 6, '2025-06-12 16:00:00'); -- Maria Souza se candidata ao serviço de Ana Pereira (Aulas de Matemática)

-- -----------------------------------------------------
-- Inserção de dados na tabela `servico_categoria`
-- -----------------------------------------------------
INSERT INTO servico_categoria (idservico, idcategoria) VALUES
(1, 1), -- Conserto de Vazamento (Encanador)
(2, 2), -- Instalação Elétrica (Eletricista)
(3, 3), -- Diarista para Apto (Diarista)
(4, 4), -- Manutenção de Jardim (Jardineiro)
(5, 5), -- Construção de Muro (Pedreiro)
(6, 8), -- Aulas de Matemática (Professor Particular)
(7, 6), -- Criação de Website (Programador)
(8, 7), -- Designer Gráfico (Designer Gráfico)
(7, 7); -- Criação de Website (também pode ser Designer Gráfico)

-- -----------------------------------------------------
-- Inserção de dados na tabela `denuncia`
-- -----------------------------------------------------
INSERT INTO denuncia (idusuario_denunciado, idusuario_denunciante, motivo, data_denuncia) VALUES
(3, 1, 'Usuário Pedro Costa com comportamento inadequado em uma negociação.', '2025-06-08 14:00:00'),
(2, 4, 'Não compareceu ao local do serviço agendado.', '2025-06-11 09:00:00');

-- -----------------------------------------------------
-- Inserção de dados na tabela `sessao` (exemplo)
-- Nota: Em um ambiente real, a tabela de sessões seria gerenciada pela aplicação,
-- com tokens gerados e datas de expiração dinâmicas.
-- -----------------------------------------------------
INSERT INTO sessao (idusuario, token, criado_em, expira_em, ativo) VALUES
(1, 'token_joao_12345', '2025-06-10 08:30:00', '2025-06-10 18:30:00', TRUE),
(2, 'token_maria_abcde', '2025-06-09 15:00:00', '2025-06-09 23:00:00', FALSE), -- Sessão expirada/inativa
(4, 'token_ana_fghij', '2025-06-10 09:15:00', '2025-06-10 19:15:00', TRUE);