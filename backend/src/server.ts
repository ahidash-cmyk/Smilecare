import "dotenv/config";
import app from "./app";
import { startAppointmentReminder } from "./jobs/appointmentReminder";
import statsRoutes from "./routes/statsRoutes";
import contactRoutes from "./routes/contactRoutes";
startAppointmentReminder();
app.use("/api/stats", statsRoutes);
app.use("/api/contact", contactRoutes);

const PORT = 3000;
  
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  
});