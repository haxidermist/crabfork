package ai.crabfork.app.ui

import androidx.compose.runtime.Composable
import ai.crabfork.app.MainViewModel
import ai.crabfork.app.ui.chat.ChatSheetContent

@Composable
fun ChatSheet(viewModel: MainViewModel) {
  ChatSheetContent(viewModel = viewModel)
}
