# 🎨 Estrutura Visual - Koala Sports

Documentação visual da arquitetura e fluxo do sistema.

---

## 📐 Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                         USUÁRIO                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      INDEX.HTML                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Header (Logo, Nav, Carrinho, Menu Mobile)           │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  Hero (Banner Principal)                             │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  Categorias (Nacional, Internacional, Seleções)      │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  Banner Promocional                                  │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  Grid de Produtos (Cards)                            │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  Propagandas                                         │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  Sobre                                               │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  Footer                                              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    COMPONENTES                               │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  ProductCard │  │ ModalProduto │  │   CartUI     │     │
│  │              │  │              │  │              │     │
│  │ - Badges     │  │ - Galeria    │  │ - Lista      │     │
│  │ - Preços     │  │ - Detalhes   │  │ - Totais     │     │
│  │ - Avaliação  │  │ - Tamanhos   │  │ - Finalizar  │     │
│  │ - Botão      │  │ - Adicionar  │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     SERVICES                                 │
│                                                              │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │ ProductService   │         │   CartService    │         │
│  │                  │         │                  │         │
│  │ - Carregar       │         │ - Adicionar      │         │
│  │ - Buscar         │         │ - Remover        │         │
│  │ - Filtrar        │         │ - Atualizar      │         │
│  │ - Pesquisar      │         │ - Calcular       │         │
│  │ - Estoque        │         │ - Persistir      │         │
│  └──────────────────┘         └──────────────────┘         │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                       DADOS                                  │
│                                                              │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │  produtos.json   │         │  LocalStorage    │         │
│  │                  │         │                  │         │
│  │ - 22 produtos    │         │ - Carrinho       │         │
│  │ - Estrutura      │         │ - Persistência   │         │
│  │   completa       │         │                  │         │
│  └──────────────────┘         └──────────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Fluxo de Dados

### Carregamento Inicial

```
Usuário acessa site
        │
        ▼
app.js inicializa
        │
        ▼
ProductService.carregarProdutos()
        │
        ▼
Fetch produtos.json
        │
        ▼
Renderiza ProductCards
        │
        ▼
Inicializa CartUI
        │
        ▼
Carrega carrinho do LocalStorage
        │
        ▼
Site pronto!
```

### Adicionar ao Carrinho

```
Usuário clica em produto
        │
        ▼
ModalProduto.abrir(id)
        │
        ▼
Busca produto no ProductService
        │
        ▼
Renderiza modal com dados
        │
        ▼
Usuário seleciona tamanho
        │
        ▼
Usuário clica "Adicionar"
        │
        ▼
CartService.adicionarProduto()
        │
        ├─► Verifica estoque
        │   │
        │   ├─► Estoque OK
        │   │   │
        │   │   ▼
        │   │   Adiciona ao carrinho
        │   │   │
        │   │   ▼
        │   │   Salva no LocalStorage
        │   │   │
        │   │   ▼
        │   │   Notifica listeners
        │   │   │
        │   │   ▼
        │   │   CartUI atualiza
        │   │   │
        │   │   ▼
        │   │   Toast de sucesso
        │   │   │
        │   │   ▼
        │   │   Abre carrinho
        │   │
        │   └─► Estoque insuficiente
        │       │
        │       ▼
        │       Toast de erro
        │
        ▼
Fim
```

### Finalizar Pedido

```
Usuário no carrinho
        │
        ▼
Clica "Finalizar no WhatsApp"
        │
        ▼
CartService.gerarMensagemWhatsApp()
        │
        ├─► Itera sobre itens
        │   │
        │   ▼
        │   Formata cada produto
        │   │
        │   ▼
        │   Calcula totais
        │   │
        │   ▼
        │   Gera mensagem completa
        │
        ▼
Abre WhatsApp com mensagem
        │
        ▼
Usuário envia para loja
        │
        ▼
Fim
```

---

## 🎨 Estrutura de Componentes

### ProductCard

```
┌─────────────────────────────────┐
│  ┌─────────┐  ┌──────────────┐ │
│  │ Badge   │  │ Badge Promo  │ │
│  │ Pronta  │  │    -18%      │ │
│  └─────────┘  └──────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │                           │ │
│  │       IMAGEM              │ │
│  │                           │ │
│  │     [Ver Detalhes]        │ │
│  └───────────────────────────┘ │
│                                 │
│  ★★★★☆ 4.8 (312)              │
│                                 │
│  Flamengo 25-26                │
│                                 │
│  R$ 200,00                     │
│  R$ 180,00                     │
│                                 │
│  ┌───────────────────────────┐ │
│  │    Compre Agora           │ │
│  └───────────────────────────┘ │
└─────────────────────────────────┘
```

### Modal de Produto

