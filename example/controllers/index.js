let ad;
import { ADTYPES, AdView } from 'ti-admob';

function doShowAd() {
	if (!ad) {
		return;
	}
	if (ad.isLoaded()) {
		ad.show();
	} else {
		console.warn('ad not yet loaded');
	}
}

$.index.open();

function handleOpen() {
    
	const appAd = new AdView({
		adType: ADTYPES.AD_TYPE_INTERSTITIAL,
		onAdLoaded : () => {
			alert('ad loaded!');
		},
		onAdClosed: () => {
			setTimeout(() => {
				appAd.load();
			},2500);
		}
	});
	
	ad = appAd.ad;
}




