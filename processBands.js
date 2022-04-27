let bands = [
  { name: 'sunset rubdown', country: 'UK', active: false },
  { name: 'women', country: 'Germany', active: false },
  { name: 'a silver mt. zion', country: 'Spain', active: true },
];

function processBands(data) {
  return bands.map(band => {
    updateCountry(band);
    capitalizeBandName(band);
    removeDotsInBandName(band);
    return band;
  });
}

function updateCountry(band) {
  band.country = 'Canada';
}

function capitalizeBandName(band) {
  band.name = String(band.name).split(' ')
                               .map(word => {
                                 return word[0].toUpperCase() + word.slice(1)
                               })
                               .join(' ');
}

function removeDotsInBandName(band) {
  band.name = String(band.name).replace('.', '');
}

console.log(processBands(bands));