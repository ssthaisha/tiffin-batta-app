import { Alert, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request } from 'react-native-permissions';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { showMessage } from 'react-native-flash-message';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { getUrlExtension } from '../../services/utils';

export async function getLocationAsync(onSend) {
  request(
    Platform.select({
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    }),
  ).then(result => {
    if (result === 'unavailable') {
      showMessage({
        message: 'Location is not available',
        type: 'danger',
      });
    } else if (result === 'granted') {
      Geolocation.getCurrentPosition(
        position => {
          onSend(position.coords, 'location');
        },
        error => {
          showMessage({
            message: error.message,
            type: 'danger',
          });
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  });
}

export async function pickImageAsync(onSend) {
  request(
    Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    }),
  ).then(result => {
    console.log('result ', result);
    if (result === 'unavailable') {
      showMessage({
        message: 'Gallery is not available',
        type: 'danger',
      });
    } else if (result === 'granted') {
      ImagePicker.launchImageLibrary(
        {
          quality: 0.8,
          maxWidth: 2048,
          maxheight: scaleH(20),
          mediaType: 'photo',
        },
        response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else {
            console.log(response);
            let path = response.uri;
            if (Platform.OS === 'ios') {
              path = (path || {}).replace('file://', '');
            }
            //  else {
            //   path = 'file:///' + (path || {}).split('file:/').join('');
            // }
            if (!response.fileName) {
              response.fileName = path.split('/').pop();
            }
            const source = {
              uri: path,
              type: response.type,
              name: response.fileName || '',
            };
            if (response.fileSize < 20 * 1024 * 1024) {
              onSend(source, 'image');
            } else {
              Alert.alert('File must be less than 20MB');
            }
          }
        },
      );
    }
  });
}

export async function takePictureAsync(onSend) {
  request(
    Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    }),
  ).then(result => {
    if (result === 'unavailable') {
      showMessage({
        message: 'Gallery is not available',
        type: 'danger',
      });
    } else if (result === 'granted') {
      ImagePicker.launchCamera(
        {
          quality: 0.8,
          maxWidth: 2048,
          maxheight: scaleH(20),
          saveToPhotos: false,
          mediaType: 'photo',
        },
        response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            let path = response.uri;
            if (Platform.OS === 'ios') {
              path = (path || {}).replace('file://', '');
            }
            if (!response.fileName) {
              response.fileName = path.split('/').pop();
            }
            const source = {
              uri: path,
              type: response.type,
              name: response.fileName,
            };
            if (response.fileSize < 20 * 1024 * 1024) {
              onSend(source, 'image');
            } else {
              Alert.alert('Cannot upload image larger than 20MB');
            }
          }
        },
      );
    }
  });
}
export async function takeVideoAsync(onSend) {
  request(
    Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    }),
  ).then(result => {
    if (result === 'unavailable') {
      showMessage({
        message: 'Gallery is not available',
        type: 'danger',
      });
    } else if (result === 'granted') {
      ImagePicker.launchCamera(
        {
          quality: 0.8,
          maxWidth: 2048,
          maxheight: scaleH(20),
          saveToPhotos: false,
          mediaType: 'video',
          videoQuality: 'low',
        },
        response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            let path = response.uri;
            if (Platform.OS === 'ios') {
              path = (path || {}).replace('file://', '');
            }
            if (!response.fileName) {
              response.fileName = path.split('/').pop();
            }
            console.log(response, 'eee');
            const source = {
              uri: path,
              type: 'video/mp4',
              name: response.fileName,
            };
            if (response.fileSize < 200 * 1024 * 1024) {
              console.log(source, 'hhhhi');
              onSend(source, 'file');
            } else {
              Alert.alert('Cannot upload video larger than 200MB');
            }
          }
        },
      );
    }
  });
}

