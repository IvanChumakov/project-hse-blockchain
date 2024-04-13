const {expect} = require("chai"); // Mocha-framework, chai-library
const { ethers } = require("hardhat");

// basic syntax just to describe the contract name you can write any name over here.
describe("Token contract", function () {

 let owner;
 let Token;
 let hardhatToken;

 beforeEach(async () => {
  [owner, ...otherAccount] = await ethers.getSigners(); 
  Token = await ethers.getContractFactory("MyContract"); 
  hardhatToken = await Token.deploy(); 
 });

 describe('Deployment', () => {
  it('Address is not zero', async function () {
    expect(hardhatToken.address).not.equal(0);
  });
  
  it('Right owner', async () => {
    expect(await hardhatToken.owner()).to.equal(owner.address);
  })
 });

 describe('Setting new message', () => {
  it("Initial message", async () => {
    expect(await hardhatToken.getMessage()).to.equal("Initial message");
  })

  it("Literal message", async () => {
    await hardhatToken.setMessage('abc');
    expect(await hardhatToken.getMessage()).to.equal('abc');
  })

  it("Number message", async () => {
    await hardhatToken.setMessage('123');
    expect(await hardhatToken.getMessage()).to.equal('123');
  })

 });
 describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
  it("Should transfer tokens between accounts", async function() {
    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(otherAccount[0].address, 50);
    expect(await hardhatToken.balanceOf(otherAccount[0].address)).to.equal(50);

    // Transfer 50 tokens from otherAccount[0] to otherAccount[1]
    await hardhatToken.connect(otherAccount[0]).transfer(otherAccount[1].address, 50);
    expect(await hardhatToken.balanceOf(otherAccount[1].address)).to.equal(50);
  });
});

});