import {RegexValidator} from "../validation/RegexValidator.js";


let clickedIndex;
let idCounter = 1

$(document).ready(function () {
    loadTable();
});
$("#btnAddCrop").on('click',()=>{
    let cropName = $("#cropName").val();
    let cropScientificName = $("#cropScientificName").val();
    let cropCategory = $("#cropCategory").val();
    let cropImg = $("#cropImg")[0].files[0];
    let cropSeason = $("#cropSeason").val();
    let fieldCode = $("#fieldCodeInCrops").val();

    let formData = new FormData();
    formData.append("cropName", cropName);
    formData.append("cropScientificName", cropScientificName);
    formData.append("category", cropCategory);
    formData.append("img", cropImg);
    formData.append("season", cropSeason);
    formData.append("fieldCode", fieldCode);
    /*let validator = new RegexValidator();

    const validationResult = validator.validateLog(logDetails, logDate, logObservedImg);
    if (validationResult.isValid){*/
    $.ajax({
        url:"http://localhost:5050/greenshadow/api/v1/crop",
        method:"POST",
        processData: false, // Prevent jQuery from processing the FormData
        contentType: false, // Let the browser set the Content-Type, including boundary
        data: formData,
        success:function (results){
            console.log(results)
            alert('Crop data was saved successfully.')
            clearCrop()
            loadTable()
        },
        error:function (error){
            console.log(error)
            alert('Crop data was not saved.')
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
function clearCrop() {
    $("#cropName").val("")
    $("#cropScientificName").val("")
    $("#cropCategory").val("")
    $("#cropImg").val("")
    $("#cropSeason").val("")
    $("#fieldCodeInCrops").val("")

    $("#cropCodeUpdate").text("");
    $("#cropNameUpdate").val("");
    $("#cropScientificNameUpdate").val("");
    $("#cropCategoryUpdate").val("");
    $("#cropImgUpdate").val("");
    $("#cropSeasonUpdate").val("");
    $("#fieldCodeInCropsUpdate").val("");
}

function loadTable() {
    $.ajax({
        url: 'http://localhost:5050/greenshadow/api/v1/crop',
        type: 'GET',
        headers: {
            'request-type': 'table', // Set your custom request header
        },
        success: function (response) {
            // Parse and use the response data
            $("#crop-table-tbody").empty();
            response.forEach(crop => {
                $('#crop-table-tbody').append(`
                    <tr>
                        <td class="cropCode">${crop.cropCode}</td>              
                        <td class="cropName">${crop.cropName}</td>         
                        <td class="cropScientificName">${crop.cropScientificName}</td>
                        <td class="cropCategory">${crop.category}</td>
                        <td class="cropImg"><img src="data:image/jpeg;base64,${crop.img}" alt="Crop Image" style="width: 200px; height: 200px;"></td>
                        <td class="cropSeason">${crop.season}</td>
                        <td class="fieldCode">${crop.fieldCode}</td>
                    </tr>
                `);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error loading crop data:", error);
        }
    });
    //data:image/jpeg;base64,
    //${"http://localhost:5050/greenshadow/api/v1/log"}/image/
}

$("#crop-table-tbody").on('click','tr',function (){
    let index = $(this).index();
    clickedIndex = index;


    let cropCode = $(this).find(".cropCode").text()
    let cropName = $(this).find(".cropName").text()
    let cropScientificName = $(this).find(".cropScientificName").text()
    let cropCategory = $(this).find(".category").text()
    let cropImg = $(this).find(".img").text()
    let cropSeason = $(this).find(".season").text()
    let fieldCode = $(this).find(".fieldCode").text()

    //console.log("code"+logCode,"details"+logDetails,"date"+logDate,"img"+logObservedImg)

    $("#updateCropbtn").click()
    $("#cropCodeUpdate").text(cropCode);
    $("#cropNameUpdate").val(cropName);
    $("#cropScientificNameUpdate").val(cropScientificName);
    $("#cropCategoryUpdate").val(cropCategory);
    $("#cropImgUpdate").val(cropImg);
    $("#cropSeasonUpdate").val(cropSeason);
    $("#fieldCodeInCropsUpdate").val(fieldCode);

})
$("#btnUpdateCrop").on('click', () => {
    let validator = new RegexValidator();

    let cropCodeUpdated = $("#cropCodeUpdate").text();
    let cropNameUpdated = $("#cropNameUpdate").val();
    let cropScientificNameUpdated = $("#cropScientificNameUpdate").val();
    let cropCategoryUpdated = $("#cropCategoryUpdate").val();
    let cropImgUpdated = $("#cropImgUpdate")[0].files[0];
    let cropSeasonUpdated = $("#cropSeasonUpdate").val();
    let fieldCodeUpdated = $("#fieldCodeInCropsUpdate").val();

    /*const validationResult = validator.validateLog(logDetailsUpdated, logDateUpdated,logObservedImgUpdated);
    if (validationResult.isValid) {
        const logData = {
            logCode: logCodeUpdated,
            logDetails: logDetailsUpdated,
            logDate: logDateUpdated,
            observedImg: logObservedImgUpdated
        };*/
    const newLogData = new FormData()

    newLogData.append("cropName", cropNameUpdated)
    newLogData.append("cropScientificName", cropScientificNameUpdated)
    newLogData.append("category", cropCategoryUpdated)
    newLogData.append("img", cropImgUpdated);
    newLogData.append("season", cropSeasonUpdated);
    newLogData.append("fieldCode", fieldCodeUpdated);

    // Make AJAX PUT request
    $.ajax({
        url: `http://localhost:5050/greenshadow/api/v1/crop/${cropCodeUpdated}`,
        type: 'PUT',
        processData: false, // Prevent jQuery from processing the FormData
        contentType: false, // Let the browser set the Content-Type, including boundary
        data: newLogData,
        success: function (response) {
            console.log("Response:", response); // Log response
            clearCrop();
            loadTable(); // Reload table data
        },
        error: function (xhr, status, error) {
            console.error(`Error: ${error}, Status: ${status}, Code: ${xhr.status}`);
            alert("Failed to update crop. Please try again.");
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


$("#btnDeleteCrop").on('click', () => {
    let cropCodetobeDeleted = $('#cropCodeUpdate').text();

    if (!cropCodetobeDeleted) {
        alert("No crop selected for deletion.");
        return;
    }

    $.ajax({
        url: `http://localhost:5050/greenshadow/api/v1/crop/${cropCodetobeDeleted}`,
        type: 'DELETE',
        success: function (response) {
            console.log("Response:", response);
            alert("Crop successfully deleted.");
            loadTable();
            clearCrop();
        },
        error: function (xhr, status, error) {
            console.error(`Error: ${error}, Status: ${status}, Code: ${xhr.status}`);
            alert("Failed to delete the crop. Please try again.");
        }
    });
});


$("#cropSearchButton").on('click', () => {
    const searchQuery = $("#searchCropsBar").val().trim().toLowerCase();

    if (!searchQuery) {
        alert("Please enter a search query.");
        return;
    }

    $.ajax({
        url: `http://localhost:5050/greenshadow/api/v1/crop?query=${encodeURIComponent(searchQuery)}`,
        type: 'GET',
        headers: {
            "Request-Type": "search"
        },
        success: function (searchResults) {
            $('#crop-table-tbody').empty();

            if (searchResults.length > 0) {
                searchResults.forEach(crop => {
                    $("#crop-table-tbody").append(`
                        <tr>
                            <td class="cropCode">${crop.cropCode}</td>
                            <td class="cropName">${crop.cropName}</td>
                            <td class="cropScientificName">${crop.cropScientificName}</td>
                            <td class="cropCategory">${crop.category}</td>
                            <td class="cropImg">${crop.img}</td>
                            <td class="cropSeason">${crop.season}</td>
                            <td class="fieldCode">${crop.fieldCode}</td>
                        </tr>
                    `);
                });
            } else {
                // If no results are found
                $('#crop-table-tbody').html("<tr><td colspan='4'>No matching crops were found</td></tr>");
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
        url: `http://localhost:5050/greenshadow/api/v1/crop?query=${encodeURIComponent(inputText)}`,
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
    const suggestionsList = $("#cropSuggestions");

    suggestionsList.empty();

    suggestions.forEach(suggestion => {
        suggestionsList.append(`<li>${suggestion}</li>`);
    });
}
$("#searchCropsBar").on('input', function() {
    const input = $(this).val();
    suggestNames(input,function (suggestions) {
        updateSuggestions(suggestions);

        if (input.trim() === '') {
            $("#cropSuggestions").hide();
        } else {
            $("#cropSuggestions").show();
        }
    });
});