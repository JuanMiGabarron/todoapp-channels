$(document).ready(function(){
    // Note that the path doesn't matter for routing; any WebSocket
    // connection gets bumped over to WebSocket consumers
    socket = new WebSocket("ws://" + window.location.host + "/todo/");

    socket.onopen = function() {
      console.log('WebSockets connection created.');
    };
    
    socket.onmessage = function(e) {
        var jsdata = $.parseJSON(e.data);
        if(jsdata.action == "add"){
            $.each(jsdata.data, function(pos, todo){
                $("#todo_list").append(
                    $('<li class="list-group-item" value='+todo.pk+' >'+todo.fields.name+'<button type="button" class="btn btn-xs btn-danger pull-right" style="display:none"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></li>')
                );
            });
        }else if(jsdata.action == "del"){
            $('.list-group-item[value='+jsdata.data+']').remove()
        }
    }

    if (socket.readyState == WebSocket.OPEN) {
      socket.onopen();
    }

    $(document).on('click', '#send_todo', function(){
        socket.send('{"action": "add", "data": "'+$("#name_todo").val()+'"}');
        $("#name_todo").val('');
    });

    $(document).on('mouseover', '.list-group-item', function(){
        $(this).children('button').show();
    });

    $(document).on('mouseleave', '.list-group-item', function(){
        $(this).children('button').hide();
    });

    $(document).on('click', '.btn-danger', function(){
        socket.send('{"action": "del", "data": "'+$(this).closest('.list-group-item').val()+'"}');
    });
});