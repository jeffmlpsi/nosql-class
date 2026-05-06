function demo09() {
    //create a collection of states   
    print("**demo09: create a collection of states")
    db.drop.tmpstates;
    print(
        db.cityinfo.aggregate( [ 
            { $project: { _id : 0, state : 1 }} ,
            { $group: { _id : "$state" }},
            { $out: "tmpstates" }
            ])
    )
    print("** See collection tmpstates in DB cityinfo: ")
} 

demo09();