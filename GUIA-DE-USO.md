# 📖 Guia de Uso - Koala Sports

Guia completo para gerenciar e utilizar o sistema Koala Sports.

---

## 🎯 Para Administradores

### Como Adicionar um Novo Produto

1. **Prepare as imagens do produto**
   - Crie uma pasta em `images/` com o nome do produto
   - Adicione 5 imagens nomeadas como: `1.png`, `2.png`, `3.png`, `4.png`, `5.png`
   - Formato recomendado: PNG ou JPG
   - Resolução recomendada: 800x800px

2. **Edite o arquivo `produtos.json`**

Adicione um novo objeto no array `produtos`:

```json
{
  "id": "flamengo-home-26-27",
  "nome": "Flamengo Home 26-27",
  "slug": "flamengo-home-26-27",
  "descricao": "Camisa oficial do Flamengo para a temporada 26-27. Manto sagrado rubro-negro.",
  "precoOriginal": 200.00,
  "precoAtual": 180.00,
  "promocao": true,
  "categorias": ["nacional", "lançamento"],
  "tamanhos": ["P", "M", "G", "GG"],
  "estoque": {
    "P": 10,
    "M": 15,
    "G": 12,
    "GG": 8
  },
  "prontaEntrega": true,
  "pasta": "Flamengo Home 26-27",
  "avaliacao": 4.9,
  "totalAvaliacoes": 234,
  "peso": 250,
  "material": "Poliéster Premium",
  "tecnologia": "Dry-Fit"
}
```

**Campos obrigatórios:**
- `id`: Identificador único (use kebab-case)
- `nome`: Nome do produto
- `slug`: URL amigável (geralmente igual ao id)
- `descricao`: Descrição completa
- `precoAtual`: Preço de venda
- `categorias`: Array de categorias
- `tamanhos`: Array de tamanhos disponíveis
- `estoque`: Objeto com quantidade por tamanho
- `pasta`: Nome exato da pasta em `images/`

**Campos opcionais:**
- `precoOriginal`: Preço antes do desconto
- `promocao`: true/false
- `prontaEntrega`: true/false
- `avaliacao`: Nota de 0 a 5
- `totalAvaliacoes`: Número de avaliações
- `peso`: Peso em gramas
- `material`: Material do produto
- `tecnologia`: Tecnologia do tecido

### Como Atualizar Estoque

Edite o campo `estoque` do produto em `produtos.json`:

```json
"estoque": {
  "P": 5,    // 5 unidades do tamanho P
  "M": 0,    // Esgotado
  "G": 2,    // Últimas 2 unidades (badge amarelo)
  "GG": 10
}
```

**Comportamentos automáticos:**
- Estoque = 0: Tamanho desabilitado com badge "Esgotado"
- Estoque ≤ 2: Badge "Últimas X unidades"
- Estoque > 2: Normal

### Como Criar uma Promoção

1. Defina `promocao: true`
2. Adicione `precoOriginal` (preço antes do desconto)
3. Defina `precoAtual` (preço com desconto)

```json
{
  "precoOriginal": 220.00,
  "precoAtual": 180.00,
  "promocao": true
}
```

O sistema calculará automaticamente o percentual de desconto e exibirá:
- Preço riscado
- Badge com desconto (ex: -18%)
- Destaque visual

### Como Adicionar Categorias

As categorias disponíveis são:
- `nacional`: Times brasileiros
- `internacional`: Times estrangeiros
- `selecao`: Seleções nacionais
- `retro`: Camisas retrô
- `lançamento`: Lançamentos
- `pronta-entrega`: Pronta entrega
- `feminino`: Linha feminina
- `infantil`: Linha infantil

Um produto pode ter múltiplas categorias:

```json
"categorias": ["nacional", "lançamento", "pronta-entrega"]
```

### Como Gerenciar Avaliações

Atualize os campos de avaliação:

