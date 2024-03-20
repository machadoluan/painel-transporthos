const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const ejs = require('ejs');

const app = express();
app.use(cors()); // Use o middleware CORS

const port = 3000;

const user = "luandealmeidamachado0@gmail.com"; // Substitua pelo seu e-mail
const pass = "tjje fapq gckb dttr"; // Substitua pela sua senha

app.get('/', (req, res) => res.send('Sistema de mandar emails funcionando.'));


app.use(express.json());

app.post('/send', (req, res) => {
  const recipientEmail = req.body.recipientEmail;
  const { cliente, qtd, tipo_de_carga, origem, destino, selectedStatus, selectedInform, emailBody } = req.body;

  if (!recipientEmail) {
    return res.status(400).send('E-mail do destinatário ausente.');
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user,
      pass
    }
  });

  const subject = `Follow UP: ${selectedInform}`;

  const text = `
    Cliente: ${cliente}
    Quantidade: ${qtd}
    Tipo de Carga: ${tipo_de_carga}
    Origem: ${origem}
    Destino: ${destino}
    Status: ${selectedStatus}
    Informação: ${selectedInform}
  `;

  const htmlBody = emailBody;  // Use o corpo HTML fornecido

  transporter.sendMail({
    from: user,
    to: recipientEmail,
    subject: subject,
    html: htmlBody  // Inclua o corpo HTML aqui

  }).then(info => {
    res.send(info);
    console.log("E-mail enviado:", info);
  }).catch(error => {
    res.status(500).send(error);
    console.error("Erro ao enviar o e-mail:", error);
  });
});



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
