// Inicializar AOS (animações)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true
    });

    // Scroll suave com ajuste para o cabeçalho fixo
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight; // Pega a altura do cabeçalho
                const targetPosition = targetElement.offsetTop - headerHeight; // Subtrai a altura do cabeçalho
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth' // Mantém a rolagem suave
                });
            }
        });
    });


    //Menu Hamburguer
    document.querySelector('#navToggle').addEventListener('click', function () {
        document.querySelector('.nav-links').classList.toggle('active');
    });
    // Abrir Modal de Demonstração
    document.getElementById('demoBtn').addEventListener('click', function () {
        const modal = document.getElementById('demoModal');
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.getElementById('demoName').focus();
    });

    // Fechar Modal
    document.getElementById('closeModal').addEventListener('click', function () {
        const modal = document.getElementById('demoModal');
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        resetForm('demoForm');
    });

    // Fechar Modal ao clicar fora
    window.addEventListener('click', function (event) {
        const modal = document.getElementById('demoModal');
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            resetForm('demoForm');
        }
    });

    // Validar e Enviar Formulário de Demonstração
    document.getElementById('demoForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('demoName').value.trim();
        const email = document.getElementById('demoEmail').value.trim();
        const phone = document.getElementById('demoPhone').value.trim().replace(/[\s()-]/g, '');
        const date = document.getElementById('demoDate').value;
        const message = document.getElementById('demoMessage').value.trim();

        console.log('Dados enviados:', { name, email, phone, date, message });

        const successPopup = document.getElementById('demoSuccessPopup'); // Usando o pop-up específico do modal
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^\d{10,11}$/;

        if (!name || !email || !phone || !date || !emailRegex.test(email) || !phoneRegex.test(phone)) {
            alert('Por favor, preencha todos os campos corretamente. Email deve ser válido e telefone deve ter 10 ou 11 dígitos.');
            return;
        }

        try {
            const response = await fetch('https://alpha-labs.onrender.com/api/agendar-demo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, date, message }),
                mode: 'cors'
            });

            console.log('Resposta bruta do servidor:', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok,
                headers: Object.fromEntries(response.headers.entries())
            });

            if (!response.ok) {
                let errorData = null;
                try {
                    errorData = await response.json();
                    console.log('Dados de erro JSON recebidos:', errorData);
                } catch (parseError) {
                    console.error('Erro ao parsear resposta JSON:', parseError);
                    const textResponse = await response.text();
                    console.log('Resposta de texto do servidor:', textResponse);
                    throw new Error('Resposta inválida do servidor.');
                }
                throw new Error(errorData?.message || 'Erro ao enviar solicitação. Resposta inválida do servidor.');
            }

            const data = await response.json();
            console.log('Dados JSON recebidos:', data);

            // Mostra o pop-up específico do modal
            successPopup.classList.remove('hidden');
            successPopup.style.display = 'flex';

            // Reseta o formulário e fecha o modal após 3 segundos
            setTimeout(() => {
                successPopup.classList.add('hidden');
                successPopup.style.display = 'none';
                document.getElementById('demoModal').style.display = 'none';
                document.getElementById('demoModal').setAttribute('aria-hidden', 'true');
                resetForm('demoForm');
            }, 3000);

        } catch (error) {
            console.error('Erro ao enviar solicitação:', {
                message: error.message,
                stack: error.stack
            });
            alert(`Erro: ${error.message}`);
        }
    });

    // Validar e Enviar Formulário de Contato
    document.getElementById('contactForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('mensagem').value.trim();

        console.log('Dados enviados (contato):', { name, email, message });

        const successPopup = document.getElementById('successPopup'); // Pop-up do footer
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!name || !email || !message || !emailRegex.test(email)) {
            alert('Por favor, preencha todos os campos corretamente. E-mail deve ser válido.');
            return;
        }

        try {
            const response = await fetch('https://alpha-labs.onrender.com/api/contato', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
                mode: 'cors'
            });

            console.log('Resposta bruta do servidor (contato):', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok,
                headers: Object.fromEntries(response.headers.entries())
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || 'Erro ao enviar mensagem.');
            }

            const data = await response.json();
            console.log('Dados JSON recebidos (contato):', data);

            // Mostra o pop-up do footer
            successPopup.classList.remove('hidden');
            successPopup.style.display = 'flex';

            // Reseta o formulário após 3 segundos
            setTimeout(() => {
                successPopup.classList.add('hidden');
                successPopup.style.display = 'none';
                this.reset();
            }, 3000);

        } catch (error) {
            console.error('Erro ao enviar mensagem:', {
                message: error.message,
                stack: error.stack
            });
            alert(`Erro: ${error.message}`);
        }
    });


    // Chatbot Retrátil
    const chatbotIcon = document.getElementById('chatbotIcon');
    const chatbotContent = document.getElementById('chatbotContent');
    const chatInput = document.getElementById('chatInput');
    const chatOutput = document.getElementById('chatOutput');
    const chatbotBubbles = document.querySelector('.chatbot-bubbles');

    // Estado do chatbot para lembrar o nome e histórico
    let userName = '';
    let conversationHistory = [];
    userName = localStorage.getItem('userName') || '';
    conversationHistory = JSON.parse(localStorage.getItem('conversationHistory')) || [];

    // URL do webhook do n8n
    const chatbotBackendUrl = 'https://alpha-labs.onrender.com/api/chatbot-message';

    // Função para enviar mensagem ao n8n (AGORA CHAMA SEU BACKEND)
