import {RegexValidator} from "../validation/RegexValidator.js";


let clickedIndex;
let idCounter = 1

$(document).ready(function () {
    loadTable();
});
$("#btnAddLog").on('click',()=>{
    let logDetails = $("#logDetails").val();
    let logDate = $("#logDate").val();
    let logObservedImg = $("#logObservedImage")[0].files[0];
    console.log(logDate)

    let formData = new FormData();
    formData.append("logDetails", logDetails);
    formData.append("logDate", logDate);
    formData.append("observedImg", logObservedImg);
    /*let validator = new RegexValidator();

    const validationResult = validator.validateLog(logDetails, logDate, logObservedImg);
    if (validationResult.isValid){*/
        $.ajax({
            url:"http://localhost:5050/greenshadow/api/v1/log",
            method:"POST",
            processData: false, // Prevent jQuery from processing the FormData
            contentType: false, // Let the browser set the Content-Type, including boundary
            data: formData,
            success:function (results){
                console.log(results)
                alert('Log data was saved successfully.')
            },
            error:function (error){
                console.log(error)
                alert('Log data was not saved.')
            }
        })
    //}
    /*else {
        alert('Invalid log data. Please check the input fields.');
        /!*if (!validationResult.isLicensePlateNumValid) {
            alert('Invalid License plate number');
        }
        if (!validationResult.isCategoryValid){
            alert('Invalid Category');
        }
        if (!validationResult.isFuelTypeValid) {
            alert('Invalid Fuel Type');
        }
        if (!validationResult.isStatusValid) {
            alert('Invalid Status');
        }*!/
    }*/
    clearLog()
    loadTable()
})
function clearLog() {
    $("#logDetails").val("")
    $("#logDate").val("")
    $("#logObservedImage").val("")

    $("#logCodeUpdate").text("");
    $("#logDetailsUpdate").val("");
    $("#logDateUpdate").val("");
    $("#logObservedImageUpdate").val("");
}

