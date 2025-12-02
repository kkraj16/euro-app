import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Badge,
  Table,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Loader from "../../Components/Common/Loader";
import { getMeetingById, deleteMeeting } from "../../slices/thunks";

const MeetingView: React.FC = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { meeting } = useSelector((state: any) => state.Meetings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getMeetingById(Number(id)));
    setTimeout(() => setLoading(false), 500);
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this meeting?")) {
      dispatch(deleteMeeting(Number(id)));
      setTimeout(() => {
        navigate("/meetings/list");
      }, 1000);
    }
  };

  if (loading || !meeting) {
    return <Loader />;
  }

  document.title = `${meeting.title} | ESRM Application`;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "info";
      case "In Progress":
        return "warning";
      case "Completed":
        return "success";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "secondary";
    }
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "Virtual":
        return "ri-video-line";
      case "In-Person":
        return "ri-map-pin-line";
      case "Hybrid":
        return "ri-global-line";
      default:
        return "ri-map-pin-line";
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Meeting Details" pageTitle="Meetings" />

        <Row>
          <Col lg={8}>
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">{meeting.title}</h5>
                  <div className="d-flex gap-2">
                    <Badge
                      color={getStatusColor(meeting.status)}
                      className="fs-12"
                    >
                      {meeting.status}
                    </Badge>
                    <Badge
                      color={getPriorityColor(meeting.priority)}
                      className="fs-12"
                    >
                      {meeting.priority} Priority
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="mb-4">
                  <h6 className="text-muted mb-3">Meeting Information</h6>
                  <Table borderless className="mb-0">
                    <tbody>
                      <tr>
                        <td className="fw-semibold" style={{ width: "200px" }}>
                          <i className="ri-building-line align-middle me-2 text-muted"></i>
                          Client:
                        </td>
                        <td>{meeting.clientName}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">
                          <i className="ri-calendar-event-line align-middle me-2 text-muted"></i>
                          Meeting Type:
                        </td>
                        <td>{meeting.meetingType}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">
                          <i className="ri-calendar-line align-middle me-2 text-muted"></i>
                          Date:
                        </td>
                        <td>
                          {new Date(meeting.meetingDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">
                          <i className="ri-time-line align-middle me-2 text-muted"></i>
                          Time:
                        </td>
                        <td>
                          {meeting.meetingTime}
                          {meeting.endTime && ` - ${meeting.endTime}`} (
                          {meeting.duration} minutes)
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">
                          <i
                            className={`${getLocationIcon(
                              meeting.locationType
                            )} align-middle me-2 text-muted`}
                          ></i>
                          Location:
                        </td>
                        <td>
                          {meeting.location}
                          <Badge color="light" className="ms-2">
                            {meeting.locationType}
                          </Badge>
                        </td>
                      </tr>
                      {meeting.meetingLink && (
                        <tr>
                          <td className="fw-semibold">
                            <i className="ri-link align-middle me-2 text-muted"></i>
                            Meeting Link:
                          </td>
                          <td>
                            <a
                              href={meeting.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary"
                            >
                              {meeting.meetingLink}
                              <i className="ri-external-link-line ms-1"></i>
                            </a>
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="fw-semibold">
                          <i className="ri-user-line align-middle me-2 text-muted"></i>
                          Organizer:
                        </td>
                        <td>{meeting.organizer}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <div className="mb-4">
                  <h6 className="text-muted mb-3">
                    <i className="ri-team-line align-middle me-2"></i>
                    Attendees ({meeting.attendees?.length || 0})
                  </h6>
                  {meeting.attendees && meeting.attendees.length > 0 ? (
                    <div className="d-flex flex-wrap gap-2">
                      {meeting.attendees.map(
                        (attendee: string, index: number) => (
                          <Badge
                            key={index}
                            color="light"
                            className="fs-13 px-3 py-2"
                          >
                            <i className="ri-user-3-line align-middle me-1"></i>
                            {attendee}
                          </Badge>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-muted">No attendees listed</p>
                  )}
                </div>

                <div className="mb-4">
                  <h6 className="text-muted mb-3">
                    <i className="ri-file-text-line align-middle me-2"></i>
                    Agenda
                  </h6>
                  <p className="mb-0">{meeting.agenda}</p>
                </div>

                {meeting.notes && (
                  <div className="mb-3">
                    <h6 className="text-muted mb-3">
                      <i className="ri-sticky-note-line align-middle me-2"></i>
                      Notes
                    </h6>
                    <p className="mb-0">{meeting.notes}</p>
                  </div>
                )}

                <div className="d-flex gap-2 mt-4">
                  <Button
                    color="light"
                    onClick={() => navigate("/meetings/list")}
                  >
                    <i className="ri-arrow-left-line align-bottom me-1"></i>
                    Back to List
                  </Button>
                  {meeting.status !== "Completed" &&
                    meeting.status !== "Cancelled" && (
                      <>
                        <Button
                          color="primary"
                          onClick={() =>
                            navigate(`/meetings/edit/${meeting.id}`)
                          }
                        >
                          <i className="ri-pencil-line align-bottom me-1"></i>
                          Edit
                        </Button>
                        <Button color="danger" outline onClick={handleDelete}>
                          <i className="ri-delete-bin-line align-bottom me-1"></i>
                          Delete
                        </Button>
                      </>
                    )}
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col lg={4}>
            <Card>
              <CardHeader>
                <h6 className="card-title mb-0">Meeting Details</h6>
              </CardHeader>
              <CardBody>
                <div className="mb-3">
                  <p className="text-muted mb-1 fs-13">Status</p>
                  <Badge
                    color={getStatusColor(meeting.status)}
                    className="fs-12"
                  >
                    {meeting.status}
                  </Badge>
                </div>

                <div className="mb-3">
                  <p className="text-muted mb-1 fs-13">Priority</p>
                  <Badge
                    color={getPriorityColor(meeting.priority)}
                    className="fs-12"
                  >
                    {meeting.priority}
                  </Badge>
                </div>

                <div className="mb-3">
                  <p className="text-muted mb-1 fs-13">Reminders</p>
                  <Badge
                    color={meeting.reminders ? "success" : "secondary"}
                    className="fs-12"
                  >
                    {meeting.reminders ? "Enabled" : "Disabled"}
                  </Badge>
                </div>

                {meeting.createdAt && (
                  <div className="mb-3">
                    <p className="text-muted mb-1 fs-13">Created</p>
                    <p className="mb-0 fs-13">
                      {new Date(meeting.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {meeting.updatedAt && (
                  <div className="mb-3">
                    <p className="text-muted mb-1 fs-13">Last Updated</p>
                    <p className="mb-0 fs-13">
                      {new Date(meeting.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h6 className="card-title mb-0">Quick Actions</h6>
              </CardHeader>
              <CardBody>
                <div className="d-grid gap-2">
                  {meeting.meetingLink && (
                    <Button
                      color="success"
                      outline
                      onClick={() => window.open(meeting.meetingLink, "_blank")}
                    >
                      <i className="ri-video-line align-bottom me-1"></i>
                      Join Meeting
                    </Button>
                  )}
                  <Button
                    color="info"
                    outline
                    onClick={() => navigate("/meetings/calendar")}
                  >
                    <i className="ri-calendar-line align-bottom me-1"></i>
                    View Calendar
                  </Button>
                  <Button
                    color="secondary"
                    outline
                    onClick={() => navigate("/meetings/create")}
                  >
                    <i className="ri-add-line align-bottom me-1"></i>
                    Schedule New
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MeetingView;
