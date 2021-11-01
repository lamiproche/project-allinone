
function getFormatDate(date){
    let year = date.year;
    let month = date.month;
    let day = date.day;

    let fullDate = year + '-' + month + '-' + day;

    return fullDate;
}


function memberMultiLineDay(objTotal, objMale, objFemale) {

    console.log("====================  memberMultiLineDay  ===================")
    console.log(objTotal)
    console.log(objMale)
    console.log(objFemale)


    const margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 700 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    let data = [];

    objTotal.forEach(result => {
        console.log(result.date)
        console.log(result.customerNum)
        data.push({ date : getFormatDate(result.date), value :(result.customerNum)})
    })

    let data0 = [];

    objMale.forEach(result => {
        console.log(result.date)
        console.log(result.customerNum)
        data0.push({ date : getFormatDate(result.date), value :(result.customerNum)})
    })

    let data1 = [];

    objFemale.forEach(result => {
        console.log(result.date)
        console.log(result.customerNum)
        data1.push({ date : getFormatDate(result.date), value :(result.customerNum)})
    })


    const svg = d3.select("#LineMemberDay")
        .append('svg')
        .style("width", width + margin.left + margin.right).style("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.date))
        .padding(0.3);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width + 25)
        .attr("y", height + 25)
        .text("날짜");

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height, 0])
    svg.append("g")
        .call(d3.axisLeft(y))
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", "-0.9em")
        .attr("transform", "rotate(0)")
        .text("명 수");



    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 3.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value)));
    svg.append("path")
        .datum(data0)
        .attr("fill", "none")
        .attr("stroke", "#b3698c")
        .attr("stroke-width", 3.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value)));
    svg.append("path")
        .datum(data1)
        .attr("fill", "none")
        .attr("stroke", "#6979b3")
        .attr("stroke-width", 3.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value)));

    svg.node();
}