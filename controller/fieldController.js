import {RegexValidator} from "../validation/RegexValidator.js";


let clickedIndex;
let idCounter = 1

$(document).ready(function () {
    loadTable();
});
$("#btnAddField").on('click',()=>{
    let fieldName = $("#fieldName").val();
    let fieldLocation = $("#fieldLocation").val();
    let fieldSize = $("#fieldSize").val();
    let fieldImg1 = $("#fieldImg1")[0].files[0];
    let fieldImg2 = $("#fieldImg2")[0].files[0];

    let formData = new FormData();
    formData.append("fieldName", fieldName);
    formData.append("location", fieldLocation);
    formData.append("size", fieldSize);
    formData.append("img1", fieldImg1);
    formData.append("img2", fieldImg2);
    /*let validator = new RegexValidator();

    const validationResult = validator.validateLog(logDetails, logDate, logObservedImg);
    if (validationResult.isValid){*/
    $.ajax({
        url:"http://localhost:5050/greenshadow/api/v1/field",
        method:"POST",
        processData: false, // Prevent jQuery from processing the FormData
        contentType: false, // Let the browser set the Content-Type, including boundary
        data: formData,
        success:function (results){
            console.log(results)
            alert('Field data was saved successfully.')
            clearField()
            loadTable()
        },
        error:function (error){
            console.log(error)
            alert('Field data was not saved.')
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

})
function clearField() {
    $("#fieldName").val("")
    $("#fieldLocation").val("")
    $("#fieldSize").val("")
    $("#fieldImg1").val("")
    $("#fieldImg2").val("")

    $("#fieldCodeUpdate").text("");
    $("#fieldNameUpdate").val("");
    $("#fieldLocationUpdate").val("");
    $("#fieldSizeUpdate").val("");
    $("#fieldImg1Update").val("");
    $("#fieldImg2Update").val("");
}

function loadTable() {
    $.ajax({
        url: 'http://localhost:5050/greenshadow/api/v1/field',
        type: 'GET',
        headers: {
            'request-type': 'table', // Set your custom request header
        },
        success: function (response) {
            // Parse and use the response data
            $("#field-table-tbody").empty();
            response.forEach(field => {
                $('#field-table-tbody').append(`
                    <tr>
                        <td class="fieldCode">${field.fieldCode}</td>              
                        <td class="fieldName">${field.fieldName}</td>         
                        <td class="fieldLocation">${field.location}</td>
                        <td class="fieldSize">${field.size}</td>
                        <td class="fieldImg1"><img src="data:image/jpeg;base64,${field.img1}" alt="Field Image" style="width: 200px; height: 200px;"></td>
                        <td class="fieldImg2"><img src="data:image/jpeg;base64,${field.img2}" alt="Field Image" style="width: 200px; height: 200px;"></td>
                    </tr>
                `);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error loading field data:", error);
        }
    });
    //data:image/jpeg;base64,
    //${"http://localhost:5050/greenshadow/api/v1/log"}/image/
}

$("#field-table-tbody").on('click','tr',function (){
    let index = $(this).index();
    clickedIndex = index;


    let fieldCode = $(this).find(".fieldCode").text()
    let fieldName = $(this).find(".fieldName").text()
    let fieldLocation = $(this).find(".fieldLocation").text()
    let fieldSize = $(this).find(".fieldSize").text()
    let fieldImg1 = $(this).find(".img1").text()
    let fieldImg2 = $(this).find(".img2").text()

    //console.log("code"+logCode,"details"+logDetails,"date"+logDate,"img"+logObservedImg)

    $("#updateFieldbtn").click()
    $("#fieldCodeUpdate").text(fieldCode);
    $("#fieldNameUpdate").val(fieldName);
    $("#fieldLocationUpdate").val(fieldLocation);
    $("#fieldSizeUpdate").val(fieldSize);
    $("#fieldImg1Update").val(fieldImg1);
    $("#fieldImg2Update").val(fieldImg2);

})
$("#btnUpdateField").on('click', () => {
    let validator = new RegexValidator();

    let fieldCodeUpdated = $("#fieldCodeUpdate").text();
    let fieldNameUpdated = $("#fieldNameUpdate").val();
    let fieldLocationUpdated = $("#fieldLocationUpdate").val();
    let fieldSizeUpdated = $("#fieldSizeUpdate").val();
    let fieldImg1Updated = $("#fieldImg1Update")[0].files[0];
    let fieldImg2Updated = $("#fieldImg2Update")[0].files[0];

    /*const validationResult = validator.validateLog(logDetailsUpdated, logDateUpdated,logObservedImgUpdated);
    if (validationResult.isValid) {
        const logData = {
            logCode: logCodeUpdated,
            logDetails: logDetailsUpdated,
            logDate: logDateUpdated,
            observedImg: logObservedImgUpdated
        };*/
    const newLogData = new FormData()

    newLogData.append("fieldName", fieldNameUpdated)
    newLogData.append("location", fieldLocationUpdated)
    newLogData.append("size", fieldSizeUpdated)
    newLogData.append("img1", fieldImg1Updated);
    newLogData.append("img2", fieldImg2Updated);

    // Make AJAX PUT request
    $.ajax({
        url: `http://localhost:5050/greenshadow/api/v1/field/${fieldCodeUpdated}`,
        type: 'PUT',
        processData: false, // Prevent jQuery from processing the FormData
        contentType: false, // Let the browser set the Content-Type, including boundary
        data: newLogData,
        success: function (response) {
            console.log("Response:", response); // Log response
            clearField();
            loadTable(); // Reload table data
        },
        error: function (xhr, status, error) {
            console.error(`Error: ${error}, Status: ${status}, Code: ${xhr.status}`);
            alert("Failed to update field. Please try again.");
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


$("#btnDeleteField").on('click', () => {
    let fieldCodetobeDeleted = $('#fieldCodeUpdate').text();

    if (!fieldCodetobeDeleted) {
        alert("No field selected for deletion.");
        return;
    }

    $.ajax({
        url: `http://localhost:5050/greenshadow/api/v1/field/${fieldCodetobeDeleted}`,
        type: 'DELETE',
        success: function (response) {
            console.log("Response:", response);
            alert("Field successfully deleted.");
            loadTable();
            clearField();
        },
        error: function (xhr, status, error) {
            console.error(`Error: ${error}, Status: ${status}, Code: ${xhr.status}`);
            alert("Failed to delete the field. Please try again.");
        }
    });
});


$("#fieldSearchButton").on('click', () => {
    const searchQuery = $("#searchFieldsBar").val().trim().toLowerCase();

    if (!searchQuery) {
        alert("Please enter a search query.");
        return;
    }

    $.ajax({
        url: `http://localhost:5050/greenshadow/api/v1/field?query=${encodeURIComponent(searchQuery)}`,
        type: 'GET',
        headers: {
            "Request-Type": "search"
        },
        success: function (searchResults) {
            $('#field-table-tbody').empty();

            if (searchResults.length > 0) {
                searchResults.forEach(field => {
                    $("#field-table-tbody").append(`
                        <tr>
                            <td class="fieldCode">${field.fieldCode}</td>
                            <td class="fieldName">${field.fieldName}</td>
                            <td class="fieldLocation">${field.location}</td>
                            <td class="fieldSize">${field.size}</td>
                            <td class="img1">${field.img1}</td>
                            <td class="img2">${field.img2}</td>
                        </tr>
                    `);
                });
            } else {
                // If no results are found
                $('#field-table-tbody').html("<tr><td colspan='4'>No matching fields were found</td></tr>");
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
        url: `http://localhost:5050/greenshadow/api/v1/field?query=${encodeURIComponent(inputText)}`,
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
    const suggestionsList = $("#fieldSuggestions");

    suggestionsList.empty();

    suggestions.forEach(suggestion => {
        suggestionsList.append(`<li>${suggestion}</li>`);
    });
}
$("#searchFieldsBar").on('input', function() {
    const input = $(this).val();
    suggestNames(input,function (suggestions) {
        updateSuggestions(suggestions);

        if (input.trim() === '') {
            $("#fieldSuggestions").hide();
        } else {
            $("#fieldSuggestions").show();
        }
    });
});