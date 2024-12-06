import {RegexValidator} from "../validation/RegexValidator.js";


let clickedIndex;
let idCounter = 1

$(document).ready(function () {
    loadTable();
});
$("#btnAddVehicle").on('click',()=>{
    let vehicleLicensePlateNumber = $("#vehicleLicensePlateNumber").val()
    let vehicleCategory = $("#vehicleCategory").val()
    let vehicleFuelType = $("#vehicleFuelType").val()
    let vehicleStatus = $("#vehicleStatus").val()

    let validator = new RegexValidator();

    const validationResult = validator.validateVehicle(vehicleLicensePlateNumber, vehicleCategory, vehicleFuelType,vehicleStatus);
    if (validationResult.isValid){
        $.ajax({
            url:"http://localhost:5050/greenshadow/api/v1/vehicles",
            method:"POST",
            contentType:"application/json",
            "data": JSON.stringify({
                "licensePlateNum": vehicleLicensePlateNumber,
                "category": vehicleCategory,
                "fuelType": vehicleFuelType,
                "status": vehicleStatus
            }),
            success:function (results){
                console.log(results)
                alert('Vehicle data was saved successfully.')
            },
            error:function (error){
                console.log(error)
                alert('Vehicle data was not saved.')
            }
        })
    }
    else {
        alert('Invalid vehicle data. Please check the input fields.');
        if (!validationResult.isLicensePlateNumValid) {
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
        }
    }
    clearVehicle()
    loadTable()
})
function clearVehicle() {
    $("#vehicleLicensePlateNumber").val("")
    $("#vehicleCategory").val("")
    $("#vehicleFuelType").val("")
    $("#vehicleStatus").val("")

    $("#vehicleCodeUpdate").text("");
    $("#vehicleLicensePlateNumberUpdate").val("");
    $("#vehicleCategoryUpdate").val("");
    $("#vehicleFuelTypeUpdate").val("");
    $("#vehicleStatusUpdate").val("");
}

function loadTable() {
    $.ajax({
        url: 'http://localhost:5050/greenshadow/api/v1/vehicles',
        type: 'GET',
        headers: {
            'request-type': 'table', // Set your custom request header
        },
        success: function (response) {
            // Parse and use the response data
            $("#vehicle-table-tbody").empty();
            response.forEach(vehicle => {
                $('#vehicle-table-tbody').append(`
                    <tr>
                        <td class="vehicleCode">${vehicle.vehicleCode}</td>
                        <td class="licensePlateNum">${vehicle.licensePlateNum}</td>
                        <td class="category">${vehicle.category}</td>
                        <td class="fuelType">${vehicle.fuelType}</td>
                        <td class="status">${vehicle.status}</td>
                    </tr>
                `);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error loading vehicle data:", error);
        }
    });
}

$("#vehicle-table-tbody").on('click','tr',function (){
    let index = $(this).index();
    clickedIndex = index;


    let vehicleCode = $(this).find(".vehicleCode").text()
    let vehicleLicensePlateNumber = $(this).find(".licensePlateNum").text()
    let vehicleCategory = $(this).find(".category").text()
    let vehicleFuelType = $(this).find(".fuelType").text()
    let vehicleStatus = $(this).find(".status").text()

    console.log("code"+vehicleCode,"plate"+vehicleLicensePlateNumber,"category"+vehicleCategory,"fuel"+vehicleFuelType,"status"+vehicleStatus)

    $("#updateVehiclebtn").click()
    $("#vehicleCodeUpdate").text(vehicleCode);
    $("#vehicleLicensePlateNumberUpdate").val(vehicleLicensePlateNumber);
    $("#vehicleCategoryUpdate").val(vehicleCategory);
    $("#vehicleFuelTypeUpdate").val(vehicleFuelType);
    $("#vehicleStatusUpdate").val(vehicleStatus);

})
$("#btnUpdateVehicle").on('click', () => {
    let validator = new RegexValidator();

    let vehicleCodeUpdated = $("#vehicleCodeUpdate").text();
    let vehicleLicensePlateNumUpdated = $("#vehicleLicensePlateNumberUpdate").val();
    let vehicleCategoryUpdated = $("#vehicleCategoryUpdate").val();
    let vehicleFuelTypeUpdated = $("#vehicleFuelTypeUpdate").val();
    let vehicleStatusUpdated = $("#vehicleStatusUpdate").val();

    const validationResult = validator.validateVehicle(vehicleLicensePlateNumUpdated, vehicleCategoryUpdated,vehicleFuelTypeUpdated, vehicleStatusUpdated);
    if (validationResult.isValid) {
        const vehicleData = {
            vehicleCode: vehicleCodeUpdated,
            licensePlateNum: vehicleLicensePlateNumUpdated,
            category: vehicleCategoryUpdated,
            fuelType: vehicleFuelTypeUpdated,
            status: vehicleStatusUpdated
        };

        // Make AJAX PUT request
        $.ajax({
            url: `http://localhost:5050/greenshadow/api/v1/vehicles/${vehicleCodeUpdated}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(vehicleData),
            success: function (response) {
                console.log("Response:", response); // Log response
                clearVehicle();
                loadTable(); // Reload table data
            },
            error: function (xhr, status, error) {
                console.error(`Error: ${error}, Status: ${status}, Code: ${xhr.status}`);
                alert("Failed to update vehicle. Please try again.");
            }
        });

    } else {
        alert('Invalid vehicle data. Please check the input fields.');
        if (!validationResult.isLicensePlateNumValid) {
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
        }
    }
});


$("#btnDeleteVehicle").on('click', () => {
    let vehicleCodetobeDeleted = $('#vehicleCodeUpdate').text();

    if (!vehicleCodetobeDeleted) {
        alert("No vehicle selected for deletion.");
        return;
    }

    $.ajax({
        url: `http://localhost:5050/greenshadow/api/v1/vehicles/${vehicleCodetobeDeleted}`,
        type: 'DELETE',
        success: function (response) {
            console.log("Response:", response);
            alert("Vehicle successfully deleted.");
            loadTable();
            clearVehicle();
        },
        error: function (xhr, status, error) {
            console.error(`Error: ${error}, Status: ${status}, Code: ${xhr.status}`);
            alert("Failed to delete the vehicle. Please try again.");
        }
    });
});


$("#vehicleSearchButton").on('click', () => {
    const searchQuery = $("#searchBar").val().trim().toLowerCase();

    if (!searchQuery) {
        alert("Please enter a search query.");
        return;
    }

    $.ajax({
        url: `http://localhost:5050/greenshadow/api/v1/vehicles?query=${encodeURIComponent(searchQuery)}`,
        type: 'GET',
        headers: {
            "Request-Type": "search"
        },
        success: function (searchResults) {
            $('#vehicle-table-tbody').empty();

            if (searchResults.length > 0) {
                searchResults.forEach(vehicle => {
                    $("#vehicle-table-tbody").append(`
                        <tr>
                            <td class="vehicleCode">${vehicle.vehicleCode}</td>
                            <td class="licensePlateNum">${vehicle.licensePlateNum}</td>
                            <td class="category">${vehicle.category}</td>
                            <td class="fuelType">${vehicle.fuelType}</td>
                            <td class="status">${vehicle.status}</td>
                        </tr>
                    `);
                });
            } else {
                // If no results are found
                $('#vehicle-table-tbody').html("<tr><td colspan='4'>No matching vehicles were found</td></tr>");
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
        url: `http://localhost:5050/greenshadow/api/v1/vehicles?query=${encodeURIComponent(inputText)}`,
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