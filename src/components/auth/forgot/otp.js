import React, { useState } from "react";
import { Button, Card, Col, Row, Input, Grid, Form, Typography, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { isDeviceType, displayMessage } from "../../../../utils/common";
import { postAPI } from "../../../../utils";
import { SUCCESS_MSG_TYPE, ERROR_MSG_TYPE } from "../../../../constants/dataKeys";
import { RESEND_OTP_API, RESET_PASSWORD_API } from "../../../../constants/api";

const { useBreakpoint } = Grid;

const OTPVerification = () => {
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const location = useLocation();
    const { contactInfo } = location.state || {};
    const navigate = useNavigate();
    const screens = useBreakpoint();
    const [form] = Form.useForm();

    // Handle OTP verification and password reset
    const onOTPSubmit = async (values) => {
        setLoading(true);
        const apiParams = {
            user_id: contactInfo,
            otp: values.otp,
            password: values.password,
        };

        const successFn = () => {
            setLoading(false);
            displayMessage(SUCCESS_MSG_TYPE, "Password reset successfully.");
            navigate("/login");
        };

        const errorFn = () => {
            setLoading(false);
            displayMessage(ERROR_MSG_TYPE, "Failed to reset password. Please try again.");
        };

        await postAPI(RESET_PASSWORD_API, apiParams, successFn, errorFn);
    };

    // Handle Resend OTP
    const resendOTP = async () => {
        setResendLoading(true);
        const apiParams = { user_id: contactInfo };

        const successFn = () => {
            setResendLoading(false);
            displayMessage(SUCCESS_MSG_TYPE, "OTP resent successfully.");
        };

        const errorFn = () => {
            setResendLoading(false);
            displayMessage(ERROR_MSG_TYPE, "Failed to resend OTP. Please try again.");
        };

        await postAPI(RESEND_OTP_API, apiParams, successFn, errorFn);
    };

    const fieldStyle = { marginBottom: "16px" };

    return (
        <div style={{ minHeight: `${isDeviceType(screens, ["Mobile"]) ? "0px" : "100vh"}` }}>
            <Spin spinning={loading}>
                <Card
                    style={{
                        padding: "20px",
                        width: "100%",
                        maxWidth: "500px",
                        margin: `${isDeviceType(screens, ["Mobile"]) ? "0px" : "150px auto"}`,
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Typography.Title level={isDeviceType(screens, ["Mobile"]) ? 5 : 3} style={{ textAlign: "center" }}>
                                We&apos;ve sent a code to <span>{contactInfo}</span>
                            </Typography.Title>
                            <Typography.Text style={{ textAlign: "center", display: "block", marginBottom: "20px" }}>
                                Verify your account and reset your password to continue.
                            </Typography.Text>
                        </Col>
                    </Row>
                    <Form form={form} onFinish={onOTPSubmit} layout="vertical">
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="otp"
                                    rules={[{ required: true, message: "Please enter the OTP" }]}
                                    style={fieldStyle}
                                >
                                    <Input maxLength={6} size="large" placeholder="Enter OTP" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        { required: true, message: "Please enter a password!" },
                                        {
                                            min: 8,
                                            message: "Password must be at least 8 characters long!",
                                        },
                                        {
                                            pattern:
                                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message:
                                                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!",
                                        },
                                    ]}
                                    style={fieldStyle}
                                >
                                    <Input.Password
                                        size="large"
                                        iconRender={(visible) =>
                                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                        }
                                        style={{
                                            width: "100%",
                                            padding: `${isDeviceType(screens, ["Mobile"]) ? "4px 11px" : "7px 11px"}`,
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    label="Confirm Password"
                                    name="confirm_password"
                                    dependencies={["password"]}
                                    rules={[
                                        { required: true, message: "Please confirm your password!" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("password") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error("The two passwords do not match!"));
                                            },
                                        }),
                                    ]}
                                    style={fieldStyle}
                                >
                                    <Input.Password
                                        size="large"
                                        style={{
                                            width: "100%",
                                            padding: `${isDeviceType(screens, ["Mobile"]) ? "4px 11px" : "7px 11px"}`,
                                        }}
                                        iconRender={(visible) =>
                                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginTop: "16px", justifyContent: "center" }}>
                            <Col span={18}>
                                <Button
                                    type="primary"
                                    block
                                    size="large"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Confirm OTP & Reset Password
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row gutter={16} style={{ marginTop: "16px", justifyContent: "center" }}>
                        <Col xs={24} sm={12}>
                            <Button block onClick={resendOTP} loading={resendLoading}>
                                Resend OTP
                                <ReloadOutlined />
                            </Button>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Button block onClick={() => navigate("/forgot-password")}>
                                Use a different contact
                                <EditOutlined />
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Spin>
        </div>
    );
};

export default OTPVerification;