function loadTable() {
    $.ajax({
        url: 'http://localhost:5050/greenshadow/api/v1/log',
        type: 'GET',
        headers: {
            'request-type': 'table', // Set your custom request header
        },
        success: function (response) {
            // Parse and use the response data
            $("#log-table-tbody").empty();
            response.forEach(log => {
                $('#log-table-tbody').append(`
                    <tr>
                        <td class="logCode">${log.logCode}</td>              
                        <td class="logDetails">${log.logDetails}</td>         
                        <td class="logDate">${log.logDate}</td>
                        <td class="logObservedImage"><img src="data:image/jpeg;base64,${log.observedImg}" alt="Log Image" style="width: 200px; height: 200px;"></td>
                    </tr>
                `);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error loading log data:", error);
        }
    });
    //data:image/jpeg;base64,
    //${"http://localhost:5050/greenshadow/api/v1/log"}/image/
}

$("#log-table-tbody").on('click','tr',function (){
    let index = $(this).index();
    clickedIndex = index;


    let logCode = $(this).find(".logCode").text()
    let logDetails = $(this).find(".logDetails").text()
    let logDate = $(this).find(".logDate").text()
    let logObservedImg = $(this).find(".logObservedImage").text()

    //console.log("code"+logCode,"details"+logDetails,"date"+logDate,"img"+logObservedImg)

    $("#updateLogbtn").click()
    $("#logCodeUpdate").text(logCode);
    $("#logDetailsUpdate").val(logDetails);
    $("#logDateUpdate").val(logDate);
    $("#logObservedImageUpdate").val(logObservedImg);

})
$("#btnUpdateLog").on('click', () => {
    let validator = new RegexValidator();

    let logCodeUpdated = $("#logCodeUpdate").text();
    let logDetailsUpdated = $("#logDetailsUpdate").val();
    let logDateUpdated = $("#logDateUpdate").val();
    let logObservedImgUpdated = $("#logObservedImageUpdate")[0].files[0];

    /*const validationResult = validator.validateLog(logDetailsUpdated, logDateUpdated,logObservedImgUpdated);
    if (validationResult.isValid) {
        const logData = {
            logCode: logCodeUpdated,
            logDetails: logDetailsUpdated,
            logDate: logDateUpdated,
            observedImg: logObservedImgUpdated
        };*/
    const newLogData = new FormData()

    newLogData.append("logDetails", logDetailsUpdated)
    newLogData.append("logDate", logDateUpdated)
    newLogData.append("observedImg", logObservedImgUpdated);

        // Make AJAX PUT request
        $.ajax({
            url: `http://localhost:5050/greenshadow/api/v1/log/${logCodeUpdated}`,
            type: 'PUT',
            contentType: 'application/json',
            data: newLogData,
            success: function (response) {
                console.log("Response:", response); // Log response
                clearLog();
                loadTable(); // Reload table data
            },
            error: function (xhr, status, error) {
                console.error(`Error: ${error}, Status: ${status}, Code: ${xhr.status}`);
                alert("Failed to update log. Please try again.");
            }
        });

    //}
    /*else {
        alert('Invalid log data. Please check the input fields.');
        if (!validationResult.isLicensePlateNumValid) {
            alert('Invalid Log Details');
        }
        if (!validationResult.isCategoryValid){
            alert('Invalid Log Date');
        }
        if (!validationResult.isFuelTypeValid) {
            alert('Invalid Log Image');
        }
    }*/
});


$("#btnDeleteLog").on('click', () => {
    let logCodetobeDeleted = $('#logCodeUpdate').text();

    if (!logCodetobeDeleted) {
        alert("No log selected for deletion.");
        return;
    }

    $.ajax({
        url: `http://localhost:5050/greenshadow/api/v1/log/${logCodetobeDeleted}`,
        type: 'DELETE',
        success: function (response) {
            console.log("Response:", response);
            alert("Log successfully deleted.");
            loadTable();
            clearLog();
        },
        error: function (xhr, status, error) {
            console.error(`Error: ${error}, Status: ${status}, Code: ${xhr.status}`);
            alert("Failed to delete the log. Please try again.");
        }
    });
});


$("#logSearchButton").on('click', () => {
    const searchQuery = $("#searchBar").val().trim().toLowerCase();

    if (!searchQuery) {
        alert("Please enter a search query.");
        return;
    }

    $.ajax({
        url: `http://localhost:5050/greenshadow/api/v1/log?query=${encodeURIComponent(searchQuery)}`,
        type: 'GET',
        headers: {
            "Request-Type": "search"
        },
        success: function (searchResults) {
            $('#log-table-tbody').empty();

            if (searchResults.length > 0) {
                searchResults.forEach(log => {
                    $("#log-table-tbody").append(`
                        <tr>
                            <td class="logCode">${log.logCode}</td>
                            <td class="logDetails">${log.logDetails}</td>
                            <td class="logDate">${log.logDate}</td>
                            <td class="observedImg">${log.observedImg}</td>
                        </tr>
                    `);
                });
            } else {
                // If no results are found
                $('#log-table-tbody').html("<tr><td colspan='4'>No matching logs were found</td></tr>");
            }
        },
        error: function (xhr, status, error) {
            console.error(`Error: ${error}, Status: ${status}, Code: ${xhr.status}`);
            alert("Failed to retrieve search results. Please try again.");
        }
    });
});

function suggestNames(input, callback) {
    const inputText = input.toLowerCase().trim();

    if (!inputText) {
        console.warn("Input text is empty. No suggestions will be made.");
        callback([]);
        return;
    }

    // Make AJAX GET request
    $.ajax({
        url: `http://localhost:5050/greenshadow/api/v1/log?query=${encodeURIComponent(inputText)}`,
        type: 'GET',
        headers: {
            "Request-Type": "suggest"
        },
        success: function (suggestions) {
            callback(suggestions);
        },
        error: function (xhr, status, error) {
            console.error(`Error: ${error}, Status: ${status}, Code: ${xhr.status}`);
            alert("Failed to retrieve name suggestions.");
            //callback([]);
        }
    });
}



function updateSuggestions(suggestions) {
    const suggestionsList = $("#suggestions");

    suggestionsList.empty();

    suggestions.forEach(suggestion => {
        suggestionsList.append(`<li>${suggestion}</li>`);
    });
}
$("#searchBar").on('input', function() {
    const input = $(this).val();
    suggestNames(input,function (suggestions) {
        updateSuggestions(suggestions);

        if (input.trim() === '') {
            $("#suggestions").hide();
        } else {
            $("#suggestions").show();
        }
    });
});