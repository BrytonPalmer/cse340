
import { addVolunteer, removeVolunteer } from '../models/projectVolunteersModel.js';

export async function volunteerForProject(req, res) {
    const userId = req.session.user.user_id;
    const projectId = req.params.id;

    await addVolunteer(userId, projectId);

    req.flash('success', 'You are now volunteering for this project.');
    res.redirect(`/project/${projectId}`);
}

export async function removeVolunteerFromProject(req, res) {
    const userId = req.session.user.user_id;
    const projectId = req.params.id;

    await removeVolunteer(userId, projectId);

    req.flash('success', 'You are no longer volunteering for this project.');
    res.redirect(`/project/${projectId}`);
}