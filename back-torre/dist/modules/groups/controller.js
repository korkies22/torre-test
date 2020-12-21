"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const torre_1 = require("../../util/torre");
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const events_1 = __importDefault(require("../../util/events"));
const queries = __importStar(require("./queries"));
const validator_1 = require("./validator");
//Gets "complete" group. This loads the members and opportunities data according to torre api
// and return the group with these parameters instead of only the string ones
const getCompleteGroup = async (group) => {
    let promises = [];
    for (const member of group.members) {
        promises.push(torre_1.checkMember(member));
    }
    const richMembers = await Promise.all(promises);
    promises = [];
    for (const opportunity of group.opportunities) {
        promises.push(torre_1.searchOpportunity(opportunity));
    }
    const richOpportunities = await Promise.all(promises);
    const respGroup = group.toJSON();
    return Object.assign(Object.assign({}, respGroup), { members: richMembers, opportunities: richOpportunities });
};
/**
 * Creates a group consisting of a name, members and optionally a description and video
 * @param req.body.name group name
 * @param req.body.description group description (Optional)
 * @param req.body.members List of group members, they must exist in Torre.co
 * @param req.file group video, in order to showcase the group (Optional)
 */
exports.createGroup = async function (req, res) {
    validator_1.validationErrorHandler(req);
    try {
        const name = req.body.name;
        const description = req.body.description ? req.body.description : '';
        let members = req.body.members.split(',');
        const promises = [];
        const set = new Set();
        //If array is empty or the only element is the same user
        if (members.length === 0 ||
            (members.length === 1 && members[0] === req.user)) {
            throw {
                message: 'You need to include at least one other person',
                statusCode: 422,
            };
        }
        //We use a set to delete duplicates
        for (const member of members) {
            set.add(member);
        }
        set.add(req.user);
        members = [...set.values()];
        for (const member of members) {
            promises.push(torre_1.checkMember(member));
        }
        const richMembers = await Promise.all(promises);
        const totalWeight = richMembers.reduce((accum, member) => {
            return accum + member.weight;
        }, 0);
        const videoURL = req.file ? req.file.path : null;
        const group = await queries.createGroup(name, description, members, totalWeight, videoURL);
        res.send(group);
    }
    catch (e) {
        if (!e.statusCode) {
            throw {
                message: 'There has been a problem while creating the group. Please try again later',
            };
        }
        else {
            throw e;
        }
    }
};
/**
 * Adds an opportunity to a group
 * @param req.body.groupId group id
 * @param req.body.opportunityId opportunity ID (Given by torre)
 */
exports.addOpportunity = async function (req, res) {
    validator_1.validationErrorHandler(req);
    try {
        const groupId = req.body.groupId;
        const opportunityId = req.body.opportunityId;
        const group = await queries.findGroupById(groupId);
        if (!group) {
            throw {
                message: "The group with that id doesn't exists",
                statusCode: 403,
            };
        }
        let found = false;
        for (const member of group.members) {
            if (member === req.user) {
                found = true;
                break;
            }
        }
        if (!found) {
            throw { message: 'You are not part of that group', statusCode: 403 };
        }
        found = false;
        for (const opportunitiy of group.opportunities) {
            if (opportunitiy === opportunityId) {
                found = true;
                break;
            }
        }
        if (found) {
            throw {
                message: 'The group has already applied to this job',
                statusCode: 422,
            };
        }
        try {
            await torre_1.searchOpportunity(opportunityId);
        }
        catch (err) {
            throw {
                message: `An opportunity with id ${opportunityId} was not found`,
                statusCode: 422,
            };
        }
        group.opportunities.push(opportunityId);
        await group.save();
        res.send(group);
        events_1.default.emit('groupChanged', JSON.stringify(await getCompleteGroup(group)));
    }
    catch (e) {
        if (!e.statusCode) {
            throw {
                message: 'There has been a problem adding the opportunity to the group. Please try again later',
            };
        }
        else {
            throw e;
        }
    }
};
/**
 * Gets groups in which the current user is a member
 */
exports.getGroups = async function (req, res) {
    try {
        const groups = await queries.getGroupsFromUser(req.user);
        res.send(groups);
    }
    catch (e) {
        if (!e.statusCode) {
            throw {
                message: 'There has been a problem while fetching groups. Please try again later',
            };
        }
        else {
            throw e;
        }
    }
};
/**
 * Gets groups in which the current user is a member
 * @param req.params.id group id
 */
exports.getGroupById = async function (req, res) {
    try {
        let group = await queries.findGroupById(queries.getObjectId(req.params.id));
        if (!group) {
            throw { message: 'The group with that Id doesnt exist', statusCode: 404 };
        }
        const me = group.members.find((member) => member === req.user);
        if (!me) {
            throw { message: 'You are not part of that group', statusCode: 401 };
        }
        group = await getCompleteGroup(group);
        res.send(group);
    }
    catch (e) {
        if (!e.statusCode) {
            throw {
                message: 'There has been a problem while fetching groups. Please try again later',
            };
        }
        else {
            throw e;
        }
    }
};
