import { NextResponse } from "next/server";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  clearNotifications,
  updateNotificationSettings,
  getDatabase,
} from "@/lib/server-db";

export async function GET() {
  try {
    const db = getDatabase();
    const notifications = getNotifications();
    return NextResponse.json({
      success: true,
      notifications,
      settings: db.notificationSettings,
      unreadCount: notifications.filter((n) => !n.read).length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { action, id, settings, author } = body;

    if (action === "mark_read" && id) {
      markNotificationRead(id);
      return NextResponse.json({ success: true, message: "Marked as read" });
    }

    if (action === "mark_all_read") {
      markAllNotificationsRead();
      return NextResponse.json({ success: true, message: "All notifications marked as read" });
    }

    if (action === "update_settings" && settings) {
      const updated = updateNotificationSettings(settings, author || "Admin (Kapadwanj)");
      return NextResponse.json({ success: true, settings: updated });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update notification" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    clearNotifications();
    return NextResponse.json({ success: true, message: "Notifications cleared" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to clear notifications" },
      { status: 500 }
    );
  }
}
