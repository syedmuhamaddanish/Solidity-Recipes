pragma solidity ^0.8.0;

contract contractApi {
    struct Product {
        uint256 id;
        string name;
        uint256 price;
        uint256 quantity;
    }
    address owner;

    Product public removeMe; 

    mapping (uint256 => Product) public products;
    Product[] public productArray;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function setProduct (uint256 _id, string memory _name, uint256 _price, uint256 _quantity) public onlyOwner {
        Product memory product = Product(_id, _name, _price, _quantity);
        products[_id] = product; 
        productArray.push(Product(_id, _name, _price, _quantity));
    }

    function getProduct (uint256 _id) public view returns (string memory, uint256, uint256) {
        require(products[_id].id !=0 , "Product is not available");
        Product memory product = products[_id];
        return (product.name, product.price, product.quantity);
    }

    function getAllProducts() public view returns (Product[] memory){
        return productArray;
    }

    function updateProduct(uint256 _id, string memory _name, uint256 _price, uint256 _quantity) public onlyOwner {
        require(products[_id].id !=0 , "Product is not available");
        deleteProduct(_id);
        products[_id] = Product(_id, _name, _price, _quantity);
        productArray.push(Product(_id, _name, _price, _quantity));
    }

    function deleteProduct(uint256 _id) public onlyOwner {
        require(products[_id].id !=0 , "Product is not available");
        delete products[_id];
        for (uint i = 0; i < productArray.length; i++) {
            if (productArray[i].id == _id) {
                removeMe = productArray[i];
                productArray[i] = productArray[productArray.length-1];
                productArray[productArray.length - 1] = removeMe;
            }
        }
        productArray.pop();
    }

}