//factory functions set up and return the new object when you call the function

//todo items carry information about the todos
//'' works
const ToDoFactory = (title, description, dueDate, priority, notes) => {
    const getTitle = () => title;
    const getDescription  = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getNotes = () => notes;

   

    return {getTitle, getDescription, getDueDate, getPriority, getNotes,
        //setter needs to be declared in an object
        set priority(prio){ 
            priority = prio;
        }
    };
};
 
//projects carry name and a todo list
const ProjectsFactory = (title, toDoList) => {
    let toDoList = [];
    const getTitle = () => title;
    const getToDoList = () => toDoList;
    return {getTitle, getToDoList};
};

//manages a list of projects
const ProjectController = (() => {
    let projectList = [];
    const addProject = (title) => {
        projectList.push(title);
    };
    const getProjectList = () => projectList;

    return{addProject, getProjectList}
})();

//manages the todo-list for each project
const ToDoController = (() => {
    //add a todo to a project
    const addToDo = (todo, project) => {
        project.getToDoList().push(toDo);
    };

    const completeToDo = (toDo, project)=>{
        const index = project.getToDoList().findIndex((toDo)=> toDo);
        //removes from todo-list after complete
        project.getToDoList().splice(index, 1);
    };

    const changePriority = (toDo, project, priority)=>{
        //access setter of the todo
        const index = project.getToDoList().findIndex((toDo)=> toDo);
        //removes from todo-list after complete
        project.getToDoList()[index].priority = priority;
        
    };

    return{addToDo, completeToDo, changePriority}
})();

//first time loading site
const OnLoad = (() => {
    const defaultProject = ProjectsFactory("Default Project");
    const addDefaultProject = () => ProjectController.addProject(defaultProject);
    return {addDefaultProject};
})();



OnLoad.addDefaultProject();
const project2 = ProjectsFactory("Project 2");
const toDo1 = TodoFactory("Name", "Description", "DueDate", "Priority", "Notes");
//add a project to project list
ProjectController.addProject(project2);
//add todo to a project
ToDoController.addToDo(toDo1, project2);
console.log(ProjectController.getProjectList());
//get title of todo in project 2
console.log(project2.getToDoList()[0].getTitle());


