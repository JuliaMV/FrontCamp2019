## MongoDB part I

### Section 3

Answer the following questions and include both query and the result (if applicable) into your report:
1. How many “Chinese” (cuisine) restaurants are in “Queens” (borough)?  
```db.restaurants.find({cuisine:"Chinese", borough:"Queens"}).count()```  
output: ```728```  

2. What is the _id of the restaurant which has the grade with the highest ever score?  
```db.restaurants.find().sort({"grades.score": -1})```  
output: returns all data sorted in descending order for ```grades.score``` field. The first element restaurant_id is ```40372466```  

3. Add a grade { grade: "A", score: 7, date: ISODate() } to every restaurant in “Manhattan”
(borough).  
```db.restaurants.updateMany({borough:"Manhattan"}, {$push: {grades: {grade: "A", score: 7, date: ISODate()}}})```  
output: ```{ "acknowledged" : true, "matchedCount" : 10259, "modifiedCount" : 10259 }```  

4. What are the names of the restaurants which have a grade at index 8 with score less then 7? Use projection to
include only names without _id.
```db.restaurants.find({"grades.8.score": {$lt: 7}}, {name: 1, _id: 0})```  
output: ```{ "name" : "Silver Krust West Indian Restaurant" } { "name" : "Pure Food" }```  

5. What are _id and borough of “Seafood” (cuisine) restaurants which received at least one “B” grade in period
from 2014-02-01 to 2014-03-01? Use projection to include only _id and borough.
```db.restaurants.find({cuisine: "Seafood", grades: {$elemMatch: {grade: "B", date: {$gte:ISODate('2014-02-01'), $lte:ISODate('2014-03-01')}}}}, {borough: 1})```  
output: ```{ "_id" : ObjectId("5dc5b8ab1146f529d031583b"), "borough" : "Bronx" } { "_id" : ObjectId("5dc5b8ab1146f529d0315ab2"), "borough" : "Manhattan" }```  


### Section 4
Indexing Restaurants Collection 
Note: you may use MongoDB Compass for this task if you want to
Create the following indexes:
1. Create an index which will be used by this query and provide proof (from explain() or Compass UI) that the
index is indeed used by the winning plan:
db.restaurants.find({ name: "Glorious Food" })  

create index: ``` db.restaurants.createIndex({name:1})```  
output: ```{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
}```  

show all indexes: ``` db.restaurants.getIndexes()```  
output:
```
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1
                },
                "name" : "_id_",
                "ns" : "frontcamp.restaurants"
        },
        {
                "v" : 2,
                "key" : {
                        "name" : 1
                },
                "name" : "name_1",
                "ns" : "frontcamp.restaurants"
        }
]
```

proof: ```db.restaurants.explain("executionStats").find({name:"Glorious Food"}, {name: 1, _id: 0})```  
output:  
```
{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "frontcamp.restaurants",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "name" : {
                                "$eq" : "Glorious Food"
                        }
                },
                "winningPlan" : {
                        "stage" : "PROJECTION_COVERED",
                        "transformBy" : {
                                "name" : 1,
                                "_id" : 0
                        },
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "keyPattern" : {
                                        "name" : 1
                                },
                                "indexName" : "name_1",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                        "name" : [ ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "name" : [
                                                "[\"Glorious Food\", \"Glorious Food\"]"
                                        ]
                                }
                        }
                },
        },
    ...
}
```

2. Drop index from task 4.1  
``` db.restaurants.dropIndex({name: 1})```  
output: ```{ "nIndexesWas" : 2, "ok" : 1 }```  

