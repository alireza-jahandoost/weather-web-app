export const weatherUrl = ({ date, location, key, withoutQuery = false }) => {
  return withoutQuery
    ? `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}/${date}`
    : `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}/${date}?unitGroup=metric&key=${key}&contentType=json`;
};
