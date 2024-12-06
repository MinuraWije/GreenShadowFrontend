import {RegexValidator} from "../validation/RegexValidator.js";


let clickedIndex;
let idCounter = 1

$(document).ready(function () {
    loadTable();
});
$("#btnAddEquipment").on('click',()=>{
    let equipmentName = $("#equipmentName").val()
    let equipmentType = $("#equipmentType").val()
    let equipmentStatus = $("#equipmentStatus").val()

    let validator = new RegexValidator();

    const validationResult = validator.validateEquipment(equipmentName, equipmentType, equipmentStatus);
    if (validationResult.isValid){
        $.ajax({
            url:"http://localhost:5050/greenshadow/api/v1/equipment",
            method:"POST",
            contentType:"application/json",
            "data": JSON.stringify({
                "name": equipmentName,
                "type": equipmentType,
                "status": equipmentStatus
            }),
            success:function (results){
                console.log(results)
                alert('Equipment data was saved successfully.')
                clearEquipment()
                loadTable()
            },
            error:function (error){
                console.log(error)
                alert('Equipment data was not saved.')
            }
        })
    }
    else {
        alert('Invalid equipment data. Please check the input fields.');
        if (!validationResult.isNameValid) {
            alert('Invalid Name');
        }
        if (!validationResult.isTypeValid){
            alert('Invalid Type');
        }
        if (!validationResult.isStatusValid) {
            alert('Invalid Status');
        }
    }

})
function clearEquipment() {
    $("#equipmentName").val("")
    $("#equipmentType").val("")
    $("#equipmentStatus").val("")

    $("#equipmentIdUpdate").text("");
    $("#equipmentNameUpdate").val("");
    $("#equipmentTypeUpdate").val("");
    $("#equipmentStatusUpdate").val("");
}

