const SHA256= require('crypto-js/SHA256')

class Block {
    constructor(index,timestamp,data, previousHash =''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + 
            JSON.stringify(this.data)+ this.nonce).toString();
    }
    
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty)!==  Array(difficulty +1 ).join("0"))
        {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}



class Blockchain{
    
    constructor(){
        
        this.chain = [this.createGenesisBlock];
        this.difficulty = 4 ;
    }

    createGenesisBlock(){
        return new Block(0,"5/21/2021","Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    
    isChainValid(){
        for(let i = 1; i<this.chain.length; i++)
        {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let lefterisCoin = new Blockchain();
    console.log('Mining block 1...');
    lefterisCoin.addBlock(new Block(1,"22/05/2021", {    amount : 4}));
    console.log('Mining block 2...');
    lefterisCoin.addBlock(new Block(2,"23/05/2021", {    amount : 10}));
    console.log('Mining block 3...');
    lefterisCoin.addBlock(new Block(3,"24/05/2021", {    amount : 12}));

        
    // console.log(JSON.stringify(lefterisCoin, null , 4 ));
    // console.log(lefterisCoin.isChainValid());

    // lefterisCoin.chain[1].data = {amount: 200};
    // lefterisCoin.chain[1].hash = lefterisCoin.chain[1].calculateHash();
    // console.log(lefterisCoin.isChainValid());
    // console.log(JSON.stringify(lefterisCoin, null , 4 ));