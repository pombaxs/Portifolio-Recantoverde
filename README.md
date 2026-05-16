# Recanto Verde — Deploy rápido

Este repositório contém um site estático (HTML/CSS/JS). Abaixo há instruções para publicar o site em um link público, acessível por navegador móvel, e manter a possibilidade de editar e atualizar o site facilmente.

Opção recomendada (GitHub Pages com Actions)
- Crie um repositório no GitHub e conecte-o ao seu projeto local.
  - No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<seu-usuario>/<seu-repo>.git
git push -u origin main
```

- O arquivo de workflow `.github/workflows/deploy.yml` (já incluído) faz o deploy automático para GitHub Pages sempre que você der `git push` na branch `main`.
- Depois do primeiro push, aguarde alguns minutos. O site ficará disponível em:

```
https://<seu-usuario>.github.io/<seu-repo>/
```

Como fazer alterações
- Faça mudanças localmente (ex.: editar `index.html`, `styles.css`).
- Commit e `git push` para `main`. O Actions rodará e atualizará automaticamente o site.

Opção alternativa (Netlify — simples e rápido)
- Acesse https://app.netlify.com/sites and crie um site por drag-and-drop: arraste a pasta contendo `index.html` para a área de deploy.
- Ou conecte o repositório GitHub ao Netlify para deploy automático a cada push.

Testar localmente e ver no celular
- Sirva localmente com Python (recomendado):

```bash
python -m http.server 8000
```

- No PC, descubra seu IP local (Windows): `ipconfig` → use o `IPv4 Address`.
- No celular conectado à mesma rede Wi‑Fi, abra: `http://<IP-do-PC>:8000`.

Compartilhar
- Após publicar (GitHub Pages ou Netlify), copie a URL pública e compartilhe-a. As alterações futuras são feitas com commits/push.

Se quiser, eu posso:
- Gravar a imagem anexa em `assets/logo.png` agora.
- Criar o repositório Git local e instruções passo-a-passo para push.

Automatizar criação de repositório e push

Incluí dois scripts em `scripts/` que criam um repositório privado no GitHub e fazem o push dos arquivos para `main` (requer `gh` e `git` instalados):

- `scripts/publish_github.ps1` — PowerShell (Windows)
- `scripts/publish_github.sh` — Bash (Linux / macOS / WSL)

Execute um dos scripts localmente após autenticar o `gh` CLI com `gh auth login`.

Observação: por segurança eu não tenho acesso à sua conta GitHub — você precisa executar o script no seu computador para autorizar.

---
Se quiser que eu crie o `logo.png` a partir da imagem que você enviou, confirme e eu salvo o arquivo em `assets/logo.png`.
# � Recanto Verde - Espaço para Eventos

Um site profissional e moderno para apresentar sua empresa de aluguel de espaço para eventos.

## 📋 Características

✅ **Design Responsivo** - Funciona perfeitamente em desktop, tablet e mobile  
✅ **Menu Mobile** - Hamburger menu automático em dispositivos pequenos  
✅ **Animações Suaves** - Transições e efeitos visuais atraentes  
✅ **Seções Completas**:
- Home/Hero com Call-to-Action
- Sobre o Espaço e Estatísticas de Eventos
- Serviços Oferecidos (Buffet, Som, Equipe, etc)
- Galeria de Eventos Realizados
- Formulário de Contato para Reservas
- Footer com Links Sociais

✅ **Otimizado** - Carregamento rápido, sem dependências externas  
✅ **Fácil de Customizar** - HTML, CSS e JavaScript simples e bem comentado  

## 🚀 Como Usar

### 1. Abrir o Site
Simplesmente abra o arquivo `index.html` em seu navegador:
- Clique duplo no arquivo `index.html`
- Ou clique com botão direito → "Abrir com" → Navegador

### 2. Customizar Conteúdo

#### Mudar Nome da Empresa
Abra `index.html` e procure:
```html
<div class="logo">Recanto Verde</div>
```
Altere "Recanto Verde" para o nome da sua empresa.

#### Mudar Informações de Contato (WhatsApp e Instagram)
Procure a seção "CONTATO" em `index.html` e atualize os links:

**Para WhatsApp:**
-```html
<a href="https://wa.me/5527998672633?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20eventos%20no%20Recanto%20Verde">
```
- Altere `5527998672633` para seu número com código de país (55 Brasil, 27 Espírito Santo)
- A mensagem padrão está após `?text=`

**Para Instagram:**
```html
<a href="https://instagram.com/recantoverde">
```
- Altere `recantoverde` para seu usuário do Instagram
- Também atualize `@recantoverde` no texto do botão

**Localização:**
```html
<p>São Paulo, SP - Brasil</p>
```
- Atualize para sua localização

#### Adicionar Seus Eventos
Procure a seção de EVENTOS (antes chamada Projetos) e atualize os cards:
```html
<div class="projeto-card">
    <div class="projeto-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
    <h3>Nome do Seu Evento</h3>
    <p>Descrição do evento realizado...</p>
    <a href="#" class="btn-link">Ver Evento →</a>
</div>
```

