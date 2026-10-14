import { useNavigate } from "react-router-dom";
import { api } from "../api";
import TicketForm from "../components/TicketForm";

export default function AddTicket() {
  const navigate = useNavigate();

  async function handleCreate(values) {
    await api.create(values);
    navigate("/tickets");
  }

  return (
    <>
      <h1>Add ticket</h1>
      <TicketForm
        submitLabel="Create ticket"
        onSubmit={handleCreate}
        onCancel={() => navigate("/tickets")}
      />
    </>
  );
}
