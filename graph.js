const dims = { height: 300, width: 300, radius: 150 };
const cent = { x: (dims.width / 2 + 5), y: (dims.height / 2 + 5) };

const svg = d3.select(".canvas")
    .append("svg")
    .attr("width", dims.width + 150)
    .attr("height", dims.height + 150)

const graph = svg.append("g")
    .attr("transform", `translate(${cent.x}, ${cent.y})`);

// pie generator
const pie = d3.pie()
    .sort(null)
    .value(d => d.cost);

// arc generator 
const arcPath = d3.arc()
    .outerRadius(dims.radius)
    .innerRadius(dims.radius / 2);

const colour = d3.scaleOrdinal(d3['schemeSet3'])

const update = (data) => {
    colour.domain(data.map(d => d.name));
    const paths = graph.selectAll("path")
        .data(pie(data));

    paths.exit()
        .transition().duration(750)
        .attrTween("d", arcTweenExit)
        .remove();

    paths.attr("d", arcPath)
        .transition().duration(750)
        .attrTween("d", arcTweenUpdate);

    paths.enter()
        .append("path")
        .attr("class", "arc")
        .attr("stroke", "#fff")
        .attr("stroke-width", 3)
        .attr("fill", d => colour(d.data.name))
        .each(function(d) { this._current = d })
        .transition().duration(750)
        .attrTween("d", arcTweenEnter)
}

let data = [];

db.collection("expenses")
    .orderBy("cost")
    .onSnapshot(res => {

        res.docChanges().forEach(change => {

            const doc = {...change.doc.data(), id: change.doc.id };

            // changes in the database
            switch (change.type) {
                case "added":
                    data.push(doc);
                    break;
                case "modified":
                    const index = data.findIndex(item => item.id == doc.id);
                    data[index] = doc;
                    break;
                case "removed":
                    data = data.filter(item => item.id !== doc.id)
                    break;
                default:
                    break;
            }
        });

        update(data);

    });

const arcTweenEnter = (d) => {
    const i = d3.interpolate(d.endAngle, d.startAngle);

    return function(t) {
        d.startAngle = i(t)
        return arcPath(d)
    }
}

const arcTweenEnter = (d) => {
    const i = d3.interpolate(d.startAngle, d.endAngle);

    return function(t) {
        d.startAngle = i(t)
        return arcPath(d)
    }
}

// use function keyword

function arcTweenUpdate(d) {

    let i = d3.interpolate(this._current, d);
    this._current =

}