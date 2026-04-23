# 🔧 Solução: Produtos Não Aparecem

## ❌ Problema

As camisas não estão aparecendo no site quando você abre o arquivo `index.html` diretamente no navegador.

## 🎯 Causa

O navegador bloqueia o carregamento de arquivos JSON por questões de segurança quando você abre um arquivo HTML diretamente (protocolo `file://`). Isso é chamado de **CORS Policy**.

## ✅ Soluções

### Solução 1: Usar Servidor Web Local (RECOMENDADO)

Escolha uma das opções abaixo:

#### Opção A: Python (se você tem Python instalado)

```bash
# Abra o terminal na pasta do projeto
cd caminho/para/koala-sports

# Execute o servidor
python -m http.server 8000

# Abra no navegador
http://localhost:8000
```

#### Opção B: Node.js (se você tem Node instalado)

```bash
# Instale o http-server (apenas uma vez)
npm install -g http-server

# Na pasta do projeto, execute
http-server

# Abra no navegador
http://localhost:8080
```

#### Opção C: PHP (se você tem PHP instalado)

```bash
# Na pasta do projeto
php -S localhost:8000

# Abra no navegador
http://localhost:8000
```

#### Opção D: VS Code Live Server

1. Abra o projeto no VS Code
2. Instale a extensão **"Live Server"**
3. Clique com botão direito em `index.html`
4. Selecione **"Open with Live Server"**
5. O site abrirá automaticamente

---

### Solução 2: Usar Versão Standalone (SEM SERVIDOR)

Se você não pode usar um servidor web, use o arquivo alternativo que criei:

1. Abra o arquivo **`index-standalone.html`** no navegador
2. Este arquivo tem os produtos embutidos e funciona sem servidor
3. **Limitação**: Tem apenas 3 produtos de exemplo

---

### Solução 3: Testar se o JSON Está Carregando

1. Abra o arquivo **`test.html`** no navegador
2. Ele mostrará se o JSON está carregando corretamente
3. Se mostrar erro, use a Solução 1 ou 2

---

## 🧪 Como Verificar se Está Funcionando

### 1. Abra o Console do Navegador

- **Chrome/Edge**: Pressione `F12` ou `Ctrl+Shift+I`
- **Firefox**: Pressione `F12`
- **Safari**: `Cmd+Option+I`

### 2. Vá na aba "Console"

### 3. Procure por mensagens:

✅ **Se estiver funcionando:**
```
✅ Koala Sports inicializado com sucesso!
```

❌ **Se tiver erro:**
```
Failed to load resource: net::ERR_FILE_NOT_FOUND
Access to fetch at 'file://...' from origin 'null' has been blocked by CORS policy
```

---

## 📋 Checklist de Verificação

- [ ] Estou usando um servidor web local?
- [ ] O arquivo `produtos.json` está na pasta raiz do projeto?
- [ ] A pasta `images/` existe com as imagens dos produtos?
- [ ] Abri o Console do navegador para ver erros?
- [ ] Testei o arquivo `test.html` para diagnóstico?

---

## 🚀 Recomendação Final

**Use SEMPRE um servidor web local para desenvolvimento!**

Isso evita problemas com:
- Carregamento de JSON
- CORS
- Módulos JavaScript
- Service Workers
- E muitos outros recursos modernos

---

## 💡 Dica Extra

Se você usa **Windows**, a forma mais fácil é:

1. Instalar Python: https://www.python.org/downloads/
2. Marcar a opção "Add Python to PATH" durante instalação
3. Abrir CMD na pasta do projeto
4. Executar: `python -m http.server 8000`
5. Abrir: `http://localhost:8000`

---

## 📞 Ainda com Problemas?

Se mesmo usando servidor web os produtos não aparecem:

1. Abra o Console (F12)
2. Copie TODOS os erros que aparecem
3. Verifique se o arquivo `produtos.json` existe
4. Verifique se a pasta `js/` tem todos os arquivos
5. Tente limpar o cache do navegador (Ctrl+Shift+Delete)

---

**Desenvolvido com ❤️ para a Koala Sports**
