import codePush from 'react-native-code-push'
import { store } from '../App'
import UiActions from '../../Modules/ui/redux'

export const onSyncStatusChange = (SyncStatus) => {
  switch (SyncStatus) {
    case codePush.SyncStatus.UP_TO_DATE:
      console.tron.log('CodePush - App up to date')
      store.dispatch(UiActions.updateCodepushStatus('uptodate'))
      break
    case codePush.SyncStatus.CHECKING_FOR_UPDATE:
      console.tron.log('CodePush - Checking for update')
      store.dispatch(UiActions.updateCodepushStatus('checking'))
      break
    case codePush.SyncStatus.AWAITING_USER_ACTION:
      console.tron.log('CodePush - Awaiting user action')
      break
    case codePush.SyncStatus.DOWNLOADING_PACKAGE:
      console.tron.log('CodePush - Downloading package')
      store.dispatch(UiActions.updateCodepushStatus('downloading'))
      store.dispatch(UiActions.toggleCodepushModal(true))
      break
    case codePush.SyncStatus.INSTALLING_UPDATE:
      console.tron.log('CodePush - Installing update')
      store.dispatch(UiActions.updateCodepushStatus('installing'))
      break
    case codePush.SyncStatus.UNKNOWN_ERROR:
      console.tron.log('CodePush - Unknown error')
      store.dispatch(UiActions.updateCodepushStatus('error'))
      break
  }
}

export const onDownloadProgress = (downloadProgress) => {
  if (downloadProgress) {
    const rec = downloadProgress.receivedBytes
    const total = downloadProgress.totalBytes
    const perc = Math.round(rec * 100 / total)
    console.tron.log(`Downloading ${rec} of ${total} bytes - ${perc}%`)
    store.dispatch(UiActions.updateCodepushPerc(perc))
  }
}
