function demo05() {
    // ***************************************  	
    // Combine the concepts used in the aggregation queries from section 02a_MongoDBAggregation 
    // to:
    // 	•  display state , city name of largest city in each output document
    print("**demo05: display state , city name of largest city in each output document ")
    print(
        db.cityinfo.aggregate([
            { $group:{_id: { state: "$state", city: "$city" },pop: { $sum: "$pop" }}},
            { $sort: { pop: 1 } },
            { $group:{_id : "$_id.state",largestCity: { $last: "$_id.city"}}},
            { $project:{ _id: 0,state: "$_id",city: "$largestCity" }}
        ])
    )
}
demo05();