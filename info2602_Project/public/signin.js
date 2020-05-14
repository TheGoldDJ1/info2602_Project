//DO NOT CHANGE ANYTHING ON THIS FILE!!!

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD9d4PJHHDxF_gf5ExHcXgNsS74lvUrEEw",
    authDomain: "final-project-f4a32.firebaseapp.com",
    databaseURL: "https://final-project-f4a32.firebaseio.com",
    projectId: "final-project-f4a32",
    storageBucket: "final-project-f4a32.appspot.com",
    messagingSenderId: "739315028816",
    appId: "1:739315028816:web:99d789b4d713e5c7f29255"
  };
  // Initialize Firebase
    
    firebase.initializeApp(firebaseConfig);

    const auth = firebase.auth();

    function signUp(){
        var email = document.getElementById("email");
        var password = document.getElementById("password");

        const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
        promise.catch(e => alert(e.message));

        alert("Congratulations! You have created a new account.");
    }// end function
   
    function signIn(){
        var email = document.getElementById("email");
        var password = document.getElementById("password");

        const promise = auth.signInWithEmailAndPassword(email.value, password.value);
        promise.catch(e => alert(e.message));

        alert("Signed In Successfully with " + email.value);
    }// end function
  
    function signOut(){
        firebase.auth().signOut();
        alert("Signed Out Successfully!");
    }// end function
    
    firebase.auth().onAuthStateChanged(function(user){    
        if(user){
            window.location = 'HomePage.html';  
        }else{
             alert("To create an account, enter details and hit signup."); 
        }
    });// end function


