/* ============================================
   BIGODE GROSSO - SCRIPT.JS
   Sistema Completo de Agendamento
   ============================================ */

// ============================================
// DADOS DO SISTEMA
// ============================================

const SERVICOS = [
    { id: 'corte', nome: 'Corte Masculino', descricao: 'Corte moderno ou clássico com acabamento perfeito e lavagem inclusa.', preco: 45.00, duracao: 40, icone: 'fa-cut' },
    { id: 'barba', nome: 'Barba Completa', descricao: 'Barba feita com navalha, toalha quente e produtos premium.', preco: 35.00, duracao: 30, icone: 'fa-razor' },
    { id: 'sombrancelhas', nome: 'Sobrancelhas', descricao: 'Design e modelagem de sobrancelhas masculinas.', preco: 25.00, duracao: 20, icone: 'fa-eye' },
    { id: 'progressiva', nome: 'Progressiva', descricao: 'Tratamento de alisamento capilar progressivo.', preco: 120.00, duracao: 120, icone: 'fa-wind' },
    { id: 'luzes', nome: 'Luzes', descricao: 'Mechas e luzes para cabelo masculino.', preco: 150.00, duracao: 150, icone: 'fa-sun' },
    { id: 'corte-barba', nome: 'Corte + Barba', descricao: 'Combo completo de corte e barba com tratamento especial.', preco: 70.00, duracao: 60, icone: 'fa-crown' },
    { id: 'pigmentacao', nome: 'Pigmentação', descricao: 'Pigmentação capilar e de barba para um visual mais preenchido.', preco: 55.00, duracao: 45, icone: 'fa-paint-brush' },
    { id: 'tratamento', nome: 'Tratamento Capilar', descricao: 'Hidratação profunda e tratamento para cabelos saudáveis.', preco: 60.00, duracao: 50, icone: 'fa-spa' },
    { id: 'infantil', nome: 'Corte Infantil', descricao: 'Corte especial para os pequenos com muita paciência e diversão.', preco: 35.00, duracao: 30, icone: 'fa-child' }
];

const BARBEIROS = [
    { id: 'dudu', nome: 'Eduardo (DUDU)', role: 'Barbeiro Sênior', descricao: '15 anos de experiência. Expert em cortes modernos e design de sobrancelha.', rating: 4.9, imagem: 'foto barbeiro dudu.jpg' },
    { id: 'galego', nome: 'Rafael Oliveira (Galego)', role: 'Barbeiro Sênior', descricao: '10 anos de experiência. Especialista em barba e pigmentação.', rating: 4.8, imagem: 'galego of.jpg' },
    { id: 'chiquinho', nome: 'Francisco (Chiquinho)', role: 'Barbeiro Especialista', descricao: '34 anos de experiência. Especialista em cortes clássicos e degradê.', rating: 5.0, imagem: 'chiquinho.jpg' },
    { id: 'pitbull', nome: 'André Santos (Pitbull)', role: 'Barbeiro Jr.', descricao: '5 anos de experiência. Especialista em cortes infantis e tratamentos.', rating: 4.5, imagem: 'pitbull.jpg' }
];

const HORARIOS = [
    '08:00', '08:40', '09:20', '10:00', '10:40', '11:20',
    '13:00', '13:40', '14:20', '15:00', '15:40', '16:20',
    '17:00', '17:40', '18:20', '19:00', '19:40', '20:20'
];

// Usuários pré-cadastrados (demo)
const USUARIOS_INICIAIS = [
    { id: 'admin1', nome: 'Administrador', email: 'admin@bigodegrosso.com', telefone: '(61) 99999-0001', senha: 'admin123', tipo: 'admin' },
    { id: 'func1', nome: 'Eduardo (DUDU)', email: 'dudu@bigodegrosso.com', telefone: '(61) 99999-0002', senha: 'func123', tipo: 'funcionario', barbeiroId: 'dudu' },
    { id: 'func2', nome: 'Rafael Oliveira', email: 'galego@bigodegrosso.com', telefone: '(61) 99999-0003', senha: 'func123', tipo: 'funcionario', barbeiroId: 'galego' },
    { id: 'func3', nome: 'Francisco', email: 'chiquinho@bigodegrosso.com', telefone: '(61) 99999-0004', senha: 'func123', tipo: 'funcionario', barbeiroId: 'chiquinho' },
    { id: 'func4', nome: 'André Santos', email: 'pitbull@bigodegrosso.com', telefone: '(61) 99999-0005', senha: 'func123', tipo: 'funcionario', barbeiroId: 'pitbull' }
];

// Agendamentos de demonstração
function getDataHoje() {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0];
}

function getDataAmanha() {
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    return amanha.toISOString().split('T')[0];
}

const AGENDAMENTOS_INICIAIS = [
    { id: 'demo1', clienteId: 'cliente1', clienteNome: 'João Silva', clienteTelefone: '(61) 98765-4321', clienteEmail: 'joao@email.com', servicoId: 'corte', servicoNome: 'Corte Masculino', barbeiroId: 'dudu', barbeiroNome: 'Eduardo (DUDU)', data: getDataHoje(), horario: '10:00', preco: 45.00, status: 'agendado', observacoes: '', createdAt: new Date().toISOString() },
    { id: 'demo2', clienteId: 'cliente2', clienteNome: 'Maria Oliveira', clienteTelefone: '(61) 98765-4322', clienteEmail: 'maria@email.com', servicoId: 'barba', servicoNome: 'Barba Completa', barbeiroId: 'galego', barbeiroNome: 'Rafael Oliveira (Galego)', data: getDataHoje(), horario: '14:00', preco: 35.00, status: 'agendado', observacoes: '', createdAt: new Date().toISOString() },
    { id: 'demo3', clienteId: 'cliente3', clienteNome: 'Pedro Costa', clienteTelefone: '(61) 98765-4323', clienteEmail: 'pedro@email.com', servicoId: 'corte-barba', servicoNome: 'Corte + Barba', barbeiroId: 'chiquinho', barbeiroNome: 'Francisco (Chiquinho)', data: getDataHoje(), horario: '16:00', preco: 70.00, status: 'agendado', observacoes: '', createdAt: new Date().toISOString() },
    { id: 'demo4', clienteId: 'cliente1', clienteNome: 'João Silva', clienteTelefone: '(61) 98765-4321', clienteEmail: 'joao@email.com', servicoId: 'progressiva', servicoNome: 'Progressiva', barbeiroId: 'pitbull', barbeiroNome: 'André Santos (Pitbull)', data: getDataAmanha(), horario: '09:00', preco: 120.00, status: 'agendado', observacoes: '', createdAt: new Date().toISOString() },
    { id: 'demo5', clienteId: 'cliente4', clienteNome: 'Ana Souza', clienteTelefone: '(61) 98765-4324', clienteEmail: 'ana@email.com', servicoId: 'luzes', servicoNome: 'Luzes', barbeiroId: 'dudu', barbeiroNome: 'Eduardo (DUDU)', data: getDataAmanha(), horario: '15:00', preco: 150.00, status: 'agendado', observacoes: '', createdAt: new Date().toISOString() }
];

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

