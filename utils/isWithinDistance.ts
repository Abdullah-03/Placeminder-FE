function isWithinDistance(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number,
  maxDistanceMeters: number,
) {
  const earthRadius = 6371; // Earth's radius in kilometers

  const dLat = (latitude2 - latitude1) * (Math.PI / 180);
  const dLon = (longitude2 - longitude1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(latitude1 * (Math.PI / 180)) *
      Math.cos(latitude2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  const distance = earthRadius * c * 1000; // Convert distance to meters

  console.log(distance, maxDistanceMeters);
  return distance <= maxDistanceMeters;
}

export default isWithinDistance;
