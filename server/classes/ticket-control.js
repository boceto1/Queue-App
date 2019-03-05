const fs = require('fs');

const {Ticket} = require('../classes/ticket');



class TicketControl {

    constructor(){

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        let data = require('../data/data.json');
        
        if(data.hoy===this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        }else{
            this.reiniciarConteo();
        }
    }

    reiniciarConteo(){
        this.ultimo =0;
        this.tickets = [];
        this.last4 = [];
        
        
        this.grabarArchivo();
        console.log('Se ha inicialiazado el sistema');
    }
    
    siguiente (){
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo,null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        
        return `Ticket ${this.ultimo}`;
    }
    
    getUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }

    getLast4(){
        return this.last4;
    }

    attendTicket (desk){
        if(this.tickets.length ===0){
            return {
                ok:false,
                message:"There aren't tickets"          
            }
        }

        let headTickets = this.tickets.shift();
        let numberTicket = headTickets.number;
        
        let attendingTicket = new Ticket(numberTicket,desk);
        this.last4.unshift(attendingTicket);

        if(this.last4.length > 4){
            this.last4.splice(-1,1);
        }

        console.log('Last 4');
        console.log(this.last4);
        this.grabarArchivo();

        return {ok:true,attendingTicket};
    }

    grabarArchivo (){

        let jsonData = {
            ultimo: this.ultimo,
            hoy:this.hoy,
            tickets:this.tickets,
            last4: this.last4
        };
        
        let jsonDataString = JSON.stringify(jsonData);
        
        fs.writeFileSync('./server/data/data.json',jsonDataString);
    }
}


module.exports ={
    TicketControl
}