import {ProjectController, ToDoController} from './controller.js';
import { SiteFacilitator } from './facilitator.js';

const LocalStorageFacilitator = (() => {

    const projectsStorage = [];

    const _convertProjects = () => {
        const projectList = ProjectController.getProjectList();
        console.log(projectList);
        projectList.forEach((project) => {
            console.log(project);
            const title = project.getTitle();
            const toDoList = project.getToDoList();
            
            const toDoListConverted = [];
            console.log(toDoList);
            toDoList.forEach((toDo)=>{
                const toDoTitle = toDo.getTitle();
                const toDoDescription = toDo.getDescription();
                const toDoDueDate = toDo.getDueDate();
                const toDoPriority = toDo.getPriority();
                const toDoNotes = toDo.getNotes();
                console.log(toDoTitle);
                toDoListConverted.push({
                    //push object into toDoListConverted
                    toDoTitle,
                    toDoDescription,
                    toDoDueDate,
                    toDoPriority,
                    toDoNotes
                });
            })
            //push object with title and toDoList to array
            projectsStorage.push({
                title,
                toDoListConverted
            });
        });
        
    };


    const saveProjects = () => {
        //clear everything so it can be renewed
        localStorage.clear();
        while(projectsStorage.length>0){
            projectsStorage.pop();
           };
        _convertProjects();
        localStorage.setItem('Projects', JSON.stringify(projectsStorage));
        console.log(projectsStorage);
        console.log(JSON.stringify(projectsStorage));
        console.log(JSON.parse(localStorage.getItem('Projects')));
    };
 
    const loadProjects = () => {
        //loading/creating = converting back

        let tempProjectStorage = [];

        tempProjectStorage = JSON.parse(localStorage.getItem('Projects'));
        if (tempProjectStorage !== null){
            tempProjectStorage.forEach((pseudoProject, index)=>{
            const projectTitle = pseudoProject.title;
            const toDoListConverted = pseudoProject.toDoListConverted;
            //load
            SiteFacilitator.createProject(projectTitle);

            if (toDoListConverted.length > 0 ){
                console.log(toDoListConverted.length);
                const toDoTitle = toDoListConverted[index].toDoTitle;
                const toDoDescription = toDoListConverted[index].toDoDescription;
                const toDoDueDate = toDoListConverted[index].toDoDueDate;
                const toDoPriority = toDoListConverted[index].toDoPriority;
                const toDoNotes = toDoListConverted[index].toDoNotes;
                const projectList = ProjectController.getProjectList();
                const project = projectList[index];
                SiteFacilitator.createToDo(project, toDoTitle, toDoDescription, toDoDueDate, toDoPriority, toDoNotes);
            };
            
            });
        };

    };
        return {saveProjects, loadProjects};
    })();

export {LocalStorageFacilitator};