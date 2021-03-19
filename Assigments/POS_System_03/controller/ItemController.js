$('#saveItem').click(function () {
    let itemID = $('#itemID').val();
    let itemName = $('#itemName').val();
    let itemQTY = $('#itemQTY').val();
    let itemPrice = $('#price').val();

    let res = saveAllItem(itemID, itemName, itemQTY, itemPrice);

    clearAllItem();

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
