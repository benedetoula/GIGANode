// data.js

function stats(){
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
  const txt = this.responseText;
  const obj = JSON.parse(txt);

  const timestamp = obj[0].timestamp;
  const date = new Date(timestamp);

  const content = obj[0].value.content.content;
  const country = content.client.country;
  const geo = obj[0].value.content.lat + " , " + obj[0].value.content.lon;
  const download = obj[0].value.content.download / 10**3;
  const upload = obj[0].value.content.upload / 10**3;

  document.getElementById("dataNode").innerHTML = date.toUTCString() + "<br>" + geo + " | " + country + " <br><br> ";
  document.getElementById("dataParse").innerHTML =  "<b>ISP</b> " + obj[0].value.content.isp + "<br>" +
                                                    "<b>Download</b> " + `${(download > 10**3) ? `${(download / 10**3).toFixed(2)} MB` : `${download.toFixed(2)} KB`}`  + "<br>" +
                                                    "<b>Upload</b> " + `${(upload > 10**3) ? `${(upload / 10**3).toFixed(2)} MB` : `${download.toFixed(2)} KB`}`  + "<br>" +
                                                    "<b>Latency </b> " + `${obj[0].value.content.ping.toFixed(2)} Sec`;
  }
  xhttp.open("GET", "data/wat.json");
  xhttp.send();
}

function status(){
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
  const txt = this.responseText;
  const obj = JSON.parse(txt);

  document.getElementById("quality").innerHTML = obj.quality;
  document.getElementById("status").innerHTML = obj.status;
    if(obj.status == "Connected"){
      document.getElementById("bgStatus").style.backgroundColor = "#277aff";
    } else {
      document.getElementById("bgStatus").style.backgroundColor = "#f94B4B";
    }
  }
  xhttp.open("GET", "data/status.json");
  xhttp.setRequestHeader('Content-type','application/json');
  xhttp.send();
}

function checkChange(){
  var previous = "";

  setInterval(function() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      var fileInfo = this.getResponseHeader("Last-Modified");
      if (fileInfo != previous) {
        status();
        stats();
        console.log(fileInfo);
        previous = fileInfo;
      }
    }
    xhttp.open("HEAD", "data/status.json", true);
    xhttp.send();
  }, 2000);
}

// Document Ready?
$( document ).ready(function() {
  stats();
  status();
  checkChange();
  console.log( "Ready!" );
});
