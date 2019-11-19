## MongoDB part II

### Aggregating Airlines Collection

1. How many records does each airline class have? Use $project to show result as { class:
"Z", total: 999 }  
  
```db.airlines.aggregate([{$group: {_id: "$class", total: {$sum: 1}}}, {$project: {_id:0, class:"$_id", total:"$total"}}])```  
  
output: 
```{ "class" : "G", "total" : 17499 }
{ "class" : "L", "total" : 23123 }
{ "class" : "P", "total" : 5683 }
{ "class" : "F", "total" : 140343 }
```  

2. What are the top 3 destination cities outside of the United States (destCountry field, not
included) with the highest average passengers count? Show result as { "avgPassengers" :
2312.380, "city" : "Minsk, Belarus" }  

```
db.airlines.aggregate([{$match: {
  destCountry: {
    $ne: "United States"
  }
}}, {$group: {
  _id: "$destCity",
  avgPassengers: {
    $avg: "$passengers"
  }
}}, {$sort: {
  avgPassengers: -1
}}, {$limit: 3}, {$project: {
  _id: 0,
  avgPassengers: "$avgPassengers",
  city: "$_id"
}}])
```  

output:  

```
{ "avgPassengers" : 8052.380952380952, "city" : "Abu Dhabi, United Arab Emirates" }
{ "avgPassengers" : 7176.596638655462, "city" : "Dubai, United Arab Emirates" }
{ "avgPassengers" : 7103.333333333333, "city" : "Guangzhou, China" }
```  


1. Which carriers provide flights to Latvia (destCountry)? Show result as one document {
"_id" : "Latvia", "carriers" : [ "carrier1", " carrier2", …] }  

```db.airlines.aggregate([{$match: {"destCountry": "Latvia"}},{$group:{_id:{destCountry:"$destCountry",carrier:"$carrier"}}},{$group:{_id:"$_id.destCountry",carriers:{$push:"$_id.carrier"}}}])```  

output: ```{ "_id" : "Latvia", "carriers" : [ "Blue Jet SP Z o o", "JetClub AG", "Uzbekistan Airways" ] }```  


4. What are the carriers which flue the most number of passengers from the United State to either
Greece, Italy or Spain? Find top 10 carriers, but provide the last 7 carriers (do not include the
first 3). Show result as { "_id" : "<carrier>", "total" : 999}  

```
db.airlines.aggregate([{
    $match: {
        originCountry: "United States",
        $or: [{
            destCountry: "Greece"
        }, {
            destCountry: "Spain"
        }, {
            destCountry: "Italy"
        }]
    }
}, {
    $group: {
        _id: "$carrier",
        total: {
            $sum: "$passengers"
        }
    }
}, {
    $sort: {
        total: -1
    }
}, {
    $limit: 10
}, {
    $skip: 3
}])
```  
output: 
```
{ "_id" : "Compagnia Aerea Italiana", "total" : 280256 }
{ "_id" : "United Air Lines Inc.", "total" : 229936 }
{ "_id" : "Emirates", "total" : 100903 }
{ "_id" : "Air Europa", "total" : 94968 }
{ "_id" : "Meridiana S.p.A", "total" : 20308 }
{ "_id" : "Norwegian Air Shuttle ASA", "total" : 13344 }
{ "_id" : "VistaJet Limited", "total" : 183 }
```  

5. Find the city (originCity) with the highest sum of passengers for each state (originState)
of the United States (originCountry). Provide the city for the first 5 states ordered by state
alphabetically (you should see the city for Alaska, Arizona and etc). Show result as {
"totalPassengers" : 999, "location" : { "state" : "abc", "city" : "xyz"} }  
```
db.airlines.aggregate([{$match: {
  originCountry: "United States"
}}, {$group: {
  _id: {
    state: "$originState",
    city: "$originCity"
  },
  totalPassengers: {
    $sum: "$passengers"
  }
}}, {$sort: {
  totalPassengers: -1
}}, {$limit: 5}, {$project: {
  _id: 0,
  totalPassengers: "$totalPassengers",
  location: "$_id"
}}, {$sort: {
  "location.state": 1
}}])
```  
output: 
```
{ "totalPassengers" : 23701556, "location" : { "state" : "California", "city" : "Los Angeles, CA" } }
{ "totalPassengers" : 29416565, "location" : { "state" : "Georgia", "city" : "Atlanta, GA" } }
{ "totalPassengers" : 28035755, "location" : { "state" : "Illinois", "city" : "Chicago, IL" } }
{ "totalPassengers" : 25266639, "location" : { "state" : "New York", "city" : "New York, NY" } }
{ "totalPassengers" : 18408792, "location" : { "state" : "Texas", "city" : "Dallas/Fort Worth, TX" } }
```  

### Aggregate Enron Collection

Inspect a few of the documents to get a basic understanding of the structure. Enron was an American
corporation that engaged in a widespread accounting fraud and subsequently failed.In this dataset, each document is an email message. Like all Email messages, there is one sender but
there can be multiple recipients.
For this task you will use the aggregation framework to figure out pairs of people that tend to
communicate a lot. To do this, you will need to unwind the To list for each message.
This problem is a little tricky because a recipient may appear more than once in the To list for a
message. You will need to fix that in a stage of the aggregation before doing your grouping and counting
of (sender, recipient) pairs.
Which pair of people have the greatest number of messages in the dataset?
For you reference the number of messages from phillip.love@enron.co to sladanaanna.kulic@enron.com is 144.

```
```

output: 
```
```
