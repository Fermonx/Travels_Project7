module.exports = function Carrito(initItems){
  this.items = initItems.items;
  this.cantidad = initItems.cantidad;
  this.precioTotal = initItems.precioTotal;

  this.add = function(item,id)
  {
    var storedItem = this.item[id];
    if(!storedItem)
    {
        storedItem = this.item[id] = {item: item, cant: 0, total: 0};
    }
    storedItem.cant++;
    storedItem.total = storedItem.item.total * storedItem.cant;
    this.cantidad++;
    this.precioTotal += storedItem.total;
  }

  this.generateArray = function()
  {
    var arr = [];
    for(var id in this.items){
        arr.push(this.items[id]);
    }
    return arr;
  };
};