```json
{
  "avaliacao": 4.8,
  "totalAvaliacoes": 312
}
```

**Sistema de estrelas:**
- 5.0: ★★★★★
- 4.5: ★★★★☆
- 4.0: ★★★★☆
- 3.5: ★★★☆☆
- etc.

---

## 🛒 Para Clientes

### Como Navegar na Loja

1. **Página Inicial**
   - Hero com destaque principal
   - Categorias visuais
   - Banner promocional
   - Grid de produtos

2. **Filtrar Produtos**
   - Clique nas categorias visuais
   - Use os botões de filtro (Todos, Retro, Lançamentos, etc.)
   - Pesquise pelo nome do produto

3. **Ver Detalhes do Produto**
   - Clique no card do produto
   - Modal abrirá com:
     - Galeria de imagens
     - Descrição completa
     - Avaliações
     - Seleção de tamanho
     - Opção de personalização

### Como Adicionar ao Carrinho

1. Abra o produto desejado
2. Selecione o tamanho
3. Escolha se deseja personalização
4. Clique em "Adicionar ao Carrinho"
5. Notificação de sucesso aparecerá
6. Carrinho abrirá automaticamente

### Como Gerenciar o Carrinho

**Abrir o carrinho:**
- Clique no ícone do carrinho no header
- Badge mostra quantidade de itens

**No carrinho você pode:**
- Ver todos os produtos adicionados
- Aumentar/diminuir quantidade
- Remover produtos
- Ver subtotal em tempo real
- Limpar todo o carrinho

**Validações automáticas:**
- Não permite adicionar mais que o estoque disponível
- Alerta quando estoque é insuficiente
- Atualiza totais automaticamente

### Como Finalizar Pedido

1. Revise os produtos no carrinho
2. Clique em "Finalizar no WhatsApp"
3. WhatsApp abrirá com mensagem formatada:
   ```
   🔥 KOALA SPORTS - PEDIDO

   1. Flamengo 25-26
      📏 Tamanho: M
      🧵 Personalização: NÃO
      📦 Quantidade: 2
      💰 Subtotal: R$ 360,00

   2. Barcelona 25-26
      📏 Tamanho: G
      🧵 Personalização: SIM
      📦 Quantidade: 1
      💰 Subtotal: R$ 180,00

   ━━━━━━━━━━━━━━━━━━━━
   💵 TOTAL: R$ 540,00
   📦 Total de itens: 3

   🎁 Promoção: Leve 3 Pague 2!
   ```
4. Envie a mensagem
5. Aguarde atendimento

---

## 🔧 Para Desenvolvedores

### Estrutura de Código

**Padrão de Arquitetura:**
```
Services (Lógica de Negócio)
    ↓
Components (Interface)
    ↓
Utils (Funções Auxiliares)
```

### Como Adicionar Nova Funcionalidade

**Exemplo: Sistema de Cupons**

1. **Criar Service**

```javascript
// js/services/CouponService.js
class CouponService {
  constructor() {
    this.cupons = [];
  }

  validarCupom(codigo) {
    // Lógica de validação
  }

  aplicarDesconto(codigo, valor) {
    // Lógica de desconto
  }
}

const couponService = new CouponService();
```

2. **Criar Component**

```javascript
// js/components/CouponUI.js
class CouponUI {
  constructor() {
    this.vincularEventos();
  }

  vincularEventos() {
    // Eventos de UI
  }

  aplicarCupom() {
    // Lógica de aplicação
  }
}
```

3. **Integrar no HTML**

```html
<div class="cupom-container">
  <input type="text" id="input-cupom" placeholder="Código do cupom">
  <button id="btn-aplicar-cupom">Aplicar</button>
</div>
```

4. **Adicionar no app.js**

```javascript
// Importar e inicializar
const couponUI = new CouponUI();
```

### Como Integrar API Backend

**Exemplo: Substituir JSON por API**

1. **Atualizar ProductService**

