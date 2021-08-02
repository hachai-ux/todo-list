import {ProjectController, ToDoController} from './controller.js';

const LocalStorageFacilitator = (() => {

    const saveProjects = () => {
        const projectList = ProjectController.getProjectList();
        localStorage.setItem('Projects', JSON.stringify(projectList));
        console.log(projectList);
        console.log(JSON.stringify(projectList));
        console.log(JSON.parse(localStorage.getItem('Projects')));
    };
 
    const loadProjects = () => {
        let projectList = [];
        projectList = JSON.parse(localStorage.getItem('Projects'));
        ProjectController.projectList = projectList;
    };

    return {saveProjects, loadProjects};
})();

export {LocalStorageFacilitator};