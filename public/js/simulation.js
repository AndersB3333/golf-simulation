const headline = document.querySelector('#headline');
const buttonDiv = document.querySelector('#buttonDiv');
const resetBtn = document.querySelector("#reset-btn")
const button = document.createElement("button")
const radioButtons = document.querySelectorAll("input[name='flexRadioDefault']")


const scoreBtn = document.querySelector('#score')
const submitBtn = document.querySelector("#tester")

let chartCard = document.querySelector("#chart-card")
let chartArea = document.querySelector("#chart-area")

let btnScore = []
let btns = []

sendValues = []
totClick = 0
const b = 255
let btnCreator = function () {

    g = [255]
    r = [255]
    for (let i = 1; i <= 121; i++) {
        let button = document.createElement('button')
        button.classList.add("inp-button")
        btnScore[i] = 0

        sendValues.push(0)


        button.setAttribute("id", `btn${i}`)
        button.classList.add(`button${i}`, "visualizer", "buttons", "btn-small")
        button.innerText = btnScore[i]
        buttonDiv.appendChild(button)


        if (i == 62) {
            btnCenter = document.querySelector(".button61")
            btnCenter.innerText = `⌖`
            btnCenter.style.color = 'green'
            btnCenter.style.fontWeight = "700"
            btnCenter.style.backgroundColor = "#dee2e6"
        }

    }

    for (let i = 1; i <= 121; i++) {
        g[i] = 255
        r[i] = 255
        btns[i] = document.querySelector(`.button${i}`)


        btns[i].addEventListener('click', function (e) {
            totClick += 1
            e.preventDefault()
            g[i] -= 20
            r[i] -= 20
            btnScore[i] += 1
            sendValues[i - 1] += 1

            btns[i].innerText = btnScore[i]
            btns[i].style.backgroundColor = `rgb(${r[i]}, ${g[i]}, ${b})`
            if (btnScore[i] > 4) {
                btns[i].style.color = "#fff"
            }


        })

        btns[i].addEventListener('contextmenu', function (e) {
            e.preventDefault()
            totClick -= 1
            if (btnScore[i] >= 1) {
                btnScore[i] -= 1
                g[i] += 20
                r[i] += 20
                sendValues[i - 1] -= 1

                btns[i].innerText = btnScore[i]
                btns[i].style.backgroundColor = `rgb(${r[i]}, ${g[i]}, ${b})`
            }
            if (btnScore[i] <= 4) {
                btns[i].style.color = "#000"
            }
        })
    }
    return btnScore
}

// Creating the y-axis



btnCreator()


