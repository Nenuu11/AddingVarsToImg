localStorage.clear();
        var count = 1;
        var arrayIds = [];
        var arrText = [];

        var sPositions = localStorage.positions || "{}",
            positions = JSON.parse(sPositions);

        // this event handle is for getting the image src and add it to the document
            $("#files").on('change', function () {
                filename = this.files[0].name
                console.log(this.files);
                if (this.files && this.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $('#output')
                            .attr('src', e.target.result)
                            .height(500)
                            .width(530)
                    };
                    reader.readAsDataURL(this.files[0]);
                }
                $("#add").show();
                $("#save").show();
                $(".variables").text("Add variables and drag").width(200);
            });
        //////////////////////////////////////////////////////////////////////////////////////

        //this event handler is for adding draggable variables, saving their positions in the local storage 
        //and push the input field ids into the arrayIds
            $("#add").on('click',function () {
                $(".variables").append(`
                        <div id="draggable${count}" class="ui-widget-content form-inline" style="position:absolute; top:${38 * count}px">
                            <input type="text" class="form-control" id="${count}" placeholder="Set Value.."/>
                            <i class="fa fa-arrows-alt" style="margin-left: 5px; position: absolute; bottom: 0; right: -13%;"></i>
                            <i class="fa fa-times" style="margin-left: 5px; position: absolute; top: 0; right: -13%; cursor:pointer" onclick="delVariable(this)" id="del"></i>
                        </div>
                    `).children(`#draggable${count}`).draggable({
                        containment: ".image-data",
                            scroll: false,
                            stop: function (event, ui) {
                                positions[this.id] = ui.position
                                localStorage.positions = JSON.stringify(positions)
                        }
                    });
                arrayIds.push(count);
                count++;
            });
        ////////////////////////////////////////////////////////////////////////////////////////

        //this event handler for adding the variables values into the arrText and generate the image with the data on it
            $("#save").on('click',function (e) {
                for (var i = 0; i < arrayIds.length; i++) {
                    arrText.push($(`#${arrayIds[i]}`).val());
                }
                console.log(arrayIds);
                console.log(arrText)
                var positions = JSON.parse(localStorage.getItem('positions'));
                var src = $("#output").attr('src');
                $(".final").append(`
                    <img src="${src}" id="result" style="width=500px; height:500px"/>
                `);
                for (var i = 0; i < arrayIds.length; i++) {
                    var p = positions['draggable' + (arrayIds[i])]
                    if (typeof p === 'undefined' || arrText[i] === "") {
                        continue;
                    }
                    $(".final").append(`
                        <div style="position: absolute; top:${positions['draggable' + (arrayIds[i])].top}px; left:${positions['draggable' + (arrayIds[i])].left}px; font-size:16px; font-weight:bold;">
                        ${arrText[i]} 
                        <div>
                    `)
                }
                console.log(arrText);
                $(".start").empty();
            });
        ///////////////////////////////////////////////////////////////////////////////////////

        //this function is for deleting variables in case u need to delete any
        function delVariable(i) {
            var parent = i.parentNode;
            var id = parseInt(i.parentNode.children[0].id);
            arrayIds = arrayIds.filter(e => e !== id);
            parent.remove();
            
        }