function demo07() {
    // ***************************************   	
    // Combine the concepts used in the aggregation queries from section 02a_MongoDBAggregation 
    // to:
    // 	* write a function that takes in a parameter to get the city with the largest population
    // 	• display the state , city name, population of smallest city for a specific state	 	
    print("**demo07: display the state , city name, population of largest city for a specific state ")
    function largestCity(st) {
        var dbc = db.cityinfo.aggregate([
            { $group:{_id: { state: "$state", city: "$city" },pop: { $sum: "$pop" }}},
            { $sort: { pop: -1 } },
            { $match: {"_id.state": st }},
            { $group:{_id : "$_id.state",largestCity: { $first: "$_id.city"}, pop: {$first: "$pop"}}}
            ]);
        return dbc;
    }

    print(largestCity("NH"));
    print(largestCity("NY"));
}

demo07();