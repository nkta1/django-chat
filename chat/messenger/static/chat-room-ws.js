// Initial data
let roomID = $('#room-id').text();
let socket = new WebSocket("ws://"+window.location.host+"/ws/chat/"+roomID +"/");

// Chat elements
let chatArea = $('#chat-area');
let chatDescription = $("#room-description").text().split('"').join('');

// Messaging
let printSuccessText = (text => $(chatArea).append('<div class="mb-2 pl-1 pr-1" style="color: white; background-color: mediumseagreen">'+text));
let printDescText = (text => $(chatArea).append('<div class="mb-2 pl-1 pr-1" style="background-color: lightslategray; color: white">'+text));
let printErrorText = (text => $(chatArea).append('<div class="mb-2 pl-1 pr-1" style="background-color: red; color: white">'+text));
let printText = ((name, text) => $(chatArea).append('<div class="mb-2"><b>'+name+'</b> >> '+text));

// Websocket callbacks
socket.onopen = () => {
    printSuccessText('You successfully joined the chat room.');
    printDescText(chatDescription);
};

socket.onerror = error => printErrorText("Error occurred!");

socket.onmessage = event => {
    let data = JSON.parse(event.data);
    printText(data.name, data.message);
};

socket.onclose = event => {
    if (event.wasClean)
        printErrorText("You were disconnected from the chat room!");
    else
        printErrorText("Your connection aborted! You were disconnected from the chat room!");
    printErrorText("Code: "+event.code+". Reason: " + event.reason);

};

// Send message
$('#room-form').submit(function (event) {
    event.preventDefault();
    let data = {
        'name': $('#name').val(),
        'message': $('#message').val()
    };
    $("#message").val("");
    socket.send(JSON.stringify(data));
});