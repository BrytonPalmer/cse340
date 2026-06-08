// import express from 'express';

// import { showHomePage } from './controllers/index.js';
// import { showOrganizationsPage } from './controllers/organizations.js';
// import { showProjectsPage } from './controllers/projects.js';
// import { showCategoriesPage } from './controllers/categories.js';
// import { testErrorPage } from './controllers/errors.js';
// import { showOrganizationDetailsPage } from './controllers/organizations.js';
// import { showProjectDetailsPage } from './controllers/projects.js';
// import { showCategoryDetailsPage } from './controllers/categories.js';
// import { showNewOrganizationForm } from './controllers/organizations.js';
// import { processNewOrganizationForm } from './controllers/organizations.js';
// import { organizationValidation } from './controllers/organizations.js'
// import { processEditOrganizationForm } from './controllers/organizations.js'
// import { showEditOrganizationForm } from './controllers/organizations.js'
// import { showNewProjectForm } from './controllers/projects.js';
// import { processNewProjectForm } from './controllers/projects.js';
// import { projectValidation } from './controllers/projects.js';
// import { showAssignCategoriesForm } from './controllers/categories.js';
// import { processAssignCategoriesForm } from './controllers/categories.js';
// import { showEditProjectForm } from './controllers/projects.js';
// import { processEditProjectForm } from './controllers/projects.js';

// import { showNewCategoryForm } from './controllers/categories.js';
// import { processNewCategoryForm } from './controllers/categories.js';
// import { showEditCategoryForm } from './controllers/categories.js';
// import { processEditCategoryForm } from './controllers/categories.js';
// import { categoryValidation } from './controllers/categories.js';

// import { showUserRegistrationForm } from './controllers/users.js';
// import { processUserRegistrationForm } from './controllers/users.js';

// import { showLoginForm } from './controllers/users.js';
// import { processLoginForm } from './controllers/users.js';
// import { processLogout } from './controllers/users.js';

// import { requireLogin } from './controllers/users.js';
// import { showDashboard } from './controllers/users.js';

// import { requireRole } from './controllers/users.js';

// const router = express.Router();

// router.get('/', showHomePage);
// router.get('/organizations', showOrganizationsPage);
// router.get('/organization/:id', showOrganizationDetailsPage);
// router.get('/projects', showProjectsPage);
// router.get('/new-project', showNewProjectForm);
// router.post('/new-project', projectValidation, processNewProjectForm);
// router.get('/categories', showCategoriesPage);
// router.get('/project/:id', showProjectDetailsPage);
// router.get('/category/:id', showCategoryDetailsPage);
// router.post('/new-organization', organizationValidation,processNewOrganizationForm);

// router.get('/edit-organization/:id', showEditOrganizationForm);
// router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// router.get('/project/:projectId/assign-categories', showAssignCategoriesForm);
// router.post('/project/:projectId/assign-categories', processAssignCategoriesForm);

// router.get('/edit-project/:id', showEditProjectForm);
// router.post('/edit-project/:id', processEditProjectForm);

// router.get('/new-category', showNewCategoryForm);
// router.post('/new-category', categoryValidation, processNewCategoryForm);

// router.get('/edit-category/:id', showEditCategoryForm);
// router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

// // admin 
// /* --- ORGANIZATIONS --- */

// // Protected dashboard route
// router.get('/dashboard', requireLogin, showDashboard);

// //user login routes
// router.get('/login', showLoginForm);
// router.post('/login', processLoginForm);
// router.get('/logout', processLogout);

// // User registration routes
// router.get('/register', showUserRegistrationForm);
// router.post('/register', processUserRegistrationForm);

// // Route for new organization page
// router.get('/new-organization', showNewOrganizationForm);


// // error-handling routes
// router.get('/test-error', testErrorPage);

// export default router;

import express from 'express';

// HOME
import { showHomePage } from './controllers/index.js';

// ORGANIZATIONS
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
} from './controllers/organizations.js';

// PROJECTS
import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
} from './controllers/projects.js';

// CATEGORIES
import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './controllers/categories.js';

// USERS
import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    requireRole,
    showDashboard
} from './controllers/users.js';

// ERRORS
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

/* ============================
   PUBLIC ROUTES
============================ */

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

/* ============================
   AUTH ROUTES
============================ */

router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

router.get('/login', showLoginForm);
router.post('/login', processLoginForm);

router.get('/logout', processLogout);

router.get('/dashboard', requireLogin, showDashboard);

/* ============================
   ADMIN‑ONLY ROUTES
============================ */

/* --- ORGANIZATIONS --- */
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

/* --- PROJECTS --- */
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

router.get('/project/:projectId/assign-categories', requireRole('admin'), showAssignCategoriesForm);
router.post('/project/:projectId/assign-categories', requireRole('admin'), processAssignCategoriesForm);

/* --- CATEGORIES --- */
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);

router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

/* ============================
   ERROR TEST ROUTE
============================ */

router.get('/test-error', testErrorPage);

export default router;