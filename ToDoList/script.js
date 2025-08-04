// =============================================
// CONSTANTES Y VARIABLES GLOBALES
// =============================================
const state = {
    currentFilter: 'all',
    searchTerm: ''
};

// =============================================
// FUNCIONES DE UTILIDAD
// =============================================

// Función para mostrar notificaciones Toast
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-xmark' : 'fa-circle-info'}"></i>
        ${message}
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Función para actualizar el contador de tareas
const updateTaskCounter = () => {
    const totalTasks = document.querySelectorAll('#task-list li').length;
    const completedTasks = document.querySelectorAll('#task-list li .checkbox:checked').length;
    const taskCounter = document.querySelector('.task-counter');

    taskCounter.classList.toggle('visible', totalTasks > 0);
    
    if (totalTasks > 0) {
        document.getElementById('completed-count').textContent = completedTasks;
        document.getElementById('total-count').textContent = totalTasks;
        
        const progressPercentage = (completedTasks / totalTasks) * 100;
        const progressBarEl = document.querySelector('.progress');
        progressBarEl.style.width = `${progressPercentage}%`;
        progressBarEl.style.background = completedTasks === totalTasks ? '#4CAF50' : 'linear-gradient(90deg, #ff6f91, #4CAF50)';
    }
};

// Función para alternar estado vacío
const toggleEmptyState = () => {
    const visibleTasks = document.querySelectorAll('li:not([style*="display: none"])');
    const emptyImage = document.querySelector('.empty-img');
    const todosContainer = document.querySelector('.todos-container');
    
    emptyImage.style.display = visibleTasks.length === 0 ? 'block' : 'none';
    todosContainer.style.width = visibleTasks.length > 0 ? '100%' : '50%';
};

// =============================================
// FUNCIONES PRINCIPALES
// =============================================

// Función para filtrar tareas
const filterTasks = () => {
    const tasks = document.querySelectorAll('#task-list li');
    
    tasks.forEach(task => {
        const text = task.querySelector('.task-text').textContent.toLowerCase();
        const isCompleted = task.querySelector('.checkbox').checked;
        let shouldShow = true;
        
        // Aplicar filtro de estado
        if (state.currentFilter === 'active' && isCompleted) shouldShow = false;
        else if (state.currentFilter === 'completed' && !isCompleted) shouldShow = false;
        
        // Aplicar filtro de búsqueda
        if (state.searchTerm && !text.includes(state.searchTerm.toLowerCase())) {
            shouldShow = false;
        }
        
        task.style.display = shouldShow ? 'flex' : 'none';
    });
    
    toggleEmptyState();
    updateTaskCounter();
};

// Función para agregar tarea
const addTask = (event) => {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    
    if (!taskText) return;

    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span class="task-text">${taskText}</span>
        <div class="task-buttons">
            <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

    const setupTaskEvents = (li) => {
        const checkbox = li.querySelector('.checkbox');
        const taskSpan = li.querySelector('.task-text');
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        const editTask = () => {
            if (checkbox.checked) return;
            const newText = prompt('Editar tarea:', taskSpan.textContent);
            if (newText !== null && newText.trim() !== '') {
                taskSpan.textContent = newText.trim();
                filterTasks();
            }
        };

        const deleteTask = () => {
            li.remove();
            updateTaskCounter();
            toggleEmptyState();
            showToast('Tarea eliminada', 'error');
        };

        editBtn.addEventListener('click', editTask);
        deleteBtn.addEventListener('click', deleteTask);
        
        checkbox.addEventListener('change', () => {
            taskSpan.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            editBtn.disabled = checkbox.checked;
            editBtn.style.opacity = checkbox.checked ? '0.5' : '1';
            filterTasks();
        });
    };

    setupTaskEvents(li);
    document.getElementById('task-list').appendChild(li);
    
    taskInput.value = '';
    filterTasks();
    updateTaskCounter();
    showToast('Tarea agregada correctamente', 'success');
};

// =============================================
// INICIALIZACIÓN Y EVENT LISTENERS
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const displayFiltersBtn = document.getElementById('display-filters');
    const filtersContainer = document.querySelector('.controls');

    // Configuración inicial
    filtersContainer.style.display = 'none';
    filterButtons[0].classList.add('active');
    toggleEmptyState();
    updateTaskCounter();

    // Evento para mostrar/ocultar filtros
    displayFiltersBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isVisible = filtersContainer.style.display === 'block';
        filtersContainer.style.display = isVisible ? 'none' : 'block';
        
        displayFiltersBtn.classList.toggle('fa-times', !isVisible);
        displayFiltersBtn.classList.toggle('fa-filter', isVisible);
    });

    // Event listeners para filtros
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            state.currentFilter = button.dataset.filter;
            filterTasks();
        });
    });

    // Event listener para búsqueda
    searchInput.addEventListener('input', (e) => {
        state.searchTerm = e.target.value.trim();
        filterTasks();
    });

    // Event listeners principales
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask(e);
    });
});    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    