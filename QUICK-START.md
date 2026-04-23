# ⚡ Quick Start - Koala Sports

Guia rápido para começar a usar o sistema em 5 minutos.

---

## 🚀 Instalação Rápida

### Opção 1: Abrir Diretamente (Mais Simples)

1. **Baixe o projeto**
2. **Abra o arquivo `index.html`** no seu navegador
3. **Pronto!** O sistema está funcionando

⚠️ **Nota**: Algumas funcionalidades podem não funcionar sem servidor web (como carregamento do JSON).

### Opção 2: Com Servidor Local (Recomendado)

#### Usando Python (se você tem Python instalado)

```bash
# Navegue até a pasta do projeto
cd koala-sports

# Inicie o servidor
python -m http.server 8000

# Abra no navegador
http://localhost:8000
```

#### Usando Node.js (se você tem Node instalado)

```bash
# Instale o http-server globalmente (apenas uma vez)
npm install -g http-server

# Navegue até a pasta do projeto
cd koala-sports

# Inicie o servidor
http-server

# Abra no navegador
http://localhost:8080
```

#### Usando PHP (se você tem PHP instalado)

```bash
# Navegue até a pasta do projeto
cd koala-sports

# Inicie o servidor
php -S localhost:8000

# Abra no navegador
http://localhost:8000
```

#### Usando VS Code (Live Server)

1. Instale a extensão **Live Server** no VS Code
2. Clique com botão direito em `index.html`
3. Selecione **"Open with Live Server"**
4. Pronto!

---

## ✅ Checklist Inicial

Após abrir o sistema, verifique:

- [ ] Produtos estão carregando na página inicial
- [ ] Filtros funcionam (Todos, Retro, Lançamentos, etc.)
- [ ] Pesquisa funciona
- [ ] Modal abre ao clicar em um produto
- [ ] Carrinho abre ao clicar no ícone
- [ ] Adicionar ao carrinho funciona
- [ ] Botão WhatsApp flutuante aparece ao rolar a página

---

## 🎯 Primeiros Passos

### 1. Personalize o WhatsApp

Edite o número em `js/components/CartUI.js` (linha 8):

```javascript
this.WA_NUMERO = '5585996543820'; // Seu número aqui
```

E em `js/app.js` (linha 234):

