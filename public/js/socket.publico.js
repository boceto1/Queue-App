var socket = io();

const lblTicket1 = $('#lblTicket1')
const lblTicket2 = $('#lblTicket2')
const lblTicket3 = $('#lblTicket3')
const lblTicket4 = $('#lblTicket4')

const lblDesk1 = $('#lblEscritorio1')
const lblDesk2 = $('#lblEscritorio2')
const lblDesk3 = $('#lblEscritorio3')
const lblDesk4 = $('#lblEscritorio4')

const lblTickets = [lblTicket1,lblTicket2,lblTicket3,lblTicket4]
const lblDesks = [lblDesk1,lblDesk2,lblDesk3,lblDesk4];




socket.on('currentState',(data)=>{
    updatePage (data.last4)
})

socket.on('last4',(data)=>{
    updatePage(data);
})


function updatePage (last4){

    for (let i = 0; i < last4.length; i++) {
        
        lblTickets[i].text('Ticket '+last4[i].number);
        lblDesks[i].text('Escritorio'+last4[i].desk)
    }
    

}