```javascript
async carregarProdutos() {
  try {
    const response = await fetch('https://api.koalasports.com.br/produtos');
    if (!response.ok) throw new Error('Erro ao carregar');
    const data = await response.json();
    this.produtos = data.produtos;
    return this.produtos;
  } catch (error) {
    console.error('Erro:', error);
    return [];
  }
}
```

2. **Adicionar autenticação**

```javascript
async carregarProdutos() {
  const response = await fetch('https://api.koalasports.com.br/produtos', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  // ...
}
```

### Como Adicionar Analytics

**Google Analytics:**

```javascript
// No helpers.js, a função já está pronta
rastrearEvento('Categoria', 'Ação', 'Rótulo', valor);

// Exemplos de uso:
rastrearEvento('Produto', 'Visualizar', produto.nome, produto.precoAtual);
rastrearEvento('Carrinho', 'Adicionar', produto.nome, quantidade);
rastrearEvento('Checkout', 'Iniciar', '', valorTotal);
```

**Meta Pixel:**

```javascript
// Adicione no index.html
fbq('track', 'ViewContent', {
  content_name: produto.nome,
  content_ids: [produto.id],
  content_type: 'product',
  value: produto.precoAtual,
  currency: 'BRL'
});
```

### Como Adicionar Testes

**Exemplo com Jest:**

```javascript
// __tests__/ProductService.test.js
describe('ProductService', () => {
  test('deve carregar produtos', async () => {
    const produtos = await productService.carregarProdutos();
    expect(produtos).toBeInstanceOf(Array);
    expect(produtos.length).toBeGreaterThan(0);
  });

  test('deve buscar produto por ID', () => {
    const produto = productService.buscarPorId('flamengo-25-26');
    expect(produto).toBeDefined();
    expect(produto.nome).toBe('Flamengo 25-26');
  });

  test('deve calcular desconto corretamente', () => {
    const produto = {
      precoOriginal: 200,
      precoAtual: 180,
      promocao: true
    };
    const desconto = productService.calcularDesconto(produto);
    expect(desconto).toBe(10);
  });
});
```

---

## 🎨 Customização Visual

### Alterar Cores

Edite as variáveis CSS em `styles.css`:

```css
:root {
  --black: #0a0a0a;           /* Cor de fundo principal */
  --white: #ffffff;           /* Cor de texto principal */
  --accent-green: #00e676;    /* Cor de destaque (botões, badges) */
  --radius: 12px;             /* Raio de borda padrão */
  --font-display: 'Bebas Neue', sans-serif;  /* Fonte de títulos */
  --font-body: 'Outfit', sans-serif;         /* Fonte de corpo */
}
```

### Alterar Fontes

