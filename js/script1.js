var data = [], user_data=[];
var d1;
var user1;
function load_data() {
    var database = firebase.database().ref('data/');
    var content = document.getElementById("main");
    database.get()
    .then(function (snapshot) {
        snapshot.forEach(function(childSnapshot){
            d1 = childSnapshot.val();
            add_data(d1.active, d1.value);
        });
        content.style.display = "block";
    });
    function add_data(active,value) {
        if(active=="true"){
            data.push(value);

        }
    }
}
function load_user_data(uid) {
    var database = firebase.database().ref('userdata/' + uid);
    // database.update({c
    //     'active': true
    // });
    database.get()
    .then(function (snapshot) {
        snapshot.forEach(function(childSnapshot){
            d1 = childSnapshot.val();
            add_data(d1.value);
        });
    });
    function add_data(value) {
        user_data.push(value);
    }
}
function pushed() {
    var flag = false;
    var ii=0;
    while(!flag){
        flag = true;
        var value = Math.floor(Math.random() * data.length * 2);
        if(value >= data.length){
            option = "Better luck next time";
            break;
        }
        var option = data[value];
        for(var i=0;i<user_data.length;i++){
            if(user_data[i]==option){
                flag=false;
                break;
            }
        }
        ii++;
        if(ii>1000){
            option = "No more Rewards";
            break;
        }
    }
    firebase.database().ref('userdata/' + user1.uid).push({
        'value':option,
        'time': firebase.database.ServerValue.TIMESTAMP
    });
    user_data.push(option);
    var today = new Date();
    document.getElementById("text1").innerHTML = `${option}<br>${today}`;
}
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var user = firebase.auth().currentUser;
        user1 = user;
        if (user != null) {
            document.getElementById('name').innerHTML = user.displayName;
            document.getElementById('loader').style.display = 'none';
            load_data();
            load_user_data(user.uid);
        }
    }
    else {
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    return false;
                },
                uiShown: function() {
                    document.getElementById('loader').style.display = 'none';
                }
            },
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            customParameters: {
              prompt: 'select_account'
            }
        };
        ui.start('#firebaseui-auth-container', uiConfig);
    }
});
