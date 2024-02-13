const mongooseToSwagger = require("mongoose-to-swagger");


class CollectionsProperties {
    constructor(Entity) {
        this.Entity = Entity;
        this.EntitySwagger = mongooseToSwagger(Entity);
        this.properties = {};
        this.propertiesGET = {};
        this.propertiesPOST = {};
        this.propertiesPUT = {};
        this.propertiesDELETE = {};
    }
    setProperties(method = "GET", properties) {
        
    }
    getProperties(method = "GET"){
        switch (method) {
            case "GET":
                
            case "POST":
            
            case "PUT":

            case "DELETE":

            default:
                break;
        }
    }
}