pragma solidity 0.5.16;

// bytes4 needs asii entry, and also quoted, as in "0x42434520" for BCE

contract stockmkt {
    
    struct stock{
        uint price;
        uint volume;
    }
    mapping(bytes4 => stock) stockQuote;
    
    
    address oracleOwner;
    
// set the value of a stock    
    function setStock(bytes4 symbol, uint price, uint volume) public {
        stock memory newStock = stock(price, volume);
        stockQuote[symbol] = newStock;
 
    }
    
// get the value of a stock
    function getStockPrice (bytes4 symbol) public view returns (uint) {
        return stockQuote[symbol].price;
    }

    
// get the value of volume traded
    function getStockVolume (bytes4 symbol) public view returns (uint) {
       return stockQuote[symbol].volume;        
    }
    
}
