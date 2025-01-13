import axios from "axios";
import qs from "qs";

import {
  distancePayload,
  distancebody,
  renewPlace,
  polygonPayload,
  polygonFeatures,
} from "@/interface/city";

export const postXinbeiDistance = async (
  payload: distancePayload,
  body: distancebody
) => {
  const res = await axios.post(
    `https://enterprise.oakmega.ai/api/v1/server/xinbei/calc-distance?${qs.stringify(
      payload
    )}`,
    body
  );
  const data: renewPlace[] = res.data.result;
  return data;
};

export const getXinbeiPolygon = async (payload: polygonPayload) => {
  const res = await axios.get(
    `https://enterprise.oakmega.ai/api/v1/server/xinbei/geolocation-json?${qs.stringify(
      payload
    )}`
  );
  const features: polygonFeatures[] = res.data.result.features;
  return features;
};
