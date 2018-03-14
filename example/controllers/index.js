var ad;
var tiAdmob = require('ti.admob');

function doShowAd() {
	if (!ad)
		return;
	if (ad.isLoaded()) {
		ad.show();
	} else {
		console.warn('ad not yet loaded');
	}
}

$.index.open();

function handleOpen() {
	var appAd = new (require('ti.admob/ad'));
	ad = appAd.create({
		adType: tiAdmob.ADTYPES.AD_TYPE_INTERSTITIAL,
		preload: true, // when not specifying this, you'll need to call appAd.loadAd() before trying to show it 
		onAdLoaded : function() {
			alert('ad loaded!');
		},
		onAdClosed: function(){
			setTimeout(function(){
				appAd.loadAd();
			},2500);
		}
	});
}




