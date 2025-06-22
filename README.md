# Alpha Labs - Documentação do Backend e Frontend

---
<a id="versao-em-portugues"></a>

## 🌐 Versão em Português
Se quiser a versão em inglês, [clique aqui](#versao-em-ingles).

<a href="https://alphalabs.lat"> Clique aqui</a> para acessar o site.

---

## 🎯 Visão Geral
Bem-vindo ao **Alpha Labs**, uma plataforma de ponta especializada em automação baseada em IA, soluções de software e suporte técnico. Este repositório hospeda o backend (Node.js com Express, MongoDB Atlas e Nodemailer) e o frontend (HTML, CSS, JavaScript) do Alpha Labs, permitindo que usuários agendem demonstrações e enviem mensagens de contato de forma fluida. Nossa missão é transformar negócios com automação inteligente e tecnologia inovadora, garantindo escalabilidade e eficiência.

---

## 🚀 Recursos
- **Backend (Node.js/Express)**:
  - API RESTful com rotas `/api/contato` e `/api/agendar-demo` para tratar mensagens de contato e solicitações de demonstração.
  - Integração com MongoDB Atlas para armazenamento de dados.
  - Notificações por e-mail usando Nodemailer (via Gmail) para submissões de usuários.
  - Configuração de CORS para requisições seguras de origem cruzada do frontend.
- **Frontend (HTML/CSS/JavaScript)**:
  - Site responsivo hospedado em `https://alphalabs.lat`.
  - Formulários interativos para contato e agendamento de demonstrações com animações (AOS, Owl Carousel).
  - Chatbot (AlphaBot) para engajamento do usuário, alternância de modo (claro/escuro) e rolagem suave.
- **Infraestrutura**:
  - Hospedado no Render, com pinger no UptimeRobot para prevenir dormência.
  - MongoDB Atlas para persistência de dados.

---

## 🚀 Pontos Fortes
**Variáveis de Ambiente:** Uso correto de .env e verificação de variáveis críticas antes de iniciar.
**Segurança com Helmet:** Proteção contra vulnerabilidades comuns.
**Rate Limiting:** Essencial para prevenir spam e ataques DoS em rotas de formulário.
**Validação e Sanitização de Entrada:** O express-validator é uma excelente escolha, garantindo que os dados recebidos são válidos e limpos (trim, lowercase, normalizeEmail). A validação de data no passado é um bom toque.
**Tratamento de Erros:** Middlewares de erro e try/catch nas rotas são bem implementados. A distinção de mensagem de erro entre production e development é uma prática de segurança muito boa.
**Conexão MongoDB:** Configurações de timeout razoáveis e tratamento de erro fatal.
**Nodemailer:** Verificação de conexão e tratamento de reenvio são robustos.


    

---

## 👤 Autores e Agradecimentos
- **- [WallCod 🦁 ](https://www.linkedin.com/in/wallax-figueiredo-41116b285/)**  
  Líder do Projeto e Desenvolvedor  

- **Equipe Alpha Labs**  
  Pela visão e inovação em IA e automação.

---

## 📜 Licença
Este projeto está licenciado sob a Licença All Right Reserved — veja o arquivo `LICENSE` para detalhes.
- © 2025
- 🦁
- [Wallax Figueiredo](https://www.linkedin.com/in/wallax-figueiredo-41116b285/).
-  Todos os direitos reservados.  
Este código é disponibilizado apenas para visualização como parte do meu portfólio. É estritamente proibido copiar, modificar, distribuir ou usar este código para qualquer finalidade sem autorização expressa por escrito.

---

## 💡 Suporte
Se você tiver problemas ou dúvidas, abra uma *issue* no GitHub ou entre em contato com nossa equipe em `suport@alphalabs.lat` ou `alphalabsia@gmail.com`.
 Junte-se à nossa jornada e transforme negociações com Alpha Labs!

---

<a id="versao-em-ingles"></a>

# Alpha Labs - Backend and Frontend Documentation

---

## 🌐 English Version
If you want the Portuguese version, [click here](#versao-em-portugues).

<a href="https://alphalabs.lat"> Click here </a> to acess the website.

---

## 🎯 Overview
Welcome to **Alpha Labs**, a cutting-edge platform specializing in AI-based automation, software solutions, and technical support. This repository hosts the backend (Node.js with Express, MongoDB Atlas, and Nodemailer) and frontend (HTML, CSS, JavaScript) of Alpha Labs, enabling users to schedule demos and send contact messages seamlessly. Our mission is to transform businesses with intelligent automation and innovative technology, ensuring scalability and efficiency.

---

## 🚀 Features
- **Backend (Node.js/Express)**:
  - RESTful API with routes `/api/contato` and `/api/agendar-demo` to handle contact messages and demo requests.
  - Integration with MongoDB Atlas for data storage.
  - Email notifications using Nodemailer (via Gmail) for user submissions.
  - CORS configuration for secure cross-origin requests from the frontend.
- **Frontend (HTML/CSS/JavaScript)**:
  - Responsive website hosted at `https://alphalabs.lat` or `https://wallcod.github.io/Alpha-Labs`.
  - Interactive forms for contact and demo scheduling with animations (AOS, Owl Carousel).
  - Chatbot (AlphaBot) for user engagement, light/dark mode toggling, and smooth scrolling.
- **Infrastructure**:
  - Hosted on Render, with a pinger on UptimeRobot to prevent dormancy.
  - MongoDB Atlas for data persistence.

---

## 👤 Authors and Acknowledgments
- **Wallcod**  
  Project Leader and Developer  
  (https://github.com/wallcod)
- **Alpha Labs Team**  
  For their vision and innovation in AI and automation.
- **Contributors**  
  Members of the open-source community on GitHub.

---

## 📜 License
This project is licensed under the All Rights Reserved License — see the `LICENSE` file for details.

- © 2025
- 🦁
- [Wallax Figueiredo](https://www.linkedin.com/in/wallax-figueiredo-41116b285/).
- All rights reserved.
This code is made available only for viewing as part of my portfolio. It is strictly forbidden to copy, modify, distribute, or use this code for any purpose without express written authorization.


---

## 💡 Support
If you have any issues or questions, open an *issue* on GitHub or contact our team at `support@alphalabs.lat`. Join our journey and transform negotiations with Alpha Labs!

---

<a id="versao-em-portugues"></a>