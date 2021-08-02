


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

        addToDoButton.setAttribute('id','add-to-do-button');
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
        const project = document.createElement('a');
        const projectList = document.querySelector('div#project-list');
        project.classList.add('project');
        project.setAttribute('href', '#');
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
       const toDo = document.createElement('span');
       const toDoTitle = document.createElement('p');
       const toDoDueDate = document.createElement('p');
       const labelCheckbox = document.createElement('label');
       const inputCheckbox = document.createElement('input');
 
       labelCheckbox.classList.add('to-do-checkbox')
       labelCheckbox.setAttribute('for', 'checkbox');
       inputCheckbox.classList.add('to-do-checkbox');
       inputCheckbox.setAttribute('type', 'checkbox');
       inputCheckbox.setAttribute('name', 'checkbox');

       toDo.classList.add('to-do');

       toDoTitle.textContent = title;
       toDoTitle.classList.add('to-do-title');

       toDoDueDate.classList.add('due-date');

       if(dueDate !== ''){
        toDoDueDate.textContent = 'Due: ' + dueDate;
       };
    

       toDo.appendChild(labelCheckbox);
       toDo.appendChild(inputCheckbox);
       toDo.appendChild(toDoTitle);
       toDo.appendChild(toDoDueDate);
       toDoList.appendChild(toDo);

       return toDo;
   };

   const openProjectForm = () => {
        const modal = document.createElement('div');
        const form = document.createElement('form');
        const sidebar = document.querySelector('div#sidebar');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const submit = document.createElement('button');
        const close = document.createElement('button');
        
    
        modal.classList.add('modal');
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
        modal.appendChild(form);
        sidebar.appendChild(modal);
   };

   const closeProjectForm = (modal) => {
    const sidebar = document.querySelector('div#sidebar');
    console.log(modal);
    sidebar.removeChild(modal);
};

   const closeToDoForm = (modal) => {
        const content = document.querySelector('div#content');
        console.log(content);
        console.log(modal);
        content.removeChild(modal);
   };
 

   const openToDoForm = () => {
    const modal = document.createElement('div');
    const form = document.createElement('form');
    const content = document.querySelector('div#content');
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

    modal.classList.add('modal');
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
    inputPriorityMedium.setAttribute('value','medium-priority');

    labelPriorityHigh.classList.add('form-element');
    labelPriorityHigh.setAttribute('for', 'priority');
    labelPriorityHigh.textContent = "High Priority";
    inputPriorityHigh.classList.add('form-element');
    inputPriorityHigh.setAttribute('type','radio');
    inputPriorityHigh.setAttribute('name','priority');
    inputPriorityHigh.setAttribute('value','high-priority');

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
    modal.appendChild(form);
    content.appendChild(modal);
   };

   const loadToDoList = (toDoList) => {
        //to-do-list div
        if (toDoList[0] !== undefined){
            console.log(toDoList[0].getTitle());
        }
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

   const removeToDo = (toDoDom) => {
       const toDoList = document.querySelector('div.to-do-list');

       toDoList.removeChild(toDoDom);
   }

   const clearToDoContent = () => {
        const content = document.querySelector('div#content');
        /*
        //backup
        const toDoListDom = document.querySelector('div.to-do-list');
        const addToDoButton = document.querySelector('button#add-to-do-button');

        if(toDoListDom !== null){
            content.removeChild(toDoListDom);
        };
        if(addToDoButton!== null){
            content.removeChild(addToDoButton);
        };
        */

        while (content.firstChild) {
            content.removeChild(content.firstChild);
        };
        
   };

   const openEditToDoModal = (toDo) => {
    const content = document.querySelector('div#content');
    const modal = document.createElement('div');
    modal.setAttribute('id', 'edit-to-do-modal')
    modal.classList.add('modal');

    const form = document.createElement('form');
    form.classList.add('form');
    form.setAttribute('id', 'edit-to-do-form');
    form.setAttribute('onsubmit', 'return false');

    /*
    //x-button
    const x = document.createElement('span');
    x.classList.add('close');
    x.textContent = '&times;';
    */
    console.log(toDo);

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
    inputPriorityMedium.setAttribute('value','medium-priority');

    labelPriorityHigh.classList.add('form-element');
    labelPriorityHigh.setAttribute('for', 'priority');
    labelPriorityHigh.textContent = "High Priority";
    inputPriorityHigh.classList.add('form-element');
    inputPriorityHigh.setAttribute('type','radio');
    inputPriorityHigh.setAttribute('name','priority');
    inputPriorityHigh.setAttribute('value','high-priority');

    switch (priority) {
        case "":
          inputPriorityNone.checked = true;
          break;
        case "low-priority":
          inputPriorityLow.checked = true;
          break;
        case "medium-priority":
          inputPriorityMedium.checked = true;
          break;
        case "high-priority":
          inputPriorityHigh.checked = true;
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
    submit.setAttribute('id', 'edit-to-do');
    submit.textContent = "Edit To-Do";
    close.classList.add('form-element');
    close.setAttribute('type', 'button');
    close.setAttribute('id', 'close-edit-to-do');
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
    content.appendChild(modal);

    
};
    
   return {loadProjectButton, loadToDoButton, loadProjectList, newProjectDom, openProjectForm, closeToDoForm, closeProjectForm, openToDoForm, loadToDoList, clearToDoContent, openEditToDoModal, removeToDo};
})();

export {DomManipulator};