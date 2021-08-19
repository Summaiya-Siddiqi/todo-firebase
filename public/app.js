var list = document.getElementById("list");

//collect data from firbase

firebase.database().ref('todos').on('child_added',function(data){
    
    //create li tag with text node 
    var li = document.createElement("li");
    var li_maindiv = document.createElement("div");
    li_maindiv.setAttribute("class","li_maindiv")
    var li_div1 = document.createElement("div");
    var li_div2 = document.createElement("div");
    li_div1.setAttribute("class","li_div1")
    li_div2.setAttribute("class","li_div2")
    li_maindiv.appendChild(li_div1);
    li_maindiv.appendChild(li_div2);
    var span = document.createElement("span");
    var spanText = document.createTextNode(data.val().value);
    span.appendChild(spanText)
    li_div1.appendChild(span)
    li_div1.setAttribute("id","li_div1");
    span.setAttribute("class","spanText")
    span.setAttribute("id","span_Text")
    
    

      //create edit btn
      var editbtn = document.createElement("button");
      var editText = document.createTextNode("");
      editbtn.appendChild(editText)
      editbtn.setAttribute("class", "fa fa-edit")
      editbtn.setAttribute("id",data.val().key)
      li_div2.appendChild(editbtn)
      editbtn.setAttribute("onclick","editItem(this)")
     
    //cretae del btn 
    var delbtn = document.createElement("button")
    var delText = document.createTextNode("")
    delbtn.setAttribute("class", "fa fa-trash")
    delbtn.setAttribute("onclick","delItem(this)")
    delbtn.appendChild(delText)
    delbtn.setAttribute("id",data.val().key)
    li_div2.appendChild(delbtn)
    



  

    li.appendChild(li_maindiv);
    var list = document.getElementById("list")
    list.appendChild(li)
})


function addTodo(){
    var todo_item = document.getElementById("todo_item");
    if(todo_item.value==""){
        alert("PLease enter todo");
    }

else{
    

    //adding data into firebase database

    var database = firebase.database().ref('todos')
    var key = database.push().key;
    var todo = {
        value: todo_item.value,
        key: key
    }

    database.child(key).set(todo);



   
    todo_item.value = ""
}
}


function delItem(e){
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.parentNode.parentNode.remove()
    
}

function delAll(){
    list.innerHTML = ""
    firebase.database().ref('/').remove()
}
function editItem(e){
    var val = e.parentNode.parentNode.childNodes[0].childNodes[0].childNodes[0].nodeValue;
    var editValue = prompt("Enter Edit Value",val)
    e.parentNode.parentNode.childNodes[0].childNodes[0].childNodes[0].nodeValue = editValue;
    var editTodo = {
        value:editValue,
        key:e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo)
    

}






