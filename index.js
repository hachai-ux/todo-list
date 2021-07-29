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
const ProjectsFactory = (title) => {
    let toDoList = [];
    const getTitle = () => title;
    const getToDoList = () => toDoList;
    return {getTitle, getToDoList};
};

//manages a list of projects
const ProjectController = (() => {
    let projectList = [];
    const addProject = (project) => {
        projectList.push(project);
    };
    const getProjectList = () => projectList;

    return{addProject, getProjectList}
})();


//manages the todo-list for each project
const ToDoController = (() => {
    //add a todo to a project
    const addToDo = (toDo, project) => {
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




const DomManipulator = (() => {
    //load initial sidebar dom with projects
    const loadProjectButton = () => {
        const sidebar = document.querySelector('div#sidebar');
        const addProjectButton = document.createElement('button');

        addProjectButton.setAttribute('id','add-project-button');
        addProjectButton.textContent = "Add Project";
    
        sidebar.appendChild(addProjectButton);

    };
   //load content dom with todos
    const loadToDoButton = () => {
        const content = document.querySelector('div#content');
        const addToDoButton = document.createElement('button');

        addToDoButton.setAttribute('id','add-todo-button');
        addToDoButton.textContent = "Add To-Do";

        content.appendChild(addToDoButton);

        
    };

    const loadProjectList = () => {
        const projectList = document.createElement('div');
        const sidebar = document.querySelector('div#sidebar');
        projectList.setAttribute('id', 'project-list');
        projectList.textContent = "Projects"

        sidebar.appendChild(projectList);
        
    };


   const newProjectDom = (title) => {
        const project = document.createElement('button');
        const projectList = document.querySelector('div#project-list');
        project.classList.add('project');
        //project.setAttribute('id', `${title}-project-title`);
        project.textContent = title;
        projectList.appendChild(project);

        return project;

   };

   const _newToDoDom = (title, dueDate) => {
        //get the right to-do list for the right project then append the element to that object.
        //only add to-do to dom if that to-do list is loaded

        /*
        //code with all elements
        const toDoList = document.querySelector('div.to-do-list'); //selects the first loaded to-do list
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
        toDoList.appendChild(toDo);
        */
       //code showing only title

       const toDoList = document.querySelector('div.to-do-list'); //selects the first loaded to-do list
       const toDo = document.createElement('button');
       const toDoTitle = document.createElement('p');
       const toDoDueDate = document.createElement('p');
 

       toDo.classList.add('to-do');

       toDoTitle.textContent = title;

       if(dueDate !== ''){
        toDoDueDate.textContent = 'Due: ' + dueDate;
       };
    


       toDo.appendChild(toDoTitle);
       toDo.appendChild(toDoDueDate);
       toDoList.appendChild(toDo);

       return toDo;
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
        label.classList.add('form-element');
        label.setAttribute('for', 'title');
        label.textContent = "Project Name";
        input.classList.add('form-element');
        input.setAttribute('type','text');
        input.setAttribute('name','title');
        input.required = true;
        submit.classList.add('form-element');
        submit.setAttribute('type', 'submit');
        submit.setAttribute('id', 'submit-project');
        submit.textContent = "Add Project";
        close.classList.add('form-element');
        close.setAttribute('type', 'button');
        close.setAttribute('id', 'close-project-form');
        close.textContent = "Cancel";

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(submit);
        form.appendChild(close);
        body.appendChild(form);
   }

   const closeForm = (form) => {
        const body = document.querySelector('body');
        body.removeChild(form);
   };

   const openToDoForm = () => {
    const form = document.createElement('form');
    const body = document.querySelector('body');
    const labelTitle = document.createElement('label');
    const inputTitle = document.createElement('input');
    const labelDescription = document.createElement('label');
    const inputDescription = document.createElement('input');
    const labelDueDate = document.createElement('label');
    const inputDueDate = document.createElement('input');
    const labelPriorityNone = document.createElement('label');
    const inputPriorityNone = document.createElement('input');
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

    labelTitle.classList.add('form-element');
    labelTitle.setAttribute('for', 'title');
    labelTitle.textContent = "Title";
    inputTitle.classList.add('form-element');
    inputTitle.setAttribute('type','text');
    inputTitle.setAttribute('name','title');
    inputTitle.required = true;

    labelDescription.classList.add('form-element');
    labelDescription.setAttribute('for', 'description');
    labelDescription.textContent = "Description";
    inputDescription.classList.add('form-element');
    inputDescription.setAttribute('type','text');
    inputDescription.setAttribute('name','description');

    labelDueDate.classList.add('form-element');
    labelDueDate.setAttribute('for', 'due-date');
    labelDueDate.textContent = "Due Date";
    inputDueDate.classList.add('form-element');
    inputDueDate.setAttribute('type','date');
    inputDueDate.setAttribute('name','due-date');

    //radio buttons
    labelPriorityNone.classList.add('form-element');
    labelPriorityNone.setAttribute('for', 'priority');
    labelPriorityNone.textContent = "No Priority";
    inputPriorityNone.classList.add('form-element');
    inputPriorityNone.setAttribute('type','radio');
    inputPriorityNone.setAttribute('name','priority');
    inputPriorityNone.setAttribute('value','');

    labelPriorityLow.classList.add('form-element');
    labelPriorityLow.setAttribute('for', 'priority');
    labelPriorityLow.textContent = "Low Priority";
    inputPriorityLow.classList.add('form-element');
    inputPriorityLow.setAttribute('type','radio');
    inputPriorityLow.setAttribute('name','priority');
    inputPriorityLow.setAttribute('value','low-priority');

    labelPriorityMedium.classList.add('form-element');
    labelPriorityMedium.setAttribute('for', 'priority');
    labelPriorityMedium.textContent = "Medium Priority";
    inputPriorityMedium.classList.add('form-element');
    inputPriorityMedium.setAttribute('type','radio');
    inputPriorityMedium.setAttribute('name','priority');
    inputPriorityMedium.setAttribute('name','medium-priority');

    labelPriorityHigh.classList.add('form-element');
    labelPriorityHigh.setAttribute('for', 'priority');
    labelPriorityHigh.textContent = "High Priority";
    inputPriorityHigh.classList.add('form-element');
    inputPriorityHigh.setAttribute('type','radio');
    inputPriorityHigh.setAttribute('name','priority');
    inputPriorityHigh.setAttribute('name','high-priority');

    labelNotes.classList.add('form-element');
    labelNotes.setAttribute('for', 'notes');
    labelNotes.textContent = "Notes";
    inputNotes.classList.add('form-element');
    inputNotes.setAttribute('type','text');
    inputNotes.setAttribute('name','notes');

    submit.classList.add('form-element');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('id', 'submit-to-do');
    submit.textContent = "Add To-Do";
    close.classList.add('form-element');
    close.setAttribute('type', 'button');
    close.setAttribute('id', 'close-to-do-form');
    close.textContent = "Cancel";

    form.appendChild(labelTitle);
    form.appendChild(inputTitle);
    form.appendChild(labelDescription);
    form.appendChild(inputDescription);
    form.appendChild(labelDueDate);
    form.appendChild(inputDueDate);
    form.appendChild(labelPriorityNone);
    form.appendChild(inputPriorityNone);
    form.appendChild(labelPriorityLow);
    form.appendChild(inputPriorityLow);
    form.appendChild(labelPriorityMedium);
    form.appendChild(inputPriorityMedium);
    form.appendChild(labelPriorityHigh);
    form.appendChild(inputPriorityHigh);
    form.appendChild(labelNotes);
    form.appendChild(inputNotes);
    form.appendChild(submit);
    form.appendChild(close);
    body.appendChild(form);
   };

   const loadToDoList = (toDoList) => {
        //to-do-list div
        const toDoListDom = document.createElement('div');
        const content = document.querySelector('div#content');
        toDoListDom.classList.add('to-do-list');
        toDoListDom.textContent = "To-Dos";
        const toDoDomArray = [];

        content.appendChild(toDoListDom);
    
        //get todos associated with the project
        //load todo dom
        toDoList.forEach((toDo) => {
            const title = toDo.getTitle();
            const description = toDo.getDescription();
            const dueDate = toDo.getDueDate();
            const priority = toDo.getPriority();
            const notes = toDo.getNotes();
            const toDoDom = _newToDoDom(title, dueDate);
            toDoDomArray.push(toDoDom);
        });

        return toDoDomArray;
   };

   const clearToDoContent = () => {
        const content = document.querySelector('div#content');
        const toDoListDom = document.querySelector('div.to-do-list');
        const addToDoButton = document.querySelector('button#add-todo-button');

        if(toDoListDom !== null){
            content.removeChild(toDoListDom);
        };
        if(addToDoButton!== null){
            content.removeChild(addToDoButton);
        };
        
   };
    
   return {loadProjectButton, loadToDoButton, loadProjectList, newProjectDom, openProjectForm, closeForm, openToDoForm, loadToDoList, clearToDoContent};
})();



const SiteFacilitator = (() => {
    const domModelProjectMap = new Map();
    const domModelToDoMap = new Map();
    //Observes and facilitate logic through event listeners
    //Handler?
    //add project button
    const observeProjectButton = () => {
        const addProjectButton = document.querySelector('button#add-project-button');
        
        addProjectButton.addEventListener('click', () => {
            //add form to dom
            const existingForm = document.querySelector('form#add-project-form');
            if (existingForm === null){
            DomManipulator.openProjectForm();
            _observeProjectForm();
            };
        });
        
            

    };
    

    const _observeToDoButton = (project) => {
        const addToDoButton = document.querySelector('button#add-todo-button');
        addToDoButton.addEventListener('click', () => {
            const existingForm = document.querySelector('form#add-to-do-form');
            console.log(existingForm);
            if(existingForm === null){
            DomManipulator.openToDoForm();
            _observeToDoForm(project);
            };
        });
    };

    const createProject = (title) => {
            const project = ProjectsFactory(title);
            //add project to project list
            ProjectController.addProject(project);
            const projectDom = DomManipulator.newProjectDom(title);
            //associate project dom to project
            _domModelProjectAssociator(projectDom, project);
            _observeProjectButtons();
    }

    const _observeProjectForm = () => {
        const submitForm = document.querySelector('form#add-project-form');
        const closeButton = document.querySelector('button#close-project-form');
        submitForm.addEventListener('submit', () => {
            const title = submitForm.elements['title'].value;
            createProject(title);
            DomManipulator.closeForm(submitForm);

        });
        closeButton.addEventListener('click', () => {
            DomManipulator.closeForm(submitForm);
        })
    };

    const _observeToDoForm = (project) => {
        const submitForm = document.querySelector('form#add-to-do-form');
        const closeButton = document.querySelector('button#close-to-do-form');
        submitForm.addEventListener('submit', () => {
            const title = submitForm.elements['title'].value;
            const description = submitForm.elements['description'].value;
            const dueDate = submitForm.elements['due-date'].value;
            const priority = submitForm.elements['priority'].value;
            const notes = submitForm.elements['notes'].value;
            const toDo = ToDoFactory(title, description, dueDate, priority, notes);
            //current open project to-dos
            ToDoController.addToDo(toDo, project);
            _loadToDoContent(project);
            DomManipulator.closeForm(submitForm);
            

        });
        closeButton.addEventListener('click', () => {
            DomManipulator.closeForm(submitForm);
            
        });
    };

    const _loadToDoContent = (project) => {
            const toDoList = project.getToDoList();
            DomManipulator.clearToDoContent();
            DomManipulator.loadToDoButton();
            toDoDomArray = DomManipulator.loadToDoList(toDoList);
            _domModelToDoAssociator(toDoDomArray, toDoList);
            _observeToDoButton(project);
            _observeToDoListButtons();
       
    };

    const _observeToDoListButtons = () => {
        const toDoButtons = document.querySelectorAll('button.to-do');
        
        toDoButtons.forEach((toDoButton)=>{
           
            function callbackViewToDoModal(e){
                const toDo = domModelToDoMap.get(e.target);
                console.log('this works');
                _openToDoModal(toDo);
                
            };
            toDoButton.addEventListener('click', callbackViewToDoModal);
        });
    };

    const _openToDoModal = (toDo) => {
        const body = document.querySelector('body');
        const modal = document.createElement('div');
        modal.setAttribute('id', 'to-do-modal')
        modal.classList.add('modal');

        const form = document.createElement('form');
        form.classList.add('form');
        form.setAttribute('id', 'edit-todo');
        form.setAttribute('onsubmit', 'return false');

        /*
        //x-button
        const x = document.createElement('span');
        x.classList.add('close');
        x.textContent = '&times;';
        */

        const title = toDo.getTitle();
        const description = toDo.getDescription();
        const dueDate = toDo.getDueDate();
        const priority = toDo.getPriority(); 
        const notes = toDo.getNotes(); 

        const labelTitle = document.createElement('label');
        const inputTitle = document.createElement('input');
        const labelDescription = document.createElement('label');
        const inputDescription = document.createElement('input');
        const labelDueDate = document.createElement('label');
        const inputDueDate = document.createElement('input');
        const labelPriorityNone = document.createElement('label');
        const inputPriorityNone = document.createElement('input');
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

        labelTitle.classList.add('form-element');
        labelTitle.setAttribute('for', 'title');
        labelTitle.textContent = "Title";
        inputTitle.classList.add('form-element');
        inputTitle.setAttribute('type','text');
        inputTitle.setAttribute('name','title');
        inputTitle.setAttribute('value', title);

        labelDescription.classList.add('form-element');
        labelDescription.setAttribute('for', 'description');
        labelDescription.textContent = "Description";
        inputDescription.classList.add('form-element');
        inputDescription.setAttribute('type','text');
        inputDescription.setAttribute('name','description');
        inputDescription.setAttribute('value', description);

        labelDueDate.classList.add('form-element');
        labelDueDate.setAttribute('for', 'due-date');
        labelDueDate.textContent = "Due Date";
        inputDueDate.classList.add('form-element');
        inputDueDate.setAttribute('type','date');
        inputDueDate.setAttribute('name','due-date');
        inputDueDate.setAttribute('value', dueDate);

        //radio buttons
        labelPriorityNone.classList.add('form-element');
        labelPriorityNone.setAttribute('for', 'priority');
        labelPriorityNone.textContent = "No Priority";
        inputPriorityNone.classList.add('form-element');
        inputPriorityNone.setAttribute('type','radio');
        inputPriorityNone.setAttribute('name','priority');
        inputPriorityNone.setAttribute('value','');

        labelPriorityLow.classList.add('form-element');
        labelPriorityLow.setAttribute('for', 'priority');
        labelPriorityLow.textContent = "Low Priority";
        inputPriorityLow.classList.add('form-element');
        inputPriorityLow.setAttribute('type','radio');
        inputPriorityLow.setAttribute('name','priority');
        inputPriorityLow.setAttribute('value','low-priority');

        labelPriorityMedium.classList.add('form-element');
        labelPriorityMedium.setAttribute('for', 'priority');
        labelPriorityMedium.textContent = "Medium Priority";
        inputPriorityMedium.classList.add('form-element');
        inputPriorityMedium.setAttribute('type','radio');
        inputPriorityMedium.setAttribute('name','priority');
        inputPriorityMedium.setAttribute('name','medium-priority');

        labelPriorityHigh.classList.add('form-element');
        labelPriorityHigh.setAttribute('for', 'priority');
        labelPriorityHigh.textContent = "High Priority";
        inputPriorityHigh.classList.add('form-element');
        inputPriorityHigh.setAttribute('type','radio');
        inputPriorityHigh.setAttribute('name','priority');
        inputPriorityHigh.setAttribute('name','high-priority');

        switch (priority) {
            case "":
              inputPriorityNone.required = true;
              break;
            case "low-priority":
              inputPriorityLow.required = true;
              break;
            case "medium-priority":
              inputPriorityMedium.required = true;
              break;
            case "high-priority":
              inputPriorityHigh.required = true;
              break;
          };
          
        labelNotes.classList.add('form-element');
        labelNotes.setAttribute('for', 'notes');
        labelNotes.textContent = "Notes";
        inputNotes.classList.add('form-element');
        inputNotes.setAttribute('type','text');
        inputNotes.setAttribute('name','notes');
        inputNotes.setAttribute('value', notes);

        submit.classList.add('form-element');
        submit.setAttribute('type', 'submit');
        submit.setAttribute('id', 'submit-to-do');
        submit.textContent = "Add To-Do";
        close.classList.add('form-element');
        close.setAttribute('type', 'button');
        close.setAttribute('id', 'close-to-do-form');
        close.textContent = "Cancel";

        form.appendChild(labelTitle);
        form.appendChild(inputTitle);
        form.appendChild(labelDescription);
        form.appendChild(inputDescription);
        form.appendChild(labelDueDate);
        form.appendChild(inputDueDate);
        form.appendChild(labelPriorityNone);
        form.appendChild(inputPriorityNone);
        form.appendChild(labelPriorityLow);
        form.appendChild(inputPriorityLow);
        form.appendChild(labelPriorityMedium);
        form.appendChild(inputPriorityMedium);
        form.appendChild(labelPriorityHigh);
        form.appendChild(inputPriorityHigh);
        form.appendChild(labelNotes);
        form.appendChild(inputNotes);
        form.appendChild(submit);
        form.appendChild(close);

        modal.appendChild(form);
        body.appendChild(modal);
    
    };

    const _observeProjectButtons = () => {
        const projectButtons = document.querySelectorAll('button.project');
        projectButtons.forEach((projectButton)=>{
            //get stuff
            //no anonymous function because duplicate ones would not be the same
            //find project object that is connected to the dom

            //when dom is clicked, get it's project model
            //once project model is selected, get it's todo model
            //the todo model calls todo dom
            function callbackViewToDoList(e){
                const project = domModelProjectMap.get(e.target);
                _loadToDoContent(project);
                
            };
            projectButton.addEventListener('click', callbackViewToDoList);
        });
    };

    const _domModelProjectAssociator = (domElement, modelElement) => {
        domModelProjectMap.set(domElement, modelElement);
    };

    const _domModelToDoAssociator = (domArray, modelList) => {
        domModelToDoMap.clear();
        console.log(domArray);
        console.log(domModelToDoMap);
        domArray.forEach((dom, index) => {
            const model = modelList[index];
            domModelToDoMap.set(dom, model);
        });
        
    };

    return {observeProjectButton, createProject};
})();

//first time loading site
const OnLoad = (() => {

    
    const loadInitialUI = () => {
        DomManipulator.loadProjectButton();
        DomManipulator.loadProjectList();
        SiteFacilitator.observeProjectButton();
    };
    const addDefaultProject = () => {
        const title = "Default Project";
        SiteFacilitator.createProject(title);
        };
    
   

    return {loadInitialUI, addDefaultProject};
})();


OnLoad.loadInitialUI();
OnLoad.addDefaultProject();

/*
//mockup testing
const project2 = ProjectsFactory("Project 2");
const toDo1 = TodoFactory("Name", "Description", "DueDate", "Priority", "Notes");
//add a project to project list
ProjectController.addProject(project2);
//add todo to a project
ToDoController.addToDo(toDo1, project2);
console.log(ProjectController.getProjectList());
//get title of todo in project 2
console.log(project2.getToDoList()[0].getTitle());
*/

//backlog:

//set todos as complete +1
//change todo priority +1
//change name etc.

//DOM modules +1

//execute functions on load
//recognize which project page is open for the to-dos
//getOpenProject function
//setOpenProject function(has to do with dom?)
//where to put getOpenProject?

//connect dom element to the project object(map or iterating over ids?) +1

//view all projects

//make into ES6 modules
//webpack

//open form only once until it's closed +1
//createProject module+1

//make new project button work +1

//make to-dos into buttons +1

//make to-do associator +1
//open to-dos modal window; write_openToDoModal function +1
//make submit and cancel button working
