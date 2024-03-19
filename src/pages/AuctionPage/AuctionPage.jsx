import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosClient } from "src/axios/AxiosClient";
import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";

export const AuctionPage = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axiosClient.get("/Auction/GetAllAuction");
        setAuctions(response.data);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div style={{ margin: "100px 0" }}>
      <h2>All Auctions</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {auctions.map((auction) => (
          <div
            key={auction.id}
            style={{ flex: "0 0 33.33%", maxWidth: "33.33%", padding: "10px" }}
          >
            <Card
              style={{
                border: "1px solid #ccc",
                borderRadius: 5,
                backgroundColor: "rgb(255, 192, 203)",
              }}
            >
              <CardHeader className="font-weight-bold">
                {auction.auction_Name}
              </CardHeader>

              <CardBody>
                <CardTitle tag="h5"></CardTitle>
                <CardText>
                  <p>
                    {/* Start Day: {new Date(auction.startDay).toLocaleDateString()} */}
                  </p>
                  <h4 class="font-weight-bold">
                    {auction.product.product_Name}
                  </h4>
                  <p>
                    Auction Day:{" "}
                    {new Date(auction.auctionDay).toLocaleDateString()}
                  </p>
                  <p>Deposit Money: ${auction.deposit_Money}</p>
                  {/* <p>Status: {auction.status}</p> */}
                  {/* <p>Password: {auction.password}</p> */}
                </CardText>
                <div>
                  {/* <h4>Product Information</h4> */}
                  {/* <p>ISBN: {auction.product.isbn}</p> */}
                  <p>Description: {auction.product.product_Description}</p>
                  <p>Reserve Price: ${auction.product.product_Price}</p>
                  {/* <p>Type: {auction.product.type}</p> */}
                  <p>
                    {/* Status: {auction.product.status ? "Active" : "Inactive"} */}
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
