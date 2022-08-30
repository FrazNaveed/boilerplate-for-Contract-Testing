const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Doodles", function () {
  let Doodles, doodlesContract, owner, addr1, addr2, addr3, addrs;

  // this will run before each test
  beforeEach(async function () {
    Doodles = await ethers.getContractFactory("Doodles");
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
    doodlesContract = await Doodles.deploy();
  });

  describe("Deploymenet", () => {
    it("Should set the right owner", async () => {
      expect(await doodlesContract.owner()).to.equal(owner.address);
    });
  });

  // describe.only
  // when you want to run only this tets
  describe("setAllowListActive", async () => {
    // can also do it.only
    it("Should be reverted because caller is not owner", async () => {
      await expect(
        doodlesContract.connect(addr1).setIsAllowListActive(true)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    it("Should set allowlist only by owner", async () => {
      let expectedValue = true;
      expect(
        doodlesContract.connect(owner).setIsAllowListActive(expectedValue)
      );
      expect(await doodlesContract.isAllowListActive()).to.equal(expectedValue);
    });
  });
});
