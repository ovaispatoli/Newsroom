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

    d3.csv("assets/data/data.csv").then((fullData)=>{
        // console.log(data);

        // Loop over to find smoker data and append for each smoker and their age
        fullData.forEach((data)=>{
            data.smokes += data.smokes;
            data.age += data.age;
        });
    
        // Create Scales 

        var xScale =  d3.scaleLinear()
            .domain(d3.extent(fullData, d => d.age))
            .range([0, chartWidth]);

        var yScale = d3.scaleLinear()
            .domain([8, d3.max(fullData, d => d.smokes)])
            .range([chartHeight, 0]);

        // Create axes

        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);

        // Append axes
        
        // x-axis
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height}`)
            .call(xAxis);
        // y-axis
        chartGroup.append("g")
            .call(yAxis);


        // append circles
        chartGroup.selectAll("circle")
            .data(fullData)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.age))
            .attr("cy", d => yScale(d.smokes))
            .attr("r", "10")
            .attr("fill", "blue")
            .attr("stroke-width", "1")
            .attr("stroke", "black")
            .attr("opacity", "0.5")
            .on("mouseover", function(){
                d3.select(this)
                    .attr("fill", "red");
            })
            .on("mouseout", function(){
                d3.select(this)
                    .attr("fill", "blue");
            });


        // append text for chart (circles)
        chartGroup.append("g").selectAll("text")
            .data(fullData)
            .enter()
            .append("text")
            .text(d => d.abbr)
            .attr("x", d => xScale(d.age))
            .attr("y", d => yScale (d.smokes))
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "central")
            .attr("font_family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "white")
            .attr("font-weight", "bold");

        // append text for axes

        // x-axis
        chartGroup.append("text")
            .attr("transform", `translate(${width}/2, ${height + margin.top - 10})`)
            .attr("text-anchor", "middle")
            .attr("font-size", "15px")
            .attr("fill", "black")
            .attr ("font_family", "sans-serif")
            .text("Age");
        // y-axis
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - (margin.left /2))
            .attr("x", 0 - (height/2))
            .attr("text-anchor", "middle")
            .attr("font-size", "15px")
            .attr("fill", "black")
            .attr ("font_family", "sans-serif")
            .text("Percentage of Smokers");
    });
};

makeResponsive();

d3.select(window).on("resize", makeResponsive);


