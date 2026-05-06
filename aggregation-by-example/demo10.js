function demo10() {
    //create a function that takes in the name of a state and a number
    //and prints out the "nth" largest city based on that number
    function processState( st, n ) {   
        // print("**processState display the " + n + " largest city in state " + st + " based on population")
        if (n <= 0) {
            return "No Data";
        }   
        var citycnt = db.tmpcityinfo.find({ state:st }).count();   
        if (n > citycnt) return;   var index = n - 1;   
        var dbc = db.tmpcityinfo.find({ state:st }).sort( { pop : -1 } )
        var dbcArray = dbc.toArray();
        var nthlargestcity = dbcArray[index];   
        var cityname = nthlargestcity._id.city;
        print('State:' +st + ' ' + n + ' largest=' + cityname);  
    }

    //Test processState
    // print(processState("CA", 5));
    // print(processState("NY", 5));

    //loop through each state
    var states = db.tmpstates.find();
    
    while (states.hasNext()) {
        var curstate = states.next();
        processState(curstate._id, 3);
    }
}

print("You must run demo08.js and demo09.js before running demo10.js to create the collections tmpcityinfo and tmpstates in DB cityinfo")
demo10();