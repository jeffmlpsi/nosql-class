
function demo01() {
    // Aggregation by Example
    // Combine the concepts used in the aggregation queries from section 02a_MongoDBAggregation 
    // to:
    // 	•  display the state and the name of smallest city in each  output document
    print("**demo01: display the state and the name of smallest city in each  output document ")
    print(
        db.cityinfo.aggregate([
            { $group:{_id: { state: "$state", city: "$city" },pop: { $sum: "$pop" }}},
            { $sort: { pop: 1 } },
            { $group:{_id : "$_id.state",smallestCity: { $first: "$_id.city"}}},
            { $project:{ _id: 0,state: "$_id",city: "$smallestCity" }}
        ])
    )
}

demo01();

