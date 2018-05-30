const Activity = require('android.app.Activity');

const MobileAds = require('com.google.android.gms.ads.MobileAds');
const InterstitialAd = require('com.google.android.gms.ads.InterstitialAd');
const AdRequest = require('com.google.android.gms.ads.AdRequest');
const AdListener = require('com.google.android.gms.ads.AdListener');
const Bundle = require('android.os.Bundle');
const AdMobAdapter = require('com.google.ads.mediation.admob.AdMobAdapter');

let hasInitApp = false;

const ADTYPES = {
  AD_TYPE_INTERSTITIAL: 0
};

class AdView {
  constructor(options) {
    this.adView = null;
    this.options = options;
    this.activity = new Activity(Ti.Android.currentActivity);
    if (!hasInitApp && !this.options.appId) {
      // setting default/test appId by google
      this.options.appId = 'ca-app-pub-3940256099942544~3347511713';
      Ti.API.warn('Default/Test AppId is used that is provided by Google');
    }

    if (!hasInitApp) {
      this.appId = this.options.appId;
      hasInitApp = true;
    }

    if (!this.options.adId) {
      this.options.adId = 'ca-app-pub-3940256099942544/1033173712';
      Ti.API.warn('Default/Test AdId is used that is provided by Google');
    }

    this.createAd();
  }

  createAd() {
    if (this.options.adType === ADTYPES.AD_TYPE_INTERSTITIAL && Ti.Android) {
      this.createInterstitialAdAndroid();
    }

    /*if (this.adView !== null) {
      // first time, load already
      this.load();
    }*/
  }

  load(_extras) {
    let request = new AdRequest.Builder().build();
    if(_extras){
      if(_extras.npa){
        // https://developers.google.com/admob/android/eu-consent#forward_consent_to_the_google_mobile_ads_sdk
  			let extras = new Bundle();
  			extras.putString("npa", "1");
  			request = new AdRequest.Builder()
          .addNetworkExtrasBundle(AdMobAdapter.class, extras)
          .build();
  		}
    }
    this.adView.loadAd(request);
  }

  createInterstitialAdAndroid() {
    this.adView = new InterstitialAd(this.activity);
    this.adView.setAdUnitId(this.options.adId); // replace ad ID with your own
    this.adView.setAdListener(this.adListener);
  }

  get adListener() {
    let self = this;
    let ADL = com.google.android.gms.ads.AdListener.extend({
      onAdLoaded: () => {
        // add loaded, now ready to be shown
        if (self.options.onAdLoaded) self.options.onAdLoaded();
      },
      onAdFailedToLoad: (e) => {
        // failed to load ad
        if (self.options.onAdFailedToLoad) self.options.onAdFailedToLoad(e);
      },
      onAdOpened: () => {
        // user opened ad. At this point app can pause work
        if (self.options.onAdOpened) self.options.onAdOpened();
      },
      onAdClosed: () => {
        // user closed the ad! At this point user can load a new one & app can resume work
        if (self.options.onAdClosed) self.options.onAdClosed();
      },
      onAdLeftApplication: () => {
        // user left the application
        if (self.options.onAdLeftApplication) self.options.onAdLeftApplication();
      },
      onAdImpression: () => {
        // an ad impression has been recorded
        if (self.options.onAdImpression) self.options.onAdImpression();
      },
      onAdClicked: () => {
        // user has clicked the ad
        if (self.options.onAdClicked) self.options.onAdClicked();
      }
    });
    return new ADL();
  }

  get ad() {
    return this.adView;
  }

  set appId(appId) {
    MobileAds.initialize(this.activity, appId);
  }
}

export {
  ADTYPES,
  AdView
};
