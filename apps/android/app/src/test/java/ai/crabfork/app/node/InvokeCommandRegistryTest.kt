package ai.crabfork.app.node

import ai.crabfork.app.protocol.CrabforkCalendarCommand
import ai.crabfork.app.protocol.CrabforkCameraCommand
import ai.crabfork.app.protocol.CrabforkCallLogCommand
import ai.crabfork.app.protocol.CrabforkCapability
import ai.crabfork.app.protocol.CrabforkContactsCommand
import ai.crabfork.app.protocol.CrabforkDeviceCommand
import ai.crabfork.app.protocol.CrabforkLocationCommand
import ai.crabfork.app.protocol.CrabforkMotionCommand
import ai.crabfork.app.protocol.CrabforkNotificationsCommand
import ai.crabfork.app.protocol.CrabforkPhotosCommand
import ai.crabfork.app.protocol.CrabforkSmsCommand
import ai.crabfork.app.protocol.CrabforkSystemCommand
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class InvokeCommandRegistryTest {
  private val coreCapabilities =
    setOf(
      CrabforkCapability.Canvas.rawValue,
      CrabforkCapability.Device.rawValue,
      CrabforkCapability.Notifications.rawValue,
      CrabforkCapability.System.rawValue,
      CrabforkCapability.Photos.rawValue,
      CrabforkCapability.Contacts.rawValue,
      CrabforkCapability.Calendar.rawValue,
    )

  private val optionalCapabilities =
    setOf(
      CrabforkCapability.Camera.rawValue,
      CrabforkCapability.Location.rawValue,
      CrabforkCapability.Sms.rawValue,
      CrabforkCapability.CallLog.rawValue,
      CrabforkCapability.VoiceWake.rawValue,
      CrabforkCapability.Motion.rawValue,
    )

  private val coreCommands =
    setOf(
      CrabforkDeviceCommand.Status.rawValue,
      CrabforkDeviceCommand.Info.rawValue,
      CrabforkDeviceCommand.Permissions.rawValue,
      CrabforkDeviceCommand.Health.rawValue,
      CrabforkNotificationsCommand.List.rawValue,
      CrabforkNotificationsCommand.Actions.rawValue,
      CrabforkSystemCommand.Notify.rawValue,
      CrabforkPhotosCommand.Latest.rawValue,
      CrabforkContactsCommand.Search.rawValue,
      CrabforkContactsCommand.Add.rawValue,
      CrabforkCalendarCommand.Events.rawValue,
      CrabforkCalendarCommand.Add.rawValue,
    )

  private val optionalCommands =
    setOf(
      CrabforkCameraCommand.Snap.rawValue,
      CrabforkCameraCommand.Clip.rawValue,
      CrabforkCameraCommand.List.rawValue,
      CrabforkLocationCommand.Get.rawValue,
      CrabforkMotionCommand.Activity.rawValue,
      CrabforkMotionCommand.Pedometer.rawValue,
      CrabforkSmsCommand.Send.rawValue,
      CrabforkSmsCommand.Search.rawValue,
      CrabforkCallLogCommand.Search.rawValue,
    )

  private val debugCommands = setOf("debug.logs", "debug.ed25519")

  @Test
  fun advertisedCapabilities_respectsFeatureAvailability() {
    val capabilities = InvokeCommandRegistry.advertisedCapabilities(defaultFlags())

    assertContainsAll(capabilities, coreCapabilities)
    assertMissingAll(capabilities, optionalCapabilities)
  }

  @Test
  fun advertisedCapabilities_includesFeatureCapabilitiesWhenEnabled() {
    val capabilities =
      InvokeCommandRegistry.advertisedCapabilities(
        defaultFlags(
          cameraEnabled = true,
          locationEnabled = true,
          sendSmsAvailable = true,
          readSmsAvailable = true,
          smsSearchPossible = true,
          callLogAvailable = true,
          voiceWakeEnabled = true,
          motionActivityAvailable = true,
          motionPedometerAvailable = true,
        ),
      )

    assertContainsAll(capabilities, coreCapabilities + optionalCapabilities)
  }

  @Test
  fun advertisedCommands_respectsFeatureAvailability() {
    val commands = InvokeCommandRegistry.advertisedCommands(defaultFlags())

    assertContainsAll(commands, coreCommands)
    assertMissingAll(commands, optionalCommands + debugCommands)
  }

  @Test
  fun advertisedCommands_includesFeatureCommandsWhenEnabled() {
    val commands =
      InvokeCommandRegistry.advertisedCommands(
        defaultFlags(
          cameraEnabled = true,
          locationEnabled = true,
          sendSmsAvailable = true,
          readSmsAvailable = true,
          smsSearchPossible = true,
          callLogAvailable = true,
          motionActivityAvailable = true,
          motionPedometerAvailable = true,
          debugBuild = true,
        ),
      )

    assertContainsAll(commands, coreCommands + optionalCommands + debugCommands)
  }

  @Test
  fun advertisedCommands_onlyIncludesSupportedMotionCommands() {
    val commands =
      InvokeCommandRegistry.advertisedCommands(
        NodeRuntimeFlags(
          cameraEnabled = false,
          locationEnabled = false,
          sendSmsAvailable = false,
          readSmsAvailable = false,
          smsSearchPossible = false,
          callLogAvailable = false,
          voiceWakeEnabled = false,
          motionActivityAvailable = true,
          motionPedometerAvailable = false,
          debugBuild = false,
        ),
      )

    assertTrue(commands.contains(CrabforkMotionCommand.Activity.rawValue))
    assertFalse(commands.contains(CrabforkMotionCommand.Pedometer.rawValue))
  }

  @Test
  fun advertisedCommands_splitsSmsSendAndSearchAvailability() {
    val readOnlyCommands =
      InvokeCommandRegistry.advertisedCommands(
        defaultFlags(readSmsAvailable = true, smsSearchPossible = true),
      )
    val sendOnlyCommands =
      InvokeCommandRegistry.advertisedCommands(
        defaultFlags(sendSmsAvailable = true),
      )
    val requestableSearchCommands =
      InvokeCommandRegistry.advertisedCommands(
        defaultFlags(smsSearchPossible = true),
      )

    assertTrue(readOnlyCommands.contains(CrabforkSmsCommand.Search.rawValue))
    assertFalse(readOnlyCommands.contains(CrabforkSmsCommand.Send.rawValue))
    assertTrue(sendOnlyCommands.contains(CrabforkSmsCommand.Send.rawValue))
    assertFalse(sendOnlyCommands.contains(CrabforkSmsCommand.Search.rawValue))
    assertTrue(requestableSearchCommands.contains(CrabforkSmsCommand.Search.rawValue))
  }

  @Test
  fun advertisedCapabilities_includeSmsWhenEitherSmsPathIsAvailable() {
    val readOnlyCapabilities =
      InvokeCommandRegistry.advertisedCapabilities(
        defaultFlags(readSmsAvailable = true),
      )
    val sendOnlyCapabilities =
      InvokeCommandRegistry.advertisedCapabilities(
        defaultFlags(sendSmsAvailable = true),
      )
    val requestableSearchCapabilities =
      InvokeCommandRegistry.advertisedCapabilities(
        defaultFlags(smsSearchPossible = true),
      )

    assertTrue(readOnlyCapabilities.contains(CrabforkCapability.Sms.rawValue))
    assertTrue(sendOnlyCapabilities.contains(CrabforkCapability.Sms.rawValue))
    assertFalse(requestableSearchCapabilities.contains(CrabforkCapability.Sms.rawValue))
  }

  @Test
  fun advertisedCommands_excludesCallLogWhenUnavailable() {
    val commands = InvokeCommandRegistry.advertisedCommands(defaultFlags(callLogAvailable = false))

    assertFalse(commands.contains(CrabforkCallLogCommand.Search.rawValue))
  }

  @Test
  fun advertisedCapabilities_excludesCallLogWhenUnavailable() {
    val capabilities = InvokeCommandRegistry.advertisedCapabilities(defaultFlags(callLogAvailable = false))

    assertFalse(capabilities.contains(CrabforkCapability.CallLog.rawValue))
  }

  @Test
  fun advertisedCapabilities_includesVoiceWakeWithoutAdvertisingCommands() {
    val capabilities = InvokeCommandRegistry.advertisedCapabilities(defaultFlags(voiceWakeEnabled = true))
    val commands = InvokeCommandRegistry.advertisedCommands(defaultFlags(voiceWakeEnabled = true))

    assertTrue(capabilities.contains(CrabforkCapability.VoiceWake.rawValue))
    assertFalse(commands.any { it.contains("voice", ignoreCase = true) })
  }

  @Test
  fun find_returnsForegroundMetadataForCameraCommands() {
    val list = InvokeCommandRegistry.find(CrabforkCameraCommand.List.rawValue)
    val location = InvokeCommandRegistry.find(CrabforkLocationCommand.Get.rawValue)

    assertNotNull(list)
    assertEquals(true, list?.requiresForeground)
    assertNotNull(location)
    assertEquals(false, location?.requiresForeground)
  }

  @Test
  fun find_returnsNullForUnknownCommand() {
    assertNull(InvokeCommandRegistry.find("not.real"))
  }

  private fun defaultFlags(
    cameraEnabled: Boolean = false,
    locationEnabled: Boolean = false,
    sendSmsAvailable: Boolean = false,
    readSmsAvailable: Boolean = false,
    smsSearchPossible: Boolean = false,
    callLogAvailable: Boolean = false,
    voiceWakeEnabled: Boolean = false,
    motionActivityAvailable: Boolean = false,
    motionPedometerAvailable: Boolean = false,
    debugBuild: Boolean = false,
  ): NodeRuntimeFlags =
    NodeRuntimeFlags(
      cameraEnabled = cameraEnabled,
      locationEnabled = locationEnabled,
      sendSmsAvailable = sendSmsAvailable,
      readSmsAvailable = readSmsAvailable,
      smsSearchPossible = smsSearchPossible,
      callLogAvailable = callLogAvailable,
      voiceWakeEnabled = voiceWakeEnabled,
      motionActivityAvailable = motionActivityAvailable,
      motionPedometerAvailable = motionPedometerAvailable,
      debugBuild = debugBuild,
    )

  private fun assertContainsAll(actual: List<String>, expected: Set<String>) {
    expected.forEach { value -> assertTrue(actual.contains(value)) }
  }

  private fun assertMissingAll(actual: List<String>, forbidden: Set<String>) {
    forbidden.forEach { value -> assertFalse(actual.contains(value)) }
  }
}
