# Ti.Admob

Use the native Admob SDK with Axway Hyperloop. Right now this module is Android only, and only supports Interstitial Ads.

## Run the Sample

1. Copy the `titanium-admob` folder to your `lib/` (Alloy) or your `Resources/` (Classic) directory.
2. Copy the example code to your Titanium app (in case of a Classic app adjust the code to fit your needs).
3. Include the `hyperloop` and `ti.playservices` modules in your tiapp.xml.
4. Adjust `tiapp.xml` to support the ad type as explained below.
5. Make sure you have `<transpile>true</transpile>` added in tiapp to support ES6.
6. Go for it!

## tiapp.xml adjustments required
You need to add a manifest to your app with an extra activity to support Interstitial ads. It should look like this:
```xml
<android xmlns:android="http://schemas.android.com/apk/res/android">
    <manifest android:installLocation="auto" android:versionCode="1"
        android:versionName="1.0" xmlns:android="http://schemas.android.com/apk/res/android">
        <application>
            <meta-data android:name="com.google.android.gms.version" android:value="@integer/google_play_services_version"/>
            <activity
            android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|uiMode|screenSize|smallestScreenSize" android:name="com.google.android.gms.ads.AdActivity"/>
        </application>
        <uses-permission android:name="android.permission.INTERNET"/>
        <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
        <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    </manifest>
</android>
```

## Example

Right here we're creating a new ad using the Google Default app/ad ID's. As soon as the `onAdLoaded` event is fired, you can show the ad using `ad.show();`
Check the sample how it's implemented.

```javascript
import { ADTYPES, AdView } from 'titanium-admob';

const appAd = new AdView({
    adType: ADTYPES.AD_TYPE_INTERSTITIAL,
    appId: 'ca-app-pub-3940256099942544~3347511713',
    adId: 'ca-app-pub-3940256099942544/1033173712',
    onAdLoaded : () => {
        alert('ad loaded!');
    },
    onAdClosed: () => {
        setTimeout(() => {
            appAd.load();
        },2500);
    }
});

const ad = appAd.ad;

```

In this example we're loading a new ad after 2,5 seconds after the ad has closed, but you're free to pre-load whenever your want. Keep in mind it might take some time before the ad is loaded.

Look at the [native docs](https://developers.google.com/admob/android/interstitial) to see any other specifications and notes.

## License
MIT

## Copyright
&copy; 2018 by Appcelerator
