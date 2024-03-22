// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { axiosClient } from "src/axios/AxiosClient";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   CardText,
//   Row,
//   Col,
// } from "reactstrap";

// export const AuctionPage = () => {
//   const [auctions, setAuctions] = useState([]);

//   useEffect(() => {
//     const fetchAuctions = async () => {
//       try {
//         const response = await axiosClient.get("/Auction/GetAllAuction");
//         setAuctions(response.data);
//       } catch (error) {
//         console.error("Error fetching auctions:", error);
//       }
//     };

//     fetchAuctions();
//   }, []);

//   return (
//     <div style={{ margin: "100px 0" }}>
//       <h2>All Active Auctions</h2>
//       <div style={{ display: "flex", flexWrap: "wrap" }}>
//         {auctions.map(
//           (auction) =>
//             // Check if the auction status is active
//             auction.status === "ACTIVE" && (
//               <div
//                 key={auction.id}
//                 style={{
//                   flex: "0 0 33.33%",
//                   maxWidth: "33.33%",
//                   padding: "10px",
//                 }}
//               >
//                 <Card
//                   style={{
//                     border: "1px solid #ccc",
//                     borderRadius: 5,
//                     backgroundColor: "rgb(255, 192, 203)",
//                   }}
//                 >
//                   <CardHeader className="font-weight-bold">
//                     {auction.auction_Name}
//                   </CardHeader>
//                   <Row>
//                     <Col sm="6">
//                       <img
//                         src={auction.product.image}
//                         alt={auction.product.product_Name}
//                         style={{ width: "100%" }}
//                       />
//                     </Col>
//                     <Col sm="6">
//                       <CardBody>
//                         <CardTitle tag="h5"></CardTitle>
//                         <CardText>
//                           <p>
//                             {/* Start Day: {new Date(auction.startDay).toLocaleDateString()} */}
//                           </p>
//                           <h4 className="font-weight-bold">
//                             {auction.product.product_Name}
//                           </h4>
//                           <p>
//                             Auction Day:{" "}
//                             {new Date(auction.auctionDay).toLocaleDateString()}
//                           </p>
//                           <p>Deposit Money: ${auction.deposit_Money}</p>
//                         </CardText>
//                         <div>
//                           <p>
//                             Description: {auction.product.product_Description}
//                           </p>
//                           <p>Reserve Price: ${auction.product.product_Price}</p>
//                         </div>
//                       </CardBody>
//                     </Col>
//                   </Row>
//                 </Card>
//               </div>
//             )
//         )}
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosClient } from "src/axios/AxiosClient";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup,
} from "reactstrap";
import { useSelector } from "react-redux";

const AuctionPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState("");
  const accountLoggedIn = useSelector((state) => state.account.loggedIn);
  const userId = accountLoggedIn.id;
  const toggle = () => setModal(!modal);

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

  const handleEnterRoom = (auction) => {
    setSelectedAuction(auction);
    toggle();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEnterAuction = async () => {
    try {
      await axios.post(
        `https://localhost:7022/api/Auction/EnterAuction?userId=${userId}&auctionId=${selectedAuction.id}&pass=${password}`
      );
      // Redirect to Auction Room page after successful entry
      window.location.href = "/auction-room";
    } catch (error) {
      console.error("Error entering auction:", error);
      // Handle error appropriately
    }
  };

  return (
    <div style={{ margin: "100px 0" }}>
      <h2>All Active Auctions</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {auctions.map(
          (auction) =>
            auction.status === "ACTIVE" && (
              <div
                key={auction.id}
                style={{
                  flex: "0 0 33.33%",
                  maxWidth: "33.33%",
                  padding: "10px",
                }}
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
                  <Row>
                    <Col sm="6">
                      <img
                        src={auction.product.image}
                        alt={auction.product.product_Name}
                        style={{ width: "100%" }}
                      />
                    </Col>
                    <Col sm="6">
                      <CardBody>
                        <CardTitle tag="h5"></CardTitle>
                        <CardText>
                          <p>
                            {/* Start Day: {new Date(auction.startDay).toLocaleDateString()} */}
                          </p>
                          <h4 className="font-weight-bold">
                            {auction.product.product_Name}
                          </h4>
                          <p>
                            Auction Day:{" "}
                            {new Date(auction.auctionDay).toLocaleDateString()}
                          </p>
                          <p>Deposit Money: ${auction.deposit_Money}</p>
                        </CardText>
                        <div>
                          <p>
                            Description: {auction.product.product_Description}
                          </p>
                          <p>Reserve Price: ${auction.product.product_Price}</p>
                        </div>
                        <Button onClick={() => handleEnterRoom(auction)}>
                          Enter Room
                        </Button>
                      </CardBody>
                    </Col>
                  </Row>
                </Card>
              </div>
            )
        )}
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Enter Auction Room</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="password">Password:</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEnterAuction}>
            Enter
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AuctionPage;
