function send_data() {
    var messageListRef = firebase.database().ref('data/');
    var newMessageRef = messageListRef.push({
        'value': document.getElementById("headi").value,
        'active': document.getElementById("link").value
    });
}
function delete_data(ddata) {
    var messageListRef = firebase.database().ref('data/'+ddata);
    messageListRef.remove()
        .then(function() {
            console.log("Remove succeeded.")
        })
        .catch(function(error) {
            console.log("Remove failed: " + error.message)
        });
    document.getElementById("tab").innerHTML = "";
    load_data();
}
