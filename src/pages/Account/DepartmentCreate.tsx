import React, { useEffect } from "react";
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
import { addNewDepartment } from "../../slices/departments/thunk";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";
import Select from "react-select";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

const DepartmentCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const selectLayoutState = (state: any) => state.Departments;
  const selectDepartmentProperties = createSelector(
    selectLayoutState,
    (state) => ({
      isDepartmentCreated: state.isDepartmentCreated,
    })
  );

  const { isDepartmentCreated } = useSelector(selectDepartmentProperties);

  const statusOptions = [
    {
      options: [
        { label: "Published", value: "Published" },
        { label: "Draft", value: "Draft" },
        { label: "Scheduled", value: "Scheduled" },
      ],
    },
  ];

  useEffect(() => {
    if (isDepartmentCreated) {
      navigate("/account/departments");
    }
  }, [isDepartmentCreated, navigate]);

  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      code: "",
      description: "",
      status: "Published",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter department name"),
      code: Yup.string()
        .required("Please enter department code")
        .min(2, "Code must be at least 2 characters")
        .max(10, "Code must not exceed 10 characters"),
      description: Yup.string(),
      status: Yup.string().required("Please select status"),
    }),
    onSubmit: (values) => {
      dispatch(addNewDepartment(values));
      validation.resetForm();
    },
  });

  const handleCancel = () => {
    navigate("/account/departments");
  };

  document.title =
    "Create Department | Velzon - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Create Department" pageTitle="Departments" />
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
                    <h5 className="card-title mb-0">Add New Department</h5>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="name">
                            Department Name{" "}
                            <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter department name"
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
                          <Label className="form-label" htmlFor="code">
                            Department Code{" "}
                            <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="code"
                            placeholder="Enter department code (e.g., HR, IT)"
                            name="code"
                            value={validation.values.code || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.code && validation.touched.code
                                ? true
                                : false
                            }
                          />
                          {validation.errors.code && validation.touched.code ? (
                            <FormFeedback type="invalid">
                              {validation.errors.code}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="description">
                            Description
                          </Label>
                          <Input
                            type="textarea"
                            className="form-control"
                            id="description"
                            placeholder="Enter department description"
                            name="description"
                            rows={3}
                            value={validation.values.description || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                          />
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
                              (option) =>
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
                        Create Department
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

export default DepartmentCreate;