resetBtn.addEventListener('click', function (e) {
    e.preventDefault()
    headline.innerText = "FIND YOUR SHOT PATTERN"
    submitBtn.disabled = false
    chartCard.classList.remove("chart-card")
    resetBtn.classList.remove("subm-btn")
    headline.classList.remove("chart-headline")
    if (sendValues.length == 122) {
        sendValues.pop()
    }
    if (chartArea.hasChildNodes()) {
        let chartHeader = document.querySelector("#chart-header")
        chartHeader.remove()
    }
    d3.select("svg").remove()
    for (let i = 0; i <= 120; i++) {
        g[i + 1] = 255
        r[i + 1] = 255
        btnScore[i] = 0
        sendValues[i] = 0
        totClick = 0
        let resetFormBtns = document.querySelector(`#btn${i + 1}`)
        resetFormBtns.disabled = false
        if (i == 60) {
            btnCenter.innerText = `⌖`
            btnCenter.style.color = 'green'
            btnCenter.style.fontWeight = "700"
            btnCenter.style.backgroundColor = "#dee2e6"
        }
        else {
            resetFormBtns.innerText = btnScore[i]
            resetFormBtns.style.backgroundColor = `rgb(${r[i + 1]}, ${g[i + 1]}, ${b})`
            resetFormBtns.style.color = "#000"
        }
    }
})

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    if (totClick < 10) {
        alert("Need to put in at least 10 shots")
    }
    else {
        let prefHand;
        for (let radioButton of radioButtons) {
            if (radioButton.checked) {
                prefHand = parseInt(radioButton.value)
            }
        }


        let chartHeader = document.createElement("h2")
        chartHeader.innerText = "Hover the boxes to see the frequency of each box"
        chartHeader.setAttribute("id", "chart-header")
        chartHeader.classList.add("chart-para")
        chartCard.append(chartHeader)

        resetBtn.disabled = true
        submitBtn.disabled = true
        let loadDiv = document.querySelector("#load-text")
        let loadText = document.createElement("p")
        loadText.innerText = "Loading..."
        loadDiv.append(loadText)
        resetBtn.classList.add("subm-btn")
        sendValues.push(prefHand)
        for (let i = 1; i <= 121; i++) {
            let buttonDis = document.querySelector(`#btn${i}`)
            buttonDis.disabled = true
        }
        fetch('https://coord-cors-api.herokuapp.com/', {
            method: 'POST',
            body: JSON.stringify({
                value: sendValues
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(resData => {
                console.log(resData)
                chartCard.classList.add("chart-card")
                test = [

                    { distance: '150', direction: '-25', value: resData[110] },
                    { distance: '150', direction: '-20', value: resData[111] },
                    { distance: '150', direction: '-15', value: resData[112] },
                    { distance: '150', direction: '-10', value: resData[113] },
                    { distance: '150', direction: '-5', value: resData[114] },
                    { distance: '150', direction: '0', value: resData[115] },
                    { distance: '150', direction: '5', value: resData[116] },
                    { distance: '150', direction: '10', value: resData[117] },
                    { distance: '150', direction: '15', value: resData[118] },
                    { distance: '150', direction: '20', value: resData[119] },
                    { distance: '150', direction: '25', value: resData[120] },

                    { distance: '154', direction: '-25', value: resData[99] },
                    { distance: '154', direction: '-20', value: resData[100] },
                    { distance: '154', direction: '-15', value: resData[101] },
                    { distance: '154', direction: '-10', value: resData[102] },
                    { distance: '154', direction: '-5', value: resData[103] },
                    { distance: '154', direction: '0', value: resData[104] },
                    { distance: '154', direction: '5', value: resData[105] },
                    { distance: '154', direction: '10', value: resData[106] },
                    { distance: '154', direction: '15', value: resData[107] },
                    { distance: '154', direction: '20', value: resData[108] },
                    { distance: '154', direction: '25', value: resData[109] },

                    { distance: '158', direction: '-25', value: resData[88] },
                    { distance: '158', direction: '-20', value: resData[89] },
                    { distance: '158', direction: '-15', value: resData[90] },
                    { distance: '158', direction: '-10', value: resData[91] },
                    { distance: '158', direction: '-5', value: resData[92] },
                    { distance: '158', direction: '0', value: resData[93] },
                    { distance: '158', direction: '5', value: resData[94] },
                    { distance: '158', direction: '10', value: resData[95] },
                    { distance: '158', direction: '15', value: resData[96] },
                    { distance: '158', direction: '20', value: resData[97] },
                    { distance: '158', direction: '25', value: resData[98] },

                    { distance: '162', direction: '-25', value: resData[77] },
                    { distance: '162', direction: '-20', value: resData[78] },
                    { distance: '162', direction: '-15', value: resData[79] },
                    { distance: '162', direction: '-10', value: resData[80] },
                    { distance: '162', direction: '-5', value: resData[81] },
                    { distance: '162', direction: '0', value: resData[82] },
                    { distance: '162', direction: '5', value: resData[83] },
                    { distance: '162', direction: '10', value: resData[84] },
                    { distance: '162', direction: '15', value: resData[85] },
                    { distance: '162', direction: '20', value: resData[86] },
                    { distance: '162', direction: '25', value: resData[87] },

                    { distance: '166', direction: '-25', value: resData[66] },
                    { distance: '166', direction: '-20', value: resData[67] },
                    { distance: '166', direction: '-15', value: resData[68] },
                    { distance: '166', direction: '-10', value: resData[69] },
                    { distance: '166', direction: '-5', value: resData[70] },
                    { distance: '166', direction: '0', value: resData[71] },
                    { distance: '166', direction: '5', value: resData[72] },
                    { distance: '166', direction: '10', value: resData[73] },
                    { distance: '166', direction: '15', value: resData[74] },
                    { distance: '166', direction: '20', value: resData[75] },
                    { distance: '166', direction: '25', value: resData[76] },

                    { distance: '170', direction: '-25', value: resData[55] },
                    { distance: '170', direction: '-20', value: resData[56] },
                    { distance: '170', direction: '-15', value: resData[57] },
                    { distance: '170', direction: '-10', value: resData[58] },
                    { distance: '170', direction: '-5', value: resData[59] },
                    { distance: '170', direction: '0', value: resData[60] },
                    { distance: '170', direction: '5', value: resData[61] },
                    { distance: '170', direction: '10', value: resData[62] },
                    { distance: '170', direction: '15', value: resData[63] },
                    { distance: '170', direction: '20', value: resData[64] },
                    { distance: '170', direction: '25', value: resData[65] },

                    { distance: '174', direction: '-25', value: resData[44] },
                    { distance: '174', direction: '-20', value: resData[45] },
                    { distance: '174', direction: '-15', value: resData[46] },
                    { distance: '174', direction: '-10', value: resData[47] },
                    { distance: '174', direction: '-5', value: resData[48] },
                    { distance: '174', direction: '0', value: resData[49] },
                    { distance: '174', direction: '5', value: resData[50] },
                    { distance: '174', direction: '10', value: resData[51] },
                    { distance: '174', direction: '15', value: resData[52] },
                    { distance: '174', direction: '20', value: resData[53] },
                    { distance: '174', direction: '25', value: resData[54] },

                    { distance: '178', direction: '-25', value: resData[33] },
                    { distance: '178', direction: '-20', value: resData[34] },
                    { distance: '178', direction: '-15', value: resData[35] },
                    { distance: '178', direction: '-10', value: resData[36] },
                    { distance: '178', direction: '-5', value: resData[37] },
                    { distance: '178', direction: '0', value: resData[38] },
                    { distance: '178', direction: '5', value: resData[39] },
                    { distance: '178', direction: '10', value: resData[40] },
                    { distance: '178', direction: '15', value: resData[41] },
                    { distance: '178', direction: '20', value: resData[42] },
                    { distance: '178', direction: '25', value: resData[43] },

                    { distance: '182', direction: '-25', value: resData[22] },
                    { distance: '182', direction: '-20', value: resData[23] },
                    { distance: '182', direction: '-15', value: resData[24] },
                    { distance: '182', direction: '-10', value: resData[25] },
                    { distance: '182', direction: '-5', value: resData[26] },
                    { distance: '182', direction: '0', value: resData[27] },
                    { distance: '182', direction: '5', value: resData[28] },
                    { distance: '182', direction: '10', value: resData[29] },
                    { distance: '182', direction: '15', value: resData[30] },
                    { distance: '182', direction: '20', value: resData[31] },
                    { distance: '182', direction: '25', value: resData[32] },

                    { distance: '186', direction: '-25', value: resData[11] },
                    { distance: '186', direction: '-20', value: resData[12] },
                    { distance: '186', direction: '-15', value: resData[13] },
                    { distance: '186', direction: '-10', value: resData[14] },
                    { distance: '186', direction: '-5', value: resData[15] },
                    { distance: '186', direction: '0', value: resData[16] },
                    { distance: '186', direction: '5', value: resData[17] },
                    { distance: '186', direction: '10', value: resData[18] },
                    { distance: '186', direction: '15', value: resData[19] },
                    { distance: '186', direction: '20', value: resData[20] },
                    { distance: '186', direction: '25', value: resData[21] },

                    { distance: '190', direction: '-25', value: resData[0] },
                    { distance: '190', direction: '-20', value: resData[1] },
                    { distance: '190', direction: '-15', value: resData[2] },
                    { distance: '190', direction: '-10', value: resData[3] },
                    { distance: '190', direction: '-5', value: resData[4] },
                    { distance: '190', direction: '0', value: resData[5] },
                    { distance: '190', direction: '5', value: resData[6] },
                    { distance: '190', direction: '10', value: resData[7] },
                    { distance: '190', direction: '15', value: resData[8] },
                    { distance: '190', direction: '20', value: resData[9] },
                    { distance: '190', direction: '25', value: resData[10] }
                ]

                const seeDirection = ["-25", "-20", "-15", "-10", "-5", "0", "5", "10", "15", "20", "25"]
                const seeDistance = ["150", "154", "158", "162", "166", "170", "174", "178", "182", "186", "190"]



                const margin = { left: 100, right: 10, top: 10, bottom: 100 }
                const width = 500 - margin.left - margin.right
                const height = 500 - margin.top - margin.bottom

                const svg = d3.select("#chart-area").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)

                const g = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)

                // X label
                g.append("text")
                    .attr("class", "x axis-label")
                    .attr("x", width / 2)
                    .attr("y", height + 50)
                    .attr("font-size", "20px")
                    .attr("text-anchor", "middle")
                    .text("Direction")


                // Y label
                g.append("text")
                    .attr("x", - (height / 2))
                    .attr("y", - 60)
                    .attr("font-size", "20px")
                    .attr("text-anchor", "middle")
                    .attr("transform", "rotate(-90)")
                    .text("Distance")


                // CREATE TOOL TIP HERE
                const tooltip = d3.select("#chart-area")
                    .append("div")
                    .style("opacity", 0)
                    .attr("class", "tooltip")
                    .style("background-color", "#e3f3ff")
                    .style("border", "solid")
                    .style("border-width", "2px")
                    .style("border-radius", "5px")
                    .style("padding", "5px")


                const mouseover = function (event, d) {
                    tooltip
                        .style("opacity", 1)
                    d3.select(this)
                        .style("stroke", "black")
                        .style("opacity", 1)
                }
                const mousemove = function (event, d) {
                    tooltip
                        .html("Frequency of " + d.distance + "y & " + d.direction + "y bin is: " + d.value)
                        .style("left", (event.x) + 70 + "px")
                        .style("top", (event.y) + 70 + "px")
                }
                const mouseleave = function (event, d) {
                    tooltip
                        .style("opacity", 0)
                    d3.select(this)
                        .style("stroke", "none")
                        .style("opacity", 0.8)
                }







                // Temp ticks


                // Scales
                const x = d3.scaleBand()
                    .range([0, width])
                    .domain(seeDirection)
                    .padding(0.01)
                g.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x))

                // Build X scales and axis
                const y = d3.scaleBand()
                    .range([height, 0])
                    .domain(seeDistance)
                    .padding(0.01);
                g.append("g")
                    .call(d3.axisLeft(y))

                const myColor = d3.scaleLinear()
                    .range(["white", "#228be6"])
                    .domain([0, d3.max(test, d => d.value)])

                g.selectAll()
                    .data(test, function (d) { return d.direction + ':' + d.distance })
                    .join("rect")
                    .attr("x", function (d) { return x(d.direction) })
                    .attr("y", function (d) { return y(d.distance) })
                    .attr("width", x.bandwidth)
                    .attr("height", y.bandwidth)
                    .attr("style", "outline: thin solid black")
                    .style("fill", function (d) { return myColor(d.value) })
                    .on("mouseover", mouseover)
                    .on("mousemove", mousemove)
                    .on("mouseleave", mouseleave)


                g.each(function () {
                    this.parentNode.appendChild(this);
                })

                // Black circle to indicate the target
                g.append("circle")
                    .attr("cx", width / 2)
                    .attr("cy", height / 2)
                    .attr("r", "5")
                    .attr("fill", "black")

                headline.innerText = "HERE'S YOUR SHOT PATTERN"
                headline.classList.add("chart-headline")
                window.scrollTo({
                    top: 100,
                    behavior: "smooth"
                });
                loadText.remove()
                resetBtn.disabled = false

            }).catch(err => alert("Something went wrong, please contact us directly regarding this issue."))
    }
})


