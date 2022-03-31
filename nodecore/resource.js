module.exports = class Resource {
    name = "";
    properties = [];
    amount = 0;

    constructor(name, amount, properties) {
        this.name = name;
        this.properties = properties;
        this.amount = amount;
    }

}
