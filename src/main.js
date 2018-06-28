$.ajax({
    url: "http://localhost:3000/politicians",
    method: "GET"
})
    .then(politicians => {
        for (let i = 0; i < politicians.length; i++) {
            let $polArt = $("<article>").css("margin-left", "8px").css("border", "2px solid black").addClass("politician").append(
                $("<header>").addClass("politician_name").append(
                    $("<h1>").text(politicians[i].name
                    )
                )
            )

            $.ajax({
                url: "http://localhost:3000/billPoliticians",
                method: "GET"
            })
                .then(bp => {
                    let $billDiv = $("<div>").css("margin-left", "8px").addClass("bill_names")
                    let $polBills = $("<section>").addClass("politician_bills").append($("<h3>").text("Sponsored Bills"), $billDiv)
                    $polArt.append($polBills)
                    for (let j = 0; j < bp.length; j++) {
                        if (bp[j].politician == politicians[i].id) {
                            $.ajax({
                                url: "http://localhost:3000/bills",
                                method: "GET"
                            })
                            .then(bills =>{
                                for(let k = 0; k < bills.length; k++){
                                    if(bills[k].id == bp[j].bill){
                                        $billDiv.append($("<p>").text(bills[k].name))
                                    }
                                }
                            })
                        }
                    }
                })
                let $pacsList = $("<div>").addClass("pacs_list");
                let $polInf = $("<section>").addClass("politician_influencers").append($("<h3>").text("Related PAC's:"), $pacsList)
                $polArt.append($polInf)
                $.ajax({
                    url: "http://localhost:3000/politicianPacs",
                    method: "GET"
                })
                .then(pps =>{
                    for(let j = 0; j < pps.length; j++){
                        if(pps[j].politician == politicians[i].id){
                            $.ajax({
                                url: "http://localhost:3000/pacs",
                                method: "GET"
                            })
                            .then(pacs =>{
                                for(let k = 0; k <pacs.length; k++){
                                    if(pacs[k].id == pps[j].pac){
                                        let $corpList = $("<ul>").addClass("corp_list")


                                        $.ajax({
                                            url: "http://localhost:3000/corporationPacs",
                                            method: "GET"
                                        })
                                        .then(corpPacs => {
                                            for(let m = 0; m < corpPacs.length; m++){
                                                if(corpPacs[m].pac == pacs[k].id){
                                                    console.log("corpCheck")
                                                    $.ajax({
                                                        url: "http://localhost:3000/corporations",
                                                        method: "GET"
                                                    })
                                                    .then(corps =>{
                                                        for(let n = 0; n < corps.length; n++){
                                                            if(corps[n].id == corpPacs[m].corporation){
                                                                console.log("corpCheck")
                                                                $corpList.append($("<li>").text(corps[n].name))
                                                            }
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                        
                                        let $pacDiv = $("<div>").css("margin-left", "8px").addClass("pacDiv").append(
                                            $("<h4>").text(pacs[k].name),
                                            $("<p>").text("Suppoted by corporations:"),
                                            $corpList
                                        )

                                        $pacsList.append($pacDiv)
                                    }
                                }
                            })
                        }
                    }
                })


            $("body").append($polArt)
        }
    })


    //flowchart diagram: https://drive.google.com/open?id=1b-4JEOXmCpu2Ae0wFDaDMbJUMAqZmu43
