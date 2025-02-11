export class Entity{
    constructor(){
        this.id = Math.floor(Math.random() * 1000000);//Futuramente vamos implementar uma busca de ID no banco de dados na tabela entidades e acrescentar +1
        this.components = {};
    }

    addComponent(component){
        if(this.components[component.constructor.name]){
            console.log("Componente já existe nessa entidade!");
        } else {
            this.components[component.constructor.name] = component;
        }
    }

    getComponent(componentName){
        if(this.components[componentName]){
            return this.components[componentName];
        } else {
            console.log("Componente não encontrado para essa entidade!");
            return null;
        }   
    }
}