1. Escolha fontes no [Google Fonts](https://fonts.google.com/)
2. Adicione no `<head>` do `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=SuaFonte:wght@400;700&display=swap" rel="stylesheet">
```

3. Atualize as variáveis CSS:

```css
:root {
  --font-display: 'SuaFonte', sans-serif;
  --font-body: 'OutraFonte', sans-serif;
}
```

### Alterar Layout

**Grid de produtos:**

```css
.grid-produtos {
  display: flex;
  gap: 20px;  /* Espaçamento entre cards */
}

.card-produto {
  width: 280px;  /* Largura dos cards */
}
```

**Carrinho lateral:**

```css
.cart-sidebar {
  max-width: 450px;  /* Largura do carrinho */
}
```

---

## 📱 Responsividade

O sistema é totalmente responsivo. Breakpoints principais:

```css
/* Mobile */
@media (max-width: 768px) {
  /* Estilos mobile */
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  /* Estilos tablet */
}

/* Desktop */
@media (min-width: 1025px) {
  /* Estilos desktop */
}
```

---

## 🔒 Segurança

### Boas Práticas Implementadas

1. **Sanitização de HTML**
```javascript
function sanitizarHTML(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}
```

2. **Validação de Dados**
```javascript
// Sempre valide entrada do usuário
if (!email || !validarEmail(email)) {
  return false;
}
```

3. **HTTPS Obrigatório**
- Use sempre HTTPS em produção
- Certificado SSL gratuito: [Let's Encrypt](https://letsencrypt.org/)

4. **Proteção contra XSS**
- Nunca use `innerHTML` com dados do usuário
- Use `textContent` ou sanitize antes

---

## 🚀 Deploy

### Opções de Hospedagem

**1. Netlify (Recomendado para início)**
- Gratuito
- Deploy automático via Git
- HTTPS incluído
- CDN global

**2. Vercel**
- Gratuito
- Otimizado para performance
- Deploy instantâneo

**3. GitHub Pages**
- Gratuito
- Integrado com GitHub
- Simples de configurar

**4. Hospedagem Tradicional**
- Hostinger
- HostGator
- Locaweb

### Passos para Deploy

1. **Prepare os arquivos**
   - Minifique CSS e JS (opcional)
   - Otimize imagens
   - Teste localmente

2. **Configure domínio**
   - Registre domínio (ex: koalasports.com.br)
   - Configure DNS

3. **Faça upload**
   - Via FTP ou Git
   - Certifique-se de manter estrutura de pastas

4. **Configure HTTPS**
   - Ative certificado SSL
   - Force redirecionamento HTTP → HTTPS

5. **Teste em produção**
   - Teste todas as funcionalidades
   - Verifique em diferentes dispositivos
   - Teste velocidade de carregamento

---

## 📊 Monitoramento

### Métricas Importantes

**Performance:**
- Tempo de carregamento
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)

**Conversão:**
- Taxa de adição ao carrinho
- Taxa de abandono de carrinho
- Taxa de conversão
- Ticket médio

**Tráfego:**
- Visitantes únicos
- Pageviews
- Taxa de rejeição
- Tempo médio na página

### Ferramentas Recomendadas

- **Google Analytics**: Análise de tráfego
- **Google Search Console**: SEO e indexação
- **Hotjar**: Mapas de calor e gravações
- **PageSpeed Insights**: Performance
- **GTmetrix**: Análise técnica

---

## 💡 Dicas de Otimização

### Performance

1. **Otimize imagens**
   - Use WebP quando possível
   - Comprima imagens (TinyPNG, ImageOptim)
   - Use lazy loading

2. **Minifique código**
   - CSS: cssnano
   - JavaScript: Terser
   - HTML: html-minifier

3. **Use CDN**
   - Cloudflare (gratuito)
   - Distribui conteúdo globalmente

### SEO

1. **Conteúdo de qualidade**
   - Descrições únicas para cada produto
   - Textos relevantes e informativos

2. **URLs amigáveis**
   - Use slugs descritivos
   - Evite IDs numéricos

3. **Meta tags completas**
   - Title único por página
   - Description atrativa
   - Open Graph para redes sociais

### Conversão

1. **Fotos de qualidade**
   - Múltiplos ângulos
   - Alta resolução
   - Fundo neutro

2. **Descrições persuasivas**
   - Benefícios claros
   - Especificações técnicas
   - Call-to-action forte

3. **Prova social**
   - Avaliações reais
   - Depoimentos
   - Selos de confiança

---

## 🆘 Suporte

### Problemas Comuns

**Produtos não aparecem:**
- Verifique `produtos.json`
- Abra Console (F12) e veja erros
- Certifique-se de usar servidor web

**Carrinho não funciona:**
- Verifique LocalStorage do navegador
- Limpe cache
- Teste em modo anônimo

**Imagens quebradas:**
- Verifique nomes das pastas
- Confirme extensões (.png ou .jpg)
- Veja Console para erros 404

### Contato

- **WhatsApp**: (85) 99654-3820
- **Email**: contato@koalasports.com.br
- **Instagram**: @Koalasports085

---

**Desenvolvido com ❤️ para a Koala Sports**
