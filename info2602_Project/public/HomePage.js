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

    function signOut(){
        auth.signOut();
        alert("Signed Out Successfully!");
    }
 
    function GetNames(){ // function to read data from database

        var filter = GetFilterValue();

        //Filter code
        var dbRefObject = firebase.database().ref().child('Main');       
        
        const ulList = document.getElementById('listName');
        ulList.innerHTML = "";

        if (filter.length !== 0) {
            dbRefObject = dbRefObject.orderByChild('flavour').equalTo(GetFilterValue());
        }

        dbRefObject.on('child_added', snap=>{
            const li = document.createElement('li'); 
            var key = snap.key;
            var name = snap.child('name').val();
            if (window.PAGE_NAME === 'home') {
                li.innerHTML = `<b class='r-link' onclick="PopulateRecipieData('${key}')";>${name}</a>`  
            }
            else
            {
                li.innerHTML = `<b class='r-link' onclick="DeleteFun('${key}')";>${name}</a>`  
            }
            ulList.appendChild(li);
        }); 
    }

    function GetFilterValue() {
        var filterValue = document.getElementById('flavor').value.toLowerCase();
        return filterValue;
    }

    function PopulateRecipieData(key) {
        //Call on actual data to grab the speicifc recipie
        const ulList = document.getElementById('list');
        
        const item = firebase.database().ref().child('Main').child(key);
        //Populate fields
        
        const dbRefList = item.child('name');
        
        //sync list change
        dbRefList.on('child_added', snap => { 
            const li = document.createElement('li'); 
            li.innerText = snap.val(); 
            ulList.appendChild(li);
        });
        
        PopulateRecipieData2(key);
    }

    function PopulateRecipieData2(key) {
        const ulList = document.getElementById('list2');
        const item = firebase.database().ref().child('Main').child(key);
        const dbRefList = item.child('ingredients');
        
        dbRefList.on('child_added', snap => { 
            const li = document.createElement('li'); 
            li.innerText = snap.val(); 
            ulList.appendChild(li);
        });

        PopulateRecipieData3(key);
    }

    function PopulateRecipieData3(key) {
        const ulList = document.getElementById('list3');
        const item = firebase.database().ref().child('Main').child(key);
        const dbRefList = item.child('Steps');
        
        dbRefList.on('child_added', snap => { 
            const li = document.createElement('li'); 
            li.innerText = snap.val(); 
            ulList.appendChild(li);
        });
    }

    window.onload = function() {
        recipies = [];
        if (window.PAGE_NAME === 'home' || window.PAGE_NAME === 'remove' ) {
        window.onload = callAll();
         }
    };

    //function to add data to the database for use with the add new recipe page
    function GetLatestRecordAndAddNew() { 
        readincrval().then(
            result => AddNewRec(result.val() + 1)
        )
    }

    function AddNewRec(dbIterator){ 
        var counter1 = 0;
        var counter2 = 0;
        var record = ('rec' + dbIterator);
        var id = dbIterator; 
        var RecName = document.getElementById('ToAddRecipeName');
        var flavor = document.getElementById('Flavor');
        var ingredients = document.getElementById('Ingredients');
        var steps = document.getElementById('Steps');

        var firebaseRef = firebase.database().ref().child('Main');

        firebaseRef.child(record).child("flavour").set(Flavor.value.toLowerCase()); 
        firebaseRef.child(record).child("id").set(id); 
        firebaseRef.child(record).child("name").set(RecName.value); 
  
        var textArea = document.getElementById("Steps"); 
        var arrayOfLines = textArea.value.split(String.fromCharCode(10));
        var iterator = arrayOfLines.values();  
        for (let elements of iterator) { 
            firebaseRef.child(record).child("Steps").child(counter1).set(elements);          
            counter1 += 1;      
        }

        var textArea = document.getElementById("Ingredients"); 
        var arrayOfLines = textArea.value.split(String.fromCharCode(10));
        var iterator = arrayOfLines.values();  
        for (let elements of iterator) { 
            firebaseRef.child(record).child("ingredients").child(counter2).set(elements);          
            counter2 += 1;      
        }

        var newVal = dbIterator;
        updatedataincr(newVal);
        alert("Recipe Was Added Successfully!");
    }

    function updatedataincr(newVal){ // function to iterate main value for entire database
        var firebaseRef = firebase.database().ref().child('IncrSettings');
        firebaseRef.child("IncrVal").set(newVal);
    }

    function readincrval()
    {
        return firebase.database().ref().child('IncrSettings').child('IncrVal')
         .once('value')
    }

    function DeleteFun(id){
        var r = confirm("Are you sure you want to delete this record?");
        if (r == true) {            
            var firebaseRef = firebase.database().ref().child('Main').child(id).remove().then(function() {GetNames();});
        }
    }

    function callAll(){ // to display all data from database
       GetNames(); 
    }