function formatarData(dataStr) {
    const [ano, mes, dia] = dataStr.split('-');
    return dia + '/' + mes + '/' + ano;
}

function formatarPreco(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

function gerarId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function formatarTelefone(telefone) {
    return telefone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

// ============================================
// LOCALSTORAGE MANAGER
// ============================================

const Storage = {
    get: function(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    },
    set: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove: function(key) {
        localStorage.removeItem(key);
    }
};

function initStorage() {
    if (!Storage.get('usuarios')) {
        Storage.set('usuarios', USUARIOS_INICIAIS);
    }
    if (!Storage.get('agendamentos')) {
        Storage.set('agendamentos', AGENDAMENTOS_INICIAIS);
    }
}

// ============================================
// SISTEMA DE AUTENTICAÇÃO
// ============================================

const Auth = {
    usuarioAtual: null,

    login: function(email, senha) {
        const usuarios = Storage.get('usuarios') || [];
        const usuario = usuarios.find(function(u) { return u.email === email && u.senha === senha; });
        if (usuario) {
            this.usuarioAtual = Object.assign({}, usuario);
            delete this.usuarioAtual.senha;
            Storage.set('sessao', this.usuarioAtual);
            return { sucesso: true, usuario: this.usuarioAtual };
        }
        return { sucesso: false, erro: 'E-mail ou senha incorretos' };
    },

    registrar: function(dados) {
        const usuarios = Storage.get('usuarios') || [];
        if (usuarios.some(function(u) { return u.email === dados.email; })) {
            return { sucesso: false, erro: 'E-mail já cadastrado' };
        }
        if (usuarios.some(function(u) { return u.telefone === dados.telefone; })) {
            return { sucesso: false, erro: 'Telefone já cadastrado' };
        }

        const novoUsuario = Object.assign({
            id: gerarId(),
            tipo: 'cliente',
            createdAt: new Date().toISOString()
        }, dados);

        usuarios.push(novoUsuario);
        Storage.set('usuarios', usuarios);

        this.usuarioAtual = Object.assign({}, novoUsuario);
        delete this.usuarioAtual.senha;
        Storage.set('sessao', this.usuarioAtual);

        return { sucesso: true, usuario: this.usuarioAtual };
    },

    logout: function() {
        this.usuarioAtual = null;
        Storage.remove('sessao');
    },

    checkSession: function() {
        const sessao = Storage.get('sessao');
        if (sessao) {
            this.usuarioAtual = sessao;
            return sessao;
        }
        return null;
    },

    isAdmin: function() {
        return this.usuarioAtual && this.usuarioAtual.tipo === 'admin';
    },

    isFuncionario: function() {
        return this.usuarioAtual && this.usuarioAtual.tipo === 'funcionario';
    },

    isCliente: function() {
        return this.usuarioAtual && this.usuarioAtual.tipo === 'cliente';
    },

    isStaff: function() {
        return this.isAdmin() || this.isFuncionario();
    }
};

// ============================================
// SISTEMA DE AGENDAMENTOS
// ============================================

const Agendamentos = {
    criar: function(dados) {
        const agendamentos = Storage.get('agendamentos') || [];

        // Verificar conflito de horário
        const conflito = agendamentos.find(function(a) {
            return a.data === dados.data && 
                a.horario === dados.horario && 
                a.barbeiroId === dados.barbeiroId &&
                a.status !== 'cancelado';
        });

        if (conflito) {
            return { sucesso: false, erro: 'Este horário já está ocupado para este profissional. Por favor, escolha outro horário.' };
        }

        const novoAgendamento = Object.assign({
            id: gerarId(),
            status: 'agendado',
            createdAt: new Date().toISOString()
        }, dados);

        agendamentos.push(novoAgendamento);
        Storage.set('agendamentos', agendamentos);

        return { sucesso: true, agendamento: novoAgendamento };
    },

    listar: function(filtros) {
        filtros = filtros || {};
        var agendamentos = Storage.get('agendamentos') || [];

        if (filtros.clienteId) {
            agendamentos = agendamentos.filter(function(a) { return a.clienteId === filtros.clienteId; });
        }
        if (filtros.barbeiroId) {
            agendamentos = agendamentos.filter(function(a) { return a.barbeiroId === filtros.barbeiroId; });
        }
        if (filtros.data) {
            agendamentos = agendamentos.filter(function(a) { return a.data === filtros.data; });
        }
        if (filtros.status) {
            agendamentos = agendamentos.filter(function(a) { return a.status === filtros.status; });
        }
        if (filtros.dataInicio && filtros.dataFim) {
            agendamentos = agendamentos.filter(function(a) { 
                return a.data >= filtros.dataInicio && a.data <= filtros.dataFim; 
            });
        }

        return agendamentos.sort(function(a, b) {
            var dtA = new Date(a.data + 'T' + a.horario);
            var dtB = new Date(b.data + 'T' + b.horario);
            return dtA - dtB;
        });
    },

    atualizarStatus: function(id, novoStatus) {
        var agendamentos = Storage.get('agendamentos') || [];
        var index = agendamentos.findIndex(function(a) { return a.id === id; });
        if (index !== -1) {
            agendamentos[index].status = novoStatus;
            Storage.set('agendamentos', agendamentos);
            return { sucesso: true };
        }
        return { sucesso: false, erro: 'Agendamento não encontrado' };
    },

    excluir: function(id) {
        var agendamentos = Storage.get('agendamentos') || [];
        agendamentos = agendamentos.filter(function(a) { return a.id !== id; });
        Storage.set('agendamentos', agendamentos);
        return { sucesso: true };
    },

    getHorariosOcupados: function(data, barbeiroId) {
        var agendamentos = this.listar({ data: data, barbeiroId: barbeiroId });
        return agendamentos
            .filter(function(a) { return a.status !== 'cancelado'; })
            .map(function(a) { return a.horario; });
    },

    getLucrosPorBarbeiro: function(dataInicio, dataFim) {
        var agendamentos = this.listar({ dataInicio: dataInicio, dataFim: dataFim })
            .filter(function(a) { return a.status === 'concluido'; });

        var lucros = {};

        BARBEIROS.forEach(function(b) {
            var servicosBarbeiro = agendamentos.filter(function(a) { return a.barbeiroId === b.id; });
            var total = servicosBarbeiro.reduce(function(sum, a) { return sum + a.preco; }, 0);
            lucros[b.id] = {
                barbeiro: b.nome,
                quantidade: servicosBarbeiro.length,
                total: total,
                comissao: total * 0.5,
                lucroBarbearia: total * 0.5
            };
        });

        return lucros;
    }
};

// ============================================
// RENDERIZAÇÃO DE COMPONENTES
// ============================================

function renderServicos() {
    var grid = document.getElementById('services-grid');
    if (!grid) return;

    grid.innerHTML = SERVICOS.map(function(s) {
        return '<div class="service-card">' +
            '<div class="service-icon"><i class="fas ' + s.icone + '"></i></div>' +
            '<h3>' + s.nome + '</h3>' +
            '<p>' + s.descricao + '</p>' +
            '<div class="service-price">' +
                '<span class="price">' + formatarPreco(s.preco) + '</span>' +
                '<span class="duration"><i class="far fa-clock"></i> ' + s.duracao + ' min</span>' +
            '</div>' +
            '<button class="btn btn-sm btn-agendar" data-servico="' + s.id + '">' +
                '<i class="fas fa-calendar-plus"></i> Agendar' +
            '</button>' +
        '</div>';
    }).join('');

    grid.querySelectorAll('.btn-agendar').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var servicoId = btn.dataset.servico;
            preencherServicoAgendamento(servicoId);
            abrirModalAuth();
        });
    });
}

