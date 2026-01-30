const trip = {
  country: "",
  city: "",
  lng: 0,
  lat: 0,
  year: 2000,
  month: 1,
  show: false,
  purpose: "",
  memorable: false,
  familiar: false,
  current: false,
};

const ProcessTravelData = (trips) => {
  var dataProcessed = [];
  var cityArray = [];
  var currentCityObj = null;

  for (var i in trips) {
    const rawCity = (trips[i].city || "").trim();
    const rawCountry = (trips[i].country || "").trim();
    if (!rawCity || !rawCountry) {
      continue;
    }

    const cityKey = `${rawCity.toLowerCase()}|${rawCountry.toLowerCase()}`;
    if (cityArray.includes(cityKey)) {
      var previousTrip = dataProcessed.find(
        (d) =>
          d.city.toLowerCase() === rawCity.toLowerCase() &&
          d.country.toLowerCase() === rawCountry.toLowerCase()
      );
      if (trips[i].current.toLowerCase() === "true") {
        previousTrip.current = true;
        currentCityObj = { city: previousTrip.city, country: previousTrip.country };
      }
      if (trips[i].show.toLowerCase() === "true") {
        previousTrip.show = true;
      }
      if (trips[i].memorable.toLowerCase() === "true") {
        previousTrip.memorable = true;
      }
      if (trips[i].familiar.toLowerCase() === "true") {
        previousTrip.familiar = true;
      }
      const nextYear = parseInt(trips[i].year);
      const nextMonth = parseInt(trips[i].month);
      if (
        !isNaN(nextYear) &&
        !isNaN(nextMonth) &&
        (nextYear > previousTrip.year ||
          (nextYear === previousTrip.year && nextMonth > previousTrip.month))
      ) {
        previousTrip.year = nextYear;
        previousTrip.month = nextMonth;
      }
    } else {
      cityArray.push(cityKey);

      var newTrip = Object.create(trip);
      newTrip.country = rawCountry;
      newTrip.city = rawCity;
      newTrip.lng = parseFloat(trips[i].lng);
      newTrip.lat = parseFloat(trips[i].lat);
      newTrip.year = parseInt(trips[i].year);
      newTrip.month = parseInt(trips[i].month);
      newTrip.show = trips[i].show.toLowerCase() === "true";
      newTrip.purpose = trips[i].purpose || "";
      newTrip.memorable = trips[i].memorable.toLowerCase() === "true";
      newTrip.familiar = trips[i].familiar.toLowerCase() === "true";
      newTrip.current = trips[i].current.toLowerCase() === "true";

      if (newTrip.current) {
        currentCityObj = { city: newTrip.city, country: newTrip.country };
      }

      dataProcessed.push(newTrip);
    }
  }

  const dataDisplayed = {
    cities: cityArray,
    currentCity: currentCityObj,
    citiesMemorable: dataProcessed.filter((d) => d.memorable),
    citiesFamiliar: dataProcessed.filter((d) => d.familiar),
  };

  return [dataProcessed, dataDisplayed];
};

export default ProcessTravelData;
