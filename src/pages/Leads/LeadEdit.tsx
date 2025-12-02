import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Form,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { updateLead, selectLeadById } from "../../slices/leads/lead.slice";
import { useFormik } from "formik";
import * as Yup from "yup";

const LeadEdit: React.FC = () => {
  document.title = "Edit Lead | ESRM Application";
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { id } = useParams();
  const lead = useSelector((state: any) => selectLeadById(state, id || ""));

  const initialValues = useMemo(
    () => ({
      ClientName: lead?.ClientName || "",
      ContactName: lead?.ContactName || "",
      ContactPhone: lead?.ContactPhone || "",
      ContactEmail: lead?.ContactEmail || "",
      LeadSource: lead?.LeadSource || "Website",
      ProjectName: lead?.ProjectName || "",
      ProjectType: lead?.ProjectType || "Domestic",
      EstimatedStartDate: lead?.EstimatedStartDate || "",
      EstimatedDurationWeeks: lead?.EstimatedDurationWeeks || 0,
      Status: lead?.Status || "New",
      Notes: lead?.Notes || "",
    }),
    [lead]
  );

  const validation = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      ClientName: Yup.string().required("Client name is required"),
      ProjectName: Yup.string().required("Project name is required"),
      ContactEmail: Yup.string().email("Enter a valid email").optional(),
    }),
    onSubmit: (values) => {
      const payload = { ...values, LeadId: id as string } as any;
      dispatch(updateLead(payload));
      navigate("/leads/list");
    },
  });

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Edit Lead" pageTitle="Leads" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Edit Scaffolding Lead</h5>
                <div className="d-flex gap-2">
                  <Button color="light" onClick={() => navigate("/leads/list")}>
                    Close
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => navigate("/leads/list")}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => validation.handleSubmit()}
                  >
                    Update
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                  }}
                >
                  <Row className="g-3">
                    <Col md={6}>
                      <Label className="form-label">Client Name *</Label>
                      <Input
                        name="ClientName"
                        value={validation.values.ClientName}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={
                          !!(
                            validation.touched.ClientName &&
                            validation.errors.ClientName
                          )
                        }
                      />
                      {validation.touched.ClientName &&
                        validation.errors.ClientName && (
                          <FormFeedback type="invalid">
                            {String(validation.errors.ClientName)}
                          </FormFeedback>
                        )}
                    </Col>
                    <Col md={6}>
                      <Label className="form-label">Project Name *</Label>
                      <Input
                        name="ProjectName"
                        value={validation.values.ProjectName}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={
                          !!(
                            validation.touched.ProjectName &&
                            validation.errors.ProjectName
                          )
                        }
                      />
                      {validation.touched.ProjectName &&
                        validation.errors.ProjectName && (
                          <FormFeedback type="invalid">
                            {String(validation.errors.ProjectName)}
                          </FormFeedback>
                        )}
                    </Col>

                    <Col md={4}>
                      <Label className="form-label">Contact Name</Label>
                      <Input
                        name="ContactName"
                        value={validation.values.ContactName}
                        onChange={validation.handleChange}
                      />
                    </Col>
                    <Col md={4}>
                      <Label className="form-label">Contact Phone</Label>
                      <Input
                        name="ContactPhone"
                        value={validation.values.ContactPhone}
                        onChange={validation.handleChange}
                      />
                    </Col>
                    <Col md={4}>
                      <Label className="form-label">Contact Email</Label>
                      <Input
                        name="ContactEmail"
                        value={validation.values.ContactEmail}
                        onChange={validation.handleChange}
                      />
                    </Col>

                    <Col md={4}>
                      <Label className="form-label">Lead Source</Label>
                      <Input
                        type="select"
                        name="LeadSource"
                        value={validation.values.LeadSource}
                        onChange={validation.handleChange}
                      >
                        {[
                          "Website",
                          "Referral",
                          "Returning Client",
                          "Phone",
                          "Walk-in",
                          "Other",
                        ].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </Input>
                    </Col>
                    <Col md={4}>
                      <Label className="form-label">Project Type</Label>
                      <Input
                        type="select"
                        name="ProjectType"
                        value={validation.values.ProjectType}
                        onChange={validation.handleChange}
                      >
                        {[
                          "Domestic",
                          "Commercial",
                          "Industrial",
                          "Housing",
                          "New Build",
                        ].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </Input>
                    </Col>
                    <Col md={4}>
                      <Label className="form-label">Estimated Start Date</Label>
                      <Input
                        type="date"
                        name="EstimatedStartDate"
                        value={validation.values.EstimatedStartDate}
                        onChange={validation.handleChange}
                      />
                    </Col>

                    <Col md={4}>
                      <Label className="form-label">
                        Estimated Duration (weeks)
                      </Label>
                      <Input
                        type="number"
                        name="EstimatedDurationWeeks"
                        value={validation.values.EstimatedDurationWeeks}
                        onChange={validation.handleChange}
                      />
                    </Col>
                    <Col md={4}>
                      <Label className="form-label">Status</Label>
                      <Input
                        type="select"
                        name="Status"
                        value={validation.values.Status}
                        onChange={validation.handleChange}
                      >
                        {[
                          "New",
                          "Contacted",
                          "Quoted",
                          "In Progress",
                          "Pending Approval",
                          "Won",
                          "Lost",
                          "On Hold",
                          "Archived",
                        ].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </Input>
                    </Col>

                    <Col md={12}>
                      <Label className="form-label">Notes</Label>
                      <Input
                        type="textarea"
                        rows={3}
                        name="Notes"
                        value={validation.values.Notes}
                        onChange={validation.handleChange}
                      />
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LeadEdit;
