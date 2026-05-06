function demo03() {
    // ***************************************
    // Combine the concepts used in the aggregation queries from section 02a_MongoDBAggregation 
    // to:
    // 	• display the state , city name, population of smallest city for a specific state	
    print("**demo03: display the state , city name, populsation of smallest city for a specific state ")	
    printjson(
        db.cityinfo.aggregate([
            { $group:{_id: { state: "$state", city: "$city" },pop: { $sum: "$pop" }}},
            { $sort: { pop: 1 } },
            { $match: {"_id.state": "NH" }},
            { $group:{_id : "$_id.state",smallestCity: { $first: "$_id.city"}, pop: {$first: "$pop"}}}
            ])
    )
}

demo03();
