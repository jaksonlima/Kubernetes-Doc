import { check } from "k6";
import http from "k6/http";

export let options = {
  vus: 50,
  duration: "3s",
};

export default function () {
  let res = http.get("http://jws-api-express-serivce/healthz");

  check(res, {
    "is status 200": (r) => r.status === 200,
  });
}
