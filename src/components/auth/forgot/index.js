import React, { useState } from "react";
import { Input, Button, Card, Layout, Form, Typography, Grid, Spin } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { displayMessage, isDeviceType } from "../../../../utils/common";
import { postAPI } from "../../../../utils";  // Assuming postAPI utility function is available
// import { useDispatch } from "react-redux";
import { SUCCESS_MSG_TYPE, ERROR_MSG_TYPE } from "../../../../constants/dataKeys";
import { SEND_API } from "../../../../constants/api";
const { useBreakpoint } = Grid;

const ForgotPasswordRequest = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const screens = useBreakpoint();

    const formStyle = {
        display: "flex",
        flexDirection: "column",
    };

    const fieldStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        marginBottom: "12px",
    };

    const nextButtonStyle = {
        borderRadius: "5px",
        fontWeight: "500",
        display: "block",
        width: "100%",
        height: "fit-content",
        margin: "12px 0",
        lineHeight: "40px",
    };

    const registerLinkStyle = {
        marginTop: "0px",
        fontSize: "12px",
        textAlign: "center",
    };

    const forgotLinkStyle = {
        marginTop: "0px",
        fontSize: "12px",
        textAlign: "end",
    };

    const onFinish = async (values) => {
        setLoading(true);

        const apiParams = {
            user_id: values.emailOrPhone,
        };

        const successFn = () => {
            setLoading(false);
            displayMessage(SUCCESS_MSG_TYPE, "OTP sent successfully.");
            navigate("/forgot-password/otp", { state: { contactInfo: values.emailOrPhone } });
        };

        const errorFn = () => {
            setLoading(false);
            displayMessage(ERROR_MSG_TYPE, "Failed to send OTP. Please try again.");
        };

        // Assuming postAPI is a utility function that handles API calls
        await postAPI(SEND_API, apiParams, successFn, errorFn);
    };

    return (
        <Layout className="hidden-scrollbar" style={{ height: "100vh" }}>
            <Spin spinning={loading}>
                <Card
                    bodyStyle={{ paddingTop: "12px" }}
                    style={{
                        width: "100%",
                        maxWidth: "500px",
                        padding: "20px",
                        margin: "150px auto 0 auto",
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                        border: "2px solid #ddd",
                    }}
                >
                    <Typography.Title
                        style={{ marginTop: 0, textAlign: "center" }}
                        level={isDeviceType(screens, ["Mobile", "Tablet"]) ? 5 : 2}
                    >
                        Forgot Password
                    </Typography.Title>

                    <Form form={form} style={formStyle} onFinish={onFinish} layout="vertical">
                        <Form.Item
                            name="emailOrPhone"
                            label="Email or Phone Number"
                            rules={[{ required: true, message: "Please input your email or phone number!" }]}
                            style={fieldStyle}
                        >
                            <Input size="large" style={{ width: "100%" }} />
                        </Form.Item>

                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Button type="primary" htmlType="submit" style={nextButtonStyle}>
                                Submit
                            </Button>
                        </div>
                    </Form>

                    <div style={forgotLinkStyle}>
                        <Link to="/login">Back to Login</Link>
                    </div>

                    <div style={registerLinkStyle}>
                        Don&apos;t have an account? <Link to="/register">Register</Link>
                    </div>
                </Card>
            </Spin>
        </Layout>
    );
};

export default ForgotPasswordRequest;
