const sql = require("mssql");

Date.prototype.getUnixTime = function() { return this.getTime() };
if(!Date.now) Date.now = function() { return new Date(); }
Date.time = function() { return Date.now().getUnixTime(); }

let config = {
        user: "sa",
        password: "2905904919301",
        server: "DESKTOP-H54R1TJ\\SQLEXPRESS",
        database: "ITMEDB",
        port: 1433
    };

const getData = async () => {    
  try {          
  //here we divide the code of mssql//////////////////////////////  
  
  await sql.connect(config);        
  var result = await sql.query`SELECT TagTimeStamp, Value FROM SEICEVENTHISTORY ORDER BY TagTimeStamp ASC`;
  
  
  var lres = result["recordset"];  // here I am getting the records that I need with the proper key
  
  var mySecondData = lres.map(function(item) { // with this function I am adjusting the data to create the chart
       return [new Date(item.TagTimeStamp).getUnixTime(), item.Value];
        
    });     
        
        return mySecondData;
  //return [mySecondData[0], mySecondData[1]]; //////////////////////////////
    } catch (err) {
        console.log(err);
        return { hello: "world" };
    }
};

//const fromDate = ...
  //const toDate = ....  
const getDataWithLimits = async (fromDate, toDate) => {

try {    
     //here we divide the code of mssql//////////////////////////////  
        await sql.connect(config);
        var result = await sql.query(`SELECT TagTimeStamp, Value FROM SEICEVENTHISTORY WHERE TagTimeStamp BETWEEN '${fromDate}' AND '${toDate}' ORDER BY TagTimeStamp ASC;`);
  
   
  //var myKeyIdentifier = Object.keys(result)[1]; // ignore this line bro
  
  var lres = result["recordset"];  // here I am getting the records that I need with the proper key
  //var myData = lres.map(function(item) { // with this function I am adjusting the data to create the chart
    //  return {x : item.TagTimeStamp, y : item.Value };
    //});
  var mySecondData = lres.map(function(item) { // with this function I am adjusting the data to create the chart
       return [new Date(item.TagTimeStamp).getUnixTime(), item.Value];
        
    });    
 
        
        return mySecondData;
  //return [mySecondData[0], mySecondData[1]]; //////////////////////////////
    } catch (err) {
        console.log(err);
        return { hello: "world" };
    }

};

module.exports = {getData, getDataWithLimits};