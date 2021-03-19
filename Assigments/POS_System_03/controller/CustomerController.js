$('#saveCustomer').click(function () {
    let cid = $('#cid').val();
    let fName = $('#fName').val();
    let lName = $('#lName').val();
    let address = $('#address').val();
    let state = $('#state').val();

    let res = saveCustomer(cid, fName, lName, address, state);
    if (res) clearAllCustomerText();
    loadCustomerID();
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


function clearAllCustomerText() {
    $("#cid").val("");
    $("#fName").val("");
    $("#lName").val("");
    $("#address").val("");
    $("#state").val("");
}

