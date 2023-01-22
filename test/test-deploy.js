const {ethers} = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
const {expect, assert} = require("chai");

describe("SimpleStorage", function(){
    let simpleStorageFactory,SimpleStorage;
    beforeEach(async function(){
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        SimpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should start with  a favorite number of 0",async function() {
        const currentValue = await SimpleStorage.retrieve();
        const expectedValue = "0";
        // assert.equal(currentValue.toString(), expectedValue);
        expect(currentValue.toString()).to.equal(expectedValue);
    })

    it("Should update when we call store", async function(){
        const expectedValue = "7";
        const transactionResponse = await SimpleStorage.store(expectedValue);
        await transactionResponse.wait(1);

        const currentValue = await SimpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    })
});