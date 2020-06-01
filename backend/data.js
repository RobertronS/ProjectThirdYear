const sql = require("mssql");

Date.prototype.getUnixTime = function() { return this.getTime() };
if(!Date.now) Date.now = function() { return new Date(); }
Date.time = function() { return Date.now().getUnixTime(); }

module.exports = async () => {
    let config = {
        user: "sa",
        password: "2905904919301",
        server: "DESKTOP-H54R1TJ\\SQLEXPRESS",
        database: "ITMEDB",
        port: 1433
    };

    try {
        // make sure that any items are correctly URL encoded in the connection string
		
        await sql.connect(config);
        var result = await sql.query`SELECT TagTimeStamp, Value FROM SEICEVENTHISTORY ORDER BY TagTimeStamp ASC`;
	//console.log(result);	
	var myKeyIdentifier = Object.keys(result)[1]; // ignore this line bro
	console.log(myKeyIdentifier); // also ignore this line
	var lres = result["recordset"];	// here I am getting the records that I need with the proper key
	var myData = lres.map(function(item) { // with this function I am adjusting the data to create the chart
			return {x : item.TagTimeStamp, y : item.Value };
		});
	var mySecondData = lres.map(function(item) { // with this function I am adjusting the data to create the chart
			 return [new Date(item.TagTimeStamp).getUnixTime(), item.Value];
			  
		});
		
	//console.log(lres);
	console.log("This is the data to use for the Chart");
	//console.log(myData);
        var suka = [];
        suka = [{"x": new Date("2019-10-04T22:00:00.000Z"),"y":5},{"x": new Date("2019-10-04T22:00:00.830Z"),"y":6}];
        console.log(mySecondData[0][0])
        return mySecondData;
	//return mySecondData[0];
    } catch (err) {
        console.log(err);
        return { hello: "world" };
    }
};

