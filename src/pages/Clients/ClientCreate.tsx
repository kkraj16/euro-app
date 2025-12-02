import React from "react";
import { useNavigate } from "react-router-dom";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";

const ClientCreate = () => {
  const navigate = useNavigate();

  const statusOptions = [
    {
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
        { label: "Pending", value: "Pending" },
      ],
    },
  ];

  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      companyNumber: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postcode: "",
      country: "",
      paymentTerms: "",
      complianceCheckFee: "",
      status: "Active",
      logo: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter client name"),
      companyNumber: Yup.string().required("Please enter company number"),
      email: Yup.string().email("Please enter valid email"),
      phone: Yup.string(),
      addressLine1: Yup.string(),
      addressLine2: Yup.string(),
      city: Yup.string(),
      postcode: Yup.string(),
      country: Yup.string(),
      paymentTerms: Yup.number().typeError("Must be a number"),
      complianceCheckFee: Yup.number().typeError(
        "Must be a valid decimal number"
      ),
      status: Yup.string().required("Please select status"),
    }),
    onSubmit: (values) => {
      console.log("Client Created:", values);
      toast.success("Client created successfully", { autoClose: 3000 });
      setTimeout(() => {
        navigate("/clients");
      }, 1000);
    },
  });

  const handleCancel = () => {
    navigate("/clients");
  };

  document.title = "Create Client | Velzon - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Create Client" pageTitle="Clients" />
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
                    <h5 className="card-title mb-0">Add New Client</h5>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="name">
                            Name <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter client name"
                            name="name"
                            value={validation.values.name || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.name && validation.touched.name
                                ? true
                                : false
                            }
                          />
                          {validation.errors.name && validation.touched.name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="companyNumber">
                            Company Number{" "}
                            <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="companyNumber"
                            placeholder="Enter company number"
                            name="companyNumber"
                            value={validation.values.companyNumber || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.companyNumber &&
                              validation.touched.companyNumber
                                ? true
                                : false
                            }
                          />
                          {validation.errors.companyNumber &&
                          validation.touched.companyNumber ? (
                            <FormFeedback type="invalid">
                              {validation.errors.companyNumber}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="email">
                            Email
                          </Label>
                          <Input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            name="email"
                            value={validation.values.email || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.email &&
                              validation.touched.email
                                ? true
                                : false
                            }
                          />
                          {validation.errors.email &&
                          validation.touched.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="phone">
                            Phone
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="phone"
                            placeholder="Enter phone number"
                            name="phone"
                            value={validation.values.phone || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.phone &&
                              validation.touched.phone
                                ? true
                                : false
                            }
                          />
                          {validation.errors.phone &&
                          validation.touched.phone ? (
                            <FormFeedback type="invalid">
                              {validation.errors.phone}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="addressLine1">
                            Address Line 1
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="addressLine1"
                            placeholder="Enter address line 1"
                            name="addressLine1"
                            value={validation.values.addressLine1 || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.addressLine1 &&
                              validation.touched.addressLine1
                                ? true
                                : false
                            }
                          />
                          {validation.errors.addressLine1 &&
                          validation.touched.addressLine1 ? (
                            <FormFeedback type="invalid">
                              {validation.errors.addressLine1}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="addressLine2">
                            Address Line 2
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="addressLine2"
                            placeholder="Enter address line 2"
                            name="addressLine2"
                            value={validation.values.addressLine2 || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.addressLine2 &&
                              validation.touched.addressLine2
                                ? true
                                : false
                            }
                          />
                          {validation.errors.addressLine2 &&
                          validation.touched.addressLine2 ? (
                            <FormFeedback type="invalid">
                              {validation.errors.addressLine2}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="city">
                            City
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="city"
                            placeholder="Enter city"
                            name="city"
                            value={validation.values.city || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.city && validation.touched.city
                                ? true
                                : false
                            }
                          />
                          {validation.errors.city && validation.touched.city ? (
                            <FormFeedback type="invalid">
                              {validation.errors.city}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="postcode">
                            Postcode
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="postcode"
                            placeholder="Enter postcode"
                            name="postcode"
                            value={validation.values.postcode || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.postcode &&
                              validation.touched.postcode
                                ? true
                                : false
                            }
                          />
                          {validation.errors.postcode &&
                          validation.touched.postcode ? (
                            <FormFeedback type="invalid">
                              {validation.errors.postcode}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="country">
                            Country
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="country"
                            placeholder="Enter country"
                            name="country"
                            value={validation.values.country || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.country &&
                              validation.touched.country
                                ? true
                                : false
                            }
                          />
                          {validation.errors.country &&
                          validation.touched.country ? (
                            <FormFeedback type="invalid">
                              {validation.errors.country}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="paymentTerms">
                            Payment Terms (Days)
                          </Label>
                          <Input
                            type="number"
                            className="form-control"
                            id="paymentTerms"
                            placeholder="Enter payment terms"
                            name="paymentTerms"
                            value={validation.values.paymentTerms || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.paymentTerms &&
                              validation.touched.paymentTerms
                                ? true
                                : false
                            }
                          />
                          {validation.errors.paymentTerms &&
                          validation.touched.paymentTerms ? (
                            <FormFeedback type="invalid">
                              {validation.errors.paymentTerms}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="complianceCheckFee"
                          >
                            Compliance Check Fee
                          </Label>
                          <Input
                            type="number"
                            step="0.01"
                            className="form-control"
                            id="complianceCheckFee"
                            placeholder="Enter compliance check fee"
                            name="complianceCheckFee"
                            value={validation.values.complianceCheckFee || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.complianceCheckFee &&
                              validation.touched.complianceCheckFee
                                ? true
                                : false
                            }
                          />
                          {validation.errors.complianceCheckFee &&
                          validation.touched.complianceCheckFee ? (
                            <FormFeedback type="invalid">
                              {validation.errors.complianceCheckFee}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="status">
                            Status <span className="text-danger">*</span>
                          </Label>
                          <Select
                            value={statusOptions[0].options.find(
                              (option: any) =>
                                option.value === validation.values.status
                            )}
                            onChange={(selectedOption: any) => {
                              validation.setFieldValue(
                                "status",
                                selectedOption.value
                              );
                            }}
                            options={statusOptions}
                            name="status"
                            classNamePrefix="select2-selection form-select"
                          />
                          {validation.errors.status &&
                          validation.touched.status ? (
                            <div className="invalid-feedback d-block">
                              {validation.errors.status}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="logo">
                            Logo Upload
                          </Label>
                          <Input
                            type="file"
                            className="form-control"
                            id="logo"
                            name="logo"
                            accept="image/*"
                            onChange={(e: any) => {
                              validation.setFieldValue(
                                "logo",
                                e.target.files[0]
                              );
                            }}
                          />
                        </div>
                      </Col>
                    </Row>

                    <div className="text-end">
                      <Button type="submit" color="success" className="me-2">
                        <i className="ri-save-line align-middle me-1"></i>
                        Save Client
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

export default ClientCreate;