export async function pickFileImagesAsync(onSend) {
  try {
    const response = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    console.log(response);

    let path = response.uri;
    if (Platform.OS === 'ios') {
      path = (path || {}).replace('file://', '');
    }
    if (!(response.fileName || response.name)) {
      response.fileName = path.split('/').pop();
    }
    let name = response.fileName || response.name;

    if (!response.size) {
      onSend(
        {
          uri: path,
          type: response.type,
          name: name,
        },
        'file',
      );
    } else if (response.size < 50 * 1024 * 1024) {
      onSend(
        {
          uri: path,
          type: response.type,
          name: name,
        },
        'file',
      );
    } else {
      Alert.alert('Cannot upload files larger than 50MB');
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}

export async function pickFileAsync(onSend) {
  try {
    const response = await DocumentPicker.pick({
      type: [
        DocumentPicker.types.pdf,
        DocumentPicker.types.docx,
        DocumentPicker.types.ppt,
        DocumentPicker.types.pptx,
        DocumentPicker.types.doc,
        DocumentPicker.types.xls,
        DocumentPicker.types.xlsx,
      ],
    });
    console.log(response);

    let path = response.uri;
    if (Platform.OS === 'ios') {
      path = (path || {}).replace('file://', '');
    }
    if (!(response.fileName || response.name)) {
      response.fileName = path.split('/').pop();
    }
    let name = response.fileName || response.name;

    const extName = getUrlExtension(name);
    if (extName !== 'mp4' || extName !== 'mp3' || extName !== 'pdf') {
      name =
        response.type === 'audio/mpeg'
          ? name + '.mp3'
          : response.type === 'video/mp4'
          ? name + '.mp4'
          : name;
    }

    if (!response.size) {
      onSend(
        {
          uri: path,
          type: response.type,
          name: name,
        },
        'file',
      );
    } else if (response.size < 50 * 1024 * 1024) {
      onSend(
        {
          uri: path,
          type: response.type,
          name: name,
        },
        'file',
      );
    } else {
      Alert.alert('Cannot upload files larger than 50MB');
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}

export async function openDocuments(fileName, remoteURL, handleLoading) {
  const localFile = `${RNFS.CachesDirectoryPath}/${fileName}`;
  const alreadyDownloaded = await RNFS.exists(localFile);

  const options = {
    fromUrl: remoteURL,
    toFile: localFile,
  };
  console.log('object', remoteURL, localFile);
  handleLoading(true);
  if (!alreadyDownloaded) {
    RNFS.downloadFile(options)
      .promise.then(success => {
        handleLoading(false);
        FileViewer.open(localFile);
      })
      .then(() => {
        // success
        handleLoading(false);
      })
      .catch(error => {
        // error
        handleLoading(false);
      });
  } else {
    FileViewer.open(localFile)
      .then(() => {
        // success
        handleLoading(false);
      })
      .catch(error => {
        // error
        handleLoading(false);
      });
  }
}

export async function pickAudioVideoAsync(onSend) {
  try {
    const response = await DocumentPicker.pick({
      type: [DocumentPicker.types.video, DocumentPicker.types.audio],
    });
    console.log(response);

    let path = response.uri;
    if (Platform.OS === 'ios') {
      path = (path || {}).replace('file://', '');
    }
    if (!(response.fileName || response.name)) {
      response.fileName = path.split('/').pop();
    }
    let name = response.fileName || response.name;

    const extName = getUrlExtension(name);
    if (extName !== 'mp4' || extName !== 'mp3' || extName !== 'pdf') {
      name =
        response.type === 'audio/mpeg'
          ? name + '.mp3'
          : response.type === 'video/mp4'
          ? name + '.mp4'
          : name;
    }

    if (!response.size) {
      onSend(
        {
          uri: path,
          type: response.type,
          name: name,
        },
        'file',
      );
    } else if (response.size < 200 * 1024 * 1024) {
      onSend(
        {
          uri: path,
          type: response.type,
          name: name,
        },
        'file',
      );
    } else {
      Alert.alert('Cannot upload files larger than 200MB');
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}
