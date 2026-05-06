function demo08() {
    // *************************************** 
    // d) write the MongoDB javascript shell code needed to get the 3rd largest city in each state

    print("**demo08: get the 3rd largest city in each state ")
    // --- solution 1
    print("solution 1: use $push and $slice to get the 3rd largest city in each state")
    var d1 = db.cityinfo.aggregate( [  
        { $group: { _id: { state: "$state", city: "$city" },  pop: { $sum: "$pop" } }  }, 
        { $sort:  {pop: -1}},    
        { $group: {_id: { state : "$_id.state"},  cities: { $push:{ city: "$_id.city"}}}
    }]).map( function(data) {
        data.cities = data.cities.slice(2, 3);  
        return {state: data._id.state, city: (data.cities.length > 0) ? data.cities[0].city : "no city   found" 
    }});
    print(d1);
    print("******************************************************")

    // --- solution 2
    print("solution 2: use $push and $slice to get the 3rd largest city in each state")
    var d2 = db.cityinfo.aggregate ( [
        {$group:{_id:{state:"$state",city:"$city"}, pop: {$sum: "$pop" } } } , 
        {$sort: { "_id.state" :1 , pop: -1   } }  ,  
        {$group:{ _id: "$_id.state",  rankcity: {$push:  { pop: "$pop" , city: "$_id.city" } } } } ,
        {$project: { ThirdLargestCity: { $slice: ["$rankcity", 2 , 1] } } },
        {$sort: { _id: 1}}
        ] )
    print(d2);
    print("******************************************************")

    // --- solution 3
    //create a collection as follows:
    //_id: state.city
    //pop: sun of all zips code areas in that state.city
    //state
    print("solution 3: create a collection with _id: state.city and pop: sum of all zips code areas in that state.city, then use $sort and $group to get the 3rd largest city in each state")
    db.drop.tmpcityinfo;
    var d3 = db.cityinfo.aggregate( [
        { $group: { _id: { state: "$state", city: "$city" },pop: { $sum: "$pop" } }},
        { $project: { _id : 1, pop : 1,
                state : { 
                    $let: {
                        vars :{ statez : "$_id.state" },
                        in: { $toUpper: "$$statez" }
                    },
                },
                
                city : {
                    $let: {
                        vars : { cityz : "$_id.city" },
                        in: { $toUpper: "$$cityz" }
                    }
                }
            }
        },
        { $sort: { _id : 1 } },
        { $out: "tmpcityinfo"}
    ])
    print(d3);
    print("** See collection tmpcityinfo in DB cityinfo: ")
    print("******************************************************")

} 

demo08();