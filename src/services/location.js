import { Alert } from 'react-native';
import { Linking, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export async function getCurrentPosition(options) {
  return new Promise((resolve, reject) =>
    Geolocation.getCurrentPosition(resolve, reject, options),
  );
}

export async function openMapAsync(location) {
  console.log('onpress');
  // if (Platform.OS === 'web') {
  //   Alert.alert('Opening the map is not supported.');
  //   return;
  // }
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${location.latitude},${location.longitude}`;
  const url = Platform.select({
    ios: `${scheme}@${latLng}`,
    android: `${scheme}${latLng}`,
  });
  const alternateUrl = Platform.select({
    ios: `http://maps.apple.com/?ll=${location.latitude},${location.longitude}`,
    default: `https://www.google.com/maps/search/?q=${location.latitude},${location.longitude}`,
  });

  try {
    const supported = await Linking.canOpenURL(url);
    console.log('supported link', supported, url);
    if (supported) {
      return Linking.openURL(url);
    } else {
      return Linking.openURL(alternateUrl);
    }
  } catch ({ message }) {
    Alert.alert(message);
  }
}
