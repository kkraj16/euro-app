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
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";

const ContactCreate = () => {
  const navigate = useNavigate();

  const clientOptions = [
    {
      options: [
        { label: "ABC Corporation", value: "1" },
        { label: "XYZ Industries", value: "2" },
        { label: "Tech Solutions", value: "3" },
      ],
    },
  ];

  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      clientId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      notes: "",
    },
    validationSchema: Yup.object({
      clientId: Yup.string().required("Please select client"),
      firstName: Yup.string().required("Please enter first name"),
      lastName: Yup.string().required("Please enter last name"),
      email: Yup.string()
        .email("Please enter valid email")
        .required("Please enter email"),
      phone: Yup.string(),
      role: Yup.string(),
      notes: Yup.string(),
    }),
    onSubmit: (values) => {
      console.log("Contact Created:", values);
      toast.success("Contact created successfully", { autoClose: 3000 });
      setTimeout(() => {
        navigate("/clients/contacts");
      }, 1000);
    },
  });

  const handleCancel = () => {
    navigate("/clients/contacts");
  };

  document.title = "Create Contact | Velzon - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Create Contact" pageTitle="Contacts" />
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
                    <h5 className="card-title mb-0">Add New Contact</h5>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md={12}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="clientId">
                            Client <span className="text-danger">*</span>
                          </Label>
                          <Select
                            value={
                              clientOptions[0]?.options.find(
                                (option: any) =>
                                  option.value === validation.values.clientId
                              ) || null
                            }
                            onChange={(selectedOption: any) => {
                              validation.setFieldValue(
                                "clientId",
                                selectedOption?.value || ""
                              );
                            }}
                            options={clientOptions}
                            name="clientId"
                            placeholder="Select client"
                            classNamePrefix="select2-selection form-select"
                          />
                          {validation.errors.clientId &&
                          validation.touched.clientId ? (
                            <div className="invalid-feedback d-block">
                              {validation.errors.clientId}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="firstName">
                            First Name <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="Enter first name"
                            name="firstName"
                            value={validation.values.firstName || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.firstName &&
                              validation.touched.firstName
                                ? true
                                : false
                            }
                          />
                          {validation.errors.firstName &&
                          validation.touched.firstName ? (
                            <FormFeedback type="invalid">
                              {validation.errors.firstName}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="lastName">
                            Last Name <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="Enter last name"
                            name="lastName"
                            value={validation.values.lastName || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.lastName &&
                              validation.touched.lastName
                                ? true
                                : false
                            }
                          />
                          {validation.errors.lastName &&
                          validation.touched.lastName ? (
                            <FormFeedback type="invalid">
                              {validation.errors.lastName}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="email">
                            Email <span className="text-danger">*</span>
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
                      <Col md={12}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="role">
                            Role
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="role"
                            placeholder="Enter role"
                            name="role"
                            value={validation.values.role || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.role && validation.touched.role
                                ? true
                                : false
                            }
                          />
                          {validation.errors.role && validation.touched.role ? (
                            <FormFeedback type="invalid">
                              {validation.errors.role}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="notes">
                            Notes
                          </Label>
                          <Input
                            type="textarea"
                            className="form-control"
                            id="notes"
                            placeholder="Enter notes"
                            name="notes"
                            rows={3}
                            value={validation.values.notes || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.notes &&
                              validation.touched.notes
                                ? true
                                : false
                            }
                          />
                          {validation.errors.notes &&
                          validation.touched.notes ? (
                            <FormFeedback type="invalid">
                              {validation.errors.notes}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <div className="text-end">
                      <Button type="submit" color="success" className="me-2">
                        <i className="ri-save-line align-middle me-1"></i>
                        Save Contact
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

export default ContactCreate;
