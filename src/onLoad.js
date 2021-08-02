import {DomManipulator} from './domManipulator.js';
import {SiteFacilitator} from './facilitator.js';

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

export {OnLoad};