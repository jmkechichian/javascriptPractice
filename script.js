document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-img');
    const todosContainer = document.querySelector('.todos-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const displayFiltersBtn = document.getElementById('display-filters');
    const filtersContainer = document.querySelector('.controls');


    // Ocultar filtros al inicio
    filtersContainer.style.display = 'none';

    // Event listener para el botón de mostrar/ocultar filtros
    displayFiltersBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del botón en el formulario
        filtersContainer.style.display = filtersContainer.style.display === 'none' ? 'block' : 'none';
    
        // Cambiar ícono según el estado
        if (filtersContainer.style.display === 'block') {
            displayFiltersBtn.classList.remove('fa-filter');
            displayFiltersBtn.classList.add('fa-times');
        } else {
            displayFiltersBtn.classList.remove('fa-times');
            displayFiltersBtn.classList.add('fa-filter');
        }
    });

    
    // Estado de la aplicación
    const state = {
        currentFilter: 'all',
        searchTerm: ''
    };

    const toggleEmptyState = () => {
        const visibleTasks = document.querySelectorAll('li:not([style*="display: none"])');
        emptyImage.style.display = visibleTasks.length === 0 ? 'block' : 'none';
        todosContainer.style.width = visibleTasks.length > 0 ? '100%' : '50%';
    };

    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if(!taskText){
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span class="task-text">${taskText}</span>
        <div class="task-buttons">
            <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const taskSpan = li.querySelector('.task-text');
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        const editTask = () => {
            if(checkbox.checked) return;
            
            const currentText = taskSpan.textContent;
            const newText = prompt('Editar tarea:', currentText);
            
            if(newText !== null && newText.trim() !== '') {
                taskSpan.textContent = newText.trim();
                filterTasks(); // Re-filtramos después de editar
            }
        };

        const deleteTask = () => {
            li.remove();
            toggleEmptyState();
        };

        editBtn.addEventListener('click', editTask);
        deleteBtn.addEventListener('click', deleteTask);
        
        checkbox.addEventListener('change', () => {
            taskSpan.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            editBtn.disabled = checkbox.checked;
            editBtn.style.opacity = checkbox.checked ? '0.5' : '1';
            filterTasks(); // Re-filtramos cuando cambia el estado
        });

        taskList.appendChild(li);
        taskInput.value = '';
        filterTasks(); // Filtramos la nueva tarea
    };

    // Función para filtrar tareas
    const filterTasks = () => {
        const tasks = document.querySelectorAll('#task-list li');
        
        tasks.forEach(task => {
            const text = task.querySelector('.task-text').textContent.toLowerCase();
            const isCompleted = task.querySelector('.checkbox').checked;
            let shouldShow = true;
            
            // Aplicar filtro de estado
            if (state.currentFilter === 'active' && isCompleted) {
                shouldShow = false;
            } else if (state.currentFilter === 'completed' && !isCompleted) {
                shouldShow = false;
            }
            
            // Aplicar filtro de búsqueda
            if (state.searchTerm && !text.includes(state.searchTerm.toLowerCase())) {
                shouldShow = false;
            }
            
            task.style.display = shouldShow ? 'flex' : 'none';
        });
        
        toggleEmptyState();
    };

    // Event listeners para los filtros
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            state.currentFilter = button.dataset.filter;
            filterTasks();
        });
    });

    // Event listener para la búsqueda
    searchInput.addEventListener('input', (e) => {
        state.searchTerm = e.target.value.trim();
        filterTasks();
    });

    // Event listeners principales
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter'){
            addTask(e);
        }
    });

    // Inicialización
    filterButtons[0].classList.add('active'); // Activar "Todas" por defecto
    toggleEmptyState();
});