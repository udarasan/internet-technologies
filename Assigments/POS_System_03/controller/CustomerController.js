$('#saveCustomer').click(function () {
    let cid = $('#cid').val();
    let fName = $('#fName').val();
    let lName = $('#lName').val();
    let address = $('#address').val();
    let state = $('#state').val();

    let res = saveCustomer(cid, fName, lName, address, state);
    if (res) clearAllCustomerText();
    CustomerIDAutoMake();
})
$("#deleteCustomer").click(function () {
    let cid = $("#cid").val();
    let option = confirm(`Do you want to delete ID:${cid}`);
    if (option) {
        let res = deleteCustomer(cid);
        if (res) {
            alert("Customer Deleted");
        } else {
            alert("Delete Failed")
        }

    }
    loadAllCustomerToTheTable();
    clearAllCustomerText();
});

$("#updateCustomer").click(function () {
    let cid = $("#cid").val();
    let fName = $("#fName").val();
    let lName = $("#lName").val();
    let address = $("#address").val();
    let state = $("#state").val();

    let option = confirm(`Do you want to Update Customer ID:${cid}`);
    if (option) {
        let res = updateCustomer(cid, fName, lName, address, state);
        if (res) {
            alert("Customer Updated");
        } else {
            alert("Update Failed");
        }
    }
    loadAllCustomerToTheTable();
    clearAllCustomerText();

});

function saveCustomer(cid, fName, lName, address, state) {
    let customer = new CustomerDTO(cid, fName, lName, address, state);
    customerTable.push(customer);// customer add

    // load the table
    loadAllCustomerToTheTable();
    return true;
}

function getAllCustomers() {
    return customerTable;
}

//delete customer

function deleteCustomer(cid) {
    let customer = searchCustomer(cid);
    if (customer != null) {
        let indexNumber = customerTable.indexOf(customer);
        customerTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

// search customer
function searchCustomer(cid) {
    for (var i in customerTable) {
        if (customerTable[i].getCustomerCID() == cid) return customerTable[i];
    }
    return null;
}


function updateCustomer(cid, fName, lName, address, state) {
    let customer = searchCustomer(cid);
    if (customer != null) {
        customer.setCustomerFName(fName)
        customer.setCustomerLName(lName)
        customer.setCustomerAddress(address)
        customer.setCustomerState(state);
        return true;
    } else {
        return false;
    }
}


function loadAllCustomerToTheTable() {
    let allCustomers = getAllCustomers();
    $('.customerTable>tbody').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allCustomers) {
        let cid = allCustomers[i].getCustomerCID();
        let fName = allCustomers[i].getCustomerFName();
        let lName = allCustomers[i].getCustomerLName();
        let address = allCustomers[i].getCustomerAddress();
        let state = allCustomers[i].getCustomerState();

        var row = `<tr><td>${cid}</td><td>${fName}</td><td>${lName}</td><td>${address}</td><td>${state}</td></tr>`;
        $('.customerTable>tbody').append(row);
    }
}

/*Validations*/
function clearAllCustomerText() {
    $("#cid").val("");
    $("#fName").val("");
    $("#lName").val("");
    $("#address").val("");
    $("#state").val("");
}

$("#searchCustomer").click(function () {

    let customer = searchCustomer($('#cid').val());
    if (customer != null) {
        $("#cid").val(customer.getCustomerCID());
        $("#fName").val(customer.getCustomerFName());
        $("#lName").val(customer.getCustomerLName());
        $("#address").val(customer.getCustomerAddress());
        $("#state").val(customer.getCustomerState());
    } else {
        clearAllCustomerText();
    }

});

let cusRegEx = /^(C00)[0-9]{1,3}$/;
let cusNRegEx = /^[A-z]{1,100}$/;
let cusFRegEx = /^[A-z]{1,100}$/;
let cusARegEx = /^[A-z,0-9]{1,200}$/;
let cusSRegEx = /^[A-z]{1,100}$/;

$('#cid').on('keyup', function (event) {
    let inputID = $("#cid").val();
    if (cusRegEx.test(inputID)) {
        $("#cid").css('border', '2px solid green');
        $("#lblCid").text("Customer ID");
    } else {
        $("#cid").css('border', '2px solid red');
        $("#lblCid").text('Your Input Data Format is Wrong (C001)');
    }
});
$('#fName').on('keyup', function (event) {
    let inputID = $("#fName").val();
    if (cusNRegEx.test(inputID)) {
        $("#fName").css('border', '2px solid green');
        $("#lblFName").text("Customer ID");
    } else {
        $("#fName").css('border', '2px solid red');
        $("#lblFName").text('Your Input Data Format is Wrong (Udara)');
    }
});
$('#lName').on('keyup', function (event) {
    let inputID = $("#lName").val();
    if (cusFRegEx.test(inputID)) {
        $("#lName").css('border', '2px solid green');
        $("#lblSName").text("Second Name");
    } else {
        $("#lName").css('border', '2px solid red');
        $("#lblSName").text('Your Input Data Format is Wrong (Sanjeewa)');
    }
});
$('#address').on('keyup', function (event) {
    let inputID = $("#address").val();
    if (cusARegEx.test(inputID)) {
        $("#address").css('border', '2px solid green');
        $("#lblAddress").text("Address");
    } else {
        $("#address").css('border', '2px solid red');
        $("#lblAddress").text('Your Input Data Format is Wrong (Homagama)');
    }
});
$('#state').on('keyup', function (event) {
    let inputID = $("#state").val();
    if (cusSRegEx.test(inputID)) {
        $("#state").css('border', '2px solid green');
        $("#lblState").text("State");
    } else {
        $("#state").css('border', '2px solid red');
        $("#lblState").text('Your Input Data Format is Wrong (Colombo)');
    }
});

function CustomerIDAutoMake() {
    try {
        let lastID = customerTable[customerTable.length - 1].getCustomerCID();
        let newID = parseInt(lastID.substring(1, 4)) + 1;
        if (newID < 10) {
            $('#cid').val("C00" + newID);
        } else if (newID < 100) {
            $('#cid').val("O0" + newID);
        } else {
            $('#cid').val("O" + newID);
        }
    } catch (e) {
        $('#cid').val("C001");
    }


}

function printCustomer() {
    $('#secondHeader').css('display','none');
    $('#customerForm').css('display','none');
    window.print();
    $('#secondHeader').css('display','block');
    $('#customerForm').css('display','block');
}

$('#printCustomer').click(function () {
    printCustomer();
});


