import { ADTYPES, AdView } from 'titanium-admob';

let ad;

function doShowAd() {
  if (!ad) { return; }

  if (ad.isLoaded()) {
    ad.show();
  } else {
    console.warn('Ad not loaded, yet');
  }
}

$.index.open();

function handleOpen() {
  const appAd = new AdView({
    adType: ADTYPES.AD_TYPE_INTERSTITIAL,
    onAdLoaded: () => {
      alert('Ad loaded!');
    },
    onAdClosed: () => {
      setTimeout(() => {
        appAd.load();
      }, 2500);
    }
  });

  ad = appAd.ad;
}
