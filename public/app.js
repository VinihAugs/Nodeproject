/**
 * JavaScript do Frontend
 * 
 * Aqui ficam todas as funcionalidades interativas:
 * - Navegação suave entre seções
 * - Destaque da seção ativa ao rolar
 * - Menu lateral que abre/fecha no mobile
 * - Botão para voltar ao topo
 * - Copiar código
 * - Testador de API
 */

// Pega a URL base da API automaticamente (funciona em dev e produção)
const API_BASE_URL = window.location.origin + '/api';
let authToken = null;

// ============================================
// NAVEGAÇÃO E SCROLL
// ============================================

// Faz a navegação suave quando clica nos links do menu
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      // Remove active de todos os links
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      // Adiciona active ao link clicado
      link.classList.add('active');
      
      // Scroll suave
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Fecha sidebar no mobile
      if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
      }
    }
  });
});

// Scroll spy - destaca seção ativa
const sections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Botão back to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const backToTopBtn = document.getElementById('backToTop');
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

// Sidebar toggle (mobile)
document.getElementById('sidebarToggle')?.addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// Fecha sidebar ao clicar fora (mobile)
document.addEventListener('click', (e) => {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebarToggle');
  
  // Só fecha no mobile (até 768px)
  if (window.innerWidth <= 768 && 
      sidebar &&
      !sidebar.contains(e.target) && 
      !toggle?.contains(e.target) &&
      sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
    // Previne scroll do body quando sidebar está aberta
    document.body.style.overflow = '';
  }
});

// Previne scroll do body quando sidebar está aberta no mobile
const sidebar = document.getElementById('sidebar');
if (sidebar) {
  const observer = new MutationObserver(() => {
    if (window.innerWidth <= 768) {
      if (sidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  });
  
  observer.observe(sidebar, {
    attributes: true,
    attributeFilter: ['class']
  });
}

// ============================================
// COPY CODE FUNCTIONALITY
// ============================================

function copyCode(button) {
  const codeBlock = button.closest('.code-container').querySelector('code');
  const text = codeBlock.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.style.color = '#4CAF50';
    
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.style.color = '';
    }, 2000);
  }).catch(err => {
    console.error('Erro ao copiar:', err);
    alert('Erro ao copiar código. Tente selecionar e copiar manualmente.');
  });
}

// ============================================
// API TESTER FUNCTIONS
// ============================================

/**
 * Faz login e armazena o token
 */
async function testLogin() {
  const resultDiv = document.getElementById('login-result');
  resultDiv.className = 'result-box info show';
  resultDiv.textContent = 'Fazendo login...';

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'admin123',
      }),
    });

    const data = await response.json();

    if (response.ok) {
      authToken = data.data.token;
      resultDiv.className = 'result-box success show';
      resultDiv.textContent = `✅ Login realizado com sucesso!\n\nToken: ${authToken.substring(0, 50)}...\n\nUsuário: ${JSON.stringify(data.data.user, null, 2)}`;
      
      // Mostra notificação visual
      showNotification('Login realizado com sucesso!', 'success');
    } else {
      resultDiv.className = 'result-box error show';
      resultDiv.textContent = `❌ Erro: ${JSON.stringify(data, null, 2)}`;
    }
  } catch (error) {
    resultDiv.className = 'result-box error show';
    resultDiv.textContent = `❌ Erro de conexão: ${error.message}\n\nCertifique-se de que o servidor está rodando (npm run dev)`;
    showNotification('Erro de conexão. Verifique se o servidor está rodando.', 'error');
  }
}

/**
 * Cria uma nova tarefa
 */
