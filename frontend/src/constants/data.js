import {
  LayoutDashboard,
  ListTodo,
  Clock,
  CheckCircle2,
  Flag,
  CalendarDays,
  User,
  ClockAlert,
} from "lucide-react";

export const navigation = [
  {
    id: 0,
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: 1,
    name: "Todo",
    icon: ListTodo,
    path: "/task",
  },
  {
    id: 2,
    name: "Pending",
    icon: Clock,
    path: "/pending",
  },
  {
    id: 3,
    name: "Completed",
    icon: CheckCircle2,
    path: "/completed",
  },
  {
    id: 4,
    name: "Overdue",
    icon: ClockAlert,
    path: "/overdue",
  },
  {
    id: 5,
    name: "Priority",
    icon: Flag,
    path: "/priority",
  },
  {
    id: 6,
    name: "Calendar",
    icon: CalendarDays,
    path: "/calendar",
  },
];
