import db from "../database/database.js";

db.query(`INSERT INTO regiao (bairro, zona) VALUES     
        ('centro', 'centro'),
        ('angelim', 'sul'),
        ('matinha', 'norte')`
  );