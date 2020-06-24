// Subscribes to receive property changes
//cwidget.on("PropertyName", function() {

// Gets property value
//console.log(cwidget.PropertyName);

// Sets property value
//   cwidget.PropertyName = "value"

// Triggers an event
//   cwidget.dispatchEvent("EventName");

//});

const populateChart = (data) => {
  console.log(data);
  new Vue({
    el: "#app",
    components: {
      apexchart: VueApexCharts,
    },
    data: {
      series: [
        {
          data: data,
        },
      ],
      chartOptions: {
        chart: {
          id: "area-datetime",
          type: "area",
          height: 350,
          zoom: {
            autoScaleYaxis: true,
          },
        },
        annotations: {
          yaxis: [
            {
              y: 30,
              borderColor: "#999",
              label: {
                show: true,
                text: "Support",
                style: {
                  color: "#fff",
                  background: "#00E396",
                },
              },
            },
          ],
          xaxis: [
            {
              x: new Date("05 Oct 2019").getTime(),
              borderColor: "#999",
              yAxisIndex: 0,
              label: {
                show: true,
                text: "Rally",
                style: {
                  color: "#fff",
                  background: "#775DD0",
                },
              },
            },
          ],
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: "hollow",
        },
        xaxis: {
          type: "datetime",
          min: new Date("05 Oct 2019").getTime(),
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
          },
        },
      },

      selection: "one_year",
    },
    methods: {
      updateData: function (timeline) {
        this.selection = timeline;

        switch (timeline) {
          case "Customized":
            this.$refs.chart.zoomX(
              new Date("05 Oct 2019").getTime(),
              new Date("06 Oct 2019").getTime()
            );
            break;
          case "all":
            this.$refs.chart.zoomX(data[0][0], data[data.length - 1][0]);
            break;
          default:
        }
      },
    },
  });
};

document
  .querySelector(".submitter")
  .addEventListener("click", () => submitRange());

const submitRange = async () => {
  console.log("here");
  const timestamp = document.querySelector("#lower").value;
  const timestamp2 = document.querySelector("#upper").value;
  console.log(timestamp, timestamp2);

  const data = await fetch("http://localhost:5000/range", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ timestamp, timestamp2 }),
    mode: "cors",
  }).then((response) => response.json());
  populateChart(data);
};

function myFetch() {
  fetch("http://localhost:5000/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      populateChart(data);
    });
}

//myFetch();
function refreshPage() {
        window.location.reload();
}

function myHidingFunction() {  
  var x = document.getElementById("morehd");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  var c = document.getElementById("parent1");
  if (c.style.display === "none") {
    c.style.display = "block";
  } else {
    c.style.display = "none";
  }
}
