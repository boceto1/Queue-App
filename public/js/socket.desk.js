var socket = io();

var searchParams = new URLSearchParams (window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error ('Desk is neccesary')
}

const desk = searchParams.get('escritorio');
const lblDesk = $('small');

console.log(desk);

$('h1').text("Escritorio: "+desk);

$('button').on('click',()=>{
    socket.emit('attendTicket',{desk:desk},(resp)=>{
        const numberTicket = resp;
        const state = numberTicket.ok;
        console.log(state);
        
        if(!state){
            $('small').text('ninguno');
            alert("There aren't available tickets")
        }
        else{
         $('small').text(numberTicket.attendingTicket.number);
        }

    })
})