```javascript
const url = `https://wa.me/5585996543820?text=...`; // Seu número aqui
```

### 2. Adicione Seus Produtos

Edite `produtos.json` e adicione seus produtos:

```json
{
  "id": "seu-produto",
  "nome": "Nome do Produto",
  "slug": "seu-produto",
  "descricao": "Descrição completa",
  "precoAtual": 180.00,
  "categorias": ["nacional"],
  "tamanhos": ["P", "M", "G", "GG"],
  "estoque": {
    "P": 10,
    "M": 15,
    "G": 12,
    "GG": 8
  },
  "pasta": "Nome da Pasta",
  "avaliacao": 4.8,
  "totalAvaliacoes": 100
}
```

### 3. Adicione Imagens dos Produtos

1. Crie uma pasta em `images/` com o nome do produto
2. Adicione 5 imagens: `1.png`, `2.png`, `3.png`, `4.png`, `5.png`
3. Certifique-se de que o campo `pasta` no JSON corresponde ao nome da pasta

### 4. Personalize as Cores

Edite `styles.css` (linhas 1-7):

```css
:root {
  --black: #0a0a0a;           /* Cor de fundo */
  --white: #ffffff;           /* Cor de texto */
  --accent-green: #00e676;    /* Cor de destaque */
  --radius: 12px;             /* Raio de borda */
}
```

---

## 🧪 Teste Rápido

### Teste o Carrinho

1. Abra o site
2. Clique em qualquer produto
3. Selecione um tamanho
4. Clique em "Adicionar ao Carrinho"
5. Verifique se o carrinho abre automaticamente
6. Teste aumentar/diminuir quantidade
7. Clique em "Finalizar no WhatsApp"
8. Verifique se o WhatsApp abre com a mensagem formatada

### Teste os Filtros

1. Clique em "Retro" - deve mostrar apenas produtos retrô
2. Clique em "Lançamentos" - deve mostrar apenas lançamentos
3. Use a pesquisa - digite "Flamengo" e veja os resultados
4. Clique em "Todos" - deve mostrar todos os produtos novamente

### Teste o Estoque

1. Abra um produto
2. Verifique se tamanhos esgotados estão desabilitados
3. Verifique se aparece "Últimas X unidades" quando estoque ≤ 2
4. Tente adicionar mais unidades do que o estoque disponível
5. Deve aparecer mensagem de erro

---

## 🐛 Problemas Comuns

### Produtos não aparecem

**Solução**: Use um servidor web local (veja Opção 2 acima)

### Imagens não carregam

**Solução**: 
1. Verifique se as pastas em `images/` existem
2. Verifique se os nomes correspondem ao campo `pasta` no JSON
3. Certifique-se de que as imagens estão nomeadas corretamente (1.png, 2.png, etc.)

### Carrinho não salva

**Solução**:
1. Verifique se o navegador permite LocalStorage
2. Não use modo anônimo
3. Limpe o cache do navegador

### WhatsApp não abre

**Solução**:
1. Verifique se o número está no formato correto: `5585996543820`
2. Inclua código do país (55) e DDD
3. Não use espaços, traços ou parênteses

---

## 📱 Teste em Dispositivos

### Desktop
- Chrome
- Firefox
- Safari
- Edge

### Mobile
- Chrome Mobile
- Safari iOS
- Samsung Internet

### Ferramentas de Teste
- Chrome DevTools (F12 → Toggle Device Toolbar)
- Responsinator: https://www.responsinator.com/
- BrowserStack: https://www.browserstack.com/

---

## 🎨 Customização Rápida

### Mudar Logo

Substitua `images/logo-koala-sports.png` pela sua logo.

### Mudar Banner Hero

Edite `styles.css` (linha 23):

```css
.hero-bg-campo {
  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), 
              url('SUA-IMAGEM-AQUI.jpg') center/cover;
}
```

### Mudar Texto do Hero

Edite `index.html` (linhas 70-73):

```html
<h1 class="hero-title">SEU TEXTO <span class="highlight">AQUI</span>.</h1>
<p class="hero-sub">Seu subtítulo aqui.</p>
```

---

## 📊 Próximos Passos

Depois de configurar o básico:

1. **Adicione Google Analytics**
   - Crie conta no Google Analytics
   - Adicione o código de rastreamento no `<head>`

2. **Configure Meta Pixel**
   - Crie Pixel no Facebook Business
   - Adicione o código no `<head>`

3. **Otimize Imagens**
   - Use TinyPNG para comprimir
   - Converta para WebP se possível

4. **Configure Domínio**
   - Registre um domínio
   - Configure DNS
   - Ative HTTPS

5. **Faça Deploy**
   - Netlify (recomendado)
   - Vercel
   - GitHub Pages

---

## 🆘 Precisa de Ajuda?

### Documentação Completa
- `README.md` - Visão geral e estrutura
- `GUIA-DE-USO.md` - Guia detalhado
- `CHANGELOG.md` - Histórico de mudanças

### Suporte
- **WhatsApp**: (85) 99654-3820
- **Email**: contato@koalasports.com.br
- **Instagram**: @Koalasports085

### Recursos Online
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3Schools](https://www.w3schools.com/)
- [Stack Overflow](https://stackoverflow.com/)

---

## ✨ Dica Final

**Comece simples!** 

Não tente implementar tudo de uma vez. Siga esta ordem:

1. ✅ Configure o básico (WhatsApp, produtos, imagens)
2. ✅ Teste tudo localmente
3. ✅ Personalize cores e textos
4. ✅ Faça deploy
5. ✅ Adicione analytics
6. ✅ Otimize performance
7. ✅ Adicione funcionalidades avançadas

---

**Boa sorte com sua loja! 🚀**

*Desenvolvido com ❤️ para a Koala Sports*
