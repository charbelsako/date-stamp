// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "date-stamp" is now active!')

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  let dateInsert = vscode.commands.registerCommand(
    'extension.insertDate',
    () => {
      // current editor
      let editor = vscode.window.activeTextEditor
      let position: vscode.Position
      // check if there is no selection
      if (editor?.selection.isEmpty) {
        // the Position object gives you the line and character where the cursor is
        position = editor.selection.active
      }

      editor?.edit((builder) => {
        // a position object to insert at line x, and character y

        let weekDays: string[] = [
          'Sun',
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat',
        ]

        let months: string[] = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]

        // build the date
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate()
        let dayNum = date.getDay()

        let dayOfWeek = weekDays[dayNum]
        let monthName = months[month]

        // TODO: if less than 10 add a zero
        // TODO: 24 hours or 12 hours?
        let hours =
          date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()

        let minutes =
          date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

        let seconds =
          date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()

        let dateString = `${dayOfWeek} ${day} ${monthName} ${year} ${hours}:${minutes}:${seconds}`
        // insert the dateString in the document at the cursor's location
        builder.insert(position, dateString)
      })
    }
  )

  context.subscriptions.push(dateInsert)
}

// this method is called when your extension is deactivated
export function deactivate() {}
