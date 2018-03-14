var mobads = require('com.google.android.gms.ads.MobileAds');
var Activity = require('android.app.Activity');
var InterstitialAd = require('com.google.android.gms.ads.InterstitialAd');
var AdRequest = require('com.google.android.gms.ads.AdRequest');
var AdListener = require('com.google.android.gms.ads.AdListener');

var ADTYPES = require('ti.admob').ADTYPES;

var hasInitApp = false;

function initApp(appId,activity) {
	if (hasInitApp) return;
	hasInitApp = true;
	mobads.initialize(activity, appId);
}



var ad = function(adOptions) {
	var self = this;
	var hasInit = false;
	this.activity = null;
	this.ad = null;
	this.adId;
	this.options;
	
	function init(options) {
		self.options = options;
		self.activity = new Activity(Ti.Android.currentActivity);
		// defaults to google's own appId/adId for testing
		initApp(options.appId || 'ca-app-pub-3940256099942544~3347511713', self.activity);
		self.adId = options.adId || 'ca-app-pub-3940256099942544/1033173712';
		
		hasInit = true;
	};
	
	this.create = function(options) {
		if (!hasInit) init(options);
		
		if (Ti.UI.iOS) {
			return Ti.API.warni('not yet supported on iOS');
		}
		
		if (self.options.adType === ADTYPES.AD_TYPE_INTERSTITIAL && Ti.Android) {
			createInterstitialAdAndroid();
		} else {
			return Ti.API.error('unknown type', self.options);
		}
		
		if (self.options.preload === true) self.loadAd();
		return self.ad;
		
	};
		
	this.loadAd = function() {
		self.ad.loadAd(new AdRequest.Builder().build());
	};
	
	function createInterstitialAdAndroid() {
		self.ad = new InterstitialAd(self.activity);
		self.ad.setAdUnitId(self.adId); // replace ad ID with your own
		var ADL = com.google.android.gms.ads.AdListener.extend({
			onAdLoaded: function() {
				// add loaded, now ready to be shown
				if (self.options.onAdLoaded) self.options.onAdLoaded();
			},
			onAdFailedToLoad: function(e) {
				// failed to load ad
				Ti.API.error('error loading ad. Error code: ' +  e);
				if (self.options.onAdFailedToLoad) self.options.onAdFailedToLoad();
			},
			onAdOpened: function() {
				// user opened ad. At this point app can pause work
				if (self.options.onAdOpened) self.options.onAdOpened();
			},
			onAdClosed: function() {
				// user closed the ad! At this point user can load a new one & app can resume work
				if (self.options.onAdClosed) self.options.onAdClosed();
			},
			onAdLeftApplication: function() {
				if (self.options.onAdLeftApplication) self.options.onAdLeftApplication();
			}
		});
		self.ad.setAdListener(new ADL());
	}
	
};

module.exports = ad;
