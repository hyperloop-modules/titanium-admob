# Ti.Admob
Right now this module is Android only, and only supports Interstitial Ads

## Run the Sample

1. Copy the `ti.admob` folder to your `lib/` (Alloy) or your Resources (Classic) directory
2. Copy the example code to your Titanium app (in case of a Classic app adjust the code to fit your needs)
3. Include `hyperloop` and `ti.playservices` modules in your tiapp.xml
4. Adjust `tiapp.xml` to support the ad type as explained below
5. Go for it!

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
```javascript
var appAd = new (require('ti.admob/ad'));
var ad = appAd.create({
    adType: tiAdmob.ADTYPES.AD_TYPE_INTERSTITIAL,
    preload: true,
    onAdLoaded : function() {
        alert('ad loaded!');
    },
    onAdClosed: function() {
        setTimeout(function() {
            appAd.loadAd();
        },2500);
    }
});
```


In this example we're loading a new ad after 2,5 seconds after the ad has closed, but you're free to pre-load whenever your want. Keep in mind it might take some time before the ad is loaded.

Look at the [native docs](https://developers.google.com/admob/ios/interstitial) to see any other specifications and notes.

## License
MIT

## Copyright
&copy; 2018 by Appcelerator
