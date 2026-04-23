/**
 * ProductService.js
 * Camada de serviço para gerenciamento de produtos
 * Responsável por carregar, filtrar e manipular dados de produtos
 */

class ProductService {
  constructor() {
    this.produtos = [];
    this.produtosCache = null;
  }

  /**
   * Carrega produtos do arquivo JSON
   * @returns {Promise<Array>} Lista de produtos
   */
  async carregarProdutos() {
    if (this.produtosCache) {
      return this.produtosCache;
    }

    try {
      const response = await fetch('produtos.json');
      if (!response.ok) {
        throw new Error('Erro ao carregar produtos');
      }
      const data = await response.json();
      this.produtos = data.produtos;
      this.produtosCache = this.produtos;
      return this.produtos;
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      return [];
    }
  }

  /**
   * Busca produto por ID
   * @param {string} id - ID do produto
   * @returns {Object|null} Produto encontrado ou null
   */
  buscarPorId(id) {
    return this.produtos.find(p => p.id === id) || null;
  }

  /**
   * Busca produto por slug
   * @param {string} slug - Slug do produto
   * @returns {Object|null} Produto encontrado ou null
   */
  buscarPorSlug(slug) {
    return this.produtos.find(p => p.slug === slug) || null;
  }

  /**
   * Filtra produtos por categoria
   * @param {string} categoria - Categoria para filtrar
   * @returns {Array} Produtos filtrados
   */
  filtrarPorCategoria(categoria) {
    if (categoria === 'todos') {
      return this.produtos;
    }
    return this.produtos.filter(p => p.categorias.includes(categoria));
  }

  /**
   * Pesquisa produtos por termo
   * @param {string} termo - Termo de pesquisa
   * @returns {Array} Produtos encontrados
   */
  pesquisar(termo) {
    const termoLower = termo.toLowerCase();
    return this.produtos.filter(p => 
      p.nome.toLowerCase().includes(termoLower) ||
      p.descricao.toLowerCase().includes(termoLower)
    );
  }

  /**
   * Verifica disponibilidade de estoque
   * @param {string} id - ID do produto
   * @param {string} tamanho - Tamanho desejado
   * @returns {number} Quantidade em estoque
   */
  verificarEstoque(id, tamanho) {
    const produto = this.buscarPorId(id);
    if (!produto || !produto.estoque) {
      return 0;
    }
    return produto.estoque[tamanho] || 0;
  }

  /**
   * Verifica se tamanho está disponível
   * @param {string} id - ID do produto
   * @param {string} tamanho - Tamanho desejado
   * @returns {boolean} True se disponível
   */
  tamanhoDisponivel(id, tamanho) {
    return this.verificarEstoque(id, tamanho) > 0;
  }

  /**
   * Verifica se é última unidade
   * @param {string} id - ID do produto
   * @param {string} tamanho - Tamanho desejado
   * @returns {boolean} True se estoque <= 2
   */
  ultimasUnidades(id, tamanho) {
    const estoque = this.verificarEstoque(id, tamanho);
    return estoque > 0 && estoque <= 2;
  }

  /**
   * Calcula desconto percentual
   * @param {Object} produto - Objeto do produto
   * @returns {number} Percentual de desconto
   */
  calcularDesconto(produto) {
    if (!produto.promocao || !produto.precoOriginal) {
      return 0;
    }
    const desconto = ((produto.precoOriginal - produto.precoAtual) / produto.precoOriginal) * 100;
    return Math.round(desconto);
  }

  /**
   * Busca produtos relacionados
   * @param {string} id - ID do produto atual
   * @param {number} limite - Quantidade de produtos a retornar
   * @returns {Array} Produtos relacionados
   */
  buscarRelacionados(id, limite = 4) {
    const produto = this.buscarPorId(id);
    if (!produto) return [];

    return this.produtos
      .filter(p => 
        p.id !== id && 
        p.categorias.some(cat => produto.categorias.includes(cat))
      )
      .slice(0, limite);
  }

  /**
   * Busca produtos em promoção
   * @returns {Array} Produtos em promoção
   */
  buscarPromocoes() {
    return this.produtos.filter(p => p.promocao);
  }

  /**
   * Busca produtos por pronta entrega
   * @returns {Array} Produtos em pronta entrega
   */
  buscarProntaEntrega() {
    return this.produtos.filter(p => p.prontaEntrega);
  }

  /**
   * Ordena produtos por critério
   * @param {Array} produtos - Lista de produtos
   * @param {string} criterio - Critério de ordenação
   * @returns {Array} Produtos ordenados
   */
  ordenar(produtos, criterio) {
    const lista = [...produtos];
    
    switch (criterio) {
      case 'menor-preco':
        return lista.sort((a, b) => a.precoAtual - b.precoAtual);
      case 'maior-preco':
        return lista.sort((a, b) => b.precoAtual - a.precoAtual);
      case 'mais-vendidos':
        return lista.sort((a, b) => b.totalAvaliacoes - a.totalAvaliacoes);
      case 'melhor-avaliacao':
        return lista.sort((a, b) => b.avaliacao - a.avaliacao);
      default:
        return lista;
    }
  }
}

// Exporta instância única (Singleton)
const productService = new ProductService();