async function createTask() {
  const resultDiv = document.getElementById('create-result');
  const titleInput = document.getElementById('task-title');
  const title = titleInput.value.trim();

  if (!title) {
    resultDiv.className = 'result-box error show';
    resultDiv.textContent = '❌ Por favor, digite um título para a tarefa';
    return;
  }

  if (!authToken) {
    resultDiv.className = 'result-box error show';
    resultDiv.textContent = '❌ Faça login primeiro!';
    showNotification('Faça login antes de criar uma tarefa', 'error');
    return;
  }

  resultDiv.className = 'result-box info show';
  resultDiv.textContent = 'Criando tarefa...';

  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title,
        description: 'Tarefa criada via frontend',
        status: 'pending',
        priority: 'medium',
      }),
    });

    const data = await response.json();

    if (response.ok) {
      resultDiv.className = 'result-box success show';
      resultDiv.textContent = `✅ Tarefa criada com sucesso!\n\n${JSON.stringify(data, null, 2)}`;
      titleInput.value = '';
      showNotification('Tarefa criada com sucesso!', 'success');
    } else {
      resultDiv.className = 'result-box error show';
      resultDiv.textContent = `❌ Erro: ${JSON.stringify(data, null, 2)}`;
    }
  } catch (error) {
    resultDiv.className = 'result-box error show';
    resultDiv.textContent = `❌ Erro de conexão: ${error.message}`;
  }
}

/**
 * Lista todas as tarefas
 */
async function listTasks() {
  const resultDiv = document.getElementById('list-result');
  resultDiv.className = 'result-box info show';
  resultDiv.textContent = 'Buscando tarefas...';

  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      resultDiv.className = 'result-box success show';
      resultDiv.textContent = `✅ Tarefas encontradas: ${data.data.length}\n\n${JSON.stringify(data, null, 2)}`;
    } else {
      resultDiv.className = 'result-box error show';
      resultDiv.textContent = `❌ Erro: ${JSON.stringify(data, null, 2)}`;
    }
  } catch (error) {
    resultDiv.className = 'result-box error show';
    resultDiv.textContent = `❌ Erro de conexão: ${error.message}\n\nCertifique-se de que o servidor está rodando (npm run dev)`;
    showNotification('Erro de conexão. Verifique se o servidor está rodando.', 'error');
  }
}

// Permite criar tarefa pressionando Enter
document.getElementById('task-title')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    createTask();
  }
});

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
  // Remove notificação existente
  const existing = document.querySelector('.notification');
  if (existing) {
    existing.remove();
  }

  // Cria nova notificação
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Adiciona ao body
  document.body.appendChild(notification);
  
  // Anima entrada
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Remove após 3 segundos
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============================================
// ENDPOINT MODAL
// ============================================

