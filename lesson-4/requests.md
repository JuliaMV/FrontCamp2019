## MongoDB part II

### Aggregating Airlines Collection

1. How many records does each airline class have? Use $project to show result as { class:
"Z", total: 999 }  
  
```db.airlines.aggregate([{$group: {_id: "$class", total: {$sum: 1}}}, {$project: {_id:0, class:"$_id", total:"$total"}}]```  
  
output: 
```
{ "class" : "Oregon", "total" : 2012 }
{ "class" : "Ontario", "total" : 1490 }
{ "class" : "Kansas", "total" : 428 }
{ "class" : " Dominican Republic\"", "total" : 91 }
{ "class" : "Illinois", "total" : 6415 }
{ "class" : "Nunavut Territory", "total" : 1 }
{ "class" : " IA\"", "total" : 87 }
{ "class" : " Curacao\"", "total" : 5 }
{ "class" : "Iowa", "total" : 852 }
{ "class" : "Missouri", "total" : 2723 }
{ "class" : "Virginia", "total" : 5098 }
{ "class" : " PA\"", "total" : 217 }
{ "class" : "Newfoundland and Labrador", "total" : 21 }
{ "class" : " Switzerland\"", "total" : 6 }
{ "class" : "Nebraska", "total" : 951 }
{ "class" : "New Mexico", "total" : 872 }
{ "class" : " Jamaica\"", "total" : 23 }
{ "class" : " Peru\"", "total" : 2 }
{ "class" : " Cayman Islands\"", "total" : 1 }
{ "class" : " DE\"", "total" : 5 }
...
```  

2. What are the top 3 destination cities outside of the United States (destCountry field, not
included) with the highest average passengers count? Show result as { "avgPassengers" :
2312.380, "city" : "Minsk, Belarus" }  
```x```  
output: ```x```  


3. Which carriers provide flights to Latvia (destCountry)? Show result as one document {
"_id" : "Latvia", "carriers" : [ "carrier1", " carrier2", …] }  

```db.airlines.aggregate([{$match: {"destCountry": " Latvia\""}},{$group:{_id:{destCountry:"$destCountry",carrier:"$carrier"}}},{$group:{_id:"$_id.destCountry",carriers:{$push:"$_id.carrier"}}}])```  

output: ```{ "_id" : " Latvia\"", "carriers" : [ "Uzbekistan Airways", "Blue Jet SP Z o o", "JetClub AG" ] }```  


4. What are the carriers which flue the most number of passengers from the United State to either
Greece, Italy or Spain? Find top 10 carriers, but provide the last 7 carriers (do not include the
first 3). Show result as { "_id" : "<carrier>", "total" : 999}  
```x```  
output: ```x```  

5. Find the city (originCity) with the highest sum of passengers for each state (originState)
of the United States (originCountry). Provide the city for the first 5 states ordered by state
alphabetically (you should see the city for Alaska, Arizona and etc). Show result as {
"totalPassengers" : 999, "location" : { "state" : "abc", "city" : "xyz"
} }  
```x```  
output: ```x```  
