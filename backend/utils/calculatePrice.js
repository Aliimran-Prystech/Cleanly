function calculatePrice(bookingDetails, serviceConfig) {
  const { cleaningType, bedrooms, bathrooms, extras = [], frequency } = bookingDetails;

  const basePrices = {
    'Standard': serviceConfig.baseTypes.standard,
    'Deep': serviceConfig.baseTypes.deep,
    'Move In-Out': serviceConfig.baseTypes.moveInOut
  };

  const discountPercentages = {
    'One-time': serviceConfig.frequencyDiscounts.oneTime,
    'Weekly': serviceConfig.frequencyDiscounts.weekly,
    'Bi-Weekly': serviceConfig.frequencyDiscounts.biWeekly,
    'Monthly': serviceConfig.frequencyDiscounts.monthly
  };

  let total = basePrices[cleaningType] || 100;

  if (bedrooms > 1) total += (bedrooms - 1) * serviceConfig.perRoomRate;
  if (bathrooms > 1) total += (bathrooms - 1) * serviceConfig.perBathRate;

  extras.forEach(extraName => {
    const addon = serviceConfig.addons.find(a => a.name === extraName);
    if (addon) total += addon.price;
  });

  const discount = discountPercentages[frequency] || 0;
  total -= (total * (discount / 100));

  return Number(total.toFixed(2));
}

module.exports = calculatePrice;