function demo02() {
    // ***************************************
    // Combine the concepts used in the aggregation queries from section 02a_MongoDBAggregation 
    // to:
    // 	•  display the state ,the city, the population of smallest city in each output document
    print("**demo02: display the state ,the city, the population of smallest city in each output document ")
    print(
        db.cityinfo.aggregate([
            { $group:{_id: { state: "$state", city: "$city" },pop: { $sum: "$pop" }}},
            { $sort: { pop: 1 } },
            { $group:{_id : "$_id.state",smallestCity: { $first: "$_id.city"}, pop: {$first: "$pop"}}}
            ])
    )
}

demo02()