```
┌─────────────────────────────────────────────────────────┐
│  [X]                                                     │
│  ┌──────────────────────┐  ┌──────────────────────┐   │
│  │  [thumb] [thumb]     │  │  Flamengo 25-26      │   │
│  │  [thumb] [thumb]     │  │                      │   │
│  │                      │  │  ★★★★☆ 4.8 (312)    │   │
│  │  ┌────────────────┐ │  │                      │   │
│  │  │                │ │  │  R$ 200,00           │   │
│  │  │  IMAGEM        │ │  │  R$ 180,00  [-18%]   │   │
│  │  │  PRINCIPAL     │ │  │                      │   │
│  │  │                │ │  │  Descrição completa  │   │
│  │  └────────────────┘ │  │  do produto...       │   │
│  │                      │  │                      │   │
│  └──────────────────────┘  │  Tamanho:            │   │
│                             │  [P] [M] [G] [GG]    │   │
│                             │                      │   │
│                             │  Personalização:     │   │
│                             │  [Não] [Sim]         │   │
│                             │                      │   │
│                             │  Material: Poliéster │   │
│                             │  Tecnologia: Dry-Fit │   │
│                             │                      │   │
│                             │  ┌────────────────┐  │   │
│                             │  │ Adicionar ao   │  │   │
│                             │  │    Carrinho    │  │   │
│                             │  └────────────────┘  │   │
│                             └──────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Carrinho Lateral

```
┌─────────────────────────────────┐
│  Meu Carrinho              [X]  │
├─────────────────────────────────┤
│                                 │
│  ┌───────────────────────────┐ │
│  │ [img] Flamengo 25-26      │ │
│  │       Tamanho: M          │ │
│  │       R$ 180,00           │ │
│  │       [-] 2 [+]           │ │
│  │       Subtotal: R$ 360,00 │ │
│  │                      [🗑] │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ [img] Barcelona 25-26     │ │
│  │       Tamanho: G          │ │
│  │       R$ 180,00           │ │
│  │       [-] 1 [+]           │ │
│  │       Subtotal: R$ 180,00 │ │
│  │                      [🗑] │ │
│  └───────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│  Subtotal (3 itens):            │
│  R$ 540,00                      │
│                                 │
│  🎁 Leve 3 Pague 2!            │
│                                 │
│  ┌───────────────────────────┐ │
│  │ Finalizar no WhatsApp     │ │
│  └───────────────────────────┘ │
│                                 │
│  [Limpar Carrinho]              │
└─────────────────────────────────┘
```

---

## 📱 Responsividade

### Desktop (> 1024px)

```
┌─────────────────────────────────────────────────────────┐
│  [Logo]              [Nav Links]         [🛒] [☰]      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    HERO BANNER                          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [Categoria 1]  [Categoria 2]  [Categoria 3]          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [Card] [Card] [Card] [Card] [Card] [Card] [Card]     │
│  [Card] [Card] [Card] [Card] [Card] [Card] [Card]     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Tablet (768px - 1024px)

```
┌───────────────────────────────────────┐
│  [Logo]         [Nav]      [🛒] [☰]  │
├───────────────────────────────────────┤
│                                       │
│           HERO BANNER                 │
│                                       │
├───────────────────────────────────────┤
│                                       │
│  [Categoria 1]  [Categoria 2]        │
│  [Categoria 3]                        │
│                                       │
├───────────────────────────────────────┤
│                                       │
│  [Card] [Card] [Card]                │
│  [Card] [Card] [Card]                │
│                                       │
└───────────────────────────────────────┘
```

### Mobile (< 768px)

```
┌─────────────────────────┐
│  [Logo]      [🛒] [☰]  │
├─────────────────────────┤
│                         │
│     HERO BANNER         │
│                         │
├─────────────────────────┤
│                         │
│  [Categoria 1]          │
│  [Categoria 2]          │
│  [Categoria 3]          │
│                         │
├─────────────────────────┤
│                         │
│  [Card]                 │
│  [Card]                 │
│  [Card]                 │
│                         │
└─────────────────────────┘
```

---

## 🎯 Estados da Interface

### Loading (Skeleton)

```
┌─────────────────────────────────┐
│  ┌───────────────────────────┐ │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │
│  └───────────────────────────┘ │
│  ▓▓▓▓▓▓▓▓▓▓▓▓                  │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓         │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓                │
│  ┌───────────────────────────┐ │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │
│  └───────────────────────────┘ │
└─────────────────────────────────┘
```

### Vazio

```
┌─────────────────────────────────┐
│                                 │
│         🛒                      │
│                                 │
│   Seu carrinho está vazio       │
│                                 │
│  ┌───────────────────────────┐ │
│  │  Continuar comprando      │ │
│  └───────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

### Erro

```
┌─────────────────────────────────┐
│                                 │
│         ❌                      │
│                                 │
│   Erro ao carregar produtos     │
│                                 │
│  ┌───────────────────────────┐ │
│  │   Tentar novamente        │ │
│  └───────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

### Toast Notification

```
┌─────────────────────────────────┐
│  ✅ Produto adicionado!         │
└─────────────────────────────────┘
```

---

## 🔐 Fluxo de Segurança

```
Entrada do Usuário
        │
        ▼
Validação no Frontend
        │
        ├─► Válido
        │   │
        │   ▼
        │   Sanitização
        │   │
        │   ▼
        │   Processamento
        │   │
        │   ▼
        │   Armazenamento
        │
        └─► Inválido
            │
            ▼
            Mensagem de Erro
            │
            ▼
            Retorna ao Usuário
```

---

## 📊 Métricas de Performance

### Carregamento

```
0ms ────────────────────────────────────────────────────► 3000ms
│         │           │              │                │
│         │           │              │                │
HTML    CSS         JS           Produtos        Imagens
100ms   200ms      500ms          800ms          1500ms
```

### Interações

```
Clique no Produto
        │
        ▼ (< 100ms)
Modal Abre
        │
        ▼ (< 50ms)
Imagens Carregam
        │
        ▼ (< 200ms)
Totalmente Interativo
```

---

**Desenvolvido com ❤️ para a Koala Sports**
