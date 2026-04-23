# 🐨 Koala Sports - E-commerce Profissional

Sistema completo de e-commerce para venda de camisas de time, desenvolvido com arquitetura escalável e preparado para alto volume de vendas.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Documentação Técnica](#documentação-técnica)
- [Roadmap Futuro](#roadmap-futuro)

---

## 🎯 Visão Geral

A Koala Sports é uma loja online especializada em camisas de time com qualidade tailandesa 1:1. O sistema foi desenvolvido com foco em:

- **Performance**: Lazy loading, debounce, skeleton loading
- **Escalabilidade**: Arquitetura modular e preparada para APIs
- **Conversão**: UX otimizada, carrinho inteligente, checkout simplificado
- **SEO**: Meta tags, Open Graph, Structured Data
- **Analytics**: Preparado para Google Analytics e Meta Pixel

---

## 📁 Estrutura do Projeto

```
koala-sports/
├── index.html                 # Página principal
├── styles.css                 # Estilos globais
├── produtos.json              # Banco de dados de produtos
│
├── js/
│   ├── app.js                 # Aplicação principal
│   ├── services/
│   │   ├── ProductService.js  # Gerenciamento de produtos
│   │   └── CartService.js     # Gerenciamento do carrinho
│   ├── components/
│   │   ├── ProductCard.js     # Componente de card de produto
│   │   ├── ModalProduto.js    # Modal de detalhes do produto
│   │   └── CartUI.js          # Interface do carrinho
│   └── utils/
│       └── helpers.js         # Funções utilitárias
│
├── pages/
│   ├── politica-troca.html
│   ├── politica-privacidade.html
│   ├── termos-uso.html
│   ├── prazos-entrega.html
│   └── garantia.html
│
└── images/
    └── [pastas de produtos]
```

---

## ✨ Funcionalidades Implementadas

### 1. ✅ Arquitetura Profissional

- **Separação de responsabilidades**: Services, Components, Utils
- **Banco de dados JSON externo**: `produtos.json` com estrutura completa
- **Camada de serviço**: `ProductService` para gerenciar produtos
- **Preparado para API**: Estrutura pronta para integração backend

### 2. ✅ Sistema de Carrinho Completo

- **Carrinho lateral (sidebar)**: Interface moderna e intuitiva
- **Adicionar múltiplos produtos**: Suporte a vários itens
- **Controle de quantidade**: Aumentar/diminuir com validação de estoque
- **Remover produtos**: Com confirmação
- **Cálculo automático**: Subtotal e quantidade total
- **Persistência**: LocalStorage para manter carrinho entre sessões
- **Finalização WhatsApp**: Mensagem formatada com todos os itens

### 3. ✅ Controle de Estoque Real

```javascript
estoque: {
  P: 5,
  M: 8,
  G: 3,
  GG: 2
}
```

- **Validação de estoque**: Impede adicionar mais que disponível
- **Tamanhos desabilitados**: Quando estoque = 0
- **Badge "Últimas unidades"**: Quando estoque ≤ 2
- **Badge "Esgotado"**: Para tamanhos sem estoque

### 4. ✅ Sistema de Promoções Dinâmico

```javascript
{
  precoOriginal: 220.00,
  precoAtual: 180.00,
  promocao: true
}
```

- **Preço riscado**: Exibe preço original
- **Desconto percentual**: Calculado automaticamente
- **Badge de desconto**: Visual destacado nos cards
- **Promoção "Leve 3 Pague 2"**: Exibida no carrinho

### 5. ✅ SEO Profissional

**Meta Tags Implementadas:**
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta name="twitter:card" content="...">
```

**Structured Data (Schema.org):**
```json
{
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Koala Sports",
  ...
}
```

**URLs Amigáveis:**
- Preparado para `/produto/nome-do-produto`
- Parâmetros de URL para compartilhamento

### 6. ✅ Modal de Produto Profissional

- **Galeria de imagens**: Miniaturas clicáveis
- **Informações completas**: Descrição, avaliações, especificações
- **Seleção de tamanho**: Com controle de estoque
- **Personalização**: Opção de adicionar nome/número
- **Adicionar ao carrinho**: Com feedback visual
- **SEO dinâmico**: Atualiza meta tags ao abrir produto

### 7. ✅ Sistema de Avaliações

```javascript
{
  avaliacao: 4.8,
  totalAvaliacoes: 312
}
```

- **Estrelas visuais**: Completas, meia e vazias
- **Número de avaliações**: Exibido nos cards e modal
- **Preparado para comentários**: Estrutura para reviews futuros

### 8. ✅ Performance Otimizada

**Implementações:**
- ✅ Lazy loading de imagens
- ✅ Debounce na pesquisa (300ms)
- ✅ Throttle no scroll (100ms)
- ✅ Skeleton loading nos cards
- ✅ Carregamento assíncrono de produtos
- ✅ Cache de produtos no service

**Preparado para:**
- 🔄 Conversão de imagens para WebP
- 🔄 Minificação de CSS/JS
- 🔄 CDN para assets estáticos

### 9. ✅ UX Profissional

**Implementado:**
- ✅ Header fixo com sombra ao scroll
- ✅ Menu hambúrguer no mobile
- ✅ Botão WhatsApp flutuante
- ✅ Botão carrinho com badge de quantidade
- ✅ Toast notifications para feedback
- ✅ Animações suaves (CSS transitions)
- ✅ Skeleton loading
- ✅ Estados vazios e de erro

**Interações:**
- Scroll suave para seções
- Feedback visual ao adicionar produto
- Confirmação ao remover item
- Loading states em todas as ações

### 10. ✅ Páginas Institucionais

Criadas:
- ✅ Política de Troca
- ✅ Política de Privacidade
- 🔄 Termos de Uso (estrutura pronta)
- 🔄 Prazos de Entrega (estrutura pronta)
- 🔄 Garantia (estrutura pronta)

### 11. 🔄 Preparação para Checkout

**Estrutura preparada para:**
- PIX automático
- Cartão de crédito
- Mercado Pago
- Stripe
- PagSeguro

**Arquivos prontos para integração:**
- `js/services/PaymentService.js` (criar)
- `js/services/CheckoutService.js` (criar)

### 12. 🔄 Marketing e Rastreamento

**Funções implementadas em `helpers.js`:**

```javascript
rastrearEvento(categoria, acao, rotulo, valor)
rastrearVisualizacaoProduto(produto)
rastrearAdicaoCarrinho(produto, quantidade)
rastrearInicioCheckout(valor)
```

**Preparado para:**
- Google Analytics 4
- Meta Pixel (Facebook/Instagram)
- Google Tag Manager
- Eventos de conversão

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Semântico e acessível
- **CSS3**: Variáveis CSS, Grid, Flexbox, Animations
- **JavaScript ES6+**: Classes, Async/Await, Modules
- **JSON**: Banco de dados de produtos
- **LocalStorage**: Persistência do carrinho
- **Fetch API**: Carregamento de dados
- **IntersectionObserver**: Lazy loading

---

## 🚀 Instalação

### Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional para desenvolvimento)

### Passos

1. **Clone ou baixe o projeto**
```bash
git clone https://github.com/seu-usuario/koala-sports.git
cd koala-sports
```

2. **Abra o projeto**
   - Opção 1: Abra `index.html` diretamente no navegador
   - Opção 2: Use um servidor local:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js (http-server)
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```

3. **Acesse no navegador**
```
http://localhost:8000
```

---

## 📚 Documentação Técnica

### ProductService

Gerencia todas as operações relacionadas a produtos.

**Métodos principais:**
```javascript
await carregarProdutos()              // Carrega produtos do JSON
buscarPorId(id)                       // Busca produto por ID
buscarPorSlug(slug)                   // Busca produto por slug
filtrarPorCategoria(categoria)        // Filtra por categoria
pesquisar(termo)                      // Pesquisa por termo
verificarEstoque(id, tamanho)         // Verifica estoque disponível
tamanhoDisponivel(id, tamanho)        // Verifica se tamanho está disponível
ultimasUnidades(id, tamanho)          // Verifica se é última unidade
calcularDesconto(produto)             // Calcula desconto percentual
buscarRelacionados(id, limite)        // Busca produtos relacionados
```

### CartService

Gerencia o carrinho de compras com persistência.

**Métodos principais:**
```javascript
adicionarProduto(produto, tamanho, personalizado, quantidade)
removerProduto(id, tamanho, personalizado)
atualizarQuantidade(id, tamanho, personalizado, novaQuantidade)
limparCarrinho()
obterItens()
calcularSubtotal()
calcularQuantidadeTotal()
gerarMensagemWhatsApp()
```

**Eventos:**
- `item-adicionado`
- `item-removido`
- `quantidade-atualizada`
- `estoque-insuficiente`
- `carrinho-limpo`

### ProductCard

Componente para renderização de cards de produtos.

**Métodos estáticos:**
```javascript
ProductCard.criar(produto)            // Cria HTML do card
ProductCard.criarBadges(produto)      // Cria badges
ProductCard.criarPrecos(produto)      // Cria HTML de preços
ProductCard.criarEstrelas(avaliacao)  // Cria estrelas de avaliação
ProductCard.criarSkeleton()           // Cria skeleton loading
```

### ModalProduto

Gerencia o modal de detalhes do produto.

**Métodos principais:**
```javascript
abrir(produtoId)                      // Abre modal com produto
fechar()                              // Fecha modal
adicionarAoCarrinho()                 // Adiciona produto ao carrinho
atualizarSEO(produto)                 // Atualiza meta tags
```

### CartUI

Interface do carrinho lateral.

**Métodos principais:**
```javascript
abrirCarrinho()                       // Abre sidebar do carrinho
fecharCarrinho()                      // Fecha sidebar
finalizarPedido()                     // Finaliza via WhatsApp
limparCarrinho()                      // Limpa todos os itens
mostrarToast(mensagem, tipo)          // Exibe notificação
```

### Helpers (Utilitários)

Funções auxiliares para toda a aplicação.

**Principais funções:**
```javascript
debounce(func, wait)                  // Atrasa execução
throttle(func, limit)                 // Limita execuções
formatarPreco(valor)                  // Formata preço
gerarSlug(texto)                      // Gera slug
scrollParaElemento(seletor)           // Scroll suave
inicializarLazyLoading()              // Lazy loading de imagens
rastrearEvento(categoria, acao)       // Rastreamento analytics
```

---

## 🎨 Customização

### Cores

Edite as variáveis CSS em `styles.css`:

```css
:root {
  --black: #0a0a0a;
  --white: #ffffff;
  --accent-green: #00e676;
  --radius: 12px;
}
```

### Número do WhatsApp

Altere em `js/components/CartUI.js` e `js/app.js`:

```javascript
this.WA_NUMERO = '5585996543820';
```

### Produtos

Edite `produtos.json` para adicionar/remover produtos:

```json
{
  "id": "produto-id",
  "nome": "Nome do Produto",
  "slug": "produto-slug",
  "descricao": "Descrição completa",
  "precoOriginal": 220.00,
  "precoAtual": 180.00,
  "promocao": true,
  "categorias": ["categoria1", "categoria2"],
  "tamanhos": ["P", "M", "G", "GG"],
  "estoque": {
    "P": 5,
    "M": 8,
    "G": 3,
    "GG": 2
  },
  "pasta": "Nome da Pasta",
  "avaliacao": 4.8,
  "totalAvaliacoes": 127
}
```

---

## 🔮 Roadmap Futuro

### Fase 1 - Backend (Próximos passos)
- [ ] API REST com Node.js/Express
- [ ] Banco de dados PostgreSQL/MongoDB
- [ ] Autenticação de usuários
- [ ] Painel administrativo
- [ ] Gerenciamento de estoque em tempo real

### Fase 2 - Pagamentos
- [ ] Integração Mercado Pago
- [ ] Integração Stripe
- [ ] PIX automático
- [ ] Cartão de crédito
- [ ] Boleto bancário

### Fase 3 - Funcionalidades Avançadas
- [ ] Sistema de cupons de desconto
- [ ] Programa de fidelidade
- [ ] Wishlist (lista de desejos)
- [ ] Comparador de produtos
- [ ] Recomendações personalizadas
- [ ] Chat ao vivo

### Fase 4 - Marketing
- [ ] Email marketing automatizado
- [ ] Recuperação de carrinho abandonado
- [ ] Programa de afiliados
- [ ] Blog integrado
- [ ] Reviews e comentários reais

### Fase 5 - Mobile
- [ ] Progressive Web App (PWA)
- [ ] App nativo (React Native)
- [ ] Push notifications
- [ ] Modo offline

---

## 📊 Analytics e Conversão

### Eventos Rastreados

**Visualização de Produto:**
```javascript
rastrearVisualizacaoProduto(produto);
```

**Adição ao Carrinho:**
```javascript
rastrearAdicaoCarrinho(produto, quantidade);
```

**Início de Checkout:**
```javascript
rastrearInicioCheckout(valorTotal);
```

**Filtros e Pesquisa:**
```javascript
rastrearEvento('Filtro', 'Aplicar', categoria);
rastrearEvento('Pesquisa', 'Buscar', termo);
```

### Integração Google Analytics

Adicione no `<head>` do `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Integração Meta Pixel

Adicione no `<head>` do `index.html`:

```html
<!-- Meta Pixel -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

---

## 🐛 Troubleshooting

### Produtos não carregam

1. Verifique se `produtos.json` está no diretório raiz
2. Abra o Console do navegador (F12) e verifique erros
3. Certifique-se de estar usando um servidor web (não `file://`)

### Imagens não aparecem

1. Verifique se as pastas em `images/` correspondem ao campo `pasta` em `produtos.json`
2. Certifique-se de que as imagens estão nomeadas como `1.png`, `2.png`, etc.
3. O sistema tenta `.png` primeiro, depois `.jpg` como fallback

### Carrinho não persiste

1. Verifique se o navegador permite LocalStorage
2. Modo anônimo pode bloquear LocalStorage
3. Limpe o cache e tente novamente

---

## 📄 Licença

Este projeto é proprietário da Koala Sports. Todos os direitos reservados.

---

## 👥 Suporte

Para suporte técnico ou dúvidas:

- **WhatsApp**: (85) 99654-3820
- **Email**: contato@koalasports.com.br
- **Instagram**: [@Koalasports085](https://instagram.com/Koalasports085)

---

## 🎉 Conclusão

O sistema Koala Sports foi desenvolvido com foco em:

✅ **Profissionalismo**: Código limpo, modular e documentado
✅ **Escalabilidade**: Preparado para crescimento
✅ **Performance**: Otimizado para velocidade
✅ **Conversão**: UX focada em vendas
✅ **SEO**: Otimizado para buscadores
✅ **Manutenibilidade**: Fácil de atualizar e expandir

**Pronto para receber tráfego pago e converter visitantes em clientes!** 🚀
