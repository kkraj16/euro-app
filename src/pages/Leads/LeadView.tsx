import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  ListGroup,
  ListGroupItem,
  Input,
  Label,
  Badge,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { selectLeadById, addLeadNote } from "../../slices/leads/lead.slice";

const LeadView: React.FC = () => {
  document.title = "View Lead | ESRM Application";
  const { id } = useParams();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const lead = useSelector((state: any) => selectLeadById(state, id || ""));
  const [activeTab, setActiveTab] = useState("details");
  const [noteText, setNoteText] = useState("");

  if (!lead) {
    return (
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Card>
                <CardBody>Lead not found.</CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  const addNote = () => {
    if (!noteText.trim()) return;
    dispatch(
      addLeadNote({
        LeadId: id as string,
        note: {
          id: `N-${Date.now()}`,
          timestamp: new Date().toISOString(),
          text: noteText,
        },
      } as any)
    );
    setNoteText("");
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Lead Details" pageTitle="Leads" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">
                  {lead.ProjectName} — {lead.ClientName}
                </h5>
                <div className="d-flex gap-2">
                  <Button
                    color="secondary"
                    onClick={() => navigate(`/leads/edit/${id}`)}
                  >
                    Edit
                  </Button>
                  <Button color="light" onClick={() => navigate("/leads/list")}>
                    Back
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={activeTab === "details" ? "active" : ""}
                      onClick={() => setActiveTab("details")}
                    >
                      Details
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab === "notes" ? "active" : ""}
                      onClick={() => setActiveTab("notes")}
                    >
                      Notes & Activity
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab === "attachments" ? "active" : ""}
                      onClick={() => setActiveTab("attachments")}
                    >
                      Attachments
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab} className="mt-3">
                  <TabPane tabId="details">
                    <Row className="g-3">
                      <Col md={6}>
                        <Label className="fw-semibold">Client</Label>
                        <div>{lead.ClientName}</div>
                      </Col>
                      <Col md={6}>
                        <Label className="fw-semibold">Project</Label>
                        <div>{lead.ProjectName}</div>
                      </Col>
                      <Col md={4}>
                        <Label className="fw-semibold">Contact</Label>
                        <div>{lead.ContactName}</div>
                      </Col>
                      <Col md={4}>
                        <Label className="fw-semibold">Phone</Label>
                        <div>{lead.ContactPhone}</div>
                      </Col>
                      <Col md={4}>
                        <Label className="fw-semibold">Email</Label>
                        <div>{lead.ContactEmail}</div>
                      </Col>
                      <Col md={4}>
                        <Label className="fw-semibold">Source</Label>
                        <div>{lead.LeadSource}</div>
                      </Col>
                      <Col md={4}>
                        <Label className="fw-semibold">Type</Label>
                        <div>{lead.ProjectType}</div>
                      </Col>
                      <Col md={4}>
                        <Label className="fw-semibold">Start Date</Label>
                        <div>{lead.EstimatedStartDate}</div>
                      </Col>
                      <Col md={4}>
                        <Label className="fw-semibold">Duration (weeks)</Label>
                        <div>{lead.EstimatedDurationWeeks || "-"}</div>
                      </Col>
                      <Col md={4}>
                        <Label className="fw-semibold">Status</Label>
                        <div>
                          <Badge color="light" className="text-dark">
                            {lead.Status}
                          </Badge>
                        </div>
                      </Col>
                      <Col md={12}>
                        <Label className="fw-semibold">Notes</Label>
                        <div>{lead.Notes}</div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="notes">
                    <Row className="g-3">
                      <Col md={12}>
                        <Label className="form-label">Add Note</Label>
                        <div className="d-flex gap-2">
                          <Input
                            type="textarea"
                            rows={2}
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                          />
                          <Button color="primary" onClick={addNote}>
                            Add
                          </Button>
                        </div>
                      </Col>
                      <Col md={12}>
                        <Label className="fw-semibold">Activity</Label>
                        <ListGroup>
                          {(lead.Activity || []).length === 0 && (
                            <ListGroupItem>No notes yet.</ListGroupItem>
                          )}
                          {(lead.Activity || []).map((n: any, idx: number) => (
                            <ListGroupItem key={idx}>
                              <div className="small text-muted">
                                {new Date(n.timestamp).toLocaleString()}
                              </div>
                              <div>{n.text}</div>
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="attachments">
                    <div className="text-muted">
                      Attachment handling can be added here.
                    </div>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LeadView;
