import {RegexValidator} from "../validation/RegexValidator.js";


let clickedIndex;
let idCounter = 1

$(document).ready(function () {
    loadTable();
});
$("#btnAddStaff").on('click',()=>{
    let staffName = $("#staffName").val()
    let staffRole = $("#staffRole").val()
    let staffDesignation = $("#staffDesignation").val()
    let staffGender = $("#staffGender").val()
    let staffJoinedDate = $("#staffJoinedDate").val()
    let staffEmail = $("#staffEmail").val()
    let staffDOB = $("#staffDOB").val()
    let staffAddress = $("#staffAddress").val()
    let staffContactNumber = $("#staffContactNumber").val()

    /*let validator = new RegexValidator();

    const validationResult = validator.validateStaff(staffName, staffRole, staffDesignation,staffGender,staffJoinedDate,staffEmail,staffDOB,staffAddress,staffContactNumber);
    if (validationResult.isValid){*/
        $.ajax({
            url:"http://localhost:5050/greenshadow/api/v1/staff",
            method:"POST",
            contentType:"application/json",
            "data": JSON.stringify({
                "name": staffName,
                "role": staffRole,
                "designation": staffDesignation,
                "gender": staffGender,
                "joinedDate": staffJoinedDate,
                "email": staffEmail,
                "dob": staffDOB,
                "address": staffAddress,
                "contactNum": staffContactNumber
            }),
            success:function (results){
                console.log(results)
                alert('Staff data was saved successfully.')
                clearStaff()
                loadTable()
            },
            error:function (error){
                console.log(error)
                alert('Staff data was not saved.')
            }
        })
    //}
    /*else {
        alert('Invalid staff data. Please check the input fields.');
        if (!validationResult.isNameValid) {
            alert('Invalid Name');
        }
        if (!validationResult.isRoleValid){
            alert('Invalid Role');
        }
        if (!validationResult.isDesignationValid) {
            alert('Invalid Designation');
        }
        if (!validationResult.isGenderValid) {
            alert('Invalid Gender');
        }
        if (!validationResult.isJoinedDateValid) {
            alert('Invalid Joined Date');
        }
        if (!validationResult.isEmailValid) {
            alert('Invalid Email');
        }
        if (!validationResult.isDobValid) {
            alert('Invalid DOB');
        }
        if (!validationResult.isAddressValid) {
            alert('Invalid Address');
        }
        if (!validationResult.isContactNumberValid) {
            alert('Invalid Contact Number');
        }
    }*/

})
function clearStaff() {
    $("#staffName").val("")
    $("#staffRole").val("")
    $("#staffDesignation").val("")
    $("#staffGender").val("")
    $("#staffJoinedDate").val("")
    $("#staffEmail").val("")
    $("#staffDOB").val("")
    $("#staffAddress").val("")
    $("#staffContactNumber").val("")

    $("#staffIdUpdate").text("");
    $("#staffNameUpdate").val("")
    $("#staffRoleUpdate").val("")
    $("#staffDesignationUpdate").val("")
    $("#staffGenderUpdate").val("")
    $("#staffJoinedDateUpdate").val("")
    $("#staffEmailUpdate").val("")
    $("#staffDOBUpdate").val("")
    $("#staffAddressUpdate").val("")
    $("#staffContactNumberUpdate").val("")
}