3. Create an index to make this query covered and provide proof (from explain() or Compass UI) that it is
indeed covered:
db.restaurants.find({ restaurant_id: "41098650" }, { _id: 0, borough: 1 })  
```db.restaurants.createIndex({restaurant_id: -1, borough: 1, _id: 1})```
output: ``` {
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 2,
        "numIndexesAfter" : 3,
        "ok" : 1
}```  
proof: ``` db.restaurants.explain("executionStats").find({restaurant_id: "41098650"}, {_id: 0, borough: 1})```  
output:  
```
{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "frontcamp.restaurants",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "restaurant_id" : {
                                "$eq" : "41098650"
                        }
                },
                "winningPlan" : {
                        "stage" : "PROJECTION_COVERED",
                        "transformBy" : {
                                "_id" : 0,
                                "borough" : 1
                        },
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "keyPattern" : {
                                        "restaurant_id" : -1,
                                        "borough" : 1,
                                        "_id" : 1
                                },
                                "indexName" : "restaurant_id_-1_borough_1__id_1",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                        "restaurant_id" : [ ],
                                        "borough" : [ ],
                                        "_id" : [ ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "restaurant_id" : [
                                                "[\"41098650\", \"41098650\"]"
                                        ],
                                        "borough" : [
                                                "[MinKey, MaxKey]"
                                        ],
                                        "_id" : [
                                                "[MinKey, MaxKey]"
                                        ]
                                }
                        }
                },
                ...
}
```


4. Create a partial index on cuisine field which will be used only when filtering on borough equal to “Staten
Island”:
db.restaurants.find({ borough: "Staten Island", cuisine: "American" }) – uses index
db.restaurants.find({ borough: "Staten Island", name: "Bagel Land" }) – does not use index
db.restaurants.find({ borough: "Queens", cuisine: "Pizza" }) – does not use index  
``` db.restaurants.createIndex({cuisine: 1}, {partialFilterExpression: {borough: "Staten Island"}}) ```  
output: ```{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
}```  

```db.restaurants.explain("executionStats").find({borough: "Staten Island", cuisine: "American"})```
output:  
```
{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "frontcamp.restaurants",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "$and" : [
                                {
                                        "borough" : {
                                                "$eq" : "Staten Island"
                                        }
                                },
                                {
                                        "cuisine" : {
                                                "$eq" : "American"
                                        }
                                }
                        ]
                },
                "winningPlan" : {
                        "stage" : "FETCH",
                        "filter" : {
                                "borough" : {
                                        "$eq" : "Staten Island"
                                }
                        },
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "keyPattern" : {
                                        "cuisine" : 1
                                },
                                "indexName" : "cuisine_1",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                        "cuisine" : [ ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : true,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "cuisine" : [
                                                "[\"American\", \"American\"]"
                                        ]
                                }
                        }
                },
        ...
}
```   

```db.restaurants.explain("executionStats").find({borough: "Staten Island", name: "Bagel Land"})```
```{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "frontcamp.restaurants",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "$and" : [
                                {
                                        "borough" : {
                                                "$eq" : "Staten Island"
                                        }
                                },
                                {
                                        "name" : {
                                                "$eq" : "Bagel Land"
                                        }
                                }
                        ]
                },
                "winningPlan" : {
                        "stage" : "COLLSCAN",
                        "filter" : {
                                "$and" : [
                                        {
                                                "borough" : {
                                                        "$eq" : "Staten Island"
                                                }
                                        },
                                        {
                                                "name" : {
                                                        "$eq" : "Bagel Land"
                                                }
                                        }
                                ]
                        },
                        "direction" : "forward"
                },
                "rejectedPlans" : [ ]
        }
        ...
}
```


```db.restaurants.explain("executionStats").find({borough: "Queens", cuisine: "Pizza"})```
```
{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "frontcamp.restaurants",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "$and" : [
                                {
                                        "borough" : {
                                                "$eq" : "Queens"
                                        }
                                },
                                {
                                        "cuisine" : {
                                                "$eq" : "Pizza"
                                        }
                                }
                        ]
                },
                "winningPlan" : {
                        "stage" : "COLLSCAN",
                        "filter" : {
                                "$and" : [
                                        {
                                                "borough" : {
                                                        "$eq" : "Queens"
                                                }
                                        },
                                        {
                                                "cuisine" : {
                                                        "$eq" : "Pizza"
                                                }
                                        }
                                ]
                        },
                        "direction" : "forward"
                },
               ...
}
```


5. Create an index to make query from task 3.4 covered and provide proof (from explain() or Compass UI) that
it is indeed covered  
```db.restaurants.createIndex({name: 1, "grades.score": 1})```  
TBD
