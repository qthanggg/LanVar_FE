import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";

const { Meta } = Card;

const StaffPage = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7022/api/Auction/GetAllAuction")
      .then((response) => response.json())
      .then((data) => {
        // Lọc chỉ những phiên đấu giá có status là "WAITING"
        const filteredAuctions = data.filter(
          (auction) => auction.status === "WAITING"
        );
        setAuctions(filteredAuctions);
      })
      .catch((error) => {
        console.error("Error fetching auctions:", error);
      });
  }, []);

  const handleAcceptAuction = async (auctionId) => {
    try {
      const response = await fetch(
        `https://localhost:7022/api/Auction/AcceptAuction/${auctionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Xử lý khi accept auction thành công
        console.log("Auction accepted successfully.");
        // Cập nhật lại danh sách đấu giá sau khi accept thành công
        const updatedAuctions = auctions.filter(
          (auction) => auction.id !== auctionId
        );
        setAuctions(updatedAuctions);
      } else {
        console.error("Failed to accept auction.");
        console.log(auctionId);
      }
    } catch (error) {
      console.error("Error accepting auction:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {auctions.map((auction) => (
        <Card
          key={auction.id}
          style={{ width: 300, margin: "16px" }}
          actions={[
            <Button
              type="primary"
              onClick={() => handleAcceptAuction(auction.id)}
            >
              Accept Auction
            </Button>,
          ]}
        >
          <img
            src={auction.product.image}
            alt="Product"
            style={{ width: "250px", height: "250px" }}
          />
          <Meta
            title={`Product Name: ${auction.product.product_Name}`}
            description={
              <>
                <p>Description: {auction.product.product_Description}</p>
                <p>Start Day: {auction.startDay}</p>
                <p>Auction Day: {auction.auctionDay}</p>
              </>
            }
          />
        </Card>
      ))}
    </div>
  );
};

export default StaffPage;
