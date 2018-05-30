import { ADTYPES, AdView } from 'titanium-admob';

let appAd;
let ad;
let extras = {npa: 1};

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
  appAd = new AdView({
    adType: ADTYPES.AD_TYPE_INTERSTITIAL,
    onAdLoaded: () => {
      if(extras.npa){
        alert('Npa loaded!');
      }else{
        alert('Pa loaded!');
      }
    }
  });

  ad = appAd.ad;
}

function loadNpa(){
  extras.npa = true;
  appAd.load(extras);
}

function loadPa(){
  extras.npa = false;
  appAd.load(extras);
}
