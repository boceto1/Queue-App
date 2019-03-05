// Comand to establish connection with server
var socket = io();
var label = $('#lblNuevoTicket')

// Conect server
socket.on('connect',function(){
    console.log('You are connected with server');
})

// Disconnet
socket.on('disconnect',function(){
    console.log('You are discconect with server');
})

socket.on('currentState',(data)=>{
    label.text(data.actual)
})

$('button').on('click',function(){ 
   
    socket.emit('nextTicket',null,(nextTicket)=>{
        label.text(nextTicket)
    })
});