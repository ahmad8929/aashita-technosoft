/* eslint-disable no-unused-vars */
import { Button, Card, Col, Grid, Input, Row } from "antd";
import React, { useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { isDeviceType } from "../../../../utils/common";
import { postWithOutTokenAPI } from "../../../../utils";
import { VERIFY_OTP, REGISTER } from "../../../../constants/api"; // Add the appropriate API endpoint
import { displayMessage } from "../../../../utils/common";
import { SUCCESS_MSG_TYPE, ERROR_MSG_TYPE } from "../../../../constants/dataKeys";

const { useBreakpoint } = Grid;

const SendOTP = () => {
    const [otp, setOtp] = useState("");
    const location = useLocation();
    const { phoneNumber } = location.state || {};
    const navigate = useNavigate();
    const screens = useBreakpoint();

    const handleOTPChange = (e) => {
        setOtp(e.target.value);
    };

    const verifyOTP = async () => {
        const apiParams = {
            phoneNumber: phoneNumber,
            otp: otp,
        };

        const successFn = () => {
            displayMessage(SUCCESS_MSG_TYPE, "OTP verified successfully");
            navigate("/dashboard"); // Navigate to dashboard or another page on success
        };

        const errorFn = (error) => {
            Object.values(error).map((item) => displayMessage(ERROR_MSG_TYPE, item));
        };

        await postWithOutTokenAPI(VERIFY_OTP, apiParams, successFn, errorFn);
    };

    return (
        <div style={{ minHeight: `${isDeviceType(screens, ["Mobile"]) ? "0px" : "100vh"}` }}>
            <Card
                style={{
                    padding: "20px",
                    width: "100%",
                    maxWidth: "700px",
                    margin: `${isDeviceType(screens, ["Mobile"]) ? "0px" : "100px auto"}`,
                    minHeight: `${isDeviceType(screens, ["Mobile"]) ? "100vh" : "0"}`
                }}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <h2 style={{
                            fontSize: `${isDeviceType(screens, ["Mobile"]) ? "18px" : "32px"}`,
                            margin: 0,
                            textAlign: "center"
                        }}>
                            We&apos;ve sent a code to <span>{phoneNumber}</span>
                        </h2>
                        <p style={{
                            fontSize: `${isDeviceType(screens, ["Mobile"]) ? "16px" : "38px"}`,
                            textAlign: "center",
                            marginTop: "0"
                        }}>Verify your phone number to finish signing up</p>
                    </Col>
                </Row>
                <Row gutter={16} style={{ textAlign: "center" }}>
                    <Col span={24}>
                        <Input maxLength={6} value={otp} onChange={handleOTPChange} />
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: "16px", justifyContent: "center" }}>
                    <Col span={18}>
                        <Button
                            type="primary"
                            onClick={verifyOTP}
                            block
                            style={{
                                borderRadius: `${isDeviceType(screens, ["Mobile"]) ? "19px" : "14px"}`,
                                padding: `${isDeviceType(screens, ["Mobile"]) ? "10px" : "20px"}`,
                                fontSize: `${isDeviceType(screens, ["Mobile"]) ? "15px" : "18px"}`
                            }}
                        >
                            Confirm
                        </Button>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: "16px", justifyContent: "center" }}>
                    <Col xs={24} sm={12} md={10} lg={10}
                        style={{ marginBottom: `${isDeviceType(screens, ["Mobile"]) ? "10px" : "0px"}` }}>
                        <Button block style={{ borderRadius: "14px", color: "#ddd", fontWeight: "500" }}>
                            <AiOutlineReload /> Can send in 11s
                        </Button>
                    </Col>
                    <Col xs={24} sm={12} md={10} lg={10}>
                        <Button block style={{ borderRadius: "14px", color: "#ddd", fontWeight: "500" }}>
                            <MdModeEditOutline /> Use a different phone number
                        </Button>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default SendOTP;