// Exemplos de código para cada endpoint
const endpointExamples = {
  health: {
    description: 'Verifica o status da aplicação. Útil para monitoramento e health checks.',
    axios: `import axios from 'axios';

// Health Check
const API_URL = process.env.API_URL || 'http://localhost:3000';

const checkHealth = async () => {
  try {
    const response = await axios.get(\`\${API_URL}/api/health\`);
    console.log('Status:', response.data.status);
    console.log('Uptime:', response.data.uptime);
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar health:', error.message);
    throw error;
  }
};

// Uso
await checkHealth();`,
    fetch: `// Health Check com Fetch API
const API_URL = window.location.origin; // Usa a URL atual

const checkHealth = async () => {
  try {
    const response = await fetch(\`\${API_URL}/api/health\`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error('Erro ao verificar health');
    }
    
    console.log('Status:', data.status);
    console.log('Uptime:', data.uptime);
    return data;
  } catch (error) {
    console.error('Erro:', error.message);
    throw error;
  }
};

// Uso
await checkHealth();`,
    info: `
      <h4>📝 Detalhes:</h4>
      <ul>
        <li><strong>Método:</strong> GET</li>
        <li><strong>Autenticação:</strong> Não requerida</li>
        <li><strong>Resposta:</strong> { status: "ok", timestamp: "...", uptime: ... }</li>
      </ul>
    `
  },
  login: {
    description: 'Realiza login e retorna um token JWT para autenticação nas próximas requisições.',
    axios: `import axios from 'axios';

// Login
const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email: email,
      password: password
    });
    
    // Salva o token para usar em requisições futuras
    const token = response.data.data.token;
    localStorage.setItem('token', token);
    
    console.log('Login realizado!', response.data.data.user);
    return response.data;
  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message);
    throw error;
  }
};

// Uso
await login('admin@example.com', 'admin123');`,
    fetch: `// Login com Fetch API
const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erro no login');
    }
    
    // Salva o token
    const token = data.data.token;
    localStorage.setItem('token', token);
    
    console.log('Login realizado!', data.data.user);
    return data;
  } catch (error) {
    console.error('Erro:', error.message);
    throw error;
  }
};

// Uso
await login('admin@example.com', 'admin123');`,
    info: `
      <h4>📝 Detalhes:</h4>
      <ul>
        <li><strong>Método:</strong> POST</li>
        <li><strong>Autenticação:</strong> Não requerida</li>
        <li><strong>Body:</strong> { email: string, password: string }</li>
        <li><strong>Resposta:</strong> { success: true, data: { user: {...}, token: "..." } }</li>
      </ul>
    `
  },
  'list-tasks': {
    description: 'Lista todas as tarefas com suporte a filtros (status, priority) e paginação.',
    axios: `import axios from 'axios';

// Listar tarefas com filtros e paginação
const listTasks = async (filters = {}, pagination = {}) => {
  try {
    const params = new URLSearchParams();
    
    // Adiciona filtros
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    
    // Adiciona paginação
    if (pagination.page) params.append('page', pagination.page);
    if (pagination.limit) params.append('limit', pagination.limit);
    
    const response = await axios.get(
      \`http://localhost:3000/api/tasks?\${params.toString()}\`
    );
    
    console.log('Tarefas:', response.data.data);
    console.log('Paginação:', response.data.pagination);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar tarefas:', error.message);
    throw error;
  }
};

// Exemplos de uso
await listTasks(); // Todas as tarefas
await listTasks({ status: 'pending' }); // Filtrar por status
await listTasks({}, { page: 1, limit: 10 }); // Com paginação`,
    fetch: `// Listar tarefas com Fetch API
const listTasks = async (filters = {}, pagination = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (pagination.page) params.append('page', pagination.page);
    if (pagination.limit) params.append('limit', pagination.limit);
    
    const response = await fetch(
      \`http://localhost:3000/api/tasks?\${params.toString()}\`
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao listar tarefas');
    }
    
    console.log('Tarefas:', data.data);
    return data;
  } catch (error) {
    console.error('Erro:', error.message);
    throw error;
  }
};

// Uso
await listTasks({ status: 'pending' }, { page: 1, limit: 10 });`,
    info: `
      <h4>📝 Detalhes:</h4>
      <ul>
        <li><strong>Método:</strong> GET</li>
        <li><strong>Autenticação:</strong> Não requerida</li>
        <li><strong>Query Params:</strong> status, priority, page, limit</li>
        <li><strong>Resposta:</strong> { success: true, data: [...], pagination: {...} }</li>
      </ul>
    `
  },
  'create-task': {
    description: 'Cria uma nova tarefa. Requer autenticação JWT no header Authorization.',
    axios: `import axios from 'axios';

// Criar tarefa
const createTask = async (taskData) => {
  try {
    // Obtém o token salvo
    const token = localStorage.getItem('token');
    
    const response = await axios.post(
      'http://localhost:3000/api/tasks',
      {
        title: taskData.title,
        description: taskData.description || '',
        status: taskData.status || 'pending',
        priority: taskData.priority || 'medium'
      },
      {
        headers: {
          'Authorization': \`Bearer \${token}\`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Tarefa criada:', response.data.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      console.error('Token inválido ou expirado. Faça login novamente.');
    }
    console.error('Erro ao criar tarefa:', error.response?.data || error.message);
    throw error;
  }
};

// Uso
await createTask({
  title: 'Nova tarefa',
  description: 'Descrição da tarefa',
  status: 'pending',
  priority: 'high'
});`,
    fetch: `// Criar tarefa com Fetch API
const createTask = async (taskData) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: taskData.title,
        description: taskData.description || '',
        status: taskData.status || 'pending',
        priority: taskData.priority || 'medium'
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Token inválido. Faça login novamente.');
      }
      throw new Error(data.error || 'Erro ao criar tarefa');
    }
    
    console.log('Tarefa criada:', data.data);
    return data;
  } catch (error) {
    console.error('Erro:', error.message);
    throw error;
  }
};

// Uso
await createTask({
  title: 'Nova tarefa',
  description: 'Descrição',
  status: 'pending'
});`,
    info: `
      <h4>📝 Detalhes:</h4>
      <ul>
        <li><strong>Método:</strong> POST</li>
        <li><strong>Autenticação:</strong> 🔒 Requerida (JWT Token)</li>
        <li><strong>Header:</strong> Authorization: Bearer &lt;token&gt;</li>
        <li><strong>Body:</strong> { title: string, description?: string, status?: string, priority?: string }</li>
        <li><strong>Validação:</strong> title (min 3, max 100 caracteres)</li>
      </ul>
    `
  },
  'get-task': {
    description: 'Busca uma tarefa específica pelo ID.',
    axios: `import axios from 'axios';

// Buscar tarefa por ID
const getTaskById = async (taskId) => {
  try {
    const response = await axios.get(
      \`http://localhost:3000/api/tasks/\${taskId}\`
    );
    
    console.log('Tarefa encontrada:', response.data.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.error('Tarefa não encontrada');
    }
    console.error('Erro ao buscar tarefa:', error.message);
    throw error;
  }
};

// Uso
await getTaskById(1);`,
    fetch: `// Buscar tarefa por ID com Fetch API
const getTaskById = async (taskId) => {
  try {
    const response = await fetch(
      \`http://localhost:3000/api/tasks/\${taskId}\`
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Tarefa não encontrada');
      }
      throw new Error(data.error || 'Erro ao buscar tarefa');
    }
    
    console.log('Tarefa encontrada:', data.data);
    return data;
  } catch (error) {
    console.error('Erro:', error.message);
    throw error;
  }
};

// Uso
await getTaskById(1);`,
    info: `
      <h4>📝 Detalhes:</h4>
      <ul>
        <li><strong>Método:</strong> GET</li>
        <li><strong>Autenticação:</strong> Não requerida</li>
        <li><strong>Parâmetro:</strong> :id (ID da tarefa)</li>
        <li><strong>Resposta:</strong> { success: true, data: {...} }</li>
        <li><strong>Erro 404:</strong> Tarefa não encontrada</li>
      </ul>
    `
  },
  'update-task': {
    description: 'Atualiza uma tarefa existente. Requer autenticação e permite atualizar campos específicos.',
    axios: `import axios from 'axios';

// Atualizar tarefa
const updateTask = async (taskId, updates) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.put(
      \`http://localhost:3000/api/tasks/\${taskId}\`,
      {
        // Apenas os campos que deseja atualizar
        title: updates.title,
        status: updates.status,
        priority: updates.priority,
        description: updates.description
      },
      {
        headers: {
          'Authorization': \`Bearer \${token}\`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Tarefa atualizada:', response.data.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.error('Tarefa não encontrada');
    } else if (error.response?.status === 401) {
      console.error('Token inválido. Faça login novamente.');
    }
    console.error('Erro ao atualizar:', error.response?.data || error.message);
    throw error;
  }
};

// Uso - atualiza apenas o status
await updateTask(1, { status: 'completed' });

// Uso - atualiza múltiplos campos
await updateTask(1, {
  title: 'Título atualizado',
  status: 'in_progress',
  priority: 'high'
});`,
    fetch: `// Atualizar tarefa com Fetch API
const updateTask = async (taskId, updates) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(
      \`http://localhost:3000/api/tasks/\${taskId}\`,
      {
        method: 'PUT',
        headers: {
          'Authorization': \`Bearer \${token}\`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Tarefa não encontrada');
      }
      if (response.status === 401) {
        throw new Error('Token inválido');
      }
      throw new Error(data.error || 'Erro ao atualizar');
    }
    
    console.log('Tarefa atualizada:', data.data);
    return data;
  } catch (error) {
    console.error('Erro:', error.message);
    throw error;
  }
};

// Uso
await updateTask(1, { status: 'completed' });`,
    info: `
      <h4>📝 Detalhes:</h4>
      <ul>
        <li><strong>Método:</strong> PUT</li>
        <li><strong>Autenticação:</strong> 🔒 Requerida (JWT Token)</li>
        <li><strong>Parâmetro:</strong> :id (ID da tarefa)</li>
        <li><strong>Body:</strong> Campos opcionais para atualizar (title, description, status, priority)</li>
        <li><strong>Resposta:</strong> { success: true, data: {...} }</li>
      </ul>
    `
  },
  'delete-task': {
    description: 'Deleta uma tarefa permanentemente. Requer autenticação.',
    axios: `import axios from 'axios';

// Deletar tarefa
const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.delete(
      \`http://localhost:3000/api/tasks/\${taskId}\`,
      {
        headers: {
          'Authorization': \`Bearer \${token}\`
        }
      }
    );
    
    // Status 204 = No Content (sucesso sem corpo de resposta)
    if (response.status === 204) {
      console.log('Tarefa deletada com sucesso');
      return true;
    }
    
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.error('Tarefa não encontrada');
    } else if (error.response?.status === 401) {
      console.error('Token inválido. Faça login novamente.');
    }
    console.error('Erro ao deletar:', error.response?.data || error.message);
    throw error;
  }
};

// Uso
await deleteTask(1);`,
    fetch: `// Deletar tarefa com Fetch API
const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(
      \`http://localhost:3000/api/tasks/\${taskId}\`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': \`Bearer \${token}\`
        }
      }
    );
    
    if (response.status === 204) {
      console.log('Tarefa deletada com sucesso');
      return true;
    }
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Tarefa não encontrada');
      }
      if (response.status === 401) {
        throw new Error('Token inválido');
      }
      const data = await response.json();
      throw new Error(data.error || 'Erro ao deletar');
    }
    
    return true;
  } catch (error) {
    console.error('Erro:', error.message);
    throw error;
  }
};

// Uso
await deleteTask(1);`,
    info: `
      <h4>📝 Detalhes:</h4>
      <ul>
        <li><strong>Método:</strong> DELETE</li>
        <li><strong>Autenticação:</strong> 🔒 Requerida (JWT Token)</li>
        <li><strong>Parâmetro:</strong> :id (ID da tarefa)</li>
        <li><strong>Resposta:</strong> Status 204 (No Content) em caso de sucesso</li>
        <li><strong>Atenção:</strong> Esta ação é permanente e não pode ser desfeita</li>
      </ul>
    `
  }
};

