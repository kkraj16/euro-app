import React from "react";
import { Card, CardBody, Badge } from "reactstrap";
import { Link } from "react-router-dom";

interface MeetingCardProps {
  meeting: {
    id: number;
    title: string;
    clientName: string;
    meetingDate: string;
    meetingTime: string;
    duration: number;
    location: string;
    locationType: "In-Person" | "Virtual" | "Hybrid";
    status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
    meetingType: string;
    priority: "High" | "Medium" | "Low";
    attendees: string[];
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({
  meeting,
  onEdit,
  onDelete,
}) => {
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
    <Card className="border card-border-primary">
      <CardBody>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="flex-grow-1">
            <Link to={`/meetings/view/${meeting.id}`} className="text-dark">
              <h5 className="card-title mb-1">{meeting.title}</h5>
            </Link>
            <p className="text-muted mb-2">
              <i className="ri-building-line align-middle me-1"></i>
              {meeting.clientName}
            </p>
          </div>
          <div className="d-flex gap-1">
            <Badge color={getStatusColor(meeting.status)} className="fs-11">
              {meeting.status}
            </Badge>
            <Badge color={getPriorityColor(meeting.priority)} className="fs-11">
              {meeting.priority}
            </Badge>
          </div>
        </div>

        <div className="mb-2">
          <div className="text-muted mb-1">
            <i className="ri-calendar-line align-middle me-1"></i>
            {new Date(meeting.meetingDate).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="text-muted mb-1">
            <i className="ri-time-line align-middle me-1"></i>
            {meeting.meetingTime} ({meeting.duration} mins)
          </div>
          <div className="text-muted mb-1">
            <i
              className={`${getLocationIcon(
                meeting.locationType
              )} align-middle me-1`}
            ></i>
            {meeting.location}
          </div>
        </div>

        <div className="mb-2">
          <Badge color="light" className="text-muted me-1">
            <i className="ri-user-line align-middle me-1"></i>
            {meeting.attendees.length} Attendee
            {meeting.attendees.length !== 1 ? "s" : ""}
          </Badge>
          <Badge color="light" className="text-muted">
            <i className="ri-calendar-event-line align-middle me-1"></i>
            {meeting.meetingType}
          </Badge>
        </div>

        <div className="d-flex gap-2 mt-3">
          <Link
            to={`/meetings/view/${meeting.id}`}
            className="btn btn-soft-primary btn-sm flex-grow-1"
          >
            <i className="ri-eye-line align-middle me-1"></i>
            View
          </Link>
          {onEdit && (
            <button onClick={onEdit} className="btn btn-soft-secondary btn-sm">
              <i className="ri-pencil-line"></i>
            </button>
          )}
          {onDelete && meeting.status !== "Completed" && (
            <button onClick={onDelete} className="btn btn-soft-danger btn-sm">
              <i className="ri-delete-bin-line"></i>
            </button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default MeetingCard;
