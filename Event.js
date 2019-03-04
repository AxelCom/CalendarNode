module.exports = class Event {
    
    constructor(idEvent, title, description, dateDebut, dateFin, mailUser) {
        this.idEvent = idEvent;
        this.title = title;
        this.description = description;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.mailUser = mailUser;
    }

    
}