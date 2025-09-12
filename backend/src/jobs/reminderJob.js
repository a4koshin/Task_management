import cron from "node-cron";
import taskModal from "../model/taskModal.js";
import userModel from "../model/userModel.js";
import { sendEmail } from "../config/mailer.js";

cron.schedule("* * * *", async () => {
  console.log(" ⏰ Checking deadlines...");
  // Get current date and time
  const now = new Date();
  const next24hrs = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  // Find tasks with deadlines within the next 24 hours and not yet notified
  try {
    const tasks = await taskModal
      .find({
        deadline: { $gte: now, $lte: next24hrs },
        status: { $ne: "completed" },
        notified: false,
      })
      .populate("User", "name email");
    // Send reminder emails
    for (const task of tasks) {
      const user = task.user;
      if (!user || !user.email) continue;

      await sendEmail({
        to: user.email,
        subject: `Reminder: Task ${task.title} is due soon`,
        text: `Hello ${user.name},\n\n Your task ${
          task.title
        } is due on ${task.deadline.toLocaleString()}.Please make sure to complete it on time. \n\nBest regards ,\nTaskEdge Team`,
      });
      // Mark task as notified
      task.notified = true;
      await task.save();
    }
  } catch (error) {
    console.error("Reminder job error:", error);
  }
});
