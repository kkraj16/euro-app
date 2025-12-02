import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Spinner,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";

const SiteEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockSites = [
    {
      id: 1,
      clientId: "1",
      name: "ABC Main Office",
      address: "123 Business St, New York, NY 10001",
      contactName: "John Smith",
      contactPhone: "+1234567890",
      notes: "Main headquarters office",
      status: "Active",
    },
    {
      id: 2,
      clientId: "1",
      name: "ABC Warehouse",
      address: "456 Industrial Ave, Brooklyn, NY 11201",
      contactName: "Jane Doe",
      contactPhone: "+1234567891",
      notes: "Storage facility",
      status: "Active",
    },
  ];

  const site = mockSites.find((s) => s.id === Number(id));

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [id]);

  const clientOptions = [
    {
      options: [
        { label: "ABC Corporation", value: "1" },
        { label: "XYZ Industries", value: "2" },
        { label: "Tech Solutions", value: "3" },
      ],
    },
  ];

  const statusOptions = [
    {
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
    },
  ];

  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (site && site.id) || "",
      clientId: (site && site.clientId) || "",
      name: (site && site.name) || "",
      address: (site && site.address) || "",
      contactName: (site && site.contactName) || "",
      contactPhone: (site && site.contactPhone) || "",
      notes: (site && site.notes) || "",
      status: (site && site.status) || "Active",
    },
    validationSchema: Yup.object({
      clientId: Yup.string().required("Please select client"),
      name: Yup.string().required("Please enter site name"),
      address: Yup.string(),
      contactName: Yup.string(),
      contactPhone: Yup.string(),
      notes: Yup.string(),
      status: Yup.string().required("Please select status"),
    }),
    onSubmit: (values) => {
      console.log("Site Updated:", values);
      toast.success("Site updated successfully", { autoClose: 3000 });
      setTimeout(() => {
        navigate("/clients/sites");
      }, 1000);
    },
  });

  const handleCancel = () => {
    navigate("/clients/sites");
  };

  document.title = "Edit Site | Velzon - React Admin & Dashboard Template";

  if (loading) {
    return (
      <div className="page-content">
        <Container fluid>
          <div className="py-4 text-center">
            <Spinner color="primary" />
            <div className="mt-2">Loading site...</div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Edit Site" pageTitle="Sites" />
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
                    <h5 className="card-title mb-0">Edit Site</h5>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md={6}>
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
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="name">
                            Site Name <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter site name"
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
                    </Row>

                    <Row>
                      <Col md={12}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="address">
                            Address
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="Enter address"
                            name="address"
                            value={validation.values.address || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.address &&
                              validation.touched.address
                                ? true
                                : false
                            }
                          />
                          {validation.errors.address &&
                          validation.touched.address ? (
                            <FormFeedback type="invalid">
                              {validation.errors.address}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="contactName">
                            Contact Name
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="contactName"
                            placeholder="Enter contact name"
                            name="contactName"
                            value={validation.values.contactName || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.contactName &&
                              validation.touched.contactName
                                ? true
                                : false
                            }
                          />
                          {validation.errors.contactName &&
                          validation.touched.contactName ? (
                            <FormFeedback type="invalid">
                              {validation.errors.contactName}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="contactPhone">
                            Contact Phone
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="contactPhone"
                            placeholder="Enter contact phone"
                            name="contactPhone"
                            value={validation.values.contactPhone || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.contactPhone &&
                              validation.touched.contactPhone
                                ? true
                                : false
                            }
                          />
                          {validation.errors.contactPhone &&
                          validation.touched.contactPhone ? (
                            <FormFeedback type="invalid">
                              {validation.errors.contactPhone}
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

                    <Row>
                      <Col md={6}>
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

                    <div className="text-end">
                      <Button type="submit" color="success" className="me-2">
                        <i className="ri-save-line align-middle me-1"></i>
                        Update Site
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

export default SiteEdit;
