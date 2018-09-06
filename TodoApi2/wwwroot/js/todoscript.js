var todos;
const url = "/todo/api/todo";
//local 
//const url = "/api/todo";

$(document).ready(function () {
  getData();

});//end ready

function getData() {
    var statusHTML = getListOpening();
    var doneHTML = "<div class='list-group-flush'>";
    var tomorrowHTML = "<div class='list-group-flush'>";

    $.getJSON(url, function (data) {
       todos = data;
        $.each(todos, function (index, todoitem) {

            if (todoitem.isComplete === "true") {
                doneHTML += getItemCode("far fa-check-square", todoitem, false);
            } else {
                console.log(new Date(todoitem.dueDate));
                if (new Date(todoitem.dueDate) <= (new Date())) {
                    statusHTML += getItemCode("fas fa-square", todoitem, true);


                } else {
                    tomorrowHTML += getItemCode("fas fa-square",todoitem, false);
                }

            }
           
          
        });
        statusHTML += "</div>";
        doneHTML += "</div>";
        tomorrowHTML += "</div>";
        $('#todaylist').html(statusHTML);
        $('#donelist').html(doneHTML);
        $('#tomorrowlist').html(tomorrowHTML);
    }); //end getJSON


}
function getListOpening() {
    return '<div class="list-group-flush">';
}
function getItemCode(checkstyle, todoitem, withtomorrow  ) {
    var html =  '<div class="d-flex align-middle list-group-item"><button type="button"  onClick="toggleDone(' + todoitem.id + ')" class="btn '+checkstyle+'"></button>' +
        '<div class="ml-2 mr-auto my-auto align-middle">' + todoitem.name + '</div>' +
          '<button type="button" onClick="remove(' + todoitem.id + ')" class="btn far fa-trash-alt"></button>';

    html += withtomorrow ? ('<button type="button" onClick="markAsTomorrow(' + todoitem.id + ')" class="btn fas fa-hand-point-right"></button></div>') : '</div>';
    return html;
}
function addTodo() {

    const item = {
        'name': $('#todoInput').val(),
        'isComplete': false,
        'dueDate': new Date()
    };

    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert('here');
        },
        success: function (result) {
            getData();
            $('#todoInput').val('');
        }
    });
}
function addTomorrow() {
    var nextDate = new Date();
    nextDate.setDate(new Date().getDate() + 1);      
    const item = {
        'name': $('#tomorrowInput').val(),
        'isComplete': false,
        'dueDate': nextDate
    };

    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert('here');
        },
        success: function (result) {
            getData();
            $('#tomorrowInput').val('');
        }
    });
}


function markAsTomorrow(id) {
    var todotoupdate;
    var nextDate = new Date();
    nextDate.setDate(new Date().getDate() + 1);
    $.each(todos, function (key, item) {
        if (item.id === id) {
            item.dueDate = nextDate;
            todotoupdate = item;
        }
    });

    $.ajax({
        type: "PUT",
        url: url + '/' + id,
        accepts: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(todotoupdate),
        success: function (result) {
            getData();
            console.log(result + " " + todotoupdate.dueDate);
        }
    });
}

function markAsDone(id) {
    var todotocomplete;
    $.each(todos, function (key, item) {
        if (item.id === id) {
            item.isComplete = true;
            todotocomplete = item;
            
        }
    });

    $.ajax({
        type: "PUT",
        url: url + '/' + id,
        accepts: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(todotocomplete),
        success: function (result) {
            getData();
        }
    });
}


var todotc;
function toggleDone(id) {
    
    $.each(todos, function (key, item) {
        if (item.id === id) {
            todotc = item;
            
            todotc.isComplete =  item.isComplete==="false";
            console.log(todotc.isComplete);
        }
    });

    $.ajax({
        type: "PUT",
        url: url + '/' + id,
        accepts: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(todotc),
        success: function (result) {
            getData();
            console.log('yes');
        }
    });
}

function markAsUnDone(id) {
    var todotocomplete;
    $.each(todos, function (key, item) {
        if (item.id === id) {
            item.isComplete = false;
            todotocomplete = item;

        }
    });
  
    $.ajax({
        type: "PUT",
        url: url + '/' + id,
        accepts: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(todotocomplete),
        success: function (result) {
            getData();
        }
    });
}

function remove(id) {
    $.ajax({
        url: url + '/' + id,
        type: 'DELETE',
        success: function (result) {
            getData();
        }
    });
}