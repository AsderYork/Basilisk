'use strict';

module.exports = class Tasknode {
    name = "";
    prerequisites = [];
    results = [];
    resources = [];

    constructor(name, prerequisites, results, resources) {
        this.name = name;
        this.prerequisites = prerequisites;
        this.results = results;
        this.resources = resources;
    }

}


