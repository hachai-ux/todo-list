import {ToDoFactory, ProjectsFactory} from './factory.js';
import {ProjectController, ToDoController} from './controller.js';
import {DomManipulator} from './domManipulator.js';
import {LocalStorageFacilitator} from './storage.js';
import { compareAsc, format } from 'date-fns'; //only use when entering days to calculate due time from today

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
            const existingForm = document.querySelector('form');
            if (existingForm === null){
            DomManipulator.openProjectForm();
            const modal = document.querySelector('div.modal');
            modal.style.display = "block";
            _observeProjectForm();
            };
        });
        
            

    };
    

    const _observeToDoButton = (project) => {
        const addToDoButton = document.querySelector('button#add-to-do-button');
        addToDoButton.addEventListener('click', () => {
            const existingForm = document.querySelector('form');
            if(existingForm === null){
            DomManipulator.openToDoForm();
            const modal = document.querySelector('div.modal');
            modal.style.display = "block";
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
        const modal = document.querySelector('div#sidebar>div.modal');
        console.log(modal);
        const submitForm = document.querySelector('form#add-project-form');
        const closeButton = document.querySelector('button#close-project-form');
        submitForm.addEventListener('submit', () => {
            const title = submitForm.elements['title'].value;
            createProject(title);
            //close whole modal

            DomManipulator.closeProjectForm(modal);
            LocalStorageFacilitator.saveProjects();
        });
        closeButton.addEventListener('click', () => {
            DomManipulator.closeProjectForm(modal);
        });
       

    };

    const createToDo = (project, title, description, dueDate, priority, notes) => {
        const toDo = ToDoFactory(title, description, dueDate, priority, notes);
        //current open project to-dos
        ToDoController.addToDo(toDo, project);
        

    };

    const _observeToDoForm = (project) => {
        const modal = document.querySelector('div#content>div.modal');
        const submitForm = document.querySelector('form#add-to-do-form');
        const closeButton = document.querySelector('button#close-to-do-form');
        submitForm.addEventListener('submit', () => {
            const title = submitForm.elements['title'].value;
            const description = submitForm.elements['description'].value;
            const dueDate = submitForm.elements['due-date'].value;
            const priority = submitForm.elements['priority'].value;
            const notes = submitForm.elements['notes'].value;
            createToDo(project, title, description, dueDate, priority, notes);
            DomManipulator.closeToDoForm(modal);
            _loadToDoContent(project);
            LocalStorageFacilitator.saveProjects();

        });
        closeButton.addEventListener('click', () => {
            DomManipulator.closeToDoForm(modal);
            
        });
    };

    const _loadToDoContent = (project) => {
            const toDoList = project.getToDoList();
            DomManipulator.clearToDoContent();
            DomManipulator.loadToDoButton();
            const toDoDomArray = DomManipulator.loadToDoList(toDoList);
            if (toDoList[0] !== undefined){
                console.log(toDoList[0].getTitle());
            }
            _domModelToDoAssociator(toDoDomArray, toDoList);
            _observeToDoButton(project);
            _observeToDoCheckboxes(project);
            _observeToDoListButtons(project);
       
    };

    const _observeToDoListButtons = (project) => {
        const toDoButtons = document.querySelectorAll('span.to-do');
        
        toDoButtons.forEach((toDoButton, index)=>{
           
            function callbackViewToDoModal(e){
                //only fire if target is not a checkbox

                if(e.target.getAttribute('type') !== 'checkbox'){
                    const toDo = domModelToDoMap.get(e.currentTarget);

                    console.log(e);
                    //proper selection of the to-do element through bubbling
                    const existingModal = document.querySelector('div#edit-to-do-modal');
                    if(existingModal === null){
                        DomManipulator.openEditToDoModal(toDo);
                        const existingModal = document.querySelector('div#edit-to-do-modal');
                        existingModal.style.display = "block";
                        _observeEditToDoForm(toDo, index, project);
                        console.log('hello');
                    };
                };
                
            };
            toDoButton.addEventListener('click', callbackViewToDoModal);
        });
    };

    const _observeToDoCheckboxes = (project) => {
        const toDoCheckboxes = document.querySelectorAll('div.to-do-list>span.to-do>input.to-do-checkbox');

        toDoCheckboxes.forEach((toDoCheckbox, index) => { 
        _observeToDoCheckbox(toDoCheckbox, index, project);
        });
    };

    

    const _observeProjectButtons = () => {
        const projectButtons = document.querySelectorAll('a.project');
        projectButtons.forEach((projectButton)=>{
            //get stuff
            //no anonymous function because duplicate ones would not be the same
            //find project object that is connected to the dom

            //when dom is clicked, get it's project model
            //once project model is selected, get it's todo model
            //the todo model calls todo dom
            function callbackViewToDoList(e){
                const project = domModelProjectMap.get(e.target);
                console.log(e.target);
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

    const _observeEditToDoForm = (toDo, index, project) => {
        const modal = document.querySelector('div#edit-to-do-modal');
        const form = document.querySelector('form#edit-to-do-form');
        const closeButton = document.querySelector('form#edit-to-do-form>button#close-edit-to-do');
        form.addEventListener('submit', () => {

            const title = form.elements['title'].value;
            const description = form.elements['description'].value;
            const dueDate = form.elements['due-date'].value;
            const priority = form.elements['priority'].value;
            const notes = form.elements['notes'].value;

            console.log(title);
            ToDoController.editToDo(toDo, title, description, dueDate, priority, notes);
            toDoList = project.getToDoList();
            console.log(toDoList[index].getTitle());
            
            toDoList[index] = toDo;

            DomManipulator.closeToDoForm(modal);
            _loadToDoContent(project);
            LocalStorageFacilitator.saveProjects();
            //toDo needs to be associated with project.toDoList[i]

        });
        closeButton.addEventListener('click', () => {
            DomManipulator.closeToDoForm(modal);
            
        });
    };


    const _observeToDoCheckbox = (checkbox, index, project) => {

        //using 'change' doesnt work because this will fire the click event of observetodobuttons first
        checkbox.addEventListener('change', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const toDoDom = e.currentTarget.parentElement;
                console.log(e);
                //remove to-do from to-do-list
                const toDoList = project.getToDoList();
                toDoList.splice(index, 1);
                DomManipulator.removeToDo(toDoDom);
                LocalStorageFacilitator.saveProjects();

            
        });
    };

    return {observeProjectButton, createProject, createToDo};
})();

export {SiteFacilitator};