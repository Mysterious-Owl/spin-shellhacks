firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var user = firebase.auth().currentUser;
        user1 = user;
        if (user != null) {
            document.getElementById('name').innerHTML = user.displayName;
            document.getElementById('loader').style.display = 'none';
            document.getElementById('main').style.display = 'block';
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

    function load_user_data(uid){
      var data;
      console.log(uid);
      var database = firebase.database().ref('userdata/' + uid);
      var content = document.getElementById("tab");
      database.get()
      .then(function (snapshot) {
        snapshot.forEach(function(childSnapshot){
            data = childSnapshot.val();
            add_data(data.value, data.time);
        });
      });
      function add_data(value, time) {
          if(value=="Better luck next time") return;
        const date = new Date(time);
        var str = `<tr><td class="fir"><h3>${value}</h3>${date}<hr></td></tr>`;
        content.innerHTML = str + content.innerHTML;
      }
  }
