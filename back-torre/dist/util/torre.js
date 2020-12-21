"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Checks if user exists
exports.checkMember = async (username) => {
    const response = await fetch(`https://bio.torre.co/api/bios/${username}`, {
        method: 'GET',
    });
    if (!response.ok) {
        throw {
            message: `${username} does not exist in Torre.co`,
            statusCode: 403,
        };
    }
    return (await response.json()).person;
};
exports.searchOpportunities = async (username, page, size, role) => {
    let roleData = {};
    if (role) {
        roleData = Object.assign(Object.assign({}, roleData), { 'skill/role': {
                text: role,
                experience: 'potential-to-develop',
            } });
    }
    const response = await fetch(`https://search.torre.co/opportunities/_search/?&lang=en&size=${size}&aggregate=false&offset=${page * size}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            and: [
                {
                    bestfor: {
                        username,
                    },
                },
                roleData,
            ],
        }),
    });
    if (!response.ok) {
        throw {
            message: `Unable to fetch your opportunities. Try again later`,
        };
    }
    return (await response.json()).results;
};
exports.searchOpportunity = async (id) => {
    const response = await fetch(`https://torre.co/api/opportunities/${id}`);
    if (!response.ok) {
        throw {
            message: `Unable to fetch the opportunity. Try again later`,
        };
    }
    return response.json();
};
