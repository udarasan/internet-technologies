function OrderDTO(oid,orderDate,customerName,cusCID,states,address,itemCode, iName, itemPrice, QTY,total) {
    var __OID=oid;
    var __orderDate=orderDate;
    var __customerName=customerName;
    var __cusCID=cusCID;
    var __states=states;
    var __address=address;
    var __itemCode = itemCode;
    var __INames = iName;
    var __itemPrice = itemPrice;
    var __QTY = QTY;
    var __total=total;

    this.getOID = function () {
        return __OID;
    }
    this.getOrderDate = function () {
        return __orderDate;
    }

    this.getCustomerName = function () {
        return __customerName;
    }
    this.getCusCID = function () {
        return __cusCID;
    }
    this.getStates = function () {
        return __states;
    }
    this.getAddress = function () {
        return __address;
    }
    this.getItemCode = function () {
        return __itemCode;
    }
    this.getINames = function () {
        return __INames;
    }
    this.getIPrice = function () {
        return __itemPrice;
    }
    this.getOrderQTY = function () {
        return __QTY;
    }
    this.getTotal = function () {
        return __total;
    }

    this.setOID = function (newOID) {
        __OID=newOID;
    }
    this.setOrderDate = function (newOrderDate) {
        __orderDate=newOrderDate;
    }

    this.setCustomerName = function (newCustomerName) {
        __customerName=newCustomerName;
    }
    this.setCustomerCID = function (newCusCID) {
        __cusCID=newCusCID;
    }
    this.setStates = function (newStates) {
        __states=newStates;
    }
    this.setAddress = function (newAddress) {
        __address=newAddress;
    };
    this.setItemCode = function (newItemCode) {
         __itemCode=newItemCode;
    }
    this.setINames = function (newINames) {
         __INames=newINames;
    }
    this.setIPrice = function (newItemPrice) {
         __itemPrice=newItemPrice;
    }
    this.setOrderQTY = function (newQTY) {
         __QTY=newQTY;
    }
    this.setTotal = function (newTotal) {
         __total=newTotal;
    }

}
