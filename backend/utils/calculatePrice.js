function calculatePrice(bookingDetails, serviceConfig) {
  const { cleaningType, bedrooms = 1, bathrooms = 1, extras = [], frequency = 'ONE-TIME' } = bookingDetails;

  const basePrices = {
    'Standard': serviceConfig?.baseTypes?.standard || 80,
    'Deep': serviceConfig?.baseTypes?.deep || 140,
    'Move In-Out': serviceConfig?.baseTypes?.moveInOut || 200
  };

  const frequencyMap = {
    'ONE-TIME': serviceConfig?.frequencyDiscounts?.oneTime || 0,
    'WEEKLY': serviceConfig?.frequencyDiscounts?.weekly || 25,
    'BI-WEEKLY': serviceConfig?.frequencyDiscounts?.biWeekly || 15,
    'MONTHLY': serviceConfig?.frequencyDiscounts?.monthly || 10
  };

  let total = basePrices[cleaningType] || basePrices['Standard'];

  if (bedrooms > 1) {
    total += (bedrooms - 1) * (serviceConfig?.perRoomRate || 50);
  }
  if (bathrooms > 1) {
    total += (bathrooms - 1) * (serviceConfig?.perBathRate || 60);
  }

  if (Array.isArray(extras) && serviceConfig?.addons) {
  for (const extraName of extras) {
    const addon = serviceConfig.addons.find((a) => a.name === extraName);
    if (addon) total += addon.price;
  }
}

  const normalizedFreq = String(frequency).toUpperCase();
  const discount = frequencyMap[normalizedFreq] || 0;
  total -= total * (discount / 100);

  return Number(total.toFixed(2));
}

module.exports = calculatePrice;