async function sendMessageToN8n(userMessage) {
    const sessionId = getSessionId();
    try {
        const response = await fetch(chatbotBackendUrl, { // MUDE AQUI
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage, sessionId: sessionId, history: conversationHistory })
        });
        const data = await response.json();
        console.log("Resposta do seu backend para o chatbot:", data); // Ajuste o log
        return data.reply || 'Desculpe, não consegui processar sua mensagem. Tente novamente mais tarde!';
    } catch (error) {
        console.error("Erro ao chamar o backend para o chatbot:", error); // Ajuste o log
        return 'Desculpe, houve um erro ao processar sua mensagem. Por favor, tente novamente!';
    }
}

    // Função para obter ou gerar um sessionId
    function getSessionId() {
        let sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = 'user-' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
    }

    // Função para verificar palavras-chave e redirecionar
    function handleUserMessage(userMessage) {
        const messageLower = userMessage.toLowerCase();

        // Captura o nome do usuário
        if (messageLower.includes('meu nome é') || messageLower.includes('meu nome eh')) {
            const nameMatch = userMessage.match(/(?:meu nome é|meu nome eh)\s+([a-zA-Z]+)/i);
            if (nameMatch && nameMatch[1]) {
                userName = nameMatch[1];
                localStorage.setItem('userName', userName);
                return `Prazer em conhecê-lo, ${userName}! Como posso ajudar você hoje?`;
            }
        }

        // Usa o nome do usuário em respostas, se disponível
        const greeting = userName ? `${userName}, ` : '';

        // Verifica se o usuário perguntou pelo nome
        if (messageLower.includes('qual é o meu nome') || messageLower.includes('qual o meu nome')) {
            if (userName) {
                return `${greeting}Seu nome é ${userName}, né? 😊 Como posso te ajudar agora?`;
            } else {
                return `Eu não sei o seu nome ainda! 😅 Pode me dizer o seu nome?`;
            }
        }

        // Palavras-chave para redirecionamento
        if (messageLower.includes('contato') || messageLower.includes('fale comigo')) {
            return `${greeting}Você quer entrar em contato? Clique aqui: <a href="/#contato" target="_blank">Página de Contato</a>`;
        } else if (messageLower.includes('serviços') || messageLower.includes('o que você faz')) {
            return `${greeting}Conheça nossos serviços! Clique aqui: <a href="/#servicos" target="_blank">Nossos Serviços</a>`;
        } else if (messageLower.includes('sobre') || messageLower.includes('quem somos')) {
            return `${greeting}Saiba mais sobre nós! Clique aqui: <a href="/#sobre" target="_blank">Sobre Nós</a>`;
        } else if (messageLower.includes('whatsapp') ||
            messageLower.includes('zap') ||
            messageLower.includes('whats') ||
            messageLower.includes('zapzap') ||
            messageLower.includes('wpp') ||
            messageLower.includes('falar no whatsapp')) {
            const whatsappNumber = '73981597856'; // Substitua pelo número real
            const whatsappMessage = encodeURIComponent('Olá, gostaria de falar sobre seus serviços!');
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
            return `${greeting}Vamos conversar pelo WhatsApp? Clique aqui: <a href="${whatsappLink}" target="_blank">Falar no WhatsApp</a>`;
        }

        // Se não houver palavras-chave, envia a mensagem ao n8n
        return null;
    }

    // Enviar mensagem ao pressionar Enter 
    chatInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const userMessage = chatInput.value.trim();
            if (userMessage === '') return;

            // Adiciona a mensagem do usuário ao chat 
            chatOutput.innerHTML += `<p class="chat-message user"><strong>Você:</strong> ${userMessage}</p>`;
            chatOutput.scrollTop = chatOutput.scrollHeight;
            localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));
            conversationHistory.push({ sender: 'user', message: userMessage });

            // Limpa o input 
            chatInput.value = '';

            // Mostra o indicador de "digitando..."
            const typingIndicator = document.createElement('p');
            typingIndicator.className = 'chat-message bot typing';
            typingIndicator.innerHTML = '<strong>Alpha:</strong> Digitando...';
            chatOutput.appendChild(typingIndicator);
            chatOutput.scrollTop = chatOutput.scrollHeight;

            // Verifica palavras-chave para redirecionamento
            const localReply = handleUserMessage(userMessage);
            let botReply;

            if (localReply) {
                botReply = localReply;
            } else {
                // Envia a mensagem ao n8n e exibe a resposta
                botReply = await sendMessageToN8n(userMessage);
            }
            // Remove o indicador de "digitando..."
            typingIndicator.remove();

            // Exibe a resposta do bot
            chatOutput.innerHTML += `<p class="chat-message bot"><strong>Alpha:</strong> ${botReply}</p>`;
            chatOutput.scrollTop = chatOutput.scrollHeight;
            conversationHistory.push({ sender: 'bot', message: botReply });

            // Atraso depois do envio do link whatsapp
            if (botReply && botReply.includes('https://wa.me/')) {
                setTimeout(() => {
                    chatOutput.innerHTML += `<p class="chat-message bot"><strong>Alpha:</strong> Enviei o link do WhatsApp para você! Conseguiu abrir direitinho? 😊 Se precisar de mais alguma coisa, é só me avisar!</p>`;
                    chatOutput.scrollTop = chatOutput.scrollHeight;
                }, 5000);
            }
        }
    });

    // Abrir/fechar o chat
    chatbotIcon.addEventListener('click', () => {
        const isChatOpen = !chatbotContent.classList.contains('hidden');
        if (isChatOpen) {
            // Fecha o chat e mostra os balões
            chatbotContent.classList.add('hidden');
            chatbotBubbles.style.display = 'flex';
        } else {
            // Abre o chat e esconde os balões
            chatbotContent.classList.remove('hidden');
            chatbotBubbles.style.display = 'none';

            // Saudação inicial se for a primeira abertura
            if (conversationHistory.length === 0) {
                const greeting = "Oi! Eu sou o Alpha, seu assistente da Alpha Labs. Como posso te ajudar hoje? 😊";
                chatOutput.innerHTML += `<p class="chat-message bot"><strong>Alpha:</strong> ${greeting}</p>`;
                chatOutput.scrollTop = chatOutput.scrollHeight;
                conversationHistory.push({ sender: 'bot', message: greeting });
                localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));
            } else {
                // Carrega o histórico existente
                conversationHistory.forEach(msg => {
                    const senderClass = msg.sender === 'user' ? 'user' : 'bot';
                    const senderLabel = msg.sender === 'user' ? 'Você' : 'Alpha';
                    chatOutput.innerHTML += `<p class="chat-message ${senderClass}"><strong>${senderLabel}:</strong> ${msg.message}</p>`;
                });
                chatOutput.scrollTop = chatOutput.scrollHeight;
            }

            // Foca no input
            chatInput.focus();
        }

        // Atualiza atributos de acessibilidade
        const isOpen = !chatbotContent.classList.contains('hidden');
        chatbotContent.setAttribute('aria-hidden', !isOpen);
        chatbotIcon.setAttribute('aria-expanded', isOpen);
    });

    // Gere ou recupere um sessionId único para o usuário
    function getSessionId() {
        let sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
            // Gera um sessionId único (você pode usar uma biblioteca como uuid para algo mais robusto)
            sessionId = 'user-' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
    }

    // Verifica se os balões já foram fechados
    if (localStorage.getItem('bubblesClosed') === 'true') {
        document.querySelectorAll('.bubble').forEach(bubble => {
            bubble.classList.add('hidden');
        });
        document.querySelector('.close-bubbles').style.display = 'none';
    }

    // Função para garantir que os balões e o botão "X" reapareçam ao carregar a página
    window.addEventListener('load', () => {
        // Seleciona todos os balões
        const bubbles = document.querySelectorAll('.bubble');
        // Remove a classe "hidden" de todos os balões
        bubbles.forEach(bubble => {
            bubble.classList.remove('hidden');
        });
        // Mostra o botão "X"
        const closeBubblesBtn = document.querySelector('.close-bubbles');
        closeBubblesBtn.style.display = 'flex'; // Usa "flex" para manter o display original (definido no CSS)
    });

    // Seleciona o botão "X"
    const closeBubblesBtn = document.querySelector('.close-bubbles');

    // Seleciona todos os balões
    const bubbles = document.querySelectorAll('.bubble');

    // Adiciona o evento de clique ao botão "X"
    closeBubblesBtn.addEventListener('click', () => {
        // Esconde todos os balões e o botão "X"
        bubbles.forEach(bubble => {
            bubble.classList.add('hidden');
        });
        closeBubblesBtn.style.display = 'none';
    });

    // Modo Escuro
    document.getElementById('themeToggle').addEventListener('click', function () {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        this.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        document.getElementById('themeToggle').textContent = '☀️';
    }

    // Inicializar Carrossel (Owl Carousel)
    $(document).ready(function () {
        try {
            $(".owl-carousel").owlCarousel({
                loop: true,
                margin: 20,
                nav: true,
                dots: true,
                autoplay: true,
                autoplayTimeout: 5000,
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
                    1000: { items: 3 }
                }
            });
        } catch (error) {
            console.error('Erro ao inicializar o Owl Carousel:', error);
        }
    });

    // Contadores de Estatísticas
    const stats = document.querySelectorAll('.stat-item h3');
    stats.forEach(stat => {
        const targetText = stat.textContent;
        const symbol = targetText.includes('+') ? '+' : targetText.includes('%') ? '%' : '';
        const number = parseInt(targetText.replace(/[^0-9]/g, '')) || 0;

        let count = 0;
        const duration = 2000;
        const start = performance.now();

        function updateCounter(timestamp) {
            const elapsed = timestamp - start;
            count = Math.min(number, (elapsed / duration) * number);
            stat.textContent = Math.round(count) + symbol;

            if (count < number) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    });

    // Botão Voltar ao Topo
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Fechar Pop-ups ao clicar no botão "Fechar"
    document.getElementById('closePopup').addEventListener('click', function () {
        const successPopup = document.getElementById('successPopup');
        successPopup.classList.add('hidden');
        successPopup.style.display = 'none';
    });

    document.getElementById('closeDemoPopup').addEventListener('click', function () {
        const demoSuccessPopup = document.getElementById('demoSuccessPopup');
        demoSuccessPopup.classList.add('hidden');
        demoSuccessPopup.style.display = 'none';
    });
});

function resetForm(formId) {
    document.getElementById(formId).reset();
    // Não precisa mais resetar o pop-up aqui, pois isso será tratado nos eventos de envio
}
