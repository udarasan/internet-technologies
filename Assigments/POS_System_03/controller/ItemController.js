$('#saveItem').click(function () {
    let itemID = $('#itemID').val();
    let itemName = $('#itemName').val();
    let itemQTY = $('#itemQTY').val();
    let itemPrice = $('#price').val();

    let res = saveAllItem(itemID, itemName, itemQTY, itemPrice);

    clearAllItem();
    ItemIDAutoMake();
});

/*Delete Item*/
$('#deleteItem').click(function (itemID) {

    let iID = $("#itemID").val();
    let option = confirm(`Do you want to delete ID:${itemID}`);
    if (option) {
        let res = deleteItem(iID);
        if (res) {
            alert("Customer Deleted");
        } else {
            alert("Delete Failed")
        }

    }

    loadAllItemToTheTable();
    clearAllItem();
});

/*Update Item*/
$('#updateItem').click(function () {

    let itemID = $('#itemID').val();
    let itemName = $('#itemName').val();
    let itemQTY = $('#itemQTY').val();
    let itemPrice = $('#price').val();

    let option = confirm(`Do you want to Update Customer ID:${itemID}`);
    if (option) {
        let res = updateItem(itemID, itemName, itemQTY, itemPrice);
        if (res) {
            alert("Customer Updated");
        } else {
            alert("Update Failed");
        }
    }
    loadAllItemToTheTable();
    clearAllItem();
});

/*Search Item*/
$('#searchItem').click(function (itemID) {
    for (var i in itemTable) {
        if (itemTable[i].getItemID() == itemID) return itemTable[i];
    }
    return null;
});

$('#clearItem').click(function () {
    clearAllItem();
})

function saveAllItem(itemID, itemName, itemQTY, itemPrice) {
    let item = new ItemDTO(itemID, itemName, itemQTY, itemPrice);
    itemTable.push(item);
    loadAllItemToTheTable();
    return true;

}

function getAllItem() {
    return itemTable;

}

function searchItem(itemID) {
    for (var i in itemTable) {
        if (itemTable[i].getItemID() == itemID)

            return itemTable[i];
    }
    return null;
}

function deleteItem(itemID) {
    let item = searchItem(itemID);
    if (item != null) {
        let indexNumber = itemTable.indexOf(item);
        itemTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

function loadAllItemToTheTable() {
    let allItems = getAllItem();
    $('#tblItem>tbody').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allItems) {
        let itemID = allItems[i].getItemID();
        let itemName = allItems[i].getItemName();
        let itemQTY = allItems[i].getItemQTY();
        let itemPrice = allItems[i].getItemPrice();

        var row = `<tr><td>${itemID}</td><td>${itemName}</td><td>${itemQTY}</td><td>${itemPrice}</td></tr>`;
        $('#tblItem>tbody').append(row);
    }
}

function updateItem(itemID, itemName, itemQTY, itemPrice) {
    let item = searchItem(itemID);
    if (item != null) {
        item.setItemName(itemName)
        item.setItemQTY(itemQTY)
        item.setItemPrice(itemPrice);
        return true;
    } else {
        return false;
    }
}

function clearAllItem() {
    $('#itemID').val("");
    $('#itemName').val("");
    $('#itemQTY').val("");
    $('#price').val("");

}
$("#searchItem").click(function () {

    let item = searchItem($('#itemID').val());
    if (item != null) {
        $("#itemID").val(item.getItemID());
        $("#itemName").val(item.getItemName());
        $("#itemQTY").val(item.getItemQTY());
        $("#price").val(item.getItemPrice());
    } else {
        clearAllItem();
    }

});

let itemIDRegEx=/^(I00)[0-9]{1,3}$/;
let itemNameRegEx=/^[A-z]{1,100}$/;
let itemQTYRegEx=/^[0-9]{1,100}$/;
let itemPriceRegEx=/^[0-9]{1,200}$/;

$('#itemID').on('keyup',function (event) {
    let inputID=$("#itemID").val();
    if (itemIDRegEx.test(inputID)){
        $("#itemID").css('border','2px solid green');
        $("#lblID").text("Item ID");
    }else{
        $("#itemID").css('border','2px solid red');
        $("#lblID").text('Your Input Data Format is Wrong (I001)');
    }
});
$('#itemName').on('keyup',function (event) {
    let inputID=$("#itemName").val();
    if (itemNameRegEx.test(inputID)){
        $("#itemName").css('border','2px solid green');
        $("#lblItemName").text("Item Name");
    }else{
        $("#itemName").css('border','2px solid red');
        $("#lblItemName").text('Your Input Data Format is Wrong (Only Letters)');
    }
});
$('#itemQTY').on('keyup',function (event) {
    let inputID=$("#itemQTY").val();
    if (itemQTYRegEx.test(inputID)){
        $("#itemQTY").css('border','2px solid green');
        $("#lblItemQty").text("Item QTY");
    }else{
        $("#itemQTY").css('border','2px solid red');
        $("#lblItemQty").text('Your Input Data Format is Wrong (123)');
    }
});
$('#price').on('keyup',function (event) {
    let inputID=$("#price").val();
    if (itemPriceRegEx.test(inputID)){
        $("#price").css('border','2px solid green');
        $("#lblPrice").text("Price");
    }else{
        $("#price").css('border','2px solid red');
        $("#lblPrice").text('Your Input Data Format is Wrong (123)');
    }
});


function ItemIDAutoMake() {
    try {
        let lastID = itemTable[itemTable.length - 1].getItemID();
        let newID = parseInt(lastID.substring(1, 4)) + 1;
        if (newID < 10) {
            $('#itemID').val("I00" + newID);
        } else if (newID < 100) {
            $('#itemID').val("O0" + newID);
        } else {
            $('#itemID').val("O" + newID);
        }
    } catch (e) {
        $('#itemID').val("I001");
    }


}
