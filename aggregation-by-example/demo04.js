function demo04() {
    // ***************************************   	
    // Combine the concepts used in the aggregation queries from section 02a_MongoDBAggregation 
    // to:
    // 	* write a function that takes in a parameter to get the city with the smallest population
    // 	• display the state , city name, population of smallest city for a specific state		 	
    function smallestCity(st) {
        var dbc = db.cityinfo.aggregate([
            { $group:{_id: { state: "$state", city: "$city" },pop: { $sum: "$pop" }}},
            { $sort: { pop: 1 } },
            { $match: {"_id.state": st }},
            { $group:{_id : "$_id.state",smallestCity: { $first: "$_id.city"}, pop: {$first: "$pop"}}}
            ]);
        return dbc;
    }

    print("**demo04: display the state , city name, population of smallest city for a specific state ")    
    printjson(smallestCity("NH"))
    printjson(smallestCity("NY"))   
}

demo04();