// Abre o modal com exemplos do endpoint
function openEndpointModal(endpointKey) {
  const endpoint = endpointExamples[endpointKey];
  if (!endpoint) return;

  const modal = document.getElementById('endpointModal');
  const card = document.querySelector(`[data-endpoint="${endpointKey}"]`);
  
  if (!card) return;

  const method = card.getAttribute('data-method');
  const path = card.getAttribute('data-path');

  // Atualiza o header do modal
  document.getElementById('modalMethod').textContent = method;
  document.getElementById('modalMethod').className = `method-badge-modal ${method.toLowerCase()}`;
  document.getElementById('modalPath').textContent = path;
  document.getElementById('modalDescription').textContent = endpoint.description;

  // Atualiza os códigos
  document.getElementById('axios-code').textContent = endpoint.axios;
  document.getElementById('fetch-code').textContent = endpoint.fetch;
  document.getElementById('modalInfo').innerHTML = endpoint.info;

  // Mostra o modal
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// Fecha o modal
function closeEndpointModal() {
  const modal = document.getElementById('endpointModal');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

// Troca entre tabs
function switchTab(tabName) {
  // Remove active de todas as tabs
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

  // Adiciona active na tab selecionada
  const clickedBtn = event.target;
  clickedBtn.classList.add('active');
  const tabContent = document.getElementById(`${tabName}-tab`);
  if (tabContent) {
    tabContent.classList.add('active');
  }
}

// Fecha modal ao clicar fora
document.getElementById('endpointModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'endpointModal') {
    closeEndpointModal();
  }
});

// Fecha modal com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeEndpointModal();
  }
});

// Adiciona event listeners aos cards de endpoints
document.querySelectorAll('.endpoint-card').forEach(card => {
  card.addEventListener('click', () => {
    const endpointKey = card.getAttribute('data-endpoint');
    openEndpointModal(endpointKey);
  });
});

// ============================================
// INITIALIZATION
// ============================================

// Destaca primeira seção ao carregar
window.addEventListener('load', () => {
  const firstLink = document.querySelector('.nav-link');
  if (firstLink) {
    firstLink.classList.add('active');
  }
});

// Adiciona estilos para notificações dinamicamente
const style = document.createElement('style');
style.textContent = `
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
  }
  
  .notification.show {
    transform: translateX(0);
  }
  
  .notification.success {
    background: #4CAF50;
  }
  
  .notification.error {
    background: #f44336;
  }
  
  .notification.info {
    background: #2196F3;
  }
`;
document.head.appendChild(style);