const DomManipulator = (() => {
    //load initial sidebar dom with projects
    const loadSideBarDom = () => {
        const sidebar = document.querySelector('div#sidebar');
        const addProjectButton = document.createElement('button');

        addProjectButton.setAttribute('id','add-project-button');
        addProjectButton.textContent = "Add Project";
    
        content.appendChild(addToDoButton);

    };
   //load content dom with todos
    const loadContentDom = () => {
        const content = document.querySelector('div#content');
        const addToDoButton = document.createElement('button');

        addToDoButton.setAttribute('id','add-todo-button');
        addToDoButton.textContent = "Add To-Do";

        sidebar.appendChild(addProjectButton);

        
    };

   const newProjectDom = (title) => {
        const project = document.createElement('div');
        const sidebar = document.querySelector('div#sidebar');
        project.classList.add('project');
        project.textContent = title;
        sidebar.appendChild(project);
   };

   const newToDoDom = (title, description, dueDate, priority, notes) => {
        const toDo = document.createElement('div');
        const toDoTitle = document.createElement('p');
        const toDoDescription = document.createElement('p');
        const toDoDueDate = document.createElement('p');
        const toDoPriority = document.createElement('p');
        const toDoNotes = document.createElement('p');

        toDo.classList.add('to-do');

        toDoTitle.textContent = title;
        toDoDescription.textContent = description;
        toDoDueDate.textContent = dueDate;
        toDoPriority.textContent = priority; 
        toDoNotes.textContent = notes; 

        const content = document.querySelector('div#content');

        toDo.appendChild(toDoTitle);
        toDo.appendChild(toDoDescription);
        toDo.appendChild(toDoDueDate);
        toDo.appendChild(toDoPriority);
        toDo.appendChild(toDoNotes);
        content.appendChild(toDo);

   };

   const openProjectForm = () => {
        const form = document.createElement('form');
        const body = document.querySelector('body');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const submit = document.createElement('button');
        const close = document.createElement('button');
    
        form.setAttribute('id', 'add-project-form');
        form.setAttribute('onsubmit', 'return false');
        label.classList('form-element');
        label.setAttribute('for', 'title');
        label.textContent = "Project Name";
        input.classList('form-element');
        input.setAttribute('type','text');
        input.setAttribute('name','title');
        input.required = true;
        submit.classList('form-element');
        submit.setAttribute('type', 'submit');
        submit.setAttribute('id', 'submit-project');
        submit.textContent = "Add Project";
        close.classList('form-element');
        close.setAttribute('type', 'submit');
        close.setAttribute('id', 'close-project-form');
        close.textContent = "Cancel";

        form.appendChild(label);
        form.appendChild(input);
        body.appendChild(form);
   }

   const closeForm = (form) => {
        const body = document.querySelector('body');
        body.removeChild(form);
   };

   const openToDoForm = (title, description, dueDate, priority, notes) => {
    const form = document.createElement('form');
    const body = document.querySelector('body');
    const labelTitle = document.createElement('label');
    const inputTitle = document.createElement('input');
    const labelDescription = document.createElement('label');
    const inputDescription = document.createElement('input');
    const labelDueDate = document.createElement('label');
    const inputDueDate = document.createElement('input');
    const labelPriorityLow = document.createElement('label');
    const inputPriorityLow = document.createElement('input');
    const labelPriorityMedium = document.createElement('label');
    const inputPriorityMedium = document.createElement('input');
    const labelPriorityHigh = document.createElement('label');
    const inputPriorityHigh = document.createElement('input');
    const labelNotes = document.createElement('label');
    const inputNotes = document.createElement('input');
    const submit = document.createElement('button');
    const close = document.createElement('button');

    form.setAttribute('id', 'add-to-do-form');
    form.setAttribute('onsubmit', 'return false');

    labelTitle.classList('form-element');
    labelTitle.setAttribute('for', 'title');
    labelTitle.textContent = "Title";
    inputTitle.classList('form-element');
    inputTitle.setAttribute('type','text');
    inputTitle.setAttribute('name','title');
    inputTitle.required = true;

    labelDescription.classList('form-element');
    labelDescription.setAttribute('for', 'description');
    labelDescription.textContent = "Description";
    inputDescription.classList('form-element');
    inputDescription.setAttribute('type','text');
    inputDescription.setAttribute('name','description');

    labelDueDate.classList('form-element');
    labelDueDate.setAttribute('for', 'due-date');
    labelDueDate.textContent = "Due Date";
    inputDueDate.classList('form-element');
    inputDueDate.setAttribute('type','date');
    inputDueDate.setAttribute('name','due-date');

    //radio buttons
    labelPriorityLow.classList('form-element');
    labelPriorityLow.setAttribute('for', 'priority');
    labelPriorityLow.textContent = "Low Priority";
    inputPriorityLow.classList('form-element');
    inputPriorityLow.setAttribute('type','radio');
    inputPriorityLow.setAttribute('name','priority');
    inputPriorityLow.setAttribute('value','low-priority');

    labelPriorityMedium.classList('form-element');
    labelPriorityMedium.setAttribute('for', 'priority');
    labelPriorityMedium.textContent = "Medium Priority";
    inputPriorityMedium.classList('form-element');
    inputPriorityMedium.setAttribute('type','radio');
    inputPriorityMedium.setAttribute('name','priority');
    inputPriorityMedium.setAttribute('name','medium-priority');

    labelPriorityHigh.classList('form-element');
    labelPriorityHigh.setAttribute('for', 'priority');
    labelPriorityHigh.textContent = "High Priority";
    inputPriorityHigh.classList('form-element');
    inputPriorityHigh.setAttribute('type','radio');
    inputPriorityHigh.setAttribute('name','priority');
    inputPriorityHigh.setAttribute('name','high-priority');

    labelNotes.classList('form-element');
    labelNotes.setAttribute('for', 'notes');
    labelNotes.textContent = "Notes";
    inputNotes.classList('form-element');
    inputNotes.setAttribute('type','text');
    inputNotes.setAttribute('name','notes');

    submit.classList('form-element');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('id', 'submit-to-do');
    submit.textContent = "Add Project";
    close.classList('form-element');
    close.setAttribute('type', 'submit');
    close.setAttribute('id', 'close-to-do-form');
    close.textContent = "Cancel";

    form.appendChild(labelTitle);
    form.appendChild(inputTitle);
    form.appendChild(labelDescription);
    form.appendChild(inputDescription);
    form.appendChild(labelDueDate);
    form.appendChild(inputDueDate);
    form.appendChild(labelPriorityLow);
    form.appendChild(inputPriorityLow);
    form.appendChild(labelPriorityMedium);
    form.appendChild(inputPriorityMedium);
    form.appendChild(labelPriorityHigh);
    form.appendChild(inputPriorityHigh);
    form.appendChild(labelPriorityNotes);
    form.appendChild(inputPriorityNotes);
    body.appendChild(form);
   };

    
})();



const SiteObserver = (() => {
    //Observes and facilitate logic through event listeners
    //Handler?
    //add project button
    const observeProjectButton = () => {
        const addProjectButton = document.querySelector('button#add-project-button');
        addProjectButton.addEventListener('click', () => {
            //add form to dom
            DomManipulator.openProjectForm();
            _observeProjectForm();
        });
            

    };
    

    const observeToDoButton = () => {
        const addToDoButton = document.querySelector('button#add-todo-button');
        addToDoButton.addEventListener('click', () => {
            DomManipulator.openToDoForm();
        });
    };

    const _observeProjectForm = () => {
        const submitForm = document.querySelector('form#project-form');
        submitForm.addEventListener('submit', () => {
            const title = submitForm.elements['title'].value;
            ProjectController.addProject(title);
            DomManipulator.newProjectDom(title);

        });
    };

    const _observeToDoForm = () => {
        const submitForm = document.querySelector('form#to-do-form');
        submitForm.addEventListener('submit', () => {
            const title = submitForm.elements['title'].value;
            const description = submitForm.elements['description'].value;
            const dueDate = submitForm.elements['due-date'].value;
            const priority = submitForm.elements['priority'].value;
            const notes = submitForm.elements['notes'].value;
            ToDoController.addToDo(title, description, dueDate, priority, notes);
            DomManipulator.newToDoDom(title, description, dueDate, priority, notes);

        });
    };
    

})();
//backlog:

//set todos as complete +1
//change todo priority +1
//change name etc.

//DOM modules