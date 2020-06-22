const sql = require("mssql");

Date.prototype.getUnixTime = function () {
  return this.getTime();
};
if (!Date.now)
  Date.now = function () {
    return new Date();
  };
Date.time = function () {
  return Date.now().getUnixTime();
};

let config = {
  user: "sa",
  password: "2905904919301",
  server: "DESKTOP-H54R1TJ\\SQLEXPRESS",
  database: "ITMEDB",
  port: 1433,
};

const getData = async () => {
  try {
    await sql.connect(config);
    var result = await sql.query`SELECT TagTimeStamp, Value FROM SEICEVENTHISTORY ORDER BY TagTimeStamp ASC`;

    var lres = result["recordset"];

    var mySecondData = lres.map(function (item) {
      return [new Date(item.TagTimeStamp).getUnixTime(), item.Value];
    });

    return mySecondData;
  } catch (err) {
    console.log(err);
    return { hello: "world" };
  }
};

const getDataWithLimits = async (fromDate, toDate) => {
  try {
    await sql.connect(config);
    var result = await sql.query(
      `SELECT TagTimeStamp, Value FROM SEICEVENTHISTORY WHERE TagTimeStamp BETWEEN '${fromDate}' AND '${toDate}' ORDER BY TagTimeStamp ASC;`
    );

    var lres = result["recordset"];

    var mySecondData = lres.map(function (item) {
      return [new Date(item.TagTimeStamp).getUnixTime(), item.Value];
    });

    return mySecondData;
  } catch (err) {
    console.log(err);
    return { hello: "world" };
  }
};

module.exports = { getData, getDataWithLimits };
