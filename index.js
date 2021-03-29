//2021-03-26-2 gets data from firebase storage and draws the chart
google.charts.load("current", { packages: ["line"] });
google.charts.setOnLoadCallback(doTheJob);

function getData(url, callback) {
  // read text from URL location
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send(null);
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var type = request.getResponseHeader("Content-Type");
      if (type.indexOf("text") !== 1) {
        //console.log("getData called");
        callback(request.responseText);
      }
    }
  };
}

function drawChart(val) {
  //console.log("drawChart called");
  //console.log(val);

  var data = new google.visualization.DataTable();
  data.addColumn("number", "x title");
  data.addColumn("number", "data 1");
  data.addColumn("number", "data 2");
  var array = csvToArray(val);
  array.pop(); //to remove the last element which is [0] probably generated because of last endline in csv
  //console.log(array);
  data.addRows(array);
  //console.log(data);
	
  //chart options
  var options = {
    chart: {
      title: "Title",
      subtitle: "subtitle"
    }
  };

  var chart = new google.charts.Line(document.getElementById("curve_chart"));
  chart.draw(data, google.charts.Line.convertOptions(options));
}


function csvToArray(csv) {
  rows = csv.split("\n");
  return rows.map(function(row) {
    return row.split(",").map(x => +x); //.map(x=>+x) to make it number
  });
}

function doTheJob() {
  //uncomment following if debugging on StackBlitz
  getData("https://ded8344d-15b3-45ae-bdcf-a56d4c5785af.filesusr.com/ugd/76040e_8fc14d74bd6844fba40f080df1f7ea40.csv", drawChart);
  
  //comment out following if debugging (but not deploying) on StackBlitz 
  //var auth = firebase.auth();
  //var storageRef = firebase.storage().ref();
  //var fileRef = storageRef.child("abc123.csv");

  fileRef.getDownloadURL().then(url => {
    //console.log(url);
    getData(url, drawChart);
  });
}
