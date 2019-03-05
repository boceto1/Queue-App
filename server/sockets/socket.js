const { io } = require('../server');
const {TicketControl} = require ('../classes/ticket-control')

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    console.log('Usuario conectado');


    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });


    // Listen creation new Ticket.
    client.on('nextTicket',(data,callback)=>{
        const siguiente = ticketControl.siguiente();
        callback(siguiente)
    });


    //Listen attend Ticket
    client.on('attendTicket',(data,callback)=>{

        if(!data.desk){
            return callback({
                ok:false,
                message:'Desk is neccesary'
            })
        }

        let attendigTicket = ticketControl.attendTicket(data.desk);
        callback(attendigTicket);

        client.broadcast.emit('last4',ticketControl.getLast4())

    });

    //Send 'estado Actual' event
    client.emit('currentState',{
        actual:ticketControl.getUltimoTicket(),
        last4:ticketControl.getLast4()
    });




});