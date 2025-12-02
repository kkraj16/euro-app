import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Alert,
  Spinner,
  FormGroup,
} from "reactstrap";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import logoLight from "../../assets/images/logo-light.png";
import { createSelector } from "reselect";
import { verifyOtp, resendOtp } from "../../slices/thunks";

const OtpVerification = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const selectOtpState = (state: any) => state;
  const otpPageData = createSelector(selectOtpState, (state) => ({
    sessionToken: state.Otp.sessionToken,
    userEmail: state.Otp.userEmail,
    otpLoading: state.Otp.otpLoading,
    otpError: state.Otp.otpError,
    otpExpiry: state.Otp.otpExpiry,
    otpSent: state.Otp.otpSent,
  }));

  const { sessionToken, userEmail, otpLoading, otpError, otpExpiry, otpSent } =
    useSelector(otpPageData);

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  // Timer for OTP expiry
  useEffect(() => {
    if (!otpExpiry) return;

    const timer = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((otpExpiry - Date.now()) / 1000)
      );
      setTimeLeft(remaining);

      if (remaining === 0) {
        setCanResend(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [otpExpiry]);

  // Redirect if no session token (user didn't complete Step 1)
  useEffect(() => {
    if (!sessionToken && !otpSent) {
      navigate("/login");
    }
  }, [sessionToken, otpSent, navigate]);

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      return;
    }

    if (!sessionToken) return;

    dispatch(verifyOtp(sessionToken, otp, navigate));
  };

  const handleResendOtp = () => {
    if (!sessionToken) return;

    dispatch(resendOtp(sessionToken));
    setCanResend(false);
    setTimeLeft(300);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  document.title = "OTP Verification | ESRM Application";

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <img src={logoLight} alt="" height="20" />
                  </div>
                  <p className="mt-3 fs-15 fw-medium">Verify Your Identity</p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Two-Step Verification</h5>
                      <p className="text-muted text-truncate">
                        We've sent a 6-digit OTP to <strong>{userEmail}</strong>
                      </p>
                    </div>

                    {otpError && <Alert color="danger">{otpError}</Alert>}

                    <div className="p-2 mt-4">
                      <FormGroup>
                        <Label className="form-label">
                          Enter OTP <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="000000"
                          maxLength={6}
                          value={otp}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            setOtp(value.slice(0, 6));
                          }}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                            if (e.key === "Enter" && otp.length === 6) {
                              handleVerifyOtp();
                            }
                          }}
                          className="text-center"
                          style={{ fontSize: "24px", letterSpacing: "8px" }}
                          autoComplete="off"
                        />
                        <small className="text-muted d-block mt-2">
                          For demo: Use 123456 or check browser console for
                          generated OTP
                        </small>
                      </FormGroup>

                      <div className="text-center mt-3 mb-3">
                        <Button
                          color="success"
                          className="btn btn-success w-100"
                          onClick={handleVerifyOtp}
                          disabled={
                            otpLoading || otp.length !== 6 || timeLeft === 0
                          }
                        >
                          {otpLoading && (
                            <Spinner size="sm" className="me-2">
                              {" "}
                              Loading...{" "}
                            </Spinner>
                          )}
                          Verify OTP
                        </Button>
                      </div>

                      <div className="text-center">
                        <p className="text-muted mb-2">
                          {timeLeft > 0 ? (
                            <>
                              OTP expires in:{" "}
                              <span className="fw-bold text-danger">
                                {formatTime(timeLeft)}
                              </span>
                            </>
                          ) : (
                            <span className="text-danger">OTP Expired</span>
                          )}
                        </p>

                        <p className="text-muted">
                          Didn't receive the OTP?{" "}
                          <Button
                            color="link"
                            className="p-0"
                            onClick={handleResendOtp}
                            disabled={!canResend || otpLoading}
                          >
                            Resend OTP
                          </Button>
                        </p>
                      </div>

                      <div className="mt-4 text-center">
                        <Button
                          color="secondary"
                          outline
                          className="w-100"
                          onClick={() => navigate("/login")}
                          disabled={otpLoading}
                        >
                          Back to Login
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default OtpVerification;