function renderBarbeiros() {
    var grid = document.getElementById('team-grid');
    if (!grid) return;

    grid.innerHTML = BARBEIROS.map(function(b) {
        var estrelasCheias = Math.floor(b.rating);
        var temMeia = b.rating % 1 >= 0.5;
        var estrelasHtml = '';
        for (var i = 0; i < 5; i++) {
            if (i < estrelasCheias) {
                estrelasHtml += '<i class="fas fa-star"></i>';
            } else if (i === estrelasCheias && temMeia) {
                estrelasHtml += '<i class="fas fa-star-half-alt"></i>';
            } else {
                estrelasHtml += '<i class="far fa-star"></i>';
            }
        }

        return '<div class="team-card">' +
            '<div class="team-image">' +
                '<img src="' + b.imagem + '" alt="' + b.nome + '" class="barber-img" onerror="this.style.display='none'">' +
                '<div class="team-placeholder"><i class="fas fa-user-tie"></i></div>' +
                '<div class="team-overlay">' +
                    '<a href="#"><i class="fab fa-instagram"></i></a>' +
                    '<a href="#"><i class="fab fa-facebook-f"></i></a>' +
                '</div>' +
            '</div>' +
            '<div class="team-info">' +
                '<h3>' + b.nome + '</h3>' +
                '<p class="role">' + b.role + '</p>' +
                '<p class="team-desc">' + b.descricao + '</p>' +
                '<div class="team-rating">' + estrelasHtml + '<span>' + b.rating + '</span></div>' +
            '</div>' +
        '</div>';
    }).join('');
}

function preencherSelectServicos() {
    var select = document.getElementById('booking-service');
    if (!select) return;

    select.innerHTML = '<option value="">Selecione um serviço</option>' +
        SERVICOS.map(function(s) {
            return '<option value="' + s.id + '" data-preco="' + s.preco + '" data-nome="' + s.nome + '">' + 
                s.nome + ' - ' + formatarPreco(s.preco) + '</option>';
        }).join('');
}

function preencherSelectBarbeiros() {
    var select = document.getElementById('booking-barber');
    if (!select) return;

    select.innerHTML = '<option value="">Selecione um profissional</option>' +
        BARBEIROS.map(function(b) {
            return '<option value="' + b.id + '" data-nome="' + b.nome + '">' + b.nome + '</option>';
        }).join('');
}

