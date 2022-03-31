function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function uniqueElements(firstElem, ...rest) {
    return arr1.concat(...rest).filter(onlyUnique);
}

class TaskNodeSolution {
    steps = [];
    missingRequirements = [];
    satisfactions = [];

    addNextStep(step) {
        this.steps.unshift(step);
    }

    addMissingRequirement(task, level, requirement) {
        this.missingRequirements.push({task:task, level:level, requirement:requirement});
    }

    considerRequirementSatisfied(requirement, satisfier) {

        for(var satisfiedRequirement of this.missingRequirements.filter(x => x.requirement === requirement)) {
            this.satisfactions.push({requirement:requirement, task:satisfiedRequirement.task, satisfiers:satisfier});
        }

        this.missingRequirements = this.missingRequirements.filter(x => x.requirement !== requirement);
    }

    listCurrentRequirements() {
        return this.missingRequirements.map(x => x.requirement).filter(onlyUnique);
    }

    updateRequirements() {
        let newRequirements = [].concat.apply([], this.steps[0].map(x => x.prerequisites.map(p => {return {task:x, requirement:p};}))).filter(x => x !== undefined);
        newRequirements.map(x => this.addMissingRequirement(x.task, this.steps.length, x.requirement));
    }

}

module.exports = class TasknodeSolver {
    tasknodes = [];

    addTasknode(tasknode) {
        this.tasknodes.push(tasknode);
    }

    findNodesToSatisfyPostcondition(postcondition) {
        return this.tasknodes.filter(x => x.results.includes(postcondition));
    }

    getPrerequestsOfAStep(step) {
        return [].concat.apply([], step.map(x => x.prerequisites)).filter(x => x !== undefined);
    }

    solveForGoal(postconditions) {


        var posibleSolutions = {};
        for(var postcondition of postconditions) {
            var solution = new TaskNodeSolution();
            solution.addNextStep(this.findNodesToSatisfyPostcondition(postcondition));
            solution.updateRequirements();

            while (solution.listCurrentRequirements().length > 0) {
                var nextStep = Object.fromEntries(solution.listCurrentRequirements().map(x => [x, this.findNodesToSatisfyPostcondition(x)]).filter(x => x[1].length > 0));
                if(Object.values(nextStep).length === 0) {break;}
                solution.listCurrentRequirements().filter(x => nextStep[x] !== undefined).forEach(x => solution.considerRequirementSatisfied(x, nextStep[x]));
                solution.addNextStep([].concat.apply([], Object.values(nextStep)));
                solution.updateRequirements();
            }

            posibleSolutions[postcondition] = solution;
        }

        return posibleSolutions;

    }

}