#### Mudar Cores
Abra `styles.css` e edite as variáveis no topo:
```css
:root {
    --primary-color: #667eea;      /* Cor principal */
    --secondary-color: #764ba2;    /* Cor secundária */
    /* ... outras cores ... */
}
```

## 📁 Estrutura dos Arquivos

```
Portifolio recanto/
├── index.html        # Página principal
├── styles.css        # Estilos do site
├── script.js         # Funcionalidades JavaScript
└── README.md         # Este arquivo
```

## 🎯 Seções do Site

### Hero (Home)
- Mensagem de boas-vindas sobre o espaço para eventos
- Botão de chamada para ação (CTA)

### Sobre
- Descrição do espaço Recanto Verde
- 3 estatísticas principais (eventos realizados, clientes satisfeitos, anos de experiência)

### Serviços
- 6 cards com serviços principais:
  - Espaço Amplo
  - Serviço de Buffet
  - Sistema de Som
  - Equipe Experiente
  - Decoração
  - Estacionamento

### Eventos
- Galeria de eventos já realizados
- Cards mostrando exemplos: Casamentos, Festas de Aniversário, Reuniões Corporativas
- Links para detalhes de cada evento

### Contato
- Botões diretos para WhatsApp com mensagem padrão
- Botão para Instagram
- Ambos abrem em nova aba
- Informações de localização

## ⚙️ Funcionalidades JavaScript

✨ **Menu Mobile** - Toggle automático em dispositivos pequenos  
✨ **Scroll Suave** - Navegação suave entre seções  
✨ **Animações de Entrada** - Elementos animados ao entrar na viewport  
✨ **Contador de Estatísticas** - Números animados na seção sobre  
✨ **Active Link** - Destaca link da seção atual na navbar  
✨ **Botões de Contato** - Links diretos para WhatsApp e Instagram  

## 📱 Responsividade

O site se adapta automaticamente para:
- 📲 Mobile (até 480px)
- 📲 Tablet (480px - 768px)
- 💻 Desktop (acima de 768px)

## 🎨 Personalização de Cores

As cores principais usam gradientes modernos. Para mudar:

1. Abra `styles.css`
2. Localize a seção `:root { ... }`
3. Altere `--primary-color` e `--secondary-color`

Exemplos de gradientes:
- Roxo/Azul: `#667eea` → `#764ba2`
- Rosa/Vermelho: `#f093fb` → `#f5576c`
- Ciano/Azul: `#4facfe` → `#00f2fe`

## 🔧 Tecnologias

- **HTML5** - Semântica e acessibilidade
- **CSS3** - Flexbox, Grid, Gradientes, Animações
- **JavaScript Vanilla** - Sem frameworks ou dependências

## 💡 Dicas

1. **Adicionar mais eventos**: Copie um `projeto-card` e adapte os dados com informações de novos eventos
2. **Personalizar serviços**: Copie um `servico-card` na seção de serviços e adicione seus próprios
3. **Links sociais**: Atualize os links no footer para suas redes sociais (Instagram, Facebook, etc)
4. **Favicon / Logo**: Já incluí versões em SVG no projeto: `assets/logo.svg` e `assets/favicon.svg`. O site já usa esses arquivos e mostra o logo circular ao lado do nome.
  - Exemplo: `assets/logo.svg` (usado como imagem circular ao lado do nome)
  - Exemplo: `assets/favicon.svg` (ícone do site)
5. **Imagens dos eventos**: Para os cards de eventos, substitua o `linear-gradient` por imagens reais dos eventos realizados

## 📞 Botões de Contato

A seção de contato tem **dois botões principais**:

### WhatsApp
- **Abre uma conversa no WhatsApp Web**
- Envia uma mensagem padrão para seu número
- O visitante pode editar a mensagem antes de enviar
- Link: `https://wa.me/[NUMERO]?text=[MENSAGEM]`

### Instagram
- **Abre seu perfil do Instagram**
- Permite que visitantes te sigam ou enviem DM
- Link: `https://instagram.com/[USUARIO]`

**Como personalizar:**

Para atualizar esses botões, edite `index.html` na seção de contato:
- Número WhatsApp: Altere `5511999999999` para seu número (código país + DDD + telefone)
- Username Instagram: Altere `recantoverde` para seu username
- Mensagem WhatsApp: Customize o texto após `?text=` (use %20 para espaços)

## 📞 Suporte

Para adicionar funcionalidades avançadas:
- **Analytics**: Adicione Google Analytics para rastrear visitantes
- **SEO**: Complete as meta tags no head do HTML e use palavras-chave relevantes
- **Agendamento**: Considere integrar um sistema de calendário para reservas online
- **Galeria de Fotos**: Adicione imagens reais dos eventos em vez de gradientes

## 📄 Licença

Este template é livre para uso pessoal e comercial.

---

**Desenvolvido com ❤️ para sua empresa Recanto Verde**
