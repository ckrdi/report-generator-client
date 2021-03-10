// Use the "report" URL query parameters to determine which
// JSON file needs to be loaded.
// For example: localhost:8000/report.html?report=transportation
// means to get the report data from "transportation.json"
//
// If there is no query parameter present, the reportName
// variable defaults to "communication.json".
const parameters = document.location.search;
const reportName = parameters.split("=")[1] || "communication";
const reportPath = "data/" + reportName + ".json";



// Fetch data, then feed data into callback function
$.getJSON(reportPath, createReport);

function createReport(json) {
  createTitle(json.meta);
  createMain(json.data);
}

function createTitle(meta) {
  $(".Meta__Government").html(meta.municipal_body);
  $(".Meta__Title").html(meta.title);
}

function createMain(data) {
  for (let i = 0; i < data.length; i++) {
    const $reportData = createData(data[i]);
    $(".Report").append($reportData);
  }
}

function createData(data) {
  const $reportRow = $("<div class='Report__Row row'></div>");
  const $label = $("<div class='Report__Label col-6'>" + data.label + "<span> : </span></div>");
  const $value = $("<div class='Report__Value col-6'><span>" + data.value + "</span></div>");

  $reportRow.append($label, $value);

  return $reportRow;
}