function loadTable() {
    $.ajax({
        url: 'http://localhost:5050/greenshadow/api/v1/staff',
        type: 'GET',
        headers: {
            'request-type': 'table', // Set your custom request header
        },
        success: function (response) {

            // Parse and use the response data
            $("#staff-table-tbody").empty();
            response.forEach(staff => {
                $('#staff-table-tbody').append(`
                    <tr>
                        <td class="staffId">${staff.staffId}</td>
                        <td class="staffName">${staff.name}</td>
                        <td class="staffRole">${staff.role}</td>
                        <td class="staffDesignation">${staff.designation}</td>
                        <td class="staffGender">${staff.gender}</td>
                        <td class="staffJoinedDate">${staff.joinedDate}</td>
                        <td class="staffEmail">${staff.email}</td>
                        <td class="staffDob">${staff.dob}</td>
                        <td class="staffAddress">${staff.address}</td>
                        <td class="staffContactNum">${staff.contactNum}</td>
                    </tr>
                `);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error loading staff data:", error);
        }
    });
}

$("#staff-table-tbody").on('click','tr',function (){
    let index = $(this).index();
    clickedIndex = index;


    let staffId = $(this).find(".staffId").text()
    let staffName = $(this).find(".name").text()
    let staffRole = $(this).find(".role").text()
    let staffDesignation = $(this).find(".designation").text()
    let staffGender = $(this).find(".gender").text()
    let staffJoinedDate = $(this).find(".joinedDate").text()
    let staffEmail = $(this).find(".email").text()
    let staffDob = $(this).find(".dob").text()
    let staffAddress = $(this).find(".address").text()
    let staffContactNum = $(this).find(".contactNum").text()


    $("#updateStaffbtn").click()
    $("#staffIdUpdate").text(staffId);
    $("#staffNameUpdate").val(staffName);
    $("#staffRoleUpdate").val(staffRole);
    $("#staffDesignationUpdate").val(staffDesignation);
    $("#staffGenderUpdate").val(staffGender);
    $("#staffJoinedDateUpdate").val(staffJoinedDate);
    $("#staffEmailUpdate").val(staffEmail);
    $("#staffDOBUpdate").val(staffDob);
    $("#staffAddressUpdate").val(staffAddress);
    $("#staffContactNumberUpdate").val(staffContactNum);
})
$("#btnUpdateStaff").on('click', () => {
    let validator = new RegexValidator();

    let staffIdUpdated = $("#staffIdUpdate").text();
    let staffNameUpdated = $("#staffNameUpdate").val();
    let staffRoleUpdated = $("#staffRoleUpdate").val();
    let staffDesignationUpdated = $("#staffDesignationUpdate").val();
    let staffGenderUpdated = $("#staffGenderUpdate").val();
    let staffJoinedDateUpdated = $("#staffJoinedDateUpdate").val();
    let staffEmailUpdated = $("#staffEmailUpdate").val();
    let staffDobUpdated = $("#staffDOBUpdate").val();
    let staffAddressUpdated = $("#staffAddressUpdate").val();
    let staffContactNumberUpdated = $("#staffContactNumberUpdate").val();

    /*const validationResult = validator.validateStaff(staffNameUpdated, staffRoleUpdated,staffDesignationUpdated, staffGenderUpdated,
        staffJoinedDateUpdated,staffEmailUpdated,staffDobUpdated,staffAddressUpdated,staffContactNumberUpdated);
    if (validationResult.isValid) {*/
        const staffData = {
            staffId: staffIdUpdated,
            name: staffNameUpdated,
            role: staffRoleUpdated,
            designation: staffDesignationUpdated,
            gender: staffGenderUpdated,
            joinedDate: staffJoinedDateUpdated,
            email: staffEmailUpdated,
            dob: staffDobUpdated,
            address: staffAddressUpdated,
            contactNum: staffContactNumberUpdated,
        };

        // Make AJAX PUT request
        $.ajax({
            url: `http://localhost:5050/greenshadow/api/v1/staff/${staffIdUpdated}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(staffData),
            success: function (response) {
                console.log("Response:", response); // Log response
                clearStaff();
                loadTable(); // Reload table data
            },
            error: function (xhr, status, error) {
                console.error(`Error: ${error}, Status: ${status}, Code: ${xhr.status}`);
                alert("Failed to update staff. Please try again.");
            }
        });

    //}
    /*else {
        alert('Invalid staff data. Please check the input fields.');
        if (!validationResult.isNameValid) {
            alert('Invalid Name');
        }
        if (!validationResult.isRoleValid){
            alert('Invalid Role');
        }
        if (!validationResult.isDesignationValid) {
            alert('Invalid Designation');
        }
        if (!validationResult.isGenderValid) {
            alert('Invalid Gender');
        }
        if (!validationResult.isJoinedDateValid) {
            alert('Invalid Joined Date');
        }
        if (!validationResult.isEmailValid) {
            alert('Invalid Email');
        }
        if (!validationResult.isDobValid) {
            alert('Invalid DOB');
        }
        if (!validationResult.isAddressValid) {
            alert('Invalid Address');
        }
        if (!validationResult.isContactNumberValid) {
            alert('Invalid Contact Number');
        }
    }*/
});


$("#btnDeleteStaff").on('click', () => {
    let staffIdtobeDeleted = $('#staffIdUpdate').text();

    if (!staffIdtobeDeleted) {
        alert("No staff selected for deletion.");
        return;
    }

    $.ajax({
        url: `http://localhost:5050/greenshadow/api/v1/staff/${staffIdtobeDeleted}`,
        type: 'DELETE',
        success: function (response) {
            console.log("Response:", response);
            alert("Staff successfully deleted.");
            loadTable();
            clearStaff();
        },
        error: function (xhr, status, error) {
            console.error(`Error: ${error}, Status: ${status}, Code: ${xhr.status}`);
            alert("Failed to delete staff. Please try again.");
        }
    });
});


$("#staffSearchButton").on('click', () => {
    const searchQuery = $("#searchStaffBar").val().trim().toLowerCase();

    if (!searchQuery) {
        alert("Please enter a search query.");
        return;
    }

    $.ajax({
        url: `http://localhost:5050/greenshadow/api/v1/staff?query=${encodeURIComponent(searchQuery)}`,
        type: 'GET',
        headers: {
            "Request-Type": "search"
        },
        success: function (searchResults) {
            $('#staff-table-tbody').empty();

            if (searchResults.length > 0) {
                searchResults.forEach(staff => {
                    $("#staff-table-tbody").append(`
                        <tr>
                            <td class="staffId">${staff.staffId}</td>
                            <td class="staffName">${staff.name}</td>
                            <td class="staffRole">${staff.role}</td>
                            <td class="staffDesignation">${staff.designation}</td>
                            <td class="staffGender">${staff.gender}</td>
                            <td class="staffJoinedDate">${staff.joinedDate}</td>
                            <td class="staffEmail">${staff.email}</td>
                            <td class="staffDob">${staff.dob}</td>
                            <td class="staffAddress">${staff.address}</td>
                            <td class="staffContactNum">${staff.contactNum}</td>
                        </tr>
                    `);
                });
            } else {
                // If no results are found
                $('#staff-table-tbody').html("<tr><td colspan='4'>No matching staff were found</td></tr>");
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
        url: `http://localhost:5050/greenshadow/api/v1/staff?query=${encodeURIComponent(inputText)}`,
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
    const suggestionsList = $("#staffSuggestions");

    suggestionsList.empty();

    suggestions.forEach(suggestion => {
        suggestionsList.append(`<li>${suggestion}</li>`);
    });
}
$("#searchStaffBar").on('input', function() {
    const input = $(this).val();
    suggestNames(input,function (suggestions) {
        updateSuggestions(suggestions);

        if (input.trim() === '') {
            $("#staffSuggestions").hide();
        } else {
            $("#staffSuggestions").show();
        }
    });
});