function loadTable() {
    $.ajax({
        url: 'http://localhost:5050/greenshadow/api/v1/equipment',
        type: 'GET',
        headers: {
            'request-type': 'table', // Set your custom request header
        },
        success: function (response) {
            // Parse and use the response data
            $("#equipment-table-tbody").empty();
            response.forEach(equipment => {
                $('#equipment-table-tbody').append(`
                    <tr>
                        <td class="equipmentId">${equipment.equipmentId}</td>
                        <td class="equipmentName">${equipment.name}</td>
                        <td class="equipmentType">${equipment.type}</td>
                        <td class="equipmentStatus">${equipment.status}</td>
                    </tr>
                `);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error loading equipment data:", error);
        }
    });
}

$("#equipment-table-tbody").on('click','tr',function (){
    let index = $(this).index();
    clickedIndex = index;


    let equipmentId = $(this).find(".equipmentId").text()
    let equipmentName = $(this).find(".equipmentName").text()
    let equipmentType = $(this).find(".equipmentType").text()
    let equipmentStatus = $(this).find(".equipmentStatus").text()

    //console.log("id"+equipmentId,"name"+equipmentName,"type"+equipmentType,"status"+equipmentStatus)

    $("#updateEquipmentbtn").click()
    $("#equipmentIdUpdate").text(equipmentId);
    $("#equipmentNameUpdate").val(equipmentName);
    $("#equipmentTypeUpdate").val(equipmentType);
    $("#equipmentStatusUpdate").val(equipmentStatus);

})
$("#btnUpdateEquipment").on('click', () => {
    let validator = new RegexValidator();

    let equipmentIdUpdated = $("#equipmentIdUpdate").text();
    let equipmentNameUpdated = $("#equipmentNameUpdate").val();
    let equipmentTypeUpdated = $("#equipmentTypeUpdate").val();
    let equipmentStatusUpdated = $("#equipmentStatusUpdate").val();

    const validationResult = validator.validateEquipment(equipmentNameUpdated, equipmentTypeUpdated, equipmentStatusUpdated);
    if (validationResult.isValid) {
        const equipmentData = {
            equipmentId: equipmentIdUpdated,
            name: equipmentNameUpdated,
            type: equipmentTypeUpdated,
            status: equipmentStatusUpdated
        };

        // Make AJAX PUT request
        $.ajax({
            url: `http://localhost:5050/greenshadow/api/v1/equipment/${equipmentIdUpdated}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(equipmentData),
            success: function (response) {
                console.log("Response:", response); // Log response
                clearEquipment();
                loadTable(); // Reload table data
            },
            error: function (xhr, status, error) {
                console.error(`Error: ${error}, Status: ${status}, Code: ${xhr.status}`);
                alert("Failed to update equipment. Please try again.");
            }
        });

    } else {
        alert('Invalid equipment data. Please check the input fields.');
        if (!validationResult.isNameValid) {
            alert('Invalid Name');
        }
        if (!validationResult.isTypeValid) {
            alert('Invalid Type');
        }
        if (!validationResult.isStatusValid) {
            alert('Invalid Status');
        }
    }
});


$("#btnDeleteEquipment").on('click', () => {
    let equipmentIdtobeDeleted = $('#equipmentIdUpdate').text();

    if (!equipmentIdtobeDeleted) {
        alert("No equipment selected for deletion.");
        return;
    }

    // Make AJAX DELETE request
    $.ajax({
        url: `http://localhost:5050/greenshadow/api/v1/equipment/${equipmentIdtobeDeleted}`,
        type: 'DELETE',
        success: function (response) {
            console.log("Response:", response); // Log the response
            alert("Equipment successfully deleted.");
            loadTable(); // Refresh the equipment table
            clearEquipment(); // Clear the form or related inputs
        },
        error: function (xhr, status, error) {
            console.error(`Error: ${error}, Status: ${status}, Code: ${xhr.status}`);
            alert("Failed to delete the equipment. Please try again.");
        }
    });
});


$("#equipmentSearchButton").on('click', () => {
    const searchQuery = $("#searchEquipmentsBar").val().trim().toLowerCase();

    if (!searchQuery) {
        alert("Please enter a search query.");
        return;
    }

    // Make AJAX GET request
    $.ajax({
        url: `http://localhost:5050/greenshadow/api/v1/equipment?query=${encodeURIComponent(searchQuery)}`,
        type: 'GET',
        headers: {
            "Request-Type": "search"
        },
        success: function (searchResults) {
            // Clear the table before appending the results
            $('#equipment-table-tbody').empty();

            // Append search results to the table
            if (searchResults.length > 0) {
                searchResults.forEach(equipment => {
                    $("#equipment-table-tbody").append(`
                        <tr>
                            <td class="equipmentId">${equipment.equipmentId}</td>
                            <td class="equipmentName">${equipment.equipmentName}</td>
                            <td class="equipmentType">${equipment.equipmentType}</td>
                            <td class="equipmentStatus">${equipment.equipmentStatus}</td>
                        </tr>
                    `);
                });
            } else {
                // If no results are found
                $('#equipment-table-tbody').html("<tr><td colspan='4'>No matching equipment were found</td></tr>");
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
        url: `http://localhost:5050/greenshadow/api/v1/equipment?query=${encodeURIComponent(inputText)}`,
        type: 'GET',
        headers: {
            "Request-Type": "suggest"
        },
        success: function (suggestions) {
            // Call the callback function with the suggestions
            callback(suggestions);
        },
        error: function (xhr, status, error) {
            console.error(`Error: ${error}, Status: ${status}, Code: ${xhr.status}`);
            alert("Failed to retrieve name suggestions.");
            //callback([]); // Return an empty array on failure
        }
    });
}



function updateSuggestions(suggestions) {
    const suggestionsList = $("#equipmentSuggestions");

    suggestionsList.empty();

    suggestions.forEach(suggestion => {
        suggestionsList.append(`<li>${suggestion}</li>`);
    });
}
$("#searchEquipmentsBar").on('input', function() {
    const input = $(this).val();
    suggestNames(input,function (suggestions) {
        updateSuggestions(suggestions);

        if (input.trim() === '') {
            $("#equipmentSuggestions").hide();
        } else {
            $("#equipmentSuggestions").show();
        }
    });
});