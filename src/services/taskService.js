/**
 * Services - Onde fica a lógica de negócio
 * 
 * Aqui é onde acontece a mágica! Os services contêm toda a lógica
 * de negócio da aplicação, como buscar dados, aplicar filtros,
 * fazer cálculos, etc.
 * 
 * Por que separar do controller?
 * - Controller cuida de HTTP (receber requisição, retornar resposta)
 * - Service cuida da lógica (buscar dados, aplicar regras, etc)
 * 
 * Isso facilita porque:
 * - Você pode reusar a mesma lógica em outros lugares
 * - Fica mais fácil de testar (não precisa simular HTTP)
 * - O código fica mais organizado
 * 
 * Nota: Este exemplo usa um array em memória para guardar as tarefas.
 * Em um projeto real, você usaria um banco de dados (MongoDB, PostgreSQL, etc).
 */

// Array para guardar as tarefas (simula um banco de dados)
// Em produção, isso viria de um banco de dados real
let tasks = [];
let nextId = 1;

/**
 * Busca todas as tarefas, com opção de filtrar e paginar
 */
export const getAllTasks = async (filters = {}, pagination = {}) => {
  // Começa com uma cópia de todas as tarefas
  let filteredTasks = [...tasks];

  // Aplica os filtros se tiverem sido passados
  if (filters.status) {
    filteredTasks = filteredTasks.filter((task) => task.status === filters.status);
  }

  if (filters.priority) {
    filteredTasks = filteredTasks.filter((task) => task.priority === filters.priority);
  }

  if (filters.userId) {
    filteredTasks = filteredTasks.filter((task) => task.userId === filters.userId);
  }

  // Ordena do mais recente para o mais antigo
  filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Faz a paginação
  const page = parseInt(pagination.page, 10) || 1;
  const limit = parseInt(pagination.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  return {
    data: paginatedTasks,
    pagination: {
      page,
      limit,
      total: filteredTasks.length,
      totalPages: Math.ceil(filteredTasks.length / limit),
    },
  };
};

/**
 * Busca uma tarefa específica pelo ID
 */
export const getTaskById = async (id) => {
  const task = tasks.find((t) => t.id === parseInt(id, 10));
  return task || null;
};

/**
 * Cria uma nova tarefa
 */
export const createTask = async (taskData) => {
  const newTask = {
    id: nextId++,
    title: taskData.title,
    description: taskData.description || '',
    status: taskData.status || 'pending',
    priority: taskData.priority || 'medium',
    userId: taskData.userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  return newTask;
};

/**
 * Atualiza uma tarefa existente
 */
export const updateTask = async (id, updates) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id, 10));

  // Se não encontrou, retorna null
  if (taskIndex === -1) {
    return null;
  }

  // Atualiza só os campos que vieram, mantendo o resto
  const updatedTask = {
    ...tasks[taskIndex],
    ...updates,
    id: tasks[taskIndex].id, // Não deixa mudar o ID
    createdAt: tasks[taskIndex].createdAt, // Mantém a data de criação
    updatedAt: new Date().toISOString(), // Atualiza a data de modificação
  };

  tasks[taskIndex] = updatedTask;
  return updatedTask;
};

/**
 * Deleta uma tarefa
 */
export const deleteTask = async (id) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id, 10));

  // Se não encontrou, retorna false
  if (taskIndex === -1) {
    return false;
  }

  // Remove a tarefa do array
  tasks.splice(taskIndex, 1);
  return true;
};

