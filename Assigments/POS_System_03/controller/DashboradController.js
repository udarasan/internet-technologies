hideAll();

function hideAll() {
    $('#index,#customer,#item,#order').css('display', 'none');

}

$('#btnIndex').click(function () {
    hideAll();
    $('#index').css('display', 'block');
});
$('#btnCustomer').click(function () {
    hideAll();
    CustomerIDAutoMake();
    $('#customer').css('display', 'block');
});
$('#btnItem').click(function () {
    hideAll();
    ItemIDAutoMake();
    $('#item').css('display', 'block');
});
$('#btnOrder').click(function () {
    hideAll();
    //Date Generator
    $('#oCid').empty();
    loadCustomerID();
    $('#inputItem').empty();
    loadItemID();
    GetTodayDate();
    OrderIDAutoMake();


    $('#order').css('display', 'block');
    /* $('#orderId').val('OID000');*/

});