function preencherServicoAgendamento(servicoId) {
    var select = document.getElementById('booking-service');
    if (select) {
        select.value = servicoId;
        atualizarResumo();
    }
    var agendamentoSection = document.getElementById('agendamento');
    if (agendamentoSection) {
        agendamentoSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// SISTEMA DE HORÁRIOS
// ============================================

function atualizarHorariosDisponiveis() {
    var dataInput = document.getElementById('booking-date');
    var barbeiroSelect = document.getElementById('booking-barber');
    var horarioSelect = document.getElementById('booking-time');
    var statusEl = document.getElementById('time-status');

    if (!dataInput || !barbeiroSelect || !horarioSelect) return;

    var data = dataInput.value;
    var barbeiroId = barbeiroSelect.value;

    if (!data || !barbeiroId) {
        horarioSelect.innerHTML = '<option value="">Primeiro selecione a data e profissional</option>';
        horarioSelect.disabled = true;
        if (statusEl) statusEl.textContent = '';
        return;
    }

    // Verificar se é data passada
    var hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    var dataSelecionada = new Date(data + 'T00:00:00');

    if (dataSelecionada < hoje) {
        horarioSelect.innerHTML = '<option value="">Data já passou</option>';
        horarioSelect.disabled = true;
        if (statusEl) {
            statusEl.textContent = 'Não é possível agendar para datas passadas';
            statusEl.className = 'form-hint error';
        }
        return;
    }

    var horariosOcupados = Agendamentos.getHorariosOcupados(data, barbeiroId);
    var horariosDisponiveis = HORARIOS.filter(function(h) { return horariosOcupados.indexOf(h) === -1; });

    if (horariosDisponiveis.length === 0) {
        horarioSelect.innerHTML = '<option value="">Sem horários disponíveis</option>';
        horarioSelect.disabled = true;
        if (statusEl) {
            statusEl.textContent = 'Todos os horários estão ocupados para esta data';
            statusEl.className = 'form-hint error';
        }
    } else {
        horarioSelect.innerHTML = '<option value="">Selecione um horário</option>' +
            horariosDisponiveis.map(function(h) { return '<option value="' + h + '">' + h + '</option>'; }).join('');
        horarioSelect.disabled = false;
        if (statusEl) {
            statusEl.textContent = horariosDisponiveis.length + ' horário(s) disponível(is)';
            statusEl.className = 'form-hint success';
        }
    }

    atualizarResumo();
}

function atualizarResumo() {
    var servicoSelect = document.getElementById('booking-service');
    var barbeiroSelect = document.getElementById('booking-barber');
    var dataInput = document.getElementById('booking-date');
    var horarioSelect = document.getElementById('booking-time');
    var summaryDiv = document.getElementById('booking-summary');

    if (!summaryDiv) return;

    var servicoOption = servicoSelect && servicoSelect.selectedOptions.length > 0 ? servicoSelect.selectedOptions[0] : null;
    var barbeiroOption = barbeiroSelect && barbeiroSelect.selectedOptions.length > 0 ? barbeiroSelect.selectedOptions[0] : null;

    var servicoNome = servicoOption && servicoOption.dataset.nome ? servicoOption.dataset.nome : '-';
    var servicoPreco = servicoOption && servicoOption.dataset.preco ? parseFloat(servicoOption.dataset.preco) : 0;
    var barbeiroNome = barbeiroOption && barbeiroOption.dataset.nome ? barbeiroOption.dataset.nome : '-';
    var data = dataInput && dataInput.value ? formatarData(dataInput.value) : '-';
    var horario = horarioSelect && horarioSelect.value ? horarioSelect.value : '-';

    var elService = document.getElementById('summary-service');
    var elBarber = document.getElementById('summary-barber');
    var elDate = document.getElementById('summary-date');
    var elTime = document.getElementById('summary-time');
    var elPrice = document.getElementById('summary-price');

    if (elService) elService.textContent = servicoNome;
    if (elBarber) elBarber.textContent = barbeiroNome;
    if (elDate) elDate.textContent = data;
    if (elTime) elTime.textContent = horario;
    if (elPrice) elPrice.textContent = servicoPreco > 0 ? formatarPreco(servicoPreco) : '-';

    if (servicoSelect && servicoSelect.value && barbeiroSelect && barbeiroSelect.value && 
        dataInput && dataInput.value && horarioSelect && horarioSelect.value) {
        summaryDiv.classList.remove('hidden');
    } else {
        summaryDiv.classList.add('hidden');
    }
}

// ============================================
// DASHBOARD ADMIN / FUNCIONÁRIO
// ============================================

function renderDashboard() {
    if (!Auth.isStaff()) return;

    var dashboard = document.getElementById('dashboard');
    if (!dashboard) return;

    dashboard.classList.remove('hidden');

    var subtitle = document.getElementById('dashboard-subtitle');
    if (subtitle) {
        subtitle.textContent = Auth.isAdmin() ? 'Painel Administrativo' : 'Painel do Profissional';
    }

    atualizarEstatisticas();
    renderTabelaHoje();
    renderTabelaTodos();
    renderTabelaLucros();
    renderTabelaClientes();
    preencherFiltroBarbeiros();
}

function atualizarEstatisticas() {
    var hoje = getDataHoje();
    var agendamentosHoje = Agendamentos.listar({ data: hoje });
    var agendamentosConcluidos = agendamentosHoje.filter(function(a) { return a.status === 'concluido'; });
    var receitaHoje = agendamentosConcluidos.reduce(function(sum, a) { return sum + a.preco; }, 0);

    var amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    var dataAmanha = amanha.toISOString().split('T')[0];
    var proximos = Agendamentos.listar({}).filter(function(a) { 
        return a.data >= hoje && a.status === 'agendado'; 
    });

    var elTotalHoje = document.getElementById('stat-total-hoje');
    var elReceitaHoje = document.getElementById('stat-receita-hoje');
    var elClientesHoje = document.getElementById('stat-clientes-hoje');
    var elProximos = document.getElementById('stat-proximos');

    if (elTotalHoje) elTotalHoje.textContent = agendamentosHoje.length;
    if (elReceitaHoje) elReceitaHoje.textContent = formatarPreco(receitaHoje);
    if (elClientesHoje) elClientesHoje.textContent = agendamentosConcluidos.length;
    if (elProximos) elProximos.textContent = proximos.length;

    var dataHojeEl = document.getElementById('data-hoje');
    if (dataHojeEl) {
        var opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dataHojeEl.textContent = new Date().toLocaleDateString('pt-BR', opcoes);
    }
}

function renderTabelaHoje() {
    var tbody = document.getElementById('tabela-hoje');
    var emptyState = document.getElementById('empty-hoje');
    if (!tbody) return;

    var hoje = getDataHoje();
    var agendamentos = Agendamentos.listar({ data: hoje });

    if (agendamentos.length === 0) {
        tbody.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    tbody.innerHTML = agendamentos.map(function(a) {
        return '<tr>' +
            '<td><strong>' + a.horario + '</strong></td>' +
            '<td>' + a.clienteNome + '</td>' +
            '<td>' + a.servicoNome + '</td>' +
            '<td>' + a.barbeiroNome + '</td>' +
            '<td>' + formatarPreco(a.preco) + '</td>' +
            '<td>' + renderStatusBadge(a.status) + '</td>' +
            '<td>' +
                '<div class="table-actions">' +
                    (a.status === 'agendado' ? 
                        '<button class="btn-action-complete" onclick="marcarConcluido('' + a.id + '')" title="Marcar como concluído"><i class="fas fa-check"></i></button>' +
                        '<button class="btn-action-cancel" onclick="cancelarAgendamento('' + a.id + '')" title="Cancelar"><i class="fas fa-times"></i></button>' 
                        : '') +
                    '<button class="btn-action-delete" onclick="excluirAgendamento('' + a.id + '')" title="Excluir"><i class="fas fa-trash"></i></button>' +
                '</div>' +
            '</td>' +
        '</tr>';
    }).join('');
}

function renderTabelaTodos() {
    var tbody = document.getElementById('tabela-todos');
    var emptyState = document.getElementById('empty-todos');
    if (!tbody) return;

    var dataFiltro = document.getElementById('filtro-data');
    var barbeiroFiltro = document.getElementById('filtro-barbeiro');

    var filtros = {};
    if (dataFiltro && dataFiltro.value) filtros.data = dataFiltro.value;
    if (barbeiroFiltro && barbeiroFiltro.value) filtros.barbeiroId = barbeiroFiltro.value;

    var agendamentos = Agendamentos.listar(filtros);

    if (agendamentos.length === 0) {
        tbody.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    tbody.innerHTML = agendamentos.map(function(a) {
        return '<tr>' +
            '<td>' + formatarData(a.data) + '</td>' +
            '<td><strong>' + a.horario + '</strong></td>' +
            '<td>' + a.clienteNome + '</td>' +
            '<td>' + a.clienteTelefone + '</td>' +
            '<td>' + a.servicoNome + '</td>' +
            '<td>' + a.barbeiroNome + '</td>' +
            '<td>' + formatarPreco(a.preco) + '</td>' +
            '<td>' + renderStatusBadge(a.status) + '</td>' +
            '<td>' +
                '<div class="table-actions">' +
                    (a.status === 'agendado' ? 
                        '<button class="btn-action-complete" onclick="marcarConcluido('' + a.id + '')" title="Concluir"><i class="fas fa-check"></i></button>' +
                        '<button class="btn-action-cancel" onclick="cancelarAgendamento('' + a.id + '')" title="Cancelar"><i class="fas fa-times"></i></button>' 
                        : '') +
                    '<button class="btn-action-delete" onclick="excluirAgendamento('' + a.id + '')" title="Excluir"><i class="fas fa-trash"></i></button>' +
                '</div>' +
            '</td>' +
        '</tr>';
    }).join('');
}

function renderTabelaLucros() {
    var tbody = document.getElementById('tabela-lucros');
    if (!tbody) return;

    var elDataInicio = document.getElementById('lucro-data-inicio');
    var elDataFim = document.getElementById('lucro-data-fim');

    var dataInicio = elDataInicio && elDataInicio.value ? elDataInicio.value : getDataHoje();
    var dataFim = elDataFim && elDataFim.value ? elDataFim.value : getDataHoje();

    var lucros = Agendamentos.getLucrosPorBarbeiro(dataInicio, dataFim);

    var totalGeral = 0;
    var totalComissao = 0;

    tbody.innerHTML = BARBEIROS.map(function(b) {
        var l = lucros[b.id];
        totalGeral += l.total;
        totalComissao += l.comissao;
        return '<tr>' +
            '<td><strong>' + l.barbeiro + '</strong></td>' +
            '<td>' + l.quantidade + '</td>' +
            '<td>' + formatarPreco(l.total) + '</td>' +
            '<td>' + formatarPreco(l.comissao) + '</td>' +
            '<td><strong style="color: var(--primary)">' + formatarPreco(l.lucroBarbearia) + '</strong></td>' +
        '</tr>';
    }).join('');

    var elTotalGeral = document.getElementById('lucro-total-geral');
    var elTotalComissao = document.getElementById('lucro-total-comissao');
    var elTotalLiquido = document.getElementById('lucro-total-liquido');

    if (elTotalGeral) elTotalGeral.textContent = formatarPreco(totalGeral);
    if (elTotalComissao) elTotalComissao.textContent = formatarPreco(totalComissao);
    if (elTotalLiquido) elTotalLiquido.textContent = formatarPreco(totalGeral - totalComissao);
}

function renderTabelaClientes() {
    var tbody = document.getElementById('tabela-clientes');
    if (!tbody) return;

    var usuarios = Storage.get('usuarios') || [];
    var clientes = usuarios.filter(function(u) { return u.tipo === 'cliente'; });
    var agendamentos = Storage.get('agendamentos') || [];

    var buscaEl = document.getElementById('busca-cliente');
    var busca = buscaEl && buscaEl.value ? buscaEl.value.toLowerCase() : '';

    var clientesFiltrados = clientes.filter(function(c) {
        return c.nome.toLowerCase().indexOf(busca) !== -1 || 
            c.email.toLowerCase().indexOf(busca) !== -1 ||
            c.telefone.indexOf(busca) !== -1;
    });

    tbody.innerHTML = clientesFiltrados.map(function(c) {
        var agendamentosCliente = agendamentos.filter(function(a) { return a.clienteId === c.id; });
        var ultimoAgendamento = agendamentosCliente.length > 0 
            ? agendamentosCliente.sort(function(a, b) { return new Date(b.data) - new Date(a.data); })[0]
            : null;

        return '<tr>' +
            '<td><strong>' + c.nome + '</strong></td>' +
            '<td>' + c.telefone + '</td>' +
            '<td>' + c.email + '</td>' +
            '<td>' + agendamentosCliente.length + '</td>' +
            '<td>' + (ultimoAgendamento ? formatarData(ultimoAgendamento.data) : 'Nunca') + '</td>' +
        '</tr>';
    }).join('');
}

function renderStatusBadge(status) {
    var map = {
        'agendado': '<span class="status-badge status-agendado"><i class="fas fa-clock"></i> Agendado</span>',
        'concluido': '<span class="status-badge status-concluido"><i class="fas fa-check"></i> Concluído</span>',
        'cancelado': '<span class="status-badge status-cancelado"><i class="fas fa-times"></i> Cancelado</span>'
    };
    return map[status] || status;
}

function preencherFiltroBarbeiros() {
    var select = document.getElementById('filtro-barbeiro');
    if (!select) return;

    select.innerHTML = '<option value="">Todos os profissionais</option>' +
        BARBEIROS.map(function(b) {
            return '<option value="' + b.id + '">' + b.nome + '</option>';
        }).join('');
}

// ============================================
// MEUS AGENDAMENTOS (CLIENTE)
// ============================================

function renderMeusAgendamentos() {
    var container = document.getElementById('lista-meus-agendamentos');
    var emptyState = document.getElementById('empty-meus-agendamentos');
    if (!container) return;

    if (!Auth.usuarioAtual) {
        container.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    var agendamentos = Agendamentos.listar({ clienteId: Auth.usuarioAtual.id })
        .filter(function(a) { return a.status !== 'cancelado'; })
        .sort(function(a, b) {
            var dtA = new Date(a.data + 'T' + a.horario);
            var dtB = new Date(b.data + 'T' + b.horario);
            return dtB - dtA;
        });

    if (agendamentos.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    var meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

    container.innerHTML = agendamentos.map(function(a) {
        var data = new Date(a.data + 'T00:00:00');
        var dia = data.getDate();
        var mes = meses[data.getMonth()];
        var isPassado = new Date(a.data + 'T' + a.horario) < new Date();

        return '<div class="agendamento-card ' + (isPassado ? 'passado' : '') + '">' +
            '<div class="agendamento-date">' +
                '<div class="day">' + dia + '</div>' +
                '<div class="month">' + mes + '</div>' +
            '</div>' +
            '<div class="agendamento-info">' +
                '<h4>' + a.servicoNome + '</h4>' +
                '<p><i class="fas fa-clock" style="color: var(--primary)"></i> ' + a.horario + '</p>' +
                '<p><i class="fas fa-user-tie" style="color: var(--primary)"></i> ' + a.barbeiroNome + '</p>' +
                '<p class="agendamento-price">' + formatarPreco(a.preco) + '</p>' +
                (a.status === 'concluido' ? '<span class="status-badge status-concluido" style="margin-top:5px"><i class="fas fa-check"></i> Concluído</span>' : '') +
            '</div>' +
            '<div class="agendamento-actions">' +
                (!isPassado && a.status === 'agendado' ? 
                    '<button class="btn btn-sm btn-danger" onclick="cancelarMeuAgendamento('' + a.id + '')"><i class="fas fa-times"></i> Cancelar</button>' 
                    : '') +
            '</div>' +
        '</div>';
    }).join('');
}

// ============================================
// AÇÕES DO DASHBOARD
// ============================================

function marcarConcluido(id) {
    var result = Agendamentos.atualizarStatus(id, 'concluido');
    if (result.sucesso) {
        showToast('Agendamento marcado como concluído!', 'success');
        renderDashboard();
    }
}

function cancelarAgendamento(id) {
    if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return;
    var result = Agendamentos.atualizarStatus(id, 'cancelado');
    if (result.sucesso) {
        showToast('Agendamento cancelado!', 'success');
        renderDashboard();
    }
}

function excluirAgendamento(id) {
    if (!confirm('Tem certeza que deseja excluir este agendamento permanentemente?')) return;
    var result = Agendamentos.excluir(id);
    if (result.sucesso) {
        showToast('Agendamento excluído!', 'success');
        renderDashboard();
    }
}

function cancelarMeuAgendamento(id) {
    if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return;
    var result = Agendamentos.atualizarStatus(id, 'cancelado');
    if (result.sucesso) {
        showToast('Agendamento cancelado!', 'success');
        renderMeusAgendamentos();
    }
}

// ============================================
// INTERFACE DO USUÁRIO
// ============================================

function atualizarUIUsuario() {
    var navLogin = document.getElementById('nav-login');
    var navUser = document.getElementById('nav-user');
    var navDashboard = document.getElementById('nav-dashboard');
    var navAgendamento = document.getElementById('nav-agendamento');
    var userNameDisplay = document.getElementById('user-name-display');
    var agendamentoLoginMsg = document.getElementById('agendamento-login-msg');
    var agendamentoFormWrapper = document.getElementById('agendamento-form-wrapper');

    if (Auth.usuarioAtual) {
        if (navLogin) navLogin.classList.add('hidden');
        if (navUser) navUser.classList.remove('hidden');
        if (userNameDisplay) userNameDisplay.textContent = Auth.usuarioAtual.nome.split(' ')[0];

        if (Auth.isStaff()) {
            if (navDashboard) navDashboard.classList.remove('hidden');
            if (navAgendamento) navAgendamento.classList.add('hidden');
            renderDashboard();
        } else {
            if (navDashboard) navDashboard.classList.add('hidden');
            if (navAgendamento) navAgendamento.classList.remove('hidden');
        }

        if (agendamentoLoginMsg) agendamentoLoginMsg.classList.add('hidden');
        if (agendamentoFormWrapper) agendamentoFormWrapper.classList.remove('hidden');

        preencherDadosUsuario();
    } else {
        if (navLogin) navLogin.classList.remove('hidden');
        if (navUser) navUser.classList.add('hidden');
        if (navDashboard) navDashboard.classList.add('hidden');
        if (navAgendamento) navAgendamento.classList.remove('hidden');

        var dashboard = document.getElementById('dashboard');
        var meusAgendamentos = document.getElementById('meus-agendamentos');
        if (dashboard) dashboard.classList.add('hidden');
        if (meusAgendamentos) meusAgendamentos.classList.add('hidden');

        if (agendamentoLoginMsg) agendamentoLoginMsg.classList.remove('hidden');
        if (agendamentoFormWrapper) agendamentoFormWrapper.classList.add('hidden');
    }
}

function preencherDadosUsuario() {
    if (!Auth.usuarioAtual) return;

    var nameInput = document.getElementById('booking-name');
    var phoneInput = document.getElementById('booking-phone');
    var emailInput = document.getElementById('booking-email');

    if (nameInput) nameInput.value = Auth.usuarioAtual.nome;
    if (phoneInput) phoneInput.value = Auth.usuarioAtual.telefone || '';
    if (emailInput) emailInput.value = Auth.usuarioAtual.email;
}

// ============================================
// MODAL DE AUTENTICAÇÃO
// ============================================

function abrirModalAuth() {
    var modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function fecharModalAuth() {
    var modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('.auth-panel').forEach(function(p) { p.classList.remove('active'); });

    var tabEl = document.querySelector('.auth-tab[data-tab="' + tab + '"]');
    var panelEl = document.getElementById(tab + '-form');
    if (tabEl) tabEl.classList.add('active');
    if (panelEl) panelEl.classList.add('active');
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(message, type) {
    type = type || 'info';
    var toast = document.getElementById('toast');
    var toastMessage = document.getElementById('toast-message');
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.className = 'toast show ' + type;

    setTimeout(function() {
        toast.classList.remove('show');
    }, 4000);
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initStorage();
    Auth.checkSession();

    renderServicos();
    renderBarbeiros();
    preencherSelectServicos();
    preencherSelectBarbeiros();
    atualizarUIUsuario();

    // Header scroll effect
    var header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            if (header) header.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scrolled');
        }
    });

    // Hamburger menu
    var hamburger = document.getElementById('hamburger');
    var navbar = document.getElementById('navbar');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            if (navbar) navbar.classList.toggle('active');
        });
    }

    document.querySelectorAll('#navbar a').forEach(function(link) {
        link.addEventListener('click', function() {
            if (hamburger) hamburger.classList.remove('active');
            if (navbar) navbar.classList.remove('active');
        });
    });

    // Modal de autenticação
    var btnLoginNav = document.getElementById('btn-login-nav');
    var btnLoginAgendamento = document.getElementById('btn-login-agendamento');
    var modalClose = document.getElementById('modal-close');
    var modalOverlay = document.querySelector('.modal-overlay');

    if (btnLoginNav) {
        btnLoginNav.addEventListener('click', function(e) {
            e.preventDefault();
            abrirModalAuth();
        });
    }

    if (btnLoginAgendamento) {
        btnLoginAgendamento.addEventListener('click', function(e) {
            e.preventDefault();
            abrirModalAuth();
        });
    }

    if (modalClose) modalClose.addEventListener('click', fecharModalAuth);
    if (modalOverlay) modalOverlay.addEventListener('click', fecharModalAuth);

    // Tabs de autenticação
    document.querySelectorAll('.auth-tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
            switchAuthTab(tab.dataset.tab);
        });
    });

    // Login
    var formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            var email = document.getElementById('login-email').value;
            var senha = document.getElementById('login-password').value;

            var result = Auth.login(email, senha);
            if (result.sucesso) {
                showToast('Bem-vindo, ' + result.usuario.nome + '!', 'success');
                fecharModalAuth();
                atualizarUIUsuario();
                formLogin.reset();
            } else {
                showToast(result.erro, 'error');
            }
        });
    }

    // Registro
    var formRegister = document.getElementById('form-register');
    if (formRegister) {
        formRegister.addEventListener('submit', function(e) {
            e.preventDefault();
            var nome = document.getElementById('reg-name').value;
            var telefone = document.getElementById('reg-phone').value;
            var email = document.getElementById('reg-email').value;
            var senha = document.getElementById('reg-password').value;
            var confirmar = document.getElementById('reg-password-confirm').value;

            if (senha !== confirmar) {
                showToast('As senhas não coincidem!', 'error');
                return;
            }

            var result = Auth.registrar({ nome: nome, telefone: telefone, email: email, senha: senha });
            if (result.sucesso) {
                showToast('Conta criada com sucesso! Bem-vindo!', 'success');
                fecharModalAuth();
                atualizarUIUsuario();
                formRegister.reset();
            } else {
                showToast(result.erro, 'error');
            }
        });
    }

    // Visitante
    var btnGuest = document.getElementById('btn-guest');
    if (btnGuest) {
        btnGuest.addEventListener('click', function() {
            showToast('Você pode navegar como visitante, mas precisa fazer login para agendar.', 'info');
            fecharModalAuth();
        });
    }

    // Logout
    var btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function(e) {
            e.preventDefault();
            Auth.logout();
            showToast('Você saiu da conta.', 'info');
            atualizarUIUsuario();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Meus agendamentos
    var btnMeusAgendamentos = document.getElementById('btn-meus-agendamentos');
    if (btnMeusAgendamentos) {
        btnMeusAgendamentos.addEventListener('click', function(e) {
            e.preventDefault();
            var section = document.getElementById('meus-agendamentos');
            if (section) {
                section.classList.remove('hidden');
                renderMeusAgendamentos();
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Agendamento - atualizar horários
    var bookingDate = document.getElementById('booking-date');
    var bookingBarber = document.getElementById('booking-barber');
    var bookingService = document.getElementById('booking-service');
    var bookingTime = document.getElementById('booking-time');

    if (bookingDate) bookingDate.addEventListener('change', atualizarHorariosDisponiveis);
    if (bookingBarber) bookingBarber.addEventListener('change', atualizarHorariosDisponiveis);
    if (bookingService) bookingService.addEventListener('change', atualizarResumo);
    if (bookingTime) bookingTime.addEventListener('change', atualizarResumo);

    // Formulário de agendamento
    var bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!Auth.usuarioAtual) {
                showToast('Faça login para realizar um agendamento.', 'error');
                abrirModalAuth();
                return;
            }

            var servicoSelect = document.getElementById('booking-service');
            var barbeiroSelect = document.getElementById('booking-barber');
            var servicoOption = servicoSelect && servicoSelect.selectedOptions.length > 0 ? servicoSelect.selectedOptions[0] : null;
            var barbeiroOption = barbeiroSelect && barbeiroSelect.selectedOptions.length > 0 ? barbeiroSelect.selectedOptions[0] : null;

            var dados = {
                clienteId: Auth.usuarioAtual.id,
                clienteNome: document.getElementById('booking-name').value,
                clienteTelefone: document.getElementById('booking-phone').value,
                clienteEmail: document.getElementById('booking-email').value,
                servicoId: servicoSelect.value,
                servicoNome: servicoOption ? servicoOption.dataset.nome : '',
                barbeiroId: barbeiroSelect.value,
                barbeiroNome: barbeiroOption ? barbeiroOption.dataset.nome : '',
                data: document.getElementById('booking-date').value,
                horario: document.getElementById('booking-time').value,
                preco: servicoOption ? parseFloat(servicoOption.dataset.preco) : 0,
                observacoes: document.getElementById('booking-notes').value
            };

            var result = Agendamentos.criar(dados);
            if (result.sucesso) {
                bookingForm.classList.add('hidden');
                var confirmation = document.getElementById('bookingConfirmation');
                if (confirmation) confirmation.classList.remove('hidden');

                var details = document.getElementById('confirmationDetails');
                if (details) {
                    details.innerHTML = 
                        '<p><strong>Serviço:</strong> ' + dados.servicoNome + '</p>' +
                        '<p><strong>Profissional:</strong> ' + dados.barbeiroNome + '</p>' +
                        '<p><strong>Data:</strong> ' + formatarData(dados.data) + '</p>' +
                        '<p><strong>Horário:</strong> ' + dados.horario + '</p>' +
                        '<p><strong>Valor:</strong> ' + formatarPreco(dados.preco) + '</p>' +
                        '<p><strong>Cliente:</strong> ' + dados.clienteNome + '</p>';
                }

                showToast('Agendamento realizado com sucesso!', 'success');
            } else {
                showToast(result.erro, 'error');
            }
        });
    }

    // Novo agendamento
    var newBookingBtn = document.getElementById('newBookingBtn');
    if (newBookingBtn) {
        newBookingBtn.addEventListener('click', function() {
            var form = document.getElementById('bookingForm');
            var confirmation = document.getElementById('bookingConfirmation');
            var summary = document.getElementById('booking-summary');
            var timeSelect = document.getElementById('booking-time');
            var timeStatus = document.getElementById('time-status');

            if (form) {
                form.classList.remove('hidden');
                form.reset();
            }
            if (confirmation) confirmation.classList.add('hidden');
            if (summary) summary.classList.add('hidden');
            if (timeSelect) {
                timeSelect.innerHTML = '<option value="">Primeiro selecione a data</option>';
                timeSelect.disabled = true;
            }
            if (timeStatus) timeStatus.textContent = '';
            preencherDadosUsuario();
        });
    }

    // Formulário de contato
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            contactForm.classList.add('hidden');
            var contactSuccess = document.getElementById('contact-success');
            if (contactSuccess) contactSuccess.classList.remove('hidden');
            showToast('Mensagem enviada com sucesso!', 'success');
        });
    }

    var newContactBtn = document.getElementById('newContactBtn');
    if (newContactBtn) {
        newContactBtn.addEventListener('click', function() {
            var form = document.getElementById('contactForm');
            var success = document.getElementById('contact-success');
            if (form) {
                form.classList.remove('hidden');
                form.reset();
            }
            if (success) success.classList.add('hidden');
        });
    }

    // Dashboard tabs
    document.querySelectorAll('.dash-tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.dash-tab').forEach(function(t) { t.classList.remove('active'); });
            document.querySelectorAll('.dash-panel').forEach(function(p) { p.classList.remove('active'); });

            tab.classList.add('active');
            var panel = document.getElementById('dash-panel-' + tab.dataset.dashTab);
            if (panel) panel.classList.add('active');
        });
    });

    // Filtros do dashboard
    var btnFiltrar = document.getElementById('btn-filtrar');
    var btnRefresh = document.getElementById('btn-refresh');
    var btnCalcularLucros = document.getElementById('btn-calcular-lucros');
    var buscaCliente = document.getElementById('busca-cliente');

    if (btnFiltrar) btnFiltrar.addEventListener('click', renderTabelaTodos);
    if (btnRefresh) {
        btnRefresh.addEventListener('click', function() {
            atualizarEstatisticas();
            renderTabelaHoje();
            showToast('Dados atualizados!', 'success');
        });
    }
    if (btnCalcularLucros) btnCalcularLucros.addEventListener('click', renderTabelaLucros);
    if (buscaCliente) buscaCliente.addEventListener('input', renderTabelaClientes);

    // Configurar datas padrão nos filtros
    var hoje = getDataHoje();
    var inicioMes = new Date();
    inicioMes.setDate(1);

    var lucroDataInicio = document.getElementById('lucro-data-inicio');
    var lucroDataFim = document.getElementById('lucro-data-fim');
    if (lucroDataInicio) lucroDataInicio.value = inicioMes.toISOString().split('T')[0];
    if (lucroDataFim) lucroDataFim.value = hoje;

    // Data mínima para agendamento
    var bookingDateInput = document.getElementById('booking-date');
    if (bookingDateInput) bookingDateInput.min = hoje;

    // Hero agendar button
    var heroAgendar = document.getElementById('hero-agendar');
    if (heroAgendar) {
        heroAgendar.addEventListener('click', function(e) {
            if (!Auth.usuarioAtual) {
                e.preventDefault();
                abrirModalAuth();
            }
        });
    }

    // Scroll reveal
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .team-card, .info-card').forEach(function(el) {
        el.classList.add('reveal');
        observer.observe(el);
    });
});

// ============================================
// NAVEGAÇÃO SUAVE
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});