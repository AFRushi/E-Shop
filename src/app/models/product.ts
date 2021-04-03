export class Product {

    id : number;
    name : string;
    description : string;
    price : number;
    imageUrl : string;

    constructor(id ,  name='', description = '', price= 0, imageUrl = 'https://im.whatshot.in/img/2020/May/header-725x420-delhi-flower-valleys-d-1589910435.jpg'){

    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    }
}
