
$('#btnAdd').click(function () {

    let OID = $('#orderId').val();
    let orderDate = $('#orderDate').val();
    let customerName = $('#customerName').val();
    let customerCID = $('#oCid').val();
    let states = $('#states').val();
    let address = $('#oAddress').val();

    let itemCode = $('#itemCode').val();
    let oItemName = $('#oItemName').val();
    let oPrice = $('#oPrice').val();
    let oQTY = $('#oQTY').val();
    let total=oPrice*oQTY;
    console.log(total);

    let res = addOrder(OID, orderDate, customerName, customerCID, states, address, itemCode, oItemName, oPrice, oQTY,total);
    $('#subTotal').text(total);
});

function addOrder(OID, orderDate, customerName, customerCID, states, address, itemCode, oItemName, oPrice, oQTY,total) {
    let order = new OrderDTO(OID, orderDate, customerName, customerCID, states, address, itemCode, oItemName, oPrice, oQTY,total);
    orderTable.push(order);


    loadAllOrdersToTheTable();
    return true;
}

function loadAllOrdersToTheTable() {
    let allOrders = getAllOrderDetails();
    $('#orderTable>tbody').empty();
    for (var c in allOrders){
        let OID = allOrders[c].getOID();
        let orderDate = allOrders[c].getOrderDate();
        let customerName = allOrders[c].getCustomerName();
        let customerCID = allOrders[c].getCusCID();
        let states = allOrders[c].getStates();
        let address = allOrders[c].getAddress();

        let itemCode = allOrders[c].getItemCode();
        let oItemName = allOrders[c].getINames();
        let oPrice = allOrders[c].getIPrice();
        let oQTY = allOrders[c].getOrderQTY();
        let total=oPrice*oQTY;

        var row='<tr><td>'+itemCode+'</td><td>'+oItemName+'</td><td>'+oPrice+'</td><td>'+oQTY+'</td>'+'<td>'+total+'</td></tr>';
        $('#orderTable>tbody').append(row);

    }
}

function getAllOrderDetails() {
    return orderTable;

}


function loadItemID() {

    for (var c of getAllItem()) {
        $('#inputItem').append(`<option value="${c.getItemID()}">${c.getItemID()}</option>`);
        console.log("sdsd");
    }

}


    $('#inputItem').change(function () {
        if ($('#inputItem').val() !== '-1'){

            const selectedItem = searchItem($('#inputItem').val());
            $('#itemCode').val(selectedItem.getItemID());
            $('#oItemName').val(selectedItem.getItemName());
            $('#oPrice').val(selectedItem.getItemPrice());
            $('#oQTY').val(selectedItem.getItemQTY());
        }else {

        }
    });

function loadCustomerID() {

    for (var c of getAllCustomers()) {
        $('#oCid').append(`<option value="${c.getCustomerCID()}">${c.getCustomerCID()}</option>`);

    }

}


$('#oCid').change(function () {
    if ($('#oCid').val() !== '-1'){

        const selectedItem = searchCustomer($('#oCid').val());
        $('#customerName').val(selectedItem.getCustomerFName());
        $('#states').val(selectedItem.getCustomerState());
        $('#oAddress').val(selectedItem.getCustomerAddress());
    }else {

    }
});

function GetTodayDate() {
    var tdate = new Date();
    var dd = tdate.getDate(); //yields day
    var MM = tdate.getMonth(); //yields month
    var yyyy = tdate.getFullYear(); //yields year
    var currentDate= dd + "-" +( MM+1) + "-" + yyyy;

    // return currentDate;

    $("#orderDate").val(currentDate);
}





