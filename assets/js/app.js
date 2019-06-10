// @TODO: YOUR CODE HERE!

function makeResponsive() {
   
    // Check to see if svgArea is empty or not, if it is not replace and remove the area with chart
    var svgArea = d3.select("#scatter").select("svg");

    if (!svgArea.empty()){
        svgArea.remove();
    }

    // Parameters for SVG
    var svgHeight = window.innerHeight;
    var svgWidth = window.innerWidth;

    // Margins
    var margin = {
        top: 50,
        right: 50, 
        bottom: 50,
        left: 50
    };

    // Chart area subracted by margins
    var chartHeight = svgHeight - margin.top - margin.bottom;
    var chartWidth = svgWidth - margin.left - margin.right;

    // Make SVG container
    var svg = d3.select("#scatter").append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // shift everything over to margins
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Get data from CSV file

    d3.csv("assets/data/data.csv").then((data)=>{
        // console.log(data);

        // Loop over to find smoker data and append for each smoker and their age
        data.forEach((data)=>{
            data.smokes 
        })
    })


}



