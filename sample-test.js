const { ethers } = require("hardhat");

const { expect } = req ("chai");

describe("NFTmarket", function() {
    it("Should create and execute market sales", async function () {
        const Market = await ethers.getContractFactory("NFTmarket")
        const market = await Market.deploy()
        await market.deployed()
        const marketAddress = market.address 

        const NFT = await ethers.getContractFactory("NFT")
        const nft = await NFT.deploy(marketAddress)
        await nft.deployed()
        const nftContractAddress = nft.address

        let listingPrice = await market.getListingPrice()
        listingPrice = listingPrice.toString()

        const auctionPrice = ethers.utils.parseUnits('100', 'ether')

        await nft.createToken("https://www.mytoeknlocation.com")
        await nft.createToken("https://www.mytokenlocation2.com")

        await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
        await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })

        const [_, buyerAddress] = await ethers.getSinger()

        await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice })

        const items = await market.fetchMarketItems()

        console.log('items: ', items)             

    }); 
});
