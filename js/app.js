/**
 * app.js
 * Arquivo principal da aplicação Koala Sports
 * Gerencia inicialização e coordenação de componentes
 */

class KoalaSportsApp {
  constructor() {
    this.produtosCarregados = [];
    this.filtroAtual = 'todos';
    this.termoPesquisa = '';
    this.init();
  }

  /**
   * Inicializa a aplicação
   */
  async init() {
    try {
      // Mostra loading
      this.mostrarLoading();

      // Carrega produtos
      this.produtosCarregados = await productService.carregarProdutos();

      // Renderiza todos os carrosséis
      this.renderizarCarroseis();

      // Inicializa componentes
      this.inicializarComponentes();

      // Vincula eventos
      this.vincularEventos();

      // Verifica produto na URL
      this.verificarProdutoURL();

      // Remove loading
      this.esconderLoading();

      // Inicializa lazy loading
      inicializarLazyLoading();

      console.log('✅ Koala Sports inicializado com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao inicializar aplicação:', error);
      this.mostrarErro('Erro ao carregar produtos. Tente novamente.');
    }
  }

  /**
   * Inicializa componentes da aplicação
   */
  inicializarComponentes() {
    // Scroll suave para links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        if (target !== '#') {
          scrollParaElemento(target, 80);
        }
      });
    });

    // Header fixo com sombra ao scroll
    this.inicializarHeaderScroll();

    // Botão WhatsApp flutuante
    this.inicializarBotaoWhatsApp();

    // Menu mobile
    this.inicializarMenuMobile();
  }

  /**
   * Vincula eventos da aplicação
   */
  vincularEventos() {
    // Pesquisa com debounce
    const inputPesquisa = document.getElementById('inputPesquisa');
    if (inputPesquisa) {
      inputPesquisa.addEventListener('input', debounce((e) => {
        this.pesquisarProdutos(e.target.value);
      }, 300));
    }

    // Botões de filtro
    document.querySelectorAll('.btn-filtro').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const categoria = e.target.dataset.categoria || 'todos';
        this.filtrarProdutos(categoria);
      });
    });

    // Scroll dos carrosséis
    document.querySelectorAll('.btn-scroll').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const carousel = e.target.dataset.carousel;
        const direction = e.target.dataset.direction;
        this.scrollCarrossel(carousel, direction);
      });
    });
  }

  /**
   * Renderiza produtos na grid
   * @param {Array} produtos - Lista de produtos
   * @param {string} gridId - ID da grid de destino
   */
  renderizarProdutos(produtos, gridId = 'grid-principal') {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    if (produtos.length === 0) {
      if (gridId === 'grid-principal') {
        grid.innerHTML = `
          <div class="sem-resultados">
            <p>😔 Nenhum produto encontrado</p>
            <button class="btn-primary" onclick="app.limparFiltros()">Ver todos os produtos</button>
          </div>
        `;
      }
      return;
    }

    grid.innerHTML = produtos.map(produto => ProductCard.criar(produto)).join('');

    // Atualiza título da seção apenas para grid principal
    if (gridId === 'grid-principal') {
      this.atualizarTituloSecao(produtos.length);
    }
  }

  /**
   * Renderiza todos os carrosséis
   */
  renderizarCarroseis() {
    // Embaralha produtos para o carrossel principal
    const produtosEmbaralhados = this.embaralharArray([...this.produtosCarregados]);
    this.renderizarProdutos(produtosEmbaralhados, 'grid-principal');

    // Carrossel de Times Nacionais
    const nacionais = productService.filtrarPorCategoria('nacional');
    this.renderizarProdutos(nacionais, 'grid-nacional');

    // Carrossel de Times Internacionais
    const internacionais = productService.filtrarPorCategoria('internacional');
    this.renderizarProdutos(internacionais, 'grid-internacional');
  }

  /**
   * Embaralha array (Fisher-Yates shuffle)
   * @param {Array} array - Array para embaralhar
   * @returns {Array} Array embaralhado
   */
  embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * Filtra produtos por categoria
   * @param {string} categoria - Categoria para filtrar
   */
  filtrarProdutos(categoria) {
    this.filtroAtual = categoria;
    
    // Atualiza botões ativos
    document.querySelectorAll('.btn-filtro').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.categoria === categoria) {
        btn.classList.add('active');
      }
    });

    // Filtra e renderiza apenas no grid principal
    const produtosFiltrados = productService.filtrarPorCategoria(categoria);
    this.renderizarProdutos(produtosFiltrados, 'grid-principal');

    // Scroll para produtos
    scrollParaElemento('#produtos', 80);

    // Rastreia filtro
    rastrearEvento('Filtro', 'Aplicar', categoria);
  }

  /**
   * Pesquisa produtos
   * @param {string} termo - Termo de pesquisa
   */
  pesquisarProdutos(termo) {
    this.termoPesquisa = termo;

    if (!termo.trim()) {
      this.filtrarProdutos(this.filtroAtual);
      return;
    }

    const produtosEncontrados = productService.pesquisar(termo);
    this.renderizarProdutos(produtosEncontrados, 'grid-principal');

    // Rastreia pesquisa
    rastrearEvento('Pesquisa', 'Buscar', termo);
  }

  /**
   * Limpa todos os filtros
   */
  limparFiltros() {
    this.filtroAtual = 'todos';
    this.termoPesquisa = '';
    
    const inputPesquisa = document.getElementById('inputPesquisa');
    if (inputPesquisa) inputPesquisa.value = '';

    this.filtrarProdutos('todos');
  }

  /**
   * Scroll do carrossel de produtos
   * @param {string} carousel - ID do carrossel
   * @param {string} direction - 'left' ou 'right'
   */
  scrollCarrossel(carousel, direction) {
    const container = document.getElementById(`carousel-${carousel}`);
    if (!container) return;

    const scrollAmount = direction === 'left' ? -330 : 330;
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  /**
   * Atualiza título da seção de produtos
   * @param {number} quantidade - Quantidade de produtos
   */
  atualizarTituloSecao(quantidade) {
    const titulo = document.getElementById('titulo-secao-produtos');
    if (!titulo) return;

    if (this.termoPesquisa) {
      titulo.textContent = `Resultados para "${this.termoPesquisa}" (${quantidade})`;
    } else if (this.filtroAtual !== 'todos') {
      titulo.textContent = `${this.getNomeFiltro(this.filtroAtual)} (${quantidade})`;
    } else {
      titulo.textContent = 'Nossa Loja';
    }
  }

  /**
   * Obtém nome amigável do filtro
   * @param {string} filtro - ID do filtro
   * @returns {string} Nome do filtro
   */
  getNomeFiltro(filtro) {
    const nomes = {
      'todos': 'Todos os Produtos',
      'nacional': 'Times Nacionais',
      'internacional': 'Times Internacionais',
      'selecao': 'Seleções',
      'retro': 'Camisas Retrô',
      'lançamento': 'Lançamentos',
      'pronta-entrega': 'Pronta Entrega',
      'feminino': 'Feminino',
      'infantil': 'Infantil'
    };
    return nomes[filtro] || filtro;
  }

  /**
   * Verifica se há produto na URL e abre modal
   */
  verificarProdutoURL() {
    const produtoSlug = obterParametroURL('produto');
    if (produtoSlug) {
      const produto = productService.buscarPorSlug(produtoSlug);
      if (produto && window.modalProduto) {
        setTimeout(() => {
          window.modalProduto.abrir(produto.id);
        }, 500);
      }
    }
  }

  /**
   * Inicializa comportamento do header ao scroll
   */
  inicializarHeaderScroll() {
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    if (!header) return;

    window.addEventListener('scroll', throttle(() => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }, 100));
  }

  /**
   * Inicializa botão WhatsApp flutuante
   */
  inicializarBotaoWhatsApp() {
    const btnWhatsApp = document.getElementById('btn-whatsapp-float');
    if (!btnWhatsApp) return;

    // Mostra após scroll
    window.addEventListener('scroll', throttle(() => {
      if (window.pageYOffset > 300) {
        btnWhatsApp.classList.add('visible');
      } else {
        btnWhatsApp.classList.remove('visible');
      }
    }, 100));

    // Clique no botão
    btnWhatsApp.addEventListener('click', () => {
      const mensagem = '👋 Olá! Vim do site da Koala Sports e gostaria de mais informações.';
      const url = `https://wa.me/5585996543820?text=${encodeURIComponent(mensagem)}`;
      window.open(url, '_blank');
      
      rastrearEvento('WhatsApp', 'Clique', 'Botão Flutuante');
    });
  }

  /**
   * Inicializa menu mobile
   */
  inicializarMenuMobile() {
    const btnMenu = document.getElementById('btn-menu-mobile');
    const nav = document.querySelector('.nav');
    
    if (!btnMenu || !nav) return;

    btnMenu.addEventListener('click', () => {
      nav.classList.toggle('active');
      btnMenu.classList.toggle('active');
    });

    // Fecha ao clicar em link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        btnMenu.classList.remove('active');
      });
    });
  }

  /**
   * Mostra loading
   */
  mostrarLoading() {
    const grid = document.getElementById('grid-principal');
    if (!grid) return;

    grid.innerHTML = Array(8).fill(ProductCard.criarSkeleton()).join('');
  }

  /**
   * Esconde loading
   */
  esconderLoading() {
    // Implementação futura se necessário
  }

  /**
   * Mostra mensagem de erro
   * @param {string} mensagem - Mensagem de erro
   */
  mostrarErro(mensagem) {
    const grid = document.getElementById('grid-principal');
    if (!grid) return;

    grid.innerHTML = `
      <div class="erro-carregamento">
        <p>❌ ${mensagem}</p>
        <button class="btn-primary" onclick="location.reload()">Tentar novamente</button>
      </div>
    `;
  }
}

// Inicializa aplicação quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.app = new KoalaSportsApp();
});

// Funções globais para compatibilidade
window.filtrarPorBanco = (categoria) => {
  if (window.app) {
    window.app.filtrarProdutos(categoria);
  }
};

window.scrollCarrossel = (direcao) => {
  if (window.app) {
    window.app.scrollCarrossel(direcao);
  }
};
