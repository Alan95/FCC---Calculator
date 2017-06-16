$(document).ready(function() {


    // global variables

    var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var specials = ["AC", "x", "-", "=", "+", ":"];
    var currNumber = "";
    var collector = [];
    var input = $("#input");
    var sum = 0;
    var counter = 0;

    //Start-Interface
    input.attr("placeholder", "Hello").delay(2000).queue(() => input.attr("placeholder", "").dequeue());


    //Interactions between Buttons and Display, Numbers
    $(".number").click(function() {
        var target = $(this).text();
        var targetNum = parseInt(target);
        for (var x = 0; x < numbers.length; x++) {
            if (targetNum === numbers[x]) {
                currNumber += targetNum;
                counter++;
                if (counter < 14) {
                    input.attr("placeholder", currNumber);
                    collector.push(targetNum);
                }
            }

        }
    });

    $(".special").click(function() {
        currNumber = "";
        if ($("#input").attr("placeholder") !== null) {
            $("#input").empty();
        }
        var target = $(this).text();
        for (var x = 0; x < specials.length; x++) {
            if (target === "AC" || target === "=") {
                specialButtonChecker(target);
                break;
            } else if (target === specials[x]) {
                specialButtonChecker(target);
                collector.push(target);
            }
        }
    });


    //Checking which Button was clicked and doing action
    function specialButtonChecker(item) {
            counter = 0;
            switch (item) {

                case "AC":
                    $("#input").attr("placeholder", "reset").delay(1500).queue(function() {
                        $("#input").attr("placeholder", "").dequeue();
                    });
                    collector = [];
                    sum = 0;
                    break;
                case "x":
                    $("#input").attr("placeholder", "x");
                    break;
                case "-":
                    $("#input").attr("placeholder", "-");
                    break;
                case "=":
                    var input = calculating(collector);
                    $("#input").attr("placeholder", input);
                    break;
                case "+":
                    $("#input").attr("placeholder", "+");
                    break;
                case ":":
                    $("#input").attr("placeholder", ":");
                    break;

            }
        }
        //calculating numbers to sum, creating double array for numbers and specials  
    function calculating(array) {

        var x = [];
        var z = [];
        var crrNumb = "";


        for (var u = 0; u < array.length; u++) {
            if (!isNaN(array[u])) {

                crrNumb += array[u];
                if (u == array.length - 1) {
                    x.push(crrNumb);
                }
            } else if (isNaN(array[u])) {
                x.push(crrNumb);
                crrNumb = "";
                if (u == array.length - 1) {
                    array.pop();
                }
                z.push(array[u]);
            }
        }


        for (var i = 0; i < z.length; i++) {
            console.log(x);

            if (z[i] == "+") {

                if (x[1] == undefined) {
                    sum += Number(x.shift(0));
                } else {
                    sum += (Number(x.shift(0)) + Number(x.shift(1)));
                }
            } else if (z[i] == "x") {

                if (x[0] == "") {
                    x.shift();
                    sum *= Number(x.shift());
                } else if (x.length == 1) {
                    sum *= Number(x.shift(0));
                } else if (x.length == 0) {
                    return sum;
                } else {

                    if (sum == 0) {
                        sum = 1;
                    }
                    var result = (Number(x.shift(0)) * Number(x.shift(1)));
                    sum *= result;
                    console.log(sum);
                    console.log(x);
                }
            } else if (z[i] == "-") {
                if (x[1] == undefined) {
                    sum -= Number(x.shift(0));
                } else {
                    sum += (Number(x.shift(0)) - Number(x.shift(1)));
                }
            } else if (z[i] == ":") {
                if (x[0] == "") {
                    x.shift();
                    sum /= Number(x.shift());
                } else if (x.length == 1) {
                    sum /= Number(x.shift(0));
                } else {
                    if (sum < 2) {
                        sum = 1;
                    }
                    var result = (Number(x.shift(0)) / Number(x.shift(1)));
                    sum /= result;
                }

            }
        }
        z = [];
        collector = [];
        return sum;
    }


});