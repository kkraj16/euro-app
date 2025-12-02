import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
  getTenantRentalConfig,
  updateTenantRentalConfig,
} from "../../slices/tenantRentalConfig/thunk";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";
import Loader from "../../Components/Common/Loader";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

const TenantRentalConfigForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const selectLayoutState = (state: any) => state.TenantRentalConfig;
  const selectConfigProperties = createSelector(selectLayoutState, (state) => ({
    config: state.config,
    error: state.error,
  }));

  const { config, error } = useSelector(selectConfigProperties);

  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    dispatch(getTenantRentalConfig());
  }, [dispatch]);

  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      gracePeriodEnabled: config?.gracePeriodEnabled || false,
      gracePeriodDays: config?.gracePeriodDays || 0,
      minimumHireEnabled: config?.minimumHireEnabled || false,
      minimumHireWeeks: config?.minimumHireWeeks || 0,
      includeWeekends: config?.includeWeekends || false,
      excludePublicHolidays: config?.excludePublicHolidays || false,
      notifyOnOverdue: config?.notifyOnOverdue || false,
      offHireReminderDays: config?.offHireReminderDays || 0,
    },
    validationSchema: Yup.object({
      gracePeriodDays: Yup.number().when("gracePeriodEnabled", {
        is: true,
        then: (schema) =>
          schema
            .required("Please enter grace period days")
            .min(1, "Must be at least 1 day"),
      }),
      minimumHireWeeks: Yup.number().when("minimumHireEnabled", {
        is: true,
        then: (schema) =>
          schema
            .required("Please enter minimum hire weeks")
            .min(1, "Must be at least 1 week"),
      }),
      offHireReminderDays: Yup.number()
        .required("Please enter off-hire reminder days")
        .min(0, "Must be 0 or greater"),
    }),
    onSubmit: (values) => {
      const updatedData = {
        ...config,
        ...values,
      };
      dispatch(updateTenantRentalConfig(updatedData));
      setIsUpdated(true);
    },
  });

  useEffect(() => {
    if (isUpdated) {
      setTimeout(() => {
        navigate("/settings/system-config");
      }, 1000);
    }
  }, [isUpdated, navigate]);

  const handleCancel = () => {
    navigate("/settings/system-config");
  };

  const handleClose = () => {
    navigate("/settings/system-config");
  };

  document.title =
    "Tenant Rental Configuration | Velzon - React Admin & Dashboard Template";

  if (!config) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="Tenant Rental Configuration"
            pageTitle="Settings"
          />
          <Row>
            <Col lg={12}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Card>
                  <CardHeader>
                    <div className="d-flex align-items-center">
                      <h5 className="card-title mb-0 flex-grow-1">
                        Rental Configuration Settings
                      </h5>
                      <div className="flex-shrink-0">
                        <Button
                          color="light"
                          size="sm"
                          onClick={handleClose}
                          className="me-1"
                        >
                          <i className="ri-close-line align-middle me-1"></i>
                          Close
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md={12}>
                        <h6 className="mb-3 text-primary">
                          Grace Period Settings
                        </h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <div className="form-check form-switch">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="gracePeriodEnabled"
                              name="gracePeriodEnabled"
                              checked={validation.values.gracePeriodEnabled}
                              onChange={validation.handleChange}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="gracePeriodEnabled"
                            >
                              Enable Grace Period
                            </Label>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="gracePeriodDays"
                          >
                            Grace Period Days
                            {validation.values.gracePeriodEnabled && (
                              <span className="text-danger">*</span>
                            )}
                          </Label>
                          <Input
                            type="number"
                            className="form-control"
                            id="gracePeriodDays"
                            placeholder="Enter grace period days"
                            name="gracePeriodDays"
                            disabled={!validation.values.gracePeriodEnabled}
                            value={validation.values.gracePeriodDays || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.gracePeriodDays &&
                              validation.touched.gracePeriodDays
                                ? true
                                : false
                            }
                          />
                          {validation.errors.gracePeriodDays &&
                          validation.touched.gracePeriodDays ? (
                            <FormFeedback type="invalid">
                              {validation.errors.gracePeriodDays}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <h6 className="mb-3 text-primary">
                          Minimum Hire Settings
                        </h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <div className="form-check form-switch">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="minimumHireEnabled"
                              name="minimumHireEnabled"
                              checked={validation.values.minimumHireEnabled}
                              onChange={validation.handleChange}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="minimumHireEnabled"
                            >
                              Enable Minimum Hire Period
                            </Label>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="minimumHireWeeks"
                          >
                            Minimum Hire Weeks
                            {validation.values.minimumHireEnabled && (
                              <span className="text-danger">*</span>
                            )}
                          </Label>
                          <Input
                            type="number"
                            className="form-control"
                            id="minimumHireWeeks"
                            placeholder="Enter minimum hire weeks"
                            name="minimumHireWeeks"
                            disabled={!validation.values.minimumHireEnabled}
                            value={validation.values.minimumHireWeeks || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.minimumHireWeeks &&
                              validation.touched.minimumHireWeeks
                                ? true
                                : false
                            }
                          />
                          {validation.errors.minimumHireWeeks &&
                          validation.touched.minimumHireWeeks ? (
                            <FormFeedback type="invalid">
                              {validation.errors.minimumHireWeeks}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <h6 className="mb-3 text-primary">Calendar Settings</h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <div className="form-check form-switch">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="includeWeekends"
                              name="includeWeekends"
                              checked={validation.values.includeWeekends}
                              onChange={validation.handleChange}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="includeWeekends"
                            >
                              Include Weekends in Rental Period
                            </Label>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <div className="form-check form-switch">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="excludePublicHolidays"
                              name="excludePublicHolidays"
                              checked={validation.values.excludePublicHolidays}
                              onChange={validation.handleChange}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="excludePublicHolidays"
                            >
                              Exclude Public Holidays from Billing
                            </Label>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <h6 className="mb-3 text-primary">
                          Notification Settings
                        </h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <div className="form-check form-switch">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="notifyOnOverdue"
                              name="notifyOnOverdue"
                              checked={validation.values.notifyOnOverdue}
                              onChange={validation.handleChange}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="notifyOnOverdue"
                            >
                              Send Notifications for Overdue Rentals
                            </Label>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="offHireReminderDays"
                          >
                            Off-Hire Reminder Days{" "}
                            <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="number"
                            className="form-control"
                            id="offHireReminderDays"
                            placeholder="Enter reminder days before off-hire"
                            name="offHireReminderDays"
                            value={validation.values.offHireReminderDays || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.offHireReminderDays &&
                              validation.touched.offHireReminderDays
                                ? true
                                : false
                            }
                          />
                          {validation.errors.offHireReminderDays &&
                          validation.touched.offHireReminderDays ? (
                            <FormFeedback type="invalid">
                              {validation.errors.offHireReminderDays}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <div className="text-end">
                      <Button type="submit" color="success" className="me-2">
                        <i className="ri-save-line align-middle me-1"></i>
                        Update Configuration
                      </Button>
                      <Button
                        type="button"
                        color="danger"
                        onClick={handleCancel}
                      >
                        <i className="ri-close-line align-middle me-1"></i>
                        Cancel
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer closeButton={false} limit={1} />
    </React.Fragment>
  );
};

export default TenantRentalConfigForm;
