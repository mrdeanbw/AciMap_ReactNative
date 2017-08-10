import codePush from 'react-native-code-push'

export const onSyncStatusChange = (SyncStatus) => {
  switch (SyncStatus) {
    case codePush.SyncStatus.UP_TO_DATE:
      console.tron.log('CodePush - App up to date')
      break
    case codePush.SyncStatus.CHECKING_FOR_UPDATE:
      console.tron.log('CodePush - Checking for update')
      break
    case codePush.SyncStatus.AWAITING_USER_ACTION:
      console.tron.log('CodePush - Awaiting user action')
      break
    case codePush.SyncStatus.DOWNLOADING_PACKAGE:
      console.tron.log('CodePush - Downloading package')
      break
    case codePush.SyncStatus.INSTALLING_UPDATE:
      console.tron.log('CodePush - Installing update')
      break
  }
}

export const onError = (error) => {
  console.tron.log('CodePush error:')
  console.tron.log(error)
}

export const onDownloadProgress = (downloadProgress) => {
  if (downloadProgress) {
    console.tron.log("Downloading " + downloadProgress.receivedBytes + " of " + downloadProgress)
  }
}
