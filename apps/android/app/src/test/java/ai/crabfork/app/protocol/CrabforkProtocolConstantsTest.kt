package ai.crabfork.app.protocol

import org.junit.Assert.assertEquals
import org.junit.Test

class CrabforkProtocolConstantsTest {
  @Test
  fun canvasCommandsUseStableStrings() {
    assertEquals("canvas.present", CrabforkCanvasCommand.Present.rawValue)
    assertEquals("canvas.hide", CrabforkCanvasCommand.Hide.rawValue)
    assertEquals("canvas.navigate", CrabforkCanvasCommand.Navigate.rawValue)
    assertEquals("canvas.eval", CrabforkCanvasCommand.Eval.rawValue)
    assertEquals("canvas.snapshot", CrabforkCanvasCommand.Snapshot.rawValue)
  }

  @Test
  fun a2uiCommandsUseStableStrings() {
    assertEquals("canvas.a2ui.push", CrabforkCanvasA2UICommand.Push.rawValue)
    assertEquals("canvas.a2ui.pushJSONL", CrabforkCanvasA2UICommand.PushJSONL.rawValue)
    assertEquals("canvas.a2ui.reset", CrabforkCanvasA2UICommand.Reset.rawValue)
  }

  @Test
  fun capabilitiesUseStableStrings() {
    assertEquals("canvas", CrabforkCapability.Canvas.rawValue)
    assertEquals("camera", CrabforkCapability.Camera.rawValue)
    assertEquals("voiceWake", CrabforkCapability.VoiceWake.rawValue)
    assertEquals("location", CrabforkCapability.Location.rawValue)
    assertEquals("sms", CrabforkCapability.Sms.rawValue)
    assertEquals("device", CrabforkCapability.Device.rawValue)
    assertEquals("notifications", CrabforkCapability.Notifications.rawValue)
    assertEquals("system", CrabforkCapability.System.rawValue)
    assertEquals("photos", CrabforkCapability.Photos.rawValue)
    assertEquals("contacts", CrabforkCapability.Contacts.rawValue)
    assertEquals("calendar", CrabforkCapability.Calendar.rawValue)
    assertEquals("motion", CrabforkCapability.Motion.rawValue)
    assertEquals("callLog", CrabforkCapability.CallLog.rawValue)
  }

  @Test
  fun cameraCommandsUseStableStrings() {
    assertEquals("camera.list", CrabforkCameraCommand.List.rawValue)
    assertEquals("camera.snap", CrabforkCameraCommand.Snap.rawValue)
    assertEquals("camera.clip", CrabforkCameraCommand.Clip.rawValue)
  }

  @Test
  fun notificationsCommandsUseStableStrings() {
    assertEquals("notifications.list", CrabforkNotificationsCommand.List.rawValue)
    assertEquals("notifications.actions", CrabforkNotificationsCommand.Actions.rawValue)
  }

  @Test
  fun deviceCommandsUseStableStrings() {
    assertEquals("device.status", CrabforkDeviceCommand.Status.rawValue)
    assertEquals("device.info", CrabforkDeviceCommand.Info.rawValue)
    assertEquals("device.permissions", CrabforkDeviceCommand.Permissions.rawValue)
    assertEquals("device.health", CrabforkDeviceCommand.Health.rawValue)
  }

  @Test
  fun systemCommandsUseStableStrings() {
    assertEquals("system.notify", CrabforkSystemCommand.Notify.rawValue)
  }

  @Test
  fun photosCommandsUseStableStrings() {
    assertEquals("photos.latest", CrabforkPhotosCommand.Latest.rawValue)
  }

  @Test
  fun contactsCommandsUseStableStrings() {
    assertEquals("contacts.search", CrabforkContactsCommand.Search.rawValue)
    assertEquals("contacts.add", CrabforkContactsCommand.Add.rawValue)
  }

  @Test
  fun calendarCommandsUseStableStrings() {
    assertEquals("calendar.events", CrabforkCalendarCommand.Events.rawValue)
    assertEquals("calendar.add", CrabforkCalendarCommand.Add.rawValue)
  }

  @Test
  fun motionCommandsUseStableStrings() {
    assertEquals("motion.activity", CrabforkMotionCommand.Activity.rawValue)
    assertEquals("motion.pedometer", CrabforkMotionCommand.Pedometer.rawValue)
  }

  @Test
  fun smsCommandsUseStableStrings() {
    assertEquals("sms.send", CrabforkSmsCommand.Send.rawValue)
    assertEquals("sms.search", CrabforkSmsCommand.Search.rawValue)
  }

  @Test
  fun callLogCommandsUseStableStrings() {
    assertEquals("callLog.search", CrabforkCallLogCommand.Search.rawValue)
  }

}
