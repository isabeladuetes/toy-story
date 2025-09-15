import dados from "./../models/dados.js";
const { toyStorys } = dados;

// GET All
const getAllToyStorys = (req, res) => {
  res.status(200).json({
    total: toyStorys.length,
    toyStorys: toyStorys,
  });
};

// Criar a rota do GetById
const getToyStoryById = (req, res) => {
  let id = parseInt(req.params.id);

  const toyStory = toyStorys.find((b) => b.id === id);

  res.status(200).json({
    success: true,
    toyStory: toyStory,
  });
};

// Create ToyStory
const createToyStory = (req, res) => {
  const { nome, tipo, anoFabricacao, cor, quantidadeEstoque } = req.body;

  if (!nome || !tipo || !anoFabricacao || !cor || !quantidadeEstoque) {
    return res.status(400).json({
      success: false,
      message:
        "Nome, tipo, ano de fabricação, cor, quantidade no estoque são obrigatórios!",
    });
  }

  const novoToyStory = {
    id: toyStorys.length + 1,
    nome: nome,
    tipo: tipo,
    anoFabricacao: anoFabricacao,
    cor: cor,
    quantidadeEstoque: quantidadeEstoque,
  };

  // Push no array
  toyStorys.push(novoToyStory);

  res.status(201).json({
    success: true,
    message: "Toy Story cadastrado com sucesso!",
    toyStory: novoToyStory,
  });
};

// Deletando Barbie
const deleteToyStory = (req, res) => {
  const { id } = req.params;

  // Validar ID
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "ID deve ser um número válido!",
    });
  }

  const idParaApagar = parseInt(id);

  // Verificar se barbie existe antes de remover
  const toyStoryParaRemover = toyStorys.find((b) => b.id === idParaApagar);
  if (!toyStoryParaRemover) {
    return res.status(404).json({
      success: false,
      message: `Toy Story com ID ${id} não encontrado para remoção!`,
    });
  }

  // Remover barbie usando filter
  const toyStoryFiltrados = toyStorys.filter(
    (toyStory) => toyStory.id !== idParaApagar
  );

  // Atualizar array global
  toyStorys.splice(0, toyStorys.length, ...toyStoryFiltrados);

  res.status(200).json({
    success: true,
    message: `Toy Story ${toyStoryParaRemover.nome} (ID: ${id}) foi removido dos registros.`,
    toyStoryRemovido: toyStoryParaRemover,
  });
};

// PUT /toy Storys/:id - Atualizar toy Storys existente por ID
const updateToyStory = (req, res) => {
  const { id } = req.params;
  const { nome, tipo, anoFabricacao, cor, quantidadeEstoque } = req.body;

  // Validar ID
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "ID deve ser um número válido!",
    });
  }

  const idParaEditar = parseInt(id);

  // Verificar se existe
  const toyStoryExiste = toyStorys.find((b) => b.id === idParaEditar);
  if (!toyStoryExiste) {
    return res.status(404).json({
      success: false,
      message: `Toy Story com ID ${id} não encontrado para atualização!`,
    });
  }

  // Atualizar barbie usando map
  const toyStoryAtualizados = toyStorys.map((toyStory) =>
    toyStory.id === idParaEditar
      ? {
          ...toyStory,
          ...(nome && { nome }),
          ...(tipo && { tipo }),
          ...(anoFabricacao && { anoFabricacao: parseInt(anoFabricacao) }),
          ...(cor && { cor }),
          ...(quantidadeEstoque && {
            quantidadeEstoque: parseInt(quantidadeEstoque),
          }),
        }
      : toyStory
  );

  // Atualizar array global
  toyStorys.splice(0, toyStorys.length, ...toyStoryAtualizados);

  // Buscar barbie atualizado para retorno
  const toyStoryNovo = toyStorys.find((b) => b.id === idParaEditar);

  res.status(200).json({
    success: true,
    message: `Dados do Toy Story ID ${id} atualizados com sucesso!`,
    toyStory: toyStoryNovo,
  });
};

export {
  getAllToyStorys,
  getToyStoryById,
  createToyStory,
  deleteToyStory,
  updateToyStory,
};
