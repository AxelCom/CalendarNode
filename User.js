

module.exports = class User {

    constructor(email , password) {
        this.mail = email;
        this.password = password;
        this.lesEvents = [];
    }

     getListEvent(){
        return this.lesEvents
    }

     getEvent(idevent){
         const theEvent = this.lesEvents.find(event => event.idEvent === idevent);
         if(!theEvent){
             return false;
         }else{
             return theEvent;
         }
    }

    addEvent(event){
        this.lesEvents.push(event);
    }

    deleteEvent(idEvent){
        const theEvent = this.lesEvents.find(event => event.idEvent === idEvent);
        if(!theEvent){
            return false;
        }else{
            this.lesEvents.splice(this.lesEvents.indexOf(theEvent),1);
        }
    }

}