// Importando o express instalado localmente na pasta node_modules
import express from 'express';

import cors from 'cors';

// Importando o prisma instalado localmente na pasta node_modules
import { PrismaClient } from '@prisma/client'

// Criando a variável e passando ela como função para iniciar o express
const app = express();

// Criando uma instância do prisma
const prisma = new PrismaClient()

// Configurando o express para receber requisições em formato JSON
app.use(express.json());
app.use(cors());

app.get('/usuarios', async (req, res) => {
    // Só podemos ter uma res, se tivermos duas da erro.
    await prisma.user.findMany({
        where: {
            name: req.query.name,
            email: req.query.email,
            age: req.query.age
        }
    }).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        res.status(400).json({ error: error.message });
    });
})

app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        }
    })
        .catch((error) => {
            res.status(400).json({ error: error.message });
        });
})

app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: (req.params.id)
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        }
    }).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        res.status(400).json({ error: error.message });
    });
})


app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: (req.params.id)
        }
    }).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        res.status(400).json({ error: error.message });
    });
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});