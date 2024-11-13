# 📊 AW Monitor

AW Monitor é uma interface aprimorada para visualização dos eventos de **ActivityWatch**, construída com **Next.js 15** e **ui.shadcn**. Este projeto visa proporcionar uma experiência mais intuitiva e amigável para monitorar e visualizar as atividades rastreadas pelo ActivityWatch.

---

## ✨ Funcionalidades

- **Visualização de Eventos**: Exiba e explore todos os eventos capturados pelo ActivityWatch.
- **Filtros Avançados**: Filtre os eventos por data, tipo, e outros critérios para facilitar a análise.
- **Interface Moderna**: Design atualizado utilizando componentes do **ui.shadcn**.
- **Performance Otimizada**: Desenvolvido com Next.js 15 para uma experiência de usuário rápida e responsiva.

---

## 🛠️ Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/) — Framework moderno para aplicações React com renderização híbrida.
- [ui.shadcn](https://ui.shadcn.com/) — Biblioteca de componentes para criação de interfaces elegantes e consistentes.
- [ActivityWatch API](https://activitywatch.net/) — API para captura e monitoramento de atividades.

---

## 🚀 Começando

### Pré-requisitos

- **Node.js** versão 18 ou superior
- **NPM** para gerenciamento de pacotes

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/peal-26/aw-monitor.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd aw-monitor
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

### Configuração

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
   ```env
   NEXT_PUBLIC_ACTIVITYWATCH_API_URL=http://localhost:5600/api
   ```

### Executando o Projeto

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar a aplicação.

---

## 🧩 Estrutura de Pastas

```plaintext
aw-monitor/
├── public/         # Componentes de UI reutilizáveis
├── src/            # Componentes de UI reutilizáveis
└── components/     # Componentes de UI reutilizáveis
    ├── pages/      # Páginas da aplicação Next.js
    ├── public/     # Recursos estáticos
    ├── styles/     # Arquivos de estilo global e específicos
    └── utils/      # Funções e utilitários para apoio ao projeto
```

---

## 📈 Roadmap

- [ ] Integração com relatórios detalhados por tipo de evento.
- [ ] Suporte a temas (claro e escuro).
- [ ] Funcionalidade para exportação de dados em CSV.
- [ ] Notificações personalizadas para eventos específicos.

---

## 📚 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b minha-feature`)
3. Comite suas alterações (`git commit -m 'Adicionei uma nova feature'`)
4. Envie para o repositório remoto (`git push origin minha-feature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 💬 Contato

Dúvidas ou sugestões? Entre em contato:

- **Email**: edilasio@live.com
- **LinkedIn**: [PEAL](https://www.linkedin.com/in/peal-26)

---

Aproveite o AW Monitor para uma visualização aprimorada dos seus eventos do ActivityWatch! 🎉
