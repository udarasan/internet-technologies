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
    let total = oPrice * oQTY;
    console.log(total);

    let res = addOrder(OID, orderDate, customerName, customerCID, states, address, itemCode, oItemName, oPrice, oQTY, total);
    $('#subTotal').text(total);
    makeTotal();
});

function addOrder(OID, orderDate, customerName, customerCID, states, address, itemCode, oItemName, oPrice, oQTY, total) {

    let order = new OrderDTO(OID, orderDate, customerName, customerCID, states, address, itemCode, oItemName, oPrice, oQTY, total);
    orderTable.push(order);


    loadAllOrdersToTheTable();
    return true;
}

function loadAllOrdersToTheTable() {
    let allOrders = getAllOrderDetails();
    $('#orderTable>tbody').empty();
    for (var c in allOrders) {
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
        let total = oPrice * oQTY;

        var row = '<tr><td>' + itemCode + '</td><td>' + oItemName + '</td><td>' + oPrice + '</td><td>' + oQTY + '</td>' + '<td>' + total + '</td></tr>';
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
    if ($('#inputItem').val() !== '-1') {

        const selectedItem = searchItem($('#inputItem').val());
        $('#itemCode').val(selectedItem.getItemID());
        $('#oItemName').val(selectedItem.getItemName());
        $('#oPrice').val(selectedItem.getItemPrice());
        $('#oQTY').val(selectedItem.getItemQTY());
    } else {

    }
});

function loadCustomerID() {

    for (var c of getAllCustomers()) {
        $('#oCid').append(`<option value="${c.getCustomerCID()}">${c.getCustomerCID()}</option>`);

    }

}


$('#oCid').change(function () {
    if ($('#oCid').val() !== '-1') {

        const selectedItem = searchCustomer($('#oCid').val());
        $('#customerName').val(selectedItem.getCustomerFName());
        $('#states').val(selectedItem.getCustomerState());
        $('#oAddress').val(selectedItem.getCustomerAddress());
    } else {

    }
});

function GetTodayDate() {
    var tdate = new Date();
    var dd = tdate.getDate(); //yields day
    var MM = tdate.getMonth(); //yields month
    var yyyy = tdate.getFullYear(); //yields year
    var currentDate = dd + "-" + (MM + 1) + "-" + yyyy;

    // return currentDate;

    $("#orderDate").val(currentDate);
}

function makeTotal() {
    let subTotal = $('#subTotal').text();
    let total = $('#total').text();
    let main = Number(total) + Number(subTotal);
    $('#total').text(main);
}

$('#btnSubmitOrder').click(function () {

    let total = $('#total').text();
    let cash = $('#txtCash').val();
    let discount = $('#txtDiscount').val();
    if (discount == 0) {
        let balance = cash - total;
        $('#txtBalance').val(balance);
    } else {
        let discountPrice = total / 100 * discount;
        let totalWithDiscount = total - discountPrice;
        let balance = cash - totalWithDiscount;
        $('#txtBalance').val(balance);
    }
    OrderIDAutoMake();

});

function OrderIDAutoMake() {
    try {
            let lastOID = orderTable[orderTable.length-1].getOID();
            let newOID = parseInt(lastOID.substring(1,4))+1;
            if (newOID < 10){
                $('#orderId').val("O00"+newOID);
            }else if(newOID < 100){
                $('#orderId').val("O0"+newOID);
            }else {
                $('#orderId').val("O"+newOID);
            }
        }catch (e) {
            $('#orderId').val("O001");
        }



}

function printOrder() {
    $('#secondHeader').css('display','none');
    $('#btnPrintOrder').css('display','none')
    $('#btnSubmitOrder').css('display','none');
    $('#btnAdd').css('display','none');
    $('#orderFormCustomerForm').css('display','none');
    $('#orderFormItemForm').css('display','none');
    window.print();
    $('#secondHeader').css('display','block');
}

$('#btnPrintOrder').click(function () {
    printOrder();
});


